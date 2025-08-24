import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MatchConfig() {
    const navigate = useNavigate();
    
    return (
        <div className="fixed inset-0 w-full h-full bg-[#282424] overflow-y-auto text-xl text-white">
            <div className="flex items-center">
                <button 
                onClick={() => navigate("/")}
                className="mx-4 border-white">
                    <FaLongArrowAltLeft color="gray" className="h-40 w-40" />
                </button>
            </div>

            {/* Contenedor principal en fila */}
            <div className="flex gap-6 px-10">
                {/*Match configuration div*/}
                <div className="flex-1">
                    <h2 className="text-6xl text-center my-10">Match of Emiliano</h2>
                    <h2 className="text-2xl text-center my-10">Time left: 00:14:23:09 </h2>

                    {/*Option Buttons*/}
                    <div className="grid grid-cols-2 gap-6 p-4 justify-items-center">
                        
                </div>

                {/* Players a la derecha */}
                <div className="w-1/3">
                    
                </div>
                </div>
            </div>
        </div>
    );
}

export default MatchConfig;
