import { getExperience } from '@/lib/supabase/queries';
import { ExperienceManager } from '@/components/admin/ExperienceManager';

export const dynamic = 'force-dynamic';

export default async function AdminExperiencePage() {
  const items = await getExperience();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Experience</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">// career timeline</p>
      </header>
      <ExperienceManager initial={items} />
    </div>
  );
}
