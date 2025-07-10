import { Link } from "react-router"
import logoDark from '../../assets/giro-logo-dark.png'
import logoLight from '../../assets/giro-logo-light.png'

const Heading = () => {
  return (
    <div className="flex lg:flex-1 ">
      <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 transition-transform duration-300 ">
        {/* Light Theme Logo */}
        <img
          className="size-8 block dark:hidden"
          src={logoDark}
          alt="GIRO Logo Light"
        />

        {/* Dark Theme Logo */}
        <img
          className="size-8 hidden dark:block"
          src={logoLight}
          alt="GIRO Logo Dark"
        />

        <p className="font-epilogue font-bold text-2xl mt-1 place-self-center text-text transition-colors duration-300 ">
          GIRO
        </p>
      </Link>
    </div>
  )
}

export default Heading
