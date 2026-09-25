document.addEventListener('DOMContentLoaded', () => {
  // --- 1. HOVER GLOW EFFECT FOR CARDS ---
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- 2. MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      }
    });

    // Close mobile menu when clicking any link inside it
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // --- 3. INTERACTIVE DEMO WORKFLOW TABS ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active states
      tabBtns.forEach(b => b.classList.remove('active', 'text-indigo-400', 'bg-indigo-500/10', 'border-indigo-500/50'));
      btn.classList.add('active', 'text-indigo-400', 'bg-indigo-500/10', 'border-indigo-500/50');

      // Update display of content tabs
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.remove('hidden');
          // Restart any animations inside the tab mockup
          const paths = content.querySelectorAll('.animated-path');
          paths.forEach(p => {
            p.style.animation = 'none';
            p.offsetHeight; // Trigger reflow
            p.style.animation = '';
          });
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });

  // --- 4. PRICING TOGGLE ---
  const billingToggleBtn = document.getElementById('billing-toggle');
  const togglePill = document.getElementById('toggle-pill');
  const priceStarter = document.getElementById('price-starter');
  const pricePro = document.getElementById('price-pro');
  const billingCycleLabels = document.querySelectorAll('.billing-cycle-label');

  let isYearly = false;

  if (billingToggleBtn && togglePill && priceStarter && pricePro) {
    billingToggleBtn.addEventListener('click', () => {
      isYearly = !isYearly;

      if (isYearly) {
        // Move toggle knob to the right
        togglePill.style.transform = 'translateX(24px)';
        // Update Prices with Yearly Discount (~20% off)
        priceStarter.textContent = '$12';
        pricePro.textContent = '$29';
        // Update labels to /yr
        billingCycleLabels.forEach(label => label.textContent = '/mo, billed annually');
      } else {
        // Move toggle knob to the left
        togglePill.style.transform = 'translateX(0px)';
        // Standard Monthly Prices
        priceStarter.textContent = '$15';
        pricePro.textContent = '$39';
        // Update labels to /mo
        billingCycleLabels.forEach(label => label.textContent = '/mo');
      }
    });
  }

  // --- 5. ACCORDION FAQ ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 6. NEWSLETTER / SIGNUP FORM VALIDATION ---
  const signupForm = document.getElementById('signup-form');
  const newsletterForm = document.getElementById('newsletter-form');
  const successAlert = document.getElementById('success-alert');
  const successAlertMsg = document.getElementById('success-alert-message');

  function showSuccessToast(message) {
    successAlertMsg.textContent = message;
    successAlert.classList.remove('hidden');
    // Force reflow
    successAlert.offsetHeight;
    successAlert.classList.add('show');

    // Hide toast after 4 seconds
    setTimeout(() => {
      successAlert.classList.remove('show');
      setTimeout(() => {
        successAlert.classList.add('hidden');
      }, 500);
    }, 4000);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = signupForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() !== '') {
        showSuccessToast(`Success! Account creation instructions sent to ${emailInput.value.trim()}.`);
        emailInput.value = '';
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() !== '') {
        showSuccessToast(`Thank you! ${emailInput.value.trim()} has been added to our waitlist.`);
        emailInput.value = '';
      }
    });
  }
});
