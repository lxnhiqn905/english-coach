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
  const isListeningRef = useRef(false); // ref to track listening state inside callbacks
  const savedTextRef = useRef(""); // accumulated text from completed recognition sessions
  const currentSessionTextRef = useRef(""); // text from current active session

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
      // Rebuild from all results in this session (avoid duplicate append bug)
      let sessionFinals = "";
      let interim = "";

      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          sessionFinals += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      currentSessionTextRef.current = sessionFinals;

      // Total = saved from previous sessions + current session
      setTranscript(savedTextRef.current + sessionFinals);
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
        // Android Chrome auto-stops after silence → save current and restart
        savedTextRef.current += currentSessionTextRef.current;
        currentSessionTextRef.current = "";

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
    savedTextRef.current = "";
    currentSessionTextRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setError(null);

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
      // Save any remaining current session text before stopping
      const finalText = savedTextRef.current + currentSessionTextRef.current;
      if (finalText) setTranscript(finalText);

      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsListening(false);
    setInterimTranscript("");
  }, []);

  const resetTranscript = useCallback(() => {
    savedTextRef.current = "";
    currentSessionTextRef.current = "";
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
