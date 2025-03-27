import { LuZoomOut } from "react-icons/lu";
import { useSwiper } from "swiper/react";

const ZoomOutButton = () => {
  const swiper = useSwiper();

  return (
    <button className="text-blue-400  text-2xl hover:text-blue-700" onClick={() => swiper.zoom.out()}>
      <LuZoomOut />
    </button>
  );
};

export default ZoomOutButton;
