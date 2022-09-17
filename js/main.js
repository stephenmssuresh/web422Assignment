var page = 1;
var perPage = 10;

var loadMovieData = function (title = null) {
  //   var element = document.getElementById("pageNum");
  //   element.classList.add("d-none");
  // https://stackoverflow.com/questions/44217376/fetch-api-not-working-with-localhost-127-0-0-1
  // https://github.github.io/fetch/
  // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
  fetch(`http://localhost:8080/api/movies?page=1&perPage=10`)
    .then((response) => {
      console.log(response.json());
      return response.json();
    })
    .then((json) => {
      console.log(json); // here is the parsed JSON response
    });
};

loadMovieData();

fetch('https://busy-cyan-drill-veil.cyclic.app/api/movies?page=1&perPage=10')
.then(function(response) {
  console.log(response.json());
});