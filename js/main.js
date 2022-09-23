var page = 1;
var perPage = 10;
var movieArr = []; //empty array to store all the movies from the fetch

function loadData(title = null) {
  var paginationBar = document.querySelector("#paginationNav");
  var pageNumber = document.querySelector("#pageNum a");
  if (title) {
    paginationBar.classList.add("d-none");
  } else {
    pageNumber.innerHTML = page;
  }
  let url = title
    ? `https://busy-cyan-drill-veil.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}`
    : `https://busy-cyan-drill-veil.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      movieArr = data;
      // console.log(movieArr);

      let movieList = `${movieArr
        .map(
          (movies) =>
            `<tr data-id=${movies._id}>
          <td>${movies.year}</td>
          <td>${movies.title}</td>
          <td>${movies.plot}</td>
          <td>${movies.rated ? movies.rated : "N/A"}</td>
          <td>${minutesToTime(movies.runtime)}</td>
        </tr>`
        )
        .join("")}`;
      document.querySelector("#moviesTable tbody").innerHTML = movieList;
      // })
      // .then(()=>{
      document.querySelectorAll("#moviesTable tbody tr").forEach((row) => {
        row.addEventListener("click", () =>
          fetch(
            `https://busy-cyan-drill-veil.cyclic.app/api/movies/${row.getAttribute(
              "data-id"
            )}`
          )
            .then((res) => res.json())
            .then((data) => modalDisplay(data))
            .catch((err) => console.log(err))
        );
      });
    })
    .catch((err) => console.log(err));
}

function modalDisplay(movieJSON) {
  let modalData = `
  ${
    movieJSON.poster
      ? `<div><img class="img-fluid w-100" src="${movieJSON.poster}"></div>`
      : `<span></span>`
  }
  <p><strong>Directed By:</strong> ${movieJSON.directors
    .map((dir) => `<span>${dir}</span>`)
    .join(" ")}</p>
  <p><strong>Cast:</strong> ${movieJSON.cast
    .map((cas) => `<span>${cas}</span>`)
    .join(", ")}</p>
  <p><strong>Awards:</strong> ${movieJSON.awards.text}</p>
  <p><strong>IMDB Rating:</strong> ${movieJSON.imdb.rating} (${
    movieJSON.imdb.votes
  } votes)</p>`;

  document.querySelector("#detailsModal .modal-body").innerHTML = modalData;
  let myModal = new bootstrap.Modal(document.getElementById("detailsModal"), {
    // backdrop: 'static', // default true - "static" indicates that clicking on the backdrop will not close the modal window
    // keyboard: false, // default true - false indicates that pressing on the "esc" key will not close the modal window
    focus: true, // default true - this instructs the browser to place the modal window in focus when initialized
  });

  myModal.show();
}

// function that converts runtime (given in minutes) in list of movie JSON objects to format h:mm
function minutesToTime(time) {
  let t = parseInt(time);
  let hours = Math.trunc(t / 60);
  let minutes = t % 60;
  let hm = hours.toString().concat(":", minutes.toString());
  return hm;
}
