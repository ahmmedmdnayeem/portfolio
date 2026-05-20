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
  // Path under /public — leave blank to show the placeholder avatar.
  profileImage: '/profile.jpg',
  alternateNames: [
    'Nayeem Ahmmed',
    'MD Nayeem Ahmmed',
    'Ahmed Nayem',
    'Nayem Ahmed',
    'AMN',
  ],
  handle: 'NAYEEM_',
  email: 'amnayeem.dev@gmail.com',
  description:
    'Ahmmed MD Nayeem — Top 1% Upwork & Fiverr freelancer from Bangladesh. Software engineer, Python developer, full-stack and Web3 builder. Crypto, Blockchain, BTC, Ethical Hacking and Cybersecurity enthusiast. Computer Science background, businessman and investor.',
  url: 'https://nayeemahmmed.com',
  timezone: 'GMT+6 (Dhaka, Bangladesh)',
  country: 'Bangladesh',
  birthYear: 2003, // 23 in 2026
  jobTitle: 'Software Engineer · Full-Stack Developer · Python Developer · Freelancer',
  socials: {
    twitter: 'https://x.com/ahmmednayeem',
    github: 'https://github.com/ahmmedmdnayeem',
    linkedin: 'https://linkedin.com/in/ahmmednayeem',
    telegram: 'https://t.me/ahmmednayeem',
    upwork: 'https://www.upwork.com/freelancers/ahmmednayeem',
    fiverr: 'https://www.fiverr.com/ahmmednayeem',
  },
} as const;