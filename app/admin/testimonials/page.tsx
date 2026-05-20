import { getTestimonials } from '@/lib/supabase/queries';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const items = await getTestimonials();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Testimonials</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">// client feedback</p>
      </header>
      <TestimonialsManager initial={items} />
    </div>
  );
}
