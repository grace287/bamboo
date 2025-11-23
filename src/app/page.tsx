// src/app/page.tsx
"use client";

import EmotionInput from "@/components/EmotionInput";

export default function Page() {
  return (
    <main className="w-full max-w-xl">
      <div className="rounded-3xl bg-white/5 backdrop-blur-lg p-6 shadow-glass border border-white/10">
        <h1 className="text-3xl font-semibold mb-2">
          🗑 온라인 마음쓰레기통
        </h1>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          하고 싶은 말을 마음껏 쏟아내고, 타이머가 끝나면 흔적 없이 사라집니다.
          <br />
          기록, 로그, 저장 모두 없습니다.
        </p>

        <EmotionInput />
      </div>

      {/* 하단 정보 */}
      <div className="mt-8 text-center text-xs text-slate-400 space-y-2">
        <p>✨ 당신의 감정은 완전히 안전합니다</p>
        <p>🔒 IP 추적 없음 • 로그 저장 없음 • 기록 없음</p>
      </div>
    </main>
  );
}
