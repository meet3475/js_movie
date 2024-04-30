const handleEdit = async (id) => {

    try {
        let response = await fetch("http://localhost:3000/movie")
        const data = await response.json();

        const MovieData = data.find((v) => v.id === id)
        console.log(MovieData);

        document.getElementById("status").value = MovieData.status;

        document.getElementById("id").value = MovieData.id;
        document.getElementById("mname").value = MovieData.mname;
        document.getElementById("description").value = MovieData.description;
        document.getElementById("cinema").value = MovieData.cinema_id;
       

        let movie_img = document.getElementById("movie_img");
        movie_img.src = MovieData.movie_pic;

        console.log(MovieData.movie_pic);

    } catch (error) {
        console.log(error.message);
    }



}


const handleImg = async () => {
    const movie_pic = document.getElementById("movie_pic").value;

    const movie_img = document.getElementById("movie_img").value;

    //const src = movie_img.src = movie_pic;

    const arr = movie_pic.split("\\");

    document.getElementById("movie_img").src = "../Assest/imges/movie/" + arr[arr.length-1];
}

const handleDelete = async (id) => {
    try {
        await fetch("http://localhost:3000/movie/" + id, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const handleDisplay = async () => {
    try {
        const response = await fetch("http://localhost:3000/movie", {
            method: 'GET',
        })

        const data = await response.json();
        console.log(data);

        const response2 = await fetch("http://localhost:3000/cinema", {
            method: 'GET',
        })

        const data2 = await response2.json();
        console.log(data2);

        let print = '';

        print += '<table border="1"><tr><th>Cinema Name</th><th>Movie Name</th><th>Poster</th><th>Description</th><th>Status</th><th>Action</th></tr>'

        let data3 = data.map((v2) => {
            return data2.find((v) => v.id === v2.cinema_id)
        })

        data.map((v, i) => {
            print += `<tr><td>${data3[i].cname}</td><td>${v.mname}</td><td><img src='${v.movie_pic}' width=100px, height=100px></td><td>${v.description}</td><td>${v.status}</td><td><i onclick = handleEdit('${v.id}') class="fa-solid fa-pen-to-square"></i>
            <i onclick = handleDelete('${v.id}') class="fa-solid fa-trash"></i></td></tr>`

        })

        print += '</table>'


        document.getElementById("disp").innerHTML = print;


    } catch (error) {
        console.log(error.message);
    }
}

const handleCinema = async () => {

    try {
        let response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        let print = '<option value="0">--Select Cinema--</option>'

        data.map((v) => {
            print += `<option value="${v.id}">${v.cname}</option>`
        })

        //let dta = data.find((v) => v.id === v.cinema_name)

        document.getElementById("cinema").innerHTML = print;
    } catch (error) {
        console.log(error.message);
    }
}

const handlemovie = async () => {
    let status = document.getElementById("status").value;
    let movie_pic = document.getElementById("movie_img").src;
    let mname = document.getElementById("mname").value;
    let description = document.getElementById("description").value;
    let cinema_id = document.getElementById("cinema").value;
    let id = document.getElementById("id").value;

    let arr = movie_pic.split("\\");
   

    const obj = {
        cinema_id,
        mname,
        movie_pic,
        description,
        status,
        activedat: new Date().toISOString(),
        updatedat: new Date().toISOString()
    };

    console.log(obj);


    try {
        if (id) {
            await fetch("http://localhost:3000/movie/" + id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            });
    
            const data = await response.json();
        } else {
            await fetch("http://localhost:3000/movie", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            });
    
            const data = await response.json();
        }
    
    } catch (error) {
        console.log(error.message);
    }
    
}


const movieFrom = document.getElementById("MovieForm");
movieFrom.addEventListener("submit", handlemovie);

const movie_pic = document.getElementById("movie_pic");
movie_pic.addEventListener("change", handleImg)

window.onload = handleDisplay();

window.onload = handleCinema();