document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }

  // Sidebar Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const sidebarMenu = document.getElementById('sidebar-menu');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenu && sidebarMenu && sidebarOverlay && sidebarClose && navLinks) {
    // Open sidebar
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.add('is-active');
      sidebarMenu.classList.add('active');
      sidebarOverlay.classList.add('active');
    });

    // Close sidebar via close button
    sidebarClose.addEventListener('click', () => {
      mobileMenu.classList.remove('is-active');
      sidebarMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });

    // Close sidebar via overlay click
    sidebarOverlay.addEventListener('click', () => {
      mobileMenu.classList.remove('is-active');
      sidebarMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      });
    });
  }

  // Theme Menu Toggle
  const themeMenuToggle = document.getElementById('theme-menu-toggle');
  const themeMenuContent = document.getElementById('theme-menu-content');
  const themePopupOverlay = document.getElementById('theme-popup-overlay');
  
  if (themeMenuToggle && themeMenuContent && themePopupOverlay) {
    themeMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenuToggle.classList.toggle('active');
      themeMenuContent.classList.toggle('active');
      themePopupOverlay.classList.toggle('active');
    });

    // Close theme menu when clicking overlay
    themePopupOverlay.addEventListener('click', () => {
      themeMenuToggle.classList.remove('active');
      themeMenuContent.classList.remove('active');
      themePopupOverlay.classList.remove('active');
    });

    // Close theme menu when clicking outside
    document.addEventListener('click', (e) => {
      const themeContainer = document.getElementById('theme-toggle-container');
      if (themeContainer && !themeContainer.contains(e.target)) {
        themeMenuToggle.classList.remove('active');
        themeMenuContent.classList.remove('active');
        themePopupOverlay.classList.remove('active');
      }
    });
  }

  // Theme Selection
  const themeOptions = document.getElementById('theme-options');
  const colorPicker = document.getElementById('color-picker');
  const body = document.body;

  if (themeOptions && colorPicker) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedColor = localStorage.getItem('modernColor') || '#38bdf8';
    
    initTheme(savedTheme, savedColor);

    themeOptions.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('.theme-btn');
      if (themeBtn) {
        const theme = themeBtn.dataset.theme;
        localStorage.setItem('theme', theme);
        initTheme(theme, savedColor);
      }
    });

    colorPicker.addEventListener('click', (e) => {
      const colorSwatch = e.target.closest('.color-swatch');
      if (colorSwatch) {
        const color = colorSwatch.dataset.color;
        localStorage.setItem('modernColor', color);
        initTheme('modern', color);
      }
    });

    function initTheme(theme, color) {
      body.className = '';
      body.classList.add(theme + '-theme');
      document.documentElement.style.setProperty('--modern-color', color);

      // Update active state
      document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelector(`.theme-btn[data-theme="${theme}"]`)?.classList.add('active');

      document.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.remove('active'));
      if (theme === 'modern') {
        document.querySelector(`.color-swatch[data-color="${color}"]`)?.classList.add('active');
      }
    }
  }

  // AOS Initialization
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          content: 'swal-content',
          confirmButton: 'swal-confirm-button',
        }
      });
      contactForm.reset();
    });
  }

  // Quote Form Submission
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('#name')?.value || 'Customer';
      const email = form.querySelector('#email')?.value || 'noemail@example.com';
      const service = form.querySelector('#service')?.value || 'custom';
      const payButton = document.getElementById('pay-button');
      const amount = payButton?.dataset?.amount ? parseInt(payButton.dataset.amount) : 5000;

      // Flutterwave Integration
      if (typeof FlutterwaveCheckout === 'undefined') {
        Swal.fire({
          title: 'Payment Unavailable',
          text: 'Payment processing unavailable. Your request has been recorded!',
          icon: 'info',
          confirmButtonText: 'OK'
        });
        form.reset();
        return;
      }

      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-446d40f2470f5e98aaf9d54508372101-X",
        tx_ref: `BSTDEV-${Date.now()}`,
        amount: amount,
        currency: "NGN",
        country: "NG",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: email,
          phone_number: "080XXXXXXX",
          name: name,
        },
        customizations: {
          title: "BST Developments Quote Request",
          description: `Quote request for ${service}`,
          logo: "https://your-domain.com/logo.png",
        },
        callback: function(data) {
          console.log('Transaction successful:', data);
          Swal.fire({
            title: 'Success!',
            html: `Thank you for your request, ${name}! We will be in touch shortly.`,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'swal-popup',
              title: 'swal-title',
              content: 'swal-content',
              confirmButton: 'swal-confirm-button',
            }
          });
          form.reset();
        },
        onclose: function() {
          Swal.fire({
            title: 'Cancelled',
            text: 'You cancelled the payment process.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'swal-popup',
              title: 'swal-title',
              content: 'swal-content',
              confirmButton: 'swal-confirm-button',
            }
          });
        }
      });
    });
  }
});

// Calculate Quote Function (Global scope for onclick)
function calculateQuote() {
  const serviceSelect = document.getElementById('service');
  const styleSelect = document.getElementById('style');
  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  const totalPriceDisplay = document.getElementById('total-price');
  const payButton = document.getElementById('pay-button');

  if (!serviceSelect || !styleSelect || !totalPriceDisplay) return;

  let total = 0;

  // Get service price
  if (serviceSelect.value) {
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const servicePrice = parseInt(selectedOption.dataset.price) || 0;
    total += servicePrice;
  }

  // Get style price
  if (styleSelect.value) {
    const selectedOption = styleSelect.options[styleSelect.selectedIndex];
    const stylePrice = parseInt(selectedOption.dataset.price) || 0;
    total += stylePrice;
  }

  // Get feature prices
  checkboxes.forEach(checkbox => {
    const featurePrice = parseInt(checkbox.dataset.price) || 0;
    total += featurePrice;
  });

  // Display total price
  if (total > 0) {
    totalPriceDisplay.textContent = `Total Estimated Price: ₦${total.toLocaleString()}`;
    totalPriceDisplay.style.display = 'block';
    
    if (payButton) {
      payButton.textContent = `💳 Pay ₦${total.toLocaleString()}`;
      payButton.style.display = 'inline-flex';
      payButton.dataset.amount = total;
    }
  } else {
    totalPriceDisplay.textContent = '';
    totalPriceDisplay.style.display = 'none';
    
    if (payButton) {
      payButton.style.display = 'none';
    }
  }
}