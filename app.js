// Game catalogue (add more entries later)
const games = [
  {
    id: 'memory',
    title: 'Memory Match',
    category: 'memory',
    emoji: '🧩',
    colorA: '#2aa9ff',
    colorB: '#6ee7ff',
    href: 'games/memory.html',
    desc: 'Flip and match pairs. Calm and quick.'
  }
  // Add more here…
];

const grid = document.getElementById('grid');
const tpl = document.getElementById('card-tpl');
const search = document.getElementById('search');
const chips = document.querySelectorAll('.chip');

let activeCat = 'all';
let query = '';

function drawCover(el, g) {
  el.style.background = `linear-gradient(135deg, ${g.colorA}, ${g.colorB})`;
  el.style.display = 'grid';
  el.style.placeItems = 'center';
  el.style.fontSize = '48px';
  el.textContent = g.emoji || '🎮';
}

function render(list) {
  grid.innerHTML = '';
  list.forEach(g => {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector('.card');
    const a = node.querySelector('.thumb');
    const cover = node.querySelector('.cover');
    const title = node.querySelector('.title');
    const badge = node.querySelector('.badge');

    drawCover(cover, g);
    a.href = g.href;
    a.setAttribute('aria-label', `Play ${g.title}`);
    title.textContent = g.title;
    badge.textContent = g.category[0].toUpperCase() + g.category.slice(1);

    grid.appendChild(node);
  });
}

function applyFilters() {
  const q = query.trim().toLowerCase();
  const filtered = games.filter(g => {
    const catOk = activeCat === 'all' || g.category === activeCat;
    const qOk = !q || g.title.toLowerCase().includes(q) || (g.desc||'').toLowerCase().includes(q);
    return catOk && qOk;
  });
  render(filtered);
}

search.addEventListener('input', e => {
  query = e.target.value;
  applyFilters();
});

chips.forEach(btn => {
  btn.addEventListener('click', () => {
    chips.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeCat = btn.dataset.cat;
    applyFilters();
  });
});

// Initial render
applyFilters();
