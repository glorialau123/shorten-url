import "./UrlLink.scss";

function UrlLink(props) {
  const { savedUrlInSessionStorage, shortUrlInSessionStorage } = props;
  return (
    <div className="links">
      <div className="links__area">
        <p className="links__original">{savedUrlInSessionStorage}</p>
        <p className="links__shortened">{shortUrlInSessionStorage}</p>
      </div>
      <button
        className="links__button"
        onClick={() => navigator.clipboard.writeText(`${shortUrlInSessionStorage}`)}
      >
        Copy URL
      </button>
    </div>
  );
}

export default UrlLink;
