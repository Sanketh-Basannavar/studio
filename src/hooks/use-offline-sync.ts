
'use client';

import { useState, useEffect, useCallback } from 'react';
import { disableNetwork, enableNetwork } from '@/lib/firebase';

export function useOfflineSync() {
  const [isOffline, setIsOffline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const offlineStatus = localStorage.getItem('offline-mode') === 'true';
    setIsOffline(offlineStatus);
  }, []);

  const setOfflineMode = useCallback((offline: boolean) => {
    if (!isMounted) return;

    setIsOffline(offline);
    localStorage.setItem('offline-mode', String(offline));
    if (offline) {
      disableNetwork(db).catch(err => console.error("Failed to disable network", err));
    } else {
      enableNetwork(db).catch(err => console.error("Failed to enable network", err));
    }
  }, [isMounted]);

  return { isOffline, setOfflineMode };
}
// Note: We need to import `db` from firebase, but because it's a server component context
// we have to be careful. The settings page which uses this is a client component, so it's fine.
import { db } from '@/lib/firebase';
