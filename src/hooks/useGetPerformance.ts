import { useEffect } from "react";

export const useGetPerformance = () => {
  useEffect(() => {
    const perfObserver = new PerformanceObserver((observedEntries) => {
      const entry: PerformanceEntry =
        observedEntries.getEntriesByType("navigation")[0];
      console.log("pageload time: ", entry.duration);
    });

    perfObserver.observe({
      type: "navigation",
      buffered: true,
    });
  }, []);
};
