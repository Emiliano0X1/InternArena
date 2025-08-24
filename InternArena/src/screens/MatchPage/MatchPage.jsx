import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LeetcodeSet from "./components/LeetcodeSet";

function MatchPage() {
    const navigate = useNavigate();
    
    return (
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            {/*Header type coso */}
            <div className="flex items-center">
                <button 
                onClick={() => navigate("/")}
                className="mx-4 border-white">
                    <FaLongArrowAltLeft color="gray" className="h-40 w-40" />
                </button>

                <div className="flex-1 items-center justify-center">
                    <p className="text-center text-7xl py-4">Match of Emiliano</p>
                    <p className="text-center text-4xl">Time left: 00:14:23:09</p>
                </div>

                {/*Boton para ver perfil */}
                <button className='text-2xl h-fit w-fit 
                flex items-center justify-center whitespace-nowrap 
                mr-4 rounded-sm border p-1'
                onClick={() => navigate("/login")}
                >
                    <p>Log In / Register</p>
                </button>
            </div>

            {/*Leetcode Set */}
            <div>
                <LeetcodeSet/>
            </div>


        </div>    
    );
}

export default MatchPage;
