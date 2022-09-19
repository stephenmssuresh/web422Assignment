var page = 1;
var perPage = 10;
var movieArr = []; //empty array to store all the movies from the fetch

var loadMovieData = function (title = null) {
  var element = document.getElementById("pageNum");
  element.classList.add("d-none");
  // https://stackoverflow.com/questions/44217376/fetch-api-not-working-with-localhost-127-0-0-1
  // https://github.github.io/fetch/
  // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
  if (!title) {
    // fetch query params
    // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
    fetch(
      "https://busy-cyan-drill-veil.cyclic.app/api/movies?" +
        new URLSearchParams({
          'page': page,
          'perPage': perPage
        })
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        movieArr = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else{
    fetch(
      "https://busy-cyan-drill-veil.cyclic.app/api/movies?" +
        new URLSearchParams({
          'page': page,
          'perPage': perPage,
          'title': title
        })
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        movieArr = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

var trElements = function() {
  
}