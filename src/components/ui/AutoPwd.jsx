import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineKey } from 'react-icons/hi';

function AutoPwd({ onChange, value, errors, pwd }) {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const hasErrors = errors.length > 0;
  const showValidation = touched && pwd.length > 0;

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
          <HiOutlineKey size={24} />
        </div>
        <input onChange={(e) => {
          onChange(e);
          if (!touched) setTouched(true);
        }}
          value={value}
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder="Enter your password ..."
          aria-label="Password"
          className="bg-transparent flex-1 outline-none text-black dark:text-white"
          required
        />
        <button
          type="button"
          className="cursor-pointer text-[#848f95] pr-3"
          onClick={() => setShowPassword(vis => !vis)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
        >
          {showPassword ? <HiOutlineEyeOff size={24} /> : <HiOutlineEye size={24} />}
        </button>
      </label>

      {/* Feedback */}
      <div className="space-y-[2px]">
        {!showValidation ? null : hasErrors ? (
          errors.map((error, i) => (
            <p key={i} className="text-error text-sm">❌ {error}</p>
          ))
        ) : pwd.length >= 8 ? (
          <p className="text-success text-sm">✅ Password is very strong!</p>
        ) : (
          <p className="text-success text-sm">✅ Password is strong!</p>
        )}
      </div>
    </>
  );
}

export default AutoPwd;
