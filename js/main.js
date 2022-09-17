var page = 1;
var perPage = 10;

var loadMovieData = function (title = null) {
  var element = document.getElementById("pageNum");
  element.classList.add("d-none");

  // https://stackoverflow.com/questions/44217376/fetch-api-not-working-with-localhost-127-0-0-1
  // https://github.github.io/fetch/
  let fetchString = "";
  if (!title) {
    fetchString = concat("/api/movies?page=", page, "&perPage=", perPage);
  } else {
    fetchString = concat(
      "/api/movies?page=",
      page,
      "&perPage=",
      perPage,
      "&title=",
      title
    );
  }

  var myRequest = new Request(fetchString, {
    method: "GET"
  });

  fetch(myRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json); // here is the parsed JSON response
    });
};

loadMovieData("The Avengers");