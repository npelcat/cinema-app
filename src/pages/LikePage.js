import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";

const LikePage = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    //Boucle for pour incrémenter listData.
    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=aeb2ac11241ab22476b762203695950e`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2 className="favorite-title">
        Coups de coeur <span>💖</span>
        <div className="result">
          {listData.length > 0 ? (
            listData.map((movie) => <Card movie={movie} key={movie.id} />)
          ) : (
            <h3 className="no-favorite">
              Vous n'avez sélectionné aucun coup de coeur pour le moment.
            </h3>
          )}
        </div>
      </h2>
    </div>
  );
};

export default LikePage;
