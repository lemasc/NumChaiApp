import React from "react";
import { SWRConfig } from "swr";

export const swrConfig: React.ComponentProps<typeof SWRConfig>["value"] = {
  provider: () => new Map(),
  isOnline() {
    /* Customize the network state detector */
    return true;
  },
  isVisible() {
    /* Customize the visibility state detector */
    return true;
  },
  initFocus(callback) {
    /* Register the listener with your state provider */
  },
  initReconnect(callback) {
    /* Register the listener with your state provider */
  },
};
