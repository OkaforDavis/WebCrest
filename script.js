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
  if (themeMenuToggle && themeMenuContent) {
    themeMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenuToggle.classList.toggle('active');
      themeMenuContent.classList.toggle('active');
    });

    // Close theme menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!themeMenuToggle.contains(e.target) && !themeMenuContent.contains(e.target)) {
        themeMenuToggle.classList.remove('active');
        themeMenuContent.classList.remove('active');
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

  // Quote Form Submission (Flutterwave Integration)
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const service = form.querySelector('#service').value;
      const message = form.querySelector('#message').value;

      // Flutterwave Integration with Test Keys
      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-446d40f2470f5e98aaf9d54508372101-X", // Test public key
        tx_ref: `BSTDEV-${Date.now()}`,
        amount: 5000, // Example amount
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