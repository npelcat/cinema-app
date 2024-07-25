import React, { useState } from "react";

const Card = ({ movie }) => {
  const [buttonText, setButtonText] = useState("❤️️");

  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push("Action");
          break;
        case 12:
          genreArray.push("Aventure");
          break;
        case 16:
          genreArray.push("Animation");
          break;
        case 35:
          genreArray.push("Comédie");
          break;
        case 80:
          genreArray.push("Crime");
          break;
        case 99:
          genreArray.push("Documentaire");
          break;
        case 18:
          genreArray.push("Dramatique");
          break;
        case 10751:
          genreArray.push("Famille");
          break;
        case 14:
          genreArray.push("Fantasy");
          break;
        case 36:
          genreArray.push("Histoire");
          break;
        case 27:
          genreArray.push("Horreur");
          break;
        case 10402:
          genreArray.push("Musique");
          break;
        case 9648:
          genreArray.push("Mystère");
          break;
        case 10749:
          genreArray.push("Romance");
          break;
        case 878:
          genreArray.push("Science Fiction");
          break;
        case 10770:
          genreArray.push("Téléfilm");
          break;
        case 53:
          genreArray.push("Thriller");
          break;
        case 10752:
          genreArray.push("Guerre");
          break;
        case 37:
          genreArray.push("Western");
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  const addStorage = () => {
    //Vérifier s'il y a déjà des films stockés ou non
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    //Si l'id du film que l'on essaie de mettre en favoris n'existe pas déjà (s'il n'est pas déjà dans les favoris), alors met-le :
    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      window.localStorage.movies = storedData;
    }
  };

  const deleteStorage = () => {
    //Récupérer la data stockée et la mettre dans un tableau
    let storedData = window.localStorage.movies.split(",");

    //Filtrer pour ne garder que les éléments qui ne sont pas égaux à movie.id (donc l'id cliqué)
    let newData = storedData.filter((id) => id != movie.id);

    //refaire le stockage :
    window.localStorage.movies = newData;
  };

  return (
    <div className="card">
      {/* IMAGE */}
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt={`affiche ${movie.title}`}
      />

      {/* TITRE */}
      <h2>{movie.title}</h2>

      {/* DATE */}
      {movie.release_date ? (
        <h5>Sorti le : {dateFormater(movie.release_date)}</h5>
      ) : null}

      {/* NOTE */}
      <h4>
        {movie.vote_average.toFixed(1)}/10 <span>⭐</span>
      </h4>

      {/* GENRES */}
      <ul>
        {movie.genre_ids
          ? genreFinder()
          : movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
      </ul>

      {/* SYNOPSIS */}
      {movie.overview ? <h3>Synopsis:</h3> : ""}
      <p> {movie.overview}</p>

      {/* BOUTON COUP DE COEUR */}
      {window.localStorage.movies.includes(movie.id) ? (
        <button
          className="btn"
          onClick={() => {
            deleteStorage();
            window.location.reload();
          }}
        >
          <span>🗑️</span>
        </button>
      ) : (
        <button
          className="btn"
          onClick={() => {
            addStorage();
            setButtonText("Ajouté aux favoris ✔️");
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
