'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Menu, ChevronDown, X } from 'lucide-react';
import { IActiveUserRsponce, UserService } from '@/services/UserService';
import { TAuthorizationModal } from './types';
import DropDownNav from '../AuthorizationModal/DropDownNav';
import { getCookie } from '@/utils/cookie';
import Button from '../UI/Button/Button';
import ModalWrapper from '../UI/ModalWrapper';
import LoginModalWrapper from '../AuthorizationModal/LoginModalWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '@/store/slices/navSlice';
import { TabValues } from '@/screens/MainScreen/types';
import { AuthorizationService } from '@/services/AuthorizationService';
import mockProfileAvatar from '@/assets/mock-profile-avatar.png';
import Image from 'next/image';

interface HeaderProps {
  onMenuClick?: () => void;
}

const NewHeader = ({ onMenuClick }: HeaderProps = {}) => {
  const [userData, setUserData] = useState<IActiveUserRsponce | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [authorizationModalType, setAuthorizationModalType] = useState<TAuthorizationModal>(null);
  const [isOpenCheckModal, setIsOpenCheckModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(setActiveTab(TabValues.All));
    router.push('/all-tab');
  };

  const { mutateAsync: logoutFunc } = useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthorizationService.logout,
    onSuccess: () => console.log('success'),
  });

  const { data: isProfile, isLoading } = useQuery({
    queryKey: ['profileCheck'],
    queryFn: AuthorizationService.profileCheck,
  });

  const handleLogout = () => {
    logoutFunc();
    setUserData(null);
    router.push('/');
  };

  const { data } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: () => UserService.getActiveUser(),
    enabled: !!getCookie('sessionid'),
  });

  useEffect(() => {
    if (data) setUserData(data?.data);
  }, [data]);

  useEffect(() => {
    /* if (!isLoading && !isProfile?.data.id) {
      const authCheckKey = 'authCheckTime';
      const timeLeftKey = 'timeLeft';
      const savedTime = localStorage.getItem(authCheckKey);
      const currentTimeLeft = localStorage.getItem(timeLeftKey);
      const currentTime = Date.now();
      let timeLeft = Number(process.env.NEXT_PUBLIC_TIMER_AUTH) || 30000;

      if (currentTimeLeft) {
        timeLeft = Number(currentTimeLeft);
      }

      if (Number(savedTime) && timeLeft === 0) {
        setIsOpenCheckModal(true);
        return;
      }

      if (savedTime) {
        const elapsed = currentTime - parseInt(savedTime, 10);
        timeLeft = Math.max(0, Number(process.env.NEXT_PUBLIC_TIMER_AUTH) || 30000 - elapsed);
      }

      const timeoutId = setTimeout(() => {
        setIsOpenCheckModal(true);
      }, timeLeft);

      setAuthTimer(timeoutId);
      localStorage.setItem(authCheckKey, currentTime.toString());
      localStorage.setItem(timeLeftKey, timeLeft.toString());
    }

    return () => {
      if (authTimer) {
        clearTimeout(authTimer);
      }
    }; */
  }, [isLoading]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black backdrop-blur-50 border-b border-[#181B22]">
        <div className="flex items-center justify-between h-full px-3 sm:px-4 lg:px-6">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-6 sm:w-6 sm:h-7 lg:w-6 lg:h-7 relative flex-shrink-0">
              <svg viewBox="0 0 18 23" fill="none" className="w-full h-full">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 11.4935L0.000836009 11.5607C1.99496 11.1253 3.99971 10.6706 6.00816 10.215L6.01186 21.0231L12.7689 22.5C12.7689 20.1266 12.7479 13.4405 12.77 11.0677L8.04193 10.0343L7.41266 9.89685C10.9481 9.0969 14.49 8.30751 18 7.62785L17.9988 0.5C12.0625 1.79714 5.95525 3.33041 0 4.43313L0 11.4935Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="4.37143"
                    y1="24.15"
                    x2="13.044"
                    y2="2.25457"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#181A20" />
                    <stop offset="1" stopColor="#A06AFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">
              Tyrian Trade
            </h1>
          </button>

          {/* Desktop Center - Search and AI Assistant */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#A06AFF]/80 rounded-3xl backdrop-blur-50 w-64 hover-lift cursor-pointer">
              <Search className="w-6 h-6 text-[#C2C2C2]" />
              <span className="text-[#C2C2C2] font-bold text-sm">
                Search (Ctrl + K)
              </span>
            </div>

            {/* AI Assistant Badge */}
            <div className="flex items-center gap-2 hover:bg-[#20252B]/30 rounded-lg px-2 py-1 hover-lift cursor-pointer">
              <div className="flex items-center justify-center w-7 h-7 border border-[#313640] rounded-md backdrop-blur-50">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-bold text-sm">Assistant</span>
            </div>
          </div>

          {/* Right Side - Always visible */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-[#20252B]/30 rounded-lg hover-lift">
              <Search className="w-5 h-5 text-white" />
            </button>

            {/* Language Selector - Always visible */}
            <div className="hidden sm:flex items-center gap-1 sm:gap-2 px-2 lg:px-3 py-1 lg:py-2 rounded-lg backdrop-blur-120 hover:bg-[#20252B]/30 hover-lift cursor-pointer min-h-[40px]">
              <span className="text-white font-bold text-xs lg:text-sm">ENG</span>
              <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-[#B0B0B0]" />
            </div>

            {userData ? (
              <>
                {/* Notifications */}
                <div className="relative hover-lift cursor-pointer p-1 min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 lg:w-5 lg:h-5 bg-[#EF454A] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                </div>

                {/* Divider - Hidden on mobile */}
                <div className="hidden lg:block w-px h-11 bg-gradient-to-b from-transparent via-[#A06AFF] to-transparent"></div>

                {/* User Avatar */}
                <div className="relative flex items-center gap-2 min-w-[40px] min-h-[40px]">
                  <Image
                    src={mockProfileAvatar}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex-shrink-0 cursor-pointer hover-lift"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setDropdownVisible((prev) => !prev);
                    }}
                  />
                  {isDropdownVisible && (
                    <div className="absolute top-12 right-0 z-50">
                      <DropDownNav
                        onClick={(action) => {
                          if (action === 'profile') {
                            setDropdownVisible(false);
                            router.push('/profile');
                          } else if (action === 'logout') {
                            handleLogout();
                            setDropdownVisible(false);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Button
                  className="px-4 py-2 bg-gradient-to-r from-[#A06AFF] to-[#482090] rounded-lg text-white font-bold text-sm hover-lift"
                  onClick={() => {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.tyriantrade.com/';
                    window.location.href = `${baseUrl}marketplace`;
                  }}
                >
                  Login
                </Button>
              </>
            )}

            {/* Menu Button - Opens Right Sidebar - ALWAYS VISIBLE */}
            <button
              onClick={onMenuClick}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-[#A06AFF] to-[#482090] rounded-lg hover-lift min-w-[40px] min-h-[40px]"
            >
              <Menu className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </button>

            {/* Mobile Menu Toggle (for mobile search/AI) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[#20252B]/30 rounded-lg hover-lift min-w-[40px] min-h-[40px]"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[rgba(12,16,20,0.48)] backdrop-blur-50 border-b border-[#181B22] z-40">
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-[calc(100vh-64px)] overflow-y-auto">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-3 glass-card rounded-lg hover-lift min-h-[48px]">
                <Search className="w-5 h-5 text-[#C2C2C2] flex-shrink-0" />
                <span className="text-[#C2C2C2] font-bold text-sm">
                  Search (Ctrl + K)
                </span>
              </div>

              {/* Mobile AI Assistant */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-3 hover:bg-[#20252B]/30 rounded-lg hover-lift min-h-[48px]">
                <div className="flex items-center justify-center w-7 h-7 border border-[#313640] rounded-md backdrop-blur-50 flex-shrink-0">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-white font-bold text-sm">Assistant</span>
              </div>

              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 glass-card rounded-lg hover-lift min-h-[48px]">
                <span className="text-white font-bold text-sm">
                  Language: ENG
                </span>
                <ChevronDown className="w-4 h-4 text-[#B0B0B0] flex-shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {!!authorizationModalType && (
          <ModalWrapper onClose={() => setAuthorizationModalType(null)}>
            <LoginModalWrapper
              type={authorizationModalType as 'login' | 'registration' | 'recovery'}
              onModalChange={(type) => setAuthorizationModalType(type)}
            />
          </ModalWrapper>
        )}
      </header>
    </>
  );
};

export default NewHeader;
