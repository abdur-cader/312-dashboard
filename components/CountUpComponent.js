"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function CountUpComponent({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    // trigger the count-up animation immediately on mount
    setStartCount(true);
  }, []);

  // Handle null/undefined/N/A
  if (value === null || value === undefined || value === "N/A") {
    return <span className={className}>N/A</span>;
  }

  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {startCount ? (
        <CountUp
          start={0}
          end={numericValue}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator=","
        />
      ) : (
        <span>
          0{prefix}
          {suffix}
        </span>
      )}
    </span>
  );
}
