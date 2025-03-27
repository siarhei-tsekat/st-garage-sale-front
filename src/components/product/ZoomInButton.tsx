import { LuZoomIn } from "react-icons/lu";
import { useSwiper } from "swiper/react";

const ZoomInButton = () => {
  const swiper = useSwiper();

  return (
    <button className="text-blue-400  text-2xl hover:text-blue-700" onClick={() => swiper.zoom.in()}>
      <LuZoomIn />
    </button>
  );
};

export default ZoomInButton;
