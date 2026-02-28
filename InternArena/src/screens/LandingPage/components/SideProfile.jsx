import profilebanner from '../../../assets/profilebanner.png'
import joeswag from '../../../assets/joeswag.png'
import leetcode from '../../../assets/leetcode.png'
import { LiaMedalSolid } from "react-icons/lia";
import { LuCoins } from "react-icons/lu";
import { motion } from 'motion/react'

function SideProfile(){
    return(
        <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1}} 
        transition={{ duration: 1 }} 
        className="w-xs mx-4 p-4 rounded-xl bg-[#383434] text-2xl text-white">
            <img src={profilebanner} alt="Profile Banner" className='w-fit h-fit relative'/>
            {/*Cambiar profile pic por cada usuario
            @Backend
            Hermano realmente creyo q era d backend 😭😭
            */}
            <div className="flex justify-center">
                <img
                    src={joeswag}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-sm -mt-12 z-10 object-cover"
                    style={{ position: 'relative', top: '-48px' }}
                />
            </div>

            {/*
            Lowkey stats:
            Leetcode ranking (@backend)
            Match wins (@backend)
            Leetcoins (@backend)
            */}
            
            <div className='flex items-center'>
                <img src={leetcode} alt="Leetcode Picture" className='h-8 w-8'/>
                <p className='p-4'>Leetcode Ranking:</p>
                <p>1</p>
            </div>

            <div className='flex items-center'>
                <LiaMedalSolid className='h-8 w-8'/>
                <p className='p-4'>Match Wins:</p>
                <p>0</p>
            </div>

            <div className='flex items-center'>
                <LuCoins className='h-8 w-8'/>
                <p className='p-4'>Leetcoins:</p>
                <p>12,345</p>
            </div>
        </motion.div>
    )
}

export default SideProfile