import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const FormSearch = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodToBad, setSortGoodToBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=aeb2ac11241ab22476b762203695950e&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="A vous de jouer"
            id="search-input"
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          ></input>
          <input
            type="submit"
            value="Rechercher"
            onClick={(e) => {
              e.preventDefault();
            }}
          ></input>
        </form>
        <div className="btn-sort-container">
          <button
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodToBad("goodToBad")}
          >
            Top<span>➺</span>
          </button>
          <button
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodToBad("badToGood")}
          >
            Flop<span>➺</span>
          </button>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodToBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodToBad === "badToGood") {
              return a.vote_average - b.vote_average;
            } else {
              return 0;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default FormSearch;
