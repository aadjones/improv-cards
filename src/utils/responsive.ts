import { useWindowDimensions } from 'react-native';

export function useResponsiveLayout() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const isTablet = screenWidth >= 768;
  const isLargeTablet = screenWidth >= 1024;

  const getCardGridColumns = () => {
    if (isLargeTablet) return 4;
    if (isTablet) return 3;
    return 2;
  };

  const getCardWidth = () => {
    const columns = getCardGridColumns();
    const margin = 16;
    const totalMargin = margin * (columns + 1);
    return (screenWidth - totalMargin) / columns;
  };

  const getFontSize = (base: number) => {
    if (isLargeTablet) return base * 1.2;
    if (isTablet) return base * 1.1;
    return base;
  };

  const getSpacing = (base: number) => {
    if (isLargeTablet) return base * 1.5;
    if (isTablet) return base * 1.2;
    return base;
  };

  return {
    screenWidth,
    screenHeight,
    isTablet,
    isLargeTablet,
    getCardGridColumns,
    getCardWidth,
    getFontSize,
    getSpacing,
  };
}

// Legacy exports for backward compatibility - these should be migrated to use the hook
// Deprecated: use useResponsiveLayout hook instead for dynamic updates
export const getCardWidth = () => {
  const margin = 16;
  const columns = 2; // fallback to mobile layout
  const screenWidth = 320; // fallback width
  const totalMargin = margin * (columns + 1);
  return (screenWidth - totalMargin) / columns;
};
