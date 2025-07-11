
import NavigationBar from '../../organism/navigationBar';
import ChatBox from '../../templates/chatBox';
import ConnectPage from './connectPage';
import EditProfile from './editProfile';

const Home = () => {

    return (
        <div className="flex h-screen bg-[#F9F9F9]">
            <ConnectPage/>
        </div>
    )
}

export default Home;