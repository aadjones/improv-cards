import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const isTablet = screenWidth >= 768;
export const isLargeTablet = screenWidth >= 1024;

export const getCardGridColumns = () => {
  if (isLargeTablet) return 4;
  if (isTablet) return 3;
  return 2;
};

export const getCardWidth = () => {
  const columns = getCardGridColumns();
  const margin = 16;
  const totalMargin = margin * (columns + 1);
  return (screenWidth - totalMargin) / columns;
};

export const getFontSize = (base: number) => {
  if (isLargeTablet) return base * 1.2;
  if (isTablet) return base * 1.1;
  return base;
};

export const getSpacing = (base: number) => {
  if (isLargeTablet) return base * 1.5;
  if (isTablet) return base * 1.2;
  return base;
};

export const screenInfo = {
  width: screenWidth,
  height: screenHeight,
  isTablet,
  isLargeTablet,
};
