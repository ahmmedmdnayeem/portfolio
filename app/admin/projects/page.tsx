import { getProjects } from '@/lib/supabase/queries';
import { ProjectsManager } from '@/components/admin/ProjectsManager';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Projects</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">
          // manage your project portfolio
        </p>
      </header>

      <ProjectsManager initial={projects} />
    </div>
  );
}