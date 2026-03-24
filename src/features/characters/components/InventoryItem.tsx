import { EQUIPMENTS, type ArmorId, type WeaponId } from "../../../data/equipments"
import { useCharacterStore } from "../store/characterStore";

export type InventoryItemProps = {
    itemId: string | null,
}

function getItemIcon(itemId: string) {
    if (itemId in EQUIPMENTS.weapon) return "⚔️";
    return "🛡️";
}

const JOB_NAMES: Record<string, string> = {
    adventure: "모험가",
    warrior: "전사",
    archer: "궁수",
    mage: "마법사",
    thief: "도적",
}

function InventoryItem({ itemId }: InventoryItemProps) {

    const equipFromInventory = useCharacterStore((s) => s.equipFromInventory);

    if (!itemId) {
        return (
            <div className="
                w-20 h-20 rounded-md
                border border-gray-700
                bg-gray-800/50"
            />
        )
    }

    const item = EQUIPMENTS.weapon[itemId as WeaponId]
        ?? EQUIPMENTS.armor[itemId as ArmorId];

    if (!item) return null;

    const icon = getItemIcon(itemId);

    return (
        <div className="relative group w-20 h-20">
            <div onDoubleClick={() => equipFromInventory(itemId)}
                className="
                w-20 h-20 rounded-md border
                border-gray-600 bg-gray-800
                hover:border-yellow-400
                hover:bg-gray-700 flex
                flex-col items-center
                justify-center gap-1
                cursor-pointer transition
                active:scale-95
            ">
                <span className="text-2xl">{icon}</span>
                <span className="text-gray-300 text-xs text-center px-1 leading-tight">
                    {item.name}
                </span>
            </div>

            <div className="
                absolute opacity-0 
                group-hover:opacity-100
                z-10 bg-gray-900 text-white
                text-sm p-3 rounded-lg 
                shadow-xl whitespace-nowrap
                bottom-full mb-2 left-1/2
                -translate-x-1/2
                pointer-events-none
                transition-opacity duration-150
            ">
                {/* 아이템 이름 + 아이콘 */}
                <div className="
                    items-center gap-2 mb-2
                    border-b border-gray-600 pb-2"
                >
                    <span>{icon}</span>
                    <span className="font-bold text-yellow-400">
                        {item.name}
                    </span>
                </div>

                {/* 스탯 수치 */}
                <div className="flex flex-col gap-1 text-xs">
                    {item.attack
                        ? (<span className="text-red-400">
                            ⚔️ 공격력 +{item.attack}
                        </span>)
                        : null
                    }
                    {item.magic
                        ? (<span className="text-blue-400">
                            ✨ 마력 +{item.magic}
                        </span>)
                        : null
                    }
                    {item.defense
                        ? (<span className="text-green-400">
                            🛡️ 방어력 +{item.defense}
                        </span>)
                        : null
                    }

                </div>
            </div>
        </div>
    )
}

export default InventoryItem