// Environment variables validation and defaults
export const env = {
  // Analytics
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-G1YXN755WQ',
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || '703558478389535',
  
  // Webhook
  WEBHOOK_URL: process.env.NEXT_PUBLIC_WEBHOOK_URL || '',
  
  // Site Configuration
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://idenegociosdigitais.com.br',
  COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'IDE Negócios Digitais',
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contato@idenegociosdigitais.com.br',
  CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+55-11-99999-9999',
  
  // Social Media
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@idenegociosdigitais',
  INSTAGRAM_HANDLE: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '@idenegociosdigitais',
  LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/ide-negocios-digitais',
  FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/idenegociosdigitais',
  
  // Site Verification (Optional)
  GOOGLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  FACEBOOK_VERIFICATION: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
  PINTEREST_VERIFICATION: process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION || '',
  YANDEX_VERIFICATION: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  YAHOO_VERIFICATION: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || '',
} as const;

// Validation function
export function validateEnv() {
  const required = [
    'GA_MEASUREMENT_ID',
    'META_PIXEL_ID',
    'WEBHOOK_URL',
    'SITE_URL',
    'COMPANY_NAME',
    'CONTACT_EMAIL',
    'CONTACT_PHONE',
  ];
  
  const missing = required.filter(key => !env[key as keyof typeof env]);
  
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
}
