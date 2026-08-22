import { FaCrown } from "react-icons/fa";

function PredictionChart() {
    const predictions = [
        { rank: "1", percentage: "68%", heightClass: "h-52", isWinner: true, name: "Emiliano0X1", bgClass: "bg-neutral-100 text-neutral-900" },
        { rank: "2", percentage: "33%", heightClass: "h-40", name: "Emiliano0X1", bgClass: "bg-neutral-300 text-neutral-900" },
        { rank: "3", percentage: "18%", heightClass: "h-32", name: "Emiliano0X1", bgClass: "bg-neutral-300 text-neutral-900" },
        { rank: "4", percentage: "8%", heightClass: "h-24", name: "Emiliano0X1", bgClass: "bg-neutral-300 text-neutral-900" },
        { rank: "5", percentage: "5%", heightClass: "h-16", name: "Emiliano0X1", bgClass: "bg-neutral-300 text-neutral-900" },
        { rank: "6", percentage: "1%", heightClass: "h-12", name: "Emiliano0X1", bgClass: "bg-neutral-300 text-neutral-900" }
    ];

    return (
        <div className="w-full">
            <h2 className="text-4xl font-extralight italic text-center text-neutral-100 mb-6 tracking-wide">
                Prediction Chart
            </h2>
            
            {/* Chart Area */}
            <div className="flex items-end justify-between px-2 pt-8 pb-2 h-72 border-b border-neutral-800/40">
                {predictions.map((pred, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 justify-end h-full">
                        {/* Name and optional Crown */}
                        <div className="flex flex-col items-center mb-2 h-10 justify-end">
                            {pred.isWinner && (
                                <FaCrown className="text-amber-500 mb-0.5" size={14} />
                            )}
                            <span className="text-[10px] font-bold text-neutral-300 tracking-tight text-center truncate w-full max-w-[64px]">
                                {pred.name}
                            </span>
                        </div>

                        {/* Bar */}
                        <div className={`w-10 sm:w-14 ${pred.heightClass} ${pred.bgClass} rounded-t flex flex-col items-center justify-center shadow-md transition-all duration-200 hover:brightness-110`}>
                            <span className="text-3xl font-normal italic leading-none">{pred.rank}</span>
                            <span className="text-xs font-normal mt-1 opacity-80">{pred.percentage}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PredictionChart;
