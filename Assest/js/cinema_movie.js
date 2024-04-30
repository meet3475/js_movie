
const CinemadisplayData = async () => {
    console.log("abc");

    let cinema_id = localStorage.getItem("cinema_id");
    console.log(cinema_id);

    const response = await fetch("http://localhost:3000/cinema/" + cinema_id);
    const data = await response.json();

    console.log(data);

    document.getElementById("C_disp").innerHTML = data.cname;


}

const MovieDisplayData = async () => {
    let cinema_id = localStorage.getItem("cinema_id");

    const Movieresponse = await fetch('http://localhost:3000/movie');
    const Movoie_data = await Movieresponse.json();

    const Newdata = Movoie_data.filter((v) => v.cinema_id === cinema_id);

    console.log(Newdata);


    let print = '';
    Newdata.map((v) => {
        print += `<a onclick="handleMovie('${v.id}')">
    <div class="movieCard" style="border: 5px solid orangered; background:black; color:white; width: 400px; height: 500px; margin:20px; text-align: center; border-radius: 10px;">      
          <img id="movieImage" src="${v.movie_pic}" style="width:100%; height:55%; object-fit: cover; object-position: top center;">
          <p>${v.mname}</p>
          <p>${v.description}</p>
          <p>${v.status}</p>
          <p>${v.cinema_id}</p>  
         
      </div>
      </a>`;
  })

  document.getElementById("disp").innerHTML = print;
}

const handleMovie = (id) => {

    localStorage.setItem("movie_id", id);
    
    window.location.href = "http://127.0.0.1:5500/movie_time.html"
}

window.onload = () => {
    CinemadisplayData()
    MovieDisplayData()
}