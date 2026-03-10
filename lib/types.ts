export interface PracticeSession {
  id: string;
  user_id?: string;
  type: "stt" | "tts";
  content: string;
  created_at: string;
  duration_seconds?: number;
  word_count?: number;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechSynthesisOptions {
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
}
