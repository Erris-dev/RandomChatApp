
import NavigationBar from '../../organism/navigationBar';
import ChatBox from '../../templates/chatBox';
import ConnectPage from './connectPage';

const Home = () => {

    return (
        <div className="flex h-screen bg-[#F9F9F9]">
            <NavigationBar/>
            <ChatBox/>

        </div>
    )
}

export default Home;