import joeswag from "../../../assets/joeswag.png";
import { FaCrown } from "react-icons/fa";

function Ranking() {
    const topRanks = [
        { place: "1er Lugar", name: "Emiliano0X1", stats: "Easy: 3 | Medium: 2 | Hard: 0", hasCrown: true },
        { place: "2do Lugar", name: "NPC 2", stats: "Easy: 3 | Medium: 1 | Hard: 0" },
        { place: "3er Lugar", name: "DAY ONE", stats: "Easy: 0 | Medium: 1 | Hard: 0" }
    ];

    const bottomRanks = [
        { place: "4 Lugar", name: "Emiliano0X1", stats: "Easy: 0 | Medium: 0 | Hard: 0" },
        { place: "5 Lugar", name: "Emiliano0X1", stats: "Easy: 0 | Medium: 0 | Hard: 0" },
        { place: "6 Lugar", name: "Emiliano0X1", stats: "Easy: 0 | Medium: 0 | Hard: 0" }
    ];

    const RankCard = ({ rank }) => (
        <div className="flex flex-col items-center text-center relative px-2 py-1">
            {rank.hasCrown && (
                <div className="absolute -top-7 text-amber-500 animate-bounce duration-1000">
                    <FaCrown size={22} className="drop-shadow-[0_2px_5px_rgba(245,158,11,0.5)]" />
                </div>
            )}
            <span className="text-sm italic font-normal text-neutral-300 mb-1">{rank.place}</span>
            <div className="w-16 h-16 rounded-full border-2 border-white/90 overflow-hidden bg-neutral-800 flex items-center justify-center mb-1.5 shadow-md">
                <img src={joeswag} alt={rank.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold italic text-neutral-100 tracking-wide">{rank.name}</span>
            <span className="text-[9px] text-neutral-400 italic mt-0.5 tracking-tighter whitespace-nowrap">
                {rank.stats}
            </span>
        </div>
    );

    return (
        <div className="w-full">
            <h2 className="text-4xl font-extralight italic text-center text-neutral-100 mb-8 tracking-wide">
                Ranking
            </h2>
            
            {/* Top 3 Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6 pt-6">
                {topRanks.map((rank, idx) => (
                    <RankCard key={idx} rank={rank} />
                ))}
            </div>

            {/* Bottom 3 Grid */}
            <div className="grid grid-cols-3 gap-2 border-t border-neutral-800/40 pt-4">
                {bottomRanks.map((rank, idx) => (
                    <RankCard key={idx} rank={rank} />
                ))}
            </div>
        </div>
    );
}

export default Ranking;
