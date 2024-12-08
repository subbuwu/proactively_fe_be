import "../styles/how_it_works.scss"

export const HowItWorksCard = ({ 
  title, 
  desc, 
  imgSrc, 
  imgTextNumber, 
  imgTextUnit, 
  iconSrc 
} : { title : string, 
  desc : string, 
  imgSrc: string, 
  imgTextNumber: string, 
  imgTextUnit: string, 
  iconSrc: string  } ) => (
  <div className="card">
    <div className="card-image">
      <img src={imgSrc} alt={title} />
      <div className="badge">
        <img src={iconSrc} alt="" />
        <p>
          <span className="number">{imgTextNumber}</span>
          <span className="unit">{imgTextUnit}</span>
        </p>
      </div>
    </div>
    <div className="content">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

export default HowItWorksCard;