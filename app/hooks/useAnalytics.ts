import { useCallback, useEffect, useRef } from 'react';

// Client-side analytics hook
export function useAnalytics() {
  const sessionIdRef = useRef<string | null>(null);

  // Get or generate session ID
  const getSessionId = useCallback((): string => {
    if (sessionIdRef.current) {
      return sessionIdRef.current;
    }

    // Try to get from cookie
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='));
    
    if (sessionCookie) {
      const sessionId = sessionCookie.split('=')[1];
      sessionIdRef.current = sessionId;
      return sessionId;
    }

    // Generate new session ID
    const newSessionId = crypto.randomUUID();
    sessionIdRef.current = newSessionId;
    
    // Set cookie (will be set by server on next request)
    document.cookie = `session_id=${newSessionId}; path=/; max-age=86400; samesite=lax`;
    
    return newSessionId;
  }, []);

  // Track analytics event
  const trackEvent = useCallback(async (
    type: 'page_view' | 'download' | 'contact_click' | 'navigation_click',
    action?: string
  ) => {
    // Don't track events on admin pages
    if (window.location.pathname.includes('/admin')) {
      return;
    }

    try {
      const eventData = {
        type,
        page: window.location.pathname,
        action,
        sessionId: getSessionId(),
      };

      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      console.error('Failed to track analytics event:', error);
      // Don't throw - analytics failures shouldn't break the app
    }
  }, [getSessionId]);

  // Track page view
  const trackPageView = useCallback((pageTitle?: string) => {
    trackEvent('page_view');
  }, [trackEvent]);

  // Track contact click
  const trackContactClick = useCallback((action: string) => {
    trackEvent('contact_click', action);
  }, [trackEvent]);

  // Track download
  const trackDownload = useCallback((fileName: string) => {
    trackEvent('download', fileName);
  }, [trackEvent]);

  // Track navigation click
  const trackNavigationClick = useCallback((action: string) => {
    trackEvent('navigation_click', action);
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackContactClick,
    trackDownload,
    trackNavigationClick,
    getSessionId,
  };
}

// Hook for automatic page view tracking
export function usePageViewTracking(pageTitle?: string) {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Don't track admin pages
    if (!window.location.pathname.includes('/admin')) {
      trackPageView(pageTitle);
    }
  }, [trackPageView, pageTitle]);
}

