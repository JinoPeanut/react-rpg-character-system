import { useCharacterStore } from "../store/characterStore"
import { EQUIPMENTS } from "../../../data/equipments"
import InventoryItem from "./InventoryItem";

const INVENTORY_SIZE = 20;

function InventoryPanel() {

    const inventory = useCharacterStore((state) => state.inventory);

    const slots: (string | null)[] = Array.from({ length: INVENTORY_SIZE }, (_, i) =>
        inventory[i] ?? null
    )

    return (
        <div>
            <div className="
                bg-gray-900 p-4 rounded-lg shadow-lg
                border border-gray-700 w-[500px] mx-auto
            ">
                <h2 className="text-lg font-bold text-gray-200 mb-4 text-center">
                    인벤토리
                </h2>

                <div className="grid grid-cols-5 gap-2">
                    {slots.map((itemId, index) => (
                        <InventoryItem key={index} itemId={itemId} />
                    ))}
                </div>

                <p className="text-gray-500 text-xs text-right mt-2">
                    {inventory.length} / {INVENTORY_SIZE}
                </p>
            </div>
        </div>
    )
}

export default InventoryPanel