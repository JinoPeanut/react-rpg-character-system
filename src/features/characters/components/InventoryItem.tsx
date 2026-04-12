import { EQUIPMENTS, type ArmorId, type Equipment, type WeaponId } from "../../../data/equipments"
import { useCharacterStore } from "../store/characterStore";
import { POTIONS, type PotionId } from "../../../data/potions";

export type InventoryItemProps = {
    itemId: string | null,
}

function getItemIcon(itemId: string) {
    if (!itemId) return null;
    if (itemId in EQUIPMENTS.weapon) return "⚔️";
    if (itemId in POTIONS) return "🧪";
    return "🛡️";
}

const JOB_NAMES: Record<string, string> = {
    adventure: "모험가",
    warrior: "전사",
    archer: "궁수",
    mage: "마법사",
    thief: "도적",
}

// props: InventoryItemProps 보다 이렇게 하는게 아래 코드에서 접근하기 편함
// itemId 로 호출하느냐 또는 props.itemId 로 호출하느냐 차이
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

    const isWeapon = itemId in EQUIPMENTS.weapon;
    const isArmor = itemId in EQUIPMENTS.armor;
    const isPotion = itemId in POTIONS;

    const equipment = isWeapon
        ? EQUIPMENTS.weapon[itemId as WeaponId] as Equipment
        : isArmor
            ? EQUIPMENTS.armor[itemId as ArmorId] as Equipment
            : null;

    const potion = isPotion
        ? POTIONS[itemId as PotionId]
        : null;

    // 둘다 있는 속성이면 item.name 으로 접근가능
    // 둘중에 하나라도 없으면 'attack' in item 으로 조건걸기
    const item = equipment ?? potion;

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

                {/* 스탯 수치 and 직업 제한 */}
                <div className="flex flex-col gap-1 text-xs">
                    {/* 직업 제한 */}
                    {equipment?.allowedJobs && (
                        <div className="text-purple-400 text-xs">
                            {equipment.allowedJobs
                                .map(job => JOB_NAMES[job] ?? job)
                                .join(", ")
                            } 전용
                        </div>
                    )}

                    {/* 스탯 수치 */}
                    {'attack' in item && item.attack
                        ? (<span className="text-red-400">
                            ⚔️ 공격력 +{item.attack}
                        </span>)
                        : null
                    }
                    {'magic' in item && item.magic
                        ? (<span className="text-blue-400">
                            ✨ 마력 +{item.magic}
                        </span>)
                        : null
                    }
                    {'defense' in item && item.defense
                        ? (<span className="text-green-400">
                            🛡️ 방어력 +{item.defense}
                        </span>)
                        : null
                    }

                    {/* 포션일때 회복량 표시 */}
                    {potion && potion.hpRestore > 0
                        ? (<span className="text-red-400">
                            ❤️ HP +{potion.hpRestore}
                        </span>)
                        : null
                    }
                    {potion && potion.mpRestore > 0
                        ? (<span className="text-blue-400">
                            💧 MP +{potion.mpRestore}
                        </span>)
                        : null
                    }

                </div>
            </div>
        </div>
    )
}

export default InventoryItem