import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
}

const useScreenSize = (): ScreenSize => {
  //Conditionally set the initial state based on the window object availability as it is not available in the server side rendering
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => ({
    width: 0,
    height: 0,
  }));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Only attach event listener in the browser environment
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    setScreenSize({
      width: typeof window !== "undefined" ? window.innerWidth : 0,
      height: typeof window !== "undefined" ? window.innerHeight : 0,
    });
  }, []);

  return screenSize;
};

export default useScreenSize;
