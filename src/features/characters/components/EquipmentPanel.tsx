import EquippedItems from "./EquippedItems"
import img from "../../../images/humanBody.png";

export default function EquipmentPanel() {

    return (
        <div className="bg-gray-900 border border-gray-700
            rounded-lg p-4 w-[500px] mx-auto
        ">
            <h2 className="text-lg font-bold text-gray-200 mb-4 text-center">
                장비창
            </h2>

            <div className="relative w-[280px] mx-auto">
                <img
                    src={img}
                    alt="character"
                    className="w-full opacity-40"
                />
                <EquippedItems />

                <p className="text-gray-600 text-xs text-center mt-2">
                    더블클릭으로 장비 해제
                </p>
            </div>
        </div>
    )
}