import { useEffect, useState } from "react";
import "./Input.scss";
import axios from "axios";
import UrlLink from "../UrlLink/UrlLink";

const { REACT_APP_BACKEND_URL } = process.env;

function Input() {
  const [newUrl, setNewUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState("");
  const [invalidUrl, setInvalidUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlArray, setUrlArray] = useState([]);

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
      console.log("true");
      return true;
    } catch (err) {
      console.log("false");
      setInvalidUrl("input__text--invalid");
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newUrl) {
      const urlWithScheme = addSchemeIfMissing(newUrl);
      console.log(urlWithScheme);
      if (isValidUrl(urlWithScheme)) {
        setInvalidUrl("");
        setSavedUrl(newUrl);
        setNewUrl("");

        const postUrl = async function () {
          try {
            const response = await axios.post(`${REACT_APP_BACKEND_URL}/shortenurl`, {
              url: urlWithScheme,
            });
            const newShortUrl = response.data.result_url;

            //store shortUrl in session storage; when a get new shortUrl, session storage stores it again. For every new shortUrl generated, the stored key/value is retrieved, a new UrlLink component is created.
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
      {/* {shortUrl && <UrlLink shortUrl={shortUrl} savedUrl={savedUrl} />} */}
      <div className="input__list">
        {urlArray.length > 0 &&
          urlArray
            .reverse()
            .map((url, index) => (
              <UrlLink
                key={index}
                shortUrlInSessionStorage={url.short}
                savedUrlInSessionStorage={url.original}
              />
            ))}
      </div>
    </div>
  );
}

export default Input;
