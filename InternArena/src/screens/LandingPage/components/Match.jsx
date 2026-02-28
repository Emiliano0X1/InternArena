
import { useNavigate } from "react-router-dom"

function Match() {

    const navigate = useNavigate();

    return(
        <div className="bg-[#282424] h-full my-4 rounded-xl p-3 text-xl">
            
            <div className="flex items-center justify-between gap-2 py-1">
                <p className="font-medium">Player #1</p>
                <p className="text-gray-400">8 hours left</p>
            </div>

            <div className='flex items-center gap-2 py-1'>
                <p className='text-gray-400'>Current Ranking:</p>
                <p>4</p>
            </div>

            <div className='flex items-center gap-2 py-1'>
                <p className='text-gray-400'>Prediction Ranking:</p>
                <p>4</p>
            </div>

            <div className="flex justify-end pt-2">
                <button className="bg-orange-500 rounded-xl px-6 py-3 text-lg font-medium hover:bg-orange-600 transition-colors"
                onClick={() => navigate('/matchpage')}
                >
                    GO
                </button>
            </div>
        </div>
    )
}

export default Match