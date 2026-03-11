"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { sentenceTopics } from "@/lib/data/sentences";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), { ssr: false });

export default function SentenceTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = sentenceTopics.find((t) => t.id === topicId);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!topic) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-slate-400">
        Topic not found.
      </div>
    );
  }

  const pdfUrl = `/sentences/${topic.id}/content.pdf`;
  const mp3Url = `/sentences/${topic.id}/audio.mp3`;

  function toggleAudio() {
    if (!topic?.hasAudio) return;
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
    } else {
      const audio = new Audio(mp3Url);
      audioRef.current = audio;
      audio.play();
      setPlaying(true);
      audio.onended = () => {
        setPlaying(false);
        audioRef.current = null;
      };
    }
  }

  return (
    <div className="min-h-screen pt-16 pb-8 flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#111827]/80 backdrop-blur-sm px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            href="/sentences"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-slate-100 truncate">{topic.title}</h1>
            <p className="text-xs text-slate-500">{topic.subtitle}</p>
          </div>
          {topic.hasAudio && (
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                playing
                  ? "bg-purple-500/30 text-purple-300 border border-purple-500/40"
                  : "bg-purple-500/15 text-purple-400 border border-purple-500/20 hover:bg-purple-500/25"
              }`}
            >
              {playing ? (
                <>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  Đang phát
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                  Nghe audio
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-4">
        <PdfViewer url={pdfUrl} />
      </div>
    </div>
  );
}
