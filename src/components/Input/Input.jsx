import { useEffect, useState } from "react";
import "./Input.scss";
import axios from "axios";
import UrlLink from "../UrlLink/UrlLink";

const { REACT_APP_API_TOKEN } = process.env;

function Input() {
  const [newUrl, setNewUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState("");
  const [invalidUrl, setInvalidUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlArray, setUrlArray] = useState([]);
  const [copiedStatus, setCopiedStatus] = useState({});

  useEffect(() => {
    const storedUrls = JSON.parse(sessionStorage.getItem("shortUrls")) || [];
    setUrlArray(storedUrls);
  }, []);

  function addSchemeIfMissing(urlString) {
    if (!/^https?:\/\//i.test(urlString)) {
      return `https://${urlString}`;
    }
    return urlString;
  }

  function isValidUrl(urlString) {
    try {
      new URL(urlString);
      setInvalidUrl("");

      return true;
    } catch (err) {
      setInvalidUrl("input__text--invalid");
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newUrl) {
      const urlWithScheme = addSchemeIfMissing(newUrl);
      if (isValidUrl(urlWithScheme)) {
        setInvalidUrl("");
        setSavedUrl(newUrl);
        setNewUrl("");

        const postUrl = async function () {
          try {
            const response = await axios.post(
              `https://api.tinyurl.com/create?api_token=${REACT_APP_API_TOKEN}`,
              {
                url: urlWithScheme,
              }
            );

            const newShortUrl = `${response.data.data.domain}/${response.data.data.alias}`;

            //update the urlArray state and session storage sychronously
            setUrlArray((prevUrlArray) => {
              const updatedUrlArray = [
                ...prevUrlArray,
                { original: urlWithScheme, short: newShortUrl },
              ];
              sessionStorage.setItem("shortUrls", JSON.stringify(updatedUrlArray));
              return updatedUrlArray;
            });
            setShortUrl(newShortUrl);
          } catch (error) {
            console.error("error posting URL");
          }
        };

        postUrl();
      }
    } else {
      setInvalidUrl("input__text--invalid");
      console.log("empty");
    }
  }

  function handleCopy(shortUrl) {
    setCopiedStatus((prevStatus) => ({ ...prevStatus, [shortUrl]: true }));
    navigator.clipboard.writeText(shortUrl);
  }

  return (
    <div className="input">
      <form className="input__form" onSubmit={handleSubmit}>
        <div className="input__area">
          <input
            type="text"
            className={`input__text ${invalidUrl}`}
            placeholder="Enter a link to shorten..."
            value={newUrl}
            onChange={(event) => {
              setNewUrl(event.target.value);
              if (event.target.value) {
                setInvalidUrl("");
              }
            }}
          />
          {invalidUrl && <p className="input__error">Please enter a valid URL</p>}
          <button className="input__button">Shorten Link</button>
        </div>
      </form>
      <div className="input__list">
        {urlArray.length > 0 &&
          urlArray
            .slice()
            .reverse()
            .map((url, index) => (
              <UrlLink
                key={`${url.short}-${index}`}
                shortUrlInSessionStorage={url.short}
                savedUrlInSessionStorage={url.original}
                copiedStatus={copiedStatus[url.short] || false}
                onCopy={() => handleCopy(url.short)}
              />
            ))}
      </div>
    </div>
  );
}

export default Input;
