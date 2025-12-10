 import { useState, useEffect} from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../Components/Loading.json";



const Profile = () => {

  const[isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    }, 3000);

    return ()=>clearTimeout(timer);
  }, []);

  if(isLoading){
    return(
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <div className="w-64 h-64">
                    <Lottie animationData={LoadingAnimation} loop={true} />
                </div>
                <p className="text-gray-500 font-medium mt-4 animate-pulse">Loading...</p>
            </div>
    );
  }


  return (
    <div>Profile</div>
  )
}

export default Profile