import IconProfile from '@/assets/icons/navMenu/profile.svg';
import IconLogout from '@/assets/icons/navMenu/case.svg';

interface DropDownNavProps {
  onClick: (action: 'profile' | 'logout') => void;
}

const DropDownNav: React.FC<DropDownNavProps> = ({ onClick }) => {
  return (
    <ul className='absolute right-0 mt-2 w-48 bg-[#2F3136] rounded-[12px] z-[1000]'>
      <li
        onClick={() => onClick('profile')}
        className='flex items-center gap-[10px] px-4 py-3 hover:opacity-50 cursor-pointer border-b border-[rgba(255,255,255,0.16)] last:border-none'
      >
        <IconProfile className='w-6 h-6 text-purple' />
        <span>User</span>
      </li>
      <li
        onClick={() => onClick('logout')}
        className='flex items-center gap-[10px] px-4 py-3 hover:opacity-50 cursor-pointer last:border-none'
      >
        <IconLogout className='w-6 h-6' />
        <span>Log out</span>
      </li>
    </ul>
  );
};

export default DropDownNav;
