import { succesToastMessage } from '../../components/toasts';

export const options = [
  {
    icon: 'user',
    onClick: () => {
      succesToastMessage('user ogesine basariyla tiklandi');
    },
    label: 'Profile',
  },
  {
    icon: 'home',
    onClick: () => {
      console.log('settings clicked');
    },
    label: 'Settings',
  },
  {
    icon: 'lockOn',
    onClick: () => {
      console.log('lockOn clicked');
    },
    label: 'Lock On',
  },
  {
    icon: 'lockOff',
    onClick: () => {
      console.log('lockOff clicked');
    },
    label: 'Lock Off',
  },
  {
    icon: 'lockOn',
    onClick: () => {
      console.log('lockOn clicked');
    },
    label: 'Lock On',
  },
  {
    icon: 'lockOff',
    onClick: () => {
      console.log('lockOff clicked');
    },
    label: 'Lock Off',
  },
];
