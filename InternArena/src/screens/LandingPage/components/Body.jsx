import Header from "./Header"
import RecentRankings from "./RecentRankings"
import SideProfile from "./SideProfile"
import Post from "./Post"
import ActiveMatches from "./ActiveMatches"

function Body(){
    return (
        /*Si se quita este div nos morimos todos*/
        <div className="fixed inset-0 w-full h-full bg-[#282424] flex flex-col">
            <Header/>
            <div className="flex flex-1 min-h-0">
                {/*Side profile y rankings */}
                <div className="overflow-y-auto min-w-0">
                    <SideProfile/>   
                    <RecentRankings/> 
                </div>
                {/*posts*/}
                <div className="overflow-y-auto flex-1 min-w-0">
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                {/*partidas activas*/}
                <div className="overflow-y-auto min-w-0">
                    <ActiveMatches/>
                </div>
            </div>
        </div>
    )
}

export default Body