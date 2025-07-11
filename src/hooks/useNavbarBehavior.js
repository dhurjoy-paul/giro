import { useCallback, useEffect, useState } from "react";

export default function useNavbarBehavior() {
  const NAVBAR_HEIGHT = 80;
  const SCROLL_THRESHOLD = 80;

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  // Sync announcement on mount
  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (!dismissed) {
      setShowAnnouncement(true);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;

    setIsAtTop(currentScrollY <= SCROLL_THRESHOLD);

    if (currentScrollY < NAVBAR_HEIGHT) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(!isScrollingDown);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    setLastScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    isNavbarVisible,
    isAtTop,
    showAnnouncement,
    setShowAnnouncement,
  };
}
