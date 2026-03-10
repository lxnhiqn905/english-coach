"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SpeechSynthesisOptions } from "@/lib/types";

interface UseSpeechSynthesisReturn {
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  isSupported: boolean;
  currentWordIndex: number;
  speak: (text: string, options?: SpeechSynthesisOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setIsSupported(true);

      const loadVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        // Filter to English voices only
        const englishVoices = allVoices.filter((voice) =>
          voice.lang.startsWith("en")
        );
        setVoices(englishVoices);
      };

      loadVoices();

      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
    }
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, options: SpeechSynthesisOptions = {}) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      // Stop any current speech
      window.speechSynthesis.cancel();
      setCurrentWordIndex(-1);

      const utterance = new SpeechSynthesisUtterance(text);

      // Apply options
      if (options.voice) utterance.voice = options.voice;
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(-1);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(-1);
      };

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          // Calculate word index from char index
          const textBeforeBoundary = text.substring(0, event.charIndex);
          const wordIndex = textBeforeBoundary.split(/\s+/).filter(Boolean).length;
          setCurrentWordIndex(wordIndex);
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking,
    isPaused,
    voices,
    isSupported,
    currentWordIndex,
    speak,
    stop,
    pause,
    resume,
  };
}
