// Global elements (from html & css files)
const intro = document.getElementById('intro');
const introLogo = document.querySelector('.intro .logo-svg');
const navbar = document.getElementById('navbar');
const navbarLogo = document.getElementById('navbar-logo');
const menuToggle = document.getElementById('menu-toggle');
const menuItems = document.getElementById('menu-items');
const siteContent = document.getElementById('site-content');
const contactForm = document.getElementById('contact-form');

// Intro to Main Page transition logic
const introTransition = () => {
  if (!intro || !introLogo){
    return;
  };  

  introLogo.addEventListener('click', () => {
    intro.style.opacity = '0';
    intro.style.transform = 'translateY(-100%)';

    setTimeout(() => {
      intro.style.display = 'none';
      siteContent?.classList.add('show');
      navbar.style.transform = 'translateY(0)';

      setTimeout(() => {
        navbarLogo?.classList.add('show');
        navbarLogo?.classList.remove('hidden');
      }, 50);
    }, 1000); 
  });
}

// Navbar Logic
const navbarAnimation = () => {
  if (!navbar || !navbarLogo || !siteContent){
    return;
  };

  if (!intro) {
    // Blog page -> show navbar immediately
    siteContent.classList.add('show');
    navbar.style.transform = 'translateY(0)';
    navbarLogo.classList.add('show');
    navbarLogo.classList.remove('hidden');
  }

  if (menuToggle && menuItems) {
    menuToggle.addEventListener('click', () => {
      if (menuItems.classList.contains('show')) {
        menuItems.classList.remove('show');

        menuItems.addEventListener(
          'transitionend',
          () => {
            if (!menuItems.classList.contains('show')) {
              menuItems.style.display = 'none';
            }
          },
          { once: true }
        );
      } else {
        menuItems.style.display = 'flex';
        requestAnimationFrame(() => {
          menuItems.classList.add('show');
        });
      }
    });
  }
}

// EmailJS
const initEmailjs = () => {
  if (!contactForm){
    return; 
  } 

  (function () {
    emailjs.init('XhQeCvEOTfzUU0krZ');
  })();

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_qmrtn7u', 'template_lcxhib4', this).then(
      () => {
        alert('Message sent successfully!');
        this.reset();
      },
      (error) => {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS Error: ', error);
      }
    );
  });
}

// Main Function
const initSite = () => {
  introTransition();
  navbarAnimation();
  initEmailjs();
}

document.addEventListener('DOMContentLoaded', initSite);
