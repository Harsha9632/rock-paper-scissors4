const API_URL = "http://localhost:5000";


function showRegister() {
    document.querySelector(".container").style.display = "none";
    document.getElementById("register-container").style.display = "flex";
}


function showLogin() {
    document.getElementById("register-container").style.display = "none";
    document.querySelector(".container").style.display = "flex";
}


async function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        document.getElementById("auth-message-register").textContent = data.message;
    } catch (err) {
        document.getElementById("auth-message-register").textContent = "Server error!";
    }
}


async function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            document.getElementById("auth-message").style.color = "green";
            document.getElementById("auth-message").textContent = "Login Successful ✅";

            setTimeout(() => {
                window.location.href = "index.html";  
            }, 1000);

        } else {
            document.getElementById("auth-message").style.color = "red";
            document.getElementById("auth-message").textContent = data.message;
        }
    } catch (err) {
        document.getElementById("auth-message").textContent = "Server error!";
    }
}

