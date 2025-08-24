
function Popup({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#383434] p-8 rounded-2xl shadow-lg max-w-sm w-full text-center text-white">
        {title && <h2 className="text-2xl mb-4">{title}</h2>}

        <div className="flex flex-col gap-3">
          {children}
        </div>

        <button
          className="mt-6 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400 transition-colors duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
