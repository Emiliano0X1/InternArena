import joeswag from '../../../assets/joeswag.png'
import { BsTrash3 } from "react-icons/bs";

function Player({ id, name, onDelete }) {
    return(
        <div className="bg-[#282424] w-full h-fit my-2 rounded-xl p-4 text-xl">
            <div className='flex items-center justify-between'>
                <div className="flex items-center min-w-0">
                    <img src={joeswag} alt="Profile Picture" className='h-8 w-8 shrink-0'/>
                    <p className='p-4 truncate'>{name}</p>
                </div>
                <button
                    onClick={() => onDelete(id)}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-[#3a3535] transition-colors text-red-400 hover:text-red-300"
                    aria-label="Remove player"
                >
                    <BsTrash3 className="h-5 w-5"/>
                </button>
            </div>
        </div>
    )
}

export default Player