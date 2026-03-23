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

      // Assuming a simple, mock transaction for demonstration
      // Replace with your actual Flutterwave implementation
      FlutterwaveCheckout({
        public_key: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXX-X", // Replace with your actual public key
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