// some-inner-component.jsx
import { useSwiper } from "swiper/react";
import { Button } from "../../button/button";

export default function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <a
      type="button"
      onClick={() => swiper.slidePrev()}
      className="!absolute left-4 top-1/2 translate-y-[-50%] btn btn-circle z-50
      "
    >
      ❮
    </a>
  );
}
