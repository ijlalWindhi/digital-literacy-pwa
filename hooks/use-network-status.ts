import { useState, useEffect } from "react";

interface NetworkStatus {
  isOnline: boolean;
  checkConnection: () => Promise<boolean>;
  lastChecked: Date | null;
}

/**
 * useNetworkStatus hook untuk mendeteksi status koneksi internet
 * @returns {NetworkStatus} Object berisi status koneksi dan fungsi untuk mengecek ulang
 * @example
 * const { isOnline, checkConnection, lastChecked } = useNetworkStatus();
 */
function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // Fungsi untuk mengecek koneksi dengan mencoba fetch resource kecil
  const checkConnection = async (): Promise<boolean> => {
    try {
      // Coba fetch favicon atau resource kecil lainnya
      const response = await fetch("/favicon.ico", {
        method: "HEAD",
        cache: "no-cache",
      });
      const online = response.ok;
      setIsOnline(online);
      setLastChecked(new Date());
      return online;
    } catch (error) {
      setIsOnline(false);
      setLastChecked(new Date());
      return false;
    }
  };

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);

    // Event handlers
    const handleOnline = () => {
      checkConnection(); // Verifikasi koneksi sebenarnya
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastChecked(new Date());
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    checkConnection();

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, checkConnection, lastChecked };
}

export default useNetworkStatus;
