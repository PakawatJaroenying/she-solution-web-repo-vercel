// some-inner-component.jsx
import { useSwiper } from "swiper/react";
import { Button } from "../../button/button";

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <a
      type="button"
      onClick={() => swiper.slideNext()}
      className="!absolute right-4 top-1/2 translate-y-[-50%] btn btn-circle
      "
    >
      ❯
    </a>
  );
}
