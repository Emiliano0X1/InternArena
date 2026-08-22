import { FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";

function LeetcodeProblem({ name, difficulty, solved }) {
    const isSolved = !!solved;
    const diffText = difficulty || "Easy";
    
    // Style mappings for difficulties based on mockup
    const diffStyles = {
        Easy: "bg-[#38bdf8] text-neutral-900",
        Medium: "bg-[#eab308] text-neutral-900",
        Hard: "bg-[#ef4444] text-white"
    };

    return (
        <div className="flex items-center justify-between py-2.5 border-b border-neutral-800/40 hover:bg-neutral-800/10 px-1 transition-all duration-150">
            <div className="flex items-center gap-3">
                <span className="text-lg italic font-normal text-neutral-300 tracking-wide">{name || "Problem Title"}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${diffStyles[diffText] || diffStyles.Easy}`}>
                    {diffText}
                </span>
            </div>
            
            <div className="flex items-center justify-center w-6 h-6">
                {isSolved && (
                    <FaCheckCircle className="text-[#22c55e] h-5 w-5" />
                )}
            </div>
        </div>
    );
}

LeetcodeProblem.propTypes = {
    name: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(["Easy", "Medium", "Hard"]),
    solved: PropTypes.bool
};

export default LeetcodeProblem;