import { useState } from "react";
import InventoryPanel from "../characters/components/InventoryPanel";
import CharacterPanel from "../characters/components/CharacterPanel";
import JobPanel from "../characters/components/JobPanel";
import EquipmentPanel from "../characters/components/EquipmentPanel";
import SkillPanel from "../characters/components/SkillPanel";
import BattlePanel from "../characters/components/BattlePanel";
import ShopPanel from "../characters/components/ShopPanel";

type TabType = "character" | "inventory" | "job" | "equipment" | "skill" | "battle" | "shop";

const TAB_CONFIG: Record<TabType, { icon: string, label: string, color: string, activeColor: string }> = {
    character: { icon: "👤", label: "캐릭터", color: "bg-blue-500", activeColor: "bg-blue-400" },
    inventory: { icon: "🎒", label: "인벤토리", color: "bg-yellow-500", activeColor: "bg-yellow-400" },
    shop: { icon: "🛒", label: "상점", color: "bg-yellow-500", activeColor: "bg-yellow-400" },
    job: { icon: "⚡", label: "전직", color: "bg-purple-500", activeColor: "bg-purple-400" },
    equipment: { icon: "🛡️", label: "장비창", color: "bg-orange-500", activeColor: "bg-orange-400" },
    skill: { icon: "✨", label: "스킬", color: "bg-cyan-500", activeColor: "bg-cyan-400" },
    battle: { icon: "⚔️", label: "전투", color: "bg-gray-600", activeColor: "bg-gray-400" },
}

export function TabMenu() {
    const [tab, setTab] =
        useState<"character" | "inventory" | "job" | "equipment" | "skill" | "battle" | "shop">("character");

    return (
        <div className="flex flex-col items-center">
            <div className="flex text-gray-200">
                {(Object.keys(TAB_CONFIG) as TabType[]).map((tabKey) => {
                    const config = TAB_CONFIG[tabKey];
                    const isActive = tab === tabKey;

                    return (
                        <div key={tabKey} className="relative group">
                            <button
                                onClick={() => setTab(tabKey)}
                                className={`
                                    w-12 h-10 rounded-t-lg border border-b-0
                                    flex items-center justify-center
                                    text-lg transition
                                    ${isActive ? config.activeColor : config.color}
                                `}
                            >
                                {config.icon}
                            </button>

                            {/* 툴팁 */}
                            <div
                                className="
                                    absolute opacity-0 group-hover:opacity-100
                                    top-full mb-1 left-1/2 -translate-x-1/2
                                    bg-gray-800 border border-gray-600 
                                    text-white text-xs px-2 py-1 rounded
                                    whitespace-nowrap pointer-events-none
                                    transition-opacity duration-150 z-10
                            ">
                                {config.label}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="-mt-[0px]">
                {tab === "character" && <CharacterPanel />}
                {tab === "inventory" && <InventoryPanel />}
                {tab === "shop" && <ShopPanel />}
                {tab === "job" && <JobPanel />}
                {tab === "equipment" && <EquipmentPanel />}
                {tab === "skill" && <SkillPanel />}
                {tab === "battle" && <BattlePanel />}
            </div>
        </div>
    )
}

export default TabMenu