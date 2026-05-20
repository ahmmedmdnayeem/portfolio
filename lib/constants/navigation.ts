import { Github, Linkedin, Twitter, Send } from 'lucide-react';

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#languages', label: 'Languages' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SOCIAL_LINKS = [
  { href: 'https://x.com/ahmmednayeem', label: 'X / Twitter', icon: Twitter },
  { href: 'https://github.com/ahmmednayeem', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/ahmmednayeem', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://t.me/ahmmednayeem', label: 'Telegram', icon: Send },
] as const;

export const SITE_CONFIG = {
  name: 'Ahmmed MD Nayeem',
  handle: 'NAYEM_',
  email: 'engr.amnaibd@gmail.com',
  description: 'Top 1% Upwork freelancer ($100K+ in marketing revenue) now pivoting into software engineering. Python, full-stack, blockchain fundamentals. Trilingual. Seeking entry-level / internship roles.',
  url: 'https://ahmmednayeem.dev',
  timezone: 'GMT+6 (Dhaka)',
} as const;