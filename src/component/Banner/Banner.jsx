import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import { transition } from "../../config/transition";

const Banner = () => {
  return (
    <div className="lg:absolute left-0 right-0 top-0">
      <div className="relative">
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
          <SwiperSlide>
            <div
              className="hero min-h-80 md:min-h-96 lg:min-h-screen bg-[url(/assets/1.jpg)]"
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content md:mt-24 text-left px-16 md:px-24 lg:px-32 w-full flex justify-start">
                <div className="max-w-lg">
                  <h1 className="mb-2 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">Hello there</h1>
                  <p className={`mb-2 md:mb-4 text-sm md:text-base hover:text-red-600 ${transition}`}>
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero min-h-80 md:min-h-96 lg:min-h-screen bg-[url(/assets/2.jpg)]"
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content md:mt-24 text-left px-16 md:px-24 lg:px-32 w-full flex justify-start">
                <div className="max-w-md">
                  <h1 className="mb-2 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">Hello there</h1>
                  <p className="mb-2 md:mb-4 text-sm md:text-base">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
