import { Link } from "react-router"
import logoDark from '../../assets/giro-logo-dark.png'
import logoLight from '../../assets/giro-logo-light.png'

const Heading = ({ isAtTop }) => {
  return (
    <div className="flex">
      {
        isAtTop
          ? <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 transition-transform duration-300 ">
            <img
              className="size-9 md:size-[38px] lg:size-10"
              src={logoLight}
              alt="GIRO Logo Dark"
            />
            <p className="font-epilogue font-bold text-[26px] md:text-3xl lg:text-[32px] mt-1.5 place-self-center text-white transition-colors duration-300 ">
              GIRO
            </p>
          </Link>
          : <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 transition-transform duration-300 ">
            {/* Light Theme Logo */}
            <img
              className="size-9 md:size-[38px] lg:size-10 block dark:hidden"
              src={logoDark}
              alt="GIRO Logo Light"
            />

            {/* Dark Theme Logo */}
            <img
              className="size-9 md:size-[38px] lg:size-10 hidden dark:block"
              src={logoLight}
              alt="GIRO Logo Dark"
            />

            <p className="font-epilogue font-bold text-[26px] md:text-3xl lg:text-[32px] mt-1.5 place-self-center text-text transition-colors duration-300 ">
              GIRO
            </p>
          </Link>
      }
    </div>
  )
}

export default Heading
