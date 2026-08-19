import PropTypes from 'prop-types';

function Ranking({ data }) {
    const place = data?.place || "3rd place";
    const time = data?.time || "2 hours ago";

    return (
        <div className="flex items-center gap-4 py-2 relative group cursor-default">
            {/* Timeline Dot & Line */}
            <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-orange-500/20 border-2 border-orange-500 group-hover:scale-110 transition-transform duration-200" />
            </div>

            <div className="flex-1 flex items-center justify-between bg-neutral-800/20 hover:bg-neutral-800/40 p-3 rounded-lg border border-neutral-700/20 transition-all duration-200">
                <span className="text-sm font-semibold text-neutral-200">{place}</span>
                <span className="text-xs text-neutral-400">{time}</span>
            </div>
        </div>
    )
}

Ranking.propTypes = {
    data: PropTypes.shape({
        place: PropTypes.string,
        time: PropTypes.string,
    })
};

export default Ranking;