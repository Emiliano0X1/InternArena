import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { FiMail, FiLock, FiTerminal, FiAlertTriangle, FiCheck } from "react-icons/fi";
import LeetcodeUsernameInput from "./LeetcodeUsernameInput";
import { useCheckUsername } from "../../../hooks/useCheckUsername";
import { useRegister } from "../../../hooks/useRegister";

export default function RegisterForm() {
	const navigate = useNavigate();

	// Form field states
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [debouncedUsername, setDebouncedUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [formError, setFormError] = useState("");
	const [registeredSuccess, setRegisteredSuccess] = useState(false);

	// Debounce LeetCode username typing
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedUsername(username.trim());
		}, 400);
		return () => clearTimeout(timer);
	}, [username]);

	// LeetCode handle verification query
	const {
		data: checkData,
		isFetching: isCheckingUsername,
		isError: isCheckError,
		error: checkErrorObj,
	} = useCheckUsername(debouncedUsername, {
		enabled: debouncedUsername.length >= 2,
	});

	// Determine if username is verified
	const isUsernameVerified = Boolean(
		debouncedUsername.length >= 2 &&
		!isCheckingUsername &&
		!isCheckError &&
		checkData !== undefined &&
		(checkData === true || (checkData?.valid !== false && checkData?.available !== false))
	);

	// Username error message extraction
	const usernameErrorMessage = isCheckError
		? checkErrorObj?.message || "LeetCode user not found or unavailable"
		: checkData && (checkData.valid === false || checkData.available === false)
		? checkData.message || "Username already taken or invalid"
		: "";

	// Validation checks
	const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	const isPasswordLengthValid = password.length >= 6;
	const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

	// Submit is locked until ALL validations pass
	const isFormCompleteAndValid =
		isEmailValid &&
		isUsernameVerified &&
		isPasswordLengthValid &&
		doPasswordsMatch &&
		!isCheckingUsername;

	// Registration mutation hook
	const registerMutation = useRegister(
		() => {
			setFormError("");
			setRegisteredSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 1800);
		},
		(err) => {
			setFormError(err?.message || "Failed to create account. Please try again.");
		}
	);

	const handleSubmit = (e) => {
		e?.preventDefault();
		if (!isFormCompleteAndValid || registerMutation.isPending) return;

		setFormError("");
		registerMutation.mutate({
			email,
			password,
			username: debouncedUsername,
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="w-full bg-[#2c2727]/70 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-neutral-700/40 shadow-[0_16px_40px_rgba(0,0,0,0.35)] space-y-4"
		>
			{/* Header */}
			<div className="flex flex-col items-center space-y-1.5 text-center">
				<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-600 shadow-md shadow-orange-500/20">
					<FiTerminal className="text-xl text-white font-bold" />
				</div>
				<h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300 tracking-tight">
					Register Profile
				</h1>
				<p className="text-[11px] text-neutral-400 max-w-xs font-medium">
					Link your LeetCode handle to enter competitive lobbies.
				</p>
			</div>

			{/* Status Alerts */}
			{registeredSuccess && (
				<div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-2.5 flex items-center gap-2 text-emerald-300 text-xs">
					<FiCheck className="text-sm shrink-0" />
					<span>Account created! Redirecting to login...</span>
				</div>
			)}
			{formError && (
				<div className="bg-red-950/60 border border-red-500/40 rounded-xl p-2.5 flex items-center gap-2 text-red-300 text-xs">
					<FiAlertTriangle className="text-sm shrink-0" />
					<span>{formError}</span>
				</div>
			)}

			{/* Form Inputs */}
			<form onSubmit={handleSubmit} className="space-y-2.5">
				{/* Email Input */}
				<div className="space-y-1">
					<label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 px-1">
						Email Address
					</label>
					<div className="relative group">
						<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 group-focus-within:text-orange-500 transition-colors">
							<FiMail className="text-sm" />
						</span>
						<input
							type="email"
							placeholder="examplemail@domain.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full bg-[#1b1717]/80 text-white placeholder-neutral-600 rounded-xl border border-neutral-700/60 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 hover:border-neutral-600 transition-all font-medium"
						/>
					</div>
				</div>

				{/* LeetCode Username Input with Live Verification */}
				<LeetcodeUsernameInput
					value={username}
					onChange={setUsername}
					isValidating={isCheckingUsername}
					isValid={isUsernameVerified}
					isError={Boolean(isCheckError || usernameErrorMessage)}
					errorMessage={usernameErrorMessage}
					disabled={registerMutation.isPending}
				/>

				{/* Password Input */}
				<div className="space-y-1">
					<label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 px-1">
						Password (min. 6 chars)
					</label>
					<div className="relative group">
						<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 group-focus-within:text-orange-500 transition-colors">
							<FiLock className="text-sm" />
						</span>
						<input
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full bg-[#1b1717]/80 text-white placeholder-neutral-600 rounded-xl border border-neutral-700/60 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 hover:border-neutral-600 transition-all font-medium"
						/>
					</div>
				</div>

				{/* Confirm Password Input */}
				<div className="space-y-1">
					<label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 px-1">
						Confirm Password
					</label>
					<div className="relative group">
						<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 group-focus-within:text-orange-500 transition-colors">
							<FiLock className="text-sm" />
						</span>
						<input
							type="password"
							placeholder="••••••••"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={`w-full bg-[#1b1717]/80 text-white placeholder-neutral-600 rounded-xl border pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all font-medium ${
								confirmPassword && !doPasswordsMatch
									? "border-red-500/70 focus:ring-red-500/20"
									: "border-neutral-700/60 focus:border-orange-500 focus:ring-orange-500/30 hover:border-neutral-600"
							}`}
						/>
					</div>
					{confirmPassword && !doPasswordsMatch && (
						<p className="text-[10px] text-red-400 px-1 font-medium">
							Passwords do not match
						</p>
					)}
				</div>

				{/* Actions */}
				<div className="flex flex-col gap-2 pt-1.5">
					<motion.button
						type="submit"
						disabled={!isFormCompleteAndValid || registerMutation.isPending}
						whileHover={isFormCompleteAndValid ? { scale: 1.01 } : {}}
						whileTap={isFormCompleteAndValid ? { scale: 0.99 } : {}}
						className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all shadow-md text-center ${
							isFormCompleteAndValid && !registerMutation.isPending
								? "bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 shadow-orange-500/20 cursor-pointer"
								: "bg-neutral-800 text-neutral-500 border border-neutral-700/40 cursor-not-allowed opacity-60"
						}`}
					>
						{registerMutation.isPending
							? "CREATING ACCOUNT..."
							: "CREATE AN ACCOUNT"}
					</motion.button>

					{!isFormCompleteAndValid && (
						<p className="text-[10px] text-neutral-500 text-center font-medium">
							{!isUsernameVerified
								? "⚠️ Verify your LeetCode username to continue"
								: !isEmailValid
								? "⚠️ Enter a valid email address"
								: !isPasswordLengthValid
								? "⚠️ Password must be at least 6 characters"
								: !doPasswordsMatch
								? "⚠️ Passwords must match"
								: "⚠️ Please complete all required fields"}
						</p>
					)}

					<div className="relative flex py-1 items-center">
						<div className="flex-grow border-t border-neutral-700/30"></div>
						<span className="flex-shrink mx-3 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
							Already registered?
						</span>
						<div className="flex-grow border-t border-neutral-700/30"></div>
					</div>

					<motion.button
						type="button"
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						className="w-full bg-neutral-800/80 text-neutral-300 rounded-xl py-2.5 text-sm font-semibold hover:bg-neutral-700/80 transition-all border border-neutral-700/30 cursor-pointer text-center"
						onClick={() => navigate("/login")}
					>
						LOG IN
					</motion.button>
				</div>
			</form>
		</motion.div>
	);
}
