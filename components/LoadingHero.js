import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
const LoadingHero = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingIcon className="animate-spin text-3xl" />
    </div>
  );
};

export default LoadingHero;
