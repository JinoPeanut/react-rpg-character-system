import { useState } from "react";
import { useCharacterStore } from "../store/characterStore";
import { SHOP_ITEMS } from "../../../data/shop";
import { EQUIPMENTS, type WeaponId, type ArmorId } from "../../../data/equipments";
import { POTIONS, type PotionId } from "../../../data/potions";

type ShopTab = "buy" | "sell";

function getItemName(itemId: string): string {
    // 문제1: itemId 로 아이템 이름을 찾아서 반환해줘
    // 힌트: EQUIPMENTS.weapon, EQUIPMENTS.armor, POTIONS 순서로 찾기
    return EQUIPMENTS.weapon[itemId as WeaponId]?.name
        ?? EQUIPMENTS.armor[itemId as ArmorId]?.name
        ?? POTIONS[itemId as PotionId]?.name
        ?? itemId
}

function getItemIcon(itemId: string): string {
    // 문제2: itemId 로 아이콘을 반환해줘
    // 힌트: weapon 이면 "⚔️", potion 이면 "🧪", 나머지는 "🛡️"
    if (itemId in EQUIPMENTS.weapon) return "⚔️";
    if (itemId in POTIONS) return "🧪";
    return "🛡️";
}

export function ShopPanel() {

    // 문제3: tab 상태를 만들어줘 (기본값은 "buy")
    const [tab, setTab] = useState<ShopTab>("buy");

    // 문제4: characterStore 에서 필요한 값들을 꺼내와줘
    // 힌트: gold, inventory, buyItem, sellItem
    const gold = useCharacterStore((state) => state.gold);
    const inventory = useCharacterStore((state) => state.inventory);
    const buyItem = useCharacterStore((state) => state.buyItem);
    const sellItem = useCharacterStore((state) => state.sellItem);

    // 문제5: 판매 가능한 인벤토리 아이템만 필터링해줘
    // 힌트: SHOP_ITEMS 에 있는 아이템만
    const isSellItem = inventory.filter((itemId) => SHOP_ITEMS[itemId]);

    return (
        <div className="bg-gray-900 border border-gray-700
            rounded-lg p-4 w-[500px] mx-auto">

            <h2 className="text-lg font-bold text-gray-200 mb-4 text-center">
                상점
            </h2>

            {/* 문제6: 보유 골드 표시 */}
            <div className="
                border border-gray-700 rounded-lg text-center m-2 p-2
                bg-gray-700
            ">
                <span className="text-gray-200">
                    💰 보유 골드: {gold}
                </span>
            </div>

            {/* 문제7: 구매/판매 탭 버튼 */}
            <div className=" 
                border-gray-700 bg-gray-700 rounded-lg
                m-2 p-2
            ">
                <div className="
                    w-[150px] mx-auto flex items-center justify-between
                ">
                    <button
                        onClick={() => setTab("buy")}
                        className="
                            bg-green-500 p-2 border rounded-lg
                            action:scale-95 hover:bg-green-300
                    ">
                        구매
                    </button>
                    <button
                        onClick={() => setTab("sell")}
                        className="
                            bg-red-500 p-2 border rounded-lg
                            action:scale-95 hover:bg-red-300
                    ">
                        판매
                    </button>
                </div>
            </div>

            {/* 문제8: 구매 탭 - SHOP_ITEMS 를 map 으로 돌려서 아이템 목록 표시 */}
            {/* 각 아이템에 아이콘, 이름, 가격, 구매버튼 포함 */}
            {/* 골드 부족하면 구매버튼 비활성화 */}
            <div>
                <h2
                    className="
                        text-center text-gray-200 border-b border-gray-700
                        mb-3 p-2
                ">
                    구매 탭
                </h2>
                {tab === "buy" &&
                    (<div>
                        {Object.keys(SHOP_ITEMS).map((itemId) => {
                            const item = SHOP_ITEMS[itemId];
                            const icon = getItemIcon(itemId);
                            const itemName = getItemName(itemId);

                            if (!item) return;

                            const canBuy = gold >= item.buyPrice

                            const isItem = item?.type === "weapon"
                                ? "⚔️"
                                : item?.type === "armor"
                                    ? "🛡️"
                                    : item?.type === "potion"
                                        ? "🧪"
                                        : null

                            return (
                                <div className="text-gray-200">
                                    {icon} {itemName} {item.buyPrice}
                                    <button disabled={!canBuy}>구매</button>
                                </div>
                            )
                        })}
                    </div>)
                }
            </div>

            {/* 문제9: 판매 탭 - sellableItems 를 map 으로 돌려서 아이템 목록 표시 */}
            <div>
                <h2 className="
                        text-center text-gray-200 border-b border-gray-700
                        mb-3 p-2
                ">
                    판매 탭
                </h2>
                {tab === "sell" &&
                    (<div>
                        {isSellItem.length === 0
                            ? <p className="text-gray-600 text-center py-4">
                                판매할 아이템이 없습니다
                            </p>
                            : isSellItem.map((itemId, index) => {
                                const shopItem = SHOP_ITEMS[itemId];
                                const icon = getItemIcon(itemId);
                                const name = getItemName(itemId);

                                return (
                                    <div
                                        key={index}
                                        className="text-gray-200"
                                    >
                                        {icon} {name} {shopItem?.sellPrice}
                                        <button onClick={() => sellItem(itemId)}>판매</button>
                                    </div>
                                )
                            })}
                    </div>)
                }

            </div>
            {/* 판매할 아이템 없으면 "판매할 수 있는 아이템이 없습니다" 표시 */}

        </div>
    )
}

export default ShopPanel;