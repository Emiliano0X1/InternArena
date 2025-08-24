import Header from "./components/Header"
import RecentRankings from "./components/RecentRankings"
import SideProfile from "./components/SideProfile"
import Post from "./components/Post"
import ActiveMatches from "./components/ActiveMatches"

function LandingPage(){
    return (
        /*Si se quita este div nos morimos todos*/
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto">
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
                </div>
            </div>
        </div>
    )
}

export default LandingPage