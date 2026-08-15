import { requireD1 } from "@/lib/cloudflare-bindings";

const createTableSql = `CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
  created_at INTEGER NOT NULL
)`;

const createStatusIndexSql = "CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON contact_messages(status)";
const createDateIndexSql = "CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at DESC)";

export type ContactMessage = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  message: string;
  status: "unread" | "read";
  created_at: number;
};

async function database(): Promise<D1Database> {
  return requireD1("La base de données des messages est indisponible.");
}

export async function ensureMessagesTable() {
  const db = await database();
  await db.batch([
    db.prepare(createTableSql),
    db.prepare(createStatusIndexSql),
    db.prepare(createDateIndexSql),
  ]);
  return db;
}

export async function listMessages(): Promise<ContactMessage[]> {
  const db = await ensureMessagesTable();
  const result = await db.prepare("SELECT id, name, phone, email, subject, message, status, created_at FROM contact_messages ORDER BY created_at DESC").all<ContactMessage>();
  return result.results;
}
