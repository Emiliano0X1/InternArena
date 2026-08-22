import { useNavigate } from "react-router-dom";
import LeetcodeSet from "./components/LeetcodeSet";
import Ranking from "./components/Ranking";
import PredictionChart from "./components/PredictionChart";
import joeswag from "../../assets/joeswag.png";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";

function MatchPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#282424] text-neutral-100 py-6 px-4 md:px-8">
            {/* Top Bar / Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative max-w-[1440px] mx-auto">
                
                {/* Left Side: Back button & Stats Box */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                    <button 
                        onClick={() => navigate("/")} 
                        className="flex items-center gap-2 border border-neutral-700/40 bg-[#2d2929]/30 hover:bg-neutral-800/80 hover:text-orange-500 text-neutral-300 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer font-semibold shadow-sm text-sm"
                    >
                        <FaArrowLeft className="text-neutral-400" />
                        <span>Back</span>
                    </button>
                    
                    <div className="bg-[#201e1e]/90 border border-neutral-700/30 rounded-lg px-5 py-2.5 shadow-md">
                        <div className="text-sm font-bold text-neutral-100 whitespace-nowrap">
                            Winner Price: <span className="text-white">200 $</span>
                        </div>
                        <div className="text-sm font-bold text-neutral-100 mt-1 whitespace-nowrap">
                            Current Players: <span className="text-white">6</span>
                        </div>
                    </div>
                </div>

                {/* Center Title and Countdown */}
                <div className="flex flex-col items-center text-center flex-1">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        Partida Emiliano0X1
                    </h1>
                    <div className="text-5xl md:text-6xl font-normal italic mt-3 text-neutral-200 tracking-wide">
                        00:14:23:09
                    </div>
                </div>

                {/* Right Side: Profile dropdown capsule */}
                <div className="flex justify-end w-full md:w-auto">
                    <div className="flex items-center gap-2 border border-neutral-700/30 bg-[#2d2929] px-3.5 py-1.5 rounded-lg shadow-sm cursor-pointer hover:bg-neutral-800/80 transition-all duration-200">
                        <div className="w-8 h-8 rounded-full border border-orange-500/40 overflow-hidden bg-neutral-800 flex items-center justify-center">
                            <img src={joeswag} alt="User Profile" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-neutral-200">Emiliano Gonzalez</span>
                        <FaChevronDown className="text-neutral-400 text-xs ml-1" />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1440px] mx-auto mt-10">
                {/* Left Column: Leetcode Set Card */}
                <div className="lg:col-span-5 bg-[#383434] border border-neutral-800/40 rounded-xl p-6 shadow-xl">
                    <LeetcodeSet />
                </div>

                {/* Right Column: Ranking & Prediction Chart Card Stack */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    {/* Ranking Card */}
                    <div className="bg-[#383434] border border-neutral-800/40 rounded-xl p-6 shadow-xl">
                        <Ranking />
                    </div>

                    {/* Prediction Chart Card */}
                    <div className="bg-[#383434] border border-neutral-800/40 rounded-xl p-6 shadow-xl">
                        <PredictionChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchPage;