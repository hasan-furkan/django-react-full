import React, { useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import navigation from '../navigation/vertical/index';
import { checkPermissions } from '../utils/checkPermission';

function Sidebar() {
  const { t } = useTranslation();
  const userRole = 'user';

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(0);

  const handleItemClick = (e) => {
    setActiveChildIndex(e);
  };

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {}, [activeIndex, activeChildIndex]);

  return (
    <div className="flex">
      <div className="w-1/5 bg-light-300 dark:bg-black-300 h-screen overflow-y-auto scroll-smooth">
        <ul className="mt-4 bg-white">
          {navigation.map((d, i) => (
            <li key={i}>
              <div
                role="presentation"
                className={`${
                  activeIndex === d.id
                    ? 'bg-purple-400 text-light-500'
                    : 'text-black-500 hover:bg-purple-300 dark:text-light-500'
                } flex items-center justify-between hover:bg-gray-200 cursor-pointer m-2 py-2 px-4 rounded-2xl`}
                onClick={() => handleClick(i)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {d.icon}
                  </svg>
                  <span>{t(`${d.title}`)}</span>
                </div>
                {d.children && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={activeIndex === i ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
                    />
                  </svg>
                )}
              </div>
              {activeIndex === i && d.children && (
                <ul className="pl-8">
                  {d.children
                    .filter((child) => checkPermissions(userRole, child.permission))
                    .map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          to={child.navLink}
                          className={`${
                            activeChildIndex === childIndex
                              ? 'bg-purple-400 text-light-500'
                              : 'text-gray-800 hover:bg-purple-300 dark:text-light-500'
                          } rounded-2xl m-2 py-2 px-5 block`}
                          onClick={() => handleItemClick(childIndex)}
                        >
                          {t(`${child.title}`)}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4 rounded-bg-lg bg-light-300 dark:bg-black-300">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
