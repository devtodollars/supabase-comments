// Main library exports - these are packaged in your distributable
import "global.css";
export const isOdd = (n: number): boolean => {
  return !!(n & 1);
};
