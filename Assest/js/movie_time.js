const handelmovieTime = async() => {
    // console.log("bjj");

    let movie_id = localStorage.getItem("movie_id");

    const response = await fetch("http://localhost:3000/movie/"+ movie_id);
    let data = await response.json();

    // console.log(data);

    document.getElementById("disp").innerHTML=data.mname;
}

const handelMovie = async () => {
    // console.log("bjbj");

    const response = await fetch("http://localhost:3000/time");
    let data = await response.json();

    // console.log(data);
    let movie_id = localStorage.getItem("movie_id");
    let cinema_id = localStorage.getItem("cinema_id");

    let fdata = data.filter((v) => v.movie_id === movie_id  && v.cinema_id === cinema_id);

    document.getElementById("fdate").value = fdata[0].date;

    // console.log(fdata);
    let print = "";

    fdata.map((v) => {
        let timeBoxes = '';
        print += `<p id="endate">END DATE :- ${v.date}</p>`

        print += `<div class="time">
        <p> <input type="date" id="date"></p>`

        v.time.map(v => {
            timeBoxes += ` <input type="radio" name="time"  style="width:25px; height:25px" value="${v}"><button id="Tbtn">
            ${v}</button>`
        });

       print += timeBoxes;

        print += `<p><button onclick="handleDate()" id="next">Next</button></p>`;
        
        print += `</div>`
    })

    document.getElementById("time").innerHTML=print
}

const handleTime = (time) => {
    localStorage.setItem("time", time);
}

const handleDate = async () => {
    event.preventDefault()

    let date = document.getElementById("date").value;
    let dateN = new Date(date).toLocaleDateString()

    let date2 = document.getElementById("fdate").value;
    let time = document.getElementsByName("time");



    let time_data = '';

    for(let i=0; i<time.length; i++) {
        if(time[i].checked) {
            time_data += time[i].value;
        }
    }

    if (date2 >= date) {
        localStorage.setItem("date", dateN);
        localStorage.setItem("time", time_data);
        
        window.location.href = "http://127.0.0.1:5500/time_seat.html"
    } else {
        alert("This Movie is not  Available");
        
    }
}


window.onload =() => {
    handelmovieTime()
    handelMovie()
}