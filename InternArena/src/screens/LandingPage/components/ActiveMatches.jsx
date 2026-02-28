import Match from "./Match"

function ActiveMatches() {
    return(
        <div className="w-xs h-fit text-white bg-[#383434] rounded-xl m-4 p-4 ">
            <p className="text-2xl text-center">Active Matches</p>
            <Match/>
        </div>  
    )
}

export default ActiveMatches