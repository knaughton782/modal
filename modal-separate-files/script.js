document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.olc-modal-wrapper').forEach(wrapper => {
        const olcOpenBtn = wrapper.querySelector('.open-olc-modal');
        const olcModal = wrapper.querySelector('.olc-modal');
        const olcCloseBtn = wrapper.querySelector('.close-olc-modal');
        const overlay = wrapper.querySelector('.overlay');

        // Add tabindex="0" dynamically since Canvas strips it from the HTML
        [olcOpenBtn, olcCloseBtn].forEach(el => {
            if (el) el.setAttribute('tabindex', '0');
        });


        // user can tab to any of these elements 
        const focusableSelectors = 'button, div, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const trapFocus = (e) => {
            const focusableElements = olcModal.querySelectorAll(focusableSelectors);
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        // open modal on button or touch
        const openModal = (e) => {
            if (e) e.preventDefault();
            olcModal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            olcOpenBtn.setAttribute('aria-expanded', 'true');
            olcCloseBtn.focus();
            olcModal.addEventListener('keydown', trapFocus);
            document.body.style.overflow = 'hidden'; // background won't scroll
        };
        olcOpenBtn.addEventListener('click', openModal);
        olcOpenBtn.addEventListener('touchstart', openModal, { passive: false });
        // close modal on overlay click or close button click
        const closeModal = () => {
            olcModal.classList.add('hidden');
            overlay.classList.add('hidden');
            olcOpenBtn.setAttribute('aria-expanded', 'false');
            olcOpenBtn.focus();
            olcModal.removeEventListener('keydown', trapFocus);
            document.body.style.overflow = ''; // restore background scroll
        };

        olcCloseBtn.addEventListener('click', closeModal);
        olcCloseBtn.addEventListener('touchstart', closeModal, { passive: false });
        overlay.addEventListener('click', closeModal);
        overlay.addEventListener('touchstart', closeModal, { passive: false });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !olcModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    });
});
