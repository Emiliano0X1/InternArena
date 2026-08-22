import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { FiMail, FiLock, FiArrowLeft, FiTerminal } from 'react-icons/fi'

function Login() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full bg-[#1a1616] text-white flex items-center justify-center p-4 overflow-hidden">
            
            {/* Background animated blobs and grid */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Blob 1 */}
                <motion.div 
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, -60, 40, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-orange-500/20 to-amber-600/10 blur-[80px]"
                />
                {/* Blob 2 */}
                <motion.div 
                    animate={{
                        x: [0, -70, 50, 0],
                        y: [0, 80, -50, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-orange-600/10 to-red-500/20 blur-[90px]"
                />
                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            {/* Back Link */}
            <div className="absolute top-6 left-6 z-10">
                <button 
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-orange-500 transition-all cursor-pointer bg-[#2c2727]/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-neutral-800/80 shadow-md"
                >
                    <FiArrowLeft className="text-sm transition-transform duration-200 group-hover:-translate-x-1" /> Return to Arena
                </button>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-md z-10 flex flex-col items-center justify-center space-y-8">
                
                {/* Form Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full bg-[#2c2727]/60 backdrop-blur-xl p-8 rounded-2xl border border-neutral-700/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-6"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-600 shadow-lg shadow-orange-500/25">
                            <FiTerminal className="text-2xl text-white font-bold" />
                        </div>
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-xs text-neutral-400 max-w-xs text-center font-medium">
                            Enter the email address synced with your competitive Leetcode profile.
                        </p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1.5 px-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 group-focus-within:text-orange-500 transition-colors">
                                    <FiMail className="text-base" />
                                </span>
                                <input 
                                    type="email" 
                                    placeholder="examplemail@domain.com" 
                                    className="w-full bg-[#1b1717]/80 text-white placeholder-neutral-600 rounded-xl border border-neutral-700/60 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 hover:border-neutral-600 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1.5 px-1">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 group-focus-within:text-orange-500 transition-colors">
                                    <FiLock className="text-base" />
                                </span>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full bg-[#1b1717]/80 text-white placeholder-neutral-600 rounded-xl border border-neutral-700/60 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 hover:border-neutral-600 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons / Actions */}
                    <div className="flex flex-col gap-3 pt-2">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl py-3 text-sm font-bold hover:from-orange-600 hover:to-amber-700 transition-all shadow-md shadow-orange-500/10 cursor-pointer text-center"
                            onClick={() => navigate('/')}
                        >
                            LOG IN
                        </motion.button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-neutral-700/30"></div>
                            <span className="flex-shrink mx-4 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">New to Arena?</span>
                            <div className="flex-grow border-t border-neutral-700/30"></div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-neutral-800/80 text-neutral-300 rounded-xl py-3 text-sm font-semibold hover:bg-neutral-700/80 transition-all border border-neutral-700/30 cursor-pointer text-center"
                            onClick={() => navigate('/register')}
                        >
                            CREATE AN ACCOUNT
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer text */}
                <div className="text-center text-xs text-neutral-500 font-medium">
                    &copy; 2026 Leet Arena. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Login;

