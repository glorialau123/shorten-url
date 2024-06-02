import "./UrlLink.scss";
import { useEffect, useState } from "react";

function UrlLink(props) {
  const { savedUrlInSessionStorage, shortUrlInSessionStorage, copiedStatus, onCopy } =
    props;
  // const [buttonColor, setButtonColor] = useState("");
  // const [buttonText, setButtonText] = useState("Copy URL");

  // function handleClick() {
  //   navigator.clipboard.writeText(`${shortUrlInSessionStorage}`);
  //   setButtonText("Copied");
  //   setButtonColor("links__button--clicked");
  // }

  // useEffect(() => {
  //   setButtonText("Copy URL");
  //   setButtonColor("");
  // }, [shortUrlInSessionStorage]);

  return (
    <div className="links">
      <div className="links__area">
        <p className="links__original">{savedUrlInSessionStorage}</p>
        <p className="links__shortened">{shortUrlInSessionStorage}</p>
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
