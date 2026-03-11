export interface TopicSummary {
  id: string;
  label: string;
  vocabCount: number;
  phrasesCount: number;
}

export interface VocabItem {
  en: string;
  type: string;
  vi: string;
  category: string;
}

export interface PhraseItem {
  en: string;
  vi: string;
  category: string;
}

export interface TopicDetail {
  id: string;
  label: string;
  vocab: VocabItem[];
  phrases: PhraseItem[];
}

export const topicSummaries: TopicSummary[] = [
  { id: "emotions",        label: "Emotions & Personality",    vocabCount: 110, phrasesCount: 10 },
  { id: "environment",     label: "Environment & Nature",      vocabCount: 120, phrasesCount: 10 },
  { id: "family",          label: "Family",                    vocabCount: 90,  phrasesCount: 10 },
  { id: "food-drink",      label: "Food & Drink",              vocabCount: 118, phrasesCount: 10 },
  { id: "friend",          label: "Friend",                    vocabCount: 98,  phrasesCount: 10 },
  { id: "habit",           label: "Habit",                     vocabCount: 53,  phrasesCount: 15 },
  { id: "happiness",       label: "Happiness",                 vocabCount: 110, phrasesCount: 10 },
  { id: "health",          label: "Health & Medicine",         vocabCount: 120, phrasesCount: 10 },
  { id: "hobby",           label: "Hobby",                     vocabCount: 105, phrasesCount: 14 },
  { id: "holiday",         label: "Holiday",                   vocabCount: 110, phrasesCount: 10 },
  { id: "hometown",        label: "Hometown",                  vocabCount: 103, phrasesCount: 11 },
  { id: "internet",        label: "Internet & Social Networks",vocabCount: 126, phrasesCount: 11 },
  { id: "job",             label: "Job",                       vocabCount: 110, phrasesCount: 10 },
  { id: "music",           label: "Music",                     vocabCount: 110, phrasesCount: 10 },
  { id: "pets",            label: "Pets",                      vocabCount: 120, phrasesCount: 10 },
  { id: "school-life",     label: "School Life",               vocabCount: 120, phrasesCount: 10 },
  { id: "self-development",label: "Self-Development",          vocabCount: 110, phrasesCount: 10 },
  { id: "transportation",  label: "Transportation",            vocabCount: 43,  phrasesCount: 21 },
  { id: "weather",         label: "Weather",                   vocabCount: 108, phrasesCount: 10 },
];

export async function fetchTopic(id: string): Promise<TopicDetail> {
  const res = await fetch(`/topics/${id}.json`);
  if (!res.ok) throw new Error(`Failed to load topic ${id}`);
  return res.json();
}
