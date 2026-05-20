import { getSkills } from '@/lib/supabase/queries';
import { SkillsManager } from '@/components/admin/SkillsManager';

export const dynamic = 'force-dynamic';

export default async function AdminSkillsPage() {
  const skills = await getSkills();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Skills</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">
          // manage tech stack & proficiencies
        </p>
      </header>

      <SkillsManager initial={skills} />
    </div>
  );
}