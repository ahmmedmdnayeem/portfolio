import fs from 'fs/promises';
import path from 'path';
import {
  fallbackProjects,
  fallbackSkills,
  fallbackExperience,
  fallbackCertifications,
  fallbackTestimonials,
} from '@/lib/constants/fallback-data';
import type {
  Project,
  Skill,
  Experience,
  Certification,
  Testimonial,
  ContactMessage,
} from '@/lib/types/database';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');

export interface Store {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  certifications: Certification[];
  testimonials: Testimonial[];
  contact_messages: ContactMessage[];
}

export type StoreTable = keyof Store;

export const ALLOWED_TABLES: readonly StoreTable[] = [
  'projects',
  'skills',
  'experience',
  'certifications',
  'testimonials',
  'contact_messages',
] as const;

function freshSeed(): Store {
  return {
    projects: structuredClone(fallbackProjects),
    skills: structuredClone(fallbackSkills),
    experience: structuredClone(fallbackExperience),
    certifications: structuredClone(fallbackCertifications),
    testimonials: structuredClone(fallbackTestimonials),
    contact_messages: [],
  };
}

let writeLock: Promise<void> = Promise.resolve();

async function ensureStore(): Promise<Store> {
  try {
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(txt) as Partial<Store>;
    const seed = freshSeed();
    return {
      projects: parsed.projects ?? seed.projects,
      skills: parsed.skills ?? seed.skills,
      experience: parsed.experience ?? seed.experience,
      certifications: parsed.certifications ?? seed.certifications,
      testimonials: parsed.testimonials ?? seed.testimonials,
      contact_messages: parsed.contact_messages ?? seed.contact_messages,
    };
  } catch {
    const seed = freshSeed();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
}

async function persistStore(store: Store): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
}

async function mutate(fn: (store: Store) => void | Promise<void>): Promise<Store> {
  const next = writeLock.then(async () => {
    const store = await ensureStore();
    await fn(store);
    await persistStore(store);
    return store;
  });
  writeLock = next.then(() => undefined, () => undefined);
  return next;
}

export async function readTable<K extends StoreTable>(table: K): Promise<Store[K]> {
  const store = await ensureStore();
  return store[table];
}

export async function listTable<K extends StoreTable>(
  table: K,
  { orderBy = 'sort_order', desc = false }: { orderBy?: string; desc?: boolean } = {},
): Promise<Store[K]> {
  const rows = (await readTable(table)) as unknown as Array<Record<string, unknown>>;
  const sorted = [...rows].sort((a, b) => {
    const av = (a[orderBy] ?? 0) as number | string;
    const bv = (b[orderBy] ?? 0) as number | string;
    if (av < bv) return desc ? 1 : -1;
    if (av > bv) return desc ? -1 : 1;
    return 0;
  });
  return sorted as unknown as Store[K];
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function insertRow<K extends StoreTable>(
  table: K,
  data: Record<string, unknown>,
): Promise<Store[K][number]> {
  const now = new Date().toISOString();
  const row = {
    id: newId(),
    created_at: now,
    ...(table === 'projects' ? { updated_at: now } : {}),
    ...data,
  };
  await mutate((store) => {
    (store[table] as unknown as Array<Record<string, unknown>>).push(row);
  });
  return row as Store[K][number];
}

export async function updateRow<K extends StoreTable>(
  table: K,
  id: string,
  patch: Record<string, unknown>,
): Promise<Store[K][number] | null> {
  let updated: Record<string, unknown> | null = null;
  await mutate((store) => {
    const rows = store[table] as unknown as Array<Record<string, unknown>>;
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) return;
    rows[idx] = {
      ...rows[idx],
      ...patch,
      ...(table === 'projects' ? { updated_at: new Date().toISOString() } : {}),
    };
    updated = rows[idx];
  });
  return (updated as unknown as Store[K][number]) ?? null;
}

export async function deleteRow(table: StoreTable, id: string): Promise<boolean> {
  let removed = false;
  await mutate((store) => {
    const rows = store[table] as unknown as Array<Record<string, unknown>>;
    const next = rows.filter((r) => r.id !== id);
    removed = next.length !== rows.length;
    (store[table] as unknown) = next;
  });
  return removed;
}

export async function countUnreadMessages(): Promise<number> {
  const rows = (await readTable('contact_messages')) as ContactMessage[];
  return rows.filter((m) => m.status === 'unread').length;
}
