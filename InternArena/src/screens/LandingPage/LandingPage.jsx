import Header from "./components/Header"
import RecentRankings from "./components/RecentRankings"
import SideProfile from "./components/SideProfile"
import Post from "./components/Post"
import ActiveMatches from "./components/ActiveMatches"
import { useNavigate } from "react-router-dom";

function LandingPage(){

    const navigate = useNavigate();

    return (
        /*Si se quita este div nos morimos todos*/
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-white">
            <Header/>
            <div className="flex">
                {/*Side profile y rankings */}
                <div>
                    <SideProfile/>   
                    <RecentRankings/> 
                </div>
                {/*posts*/}
                <div>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                {/*partidas activas*/}
                <div>
                    <ActiveMatches/>
                    <div className="flex justify-center">
                        <button className="rounded-xl bg-orange-500 px-8 py-4 mt-6
                    hover:bg-orange-400 transition-colors duration-200"
                    onClick={() => navigate("/match")}
                    >
                        Create Match
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage