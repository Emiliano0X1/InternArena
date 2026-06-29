import { useQuery } from "@tanstack/react-query";
import Ranking from "./Ranking";

const fetchRankings = async () => {
    const response = await fetch("http://localhost:8080/api/rankings");
    if (!response.ok) throw new Error("Failed to fetch rankings");
    return response.json();
};

function RecentRankings() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["rankings"],
        queryFn: fetchRankings,
    });

    return (
        <div className="w-xs m-4 rounded-xl text-2xl text-white">
            <div className="m-4">
                <p>Recent Rankings:</p>
                {isLoading && <p className="text-sm">Loading...</p>}
                {isError && <p className="text-sm">Could not load rankings.</p>}
                {data?.map((ranking, index) => (
                    <Ranking key={index} data={ranking} />
                )) ?? (
                    <>
                        <Ranking/>
                        <Ranking/>
                        <Ranking/>
                    </>
                )}
            </div>
        </div>
    );
}

export default RecentRankings;