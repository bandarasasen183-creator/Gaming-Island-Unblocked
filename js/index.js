// js/index.js

import { games } from './games.js';

const grid = document.getElementById('grid');
const tpl = document.getElementById('card-tpl');
const search = document.getElementById('search');
const chips = document.querySelectorAll('.chip');

let activeCat = 'all';
let query = '';

function coverStyle(g) {
  return g.thumb
    ? `url('${g.thumb}') center/cover`
    : `linear-gradient(135deg, ${g.colorA || '#2aa9ff'}, ${g.colorB || '#6ee7ff'})`;
}

function render(list) {
  grid.innerHTML = '';
  list.forEach(g => {
    const node = tpl.content.cloneNode(true);
    const a = node.querySelector('.thumb');
    const cover = node.querySelector('.cover');
    const title = node.querySelector('.title');
    const badge = node.querySelector('.badge');

    // Set cover background
    cover.style.background = coverStyle(g);

    // If no image, show emoji
    if (!g.thumb) {
      cover.style.display = 'grid';
      cover.style.placeItems = 'center';
      cover.style.fontSize = '48px';
      cover.textContent = g.emoji || '🎮';
    }

    // Link to game
    a.href = g.href;
    a.setAttribute('aria-label', `Play ${g.title}`);

    // Set title and category badge
    title.textContent = g.title;
    badge.textContent = g.category[0].toUpperCase() + g.category.slice(1);

    grid.appendChild(node);
  });
}

function applyFilters() {
  const q = query.trim().toLowerCase();
  const filtered = games.filter(g => {
    const catOk = activeCat === 'all' || g.category === activeCat;
    const qOk =
      !q ||
      g.title.toLowerCase().includes(q) ||
      (g.desc || '').toLowerCase().includes(q);
    return catOk && qOk;
  });
  render(filtered);
}

// Search input listener
search.addEventListener('input', e => {
  query = e.target.value;
  applyFilters();
});

// Category chip listeners
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
