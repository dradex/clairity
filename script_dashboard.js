function updateClock() {
  const now = new Date();

  // Format time with locale options
  const formattedTime = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  document.querySelector('.time').textContent = formattedTime;
}
updateClock();
setInterval(updateClock, 6000);

document.addEventListener('DOMContentLoaded', () => {
  const tooltipContainers = document.querySelectorAll('.tooltip-container');
  const tooltipText = document.querySelector('.tooltip-text');

  
  
  tooltipContainers.forEach(container => {
    container.addEventListener('mouseleave', () => {
      tooltipText.style.visibility = 'hidden';
    });

    container.addEventListener('mousemove', (e) => {
      const customText = container.getAttribute('data-tooltip');
      tooltipText.style.visibility = 'visible';
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      tooltipText.textContent = customText;
      tooltipText.style.left = `${mouseX + 10}px`; 
      tooltipText.style.top = `${mouseY - 25}px`;  
    });
  });
});
