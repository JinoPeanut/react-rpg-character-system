import { EQUIPMENTS } from "../../../data/equipments";
import { useCharacterStore } from "../store/characterStore"

const SLOT_CONFIG = {
    weapon: {
        label: "무기",
        icon: "⚔️",
        position: "absolute top-[44%] left-[3%]",
    },
    armorTop: {
        label: "상의",
        icon: "👕",
        position: "absolute top-[18%] left-1/2 -translate-x-1/2",
    },
    armorBottom: {
        label: "하의",
        icon: "👖",
        position: "absolute top-[52%] left-1/2 -translate-x-1/2",
    },
}

type SlotKey = keyof typeof SLOT_CONFIG;

export default function EquippedItems() {

    const equipped = useCharacterStore((s) => s.equippedItems);
    const unEquipItem = useCharacterStore((s) => s.unEquipItem);

    const getItem = (slot: SlotKey) => {
        if (slot === "weapon") {
            return equipped.weapon ? EQUIPMENTS.weapon[equipped.weapon] : null;
        }
        const armorId = equipped[slot];
        return armorId ? EQUIPMENTS.armor[armorId] : null;
    }

    return (
        <div>
            {(Object.keys(SLOT_CONFIG) as SlotKey[]).map((slot) => {
                const config = SLOT_CONFIG[slot];
                const item = getItem(slot);

                return (
                    <div
                        key={slot}
                        onDoubleClick={() => unEquipItem(slot)}
                        className={`${config.position} group w-14 h-14`}
                    >
                        {/* 슬롯 박스 */}
                        <div className={`
                            w-14 h-14 rounded-lg border-2
                            flex flex-col items-center justify-center
                            cursor-pointer transition-all duration-200
                            ${item
                                ? "border-yellow-500 bg-gray-800/90 hover:border-yellow-300"
                                : "border-gray-600 bg-gray-800/60 hover:border-gray-400"
                            }
                        `}>
                            <span className="text-xl">
                                {item ? config.icon : ""}
                            </span>
                            {!item && (
                                <span className="text-gray-600 text-xs">
                                    {config.label}
                                </span>
                            )}
                        </div>

                        {/* 툴팁 */}
                        {item && (
                            <div className="
                                absolute opacity-0 group-hover:opacity-100
                                z-10 bg-gray-900 border border-gray-600
                                text-white text-sm p-3 rounded-lg
                                shadow-xl whitespace-nowrap bottom-full
                                mb-2 left-1/2 -translate-x-1/2
                                pointer-events-none
                                transition-opacity duration-150
                            ">
                                {/* 아이템 이름 */}
                                <div className="
                                    flex items-center gap-2 mb-2
                                    border-b border-gray-600 pb-2
                                ">
                                    <span>{config.icon}</span>
                                    <span className="font-bold text-yellow-400">
                                        {item.name}
                                    </span>
                                </div>

                                {/* 스탯 */}
                                <div className="flex flex-col gap-1 text-xs">
                                    {item.attack
                                        ? <span className="text-red-400">
                                            ⚔️ 공격력 +{item.attack}
                                        </span>
                                        : null
                                    }
                                    {item.magic
                                        ? <span className="text-blue-400">
                                            ✨ 마력 +{item.magic}
                                        </span>
                                        : null
                                    }
                                    {item.defense
                                        ? <span className="text-green-400">
                                            🛡️ 방어력 +{item.defense}
                                        </span>
                                        : null
                                    }
                                </div>

                                {/* 해제 안내 */}
                                <div className="
                                    mt-2 pt-2 border-t
                                    border-gray-600 text-gray-500 text-xs
                                ">
                                    더블클릭으로 해제
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}