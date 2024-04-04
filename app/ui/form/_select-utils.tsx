export const MAX_HEIGHT_DROPDOWN = 300;

export function getDropdownDirection(dropdownRef: HTMLDivElement | null) {
  if (dropdownRef) {
    const rect = dropdownRef.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = MAX_HEIGHT_DROPDOWN; // ปรับตามความสูงจริงของ dropdown ของคุณ

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      return "up";
    } else {
      return "down";
    }
  } else {
    return "down";
  }
}
