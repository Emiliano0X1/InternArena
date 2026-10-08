import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { FiArrowLeft } from "react-icons/fi";
import Carousel from "../../components/Carousel";
import RegisterForm from "./components/RegisterForm";

function Register() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen w-full bg-[#1a1616] text-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
			{/* Left Pane - Auth Form with responsive vertical scroll */}
			<div className="relative flex flex-col items-center justify-between p-4 sm:p-6 lg:col-span-5 z-10 min-h-screen max-h-screen overflow-y-auto">
				{/* Background animated ambient blobs */}
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
							ease: "easeInOut",
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
							ease: "easeInOut",
						}}
						className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-orange-600/10 to-red-500/20 blur-[90px]"
					/>
					{/* Subtle grid pattern overlay */}
					<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
				</div>

				{/* Top Bar / Back Navigation */}
				<div className="w-full max-w-md flex justify-start z-20 pt-1 pb-2">
					<button
						onClick={() => navigate("/")}
						className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-orange-500 transition-all cursor-pointer bg-[#2c2727]/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-800/80 shadow-md"
					>
						<FiArrowLeft className="text-sm transition-transform duration-200 group-hover:-translate-x-1" />
						Return to Arena
					</button>
				</div>

				{/* Main Content Area */}
				<div className="w-full max-w-md z-10 flex flex-col items-center justify-center my-auto py-2">
					<RegisterForm />
				</div>

				{/* Footer text */}
				<div className="w-full text-center text-[11px] text-neutral-500 font-medium py-2 z-10">
					&copy; 2026 Leet Arena. All rights reserved.
				</div>
			</div>

			{/* Right Pane - Dynamic Event & Community Carousel */}
			<div className="hidden lg:block lg:col-span-7 h-screen sticky top-0 border-l border-neutral-800/40">
				<Carousel />
			</div>
		</div>
	);
}

export default Register;
