import LeetcodeProblem from "./LeetcodeProblem"

function LeetcodeSet(){
    return(
        <div className="w-xs h-fit text-white bg-[#383434] rounded-xl m-4 p-4">
            <h1 className="text-5xl text-center">Problem Set</h1>
            <LeetcodeProblem/>
            <LeetcodeProblem/>
            <LeetcodeProblem/>
        </div>  
    )
}

export default LeetcodeSet