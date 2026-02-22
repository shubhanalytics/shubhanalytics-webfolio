(function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal');

  const autoplayVideos = document.querySelectorAll('video');

  function ensureAutoplay(video) {
    video.removeAttribute('controls');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
    video.setAttribute('disablepictureinpicture', '');
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        // Playback can be blocked until a user gesture on some mobile browsers.
      });
    }
  }

  if (autoplayVideos.length > 0) {
    autoplayVideos.forEach(function (video) {
      ensureAutoplay(video);

      video.addEventListener('loadedmetadata', function () {
        ensureAutoplay(video);
      });

      video.addEventListener('canplay', function () {
        ensureAutoplay(video);
      });
    });

    document.addEventListener(
      'visibilitychange',
      function () {
        if (!document.hidden) {
          autoplayVideos.forEach(function (video) {
            ensureAutoplay(video);
          });
        }
      },
      { passive: true }
    );

    document.addEventListener(
      'touchstart',
      function () {
        autoplayVideos.forEach(function (video) {
          ensureAutoplay(video);
        });
      },
      { passive: true }
    );
  }

  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
      );

      revealElements.forEach(function (node) {
        observer.observe(node);
      });
    } else {
      revealElements.forEach(function (node) {
        node.classList.add('visible');
      });
    }
  }

  const activePath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-links] a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === activePath) {
      link.classList.add('active');
    }
  });

  const businessLinks = document.querySelectorAll('[data-business-link]');
  const redirectMessage = document.getElementById('business-redirect-message');

  businessLinks.forEach(function (businessLink) {
    businessLink.addEventListener('click', function (event) {
      event.preventDefault();
      if (businessLink.dataset.pendingRedirect === 'true') {
        return;
      }

      businessLink.dataset.pendingRedirect = 'true';
      const targetUrl = businessLink.getAttribute('data-redirect-url') || businessLink.getAttribute('href');

      if (redirectMessage) {
        redirectMessage.textContent = 'Redirecting to NutriVerse in a new tab in 3 seconds...';
      }

      window.setTimeout(function () {
        window.open(targetUrl, '_blank', 'noopener');
        businessLink.dataset.pendingRedirect = 'false';
        if (redirectMessage) {
          redirectMessage.textContent = '';
        }
      }, 3000);
    });
  });

  // Quote of the Day
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your limitation—it's only your imagination. Push beyond it.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Believe it. Build it.", author: "Unknown" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "Little things make big days.", author: "Unknown" },
    { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
    { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
    { text: "Do what you have to do, to do what you want to do.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" }
  ];

  function displayRandomQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var quote = quotes[randomIndex];
    var quoteText = document.getElementById('quote-text');
    var quoteAuthor = document.getElementById('quote-author');
    
    if (quoteText && quoteAuthor) {
      quoteText.textContent = quote.text;
      quoteAuthor.textContent = '— ' + quote.author;
    }
  }

  // Call immediately and also on DOMContentLoaded to ensure it loads
  displayRandomQuote();
  
  window.addEventListener('load', displayRandomQuote);
})();
