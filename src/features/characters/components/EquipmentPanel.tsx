import EquippedItems from "./EquippedItems"
import img from "../../../images/humanBody.png";

export default function EquipmentPanel() {

    return (
        <div className="relative w-[400px] -mt-[1px]">
            <img
                src={img}
                alt="character"
                className="w-full bg-gray-400 rounded-md"
            />

            <EquippedItems />

        </div>
    )
}