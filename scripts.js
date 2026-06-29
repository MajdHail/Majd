function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageName).classList.add('active');
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-' + pageName).classList.add('active');

  document.querySelectorAll('.hidden-character[data-page]').forEach(char => {
    const visible = char.dataset.page === pageName;
    char.style.display = visible ? 'block' : 'none';
    if (visible) {
      // Restart fade-in animation
      char.style.animation = 'none';
      void char.offsetHeight;
      char.style.animation = '';
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleCharacterHover() {
  this.querySelector('.character-reveal').classList.add('discovered');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hidden-character[data-page]').forEach(char => {
    char.addEventListener('mouseenter', handleCharacterHover);
    // Show only the characters for the initial active page (home)
    if (char.dataset.page !== 'home') char.style.display = 'none';
  });
});

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  const data = Object.fromEntries(new FormData(this));
  try {
    const response = await fetch('https://formspree.io/f/xldokzyk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#4ecca3';
      this.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error();
    }
  } catch {
    btn.textContent = 'Error — Try Again';
    btn.style.background = '#c03';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
});
