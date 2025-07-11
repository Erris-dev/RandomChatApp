import HeroImage from '../../../assets/hero-image.jpg';

const ConnectPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className='rounded-2xl h-70 w-120 overflow-hidden'>
                <img src={HeroImage} alt="Hero Image" className="w-full h-full object-cover" />
            </div>
            <h1 className='text-3xl font-bold mt-2'> Strangers Today. Friends Tomorrow</h1>
            <p className='text-2xl font-medium'>Start chatting with people worldwide — your next friend is one message away.</p>
            <button className="bg-[#4D77AD] cursor-pointer text-white font-semibold mt-5 rounded-[5px] p-1 w-35 transition duration-200 transform hover:scale-105">Connect!</button>

        </div>
    );
}

export default ConnectPage