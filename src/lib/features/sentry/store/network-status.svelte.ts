function createNetworkStatusStore() {
  let online: boolean = $state(navigator.onLine);
  let updatedAt: number = $state(Date.now());

  return {
    get online() {
      return online;
    },
    get updatedAt() {
      return updatedAt;
    },
    updateStatus() {
      const newStatus = navigator.onLine;

      if (online === newStatus) {
        return;
      }

      online = newStatus;
      updatedAt = Date.now();
    },
  };
}

export const networkStatusStore = createNetworkStatusStore();
