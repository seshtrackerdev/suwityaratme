import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import { EmailMessage } from 'cloudflare:email';
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
      userAgent: c.req.header('User-Agent') || 'unknown',
      referrer: c.req.header('Referer') || 'Direct',
      url: c.req.url || 'Not available'
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

// Email Worker consumer for contact form
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    // Handle HTTP requests
    return app.fetch(request, env, ctx);
  },
  
  async queue(batch: MessageBatch, env: any, ctx: ExecutionContext): Promise<void> {
  console.log(`Processing ${batch.messages.length} contact form messages`);
  
  for (const message of batch.messages) {
    try {
      const contactData = message.body;
      
      // Create email content with proper headers
      const plainTextContent = createEmailContent(contactData);
      const htmlContent = createHtmlEmailContent(contactData);
      
      // Generate a unique message ID
      const messageId = `<${crypto.randomUUID()}@suwityarat.me>`;
      const boundary = `----=_Part_${crypto.randomUUID()}`;
      
      // Create multipart email with both plain text and HTML
      const rawEmail = [
        `From: noreply@suwityarat.me`,
        `To: jobs@suwityarat.com`,
        `Subject: 📧 New Contact Form Submission from ${contactData.name}`,
        `Message-ID: ${messageId}`,
        `Date: ${new Date().toUTCString()}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/plain; charset=utf-8`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        plainTextContent,
        ``,
        `--${boundary}`,
        `Content-Type: text/html; charset=utf-8`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        htmlContent,
        ``,
        `--${boundary}--`
      ].join('\r\n');
      
      // Create EmailMessage
      const emailMessage = new EmailMessage(
        'noreply@suwityarat.me', // From address (must be your domain)
        'jobs@suwityarat.com',   // To address
        rawEmail
      );
      
      // Send email using Email Routing
      await env.SEND_EMAIL.send(emailMessage);
      
      console.log(`Email sent successfully for contact from ${contactData.name} (${contactData.email})`);
      
      // Acknowledge the message
      message.ack();
      
    } catch (error) {
      console.error(`Failed to send email for message ${message.id}:`, error);
      
      // Retry the message (will be retried according to queue settings)
      message.retry();
    }
  }
  }
};

function createEmailContent(contactData: any): string {
  const timestamp = new Date(contactData.timestamp).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  return `New Contact Form Submission

From: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}
Source: ${contactData.source === 'modal' ? 'Website Modal' : 'Contact Page'}
Submitted: ${timestamp}
IP: ${contactData.ip}

Message:
${contactData.message}

---
This message was sent via the contact form on suwityarat.me
User Agent: ${contactData.userAgent}`;
}

function createHtmlEmailContent(contactData: any): string {
  const timestamp = new Date(contactData.timestamp).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  // Enhanced source detection
  const sourceLabel = contactData.source === 'modal' ? 'Website Modal' : 'Contact Page';
  const sourceColor = contactData.source === 'modal' ? '#0077B5' : '#000000';
  
  // Extract page information from referrer if available
  const referrer = contactData.referrer || 'Direct';
  const pageSource = referrer.includes('suwityarat.me') ? 
    referrer.replace('https://suwityarat.me', '').replace('/', '') || 'Home' : 
    'External';
  
  // Determine likely intent based on content
  const messageText = contactData.message.toLowerCase();
  let likelyIntent = 'General Inquiry';
  if (messageText.includes('job') || messageText.includes('career') || messageText.includes('hire')) {
    likelyIntent = 'Job Opportunity';
  } else if (messageText.includes('website') || messageText.includes('web design') || messageText.includes('site')) {
    likelyIntent = 'Web Development';
  } else if (messageText.includes('itsm') || messageText.includes('teamdynamix') || messageText.includes('workflow')) {
    likelyIntent = 'ITSM Consulting';
  } else if (messageText.includes('consulting') || messageText.includes('help') || messageText.includes('support')) {
    likelyIntent = 'Consulting';
  }
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #000000;
      background-color: #F7F6F2;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 24px;
      border: 2px solid #000000;
      box-shadow: 0 6px 0 0 #000000;
      overflow: hidden;
    }
    .header {
      background: #000000;
      color: white;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.025em;
    }
    .header p {
      margin: 8px 0 0 0;
      opacity: 0.9;
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      padding: 24px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    .info-item {
      background: #F7F6F2;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #000000;
    }
    .info-item strong {
      display: block;
      color: #000000;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .info-item span {
      color: #000000;
      font-weight: 600;
    }
    .message-section {
      background: #F7F6F2;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #000000;
      margin-bottom: 20px;
    }
    .message-section h3 {
      margin: 0 0 12px 0;
      color: #000000;
      font-size: 16px;
      font-weight: 700;
    }
    .message-content {
      background: white;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #000000;
      white-space: pre-wrap;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #000000;
    }
    .categorization {
      background: #F7F6F2;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #000000;
      margin-bottom: 20px;
    }
    .categorization h3 {
      margin: 0 0 12px 0;
      color: #000000;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .category-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .category-item {
      background: white;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #000000;
    }
    .category-item strong {
      display: block;
      font-size: 11px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .category-item span {
      font-weight: 600;
      color: #000000;
    }
    .intent-badge {
      display: inline-block;
      background: #0077B5;
      color: white;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .meta-info {
      background: #F7F6F2;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #000000;
      font-size: 12px;
      color: #666666;
    }
    .meta-info p {
      margin: 4px 0;
    }
    .source-badge {
      display: inline-block;
      background: ${sourceColor};
      color: white;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .footer {
      background: #F7F6F2;
      padding: 16px 24px;
      text-align: center;
      font-size: 12px;
      color: #666666;
      border-top: 1px solid #000000;
    }
    .footer a {
      color: #0077B5;
      text-decoration: none;
      font-weight: 600;
    }
    @media (max-width: 600px) {
      .info-grid, .category-grid {
        grid-template-columns: 1fr;
      }
      .container {
        margin: 0;
        border-radius: 0;
        border-left: none;
        border-right: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
      <p>Someone reached out through your website</p>
    </div>
    
    <div class="content">
      <div class="info-grid">
        <div class="info-item">
          <strong>Name</strong>
          <span>${contactData.name}</span>
        </div>
        <div class="info-item">
          <strong>Email</strong>
          <span><a href="mailto:${contactData.email}" style="color: #0077B5; text-decoration: none; font-weight: 600;">${contactData.email}</a></span>
        </div>
        <div class="info-item">
          <strong>Subject</strong>
          <span>${contactData.subject}</span>
        </div>
        <div class="info-item">
          <strong>Source</strong>
          <span><span class="source-badge">${sourceLabel}</span></span>
        </div>
      </div>
      
      <div class="categorization">
        <h3>📊 Categorization & Context</h3>
        <div class="category-grid">
          <div class="category-item">
            <strong>Likely Intent</strong>
            <span class="intent-badge">${likelyIntent}</span>
          </div>
          <div class="category-item">
            <strong>Page Source</strong>
            <span>${pageSource}</span>
          </div>
          <div class="category-item">
            <strong>Referrer</strong>
            <span>${referrer}</span>
          </div>
          <div class="category-item">
            <strong>Submission Time</strong>
            <span>${timestamp}</span>
          </div>
        </div>
      </div>
      
      <div class="message-section">
        <h3>💬 Message</h3>
        <div class="message-content">${contactData.message}</div>
      </div>
      
      <div class="meta-info">
        <p><strong>🌐 IP Address:</strong> ${contactData.ip}</p>
        <p><strong>🖥️ User Agent:</strong> ${contactData.userAgent}</p>
        <p><strong>📱 Device Type:</strong> ${contactData.userAgent.includes('Mobile') ? 'Mobile' : contactData.userAgent.includes('Tablet') ? 'Tablet' : 'Desktop'}</p>
        <p><strong>🔗 Full URL:</strong> ${contactData.url || 'Not available'}</p>
      </div>
    </div>
    
    <div class="footer">
      <p>This message was sent via the contact form on <a href="https://suwityarat.me">suwityarat.me</a></p>
    </div>
  </div>
</body>
</html>`;
}
