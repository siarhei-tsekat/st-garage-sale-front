import { Autoplay, EffectFade, Mousewheel, Navigation, Pagination, Zoom } from "swiper/modules";
import ZoomInButton from "./ZoomInButton";
import ZoomOutButton from "./ZoomOutButton";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageList {
  images: string[];
}

const ProductImageSwiper = (params: ImageList) => {
  return (
    <div className="py-2 rounded-md">
      <Swiper zoom={true} mousewheel={true} grabCursor={true} navigation modules={[Pagination, EffectFade, Navigation, Autoplay, Zoom, Mousewheel]} pagination={{ clickable: true }} scrollbar={{ draggable: true }} slidesPerView={1}>
        {params.images.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="w-full overflow-hidden aspect-[3/2]">
              <div className="swiper-zoom-container">
                <img id={item} className="w-full h-full" src={item}></img>
              </div>
              <div className="absolute bottom-4 right-4 flex space-x-2 bg-white bg-opacity-70 p-2 rounded-lg shadow-md">
                <ZoomInButton />
                <ZoomOutButton />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSwiper;
