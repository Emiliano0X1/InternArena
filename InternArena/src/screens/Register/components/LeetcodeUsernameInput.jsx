import PropTypes from "prop-types";
import { FiCheckCircle, FiAlertCircle, FiLoader, FiUser } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

export default function LeetcodeUsernameInput({
	value,
	onChange,
	isValidating,
	isValid,
	isError,
	errorMessage,
	disabled = false,
}) {
	// Determine border color based on status
	let borderStyle = "border-neutral-700/60 hover:border-neutral-600 focus:border-orange-500 focus:ring-orange-500/30";
	if (isError) {
		borderStyle = "border-red-500/70 focus:border-red-500 focus:ring-red-500/20";
	} else if (isValid) {
		borderStyle = "border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/20";
	}

	return (
		<div className="space-y-1">
			<label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 px-1">
				LeetCode Username
			</label>
			<div className="relative group">
				<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500 group-focus-within:text-orange-500 transition-colors">
					<SiLeetcode className="text-base" />
				</span>

				<input
					type="text"
					placeholder="leetcode_handle"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					disabled={disabled}
					className={`w-full bg-[#1b1717]/80 text-white placeholder-neutral-600 rounded-xl border pl-11 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all font-medium ${borderStyle}`}
				/>

				{/* Right status icon inside input */}
				<div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
					{isValidating && (
						<FiLoader className="text-orange-500 animate-spin text-sm" />
					)}
					{!isValidating && isValid && (
						<FiCheckCircle className="text-emerald-400 text-sm" />
					)}
					{!isValidating && isError && (
						<FiAlertCircle className="text-red-400 text-sm" />
					)}
					{!isValidating && !isValid && !isError && !value && (
						<FiUser className="text-neutral-600 text-sm" />
					)}
				</div>
			</div>

			{/* Status Feedback Subtext */}
			{(isValidating || isValid || isError || !value) && (
				<div className="min-h-[14px] px-1">
					{isValidating && (
						<p className="text-[10px] text-orange-400/90 flex items-center gap-1 font-medium animate-pulse">
							Verifying LeetCode handle...
						</p>
					)}
					{!isValidating && isValid && (
						<p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
							<FiCheckCircle className="text-xs shrink-0" />
							LeetCode profile verified & available
						</p>
					)}
					{!isValidating && isError && (
						<p className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
							<FiAlertCircle className="text-xs shrink-0" />
							{errorMessage || "LeetCode user not found or unavailable"}
						</p>
					)}
					{!isValidating && !isValid && !isError && !value && (
						<p className="text-[10px] text-neutral-500 font-medium">
							Must be an existing public LeetCode handle
						</p>
					)}
				</div>
			)}
		</div>
	);
}

LeetcodeUsernameInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isValidating: PropTypes.bool,
	isValid: PropTypes.bool,
	isError: PropTypes.bool,
	errorMessage: PropTypes.string,
	disabled: PropTypes.bool,
};
