import Image from "next/image";

const HeroSection = () => {
    return (
        <div
            className="flex items-center  bg-cover  w-full h-screen bg-center bg-no-repeat bg-local 
      text-white   pl-4 capitalize font-bold "
            style={{ backgroundImage: 'url("/images/background.png")' }}
        >
            <p className="max-w-lg   sm:max-w-xl lg:max-w-2xl pl-2 phone:pl-12 text-3xl phone:text-4xl sm:text-5xl lg:text-6xl ">
                Intuitive Blockchain powered Document management system
            </p>
        </div>
    );
};

export default HeroSection;
