import "./HomePage.scss";
import whale from "../assets/images/whale_1280edited.png";
import Input from "../components/Input/Input";

function HomePage() {
  return (
    <div className="home">
      <div className="home__wrapper">
        <section className="home__hero">
          <h1 className="home__heading">WHALE TAILS</h1>
          <h2 className="home__subheading">Shorten your URL</h2>
          <img src={whale} alt="banner of a whale" className="home__banner" />
        </section>
        <Input />
      </div>

      <footer className="home__footer">© Gloria Lau 2024</footer>
    </div>
  );
}

export default HomePage;
