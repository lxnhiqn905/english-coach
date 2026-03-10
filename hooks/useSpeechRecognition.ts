"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechRecognitionOptions {
  language?: string;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionConstructor = new () => any;

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn {
  const { language = "en-US" } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const savedTextRef = useRef(""); // text accumulated from previous sessions (after Android auto-restart)
  const currentFinalsRef = useRef(""); // finals in the current session

  useEffect(() => {
    if (typeof window !== "undefined") {
      const API = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (API) setIsSupported(true);
    }
  }, []);

  const createRecognition = useCallback(() => {
    if (typeof window === "undefined") return null;
    const API = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!API) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new API();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let finals = "";
      let interim = "";

      for (let i = 0; i < event.results.length; i++) {
        const text = event.results[i][0].transcript.trim();
        if (event.results[i].isFinal) {
          finals += (finals ? " " : "") + text;
        } else {
          interim += text;
        }
      }

      currentFinalsRef.current = finals;
      const saved = savedTextRef.current;
      setTranscript(saved ? saved + (finals ? " " + finals : "") : finals);
      setInterimTranscript(interim);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error === "aborted" || event.error === "no-speech") return;
      setError(`Error: ${event.error}`);
      isListeningRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      setInterimTranscript("");

      if (isListeningRef.current) {
        // Save finals from this session before restarting (Android restarts after silence)
        const current = currentFinalsRef.current;
        if (current) {
          savedTextRef.current = savedTextRef.current
            ? savedTextRef.current + " " + current
            : current;
        }
        currentFinalsRef.current = "";
        try {
          recognition.start();
        } catch {
          isListeningRef.current = false;
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    return recognition;
  }, [language]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    // Reset session state
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    savedTextRef.current = "";
    currentFinalsRef.current = "";

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = createRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    isListeningRef.current = true;

    try {
      recognition.start();
    } catch (err) {
      setError("Failed to start. Please try again.");
      isListeningRef.current = false;
      console.error(err);
    }
  }, [isSupported, createRecognition]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsListening(false);
    setInterimTranscript("");
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
