import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MusicGenreArr } from "./utils/MusicGenreArr";

export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  render() {
    var settings = {
      dots: false,
      infinite: true,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="slider-wrapper flex-grow md:w-[1278px] ">
        <Slider
          ref={(slider) => (this.slider = slider)}
          {...settings}
          className="custom-slick"
        >
          {MusicGenreArr.map((genre) => (
            <div key={genre.id} className="flex flex-col items-center ">
              <div className="relative h-screen">
                {genre.component ? (
                  genre.component
                ) : (
                  <img
                    className="each-image object-cover w-full h-full"
                    src={genre.img}
                    alt={genre.title}
                    fill
                    quality={100}
                  />
                )}
              </div>
              {/* <p className="text-center font-bold vibe mx-auto text-2xl tracking-wide">
                {genre.title}
              </p> */}
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
