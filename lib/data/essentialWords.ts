export interface EssentialWord {
  en: string;
  pron: string;
  desc: string;
  exam: string;
  vi: string;
  image: string;
  sound: string;
}

export interface EssentialExercise {
  en: string;
  story: string;
  sound: string;
}

export interface EssentialReading {
  type?: string;
  en: string;
  story: string;
  vi: string;
  image?: string;
  sound?: string;
}

export interface EssentialUnit {
  image: string;
  en: string;
  wordlist: EssentialWord[];
  exercise: EssentialExercise[];
  reading: EssentialReading[];
}

export interface UnitSummary {
  id: number;
  unit: string;
  story: string;
}

export const unitSummaries: UnitSummary[] = [
  { id: 1, unit: "Unit 1", story: "The Lion and the Rabbit" },
  { id: 2, unit: "Unit 2", story: "The Laboratory" },
  { id: 3, unit: "Unit 3", story: "The Report" },
  { id: 4, unit: "Unit 4", story: "The Dog's Bell" },
  { id: 5, unit: "Unit 5", story: "The Jackal and the Sun Child" },
  { id: 6, unit: "Unit 6", story: "The Friendly Ghost" },
  { id: 7, unit: "Unit 7", story: "The Best Prince" },
  { id: 8, unit: "Unit 8", story: "How the Sun and the Moon Were Made" },
  { id: 9, unit: "Unit 9", story: "The Starfish" },
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
];

export async function fetchUnit(id: number): Promise<EssentialUnit> {
  const res = await fetch(`/essential/unit-${id}.json`);
  if (!res.ok) throw new Error(`Failed to load unit ${id}`);
  return res.json();
}

export interface ParsedQuestion {
  questionHtml: string;
  options: string[];
  answerIndex: number;
  isTextarea?: boolean;
  textareaValue?: string;
}

export function parseExerciseHtml(html: string): ParsedQuestion[] {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const questions: ParsedQuestion[] = [];

  doc.querySelectorAll(".answer-the-questions-section").forEach((li) => {
    const answerIndex = parseInt(li.getAttribute("answer-index") ?? "0", 10);
    const ul = li.querySelector(".ul-choose-answer");
    const options = Array.from(ul?.querySelectorAll("li") ?? []).map(
      (opt) => opt.innerHTML
    );
    const clone = li.cloneNode(true) as Element;
    clone.querySelector(".ul-choose-answer")?.remove();
    const questionHtml = clone.innerHTML.replace(/<[^>]+>/g, "").trim();
    questions.push({ questionHtml, options, answerIndex });
  });

  doc.querySelectorAll(".answer-the-questions-textarea").forEach((li) => {
    const value = li.getAttribute("value") ?? "";
    const clone = li.cloneNode(true) as Element;
    const questionHtml = clone.innerHTML.replace(/<br\s*\/?>/gi, " ").replace(/_+/g, "").replace(/<[^>]+>/g, "").trim();
    questions.push({ questionHtml, options: [], answerIndex: -1, isTextarea: true, textareaValue: value });
  });

  return questions;
}
