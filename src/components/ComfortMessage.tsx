// src/components/ComfortMessage.tsx
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface ComfortMessageProps {
  message: string;
  emotion: string;
  onComplete?: () => void;
}

export default function ComfortMessage({
  message,
  emotion,
  onComplete,
}: ComfortMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600); // 애니메이션 후 콜백
    }, 4000); // 4초 후 사라짐

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center px-4 pointer-events-none z-50 ${isVisible ? "animate-fadeIn" : "animate-fadeOut"}`}>
      <div
        className={`relative max-w-md w-full rounded-2xl bg-gradient-to-br from-emotionAccent/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-emotionAccent/40 p-6 shadow-lg transform transition-all ${
          isVisible
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
      >
        {/* 배경 글로우 */}
        <div className="absolute -inset-2 bg-gradient-to-r from-emotionAccent/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-50 -z-10" />

        {/* 별 파티클 애니메이션 */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* 컨텐츠 */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* 위로 아이콘 */}
          <div className="animate-float">
            <Heart className="w-8 h-8 text-pink-300 fill-pink-300" />
          </div>

          {/* 헤더 */}
          <p className="text-sm text-slate-300 font-medium text-center">
            ✨ 감정이 안전하게 사라졌어요
          </p>

          {/* 위로 메시지 */}
          <p className="text-lg text-white text-center leading-relaxed font-light italic">
            "{message}"
          </p>

          {/* 감정 배지 */}
          <div className="text-xs px-3 py-1 rounded-full bg-emotionAccent/30 text-emotionAccent border border-emotionAccent/50">
            감정 분류: {getEmotionLabel(emotion)}
          </div>
        </div>

        {/* 하단 라인 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emotionAccent/50 to-transparent" />
      </div>
    </div>
  );
}

function getEmotionLabel(emotion: string): string {
  const labels: { [key: string]: string } = {
    sad: "슬픔",
    angry: "분노",
    anxious: "불안",
    hurt: "상처",
    tired: "피로",
    lonely: "외로움",
    guilty: "죄책감",
    confused: "혼란",
    powerless: "무기력",
  };
  return labels[emotion] || "감정";
}
