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

const BASE_AUDIO = "https://www.essentialenglish.review/apps-data/4000-essential-english-words-1/data";

export function wordAudioUrl(unitId: number, sound: string): string {
  return `${BASE_AUDIO}/unit-${unitId}/wordlist/${sound}`;
}

export function wordImageUrl(unitId: number, image: string): string {
  return `${BASE_AUDIO}/unit-${unitId}/wordlist/${image}`;
}

export function readingAudioUrl(unitId: number, sound: string): string {
  return `${BASE_AUDIO}/unit-${unitId}/reading/${sound}`;
}

export function readingImageUrl(unitId: number, image: string): string {
  return `${BASE_AUDIO}/unit-${unitId}/reading/${image}`;
}

let currentAudio: HTMLAudioElement | null = null;

export function playAudio(url: string): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  const audio = new Audio(url);
  currentAudio = audio;
  audio.play().catch(() => {});
  audio.onended = () => { currentAudio = null; };
}

export type ParsedBlock =
  | { kind: "header"; text: string }
  | { kind: "single"; questionHtml: string; options: string[]; answerIndex: number }
  | { kind: "multi"; options: string[]; answerIndices: number[]; count: number }
  | { kind: "fillblank"; sentenceHtml: string; prefix: string; answer: string }
  | { kind: "betterfit"; words: string[]; sentences: string[]; answers: string[] }
  | { kind: "wordbank"; wordBank: string[]; items: Array<{ sentenceHtml: string; answer: string }> }
  | { kind: "textarea"; questionHtml: string; answer: string };

export function parseExerciseHtml(html: string): ParsedBlock[] {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstChild as Element;
  const blocks: ParsedBlock[] = [];
  let pendingWordBank: string[] = [];

  root.childNodes.forEach((node) => {
    const el = node as Element;
    const tag = el.tagName;

    if (tag === "H4") {
      blocks.push({ kind: "header", text: el.textContent?.trim() ?? "" });
      pendingWordBank = [];
    } else if (tag === "DIV") {
      const freeOpts = el.querySelectorAll("#ul-free-option li");
      if (freeOpts.length) {
        pendingWordBank = Array.from(freeOpts).map((li) => li.textContent?.trim() ?? "");
      }
    } else if (tag === "OL") {
      const items = Array.from(el.querySelectorAll(":scope > li"));
      if (!items.length) return;

      // Word-blank: all items share word-bank — handle as one block
      if (items[0].className === "answer-the-questions-section-word-blank") {
        const wbItems = items.map((li) => ({
          sentenceHtml: li.innerHTML.replace(/<[^>]+>/g, ""),
          answer: li.getAttribute("value") ?? "",
        }));
        blocks.push({ kind: "wordbank", wordBank: pendingWordBank, items: wbItems });
        pendingWordBank = [];
        return;
      }

      // Process each <li> individually (OLs can mix types, e.g. section + textarea)
      items.forEach((li) => {
        const cls = li.className;

        if (cls === "answer-the-questions-section") {
          const answerAttr = li.getAttribute("answer-index") ?? "0";
          const ul = li.querySelector(".ul-choose-answer");
          const ulMulti = li.querySelector(".ul-multi-choose-answer");
          if (ul) {
            const options = Array.from(ul.querySelectorAll("li")).map((o) => o.innerHTML);
            const clone = li.cloneNode(true) as Element;
            clone.querySelector(".ul-choose-answer")?.remove();
            const questionHtml = clone.innerHTML.replace(/<[^>]+>/g, "").trim();
            blocks.push({ kind: "single", questionHtml, options, answerIndex: parseInt(answerAttr) });
          } else if (ulMulti) {
            const options = Array.from(ulMulti.querySelectorAll("li")).map((o) => o.innerHTML);
            const answerIndices = answerAttr.split(",").map((n) => parseInt(n.trim()));
            const count = parseInt(ulMulti.getAttribute("q") ?? "2");
            blocks.push({ kind: "multi", options, answerIndices, count });
          }
        } else if (cls === "answer-the-questions-section-char") {
          const prefix = li.getAttribute("pre") ?? "";
          const answer = li.getAttribute("value") ?? "";
          const sentenceHtml = li.innerHTML.split(/<br\s*\/?>/i)[0];
          blocks.push({ kind: "fillblank", sentenceHtml, prefix, answer });
        } else if (cls === "answer-the-questions-section-better-fit") {
          const answerStr = li.getAttribute("answer-index") ?? "";
          const answers = answerStr.split("/").map((s) => s.trim());
          const span = li.querySelector("span");
          const words = (span?.textContent ?? "").split("/").map((s) => s.trim());
          const clone = li.cloneNode(true) as Element;
          clone.querySelector("span")?.remove();
          const sentences = clone.innerHTML
            .split(/<br\s*\/?>/i)
            .map((s) => s.trim().replace(/<[^>]+>/g, ""))
            .filter(Boolean);
          blocks.push({ kind: "betterfit", words, sentences, answers });
        } else if (cls === "answer-the-questions-CI") {
          const answer = li.getAttribute("value") ?? "";
          const sentenceHtml = li.innerHTML.replace(/^_{2,}\s*/, "");
          blocks.push({ kind: "fillblank", sentenceHtml, prefix: "C / I:", answer });
        } else if (cls === "answer-the-questions-word-similar") {
          const answer = li.getAttribute("value") ?? "";
          const sentenceHtml = li.innerHTML.split(/<br\s*\/?>/i)[0];
          blocks.push({ kind: "fillblank", sentenceHtml, prefix: "→", answer });
        } else if (cls === "answer-the-questions-textarea") {
          const answer = li.getAttribute("value") ?? "";
          const questionHtml = li.innerHTML
            .replace(/<br\s*\/?>/gi, " ")
            .replace(/_+/g, "")
            .replace(/<[^>]+>/g, "")
            .trim();
          blocks.push({ kind: "textarea", questionHtml, answer });
        }
      });
    }
  });

  return blocks;
}
