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
  { icon: <FaGithub />, href: 'https://github.com/dhurjoy-paul' },
  { icon: <FaFacebookF />, href: 'https://www.facebook.com/dhurjoy.dev' },
  { icon: <FaYoutube />, href: 'https://youtube.com' },
  { icon: <FaLinkedinIn />, href: 'https://twitter.com' },
]

const Footer = () => {
  return (
    <footer className="bg-bg-light text-text py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4 text-center space-y-6"
      >
        <Heading />

        {/* footer menu */}
        <div className="flex flex-wrap justify-center gap-6 md:text-lg font-medium mt-10">
          {menuItems.map((menuItem, i) => (
            <MenuItem key={i} label={menuItem.name} to={menuItem.to} />
          ))}
        </div>

        {/* sociaL menu */}
        <div className="flex justify-center gap-6 text-xl mb-10">
          {socials.map(({ icon, href }, i) => (
            <Link key={i} target="_blank" rel="noopener noreferrer"
              className="hover:text-brand transition-colors duration-300"
              to={href}
            >
              {icon}
            </Link>
          ))}
        </div>

        {/* copyright section */}
        <p className="text-sm md:text-base text-text-muted">
          Copyright © {new Date().getFullYear()} - All right reserved by GIRO Ltd.
        </p>
      </motion.div>
    </footer>
  )
}

export default Footer
