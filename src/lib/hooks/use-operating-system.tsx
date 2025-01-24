import { useEffect, useState } from "react";

export function useOperatingSystem() {
  const [os, setOS] = useState<
    "Windows" | "MacOS" | "Linux" | "Android" | "iOS" | "Unknown"
  >("Unknown");

  useEffect(() => {
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.includes("Win")) {
        return "Windows";
      }
      if (userAgent.includes("Mac")) {
        return "MacOS";
      }
      if (userAgent.includes("Linux")) {
        return "Linux";
      }
      if (userAgent.includes("Android")) {
        return "Android";
      }
      if (userAgent.includes("like Mac")) {
        return "iOS";
      }
      return "Unknown";
    };

    // Initial detection
    setOS(detectOS());
  }, []);

  return {
    os,
    isWindows: os === "Windows",
    isMacOS: os === "MacOS",
    isLinux: os === "Linux",
    isAndroid: os === "Android",
    isIOS: os === "iOS",
  };
}
