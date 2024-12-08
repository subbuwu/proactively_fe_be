"use client"
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import "../styles/how_it_works.scss";
import HowItWorksCard from "./HowItWorksCard";
import { Navigation, Pagination } from 'swiper/modules';

const HowItWorks = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabClick = (tabIdx: number) => {
    setSelectedTab(tabIdx);
  };

  const handleSlideChange = (swiper: any) => {
    setSelectedTab(swiper.activeIndex + 1);
  };

  const tabs = [
    "Nutrition",
    "Physical Activity",
    "Restorative sleep",
    "Stress management",
    "Social connection",
    "Substance abuse",
  ];

  const cards = [
    {
      title: "Nutrition",
      desc: "Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic illness.",
      imgSrc: "./card_img11.png",
      iconSrc: "./health_heart.svg",
      imgTextNumber: "121/80",
      imgTextUnit: "mmHg",
    },
    {
      title: "Physical activity",
      desc: "Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease.",
      imgSrc: "./card_img22.png",
      iconSrc: "./heart1.svg",
      imgTextNumber: "32",
      imgTextUnit: "minutes",
    },
    // Add remaining card details here...
  ];

  return (
    <section className="how_it_works_container">
      <p>how it works</p>

      <div className="how_it_works_header">
        <div className="how_it_works_gradient_blur"></div>
        <h2>
          <span>Lifestyle as medicine:</span> The six pillars
        </h2>

        <div className="slider_navigation_container">
          <div className="arrow left_arrow swiper-button-prev">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="arrow right_arrow swiper-button-next">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <div className="how_it_works_tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            id={`tab_${index + 1}`}
            className={`${selectedTab === index + 1 && "active_tab"}`}
            onClick={() => handleTabClick(index + 1)}
          >
            {tab}
          </div>
        ))}
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={handleSlideChange}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        className="card_slider"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <HowItWorksCard {...card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HowItWorks;
