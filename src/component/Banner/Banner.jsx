import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import { transition } from "../../config/transition";
import Loading from "../Loading/Loading";
import Button from "../ReusableComponent/Buttons/Button";
import { Link, useLocation } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import GetAPI from "../../utils/GetAPI";

const Banner = () => {
  const { data, loading } = GetAPI("latestGames");
  const location = useLocation();
  const presentPath = location?.pathname;

  if (loading) {
    return <Loading />;
  }

  if (!data || data?.length === 0) {
    return (
      <div
        className={`lg:absolute top-0 left-0 right-0 flex flex-col items-center h-screen justify-center text-center bg-[url(/assets/1.jpg)] ${transition} text-stone-100`}
      >
        <p className="lg:text-lg font-semibold">
          Latest games not available!
        </p>
      </div>
    );
  }
  return (
    <div
      className={presentPath === "/" ? "lg:absolute top-0 left-0 right-0" : ""}
    >
      <div
        className={`absolute top-1/2 left-4 md:left-8 lg:left-12 z-10 text-white bg-white/20 backdrop-blur hover:bg-red-600 rounded-full p-2 lg:p-4 text-lg md:text-xl lg:text-2xl cursor-pointer ${transition}`}
        id="prevBtn"
      >
        <FaChevronLeft />
      </div>
      <div
        className={`absolute top-1/2 right-4 md:right-8 lg:right-12 z-10 text-white bg-white/20 backdrop-blur hover:bg-red-600 rounded-full p-2 lg:p-4 text-lg md:text-xl lg:text-2xl cursor-pointer ${transition}`}
        id="nextBtn"
      >
        <FaChevronRight />
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: "#prevBtn",
          nextEl: "#nextBtn",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {data?.map((review) => (
          <SwiperSlide key={review?._id}>
            <div
              style={{ backgroundImage: `url(${review?.coverImg})` }}
              className="hero min-h-80 md:min-h-96 lg:min-h-screen"
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content md:mt-24 text-left px-16 md:px-24 lg:px-32 w-full flex justify-start font-orbitron">
                <div className="max-w-lg">
                  <h1 className="mb-2 md:mb-4 text-xl md:text-2xl lg:text-3xl font-bold">
                    <Typewriter
                      words={[review?.title]}
                      loop={true}
                      cursor
                      cursorStyle="|"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </h1>
                  <h2
                    className={`${transition} bg-green-500 p-1 px-2 md:p-2 text-sm md:px-4 text-white font-semibold w-fit mb-2 md:mb-4`}
                  >
                    {review?.genres}
                  </h2>
                  <p
                    className={`mb-2 md:mb-4 text-sm md:text-base ${transition}`}
                  >
                    Publishing Year:{" "}
                    <span className="font-semibold">
                      {review?.publishingYear}
                    </span>
                  </p>
                  <p
                    className={`mb-2 md:mb-4 text-sm md:text-base ${transition}`}
                  >
                    Reviewer:{" "}
                    <span className="font-semibold">
                      {review?.reviewerName}
                    </span>
                  </p>
                  <Link to={`/review-details/${review?._id}`}>
                    <Button btnText="View Details" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
