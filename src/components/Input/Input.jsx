import "./Input.scss";

function Input() {
  return (
    <div className="input">
      <form className="input__form">
        <div className="input__area">
          <input
            type="text"
            className="input__text"
            placeholder="Enter a link to shorten..."
          />
          <button className="input__button">Shorten Link</button>
        </div>
      </form>
    </div>
  );
}

export default Input;
