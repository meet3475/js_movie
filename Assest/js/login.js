const handlelogin = async () => {
    
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
        const response = await fetch("http://localhost:3000/user")
        const data = await response.json();
        //console.log(data);

        let flag = 0;

        data.map((v) => {
            if (v.email === email && v.password === password) {
                if (v.status === "Active") {
                    flag = 1
                } else {
                    flag = 2
                }
            }
        })

        
        if (flag === 1) {
            console.log("Login Sucessfully");
        } else if (flag === 2) {
            console.log("Status Pending");
        } else {
            console.log("Invalid Credential");
        }
    

    } catch (error) {
        console.log(error.message);
    }

}

const loginform = document.getElementById("loginForm")
loginform.addEventListener("submit", handlelogin)

