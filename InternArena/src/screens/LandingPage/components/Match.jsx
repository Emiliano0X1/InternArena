
import { useNavigate } from "react-router-dom"

function Match() {

    const navigate = useNavigate();

    return(
        <div className="bg-[#282424] h-full my-4 rounded-xl p-4 text-xl">
            
            <div className="flex justify-end">
                <p>8 hours left</p>
            </div>

            <div className='flex items-center'>
                <p className='p-4'>Player #</p>
                <p>1</p>
            </div>

            <div className='flex items-center'>
                <p className='p-4'>Current Ranking: </p>
                <p>4</p>
            </div>

            <div className='flex items-center'>
                <p className='p-4'>Prediction Ranking: </p>
                <p>4</p>
            </div>

            <div className="flex justify-end">
                <button className="bg-orange-500 rounded-xl p-2"
                onClick={() => navigate('/matchpage')}
                >
                    GO
                </button>
            </div>
        </div>
    )
}

export default Match