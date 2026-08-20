import joeswag from '../../../assets/joeswag.png'
import { BsTrash3 } from "react-icons/bs";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

import PropTypes from "prop-types";

function Player({ id, name, onDelete }) {
    return(
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-[#282424] hover:bg-neutral-800/40 border border-neutral-700/10 w-full h-fit my-2 rounded-lg px-4 py-3 text-sm text-white"
        >
            <div className='flex items-center justify-between'>
                <div className="flex items-center min-w-0 gap-3">
                    <img 
                        src={joeswag} 
                        alt="Profile Picture" 
                        className='h-8 w-8 rounded-full border border-neutral-700/50 shrink-0'
                    />
                    <p className='font-medium text-neutral-200 truncate'>{name}</p>
                </div>
                <button
                    onClick={() => onDelete(id)}
                    className="shrink-0 p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-red-400 cursor-pointer"
                    aria-label="Remove player"
                >
                    <BsTrash3 className="h-4 w-4"/>
                </button>
            </div>
        </motion.div>
    )
}

Player.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Player;