const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[url(/assets/1.jpg)] absolute top-0 left-0 right-0 bottom-0 text-red-50 z-1 h-screen">
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="md:h-12 md:w-12 h-10 w-10" alt="Logo" />
        <p className="text-2xl md:text-3xl font-bold md:font-extrabold font-orbitron">
          Chill Gamer
        </p>
      </div>
      <span className="loading loading-dots w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"></span>
    </div>
  );
};

export default Loading;
