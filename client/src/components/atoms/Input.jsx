const Input = ({ value, label, type = "text", placeholder, icon, onChange }) => {
  return (
    <div className="w-full max-w-md">
      <label className="text-lg font-bold mb-1 block">{label}:</label>
      
      <div
        className="
          flex items-center px-4 py-3 rounded-md border
          border-[#b3b3d1] bg-white
          focus-within:border-[#8A88BF]
          focus-within:ring-1 focus-within:ring-[#8A88BF]
          transition
        "
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
        {icon && (
          <div className="ml-3 text-gray-400 text-xl pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
