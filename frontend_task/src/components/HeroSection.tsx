import "../styles/hero.scss";
import HorizontalLoopSlider from "./HorizontalLoopSlider";
import SearchBox from "./SearchBox";
import VerticalLoopSlider from "./VerticalLoopSlider";

const HeroSection = () => {
  return (
    <section className="hero_section_wrapper" style={{position : 'relative'}}>
      <HorizontalLoopSlider/> 
      <div className="search_box_container">
        <SearchBox/>
      </div>

      <div className="hero_container">
        <div className="hero_blurred_div"></div>
        <div className="slider_container">
          <VerticalLoopSlider />
        </div>

        <div className="hero_header_container">
          <div className="text_wrapper">
            <h1>
              Book an appointment with <br className="break_tag"/>
              <span>lifestyle medicine</span> experts
            </h1>

            <p>Optimize your lifestyle and reverse chronic diseases.</p>
          </div>
        </div>
      </div>
      <div className="hero_gradient_divider"></div>
    </section>
  );
};

export default HeroSection;
