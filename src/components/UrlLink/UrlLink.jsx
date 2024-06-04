import "./UrlLink.scss";

function UrlLink(props) {
  const { savedUrlInSessionStorage, shortUrlInSessionStorage, copiedStatus, onCopy } =
    props;
  const isLoading = !savedUrlInSessionStorage || !shortUrlInSessionStorage;

  return (
    <div className="links">
      <div className="links__area">
        {isLoading ? (
          <p className="links__loading">Loading</p>
        ) : (
          <>
            <p className="links__original">{savedUrlInSessionStorage}</p>
            <p className="links__shortened">{shortUrlInSessionStorage}</p>
          </>
        )}
      </div>
      <button
        className={`links__button ${copiedStatus ? "links__button--clicked" : ""}`}
        onClick={onCopy}
      >
        {copiedStatus ? "Copied" : "Copy URL"}
      </button>
    </div>
  );
}

export default UrlLink;
