import Header from "./Header"
import RecentRankings from "./RecentRankings"
import SideProfile from "./SideProfile"
import Post from "./Post"
import ActiveMatches from "./ActiveMatches"

function Body(){
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

export default Body