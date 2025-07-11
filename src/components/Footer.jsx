import { motion } from 'framer-motion'
import { FaCircleInfo, FaFacebookF, FaGithub, FaLinkedinIn, FaPaperPlane, FaYoutube } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import { RiUserCommunityFill } from 'react-icons/ri'
import { Link } from 'react-router'
import Heading from './ui/Heading'
import MenuItem from './ui/MenuItem'

const menuItems = [
  { name: 'Home', to: '/', icon: <HiHome size={26} /> },
  { name: 'Trips', to: '/trips', icon: <FaPaperPlane /> },
  { name: 'Community', to: '/community', icon: <RiUserCommunityFill size={26} /> },
  { name: 'About Us', to: '/about-us', icon: <FaCircleInfo size={24} /> }
]
const socials = [
  { icon: <FaGithub size={27} />, href: 'https://github.com/dhurjoy-paul' },
  { icon: <FaFacebookF size={27} />, href: 'https://www.facebook.com/dhurjoy.dev' },
  { icon: <FaYoutube size={27} />, href: 'https://youtube.com' },
  { icon: <FaLinkedinIn size={27} />, href: 'https://linkedin.com' },
]

const Footer = () => {
  return (
    <footer className="bg-bg-light text-text py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 text-center"
      >
        <section className='w-full max-w-7xl px-4 md:px-8 mx-auto flex flex-col lg:gap-12 lg:flex-row lg:justify-between lg:items-start'>

          {/* left */}
          <div className='flex flex-col items-center text-center'>
            <Heading />
            <p className='mt-4 mb-12 text-lg lg:text-xl text-text-muted font-bricolage-grotesque'>
              <span className='font-semibold text-text'>G</span>o,
              <span className='font-semibold text-text'> I</span>nspire,
              <span className='font-semibold text-text'> R</span>oam,
              <span className='font-semibold text-text'> O</span>rbit <br />
              <Link to='/trips' className='lg:text-lg underline underline-offset-4 hover:decoration-2'>Explore Beyond Limits</Link>
            </p>
          </div>

          {/* right */}
          <div>
            {/* sociaL menu */}
            <div className="flex justify-center gap-6 text-xl mb-4 lg:mt-3 lg:mb-5">
              {socials.map(({ icon, href }, i) => (
                <Link key={i} target="_blank" rel="noopener noreferrer"
                  className="hover:text-brand transition-colors duration-300"
                  to={href}
                >
                  {icon}
                </Link>
              ))}
            </div>

            {/* footer menu */}
            <div className="flex flex-wrap justify-center gap-6 md:text-lg font-medium mb-12">
              {menuItems.map((menuItem, i) => (
                <MenuItem key={i} label={menuItem.name} to={menuItem.to} />
              ))}
            </div>
          </div>
        </section>

        {/* copyright section */}
        <div className="items-center justify-between text-sm md:text-base px-2">
          <p className='text-text-muted'>Copyright © {new Date().getFullYear()} - All right reserved by <span className='font-bricolage-grotesque text-text/80'>GIRO Ltd.</span></p>
          <p className='text-text-muted/70 font-bricolage-grotesque'>Encouraging people to explore the world and grow through travel.</p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
