import joeswag from '../../../assets/joeswag.png'
import { BsTrash3 } from "react-icons/bs";

function Player(){
    return(
        <div className="bg-[#282424] h-fit my-4 rounded-xl p-4 text-xl">
            <div className='flex items-center'>
                <img src={joeswag} alt="Profile Picture" className='h-8 w-8'/>
                <p className='p-4'>Emiliano Gonsales</p>
                <button>
                    <BsTrash3/>
                </button>
            </div>
        </div>
    )
}

export default Player