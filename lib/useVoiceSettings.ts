"use client";

import { useState, useCallback } from "react";

interface VoiceSettings {
  voiceURI: string | null;
  rate: number;
}

const STORAGE_KEY = "voice_settings";
const DEFAULT_RATE = 1;

function loadSettings(): VoiceSettings {
  if (typeof window === "undefined") return { voiceURI: null, rate: DEFAULT_RATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { voiceURI: null, rate: DEFAULT_RATE };
    return JSON.parse(raw);
  } catch {
    return { voiceURI: null, rate: DEFAULT_RATE };
  }
}

function saveSettings(settings: VoiceSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function useVoiceSettings() {
  const [settings, setSettings] = useState<VoiceSettings>(loadSettings);

  const setVoiceURI = useCallback((voiceURI: string | null) => {
    setSettings(prev => {
      const next = { ...prev, voiceURI };
      saveSettings(next);
      return next;
    });
  }, []);

  const setRate = useCallback((rate: number) => {
    setSettings(prev => {
      const next = { ...prev, rate };
      saveSettings(next);
      return next;
    });
  }, []);

  function getVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
    if (!settings.voiceURI) return undefined;
    return voices.find(v => v.voiceURI === settings.voiceURI);
  }

  return { voiceURI: settings.voiceURI, rate: settings.rate, setVoiceURI, setRate, getVoice };
}
