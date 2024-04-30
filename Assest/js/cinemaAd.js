const handleEdit = async (id) => {

    try {
        let response = await fetch("http://localhost:3000/cinema")
        const data = await response.json();

        const CinemaData = data.find((v) => v.id === id)
        console.log(CinemaData);

        document.getElementById("status").value = CinemaData.status;

        document.getElementById("id").value = CinemaData.id;
        document.getElementById("cname").value = CinemaData.cname;
        document.getElementById("address").value = CinemaData.address;
        document.getElementById("phone").value = CinemaData.phone;
        document.getElementById("email").value = CinemaData.email;
        // document.getElementById("cinema_pic").value = CinemaData.cinema_pic;

        let cinema_img = document.getElementById("cinema_img");
        cinema_img.src = CinemaData.cinema_pic;

        console.log(CinemaData.cinema_pic);

    } catch (error) {
        console.log(error.message);
    }



}

const handleImg = async () => {
    const cinema_pic = document.getElementById("cinema_pic").value;

    const cinema_img = document.getElementById("cinema_img");

    const src = cinema_img.src = cinema_pic;

    const arr = cinema_pic.split("\\");

    document.getElementById("cinema_img").src = "../Assest/imges/cinema/" + arr[arr.length-1];
}

const handleDelete = async (id) => {
    try {
        await fetch("http://localhost:3000/cinema/" + id, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const handleDisplay = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema", {
            method: 'GET',
        })

        const data = await response.json();
        console.log(data);

        let print = '';

        print += '<table border="1"><tr><th>Cinema Name</th><th>Cinema Pic.</th><th>Status</th><th>Address</th><th>Phone</th><th>Action</th></tr>'

        data.map((v) => {
            print += `<tr><td>${v.cname}</td><td><img src='${v.cinema_pic}' width=100px, height=100px></td><td>${v.status}</td><td>${v.address}</td><td>${v.phone}</td><td><i onclick = handleEdit('${v.id}') class="fa-solid fa-pen-to-square"></i>
            <i onclick = handleDelete('${v.id}') class="fa-solid fa-trash"></i></td></tr>`

        })

        print += '</table>'


        document.getElementById("disp").innerHTML = print;


    } catch (error) {
        console.log(error.message);
    }
}



const handleCinema = async () => {

    let cname = document.getElementById("cname").value
    let cinema_pic = document.getElementById("cinema_img").src
    let status = document.getElementById("status").value
    let address = document.getElementById("address").value
    let phone = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let id = document.getElementById("id").value

    let arr = cinema_pic.split("\\");
    console.log(arr[arr.length - 1]);

    const obj = {
        cname,
        address,
        status,
        phone,
        email,
        cinema_pic,
        activedat: new Date().toISOString(),
        updatedat: new Date().toISOString()
    }

    console.log(obj);


    try {
        if (id) {
            await fetch("http://localhost:3000/cinema/" + id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
    
            const data = await response.json();
        } else {
            await fetch("http://localhost:3000/cinema", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
    
            const data = await response.json();
        }
    
    } catch (error) {
        console.log(error.message);
    }
    

}

const CinemaForm = document.getElementById("CinemaForm")
CinemaForm.addEventListener("submit", handleCinema)

const cinema_pic = document.getElementById("cinema_pic");
cinema_pic.addEventListener("change", handleImg)

window.onload = handleDisplay();