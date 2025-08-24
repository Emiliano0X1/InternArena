import Ranking from "./Ranking"

function RecentRankings() {
    return(
        <div className="w-xs m-4 rounded-xl text-2xl text-white">
            <div className="m-4">
                <p>Recent Rankings:</p>
                {/*hacer fetch para obtener los rankings @backend*/}
                <Ranking/>
                <Ranking/>
                <Ranking/>
            </div>
        </div>
    )
}

export default RecentRankings