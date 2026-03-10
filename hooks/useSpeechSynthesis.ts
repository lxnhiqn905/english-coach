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
  // Fix for Chrome Android: keep-alive interval to prevent TTS stopping at ~15s
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopKeepAlive = useCallback(() => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }, []);

  const startKeepAlive = useCallback(() => {
    stopKeepAlive();
    // Chrome Android stops speech after ~15s — pause/resume trick keeps it alive
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  }, [stopKeepAlive]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    setIsSupported(true);

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const englishVoices = allVoices.filter((v) => v.lang.startsWith("en"));
      if (englishVoices.length > 0) {
        setVoices(englishVoices);
      } else if (allVoices.length > 0) {
        // Fallback: show all voices if no English voices found
        setVoices(allVoices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Android Chrome: voices may load late — retry a few times
    const retries = [100, 500, 1000, 2000];
    const timers = retries.map((delay) => setTimeout(loadVoices, delay));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    stopKeepAlive();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
  }, [stopKeepAlive]);

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    stopKeepAlive();
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [stopKeepAlive]);

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
    startKeepAlive();
  }, [startKeepAlive]);

  const speak = useCallback(
    (text: string, options: SpeechSynthesisOptions = {}) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      window.speechSynthesis.cancel();
      stopKeepAlive();
      setCurrentWordIndex(-1);

      const utterance = new SpeechSynthesisUtterance(text);

      // Only set voice if one is explicitly chosen and available
      // On Android Chrome, not setting voice uses the system default (which works)
      if (options.voice) utterance.voice = options.voice;
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;
      utterance.lang = "en-US";

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        startKeepAlive();
      };

      utterance.onend = () => {
        stopKeepAlive();
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(-1);
      };

      utterance.onerror = (event) => {
        // "interrupted" is normal when stop() is called — not a real error
        if (event.error === "interrupted" || event.error === "canceled") return;
        console.error("Speech synthesis error:", event.error);
        stopKeepAlive();
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(-1);
      };

      // boundary event not supported on all Android Chrome versions — graceful fallback
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const textBefore = text.substring(0, event.charIndex);
          const wordIndex = textBefore.split(/\s+/).filter(Boolean).length;
          setCurrentWordIndex(wordIndex);
        }
      };

      utteranceRef.current = utterance;

      // Android Chrome: small delay after cancel() before speak() to avoid silent failure
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);
    },
    [startKeepAlive, stopKeepAlive]
  );

  useEffect(() => {
    return () => {
      stopKeepAlive();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stopKeepAlive]);

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
