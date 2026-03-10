-- Create practice_sessions table
create table practice_sessions (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('stt', 'tts')),
  content text not null,
  duration_seconds integer,
  word_count integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table practice_sessions enable row level security;

-- Allow all operations (no auth for now - can be added later)
create policy "Allow all" on practice_sessions for all using (true);

-- Optional: Index for faster queries by type and date
create index idx_practice_sessions_type on practice_sessions(type);
create index idx_practice_sessions_created_at on practice_sessions(created_at desc);
