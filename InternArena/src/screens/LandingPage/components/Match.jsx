import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BiTimeFive, BiTrophy } from "react-icons/bi";

function Match({ player, timeLeft, currentRank, predictionRank }) {
    const navigate = useNavigate();

    const displayPlayer = player || "Player #1";
    const displayTimeLeft = timeLeft || "8 hours left";
    const displayCurrentRank = currentRank || "4";
    const displayPredictionRank = predictionRank || "4";

    return(
        <div className="bg-[#282424] hover:bg-neutral-800/40 border border-neutral-700/20 rounded-lg p-4 transition-all duration-200">
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-neutral-700/30">
                <p className="font-bold text-sm text-gray-200">{displayPlayer}</p>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <BiTimeFive className="text-orange-500" />
                    <span>{displayTimeLeft}</span>
                </div>
            </div>

            <div className="space-y-1.5 text-xs mb-3">
                <div className='flex items-center justify-between'>
                    <span className='text-neutral-400'>Current Ranking:</span>
                    <span className="font-medium text-gray-200 flex items-center gap-1">
                        <BiTrophy className="text-yellow-500/80" /> {displayCurrentRank}
                    </span>
                </div>

                <div className='flex items-center justify-between'>
                    <span className='text-neutral-400'>Prediction Ranking:</span>
                    <span className="font-medium text-neutral-300">{displayPredictionRank}</span>
                </div>
            </div>

            <div className="flex justify-end pt-1">
                <button 
                    className="bg-orange-500 text-white rounded-md px-4 py-1.5 text-xs font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/10 cursor-pointer"
                    onClick={() => navigate('/matchpage')}
                >
                    ENTER ARENA
                </button>
            </div>
        </div>
    )
}

Match.propTypes = {
    player: PropTypes.string,
    timeLeft: PropTypes.string,
    currentRank: PropTypes.string,
    predictionRank: PropTypes.string,
};

export default Match;