document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://clairity.info/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard.html";
    } else {
      // FastAPI returns error under "detail"
      alert(data.detail || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Network error. Unable to reach server.");
  }
});
