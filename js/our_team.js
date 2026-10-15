/* Our Team page scripts. Wrapped in an IIFE: nothing leaks to the global scope. */
(() => {
  'use strict';

  const OPEN_CLASS = 'our-team-nav--open';
  const MOBILE_BREAKPOINT = 720;

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.our-team-menu-toggle');
  const nav = document.querySelector('.our-team-nav');

  if (toggle && nav) {
    const setOpen = (isOpen) => {
      nav.classList.toggle(OPEN_CLASS, isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    toggle.addEventListener('click', () => {
      setOpen(!nav.classList.contains(OPEN_CLASS));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains(OPEN_CLASS)) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
    });
  }

  /* ---------- Newsletter form (client-side validation only) ---------- */
  const form = document.querySelector('#our-team-newsletter');

  if (form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('.our-team-newsletter__message');
    const errorClass = 'our-team-newsletter__message--error';

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!email.checkValidity()) {
        message.classList.add(errorClass);
        message.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
      }

      // There is no backend in this task, so nothing is sent anywhere.
      message.classList.remove(errorClass);
      message.textContent = 'Email accepted (demo form — no data is sent).';
      form.reset();
    });
  }
})();
