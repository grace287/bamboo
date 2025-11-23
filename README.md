# 🎋 Bamboo Blast (밤부 블래스트)

> **"임금님 귀는 당나귀 귀!" 🗣️**
>
> 묵혀둔 속마음, 여기에 다 털어놓으세요.
> 엔터를 누르는 순간, 당신의 고민은 화려하게 폭발하고 **완벽한 '무(無)'**로 돌아갑니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Framer Motion](https://img.shields.io/badge/Motion-Animation-purple)](https://www.framer.com/motion/)

<br/>

## 📖 Project Overview
**Bamboo Blast**는 현대인을 위한 **디지털 대나무숲(Digital Bamboo Forest)**이자, 가장 안전한 **감정 소각장**입니다.

우리는 누구나 마음속에 "임금님 귀는 당나귀 귀"라고 외치고 싶은 비밀이 있습니다. 하지만 기록이 남을까 봐, 누군가 볼까 봐 망설여지죠. 이 프로젝트는 **Serverless & Stateless** 아키텍처를 통해 그 불안함을 기술적으로 제거했습니다.

### ✨ Key Concepts
* **🎋 대나무숲 (The Forest):** 누구의 눈치도 보지 않고 마음껏 소리칠 수 있는 공간.
* **⏳ 10초의 미학 (Ephemeral):** 털어놓은 고민은 설정된 시간(10s/30s) 후 자동으로 파기됩니다.
* **🔥 시각적 카타르시스 (Incineration):** Framer Motion을 활용한 '폭발', '먼지', '소각' 효과로 스트레스를 시각적으로 날려버립니다.

<br/>

## 🚀 Tech Stack

이 프로젝트는 **'흔적을 남기지 않는다(No Logs, No DB)'**는 철학 하에 설계되었습니다.

| Category | Stack | Reasoning |
| --- | --- | --- |
| **Framework** | **Next.js 14 (App Router)** | 빠른 렌더링과 SEO, 가벼운 클라이언트 사이드 로직 구현 |
| **Animation** | **Framer Motion** | 텍스트 폭파, 가루 효과 등 고성능 인터랙션 구현 |
| **State Mgmt** | **Zustand** | 가볍고 직관적인 상태 관리 (타이머 및 입력 데이터 제어) |
| **Styling** | **Tailwind CSS** | 빠르고 유연한 UI 스타일링 |
| **Database** | **NONE (In-Memory Only)** | **핵심 기능.** 그 어떤 데이터도 영구 저장소에 기록되지 않습니다. |
| **Deployment** | **Vercel** | Serverless 환경 배포 |

<br/>

## 🕹️ How It Works (Privacy First)

1.  **Write (작성):** 사용자가 대나무숲(Input Area)에 고민을 입력합니다.
2.  **Hold (대기):** 데이터는 오직 사용자의 브라우저 메모리(RAM)에만 잠시 머뭅니다.
3.  **Blast (폭파):** '소각하기' 버튼을 누르거나 타이머가 종료되면 화려한 애니메이션이 실행됩니다.
4.  **Wipe (소멸):** 애니메이션 종료 즉시 변수는 `null`로 초기화되며, 메모리에서 해제됩니다. 서버로 어떠한 요청(Post)도 보내지 않습니다.

<br/>

## 🛠️ Getting Started

로컬 환경에서 대나무숲을 직접 태워보세요.

```bash
# 1. Repository Clone
git clone [https://github.com/YOUR_ID/bamboo-blast.git](https://github.com/YOUR_ID/bamboo-blast.git)

# 2. Install Dependencies
cd bamboo-blast
npm install
# or
yarn install

# 3. Run Development Server
npm run dev