import "../styles/vertical_slider.scss"

const VerticalLoopSlider = () => {
  const column1Images = [
    "./loop_img1.png",
    "./loop_img2.png",
    "./loop_img3.png",
    "./loop_img4.png"
  ];

  const column2Images = [
    "./loop_img5.png",
    "./loop_img6.png",
    "./loop_img7.png",
    "./loop_img8.png"
  ];

  return (
    <div className="container">
      {/* Column 1 - Moving Top to Bottom */}
      <div className="column">
        <div className="scroll-down">
          {[...column1Images, ...column1Images].map((src, index) => (
            <div key={`col1-${index}`} className="image-wrapper">
              <img src={src} alt={`Column 1 image ${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Column 2 - Moving Bottom to Top */}
      <div className="column">
        <div className="scroll-up">
          {[...column2Images, ...column2Images].map((src, index) => (
            <div key={`col2-${index}`} className="image-wrapper">
              <img src={src} alt={`Column 2 image ${index}`} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default VerticalLoopSlider;
