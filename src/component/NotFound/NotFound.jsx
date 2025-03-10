import { transition } from "../../config/transition";
import BackToButton from "../ReusableComponent/Buttons/BackToButton";

const NotFound = ({ message, text, path }) => {
  return (
    <div className={`lg:absolute top-0 left-0 right-0 flex flex-col items-center h-screen justify-center text-center  bg-[url(/assets/1.jpg)] ${transition} text-stone-100`}>
      <span className="md:font-semibold">{message}</span>
      <BackToButton text={text} path={path} />
    </div>
  );
};

export default NotFound;
