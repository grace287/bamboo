// src/components/EmotionInput.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Trash2, Timer, Loader } from "lucide-react";
import { startSpeechRecognition, stopSpeechRecognition } from "@/lib/speech";
import ComfortMessage from "./ComfortMessage";

const TIMER_OPTIONS = [0, 5, 10, 30, 60]; // 초 단위

interface ComfortData {
  emotion: string;
  message: string;
}

export default function EmotionInput() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(10);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isBurning, setIsBurning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comfortData, setComfortData] = useState<ComfortData | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 카운트다운
  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      // 실제 삭제 시점 + AI 위로 받기
      handleComfort();
      return;
    }
    const id = setTimeout(() => {
      setRemaining((prev) => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearTimeout(id);
  }, [remaining]);

  const handleStartSpeech = () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    startSpeechRecognition({
      onResult: (resultText) => {
        setText((prev) => (prev ? prev + "\n" + resultText : resultText));
      },
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStopSpeech = () => {
    setIsSpeaking(false);
    stopSpeechRecognition();
  };

  // AI 위로 메시지 받기
  const handleComfort = async () => {
    if (!text.trim()) {
      setText("");
      setIsBurning(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/comfort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const data: ComfortData = await res.json();
        setComfortData(data);
      }
    } catch (error) {
      console.error("위로 메시지 받기 실패:", error);
    } finally {
      setIsLoading(false);
      // 텍스트 삭제
      setText("");
      setIsBurning(false);
      setRemaining(null);
    }
  };

  const handleTrash = () => {
    if (!text.trim()) return;
    // 타이머 0이면 즉시 삭제
    if (selectedTimer === 0) {
      setIsBurning(true);
      setTimeout(() => {
        handleComfort();
      }, 1200); // 애니메이션 시간
      return;
    }
    // 타이머 시작
    setIsBurning(true);
    setRemaining(selectedTimer);
  };

  const disabled = !text.trim() || remaining !== null || isLoading;

  return (
    <div className="space-y-4">
      {/* 위로 메시지 모달 */}
      {comfortData && (
        <ComfortMessage
          message={comfortData.message}
          emotion={comfortData.emotion}
          onComplete={() => setComfortData(null)}
        />
      )}

      {/* 텍스트 입력 영역 */}
      <div className="relative">
        <textarea
          className={`w-full min-h-[160px] resize-none rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:border-emotionAccent/70 focus:ring-2 focus:ring-emotionAccent/40 transition-all placeholder-slate-400
            ${isBurning ? "animate-burn" : ""}
            ${isLoading ? "opacity-50" : ""}`}
          placeholder="아무 말이나 다 해도 괜찮아요. 여기서 사라집니다..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        {isBurning && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-orange-500/20 via-red-600/20 to-black/60 mix-blend-screen" />
        )}

        {/* 로딩 표시 */}
        {isLoading && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader className="w-5 h-5 text-emotionAccent animate-spin" />
              <span className="text-xs text-emotionAccent">위로를 준비 중...</span>
            </div>
          </div>
        )}
      </div>

      {/* 타이머 선택 & 음성 버튼 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-wrap">
        {/* 타이머 선택 */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <Timer className="w-4 h-4 flex-shrink-0" />
          <span className="mr-1">타이머:</span>
          <div className="flex gap-1 flex-wrap">
            {TIMER_OPTIONS.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedTimer(sec)}
                disabled={disabled}
                className={`px-2 py-1 rounded-full border text-[11px] transition ${
                  selectedTimer === sec
                    ? "border-emotionAccent bg-emotionAccent/20"
                    : "border-white/10 hover:border-emotionAccent/60"
                } ${disabled ? "opacity-50" : ""}`}
              >
                {sec === 0 ? "즉시" : `${sec}s`}
              </button>
            ))}
          </div>
        </div>

        {/* 음성 버튼 */}
        <button
          type="button"
          onClick={isSpeaking ? handleStopSpeech : handleStartSpeech}
          disabled={disabled}
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition whitespace-nowrap ${
            isSpeaking
              ? "border-red-500 bg-red-500/20 text-red-200"
              : "border-white/10 hover:border-emotionAccent/60"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSpeaking ? (
            <>
              <MicOff className="w-3 h-3" />
              말 그만하기
            </>
          ) : (
            <>
              <Mic className="w-3 h-3" />
              음성 입력
            </>
          )}
        </button>
      </div>

      {/* 버리기 버튼 & 상태 표시 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          disabled={disabled}
          onClick={handleTrash}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
            ${
              disabled
                ? "bg-slate-700/60 text-slate-400 cursor-not-allowed"
                : "bg-emotionAccent/90 hover:bg-emotionAccent text-white hover:shadow-lg hover:shadow-emotionAccent/50"
            }`}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              감정 버리기
            </>
          )}
        </button>

        <div className="text-xs text-slate-400 text-center sm:text-right">
          {isLoading ? (
            <span className="text-emotionAccent font-semibold">
              ✨ 당신을 위한 위로를 준비 중...
            </span>
          ) : remaining !== null ? (
            <span className="font-semibold text-emotionAccent animate-countdownPulse">
              🔥 폭파까지 {remaining}초 남음...
            </span>
          ) : isBurning ? (
            <span>감정이 안전하게 불태워지는 중입니다...</span>
          ) : (
            <span>기록, 로그, 저장 없이 바로 사라집니다.</span>
          )}
        </div>
      </div>

      {/* 문자 수 표시 */}
      <div className="text-xs text-slate-500 text-right">
        {text.length} / 500자
      </div>
    </div>
  );
}
