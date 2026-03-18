import { useCharacterStore } from "../store/characterStore"
import { EQUIPMENTS } from "../../../data/equipments"
import InventoryItem from "./InventoryItem";

function InventoryPanel() {

    const inventory = useCharacterStore((state) => state.inventory);

    const items = [
        ...Object.entries(EQUIPMENTS.weapon),
        ...Object.entries(EQUIPMENTS.armor),
    ];

    return (
        <div>
            <div className="
                bg-gray-400 p-4 
                flex flex-col 
                justify-center 
                items-center
                rounded shadow-lg
                border
            ">
                <h2 className="text-lg font-bold">인벤토리</h2>

                <div className="grid grid-cols-5 gap-2">
                    {inventory.map((itemId) => (
                        <InventoryItem key={itemId} itemId={itemId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InventoryPanel