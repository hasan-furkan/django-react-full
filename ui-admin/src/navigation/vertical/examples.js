import SvgIcons from '../../svg-icons/SvgIcons';

export default [
  {
    id: 'example',
    title: 'Example',
    icon: <SvgIcons icon="home" size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Basic',
        icon: <SvgIcons icon="home" size={20} />,
        navLink: '/example',
        permission: ['admin', 'manager', 'user'],
      },
    ],
  },
];
