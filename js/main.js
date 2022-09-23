var page = 1;
var perPage = 10;
var movieArr = []; //empty array to store all the movies from the fetch

function loadData(title = null) {
  var element = document.getElementById("pageNum");
  element.classList.add("d-none");
  let url = title
    ? `https://busy-cyan-drill-veil.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}`
    : `https://busy-cyan-drill-veil.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      movieArr = data;
      console.log(movieArr);
    })
    .catch((err) => console.log(err));
}

function createRows() {
  let movieList = `${movieArr.map(
    (movies) =>
      `<tr data-id=${movies._id}>
      <td>${movies.year}</td>
      <td>${movies.title}</td>
      <td>${movies.plot}</td>
      <td>${movies.rated}</td>
      <td>${minutesToTime(movies.runtime)}</td>
    </tr>`
  )}`;

  console.log(movieList);
}
var trElements = function () {};


 function minutesToTime (time) {
  let t = parseInt(time);
  let hours = Math.trunc((t / 60));
  let minutes = t % 60;
  let hm = hours.toString().concat(":", minutes.toString());
  return hm;
};

minutesToTime(136);
