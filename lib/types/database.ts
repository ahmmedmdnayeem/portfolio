export type ProjectCategory = 'blockchain' | 'cybersecurity' | 'web3' | 'defi' | 'smart-contract' | 'audit' | 'other';
export type ProjectStatus = 'completed' | 'in-progress' | 'archived';
export type SkillCategory = 'blockchain' | 'cybersecurity' | 'languages' | 'tools' | 'frameworks' | 'platforms' | 'marketing' | 'fullstack';
export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';
export type Platform = 'upwork' | 'fiverr' | 'direct' | 'linkedin' | 'x';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  category: ProjectCategory;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  image_url: string | null;
  featured: boolean;
  status: ProjectStatus;
  client_name: string | null;
  completion_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon_name: string | null;
  years_experience: number | null;
  sort_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string | null;
  responsibilities: string[] | null;
  tech_used: string[] | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  company_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string | null;
  expiry_date: string | null;
  credential_url: string | null;
  badge_url: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  client_company: string | null;
  client_avatar_url: string | null;
  content: string;
  rating: number;
  platform: Platform | null;
  project_type: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  budget_range: string | null;
  project_type: string | null;
  status: MessageStatus;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      projects: { Row: Project; Insert: Partial<Project>; Update: Partial<Project> };
      skills: { Row: Skill; Insert: Partial<Skill>; Update: Partial<Skill> };
      experience: { Row: Experience; Insert: Partial<Experience>; Update: Partial<Experience> };
      certifications: { Row: Certification; Insert: Partial<Certification>; Update: Partial<Certification> };
      testimonials: { Row: Testimonial; Insert: Partial<Testimonial>; Update: Partial<Testimonial> };
      contact_messages: { Row: ContactMessage; Insert: Partial<ContactMessage>; Update: Partial<ContactMessage> };
    };
  };
}