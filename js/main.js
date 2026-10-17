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
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const nameInput  = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const successEl  = form.querySelector('.form-success');
    const errorEl    = form.querySelector('.form-error');
    const button     = form.querySelector('.form-submit');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert('Bitte fülle Name und E-Mail aus.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.'); return;
    }

    successEl.style.display = 'none';
    errorEl.style.display = 'none';
    const label = button.textContent;
    button.disabled = true;
    button.textContent = 'Wird gesendet …';

    const data = Object.fromEntries(new FormData(form));
    data.replyto = data.email;

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || res.status);
        successEl.style.display = 'block';
        form.reset();
    } catch (err) {
        errorEl.style.display = 'block';
    } finally {
        button.disabled = false;
        button.textContent = label;
        (successEl.style.display === 'block' ? successEl : errorEl).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ── CLOSE MENU ──
function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
}
document.getElementById('mobileMenu').addEventListener('click', function(e) {
    if (e.target === this) closeMenu();
});
