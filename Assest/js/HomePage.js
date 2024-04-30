
const cinema = async () => {
  const response = await fetch("http://localhost:3000/cinema");
  const data = await response.json();

  let print = '';

  data.map((v) => {
    print += ` <div class="swiper-slide">
    <div class="cinemaCard ">
    <a onclick="handleCinema_Movie('${v.id}')">
          <img id="cinemaImage" src="${v.cinema_pic}">
          <p>${v.cname}</p>
          <p>${v.address}</p>
          <p>${v.phone}</p>
          <p>${v.email}</p>
          <p>${v.status}</p>
          </a>
      </div>
      </div>`;
  });

  document.getElementById("cinema_silde").innerHTML = print;
}

const handleCinema_Movie = (id) => {
  console.log("xyz");

  localStorage.setItem("cinema_id", id);

  window.location.href = "http://127.0.0.1:5500/cinema_movie.html";
}


const movie = async () => {
  const response = await fetch('http://localhost:3000/movie');
  const data = await response.json();



  let print = '';
  data.map((v) => {
    print += `<div class="swiper-slide">  
    <div class="movieCard ">    
          <img id="movieImage" src="${v.movie_pic}">
          <p>${v.mname}</p>
          <p>${v.description}</p>
          <p>${v.status}</p>
          <p>${v.cinema_id}</p>  
          </div>
      </div>`;
  })

  document.getElementById("movie_silde").innerHTML = print;
}

window.onload = () => {
  cinema();
  movie();
}