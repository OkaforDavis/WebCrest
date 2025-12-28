document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-active');
      navLinks.classList.toggle('is-active');
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

    // Close theme menu when clicking outside (on document)
    document.addEventListener('click', (e) => {
      const themeContainer = document.getElementById('theme-toggle-container');
      if (themeContainer && !themeContainer.contains(e.target)) {
        themeMenuToggle.classList.remove('active');
        themeMenuContent.classList.remove('active');
        themePopupOverlay.classList.remove('active');
      }
    });
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
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

// Calculate Quote Function
function calculateQuote() {
  const serviceSelect = document.getElementById('service');
  const styleSelect = document.getElementById('style');
  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  const totalPriceDisplay = document.getElementById('total-price');

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
    
    // Show pay button
    const payButton = document.getElementById('pay-button');
    if (payButton) {
      payButton.textContent = `💳 Pay ₦${total.toLocaleString()}`;
      payButton.style.display = 'inline-flex';
      payButton.dataset.amount = total;
    }
  } else {
    totalPriceDisplay.textContent = '';
    totalPriceDisplay.style.display = 'none';
    
    // Hide pay button
    const payButton = document.getElementById('pay-button');
    if (payButton) {
      payButton.style.display = 'none';
    }
  }
}
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

  // Quote Form Submission (Flutterwave Integration)
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('#name')?.value || 'Customer';
      const email = form.querySelector('#email')?.value || 'noemail@example.com';
      const service = form.querySelector('#service')?.value || 'custom';
      const message = form.querySelector('#message')?.value || 'Quote request';
      const payButton = document.getElementById('pay-button');
      const amount = payButton?.dataset?.amount ? parseInt(payButton.dataset.amount) : 5000;

      // Flutterwave Integration with Test Keys
      if (typeof FlutterwaveCheckout === 'undefined') {
        Swal.fire({
          title: 'Payment Available Soon',
          text: 'Payment processing will be available once Flutterwave is fully integrated. We\'ve recorded your request!',
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
            html: `Thank you for your request, ${name}! A member of our team will be in touch shortly.`,
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
            text: 'You have cancelled the payment process. Please try again.',
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