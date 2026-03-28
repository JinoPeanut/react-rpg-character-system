import { useState } from "react";
import { useCharacterStore } from "../store/characterStore";
import { SHOP_ITEMS } from "../../../data/shop";
import { EQUIPMENTS, type WeaponId, type ArmorId } from "../../../data/equipments";
import { POTIONS, type PotionId } from "../../../data/potions";

type ShopTab = "buy" | "sell";

function getItemName(itemId: string): string {
    return EQUIPMENTS.weapon[itemId as WeaponId]?.name
        ?? EQUIPMENTS.armor[itemId as ArmorId]?.name
        ?? POTIONS[itemId as PotionId]?.name
        ?? itemId
}

function getItemIcon(itemId: string): string {
    if (itemId in EQUIPMENTS.weapon) return "⚔️";
    if (itemId in POTIONS) return "🧪";
    return "🛡️";
}

export function ShopPanel() {

    const [tab, setTab] = useState<ShopTab>("buy");

    const gold = useCharacterStore((state) => state.gold);
    const inventory = useCharacterStore((state) => state.inventory);
    const buyItem = useCharacterStore((state) => state.buyItem);
    const sellItem = useCharacterStore((state) => state.sellItem);

    const isSellItem = inventory.filter((itemId) => SHOP_ITEMS[itemId]);

    return (
        <div className="bg-gray-900 border border-gray-700
            rounded-lg p-4 w-[500px] mx-auto">

            <h2 className="text-lg font-bold text-gray-200 mb-4 text-center">
                상점
            </h2>

            {/* 보유 골드 표시 */}
            <div className="
                border border-yellow-600
                rounded-lg px-4 py-2 mb-4 text-center
                bg-gray-800
            ">
                <span className="text-yellow-400 font-bold text-lg">
                    💰 보유 골드: {gold}G
                </span>
            </div>

            {/* 구매/판매 탭 버튼 */}
            <div className="
                flex border-b border-gray-700 mb-4
            ">
                <button
                    onClick={() => setTab("buy")}
                    className={`
                        flex-1 py-2 text-sm font-semibold transition
                        ${tab === "buy"
                            ? "bg-yellow-900/50 text-yellow-400 border-b-2 border-yellow-400"
                            : "text-gray-500 hover:text-gray-300"
                        }
                    `}
                >
                    🛒 구매
                </button>
                <button
                    onClick={() => setTab("sell")}
                    className={`
                        flex-1 py-2 text-sm font-semibold transition
                        ${tab === "sell"
                            ? "bg-green-900/50 text-green-400 border-b-2 border-green-400"
                            : "text-gray-500 hover:text-gray-300"
                        }
                    `}
                >
                    💸 판매
                </button>
            </div>

            {/* 구매 탭 */}
            {tab === "buy" &&
                (<div className="flex flex-col gap-2">
                    {Object.keys(SHOP_ITEMS).map((itemId) => {
                        const item = SHOP_ITEMS[itemId];
                        const icon = getItemIcon(itemId);
                        const itemName = getItemName(itemId);

                        if (!item) return null;

                        const canBuy = gold >= item.buyPrice

                        return (
                            <div
                                key={itemId}
                                className="
                                    bg-gray-800 border border-gray-700
                                    rounded-lg px-4 py-3 flex items-center
                                    justify-between
                            ">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{icon}</span>
                                    <div>
                                        <p className="text-gray-200 font-semibold text-sm">
                                            {itemName}
                                        </p>
                                        <p className="text-yellow-400 text-xs">
                                            💰 {item.buyPrice}G
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => buyItem(itemId)}
                                    disabled={!canBuy}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm
                                        font-semibold transition active:scale-95
                                        ${canBuy
                                            ? "bg-yellow-600 hover:bg-yellow-500 text-white cursor-pointer"
                                            : "bg-gray-700 text-gray-500 cursor-not-allowed"
                                        }
                                    `}
                                >
                                    구매
                                </button>
                            </div>
                        )
                    })}
                </div>)
            }

            {/* 판매 탭 */}
            {tab === "sell" && (
                <div className="flex flex-col gap-2">
                    {isSellItem.length === 0
                        ? <p className="text-gray-600 text-center py-8">
                            판매할 아이템이 없습니다
                        </p>
                        : isSellItem.map((itemId, index) => {
                            const shopItem = SHOP_ITEMS[itemId];
                            const icon = getItemIcon(itemId);
                            const name = getItemName(itemId);

                            return (
                                <div
                                    key={index}
                                    className="
                                        bg-gray-800 border border-gray-700
                                        rounded-lg px-4 py-3 flex items-center
                                        justify-between
                                    ">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{icon}</span>
                                        <div>
                                            <p className="text-gray-200 font-semibold text-sm">
                                                {name}
                                            </p>
                                            <p className="text-green-400 text-xs">
                                                💰 {shopItem?.sellPrice}G
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => sellItem(itemId)}
                                        className={`
                                            px-4 py-2 rounded-lg text-sm
                                            font-semibold transition active:scale-95
                                            bg-green-600 hover:bg-green-500
                                            text-white cursor-pointer
                                        `}
                                    >
                                        판매
                                    </button>
                                </div>
                            )
                        })}
                </div>
            )}
        </div>
    )
}

export default ShopPanel;