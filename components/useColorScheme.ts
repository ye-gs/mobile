type ColorSchemeName = "light" | "dark" | null | undefined;
export function useColorScheme(
  colorSchemeName: ColorSchemeName,
): ColorSchemeName {
  return colorSchemeName ?? "light";
}
