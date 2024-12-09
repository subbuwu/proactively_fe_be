import { useState, useRef } from "react";
import { HowItWorksCard } from "./HowItWorksCard";
import "../styles/how_it_works.scss"

export const HowItWorks = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const sliderRef = useRef<any>(null);

  const handleTabClick = (tabIdx : number) => {
    setSelectedTab(tabIdx);
    scrollToCard(tabIdx - 1);
  };

  const scrollToCard = (index : number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].offsetWidth;
      const scrollPosition = index * (cardWidth + 24); // 24px is the gap
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleArrowClick = (direction : string) => {
    const newTab = direction === 'left' 
      ? Math.max(1, selectedTab - 1)
      : Math.min(6, selectedTab + 1);
    setSelectedTab(newTab);
    scrollToCard(newTab - 1);
  };

  return (
    <section className="how-it-works">
      <p className="subtitle">how it works</p>

      <div className="header">
        <div className="gradient-blur"></div>
        <h2>
          <span>Lifestyle as medicine:</span> <p>The six pillars</p>
        </h2>

        <div className="navigation">
          <button 
            className="arrow-btn" 
            onClick={() => handleArrowClick('left')}
            disabled={selectedTab === 1}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button 
            className="arrow-btn"
            onClick={() => handleArrowClick('right')}
            disabled={selectedTab === 6}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="tabs">
        {[
          "Nutrition",
          "Physical Activity",
          "Restorative sleep",
          "Stress management",
          "Social connection",
          "Substance abuse"
        ].map((tab, idx) => (
          <button
            key={idx}
            className={`tab ${selectedTab === idx + 1 ? 'active' : ''}`}
            onClick={() => handleTabClick(idx + 1)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="slider-wrapper">
        <div className="slider" ref={sliderRef}>
        <HowItWorksCard title="Nutrition" desc="Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic illness." imgSrc="./card_img11.png" iconSrc="./health_heart.svg" imgTextNumber="121/80" imgTextUnit="mmHg" />
          <HowItWorksCard title="Physical activity" desc="Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease." imgSrc="./card_img22.png" iconSrc="./heart1.svg" imgTextNumber="32" imgTextUnit="minutes" />
          <HowItWorksCard title="Restorative sleep" desc="Consistent, quality sleep is essential for cognitive function and physical health." imgSrc="./card_img33.png" iconSrc="./sleep.svg" imgTextNumber="8" imgTextUnit="hours" />
          <HowItWorksCard title="Stress management" desc="Effective stress management techniques are crucial for mental well-being and overall health.." imgSrc="./card_img44.png" iconSrc="./heart1.svg" imgTextNumber="60" imgTextUnit="bpm" />
          <HowItWorksCard title="Social connection" desc="Strong social connections are associated with a lower risk of many chronic diseases and enhanced mental health." imgSrc="./card_img55.png" iconSrc="./heart2.svg" imgTextNumber="Feeling" imgTextUnit="better" />
          <HowItWorksCard title="Substance abuse" desc="Avoiding tobacco, limiting alcohol use, and abstaining from harmful substances are vital for long-term health." imgSrc="./card_img66.png" iconSrc="./clock.svg" imgTextNumber="62" imgTextUnit="days" />

        </div>
      </div>
    </section>
  );
};
