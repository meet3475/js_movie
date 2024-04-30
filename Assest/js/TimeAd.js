const displaycinama = async () => {
    // console.log("bjhi");

    try {
        let response = await fetch("http://localhost:3000/cinema")
        let data = await response.json();

        let print = '<option value="0">--select cinama--</option>';

        data.map((v) => {
            print += `<option value="${v.id}">${v.cname}</option>`
        })
        // data.find ((v) => v.id === v.cinemaname);
        // console.log(data);


        document.getElementById("cinemaname").innerHTML = print
    } catch (error) {
        console.log(error.message);
    }

}

const displaymovie = async () => {
    // console.log("bjhi");

    try {
        let response = await fetch("http://localhost:3000/movie")
        let data = await response.json();

        let print = '<option value="0">--select movie--</option>';

        data.map((v) => {
            print += `<option value="${v.id}">${v.mname}</option>`
        })
        data.find((v) => v.id === v.cname);
        // console.log(data);


        document.getElementById("moviedata").innerHTML = print
    } catch (error) {
        console.log(error.message);
    }

}


const handeldcinemadata = async () => {
    // console.log("nkjnk");

    let cinemaresponse = document.getElementById("cinemaname").value;
    console.log(cinemaresponse);

    let movieresopnse = await fetch("http://localhost:3000/movie")
    let moviedta = await movieresopnse.json();

    // console.log(moviedta);

    let data = moviedta.filter((v) => v.cinema_id === cinemaresponse);
    console.log(data);

    let print = '<option value="0">--select movie--</option>';

    data.map((v) => {
        print += `<option value="${v.id}">${v.mname}</option>`
    })

    console.log(data);

    document.getElementById("moviedata").innerHTML = print
}

const handleAddTime = (event, value = '') => {
    event.preventDefault();

    const rNo = Math.floor(Math.random() * 1000)

    const divElem = document.createElement("div");
    divElem.setAttribute("id", "row-" + rNo);

    const inElem = document.createElement("input");
    inElem.setAttribute("type", "time");
    inElem.setAttribute("name", "movie_time");
    inElem.setAttribute("value", value);

    const plusElem = document.createElement("button");
    plusElem.setAttribute("onclick", "handleAddTime(event)")

    const plusTxt = document.createTextNode("+")
    plusElem.appendChild(plusTxt);

    divElem.appendChild(inElem);
    divElem.appendChild(plusElem);

    if (document.getElementById("allTimes").children.length > 0) {
        const minusElem = document.createElement("button");
        minusElem.setAttribute("onclick", `handleRemoveTime(${rNo})`)

        const minusTxt = document.createTextNode("-")
        minusElem.appendChild(minusTxt);

        divElem.appendChild(minusElem);

    }

    const parentDiv = document.getElementById("allTimes");
    parentDiv.appendChild(divElem);

}

const handleRemoveTime = (id) => {
    console.log(id);
    document.getElementById("row-" + id).remove()
    
}

const handelalldata = async (event) => {

    event.preventDefault();

    let id = document.getElementById("id").value;
    // console.log(id);
    let cinema_id = document.getElementById("cinemaname").value;
    let movie_id = document.getElementById("moviedata").value;
    let date = document.getElementById("date").value;
    const time = document.getElementsByName("movie_time");
    const timeData = [];
    // console.log(time);

    for (let i = 0; i < time.length; i++) {
        timeData.push(time[i].value);
    }

    const obj = {
        cinema_id,
        movie_id,
        date,
        time: timeData,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    }

    if (id) {
        await fetch("http://localhost:3000/time/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        // const data = await response.json();
    } else {
            await fetch("http://localhost:3000/time", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
            // const data = await response.json();
        
    }


    // console.log(timeData);
}

const userdispaydata = async () => {
    try {
        const movieresponse = await fetch("http://localhost:3000/movie", {
            method: "GET"
        });
        let movie_data = await movieresponse.json();

        const cinemaresponse = await fetch("http://localhost:3000/cinema", {
            method: "GET"
        });
        let cinema_data = await cinemaresponse.json();

        const time_response = await fetch("http://localhost:3000/time", {
            method: "GET",
        })
        const time_data = await time_response.json();

        let print = "";

        let data2 = movie_data.map((v1) => {
            return cinema_data.find((v) => v.id === v1.cinema_id)
        })

        let data3 = time_data.map((v2) => {
            return movie_data.find((v) => v.id === v2.movie_id)
        })

        print += '<table border="1">'
        print += '<tr> <th>cinema Name</th> <th>Movie Name</th> <th>date</th> <th>time</th>   <th>Action</th></tr>'

        time_data.map((v, i) => {
            print += '<tr>'
            print += `<td>${data2[i].cname}</td> <td>${data3[i].mname}</td> <td>${v.date}</td> <td>${v.time}</td> <td><i class="fa-solid fa-pen-nib" onclick="handleEdit('${v.id}',event)"></i> <i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i></td>`
            print += '</tr>'
        })

        print += '</table>'


        document.getElementById("disp").innerHTML = print

    } catch (error) {
        console.log(error.message);
    }

}

const handleDelete = async (id) => {

    try {
        await fetch("http://localhost:3000/time/" + id, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error.message);
    }
}

const handleEdit = async (id, event) => {
    const time_response = await fetch("http://localhost:3000/time")
    const time_data = await time_response.json();

    let data = time_data.find((v) => v.id === id);
    // console.log(data);

    document.getElementById("id").value = data.id;
    document.getElementById("cinemaname").value = data.cinema_id;
    document.getElementById("moviedata").value = data.movie_id;
    document.getElementById("date").value = data.date;
    document.getElementById("allTimes").value = data.time;

    document.getElementById("allTimes").innerHTML = "";

    for (let i = 0; i < data.time.length; i++) {
        handleAddTime(event, data.time[i]);
    }

}
const timeForm = document.getElementById("timeForm");
timeForm.addEventListener("submit", handelalldata);

const cinemaname = document.getElementById("cinemaname");
cinemaname.addEventListener("change", handeldcinemadata)

window.onload = () => {
    displaymovie()
    displaycinama()
    userdispaydata()
}