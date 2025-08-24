import { FaLongArrowAltLeft } from "react-icons/fa";
import Players from "./components/Players";

function MatchConfig() {
    return (
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            <div className="flex items-center">
                <button className="mx-4">
                    <FaLongArrowAltLeft color="gray" className="h-40 w-40" />
                </button>

                <p className="mx-4">Invitation Link : https://www.linkedin.com/feed/ </p>
            </div>

            {/* Contenedor principal en fila */}
            <div className="flex gap-6 px-10">
                {/*Match configuration div*/}
                <div className="flex-1">
                    <h2 className="text-6xl text-center my-10">Match Configuration</h2>

                    {/*Option Buttons*/}
                    <div className="grid grid-cols-2 gap-6 p-4 justify-items-center">
                        {/*Difficulty*/}
                        <button className="w-40 rounded-xl bg-[#383434] py-6">
                            Difficulty
                        </button>

                        {/*Time*/}
                        <button className="w-40 rounded-xl bg-[#383434] py-6">
                            Time
                        </button>

                        {/*Prize*/}
                        <button className="w-40 rounded-xl bg-[#383434] py-6">
                            Prize
                        </button>

                        {/*Topics*/}
                        <button className="w-40 rounded-xl bg-[#383434] py-6">
                            Topics
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button className="rounded-xl bg-orange-500 px-8 py-4 mt-6">
                            Create Match
                        </button>
                    </div>
                </div>

                {/* Players a la derecha */}
                <div className="w-1/3">
                    <Players />
                </div>
            </div>
        </div>
    );
}

export default MatchConfig;
