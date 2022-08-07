import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import img1 from './slider1.png';

export const SliderLogin = () => {
  return (
    <>
    <div className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right">
      <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
      <Carousel>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src={img1}
              height="50%"
              width="100%"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src={img1}
              height="50%"
              width="100%"
              alt=""
            />
          </Carousel.Item>
      </Carousel>
    </div>
    </div>
    </>

  )
}
