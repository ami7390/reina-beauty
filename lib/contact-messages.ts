import { supabaseRest } from '@/lib/supabase-rest';

export type ContactMessage = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  created_at: number;
};

export async function listMessages(): Promise<ContactMessage[]> {
  return supabaseRest<ContactMessage[]>('contact_messages?select=*&order=created_at.desc', {}, { admin: true });
}

export async function createMessage(input: Omit<ContactMessage, 'id' | 'status' | 'created_at'>) {
  await supabaseRest('contact_messages', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ ...input, status: 'unread', created_at: Date.now() }),
  });
}

export async function setMessageStatus(id: number, status: 'read' | 'unread') {
  await supabaseRest(`contact_messages?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ status }),
  }, { admin: true });
}

export async function deleteMessage(id: number) {
  await supabaseRest(`contact_messages?id=eq.${id}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  }, { admin: true });
}
