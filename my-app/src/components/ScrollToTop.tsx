import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * react-router's BrowserRouter doesn't reset scroll position on navigation
 * (unlike full page loads), so without this, navigating to a new route keeps
 * whatever scroll offset the previous page was at. Mount once near the router.
 *
 * Disabling native scrollRestoration is required too: the browser's own
 * "auto" restoration otherwise fights our reset — e.g. reloading, or
 * revisiting a route already in this tab's history, snaps scroll back to
 * wherever it was last left on that URL, overriding the scrollTo(0, 0) below.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
