import SvgIcons from '../../svg-icons/SvgIcons';

// eslint-disable-next-line react/prop-types
function MenuItemComponent({ onClick, icon, label }) {
  return (
    <li role="presentation" className="flex gap-2 m-2 hover:bg-grey-200 p-1 cursor-pointer" onClick={onClick}>
      <SvgIcons icon={icon} /> {label}
    </li>
  );
}

export default MenuItemComponent;
