-- Vocabulary table
create table vocabulary (
  id uuid default gen_random_uuid() primary key,
  user_id text not null default '1',
  word text not null,
  phonetic text,
  vietnamese text,
  usage text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table vocabulary enable row level security;

-- Allow all operations (no auth for now)
create policy "Allow all" on vocabulary for all using (true);

-- Indexes
create index idx_vocabulary_user_id on vocabulary(user_id);
create index idx_vocabulary_created_at on vocabulary(created_at desc);

-- Note: drop practice_sessions table from Supabase dashboard if no longer needed:
-- DROP TABLE practice_sessions;
