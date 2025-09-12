import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

export function useNewsletterPopup(delay = 60000) {
  const [showPopup, setShowPopup] = useState(false);
  // const location = useLocation();
  useEffect(() => {
    // Check if user has already subscribed
    const isSubscribed = localStorage.getItem('newsletterSubscribed') === 'true';

    // Check if popup has already been shown on this specific page
    // const popupKey = `newsletterPopupShown_${location.pathname}`;
    const hasShown = sessionStorage.getItem('newsletterPopupShown');
    
    if (!isSubscribed && !hasShown) {
      // Show popup after 60 seconds for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
     
        // Mark as shown for this specific page in session storage
        sessionStorage.setItem('newsletterPopupShown', 'true');
      }, delay); // 60 seconds delay

      return () => clearTimeout(timer);
    }
  }, [delay]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    showPopup,
    closePopup
  };
} 