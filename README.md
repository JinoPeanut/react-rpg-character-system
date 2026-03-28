# React RPG Character System

간단한 RPG 캐릭터 능력치 시스템을 React와 Zustand로 구현한 프로젝트입니다.
레벨업, 스탯 분배, 전직 시스템, 파생 능력치 계산 등을 구현했습니다.

🔗 **[플레이 링크](https://react-rpg-character-system.vercel.app/)**

## 기술스택

- React, TailWind CSS (UI)
- TypeScript (언어)
- Zustand (상태관리)
- Vite (빌드)
- Vitest (테스트)
- Vercel (배포)

## ⚙️ 주요 기능

### 캐릭터 시스템

- Str / Dex / Int / Luk 스탯 포인트 분배
- 레벨업 시 스탯 포인트 지급
- 스탯 초기화 기능

### 전직 시스템

- 전사 / 궁수 / 마법사 / 도적 4가지 직업
- 레벨 + 스탯 조건 충족 시 전직 가능
- 직업별 고유 공식으로 스탯 계산 (공격력, 마력, 방어력, HP, MP)

### 스킬 시스템

- 전직 후 레벨업마다 스킬 포인트 지급
- 스킬 레벨에 따른 데미지% 증가
- 직업별 고유 스킬 구성

### 전투 시스템

- 턴제 전투 (플레이어 → 몬스터)
- 크리티컬 확률/데미지 계산
- 승리 시 경험치 + 골드 + 아이템 드롭
- 경험치 누적 시 자동 레벨업

### 장비 / 인벤토리 시스템

- 무기 / 상의 / 하의 슬롯
- 인벤토리에서 더블클릭으로 장착/해제
- 직업별 장비 제한

### 상점 시스템

- 골드로 장비 / 포션 구매
- 보유 아이템 판매

### 데이터 저장

- `localStorage` + Zustand persist 로 자동 저장
- 새로고침 후에도 데이터 유지

## 🔥 트러블슈팅

### 1. TypeScript `satisfies` 로 인한 동적 인덱싱 문제

**문제**  
`JOBS` 객체에 `satisfies Record<string, Job>` 를 적용했더니 `JOBS[state.job]` 같은 동적 접근에서 타입 에러 발생

**원인**  
`satisfies` 는 각 항목을 구체적인 리터럴 타입으로 추론해서 `string` 키로 접근하면 타입 불일치 발생

**해결**  
`JobType` 을 문자열 유니온으로 직접 정의하고 `Record<JobType, Job>` 으로 타입 변경

(TypeScript)
export type JobType = "adventure" | "warrior" | "archer" | "mage" | "thief";
export const JOBS: Record = { ... }

---

### 2. 스킬 데미지 공식 설계

**문제**  
1레벨 100%, 만렙 110% 를 맞추려는데 단순히 `skillLevel * damagePerLevel` 로 계산하면 만렙 기준이 맞지 않음

**해결**  
만렙 기준 총 증가량을 레벨에 비례해서 나눠주는 공식 설계

(TypeScript)
const totalIncrease = (damagePerLevel * (skillLevel - 1)) / (maxLevel - 1);
const skillPercent = (baseDamage + totalIncrease) / 100;

---

### 3. Zustand store 간 참조 문제

**문제**  
`battleStore` 에서 `characterStore` 의 상태를 변경해야 하는데 훅을 사용할 수 없는 환경

**해결**  
`useCharacterStore.getState()` 와 `useCharacterStore.setState()` 로 훅 없이 store 에 직접 접근

(TypeScript)
useCharacterStore.getState().checkLevelUp();
useCharacterStore.setState({ hp: newHp });
