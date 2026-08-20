import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import PropTypes from "prop-types";

function LeetcodeProblem({ name, difficulty, solved }) {
    const isSolved = !!solved;
    const diffText = difficulty || "Easy";
    
    // Style mappings for difficulties
    const diffStyles = {
        Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    };

    return(
        <div className="flex items-center justify-between py-4 border-b border-neutral-700/20 hover:bg-neutral-800/20 px-3 rounded-lg transition-all duration-150">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-200">{name || "Problem Title"}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${diffStyles[diffText] || diffStyles.Easy}`}>
                    {diffText}
                </span>
            </div>
            
            <div className="flex items-center gap-2">
                {isSolved ? (
                    <FaCheckCircle className="text-emerald-500 h-5 w-5 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]" />
                ) : (
                    <FaRegCircle className="text-neutral-500 h-5 w-5" />
                )}
            </div>
        </div>
    )
}

LeetcodeProblem.propTypes = {
    name: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(["Easy", "Medium", "Hard"]),
    solved: PropTypes.bool
};

export default LeetcodeProblem;