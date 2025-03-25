// Toggle Menu for Mobile View
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Search Box Functionality
document.querySelector('.search-icon').addEventListener('click', function() {
    let searchQuery = document.querySelector('#searchInput').value;
    alert("Searching for: " + searchQuery);
});




function openModal() {
    document.getElementById("auth-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("auth-modal").style.display = "none";
}

// Switch between login and signup
function switchToSignup() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function switchToLogin() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// Sign Up Function
function signupUser() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (name && email && password) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("Sign up successful! Please log in.");
        switchToLogin();
    } else {
        alert("Please fill in all fields.");
    }
}

// Login Function
function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        localStorage.setItem("loggedIn", "true");
        closeModal();
        document.getElementById("more-details").style.display = "block";
    } else {
        alert("Invalid email or password.");
    }
}

// Restrict Access Until Login
function checkLogin() {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("more-details").style.display = "block";
    } else {
        alert("Please log in to access more details.");
        openModal();
    }
}

async function signup(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Signup successful!");
    } else {
        alert(data.msg);
    }
}

async function login(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
    } else {
        alert(data.msg);
    }
}


function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.querySelector(".heritage-search-bar").value = transcript;
    };

    recognition.onerror = function(event) {
        console.error("Voice recognition error:", event.error);
    };

}

function openDetailPage(site) {
    window.location.href = site + ".html";
}

function openFullView(src) {
    document.getElementById('fullImage').src = src;
    document.getElementById('fullView').style.display = 'flex';
}
function closeFullView() {
    document.getElementById('fullView').style.display = 'none';
}