//เช็คว่าใช่ "true" หรือ "false" หรือไม่ฃ
export function isBooleanString(value: string): boolean {
  return value === "true" || value === "false";
}

export function convertStringToBoolean(value: string): boolean {
  return value === "true";
}