import { createClient, isSupabaseConfigured } from './server';
import { listTable } from '@/lib/store/local';
import type {
  Project,
  Skill,
  Experience,
  Certification,
  Testimonial,
} from '@/lib/types/database';

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return listTable('projects');
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data?.length) return listTable('projects');
    return data as Project[];
  } catch {
    return listTable('projects');
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (!isSupabaseConfigured()) return listTable('skills');
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data?.length) return listTable('skills');
    return data as Skill[];
  } catch {
    return listTable('skills');
  }
}

export async function getExperience(): Promise<Experience[]> {
  if (!isSupabaseConfigured()) return listTable('experience');
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data?.length) return listTable('experience');
    return data as Experience[];
  } catch {
    return listTable('experience');
  }
}

export async function getCertifications(): Promise<Certification[]> {
  if (!isSupabaseConfigured()) return listTable('certifications');
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data?.length) return listTable('certifications');
    return data as Certification[];
  } catch {
    return listTable('certifications');
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return listTable('testimonials');
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data?.length) return listTable('testimonials');
    return data as Testimonial[];
  } catch {
    return listTable('testimonials');
  }
}
