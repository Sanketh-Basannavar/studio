
'use client';

import { useState, useEffect, useCallback } from 'react';
// We will import db dynamically inside the hook
import { getFirestore } from 'firebase/firestore';
import { app, disableNetwork, enableNetwork } from '@/lib/firebase';

export function useOfflineSync() {
  const [isOffline, setIsOffline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        const offlineStatus = localStorage.getItem('offline-mode') === 'true';
        setIsOffline(offlineStatus);
    }
  }, []);

  const setOfflineMode = useCallback((offline: boolean) => {
    if (!isMounted) return;

    // Dynamically get db instance on the client
    const db = getFirestore(app);

    setIsOffline(offline);
    if (typeof window !== 'undefined') {
        localStorage.setItem('offline-mode', String(offline));
    }
    if (offline) {
      disableNetwork(db).catch(err => console.error("Failed to disable network", err));
    } else {
      enableNetwork(db).catch(err => console.error("Failed to enable network", err));
    }
  }, [isMounted]);

  return { isOffline, setOfflineMode };
}
