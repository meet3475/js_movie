const handleRegistration = async () => {

    let fname = document.getElementById("fname").value
    let age = document.getElementById("age").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let profile_pic = document.getElementById("profile_pic").value

    let arr = profile_pic.split("\\");
    console.log(arr[arr.length-1]);

    const obj = {
        fname: fname,
        age,
        email,
        password,
        "status": "pending",
        profile_pic:"user/"+ arr[arr.length-1],
        createdAt: new Date().toISOString(),
        useresAt: new Date().toISOString()
    }

    console.log(obj);

    // await fetch("http://localhost:3000/posts", {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(obj)
    // }) 

    // .then(async (response) => await response.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error.message));

    await fetch("http://localhost:3000/user", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    })

    const data = await response.json();
    console.log(data);


}


const Registration = document.getElementById("resgistrationForm")
Registration.addEventListener("submit", handleRegistration)


