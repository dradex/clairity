

// Reveal-on-scroll with safe defaults and early trigger
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Two-frame commit: ensure hidden state paints, then flip to visible,
          // then clean up the hidden flag on the following frame.
          requestAnimationFrame(() => {
            el.classList.add('visible');
            requestAnimationFrame(() => {
              el.classList.remove('will-reveal');
              observer.unobserve(el);
            });
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -20% 0px', // start animation a bit before center
      threshold: 0
    }
  );
  document.querySelectorAll('[data-animate]').forEach(el => {
    // Add pre-reveal class so CSS hides it only when JS is active
    if (el.matches('.left-bg-two-text, .middle-bg-two-text, .right-bg-two-text')) {
      el.classList.add('will-reveal');
      void el.offsetWidth;
    }
    observer.observe(el);
  });
} else {
  // Fallback: if IO unsupported, just show elements
  document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('visible'));
}



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

  // BG-four blobs: gentle repulsion from mouse + wraparound
  const section = document.querySelector('.bg-one');
  const blobs = Array.from(document.querySelectorAll('.bg-one-blob'));
  if (section && blobs.length) {
    // Randomize initial positions and slight per-blob scale opacity variance
    const rect = section.getBoundingClientRect();
    const blobState = blobs.map((el) => {
      const scale = 0.9 + Math.random() * 0.35; // 0.9–1.25
      el.style.opacity = String(0.5 + Math.random() * 0.25);
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      return {
        el,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        angle: Math.random() * Math.PI * 2,
        drift: 0.05 + Math.random() * 0.03,
        scale
      };
    });

    const mouse = { x: null, y: null, inside: false };

    function updateMouse(e) {
      const r = section.getBoundingClientRect();
      mouse.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }

    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('mouseenter', updateMouse, { passive: true });
    window.addEventListener('scroll', () => {
      // Keep coordinates in sync on scroll
      if (mouse.x !== null) updateMouse({ clientX: mouse.x + section.getBoundingClientRect().left, clientY: mouse.y + section.getBoundingClientRect().top });
    }, { passive: true });

    function animate() {
      const r = section.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      const margin = 120; // wrap margin
      const maxInfluence = 260; // px radius of repulsion
      const baseStrength = 140;                                00; // repulsion constant
      const damping = 0.992; // velocity damping (less damping => more motion)
      const maxSpeed = 1.6; // px per frame cap

      blobState.forEach((b) => {
        if (mouse.inside && mouse.x != null) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const d = Math.sqrt(d2) + 0.001;
          if (d < maxInfluence) {
            const force = baseStrength / (d2 + 2000); // inverse-square falloff with softening
            b.vx += (dx / d) * force;
            b.vy += (dy / d) * force;
          }
        }

        // smooth ambient drift (low-frequency)
        b.vx += Math.cos(b.angle) * b.drift;
        b.vy += Math.sin(b.angle) * b.drift;
        b.angle += 0.003 + (Math.random() - 0.5) * 0.001;

        // tiny noise so paths don't repeat exactly
        b.vx += (Math.random() - 0.5) * 0.01;
        b.vy += (Math.random() - 0.5) * 0.01;

        // damping and clamp
        b.vx *= damping;
        b.vy *= damping;
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > maxSpeed) {
          b.vx = (b.vx / sp) * maxSpeed;
          b.vy = (b.vy / sp) * maxSpeed;
        }

        // integrate
        b.x += b.vx;
        b.y += b.vy;

        // wrap around edges
        if (b.x < -margin) b.x = w + margin;
        else if (b.x > w + margin) b.x = -margin;
        if (b.y < -margin) b.y = h + margin;
        else if (b.y > h + margin) b.y = -margin;

        b.el.style.transform = `translate(${b.x}px, ${b.y}px) scale(${b.scale})`;
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
});
