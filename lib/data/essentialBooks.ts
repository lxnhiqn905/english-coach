import type { UnitSummary, EssentialUnit } from "./essentialWords";

const BASE = "https://www.essentialenglish.review/apps-data";

export interface BookConfig {
  id: number;
  label: string;
  href: string;
  audioBase: string;
  jsonBase: string;
  unitSummaries: UnitSummary[];
}

export async function fetchBookUnit(book: BookConfig, id: number): Promise<EssentialUnit> {
  const res = await fetch(`${book.jsonBase}/unit-${id}.json`);
  if (!res.ok) throw new Error(`Failed to load unit ${id}`);
  return res.json();
}

export function bookWordAudioUrl(book: BookConfig, unitId: number, sound: string) {
  return `${book.audioBase}/unit-${unitId}/wordlist/${sound}`;
}
export function bookWordImageUrl(book: BookConfig, unitId: number, image: string) {
  return `${book.audioBase}/unit-${unitId}/wordlist/${image}`;
}
export function bookReadingAudioUrl(book: BookConfig, unitId: number, sound: string) {
  return `${book.audioBase}/unit-${unitId}/reading/${sound}`;
}
export function bookReadingImageUrl(book: BookConfig, unitId: number, image: string) {
  return `${book.audioBase}/unit-${unitId}/reading/${image}`;
}

export const BOOKS: Record<number, BookConfig> = {
  1: {
    id: 1,
    label: "Essential 1",
    href: "/essential-1",
    audioBase: `${BASE}/4000-essential-english-words-1/data`,
    jsonBase: "/essential-1",
    unitSummaries: [
      { id: 1,  unit: "Unit 1",  story: "The Lion and the Rabbit" },
      { id: 2,  unit: "Unit 2",  story: "The Laboratory" },
      { id: 3,  unit: "Unit 3",  story: "The Report" },
      { id: 4,  unit: "Unit 4",  story: "The Dog's Bell" },
      { id: 5,  unit: "Unit 5",  story: "The Jackal and the Sun Child" },
      { id: 6,  unit: "Unit 6",  story: "The Friendly Ghost" },
      { id: 7,  unit: "Unit 7",  story: "The Best Prince" },
      { id: 8,  unit: "Unit 8",  story: "How the Sun and the Moon Were Made" },
      { id: 9,  unit: "Unit 9",  story: "The Starfish" },
      { id: 10, unit: "Unit 10", story: "The First Peacock" },
      { id: 11, unit: "Unit 11", story: "Princess Rose and the Creature" },
      { id: 12, unit: "Unit 12", story: "The Crazy Artist" },
      { id: 13, unit: "Unit 13", story: "The Farmer and the Cats" },
      { id: 14, unit: "Unit 14", story: "A Magical Book" },
      { id: 15, unit: "Unit 15", story: "The Big Race" },
      { id: 16, unit: "Unit 16", story: "Adams County's Gold" },
      { id: 17, unit: "Unit 17", story: "The Race for Water" },
      { id: 18, unit: "Unit 18", story: "The Little Red Chicken" },
      { id: 19, unit: "Unit 19", story: "Shipwrecked" },
      { id: 20, unit: "Unit 20", story: "The Seven Cities of Gold" },
      { id: 21, unit: "Unit 21", story: "Katy" },
      { id: 22, unit: "Unit 22", story: "A Better Reward" },
      { id: 23, unit: "Unit 23", story: "The Camp" },
      { id: 24, unit: "Unit 24", story: "A Strong Friendship" },
      { id: 25, unit: "Unit 25", story: "Joe's Pond" },
      { id: 26, unit: "Unit 26", story: "Archie and His Donkey" },
      { id: 27, unit: "Unit 27", story: "The Spider and the Bird" },
      { id: 28, unit: "Unit 28", story: "The Party" },
      { id: 29, unit: "Unit 29", story: "How the World Got Light" },
      { id: 30, unit: "Unit 30", story: "Cats and Secrets" },
    ],
  },
  2: {
    id: 2,
    label: "Essential 2",
    href: "/essential-2",
    audioBase: `${BASE}/4000-essential-english-words-2/data`,
    jsonBase: "/essential-2",
    unitSummaries: [
      { id: 1,  unit: "Unit 1",  story: "The Twelve Months" },
      { id: 2,  unit: "Unit 2",  story: "The Dragon" },
      { id: 3,  unit: "Unit 3",  story: "The Battle of Thermopylae" },
      { id: 4,  unit: "Unit 4",  story: "The Deer and His Image" },
      { id: 5,  unit: "Unit 5",  story: "May 29, 1953" },
      { id: 6,  unit: "Unit 6",  story: "The Frog Prince" },
      { id: 7,  unit: "Unit 7",  story: "A Beautiful Bird" },
      { id: 8,  unit: "Unit 8",  story: "Tricky Turtle" },
      { id: 9,  unit: "Unit 9",  story: "The Tale of Bartelby O'Boyle" },
      { id: 10, unit: "Unit 10", story: "Blackbeard" },
      { id: 11, unit: "Unit 11", story: "Dinosaur Drawings" },
      { id: 12, unit: "Unit 12", story: "The Mean Chef" },
      { id: 13, unit: "Unit 13", story: "The Cat and the Fox" },
      { id: 14, unit: "Unit 14", story: "The Good Student" },
      { id: 15, unit: "Unit 15", story: "The Lucky Knife" },
      { id: 16, unit: "Unit 16", story: "Prince Sam" },
      { id: 17, unit: "Unit 17", story: "Henry Ford's Famous Car" },
      { id: 18, unit: "Unit 18", story: "The Priest" },
      { id: 19, unit: "Unit 19", story: "Mrs. May and the Green Girl" },
      { id: 20, unit: "Unit 20", story: "Albert Einstein" },
      { id: 21, unit: "Unit 21", story: "From the Earth to the Stars" },
      { id: 22, unit: "Unit 22", story: "The Farm Festival" },
      { id: 23, unit: "Unit 23", story: "The Clever Thief" },
      { id: 24, unit: "Unit 24", story: "The Doctor's Cure" },
      { id: 25, unit: "Unit 25", story: "The Criminal" },
      { id: 26, unit: "Unit 26", story: "The Two Captains" },
      { id: 27, unit: "Unit 27", story: "The Duke and the Minister" },
      { id: 28, unit: "Unit 28", story: "The Fisherman" },
      { id: 29, unit: "Unit 29", story: "Osiris and the Nile" },
      { id: 30, unit: "Unit 30", story: "The Taxi Driver" },
    ],
  },
};
