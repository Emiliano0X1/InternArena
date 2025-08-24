import { FaLongArrowAltLeft } from "react-icons/fa";

function MatchConfig(){
    return(
        
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            <div>
                <button className="mx-4">
                    <FaLongArrowAltLeft color="gray" className="h-40 w-40" />
                </button>
            </div>

            <div className="mx-10">
                <p>Invitation Link : https://www.linkedin.com/feed/ </p>
            </div>

            {/*Match configuration div*/}
            <div className="h-fit max-w-1/2">
                <h2 className="text-6xl text-center my-10">Match Configuration</h2>

                {/*Option Buttons*/}
                <div className="grid grid-cols-2 gap-6 p-4 justify-items-center">
                    {/*Difficulty*/}
                    <button className="w-40 rounded-xl bg-[#383434] py-6">
                        Difficulty
                    </button>

                    {/*Time*/}
                    <button className="w-40 rounded-xl bg-[#383434] py-6">
                        Time
                    </button>

                    {/*Prize*/}
                    <button className="w-40 rounded-xl bg-[#383434] py-6">
                        Prize
                    </button>

                    {/*Topics*/}
                    <button className="w-40 rounded-xl bg-[#383434] py-6">
                        Topics
                    </button>
                </div>
                
                <div className="flex justify-center">
                    <button className="h-fit w-50 rounded-xl bg-orange-500 p-10 m-10">
                        Create Match
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MatchConfig