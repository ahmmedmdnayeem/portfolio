import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { listTable } from '@/lib/store/local';
import { MessageList } from '@/components/admin/MessageList';
import type { ContactMessage } from '@/lib/types/database';

export const dynamic = 'force-dynamic';

async function getMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      return (data as ContactMessage[]) ?? [];
    } catch {
      // fall through
    }
  }
  try {
    return await listTable('contact_messages', { orderBy: 'created_at', desc: true });
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-text-primary">Messages</h1>
        <p className="mt-1 font-mono text-xs text-text-muted">
          // inbound contact submissions
        </p>
      </header>

      <MessageList initial={messages} />
    </div>
  );
}
