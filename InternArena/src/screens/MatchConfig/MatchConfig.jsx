import { FaLongArrowAltLeft } from "react-icons/fa";
import Players from "./components/Players";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./components/Popup";

function MatchConfig() {
    const navigate = useNavigate();
    //Difficulty
    //Time
    //Prize
    //Topics
    const [showDiff, setShowDiff] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [showTopic, setShowTopic] = useState(false);
    
    return (
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            <div className="flex items-center">
                <button 
                onClick={() => navigate("/")}
                className="mx-4 border-white">
                    <FaLongArrowAltLeft color="gray" className="h-40 w-40" />
                </button>

                <p className="mx-4">Invitation Code : https://www.linkedin.com/feed/ </p>
            </div>

            {/* Contenedor principal en fila */}
            <div className="flex gap-6 px-10">
                {/*Match configuration div*/}
                <div className="flex-1">
                    <h2 className="text-6xl text-center my-10">Match Configuration</h2>

                    {/*Option Buttons*/}
                    <div className="grid grid-cols-2 gap-6 p-4 justify-items-center">
                        {/*Difficulty*/}
                        <button
                            className="w-40 rounded-xl bg-[#383434] py-6 hover:bg-[#4a4545] transition-colors duration-200"
                            onClick={() => setShowDiff(true)}
                        >
                            Difficulty
                        </button>

                        {/* Render del Popup */}
                        {showDiff && (
                            <Popup title="Choose Difficulty" onClose={() => setShowDiff(false)}>
                            <button className="bg-gray-600 rounded-lg py-2 hover:bg-gray-500 transition-colors duration-200">
                                Easy
                            </button>
                            <button className="bg-gray-600 rounded-lg py-2 hover:bg-gray-500 transition-colors duration-200">
                                Medium
                            </button>
                            <button className="bg-gray-600 rounded-lg py-2 hover:bg-gray-500 transition-colors duration-200">
                                Hard
                            </button>
                            </Popup>
                        )}

                        {/*Time*/}
                        <button
                            className="w-40 rounded-xl bg-[#383434] py-6 hover:bg-[#4a4545] transition-colors duration-200"
                            onClick={() => setShowTime(true)}
                        >
                            Time
                        </button>

                        {/* Render del Popup */}
                        {showTime && (
                            <Popup title="Choose Time" onClose={() => setShowTime(false)}>
                            <input type="datetime-local" placeholder="Select date and time"/>
                            <button className="bg-gray-600 rounded-lg py-2 hover:bg-gray-500 transition-colors duration-200">
                                Submit
                            </button>
                            
                            </Popup>
                        )}

                        {/*Prize*/}
                        <button
                            className="w-40 rounded-xl bg-[#383434] py-6 hover:bg-[#4a4545] transition-colors duration-200"
                            onClick={() => setShowPrize(true)}
                        >
                            Prize
                        </button>

                        {/* Render del Popup */}
                        {showPrize && (
                            <Popup title="Choose Prize" onClose={() => setShowPrize(false)}>
                            <input type="text" placeholder="Cool prize for winner" className="border rounded-xl p-2"/>
                            <button className="bg-gray-600 rounded-lg py-2 hover:bg-gray-500 transition-colors duration-200">
                                Submit
                            </button>
                            </Popup>
                        )}

                        {/*Topics*/}
                        <button
                            className="w-40 rounded-xl bg-[#383434] py-6 hover:bg-[#4a4545] transition-colors duration-200"
                            onClick={() => setShowTopic(true)}
                        >
                            Topics
                        </button>

                        {/* Render del Popup */}
                        {showTopic && (
                            <Popup title="Choose Topics" onClose={() => setShowTopic(false)}>
                            <button className="bg-gray-600 rounded-lg py-2 hover:bg-gray-500 transition-colors duration-200">
                                Coming Soon?
                            </button>
                            </Popup>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button className="rounded-xl bg-orange-500 px-8 py-4 mt-6
                        hover:bg-orange-400 transition-colors duration-200">
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
