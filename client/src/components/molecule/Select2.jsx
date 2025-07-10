const Select2 = ({ label, value, onChange, options = [], placeholder = "Select an option" }) => {
  return (
    <div className="w-full max-w-md">
      <label className="text-lg font-bold mb-1 block">{label}:</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            appearance-none
            w-full
            bg-white
            border border-[#b3b3d1]
            text-gray-700
            py-3 px-4
            pr-10
            rounded-md
            focus:outline-none
            focus:border-blue-500
            transition
          "
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );
};

export default Select2;
