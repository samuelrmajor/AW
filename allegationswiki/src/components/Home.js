import SearchBigForm from "./SearchBigForm";

const Home = () => (
  <div className="home-main">
    <div className="home-header">
      <h1>
        <a
          style={{
            textDecoration: "none",
            color: "black",
            active: "none",
          }}
          href="."
        >
          <span
            style={{ color: "rgba(189, 4, 4, 0.863)" }}
            className="home-allegations-header"
          >
            Allegations
          </span>
          .wiki
        </a>
      </h1>
    </div>
    <div className="home-search-form">
      <SearchBigForm />
    </div>
  </div>
);



export default Home;
