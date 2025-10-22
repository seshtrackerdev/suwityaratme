import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import { 
  createAnalyticsEvent, 
  storeAnalyticsEvent,
  getAnalyticsSummary,
  resetAnalytics,
  getSessionId 
} from "../app/lib/analytics";

const app = new Hono();

// Admin authentication route
app.post("/api/admin/authenticate", async (c) => {
  try {
    const { pin } = await c.req.json();
    
    // Get the admin PIN from Cloudflare secrets (or .dev.vars in local development)
    const adminPin = c.env.ADMIN_PIN;
    
    if (!adminPin) {
      console.error("ADMIN_PIN secret is not set");
      return c.json({ error: "Admin PIN not configured" }, 500);
    }
    
    if (pin !== adminPin) {
      return c.json({ error: "Invalid PIN" }, 401);
    }
    
    // Set authentication cookie
    c.header("Set-Cookie", "admin_authenticated=true; HttpOnly; Secure; SameSite=Strict; Max-Age=86400");
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error authenticating:", error);
    return c.json({ error: "Authentication failed" }, 500);
  }
});

// API routes for application storage
app.post("/api/applications", async (c) => {
  try {
    const body = await c.req.json();
    const { jobDetails, generatedContent, applicationName } = body;
    
    // Validate required fields
    if (!jobDetails || !generatedContent || !applicationName) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    // Create application data
    const applicationData = {
      id: crypto.randomUUID(),
      name: applicationName,
      jobDetails,
      generatedContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to KV
    const kv = c.env.APPLICATIONS_KV;
    await kv.put(`application:${applicationData.id}`, JSON.stringify(applicationData));
    
    // Also save with a timestamp key for listing
    await kv.put(`application:list:${applicationData.id}`, JSON.stringify({
      id: applicationData.id,
      name: applicationData.name,
      company: jobDetails.company,
      position: jobDetails.position,
      createdAt: applicationData.createdAt
    }));
    
    return c.json({ success: true, application: applicationData });
  } catch (error) {
    console.error("Error saving application:", error);
    return c.json({ error: "Failed to save application" }, 500);
  }
});

app.get("/api/applications", async (c) => {
  try {
    const kv = c.env.APPLICATIONS_KV;
    const list = await kv.list({ prefix: "application:list:" });
    
    const applications = [];
    for (const key of list.keys) {
      const data = await kv.get(key.name);
      if (data) {
        applications.push(JSON.parse(data));
      }
    }
    
    // Sort by creation date (newest first)
    applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

app.get("/api/applications/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const kv = c.env.APPLICATIONS_KV;
    
    const data = await kv.get(`application:${id}`);
    if (!data) {
      return c.json({ error: "Application not found" }, 404);
    }
    
    return c.json({ application: JSON.parse(data) });
  } catch (error) {
    console.error("Error fetching application:", error);
    return c.json({ error: "Failed to fetch application" }, 500);
  }
});

app.delete("/api/applications/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const kv = c.env.APPLICATIONS_KV;
    
    // Delete both the main record and the list entry
    await kv.delete(`application:${id}`);
    await kv.delete(`application:list:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return c.json({ error: "Failed to delete application" }, 500);
  }
});

// Contact form submission endpoint
app.post("/api/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message, source = 'modal' } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }
    
    // Sanitize inputs
    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = subject ? subject.trim().substring(0, 200) : 'Contact Form Submission';
    const sanitizedMessage = message.trim().substring(0, 2000);
    
    // Create contact message
    const contactMessage = {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
      source: source,
      ip: c.req.header('CF-Connecting-IP') || 'unknown',
      userAgent: c.req.header('User-Agent') || 'unknown'
    };
    
    // Send to queue
    await c.env.CONTACT_QUEUE.send(contactMessage);
    
    return c.json({ success: true, message: "Thank you for your message! I'll get back to you soon." });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ error: "Failed to process contact form" }, 500);
  }
});

// Analytics tracking endpoint
app.post("/api/analytics/track", async (c) => {
  try {
    const eventData = await c.req.json();
    
    if (!c.env.APPLICATIONS_KV) {
      console.warn("KV binding not available");
      return c.json({ success: false, error: "Analytics not configured" }, 500);
    }

    // Create analytics event
    const event = createAnalyticsEvent(
      eventData.type,
      eventData.page,
      eventData.action,
      eventData.sessionId
    );

    // Store the event
    await storeAnalyticsEvent(c.env.APPLICATIONS_KV, event);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error tracking analytics event:", error);
    return c.json({ success: false, error: "Failed to track event" }, 500);
  }
});

// Analytics summary endpoint
app.get("/api/analytics/summary", async (c) => {
  try {
    if (!c.env.APPLICATIONS_KV) {
      return c.json({ success: false, error: "Analytics not configured" }, 500);
    }

    const summary = await getAnalyticsSummary(c.env.APPLICATIONS_KV);
    return c.json({ success: true, data: summary });
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    return c.json({ success: false, error: "Failed to get analytics data" }, 500);
  }
});

// Reset analytics endpoint (admin only)
app.post("/api/analytics/reset", async (c) => {
  try {
    if (!c.env.APPLICATIONS_KV) {
      return c.json({ success: false, error: "Analytics not configured" }, 500);
    }

    // Check if user is authenticated as admin
    const cookieHeader = c.req.header('Cookie');
    if (!cookieHeader || !cookieHeader.includes('admin_authenticated=true')) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    await resetAnalytics(c.env.APPLICATIONS_KV);
    return c.json({ success: true, message: "Analytics data reset successfully" });
  } catch (error) {
    console.error("Error resetting analytics:", error);
    return c.json({ success: false, error: "Failed to reset analytics data" }, 500);
  }
});

app.get("*", async (c) => {
  // Track page views for non-API routes (exclude admin pages)
  if (!c.req.url.includes('/api/') && !c.req.url.includes('/admin') && c.env.APPLICATIONS_KV) {
    try {
      const url = new URL(c.req.url);
      const event = createAnalyticsEvent(
        'page_view',
        url.pathname,
        undefined,
        getSessionId(c.req.raw)
      );
      await storeAnalyticsEvent(c.env.APPLICATIONS_KV, event);
    } catch (error) {
      console.error('Error tracking page view:', error);
      // Don't fail the request if analytics fails
    }
  }

  const requestHandler = createRequestHandler(
    () => import("virtual:react-router/server-build"),
    import.meta.env.MODE,
  );

  const response = await requestHandler(c.req.raw, {
    cloudflare: { env: c.env, ctx: c.executionCtx },
  });

  // Set session cookie if not present
  const sessionId = getSessionId(c.req.raw);
  if (!c.req.header('Cookie')?.includes('session_id=')) {
    response.headers.set(
      'Set-Cookie', 
      `session_id=${sessionId}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
    );
  }

  return response;
});

export default app;
