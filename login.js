document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://209.59.154.97:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    print(response);
    localStorage.setItem("token", data.token); // Save JWT
    window.location.href = "/dashboard.html"; // Redirect to dashboard
  } else {
    alert(data.error);
  }
});
