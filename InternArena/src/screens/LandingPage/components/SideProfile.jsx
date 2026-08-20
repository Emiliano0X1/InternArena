import profilebanner from '../../../assets/profilebanner.png'
import joeswag from '../../../assets/joeswag.png'
import leetcode from '../../../assets/leetcode.png'
import { LiaMedalSolid } from "react-icons/lia";
import { LuCoins } from "react-icons/lu";
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'


function SideProfile(){
    return(
        <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }} 
            className="w-full bg-[#383434] rounded-xl overflow-hidden border border-neutral-700/30 shadow-xl"
        >
            <div className="relative h-28 w-full overflow-hidden">
                <img 
                    src={profilebanner} 
                    alt="Profile Banner" 
                    className='w-full h-full object-cover brightness-75'
                />
            </div>
            
            <div className="flex flex-col items-center px-6 pb-6">
                <div className="relative -mt-14 mb-3">
                    <img
                        src={joeswag}
                        alt="Profile Picture"
                        className="w-24 h-24 rounded-full border-4 border-[#383434] object-cover shadow-lg"
                    />
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#383434]" />
                </div>

                <h3 className="text-xl font-bold text-gray-100">Flavio Gonsales</h3>
                <p className="text-sm text-neutral-400 mb-6">Competitive Coder</p>

                {/* Stats Panel */}
                <div className="w-full space-y-3.5">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/40 hover:bg-neutral-800/60 transition-colors border border-neutral-800">
                        <div className="flex items-center gap-3">
                            <img src={leetcode} alt="Leetcode Logo" className="h-5 w-5 object-contain" />
                            <span className="text-sm font-medium text-neutral-300">Leetcode Rank</span>
                        </div>
                        <span className="text-sm font-semibold text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">#1</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/40 hover:bg-neutral-800/60 transition-colors border border-neutral-800">
                        <div className="flex items-center gap-3">
                            <LiaMedalSolid className="h-5 w-5 text-neutral-400" />
                            <span className="text-sm font-medium text-neutral-300">Match Wins</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-200">0</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/40 hover:bg-neutral-800/60 transition-colors border border-neutral-800">
                        <div className="flex items-center gap-3">
                            <LuCoins className="h-5 w-5 text-orange-400" />
                            <span className="text-sm font-medium text-neutral-300">Leetcoins</span>
                        </div>
                        <span className="text-sm font-semibold text-yellow-500">12,345</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SideProfile;