import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';

function AutoEmail({ onChange, value, errors, email }) {
  const [touched, setTouched] = useState(false);

  const hasErrors = errors.length > 0;
  const showValidation = touched && email.length > 0;

  return (
    <>
      <label className={`input gap-4 pr-5 mb-1.5 mt-4 w-full h-12 rounded-lg bg-bg-light transition-all duration-200
          ${showValidation
          ? hasErrors
            ? 'input-error border border-error'
            : 'input-success border border-success'
          : ''}`}
      >
        <div className="ml-3 text-[#848f95]">
          <HiOutlineMail size={24} />
        </div>
        <input
          onChange={(e) => {
            onChange(e);
            if (!touched) setTouched(true);
          }}
          value={value}
          type="email"
          name="email"
          placeholder="Enter your email ..."
          aria-label="Email"
          className="bg-transparent flex-1 outline-none text-black dark:text-white"
          required
        />
      </label>

      <div className="space-y-[2px]">
        {!showValidation ? null : hasErrors ? (
          errors.map((error, i) => (
            <p key={i} className="text-error text-sm">❌ {error}</p>
          ))
        ) : (
          <p className="text-success text-sm">✅ Email looks valid!</p>
        )}
      </div>
    </>
  );
}

export default AutoEmail;
