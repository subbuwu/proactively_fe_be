import "../styles/search_box.scss";

const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="search-input">
        <span className="icon">
          <i className="fa fa-search"></i>
        </span>
        <input type="text" placeholder="Condition, procedure, speciality..." />
      </div>
      <div className="search-input">
        <span className="icon">
          <i className="fa fa-map-marker-alt"></i>
        </span>
        <input type="text" placeholder="City, state, or zipcode" />
      </div>
      <div className="search-input">
        <span className="icon">
          <i className="fa fa-id-card"></i>
        </span>
        <input type="text" placeholder="Insurance carrier" />
      </div>
      <button className="search-button">
        <i className="fa fa-search"></i> Find now
      </button>
    </div>
  );
};

export default SearchBox;
