export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Feature {
  icon: string;
  text: string;
}
