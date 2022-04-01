import {
  GET_GAME_DETAIL,
  GET_ALL,
  GET_GENRES,
  GAME_QUERY,
  CLEAN_QUERY,
  FILTER_QUERY,
  REMOVE_FILTERS,
  DELETE_GAME,
  ORDER,
  GET_PLATFORMS,
  RESET,
  BASE_URL,
} from "./Constants";
import axios from "axios";

export function getGames() {
  return async function (dispatch) {
    let request = await axios.get(`${BASE_URL}/videogames`);
    // const allGames = request.data;
    try {
      return dispatch({ type: GET_ALL, payload: request.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    let requestGenres = await axios.get(`${BASE_URL}/genres`);
    // const allGenres = requestGenres.data;
    try {
      return dispatch({ type: GET_GENRES, payload: requestGenres.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function addGame(payload) {
  return async (dispatch) => {
    try {
      const post = await axios.post(`${BASE_URL}/videogames/add`, payload);
      return post;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getGameDetail(id) {
  return async (dispatch) => {
    try {
      const requestDetail = await axios.get(`${BASE_URL}/videogames${id}`);
      return dispatch({ type: GET_GAME_DETAIL, payload: requestDetail.data });
    } catch (error) {
      window.location.replace("/nope");
    }
  };
}

export function orderBy(payload) {
  return (dispatch) => {
    return dispatch({
      type: ORDER,
      payload: payload,
    });
  };
}

export function gameQuery(payload) {
  return (dispatch) => {
    return dispatch({
      type: GAME_QUERY,
      payload: payload,
    });
  };
}

export function filterQuery(payload) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_QUERY,
      payload: payload,
    });
  };
}

export function cleanQuery() {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_QUERY,
      payload: [],
    });
  };
}

export function removeFilters() {
  return (dispatch) => {
    return dispatch({
      type: REMOVE_FILTERS,
      payload: [],
    });
  };
}

export function deleteGame(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/videogames${id}`);
      return dispatch({ type: DELETE_GAME });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getPlatforms() {
  return async (dispatch) => {
    try {
      const platforms = await axios.get(`${BASE_URL}/platforms`);
      return dispatch({ type: GET_PLATFORMS, payload: platforms.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function resetState() {
  return (dispatch) => {
    return dispatch({
      type: RESET,
      payload: {
        allVideoGames: [],
        genres: [],
        gameDetail: {},
        order: [],
        gameQuery: [],
        filterQuery: [],
      },
    });
  };
}
