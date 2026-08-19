import loginImage from '../../assets/login.png'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

import { FaLongArrowAltLeft } from "react-icons/fa"

function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#282424] text-white flex flex-col md:flex-row">
            
            {/* Left Image Section - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block md:w-1/2 lg:w-3/5 h-screen relative overflow-hidden">
                <img 
                    src={loginImage} 
                    alt="Login Banner" 
                    className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#282424]/30" />
            </div>

            {/* Right Form Section */}
            <div className="flex-1 min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16">
                
                {/* Back Link */}
                <div className="flex justify-start">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-orange-500 transition-colors cursor-pointer"
                    >
                        <FaLongArrowAltLeft className="text-sm" /> Return to Arena
                    </button>
                </div>

                {/* Form Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md mx-auto my-auto bg-[#383434] p-8 rounded-xl border border-neutral-700/30 shadow-2xl space-y-6"
                >
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                            Enter the email address synced with your competitive Leetcode profile.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 px-1">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                placeholder="examplemail@domain.com" 
                                className="w-full bg-[#282424] text-white placeholder-neutral-500 rounded-lg border border-neutral-700/60 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 px-1">
                                Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full bg-[#282424] text-white placeholder-neutral-500 rounded-lg border border-neutral-700/60 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <button 
                            className="w-full bg-orange-500 text-white rounded-lg py-3.5 text-sm font-bold hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/10 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            LOG IN
                        </button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-neutral-700/40"></div>
                            <span className="flex-shrink mx-4 text-neutral-500 text-xs font-semibold uppercase tracking-wider">New to Arena?</span>
                            <div className="flex-grow border-t border-neutral-700/40"></div>
                        </div>

                        <button 
                            className="w-full bg-neutral-800 text-neutral-300 rounded-lg py-3.5 text-sm font-semibold hover:bg-neutral-700/80 transition-colors border border-neutral-700/30 cursor-pointer"
                            onClick={() => navigate('/register')}
                        >
                            CREATE AN ACCOUNT
                        </button>
                    </div>
                </motion.div>

                {/* Footer text */}
                <div className="text-center text-xs text-neutral-500">
                    &copy; 2026 Leet Arena. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Login;

