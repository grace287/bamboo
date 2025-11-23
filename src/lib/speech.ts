// src/lib/speech.ts
type Callbacks = {
  onResult?: (text: string) => void;
  onEnd?: () => void;
  onError?: (e: any) => void;
};

let recognition: SpeechRecognition | null = null;

export function startSpeechRecognition(callbacks: Callbacks) {
  if (typeof window === "undefined") return;

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    callbacks.onError?.("SpeechRecognition not supported");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "ko-KR"; // 한국어
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const results = event.results;
    const last = results[results.length - 1];
    const transcript = last[0].transcript.trim();
    if (transcript) {
      callbacks.onResult?.(transcript);
    }
  };

  recognition.onerror = (e: any) => {
    callbacks.onError?.(e);
  };

  recognition.onend = () => {
    callbacks.onEnd?.();
  };

  recognition.start();
}

export function stopSpeechRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}
