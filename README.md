# React RPG Character System

간단한 RPG 캐릭터 능력치 시스템을 React와 Zustand로 구현한 프로젝트입니다.
레벨업, 스탯 분배, 전직 시스템, 파생 능력치 계산 등을 구현했습니다.

## 기술스택

- React
- TypeScript
- Zustand
- Tailwind CSS
- Vite
- Vitest
- Vercel

## 기능

- 캐릭터 스탯 시스템 (Str/Dex/Int/Luk)
- 전직 시스템 (전사/궁수/마법사/도적)
- 스킬 시스템 (스킬 포인트, 레벨별 데미지)
- 턴제 전투 시스템
- 장비 시스템 (인벤토리, 장착/해제)
- 상점 시스템 (골드로 구매/판매)
- 포션 시스템
- localStorage 로 데이터 저장

## 트러블슈팅

- TypeScript satisfies 로 인한 타입 에러 해결 과정
- Zustand 동적 키 인덱싱 문제 해결
- 스킬 데미지 공식 설계 과정
