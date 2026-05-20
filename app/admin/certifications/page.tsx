import { getCertifications } from '@/lib/supabase/queries';
import { CertificationsManager } from '@/components/admin/CertificationsManager';

export const dynamic = 'force-dynamic';

export default async function AdminCertificationsPage() {
  const items = await getCertifications();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Certifications</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">// industry credentials</p>
      </header>
      <CertificationsManager initial={items} />
    </div>
  );
}
