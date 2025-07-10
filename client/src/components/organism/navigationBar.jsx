import Logo from '../../assets/RandomLogo2.png'
import { FaHome, FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { useState } from 'react';
import FriendList from '../templates/friendList';
import QueueList from '../templates/queueList';
import Settings from '../templates/settings';
import { useAuthStore } from '../../store/useAuthStore';

const NavigationBar = () => {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [sliderContent, setSliderContent] = useState('');
    const { logout, authUser} = useAuthStore();

    const handleIconClick = (content) => {
        if (isSliderOpen && sliderContent === content) {
            setIsSliderOpen(false);
            setSliderContent('');
        } else {
            setIsSliderOpen(true);
            setSliderContent(content);
        }
    };

    const handleLogOut = () => {
        if (authUser) {
            logout();
        }
    }

    const renderSliderContent = () => {
        switch (sliderContent) {
            case 'home':
                return (
                    <QueueList/>
                );
            case 'friends':
                return (
                    <FriendList/>
                );
            case 'settings':
                return (
                   <Settings/>
                );
            default:
                return (
                    <div className="p-4 text-gray-400">
                        <p>Click an icon to see details here.</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-[rgb(243,243,243)]">
            
            {/* Sidebar */}
            <div className="bg-[#2A2A35] flex flex-col items-center w-15 py-2">
                <div className='mb-7'>
                    <img src={Logo} alt="Logo" />
                </div>

                <div className='text-white text-2xl h-32 flex flex-col justify-evenly'>
                    <div className='p-1 rounded-md cursor-pointer hover:bg-[#262630] hover:scale-110 transition-all duration-200' onClick={() => handleIconClick('home')}>
                        <FaHome />
                    </div>
                    <div className='p-1 rounded-md cursor-pointer hover:bg-[#262630] hover:scale-110 transition-all duration-200' onClick={() => handleIconClick('friends')}>
                        <FaUserFriends />
                    </div>
                    <div className='p-1 rounded-md cursor-pointer hover:bg-[#262630] hover:scale-110 transition-all duration-200' onClick={() => handleIconClick('settings')}>
                        <IoMdSettings />
                    </div>
                </div>

                <div className='flex-grow flex items-end pb-4'>
                    <button className='text-white text-2xl p-1 rounded-md cursor-pointer hover:bg-[#262630] hover:scale-110 transition-all duration-200'
                    onClick={handleLogOut}>
                        <TbLogout2 />
                    </button>
                </div>
            </div>

            {/* Slider Content */}
            <div
                className={`
                    bg-white
                    shadow-lg
                    h-full
                    transition-all duration-300
                    overflow-hidden
                    flex-shrink-0
                    ${isSliderOpen ? 'w-64' : 'w-0'}
                `}
            >
                {renderSliderContent()}
            </div>
        </div>
    );
};

export default NavigationBar;
