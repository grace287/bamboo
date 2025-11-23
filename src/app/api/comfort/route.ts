// src/app/api/comfort/route.ts
import { NextResponse } from "next/server";

// 간단한 감정 분석 + 위로 메시지 템플릿
const COMFORT_MESSAGES: {
  [key: string]: string[];
} = {
  sad: [
    "지금 이렇게 마음을 열어준 것만으로도 정말 잘하고 있어요.",
    "그런 마음이 든다는 건 충분히 이해돼요.",
    "지금 많이 힘들겠지만, 당신은 혼자가 아니에요.",
    "아픈 마음, 계속 가져도 괜찮아요.",
  ],
  angry: [
    "많이 참아왔을 텐데, 지금만큼은 당신 감정이 충분히 이해돼요.",
    "화낼 이유가 충분했을 거예요.",
    "그 분노는 당신의 소중한 신호니까요.",
  ],
  anxious: [
    "불안함은 괜찮아요. 지금처럼 천천히 숨을 고르고 있어줘요.",
    "모든 걱정이 현실이 되지는 않을 거예요.",
    "불안해도 괜찮아요. 당신은 충분히 강해요.",
  ],
  hurt: [
    "그 일이 당신 잘못이 아니에요. 아프다는 마음이 정말 소중해요.",
    "상처받은 당신의 감정을 충분히 이해해요.",
    "이런 시간도 지나갈 거예요.",
  ],
  tired: [
    "지금 너무 많이 버텨왔죠. 이제는 조금 쉬어도 괜찮아요.",
    "피로해하는 당신을 응원해요.",
    "무리하지 않아도 되는 날도 괜찮아요.",
  ],
  lonely: [
    "혼자라고 느껴져도, 당신의 마음은 여기서 충분히 이해받고 있어요.",
    "외로움을 느낄 수 있다는 것도 당신이 누군가를 소중히 여기기 때문이에요.",
    "외로워도, 이 감정을 나눠줘서 고마워요.",
  ],
  guilty: [
    "당신은 이미 최선을 다했고, 스스로를 너무 탓하지 않아도 돼요.",
    "모든 책임을 스스로 지울 필요는 없어요.",
    "당신을 용서해주는 용기를 내봐요.",
  ],
  confused: [
    "모르겠다는 감정도 자연스러워요. 지금은 방향을 찾는 중일 뿐이에요.",
    "혼란스러워하는 것도 성장의 과정이에요.",
    "모든 답을 지금 알아야 하는 건 아니에요.",
  ],
  powerless: [
    "지금 아무것도 하기 힘든 느낌, 충분히 이해돼요. 잠시 쉬어도 괜찮아요.",
    "무기력함도 당신의 신호니까요. 지금은 쉬는 시간이에요.",
    "이 시간도 지나갈 거예요. 당신을 믿어줄게요.",
  ],
};

// 감정 분석 (간단한 키워드 기반)
function analyzeEmotion(
  text: string
): { emotion: string; message: string } {
  const lowerText = text.toLowerCase();

  // 감정 키워드 매핑
  const emotionKeywords: { [key: string]: string[] } = {
    sad: ["슬프", "우울", "눈물", "흐느", "절망", "비통", "한숨"],
    angry: ["화나", "짜증", "분노", "화가", "열받", "욕", "미칠"],
    anxious: ["불안", "걱정", "떨렸", "공포", "두렵", "괴로", "조심스럽"],
    hurt: ["상처", "아파", "상한", "아픔", "괴롭", "비통"],
    tired: ["피곤", "지쳤", "지친", "피로", "힘들", "탈진"],
    lonely: ["혼자", "외로", "고독", "떨어져", "단절"],
    guilty: ["죄책감", "후회", "미안", "잘못", "탓"],
    confused: ["혼란", "헷갈", "모르겠", "어리둥절", "정신없"],
    powerless: ["무기력", "아무것도", "할 수 없", "희망 없", "무력감"],
  };

  // 감정 점수 계산
  let emotionScores: { [key: string]: number } = {};
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    emotionScores[emotion] = keywords.filter((kw) =>
      lowerText.includes(kw)
    ).length;
  }

  // 최고 점수 감정 찾기
  let maxEmotion = "sad";
  let maxScore = 0;
  for (const [emotion, score] of Object.entries(emotionScores)) {
    if (score > maxScore) {
      maxScore = score;
      maxEmotion = emotion;
    }
  }

  // 기본값
  if (maxScore === 0) maxEmotion = "sad";

  const messages = COMFORT_MESSAGES[maxEmotion];
  const message = messages[Math.floor(Math.random() * messages.length)];

  return {
    emotion: maxEmotion,
    message,
  };
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // 감정 분석 (로컬 처리, 저장 X)
    const result = analyzeEmotion(text);

    // 즉시 메모리에서 폐기 - 저장 안 함
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
