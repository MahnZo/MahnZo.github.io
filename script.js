/* ============================================================
STRATA · 3D — Site interactions
Vanilla JS, no dependencies. Loaded with `defer` so it runs
after the DOM is parsed.
============================================================ */

// ————————————————————
// PRODUCT FILTERS
// Click a chip → show only matching products.
// ————————————————————
const filterChips = document.querySelectorAll('.filter-chip');
const productCards = document.querySelectorAll('.product');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    // toggle active state
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    productCards.forEach(card => {
      const matches = filter === 'all' || card.dataset.cat === filter;
      card.style.display = matches ? '' : 'none';
    });
  });
});

// ————————————————————
// FAVORITE TOGGLE
// Heart icon on each product card.
// ————————————————————
document.querySelectorAll('.product-fav').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();        // don't trigger product click
    btn.classList.toggle('active');
  });
});

// ————————————————————
// SORT DROPDOWN  (placeholder — wire up to real data later)
// ————————————————————
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', e => {
    console.log('Sort changed to:', e.target.value);
    // TODO: when you have a real product database, sort here
  });
}

// ————————————————————
// PRODUCT CARD CLICK  (placeholder — for future product pages)
// ————————————————————
productCards.forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h3')?.textContent;
    console.log('Product clicked:', name);
    // TODO: route to /product/[slug] when product pages exist
  });
});
