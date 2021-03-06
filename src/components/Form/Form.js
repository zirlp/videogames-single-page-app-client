import "./Styles.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { addGame } from "../../Actions/index.js";
import { Link, useNavigate } from "react-router-dom";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Game name is required";
  } else if (gameExists) {
    errors.name = "this game already exists";
  } else if (!input.description) {
    errors.description = "Game description is required";
  } else if (!input.released) {
    errors.released = "A release date is required";
    //prettier-ignore
  } else if (
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)
  ) {
    errors.released = "Date is invalid";
  } else if (!input.rating) {
    errors.rating = "You must rate this game";
  } else if (input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating must be above 0 and under 5";
  } else if (!input.background_image) {
    errors.background_image = "Url is invalid";
    //prettier-ignore
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input.background_image
    )
  ) {
    errors.background_image = "Url is invalid";
  } else if (!input.genres.length) {
    errors.genres = "You must select at least 1 genre";
  } else if (!input.platforms.length) {
    errors.platforms = "You must select at least 1 platform";
  }
  return errors;
}
let gameExists = false;

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const allGames = useSelector((state) => state.allVideoGames);
  const allPlatforms = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    background_image: "",
    platforms: [],
    genres: [],
  });

  const [check, setcheck] = useState();

  useEffect(() => {
    if (check) gameExists = true;
    if (!check) gameExists = false;
    setcheck(allGames.find((game) => game.name === input.name));
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input, allGames, check]);

  //handlers --------------------------------------------------
  //guardo los g??neros en el input
  const handleGenres = (gen) => {
    if (!input.genres.includes(gen.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, gen.target.value],
      });
      setErrors(
        validate({
          ...input,
        })
      );
    }
  };
  //un filtro para eliminar los generos
  const deleteGenre = (gen) => {
    gen.preventDefault();
    setInput({
      ...input,
      genres: input.genres.filter((f) => f !== gen.target.name),
    });
    setErrors(
      validate({
        ...input,
      })
    );
  };
  //lo mismo para platforms
  const handlePlatforms = (plat) => {
    if (!input.platforms.includes(plat.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, plat.target.value],
      });
      setErrors(
        validate({
          ...input,
        })
      );
    }
  };

  const deletePlatform = (plat) => {
    plat.preventDefault();
    setInput({
      ...input,
      platforms: input.platforms.filter((f) => f !== plat.target.name),
    });
    setErrors(
      validate({
        ...input,
      })
    );
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (ok) => {
    ok.preventDefault();

    dispatch(addGame(input));
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      background_image: "",
      platforms: [],
      genres: [],
    });
    alert("Game added to db");
    navigate("/home");
  };

  const submitButton = () => {
    if (
      !errors.name &&
      !errors.description &&
      !errors.released &&
      !errors.rating &&
      !errors.background_image &&
      !errors.platforms &&
      !errors.genres
    )
      return (
        <button onClick={handleSubmit} className="form_button">
          Create
        </button>
      );
    return "";
  };

  return (
    <div>
      <Link to={"/home"}>
        <img
          className="detail_arrow"
          src="https://github.com/zirlp/VideogamesPage/blob/main/PI-Videogames-main/client/src/Images/whiteArrow.png?raw=true"
          alt=""
        ></img>
      </Link>
      <div className="form_container">
        <form className="form">
          <h1 className="form_title"> CREATE NEW GAME </h1>
          <div className="input_container">
            <label className="form_label" htmlFor="name">
              Game name:
            </label>
            <input
              id="name"
              className={"form_input"}
              type="text"
              name="name"
              onChange={handleInputChange}
              value={input.name}
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="input_container">
            <label className="form_label">Description:</label>
            <input
              className={"form_input"}
              type="text"
              name="description"
              onChange={handleInputChange}
              value={input.descripton}
            />
            {errors.description && (
              <p className="danger">{errors.description}</p>
            )}
          </div>
          <div className="input_container">
            <label className="form_label">Release date:</label>
            <input
              className={"form_input"}
              type="text"
              name="released"
              placeholder="yyyy-mm-dd"
              onChange={handleInputChange}
              value={input.released}
            />
            {errors.released && <p className="danger">{errors.released}</p>}
          </div>
          <div className="input_container">
            <label className="form_label">Rating:</label>
            <input
              className={"form_input"}
              type="text"
              name="rating"
              placeholder="from 0 to 5"
              onChange={handleInputChange}
              value={input.rating}
            />
            {errors.rating && <p className="danger">{errors.rating}</p>}
          </div>
          <div className="input_container">
            <label className="form_label">Image Url:</label>
            <input
              className={"form_input"}
              type="text"
              name="background_image"
              placeholder="url"
              onChange={handleInputChange}
              value={input.background_image}
            />
            {errors.background_image && (
              <p className="danger">{errors.background_image}</p>
            )}
          </div>
          <div className="select_container">
            <label className="select_label">Select genre:</label>
            <select onChange={handleGenres} className="select_form">
              <option value="" disabled selected hidden>
                Genres
              </option>
              {genres.map((genres) => (
                <option value={genres.name} key={genres.name}>
                  {genres.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select_button_container" name={"genres"}>
            {input.genres.map((genre) => (
              <button
                onClick={deleteGenre}
                name={genre}
                key={genre}
                className="select_button"
              >
                {genre}
              </button>
            ))}
            {errors.genres && <p className="danger">{errors.genres}</p>}
          </div>
          <div className="select_container">
            <label className="select_label">Select platform:</label>

            <select onChange={handlePlatforms} className="select_form">
              <option value="" disabled selected hidden>
                Platforms
              </option>
              {allPlatforms.map((platform) => (
                <option value={platform.name} key={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select_button_container" name={"platforms"}>
            {input.platforms.map((platform) => (
              <button
                onClick={deletePlatform}
                name={platform}
                key={platform}
                className="select_button"
              >
                {platform}
              </button>
            ))}
            {errors.platforms && <p className="danger">{errors.platforms}</p>}
          </div>
          <div>{submitButton()}</div>
        </form>
        {/* {console.log(errors)} */}
      </div>
    </div>
  );
};

export default Form;
