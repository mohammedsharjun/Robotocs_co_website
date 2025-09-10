import { FadeUpSection } from '../../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Newsletter() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if popup has already been shown on this specific page
    const popupKey = `newsletterPopupShown_${location.pathname}`;
    const hasShownPopup = sessionStorage.getItem(popupKey);
    
    if (!hasShownPopup) {
      // Show popup after 60 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
        // Mark as shown for this specific page in session storage
        sessionStorage.setItem(popupKey, 'true');
      }, 60000); // 60 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [location.pathname]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <section className="w-full flex justify-center items-center pb-4 sm:pb-6 md:pb-8 lg:pb-12 px-2 sm:px-4 md:px-6 lg:px-0">
      <FadeUpSection className="w-full max-w-full h-auto min-h-[400px] sm:min-h-[400px] md:min-h-[450px] bg-gradient-to-bl from-[#0077b3] via-[#00bfff] to-[#EAF6FF] flex flex-col items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 shadow-lg rounded-xl sm:rounded-2xl">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center mb-4 sm:mb-6 lg:mb-0 w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-2 sm:mb-3 px-2 sm:px-0">
            Subscribe to our newsletter
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> </span>
            for the latest in robotics & automation!
          </h2>
          
          {/* Benefits Grid - Responsive Layout */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 text-white text-xs sm:text-sm md:text-base mb-3 sm:mb-4 w-full max-w-sm sm:max-w-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-blue-400 text-sm sm:text-base">✓</span>
              <span className="leading-tight">Industry news & trends</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-blue-400 text-sm sm:text-base">✓</span>
              <span className="leading-tight">Product updates</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-blue-400 text-sm sm:text-base">✓</span>
              <span className="leading-tight">Automation tips</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-blue-400 text-sm sm:text-base">✓</span>
              <span className="leading-tight">Exclusive offers</span>
            </div>
          </div>
          
          {/* Email Form - Stacked on mobile, side-by-side on larger screens */}
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 w-full max-w-xs sm:max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow text-sm sm:text-base border-0"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow hover:bg-blue-600 transition text-sm sm:text-base whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        
        {/* Right Side - Avatar Stack and Stats */}
        <div className="flex-1 flex flex-col items-center justify-center mt-4 sm:mt-6 lg:mt-0 relative w-full">
          {/* Avatar Stack - Responsive sizing and positioning */}
          <div className="flex items-center justify-center mb-2 sm:mb-3 relative w-28 sm:w-32 md:w-40 lg:w-48 h-14 sm:h-16 md:h-20 lg:h-24">
            {/* Avatar 1 - Left */}
            <div className="absolute left-0 top-3 sm:top-4 md:top-6 lg:top-8 z-10">
              <div className="relative">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  loading="lazy"
                  alt="User 1" 
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 border-white shadow" 
                />
                <span className="absolute -top-1 sm:-top-1.5 -left-1 sm:-left-1.5 bg-pink-500 text-white rounded-full p-0.5 sm:p-1 text-xs">
                  <svg width="10" height="10" className="sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24">
                    <path d="M12 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2a2 2 0 0 0 2 2zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Avatar 2 - Center */}
            <div className="absolute left-12 sm:left-14 md:left-16 lg:left-20 xl:left-24 top-0 z-20">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                loading="lazy"
                alt="User 2" 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white shadow" 
              />
            </div>
            
            {/* Avatar 3 - Right */}
            <div className="absolute left-16 sm:left-18 md:left-20 lg:left-28 xl:left-32 top-4 sm:top-5 md:top-6 lg:top-8 xl:top-12 z-30">
              <div className="relative">
                <img 
                  src="https://randomuser.me/api/portraits/men/33.jpg" 
                  loading="lazy"
                  alt="User 3" 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full border-2 border-white shadow" 
                />
                <span className="absolute -top-1 sm:-top-1.5 -right-1 sm:-right-1.5 bg-pink-500 text-white rounded-full p-0.5 sm:p-1 text-xs">
                  <svg width="12" height="12" className="sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24">
                    <path d="M19.43 12.98a2 2 0 0 0 0-1.96l-1.11-1.93a2 2 0 0 0-2.45-.91l-1.06.43a2 2 0 0 1-2.18-.45l-.8-.8a2 2 0 0 1-.45-2.18l.43-1.06a2 2 0 0 0-.91-2.45l-1.93-1.11a2 2 0 0 0-1.96 0l-1.93 1.11a2 2 0 0 0-.91 2.45l.43 1.06a2 2 0 0 1-.45 2.18l-.8.8a2 2 0 0 1-2.18.45l-1.06-.43a2 2 0 0 0-2.45.91l-1.11 1.93a2 2 0 0 0 0 1.96l1.11 1.93a2 2 0 0 0 2.45.91l1.06-.43a2 2 0 0 1 2.18.45l.8.8a2 2 0 0 1 .45 2.18l-.43 1.06a2 2 0 0 0 .91 2.45l1.93 1.11a2 2 0 0 0 1.96 0l1.93-1.11a2 2 0 0 0 .91-2.45l-.43-1.06a2 2 0 0 1 .45-2.18l.8-.8a2 2 0 0 1 2.18-.45l1.06.43a2 2 0 0 0 2.45-.91l1.11-1.93z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          {/* Stats - Responsive text sizing */}
          <div className="flex items-end gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">20k+</span>
            <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1 sm:mb-2 leading-tight">Epic Machines made</span>
          </div>
                 </div>
       </FadeUpSection>
     </section>

     {/* Newsletter Popup */}
     {showPopup && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
           {/* Close Button */}
           <div className="flex justify-end p-4">
             <button
               onClick={closePopup}
               className="text-gray-500 hover:text-gray-700 transition-colors"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>

           {/* Popup Content */}
           <div className="px-6 pb-6">
             <div className="bg-gradient-to-bl from-[#0077b3] via-[#00bfff] to-[#EAF6FF] rounded-xl p-6 text-center">
               <h2 className="text-xl font-bold text-white mb-6">
                 Join 20k+ Epic Machines Community
               </h2>
               
               {/* Avatar Stack */}
               <div className="flex items-center justify-center mb-4 relative w-32 h-16">
                 {/* Avatar 1 - Left */}
                 <div className="absolute left-0 top-2 z-10">
                   <div className="relative">
                     <img 
                       src="https://randomuser.me/api/portraits/women/44.jpg" 
                       loading="lazy"
                       alt="User 1" 
                       className="w-8 h-8 rounded-full border-2 border-white shadow" 
                     />
                     <span className="absolute -top-1 -left-1 bg-pink-500 text-white rounded-full p-0.5 text-xs">
                       <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                         <path d="M12 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2a2 2 0 0 0 2 2zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z" fill="currentColor"/>
                       </svg>
                     </span>
                   </div>
                 </div>
                 
                 {/* Avatar 2 - Center */}
                 <div className="absolute left-12 top-0 z-20">
                   <img 
                     src="https://randomuser.me/api/portraits/men/32.jpg" 
                     loading="lazy"
                     alt="User 2" 
                     className="w-10 h-10 rounded-full border-2 border-white shadow" 
                   />
                 </div>
                 
                 {/* Avatar 3 - Right */}
                 <div className="absolute left-16 top-2 z-30">
                   <div className="relative">
                     <img 
                       src="https://randomuser.me/api/portraits/men/33.jpg" 
                       loading="lazy"
                       alt="User 3" 
                       className="w-12 h-12 rounded-full border-2 border-white shadow" 
                     />
                     <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full p-0.5 text-xs">
                       <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                         <path d="M19.43 12.98a2 2 0 0 0 0-1.96l-1.11-1.93a2 2 0 0 0-2.45-.91l-1.06.43a2 2 0 0 1-2.18-.45l-.8-.8a2 2 0 0 1-.45-2.18l.43-1.06a2 2 0 0 0-.91-2.45l-1.93-1.11a2 2 0 0 0-1.96 0l-1.93 1.11a2 2 0 0 0-.91 2.45l.43 1.06a2 2 0 0 1-.45 2.18l-.8.8a2 2 0 0 1-2.18.45l-1.06-.43a2 2 0 0 0-2.45.91l-1.11 1.93a2 2 0 0 0 0 1.96l1.11 1.93a2 2 0 0 0 2.45.91l1.06-.43a2 2 0 0 1 2.18.45l.8.8a2 2 0 0 1 .45 2.18l-.43 1.06a2 2 0 0 0 .91 2.45l1.93 1.11a2 2 0 0 0 1.96 0l1.93-1.11a2 2 0 0 0 .91-2.45l-.43-1.06a2 2 0 0 1 .45-2.18l.8-.8a2 2 0 0 1 2.18-.45l1.06.43a2 2 0 0 0 2.45-.91l1.11-1.93z" fill="currentColor"/>
                       </svg>
                     </span>
                   </div>
                 </div>
               </div>
               
               {/* Stats */}
               <div className="flex items-end justify-center gap-2 mb-6">
                 <span className="text-white text-4xl font-bold">20k+</span>
                 <span className="text-white text-sm font-semibold mb-1">Epic Machines made</span>
               </div>
               
               {/* Email Form */}
               <form className="flex flex-col gap-3">
                 <input
                   type="email"
                   placeholder="Enter your email"
                   className="px-4 py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 border-0"
                 />
                 <button
                   type="submit"
                   className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-600 transition"
                 >
                   Subscribe
                 </button>
               </form>
             </div>
           </div>
         </div>
       </div>
     )}
   </>
 );
 }
