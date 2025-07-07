
const Select = ({ label, name, value, onChange, options = [] }) => {
  return (
    <div className={`flex flex-col gap-1 w-full text-white`}>
      <label className="text-[16px] font-semibold">{label}:</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="bg-[#363543] text-white p-2 px-3 text-[15px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B4B5A] appearance-none"
      >
        <option value="" disabled>
          Pick a {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
