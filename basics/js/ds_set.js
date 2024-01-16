const nums = [1, 3, 2, 3, 2, 4, 6, 5, 1, 6, 2, 1, 1];

// Create a Set to hold unique values
const uniqueNums = new Set(nums);

console.log(uniqueNums); // Set(6) { 1, 3, 2, 4, 6, 5 }

function membershipCheck() {
  const members = new Set();

  const user1 = { name: "Alice" };
  const user2 = { name: "Alice" }; // Same properties, different identity

  members.add(user1);

  console.log(members.has(user1)); // true (same object)
  console.log(members.has(user2)); // false (different identity)
  console.log(members.has({ name: "Alice" })); // false (different object)
}

// Array of movie titles
const movies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
];

// set to track watched movies
const watchedMovies = new Set();

function pickARandomMovie() {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const movie = movies[randomIndex];
  return movie;
}

function pickUnwathedMovie() {
  while (true) {
    const movie = pickARandomMovie();
    if (!watchedMovies.has(movie)) {
      return movie;
    }
  }
}

function watch(movie) {
  console.log(`Watching ${movie}`);
  watchedMovies.add(movie);
}

function watchAllMovies() {
  console.log("Watch all movies in random order...");

  while (watchedMovies.size < movies.length) {
    const movie = pickUnwathedMovie();
    watch(movie);
  }
}

membershipCheck();
// watchAllMovies();
