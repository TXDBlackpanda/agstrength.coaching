// ── FAQ ──
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
    if (!isOpen) { answer.classList.add('open'); icon.textContent = '−'; }
}

// ── FORM ──
function handleSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('[type="email"]');
    const nameInput  = e.target.querySelector('[type="text"]');
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert('Bitte fülle Name und E-Mail aus.'); return;
    }
    const successEl = e.target.querySelector('.form-success');
    if (successEl) successEl.style.display = 'block';
    e.target.reset();
}

// ── CLOSE MENU ──
function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
}
document.getElementById('mobileMenu').addEventListener('click', function(e) {
    if (e.target === this) closeMenu();
});
