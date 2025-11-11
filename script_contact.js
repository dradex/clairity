document.addEventListener("click", async e => {
  if (e.target.matches('a[type="submit"].submit-btn')) {
    e.preventDefault();
    const parent = e.target.closest('.right');
    const payload = {};
    parent.querySelectorAll("input, textarea").forEach(el => payload[el.name] = el.value);

    await fetch("http://localhost:5000/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    alert("Submitted to Discord bot.");
  }
});