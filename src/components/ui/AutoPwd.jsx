import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineKey } from 'react-icons/hi';

function AutoPwd({ onChange, value, errors, pwd }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="input validator gap-4 pr-5 mt-4 mb-5 w-full h-12 rounded-lg bg-bg-light">
        <div className="ml-3 text-[#848f95]"><HiOutlineKey size={24} /></div>
        <input onChange={onChange} value={value} type={showPassword ? 'text' : 'password'} name='password' placeholder="Enter your password ..." aria-label="Password" required />
        <button type='button' className="cursor-pointer text-[#848f95] pr-3" onClick={() => setShowPassword(vis => !vis)}
          aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} >
          {showPassword ? (<HiOutlineEyeOff size={24} />) : (<HiOutlineEye size={24} />)}
        </button>
      </label>
      <div className="space-y-[2px] -mt-2 mb-6">

        {
          pwd.length === 0 ? null :
            errors.length === 0 && pwd.length >= 8 ?
              (<p className="text-success text-sm">✅ Password is very strong!</p>) :
              errors.length === 0 && pwd.length >= 6 ?
                (<p className="text-success text-sm">✅ Password is strong!</p>) :
                (errors.map((error, i) => (<p key={i} className="text-error text-sm"> ❌ {error} </p>)))
        }


        {/*
          errors.length === 0 && pwd.length >= 8 ?
            (<p className="text-success text-sm">✅ Password is very strong!</p>) :
            errors.length === 0 && pwd.length > 0 ?
              (<p className="text-success text-sm">✅ Password is strong!</p>) :
              (errors.map((error, i) => (<p key={i} className="text-error text-sm"> ❌ {error} </p>)))
        */}
      </div>
    </>
  );
}
export default AutoPwd