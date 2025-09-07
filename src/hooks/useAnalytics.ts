'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_path: url,
      });
    }
  }, []);

  const trackFormSubmission = useCallback((formName: string, success: boolean = true) => {
    trackEvent('form_submit', 'engagement', formName, success ? 1 : 0);
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackEvent('click', 'engagement', `${buttonName}_${location}`);
  }, [trackEvent]);

  const trackScroll = useCallback((depth: number) => {
    trackEvent('scroll', 'engagement', 'page_scroll', depth);
  }, [trackEvent]);

  const trackTimeOnPage = useCallback((timeInSeconds: number) => {
    trackEvent('timing_complete', 'engagement', 'page_time', timeInSeconds);
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackFormSubmission,
    trackButtonClick,
    trackScroll,
    trackTimeOnPage,
  };
};
