import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useNewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has already subscribed
    const isSubscribed = localStorage.getItem('newsletterSubscribed') === 'true';
    // Check if popup has already been shown on this specific page
    const popupKey = `newsletterPopupShown_${location.pathname}`;
    const hasShownPopup = sessionStorage.getItem(popupKey);
    
    if (!isSubscribed && !hasShownPopup) {
      // Show popup after 60 seconds for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
        // Mark as shown for this specific page in session storage
        sessionStorage.setItem(popupKey, 'true');
      }, 60000); // 60 seconds delay

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    showPopup,
    closePopup
  };
} 