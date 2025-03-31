import { useEffect, useState } from "react";

type PerformanceType = {
  screenName: string;
};

export const useGetPerformance = ({ screenName }: PerformanceType) => {
  const startTime = performance.now();
  const [loadTime, setLoadTime] = useState("");

  const getPerformanceReport = () => {
    const endTime = window.performance.now();
    const timeToRender = endTime - startTime;
    const logMessage = `${screenName} Load Time: ${timeToRender.toFixed(
      0
    )} milliseconds`;

    setLoadTime(logMessage);
    console.log(logMessage);
  };

  useEffect(() => {
    getPerformanceReport();
  }, []);

  return {
    loadTime,
  };
};
