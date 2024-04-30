const handleEdit = async (id) => {

    console.log(id);
    try {
        let response = await fetch("http://localhost:3000/user")
        const data = await response.json();
        console.log(data);

        const userData = data.find((v) => v.id === id)
        console.log(userData);

        document.getElementById("id").value = userData.id;
        document.getElementById("fname").value = userData.fname;
        document.getElementById("age").value = userData.age;
        document.getElementById("email").value = userData.email;
        document.getElementById("status").value = userData.status;
    
    } catch (error) {
        console.log(error.message);
    }

   
    
}


const handleDelete = async (id) => {
    try {
        await fetch("http://localhost:3000/user/" + id, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const handleDisplay = async () => {
    try {
        const response = await fetch("http://localhost:3000/user", {
            method: 'GET',
        })

        const data = await response.json();
        console.log(data);

        let print = '';

        print += '<table border="1"><tr><th>Name</th><th>Profile Pic.</th><th>Email</th><th>Age</th><th>Status</th><th>Action</th></tr>'

        data.map((v) => {
            print += `<tr><td>${v.fname}</td><td><img src='../Assest/imges/${v.profile_pic}' width=100px, height=100px></td><td>${v.email}</td><td>${v.age}</td><td>${v.status}</td><td><i onclick = handleEdit('${v.id}') class="fa-solid fa-pen-to-square"></i>
            <i onclick = handleDelete('${v.id}') class="fa-solid fa-trash"></i></td></tr>`

        })

        print += '</table>'


        document.getElementById("disp").innerHTML = print;


    } catch (error) {
        console.log(error.message);
    }
}

const handleUser = async () => {

    const id = document.getElementById("id").value;
    const status = document.getElementById("status").value;

    try {
        let response = await fetch("http://localhost:3000/user")
        const data = await response.json();
        console.log(data);

        const newObj = data.find((v) => v.id === id);
        console.log(newObj);

        const newData = {...newObj, status: status};
        console.log(newData);

        await fetch("http://localhost:3000/user/" + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData)
        })

    } catch (error) {
        console.log(error.message);
    }



    // const fname = document.getElementById("fname").value;
    // const age = document.getElementById("age").value;
    // const email = document.getElementById("email").value;
    // const password = document.getElementById("password").value;

    // const obj = {
    //     id,
    //     fname,
    //     age,
    //     email,
    //     password,
    //     status
    // }




}


const UserForm = document.getElementById("UserForm")
UserForm.addEventListener("submit", handleUser)

window.onload = handleDisplay();