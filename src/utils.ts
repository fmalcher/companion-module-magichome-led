export interface RGBColors {
  red: number;
  green: number;
  blue: number;
}

export function RGBValueToColors(rgbValue: number | string | boolean | undefined): RGBColors {
  const value = Number(rgbValue);
  return {
    red: (value >> 16) & 0xff,
    green: (value >> 8) & 0xff,
    blue: value & 0xff
  };
}

export function colorsToRGBValue(colors: RGBColors): number {
  return ((colors.red & 0xff) << 16) | ((colors.green & 0xff) << 8) | (colors.blue & 0xff);
}
