// Simple analytics using KV storage

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'download' | 'contact_click' | 'navigation_click';
  page: string;
  action?: string; // What they did (e.g., "resume_download", "email_click", "portfolio_nav", "about_nav")
  timestamp: number;
  sessionId?: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalDownloads: number;
  totalContactClicks: number;
  totalNavigationClicks: number;
  topPages: Array<{ page: string; count: number }>;
  recentActivity: Array<{ action: string; page: string; timestamp: number }>;
}

// Generate a simple session ID
export function generateSessionId(): string {
  return crypto.randomUUID();
}

// Get or create session ID from cookie
export function getSessionId(request: Request): string {
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const sessionMatch = cookieHeader.match(/session_id=([^;]+)/);
    if (sessionMatch) {
      return sessionMatch[1];
    }
  }
  return generateSessionId();
}

// Create analytics event
export function createAnalyticsEvent(
  type: AnalyticsEvent['type'],
  page: string,
  action?: string,
  sessionId?: string
): AnalyticsEvent {
  return {
    id: crypto.randomUUID(),
    type,
    page,
    action,
    timestamp: Date.now(),
    sessionId
  };
}

// Store analytics event in KV
export async function storeAnalyticsEvent(
  kv: KVNamespace,
  event: AnalyticsEvent
): Promise<void> {
  try {
    // Store the individual event
    await kv.put(`analytics:event:${event.id}`, JSON.stringify(event));
    
    // Update counters
    const today = new Date().toISOString().split('T')[0];
    
    // Daily page view counter
    if (event.type === 'page_view') {
      const pageKey = `analytics:page:${today}:${event.page}`;
      const currentCount = await kv.get(pageKey);
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
      await kv.put(pageKey, newCount.toString());
    }
    
    // Daily action counter (downloads, contact clicks, navigation clicks)
    if (event.type === 'download' || event.type === 'contact_click' || event.type === 'navigation_click') {
      const actionKey = `analytics:action:${today}:${event.action || event.type}`;
      const currentCount = await kv.get(actionKey);
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
      await kv.put(actionKey, newCount.toString());
    }
    
    // Store recent events (keep last 50)
    const recentKey = 'analytics:recent';
    const recentEvents = await kv.get(recentKey);
    let events: AnalyticsEvent[] = recentEvents ? JSON.parse(recentEvents) : [];
    
    events.unshift(event);
    if (events.length > 50) {
      events = events.slice(0, 50);
    }
    
    await kv.put(recentKey, JSON.stringify(events));
    
  } catch (error) {
    console.error('Error storing analytics event:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

// Get analytics summary
export async function getAnalyticsSummary(kv: KVNamespace): Promise<AnalyticsSummary> {
  try {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    
    // Get recent events
    const recentEventsData = await kv.get('analytics:recent');
    const recentEvents: AnalyticsEvent[] = recentEventsData ? JSON.parse(recentEventsData) : [];
    
    // Count events by type
    const totalPageViews = recentEvents.filter(e => e.type === 'page_view').length;
    const totalDownloads = recentEvents.filter(e => e.type === 'download').length;
    const totalContactClicks = recentEvents.filter(e => e.type === 'contact_click').length;
    const totalNavigationClicks = recentEvents.filter(e => e.type === 'navigation_click').length;
    
    // Get page view counts for last 7 days
    const pageCounts: Record<string, number> = {};
    for (const date of last7Days) {
      const keys = await kv.list({ prefix: `analytics:page:${date}:` });
      for (const key of keys.keys) {
        const page = key.name.split(':').slice(3).join(':');
        const count = await kv.get(key.name);
        if (count) {
          pageCounts[page] = (pageCounts[page] || 0) + parseInt(count);
        }
      }
    }
    
    // Convert to top pages array with clean names
    const topPages = Object.entries(pageCounts)
      .map(([page, count]) => ({ 
        page: page === '/' ? 'Home' : 
              page === '/about' ? 'About' : 
              page === '/portfolio' ? 'Portfolio' : 
              page === '/contact' ? 'Contact' : 
              page,
        count 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Clean up recent activity
    const recentActivity = recentEvents
      .filter(e => e.type !== 'page_view' || e.action) // Only show page views with actions, or other events
      .slice(0, 10)
      .map(event => {
        let actionText = '';
        if (event.action) {
          actionText = event.action;
        } else if (event.type === 'page_view') {
          actionText = `Viewed ${event.page === '/' ? 'Home' : event.page}`;
        } else if (event.type === 'download') {
          actionText = 'Downloaded Resume';
        } else if (event.type === 'contact_click') {
          actionText = `Clicked ${event.action || 'contact'}`;
        } else if (event.type === 'navigation_click') {
          actionText = `Navigated to ${event.action || 'page'}`;
        } else {
          actionText = 'Unknown';
        }
        
        return {
          action: actionText,
          page: event.page === '/' ? 'Home' : event.page,
          timestamp: event.timestamp
        };
      });
    
    return {
      totalPageViews,
      totalDownloads,
      totalContactClicks,
      totalNavigationClicks,
      topPages,
      recentActivity
    };
    
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return {
      totalPageViews: 0,
      totalDownloads: 0,
      totalContactClicks: 0,
      totalNavigationClicks: 0,
      topPages: [],
      recentActivity: []
    };
  }
}

// Reset all analytics data
export async function resetAnalytics(kv: KVNamespace): Promise<void> {
  try {
    // Get all analytics keys
    const analyticsKeys = await kv.list({ prefix: 'analytics:' });
    
    // Delete all analytics keys
    for (const key of analyticsKeys.keys) {
      await kv.delete(key.name);
    }
    
    console.log('Analytics data reset successfully');
  } catch (error) {
    console.error('Error resetting analytics:', error);
    throw error;
  }
}
