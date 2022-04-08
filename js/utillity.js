const myApi = "db5b8bfc146e2c55ab2417c30811f11f";

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie_data.html";
  return false;
}

function webseriesSelected(id) {
  sessionStorage.setItem("webseriesId", id);
  window.location = "web_series.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  console.log(movieId);
  $(document).ready(function () {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${myApi}&language=en-US&append_to_response=videos,credits`,
    }).then(function (data) {
      console.log(data);
      const currMovie = document.getElementById("movie-content");
      const currCast = document.getElementById("movie_cast");
      currCast.innerHTML = "";
      currMovie.innerHTML = "";

      try {
        const movie_name = data.title;
        const rating = data.vote_average;
        const photosId = data.poster_path;
        let photos = `http://image.tmdb.org/t/p/original${photosId}`;
        if (photosId === null || photosId === undefined)
          photos = "../images/show_placeholder.png";
        const description = data.overview;
        const time = data.runtime;
        const hrs = Math.floor(time / 60);
        const min = time % 60;
        const date = data.release_date;
        const genre = data.genres[0].name;
        const language = data.original_language;
        let video = data.url1;
        let video_link;
        // const production = data.production_companies[0].name;
        for (let i = 0; i < data.videos.results.length; i++) {
          if (data.videos.results[i].type == "Trailer") {
            video = data.videos.results[i].name;
            const key = data.videos.results[i].key;
            video_link = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=forever`;
            console.log(i, video, key, video_link);
            break;
          }
        }
        currMovie.innerHTML = `     <div id="movie-data">
                                                  <div id="Img"><img src="${photos}" id="movieImg"/></div>
                                                  <div id="content">
                                                      <h1 id="movieHead">${movie_name}</h1>
                                                      <p style="color:rgba(255, 255, 255, 0.658);">${hrs} hrs ${min} min &#149; ${date} &#149; ${genre} &#149; ${language}</p>
                                                      <p>${description}</p>
                                                      <iframe src="${video_link}" id="trailer"></iframe>
                                                  </div>
                                              </div>
                                      `;
        for (let i = 0; i < data.credits.cast.length; i++) {
          try {
            const cast_name = data.credits.cast[i].name;
            const character_name = data.credits.cast[i].character;
            const photosId = data.credits.cast[i].profile_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-2");
            card.innerHTML = `  
                                                      <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);width:10vw;">
                                                      <div class="card-body">
                                                      <h6 class="card-title" style="color:white;">${cast_name}</h6>
                                                      <p class="card-text" style="color:white;">${character_name}</p>
                                                      </div>
                                                      
                                                  `;
            currCast.appendChild(card);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
}

function getwebseries() {
  const webseriesId = sessionStorage.getItem("webseriesId");
  console.log(webseriesId);
  $(document).ready(function () {
    $.ajax({
      url: `https://api.themoviedb.org/3/tv/${webseriesId}?api_key=${myApi}&language=en-US&append_to_response=videos,credits`,
    }).then(function (data) {
      console.log(data);
      const currwebseries = document.getElementById("webseries-content");
      const currCast = document.getElementById("webseries_cast");
      currCast.innerHTML = "";
      currwebseries.innerHTML = "";

      try {
        const webseries_name = data.original_name;
        const rating = data.vote_average;
        const photosId = data.poster_path;
        let photos = `http://image.tmdb.org/t/p/original${photosId}`;
        if (photosId === null || photosId === undefined)
          photos = "../images/show_placeholder.png";
        const description = data.overview;
        const date = data.first_air_date;
        const genre = data.genres[0].name;
        const language = data.original_language;
        let video;
        let key;
        let video_link;
        // const production = data.production_companies[0].name;
        for (let i = 0; i < data.videos.results.length; i++) {
          if (data.videos.results[i].type == "Trailer") {
            video = data.videos.results[i].name;
            key = data.videos.results[i].key;
            video_link = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=forever`;
            console.log(i, video, key, video_link);
            break;
          }
        }
        currwebseries.innerHTML = ` <div id="webseries-data">
                                                  <div id="Img">
                                                      <img src="${photos}" id="webseriesImg"/>
                                                  </div>
                                                  <div id="content">
                                                      <h1 id="webseriesHead">${webseries_name}</h1>
                                                      <p style="color:rgba(255, 255, 255, 0.658);"> ${date} &#149; ${genre} &#149; ${language}</p>
                                                      <p>${description}</p>
                                                      <iframe src="${video_link}" id="trailer"></iframe>
                                                  </div>
                                              </div>
                                      `;
        for (let i = 0; i < data.credits.cast.length; i++) {
          try {
            const cast_name = data.credits.cast[i].name;
            const character_name = data.credits.cast[i].character;
            const photosId = data.credits.cast[i].profile_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-2");
            card.innerHTML = `  <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);width:10vw;">
                                              <div class="card-body">
                                                  <h6 class="card-title" style="color:white;">${cast_name}</h6>
                                                  <p class="card-text" style="color:white;">${character_name}</p>
                                              </div>
                                           `;
            currCast.appendChild(card);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
}

function search_result(value, genre, adult, language) {
  let search_url = `https://api.themoviedb.org/3/search/multi?api_key=${myApi}&language=en-US&page=1&query=${value}`;
  $(document).ready(function () {
    $.ajax({
      url: search_url,
    }).then(function (data) {
      data = data.results;
      console.log(data);
      console.log(value);
      const cardDiv = document.getElementById("searchItems");
      cardDiv.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        try {
          if (data[i].media_type === "movie") {
            // console.log(
            //   data[i].original_language.toLowerCase(),
            //   typeof data[i].original_language.toLowerCase()
            // );
            // console.log(
            //   language?.toLowerCase(),
            //   typeof language?.toLowerCase()
            // );
            // console.log(
            //   data[i].original_language.toLowerCase() ===
            //     language?.toLowerCase()
            // );
            if (genre !== null && !data[i].genre_ids.includes(genre)) {
              console.log(i, data[i].id, "genre filtered");
              continue;
            }

            if (language !== null && data[i].original_language !== language) {
              console.log(i, data[i].id, "launguage filtered");
              continue;
            }

            if (adult !== null && data[i].adult !== adult) {
              console.log(i, data[i].id, "adult filtered");
              continue;
            }

            const movie_name = data[i].title;
            if (movie_name === undefined) {
              movie_name = data[i].original_name;
            }

            const rating = data[i].vote_average;
            if (rating === 0) continue;

            const photosId = data[i].poster_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-3");
            card.innerHTML = `
                                      <a href="movie_data.html" onclick="movieSelected(${data[i].id})" style="text-decoration: none;">
                                          <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                          <div class="card-body">
                                              <h6 class="card-title" style="color:white;">${movie_name}</h6>
                                              <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                          </div>
                                      </a>
                                  `;
            cardDiv.appendChild(card);
          }
          if (data[i].media_type === "tv") {
            if (
              genre !== null &&
              data[i].genre_ids !== undefined &&
              !data[i].genre_ids.includes(genre)
            ) {
              console.log(i, data[i].id, "genre filtered");
              continue;
            }

            if (
              language !== null &&
              data[i].original_language !== undefined &&
              data[i].original_language !== language
            ) {
              console.log(i, data[i].id, "launguage filtered");
              continue;
            }

            if (
              adult !== null &&
              data[i].adult !== undefined &&
              data[i].adult !== adult
            ) {
              console.log(i, data[i].id, "adult filtered", data[i].adult);
              continue;
            }

            const webseries_name = data[i].name;

            const rating = data[i].vote_average;
            if (rating === 0) continue;

            const photosId = data[i].poster_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-3");
            card.innerHTML = `      <a href="webseries_name_series.html" onclick="webseries_nameseriesSelected(${data[i].id})" style="text-decoration: none;">
                                          <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                          <div class="card-body">
                                          <h6 class="card-title" style="color:white;">${webseries_name}</h6>
                                          <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                          </div>
                                          </a>
                                      `;
            cardDiv.appendChild(card);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  });
}

function filter_result() {
  let value = params.search;

  // console.log(
  //   document.getElementById("Genre").value,
  //   typeof document.getElementById("Genre").value,
  //   document.getElementById("Language").value,
  //   typeof document.getElementById("Language").value,
  //   document.querySelector('input[name="Adult-content"]:checked').value,
  //   typeof document.querySelector('input[name="Adult-content"]:checked').value
  // );

  let genre =
    document.getElementById("Genre").value !== "null"
      ? Number(document.getElementById("Genre").value)
      : null;

  let language =
    document.getElementById("Language").value !== "null"
      ? document.getElementById("Language").value
      : null;
  // let language = document.getElementById("Language").value
  //   ? document.getElementById("Language").value !== "null"
  //   : null;

  // console.log(
  //   document.querySelector('input[name="Adult-content"]:checked').value
  // );
  let adult = true
    ? document.querySelector('input[name="Adult-content"]:checked').value ===
      "true"
    : false;

  // console.log(
  //   value,
  //   typeof value,
  //   genre,
  //   typeof genre,
  //   language,
  //   typeof language,
  //   adult,
  //   typeof adult
  // );

  search_result(value, genre, adult, language);
  var myModalEl = document.getElementById("exampleModal");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}