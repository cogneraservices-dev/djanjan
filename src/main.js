import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach((elem) => {
    observer.observe(elem);
  });

  // Mobile navigation menu toggle
  const menuBtn = document.querySelector('button.md\\:hidden');
  const navLinks = document.querySelector('.hidden.md\\:flex');

  if (menuBtn && navLinks) {
    const toggleMenu = () => {
      const isHidden = navLinks.classList.contains('hidden');
      if (isHidden) {
        navLinks.classList.remove('hidden');
        navLinks.classList.add('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-surface/95', 'backdrop-blur-2xl', 'p-6', 'border-b', 'border-white/10', 'shadow-2xl', 'z-50', 'gap-6');
      } else {
        navLinks.classList.add('hidden');
        navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-surface/95', 'backdrop-blur-2xl', 'p-6', 'border-b', 'border-white/10', 'shadow-2xl', 'z-50', 'gap-6');
      }
    };

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (!navLinks.classList.contains('hidden')) {
          toggleMenu();
        }
      });
    });
  }

  // Interactive Image Stack Card Cycling (Touch & Click Support)
  document.querySelectorAll('.image-stack-container').forEach(container => {
    const cycleStack = (e) => {
      e.preventDefault();
      const cards = Array.from(container.querySelectorAll('.stack-card'));
      if (cards.length < 2) return;

      const topCard = container.querySelector('.stack-card-top') || cards[cards.length - 1];

      // Slide top card out smoothly
      topCard.style.transform = 'translate3d(110%, -15px, 0) rotate(15deg)';
      topCard.style.opacity = '0';

      setTimeout(() => {
        // Move topCard to bottom of stack (first child)
        container.prepend(topCard);

        // Reset inline styles
        topCard.style.transform = '';
        topCard.style.opacity = '';

        // Re-calculate stack order and classes
        const updatedCards = Array.from(container.querySelectorAll('.stack-card'));
        updatedCards.forEach((card, index) => {
          card.classList.remove(
            'stack-card-top', 'rotate-0', 'scale-100', 'z-20', 'opacity-100',
            'border-white/30', 'border-white/20', 'border-white/15', 'border-white/50',
            'rotate-3', 'translate-y-3', 'scale-95', 'z-10', 'opacity-80',
            '-rotate-6', 'translate-y-6', 'scale-90', 'z-0', 'opacity-60'
          );

          if (index === updatedCards.length - 1) {
            // Front top card
            card.classList.add(
              'stack-card-top', 'border-white/30', 'rotate-0', 'scale-100', 'opacity-100', 'z-20',
              'group-hover:-translate-y-4', 'group-hover:scale-[1.03]', 'group-hover:border-white/50'
            );
          } else if (index === updatedCards.length - 2) {
            // Middle card
            card.classList.add(
              'border-white/20', 'rotate-3', 'translate-y-3', 'scale-95', 'opacity-80', 'z-10',
              'group-hover:translate-x-12', 'group-hover:rotate-12', 'group-hover:opacity-90', 'group-hover:scale-95'
            );
          } else {
            // Back bottom card
            card.classList.add(
              'border-white/15', '-rotate-6', 'translate-y-6', 'scale-90', 'opacity-60', 'z-0',
              'group-hover:-translate-x-12', 'group-hover:-rotate-12', 'group-hover:opacity-90', 'group-hover:scale-95'
            );
          }
        });
      }, 250);
    };

    container.addEventListener('click', cycleStack);
  });

  // Gallery Tab Switcher
  const tabPhotos = document.getElementById('tab-photos');
  const tabVideos = document.getElementById('tab-videos');
  const galleryPhotos = document.getElementById('gallery-photos');
  const galleryVideos = document.getElementById('gallery-videos');

  const switchTab = (tab) => {
    if (tab === 'photos') {
      // Highlight photos button
      tabPhotos.classList.add('bg-white', 'text-black', 'border-white');
      tabPhotos.classList.remove('bg-transparent', 'text-white/60', 'border-white/10');
      
      // Reset videos button
      tabVideos.classList.remove('bg-white', 'text-black', 'border-white');
      tabVideos.classList.add('bg-transparent', 'text-white/60', 'border-white/10');

      galleryVideos.classList.add('hidden');
      galleryPhotos.classList.remove('hidden');
    } else if (tab === 'videos') {
      // Highlight videos button
      tabVideos.classList.add('bg-white', 'text-black', 'border-white');
      tabVideos.classList.remove('bg-transparent', 'text-white/60', 'border-white/10');
      
      // Reset photos button
      tabPhotos.classList.remove('bg-white', 'text-black', 'border-white');
      tabPhotos.classList.add('bg-transparent', 'text-white/60', 'border-white/10');

      galleryPhotos.classList.add('hidden');
      galleryVideos.classList.remove('hidden');
    }
  };

  if (tabPhotos && tabVideos && galleryPhotos && galleryVideos) {
    tabPhotos.addEventListener('click', () => switchTab('photos'));
    tabVideos.addEventListener('click', () => switchTab('videos'));
  }

  // Smooth scroll and auto-tab switch for navigation links pointing to videos
  document.querySelectorAll('a[href="#videos"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
        switchTab('videos');
      }
    });
  });

  // Booking Form Submission via WhatsApp
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const eventType = document.getElementById('event-type')?.value?.trim() || '';
      const eventDate = document.getElementById('event-date')?.value?.trim() || '';
      const eventLocation = document.getElementById('event-location')?.value?.trim() || '';
      const eventMessage = document.getElementById('event-message')?.value?.trim() || '';

      let text = `Hi DJ Anjan! I would like to book an event.\n\n`;
      if (eventType) text += `*Event Type:* ${eventType}\n`;
      if (eventDate) text += `*Date:* ${eventDate}\n`;
      if (eventLocation) text += `*Venue Location:* ${eventLocation}\n`;
      if (eventMessage) text += `*Message:* ${eventMessage}\n`;

      const whatsappUrl = `https://wa.me/919148993037?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});
