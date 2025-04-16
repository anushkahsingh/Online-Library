document.querySelector("#signup_form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const name = document.querySelector('#name').value.trim();
  
    const new_user = {
      username:username,
      password,password,
      name:name,
    };
  

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.msg || "Something went wrong");
          });
        }
        return response.json();
      })
      .then((data) => {
        // success - redirect
        window.location.href = "/Frontend/login.html"; // or wherever you want
      })
      .catch((error) => {
        // Show modal with error message
        document.getElementById("errorModalBody").textContent = error.message;
        const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        errorModal.show();
      });
  });
  