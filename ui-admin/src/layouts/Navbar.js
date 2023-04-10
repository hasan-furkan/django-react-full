import { useDispatch } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { options } from './component/MenuItemDataComponent';
import MenuItemComponent from './component/MenuItemComponent';
import SvgIcons from '../svg-icons/SvgIcons';
import logo from '../assets/images/logo/karanlıklogo9728.png';
import { setLogout } from '../redux/components/auth';
import { setTheme } from '../redux/components/theme';
import avatar from '../assets/images/avatars/avatar.jpg';
import { succesToastMessage } from '../components/toasts';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

// eslint-disable-next-line react/prop-types
export default function Header({ setIsDarkMode, isDarkMode }) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleModeToggle = () => {
    dispatch(setTheme(!isDarkMode ? 'light' : 'dark'));
    localStorage.setItem('theme', !isDarkMode ? 'light' : 'dark');
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(setLogout(false));
    succesToastMessage('basarili bir sekilde cikis yapildi', 1000);
  };

  useEffect(() => {}, [isDarkMode]);
  return (
    <nav className="w-full bg-light-300 dark:bg-black-300 flex p-4 items-center justify-between sticky top-0">
      <div className="inline-flex space-x-2">
        <div className="h-8 w-auto">
          <img src={logo} alt="" className="ml-14 mt-3" />
        </div>
      </div>
      <ul className="hidden md:flex space-x-4 dark:text-slate-100 text-slate-900">
        <li role="presentation" className="px-1 py-1 hover:cursor-pointer dark:text-light-500">
          <ReactCountryFlag
            countryCode="us"
            style={{
              fontSize: '2em',
              cursor: 'pointer',
            }}
            onClick={() => {
              i18n.changeLanguage('en');
            }}
          />
        </li>
        <li role="presentation" className="py-1 hover:cursor-pointer dark:text-light-500">
          <ReactCountryFlag
            countryCode="tr"
            style={{
              fontSize: '2em',
              cursor: 'pointer',
            }}
            onClick={() => {
              i18n.changeLanguage('tr');
            }}
          />
        </li>
        <li role="presentation" className="py-2 hover:cursor-pointer dark:text-light-500">
          <SvgIcons icon="home" />
        </li>
        <li role="presentation" className="py-2 hover:cursor-pointer dark:text-light-500" onClick={handleModeToggle}>
          <SvgIcons icon={`${!isDarkMode ? 'sunOff' : 'sun'}`} width={16} height={20} />
        </li>
        <motion.li className="relative cursor-pointer" whileTap={{ scale: 0.97 }} onClick={handleToggle}>
          {/* eslint-disable-next-line react/button-has-type,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <motion.span className="text-black-300 dark:text-light-500">
            <motion.img
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
              src={avatar}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-purple-400"
              alt=""
            />
          </motion.span>
          {isOpen && (
            <div className="bg-light-300 text-black-500 absolute top-full right-1 w-56 mt-2 dark:bg-black-300 dark:text-light-500 rounded-lg shadow-lg">
              <motion.ul
                variants={{
                  open: {
                    clipPath: 'inset(0% 0% 0% 0% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.6,
                      staggerChildren: 0.08,
                    },
                  },
                  closed: {
                    clipPath: 'inset(10% 50% 90% 50% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                className="py-4 px-2"
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
              >
                <li className="flex gap-2 m-2">
                  <img src={avatar} className="inline-block h-9 w-9 rounded-full ring-2 ring-purple-400" alt="" />
                  <div className="flex flex-col">
                    <span className="text-sm ">hsnfrkn32@gmail.com</span>
                    <span className="text-sm text-grey-500">Admin</span>
                  </div>
                </li>
                <hr />
                {options.map((option, index) => {
                  return index % 3 === 2 ? (
                    <div key={index}>
                      <MenuItemComponent icon={option.icon} onClick={option.onClick} label={option.label} />
                      <hr />
                    </div>
                  ) : (
                    <MenuItemComponent
                      variants={itemVariants}
                      key={index}
                      icon={option.icon}
                      onClick={option.onClick}
                      label={option.label}
                    />
                  );
                })}
                <hr />
                <motion.li
                  variants={itemVariants}
                  className="flex gap-2 m-2 hover:bg-grey-200 p-1 cursor-pointer"
                  onClick={handleLogout}
                >
                  <SvgIcons icon="logOut" />
                  Sign Out
                </motion.li>
              </motion.ul>
            </div>
          )}
        </motion.li>
      </ul>
    </nav>
  );
}
