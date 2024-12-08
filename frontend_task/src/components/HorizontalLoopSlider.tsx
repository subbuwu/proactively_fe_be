import '../styles/horizontal_slider.scss';

const HorizontalLoopSlider = () => {
  const images = [
    "./loop_img1.png",
    "./loop_img2.png",
    "./loop_img3.png",
    "./loop_img4.png",
    "./loop_img5.png",
    "./loop_img6.png",
    "./loop_img7.png",
    "./loop_img8.png"
  ];

  return (
    <div className="hori_container">
      <div className="scroll">
        {[...images, ...images].map((src, index) => (
          <div key={index} className="hori_image-wrapper">
            <img src={src} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalLoopSlider;