import "./UrlLink.scss";

function UrlLink(props) {
  const { savedUrl, shortUrl } = props;
  return (
    <div className="links">
      <div className="links__area">
        <p className="links__original">{savedUrl}</p>
        <p className="links__shortened">{shortUrl}</p>
      </div>
      <button
        className="links__button"
        onClick={() => navigator.clipboard.writeText(`${shortUrl}`)}
      >
        Copy URL
      </button>
    </div>
  );
}

export default UrlLink;
