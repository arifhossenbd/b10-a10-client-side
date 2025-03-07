import BackToHomeButton from "../ReusableComponent/Buttons/BackToHomeButton";

const NotFound = ({ text }) => {
  return (
    <div className="flex flex-col gap-2 items-center h-screen justify-center font-orbitron">
      <span className="md:font-semibold text-gray-600">{text}</span>
      <BackToHomeButton />
    </div>
  );
};

export default NotFound;
