import { create } from "zustand";
import { MONSTERS, type Monster } from "../../../data/monsters"
import { useCharacterStore } from "./characterStore";
import { calculateDerivedStats } from "../systems/calculateDerivedStats";
import { calculateSkillDamage } from "../systems/calculateSkillDamage";
import { SKILLS } from "../../../data/skills";

type BattleResult = "win" | "lose" | null;

type BattleState = {
    currentMonster: Monster | null,
    monsterHp: number,
    battleLog: string[],
    isBattling: boolean,
    isPlayerTurn: boolean,
    result: BattleResult,

    startBattle: (monsterId: string) => void,
    _monsterAttack: () => void,
    playerAttack: () => void,
    playerUseSkill: (skillId: string) => void,
    endBattle: () => void,
    resetBattle: () => void,
}

// 전투 로그 최대 개수
const MAX_LOG = 50;

const addLog = (logs: string[], message: string) => {
    return [...logs, message].slice(-MAX_LOG);
}

export const useBattleStore = create<BattleState>((set, get) => ({
    currentMonster: null,
    monsterHp: 0,
    battleLog: [],
    isBattling: false,
    isPlayerTurn: true,
    result: null,

    startBattle: (monsterId: string) => {
        const monster = MONSTERS[monsterId];

        if (!monster) {
            console.log("몬스터를 찾을 수 없습니다");
            return;
        }

        set({
            currentMonster: monster,
            monsterHp: monster.hp,
            battleLog: [`⚔️ ${monster.name} 와(과) 전투 시작!`],
            isBattling: true,
            isPlayerTurn: true,
            result: null,
        });
    },

    playerAttack: () => {
        const { currentMonster, monsterHp, isPlayerTurn } = get();

        if (!currentMonster || !isPlayerTurn) return;

        const charState = useCharacterStore.getState();
        const derived = calculateDerivedStats(
            charState.level,
            charState.job,
            charState.stats,
            charState.equippedItems,
        );

        // 크리티컬 판정
        const isCritical = Math.random() < derived.critChance;
        const critMultiplier = isCritical ? derived.critDamage : 1;

        // 기본 공격 데미지 = 공격력 - 몬스터 방어력 <= 스킬 데미지로 변경해야함
        const rawDamage = derived.attack * critMultiplier;
        const finalDamage = Math.max(1, Math.floor(rawDamage - currentMonster.defense));

        const newMonsterHp = monsterHp - finalDamage;
        const critText = isCritical ? " ✨ 크리티컬!" : "";

        const newLog = addLog(
            get().battleLog,
            `🗡️ 기본 공격! ${finalDamage} 데미지${critText}`
        );

        // 몬스터 사망 체크
        if (newMonsterHp <= 0) {
            set({ monsterHp: 0, battleLog: addLog(newLog, `💀 ${currentMonster.name} 처치!`) });
            get().endBattle();
            return;
        }

        // 몬스터 턴으로 넘기기
        set({
            monsterHp: newMonsterHp,
            battleLog: newLog,
            isPlayerTurn: false,
        });

        // 몬스터 자동 공격 (약간의 딜레이)
        setTimeout(() => get()._monsterAttack(), 800);
    },

    playerUseSkill: (skillId: string) => {
        const { currentMonster, monsterHp, isPlayerTurn } = get();

        if (!currentMonster || !isPlayerTurn) return;

        const charState = useCharacterStore.getState();
        const skillData = SKILLS[charState.job]?.[skillId];

        if (!skillData || skillData.cost === null) {
            console.log("스킬을 찾을 수 없습니다");
            return;
        }

        if (charState.mp < skillData.cost) {
            set({ battleLog: addLog(get().battleLog, "💧 마나가 부족합니다!") });
            return;
        }

        // 마나 차감
        useCharacterStore.setState({ mp: charState.mp - skillData.cost });

        const { damage, isCritical } = calculateSkillDamage(
            charState.level,
            charState.job,
            charState.stats,
            charState.equippedItems,
            skillData,
            charState.skillLevels,
        );

        const finalDamage = Math.max(1, damage - currentMonster.defense);
        const critText = isCritical ? " ✨ 크리티컬!" : "";
        const newMonsterHp = monsterHp - finalDamage;

        const newLog = addLog(
            get().battleLog,
            `✨ ${skillData.name}! ${finalDamage} 데미지${critText}`
        );

        // 몬스터 사망 체크
        if (newMonsterHp <= 0) {
            set({ monsterHp: 0, battleLog: addLog(newLog, `💀 ${currentMonster.name} 처치!`) });
            get().endBattle();
            return;
        }

        // 몬스터 턴으로 넘기기
        set({
            monsterHp: newMonsterHp,
            battleLog: newLog,
            isPlayerTurn: false,
        });

        setTimeout(() => get()._monsterAttack(), 800);
    },

    // 내부 함수 (몬스터 공격)
    _monsterAttack: () => {
        const { currentMonster } = get();
        if (!currentMonster) return;

        const charState = useCharacterStore.getState();
        const derived = calculateDerivedStats(
            charState.level,
            charState.job,
            charState.stats,
            charState.equippedItems,
        );

        // 몬스터 데미지 = 몬스터 공격력 - 플레이어 방어력
        const rawDamage = currentMonster.attack;
        const finalDamage = Math.max(1, Math.floor(rawDamage - derived.defense));

        const newHp = charState.hp - finalDamage;

        const newLog = addLog(
            get().battleLog,
            `👾 ${currentMonster.name} 공격! ${finalDamage} 데미지`
        );

        // 플레이어 사망 체크
        if (newHp <= 0) {
            useCharacterStore.setState({ hp: 0 });
            set({
                battleLog: addLog(newLog, "💀 패배..."),
                isBattling: false,
                isPlayerTurn: false,
                result: "lose",
            });
            return;
        }

        useCharacterStore.setState({ hp: newHp });
        set({
            battleLog: newLog,
            isPlayerTurn: true,
        });
    },

    endBattle: () => {
        const { currentMonster } = get();
        if (!currentMonster) return;

        const charState = useCharacterStore.getState();
        let log = get().battleLog;

        // 경험치 지급
        const newExp = (charState.exp ?? 0) + currentMonster.exp;
        log = addLog(log, `⭐ 경험치 +${currentMonster.exp}`);

        // 드롭 아이템 처리
        const droppedItems: string[] = [];
        currentMonster.drops.forEach((drop) => {
            if (Math.random() < drop.chance) {
                droppedItems.push(drop.itemId);
                log = addLog(log, `🎁 ${drop.itemId} 획득!`);
            }
        });

        if (droppedItems.length === 0) {
            log = addLog(log, "🎁 드롭 아이템 없음");
        }

        // 인벤토리에 아이템 추가
        droppedItems.forEach((itemId) => {
            useCharacterStore.getState().addItem(itemId);
        });

        useCharacterStore.setState({ exp: newExp });
        useCharacterStore.getState().checkLevelUp();

        set({
            isBattling: false,
            isPlayerTurn: false,
            result: "win",
            battleLog: log,
        });
    },

    resetBattle: () => {
        set({
            currentMonster: null,
            monsterHp: 0,
            battleLog: [],
            isBattling: false,
            isPlayerTurn: true,
            result: null,
        })
    }
}));