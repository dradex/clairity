const follower = document.getElementById("tooltip");
let isOverTarget = false;

// Track the cursor
document.addEventListener("mousemove", (e) => {
    follower.style.left = e.clientX + "px";
    follower.style.top = e.clientY-40 + "px";
});

// Detect when cursor enters/exits any .hover-target elements
document.querySelectorAll(".tt").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        const payload = el.dataset.tooltip;
        tooltip.textContent = payload;
        tooltip.style.opacity = "1";
    });
    el.addEventListener("mouseleave", () => {
        isOverTarget = false;
        follower.style.opacity = "0";
    });
});


function updateTime() {
    const now = new Date();

    // Format to HH:MM AM/PM
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 → 12

    const formatted = `${hours}:${minutes} ${ampm}`;

    document.getElementById("current-time").textContent = formatted;
}

// update immediately
updateTime();

// update every second
setInterval(updateTime, 1000);