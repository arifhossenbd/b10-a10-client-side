import BackToButton from "../ReusableComponent/Buttons/BackToButton";

const NotFound = ({ message, text, path }) => {
  return (
    <div className="flex flex-col gap-2 items-center h-screen bg-[url(/assets/1.jpg)] justify-center font-orbitron absolute top-0 left-0 right-0">
      <span className="md:font-semibold text-gray-600">{message}</span>
      <BackToButton text={text} path={path} />
    </div>
  );
};

export default NotFound;
