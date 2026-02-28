import Header from "./components/Header"
import RecentRankings from "./components/RecentRankings"
import SideProfile from "./components/SideProfile"
import Post from "./components/Post"
import ActiveMatches from "./components/ActiveMatches"

function LandingPage(){

    return (
        /*Si se quita este div nos morimos todos*/
        <div className="fixed inset-0 w-full h-full bg-[#282424] flex flex-col text-white overflow-hidden">
            <Header/>
            <div className="flex flex-1 min-h-0 overflow-hidden">
                {/*Side profile y rankings */}
                <div className="overflow-y-auto scrollbar-hide min-w-0 shrink-0">
                    <SideProfile/>   
                    <RecentRankings/> 
                </div>
                {/*posts*/}
                <div className="overflow-y-auto scrollbar-hide flex-1 min-w-0 min-h-0">
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                {/*partidas activas*/}
                <div className="overflow-y-auto scrollbar-hide min-w-0 shrink-0">
                    <ActiveMatches/>
                    <ActiveMatches/>
                    <ActiveMatches/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage