const handleSeatData = async () => {

    let cinema_id = localStorage.getItem("cinema_id");
    let movie_id = localStorage.getItem("movie_id");
    let time = localStorage.getItem("time");
    let date = localStorage.getItem("date");

    // console.log(cinema_id, movie_id, time, date);

    const response = await fetch("http://localhost:3000/seat");
    let data = await response.json();
    //console.log(data);

    let obj = data.find((v) => v.cinema_id === cinema_id && v.movie_id === movie_id && v.time === time);

    // console.log(obj);

    let NewObj = obj.Seatobj.find((v) => v.date === date);

    // console.log(NewObj);

    let print = '';
    let boxprint = ''

    let seatData = NewObj.seat.map((v, i) => {
        const Status = v === 1 ? "disabled" : "active"
        if (v === 0) {
            print += `<button type="button" class="btn btn-outline-primary" ${Status} id="seat-${i}" onclick="handleButton(${i},${obj.price})">${i + 1}</button>`
        } else {
            print += `<button type="button" class="btn btn-outline-primary" ${Status} id="seat-${i}" onclick="handleButton(${i},${obj.price})">${i + 1}</button>`
        }

       
    })

    boxprint += `<button type="button" class="btn btn-outline-danger book"  onclick="handleSuccess()">BOOK NOW</button>`

    document.getElementById("disp").innerHTML = print;
    document.getElementById("disp3").innerHTML = boxprint;


}

let butArr = [];
let Allprice = 0;

const handleButton = async (i, price) => {
    // console.log(i);
    // event.preventDefault()

    if (butArr.includes(i)) {
        let index = butArr.findIndex((v) => v === i);
        butArr.splice(index, 1);
    } else {
        butArr.push(i);
    }

    localStorage.setItem("seats", JSON.stringify(butArr))




    if (butArr.some((v) => v === i)) {

        document.getElementById("seat-" + i).style.backgroundColor = "#0D6EFD"
        document.getElementById("seat-" + i).style.color = "white"


    } else {
        document.getElementById("seat-" + i).style.backgroundColor = "black"
        document.getElementById("seat-" + i).style.color = "#0D6EFD"
    }


    Allprice = butArr.length * price

    document.getElementById("price").innerHTML = Allprice
}

const handleSuccess = async () => {

    event.preventDefault()

    if (butArr.length !== 0) {
        alert("Your seat is Booked");
        window.location.href = "http://127.0.0.1:5500/sucess.html"

    } else {
        alert("Please select any seat");
    }


    let cinema_id = localStorage.getItem("cinema_id");
    let movie_id = localStorage.getItem("movie_id");
    let time = localStorage.getItem("time");
    let date = localStorage.getItem("date");


    //console.log(cinema_id, movie_id , date);

    const response = await fetch("http://localhost:3000/seat");
    let data = await response.json();
    // console.log(data);

    let obj = data.find((v) => v.cinema_id === cinema_id && v.movie_id === movie_id && v.time === time);
;
    // console.log(obj);

    const seatdata = obj.Seatobj.find((v) => v.date === date);
    // console.log(seatdata);

    seatdata.seat.map((v, i) => {
        if (butArr.includes(i)) {
            seatdata.seat[i] = 1;
        };

    });

    if (seatdata) {
        const response = await fetch("http://localhost:3000/seat/" + obj.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        const data = await response.json();
        console.log(data);
    }

}

window.onload = () => {
    handleSeatData()
}