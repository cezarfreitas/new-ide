'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    fbq: (
      command: 'init' | 'track' | 'trackCustom',
      eventName: string,
      parameters?: Record<string, any>
    ) => void;
  }
}

export const useMetaPixel = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  }, []);

  const trackCustomEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
    }
  }, []);

  // Eventos específicos do Meta Pixel
  const trackPageView = useCallback(() => {
    trackEvent('PageView');
  }, [trackEvent]);

  const trackLead = useCallback((value?: number, currency?: string) => {
    trackEvent('Lead', {
      value: value,
      currency: currency || 'BRL',
    });
  }, [trackEvent]);

  const trackContact = useCallback(() => {
    trackEvent('Contact');
  }, [trackEvent]);

  const trackCompleteRegistration = useCallback((value?: number, currency?: string) => {
    trackEvent('CompleteRegistration', {
      value: value,
      currency: currency || 'BRL',
    });
  }, [trackEvent]);

  const trackViewContent = useCallback((contentName?: string, contentCategory?: string) => {
    trackEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((value?: number, currency?: string, contentName?: string) => {
    trackEvent('AddToCart', {
      value: value,
      currency: currency || 'BRL',
      content_name: contentName,
    });
  }, [trackEvent]);

  const trackInitiateCheckout = useCallback((value?: number, currency?: string) => {
    trackEvent('InitiateCheckout', {
      value: value,
      currency: currency || 'BRL',
    });
  }, [trackEvent]);

  const trackPurchase = useCallback((value?: number, currency?: string, contentName?: string) => {
    trackEvent('Purchase', {
      value: value,
      currency: currency || 'BRL',
      content_name: contentName,
    });
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackCustomEvent('ButtonClick', {
      button_name: buttonName,
      location: location,
    });
  }, [trackCustomEvent]);

  const trackFormSubmission = useCallback((formName: string, success: boolean = true) => {
    trackCustomEvent('FormSubmission', {
      form_name: formName,
      success: success,
    });
  }, [trackCustomEvent]);

  const trackScroll = useCallback((depth: number) => {
    trackCustomEvent('ScrollDepth', {
      depth: depth,
    });
  }, [trackCustomEvent]);

  const trackTimeOnPage = useCallback((timeInSeconds: number) => {
    trackCustomEvent('TimeOnPage', {
      time_seconds: timeInSeconds,
    });
  }, [trackCustomEvent]);

  return {
    trackEvent,
    trackCustomEvent,
    trackPageView,
    trackLead,
    trackContact,
    trackCompleteRegistration,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackButtonClick,
    trackFormSubmission,
    trackScroll,
    trackTimeOnPage,
  };
};
