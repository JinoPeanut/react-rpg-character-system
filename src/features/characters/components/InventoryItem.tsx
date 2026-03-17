import { EQUIPMENTS } from "../../../data/equipments"

export type InventoryItemProps = {
    itemId: string,
}

function InventoryItem({ itemId }: InventoryItemProps) {

    const item = EQUIPMENTS.weapon[itemId] || EQUIPMENTS.armor[itemId];

    return (
        <div className="relative group w-16 h-16">
            <div className="
                w-16
                h-16
                border
                flex
                items-center
                justify-center
            ">
                {item?.name}
            </div>
            <div className="
                absolute opacity-0 
                group-hover:opacity-100
                bg-gray-800
                text-white
                text-sm p-2
                rounded shadow
                whitespace-nowrap
                bottom-full
                mb-1
                left-1/2
                -translate-x-1/2
                pointer-events-none
            ">
                <h3>{item?.name}</h3>
                {item?.attack && `공격력: +${item?.attack}`}
                {item?.magic && `마력: +${item?.magic}`}
                {item?.defense && `방어력: +${item?.defense}`}

            </div>
        </div>
    )
}

export default InventoryItem