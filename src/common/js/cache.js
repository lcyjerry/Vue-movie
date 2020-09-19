import storage from "good-storage";

const FAVORITE_KEY = "__MOVIE__";
const FAVORITE_MAX_LENGTH = 200;

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

export function saveFavorite(movie) {
  let movies = storage.get(FAVORITE_KEY, []);
  insertArray(
    movies,
    movie,
    (item) => {
      return movie.sid === item.sid;
    },
    FAVORITE_MAX_LENGTH
  );
  storage.set(FAVORITE_KEY, movies);
}

export function deleteFavorite(movie) {
  let movies = storage.get(FAVORITE_KEY, []);

  const index = movies.findIndex((item) => {
    return item.sid === movie.sid;
  });

  movies.splice(index, 1);
  storage.set(FAVORITE_KEY, movies);
}

export function isFavorite(movie) {
  let movies = storage.get(FAVORITE_KEY, []);

  const index = movies.findIndex((item) => {
    return item.sid === movie.sid;
  });

  return index > -1;
}
