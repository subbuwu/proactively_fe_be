import "../styles/how_it_works.scss"

type Props = {
    title : string;
    desc : string;
    imgSrc : string
    imgTextNumber : string
    imgTextUnit : string
    iconSrc : string
}

const HowItWorksCard = ({ title,desc,imgSrc,imgTextNumber,imgTextUnit,iconSrc }: Props) => {
  return (
    <div className="card_container">
          <div className="card">
            <div className="card_img_wrapper">
              <img src={imgSrc}/>
              <div className="card_badge">
                <img src={iconSrc}/>
                <p>
                    <span className="img_text_number">{imgTextNumber}</span>
                    <span className="img_text_unit">{imgTextUnit}</span>
                </p>
              </div>
            </div>
            <div className="card_content">
                <p>{title}</p>
                <p>{desc}</p>
            </div>
          </div>
        </div>
  )
}

export default HowItWorksCard