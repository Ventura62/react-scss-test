export const getColor = (colorName) => {
  const style = getComputedStyle(document.documentElement);
  return {
    "key": colorName,
    "value": style.getPropertyValue(`--bs-${colorName}`)?.trim() || ""
  }
}

export const primary = () => {
  return getColor('primary');
}

export const secondary = () => {
  return getColor('secondary');
}

export const success = () => {
  return getColor('success');
}

export const info = () => {
  return getColor('info');
}

export const warning = () => {
  return getColor('warning');
}

export const danger = () => {
  return getColor('danger');
}

export const primaryTextEmphasis = () => {
  return getColor('primary-text-emphasis');
}

export const secondaryTextEmphasis = () => {
  return getColor('secondary-text-emphasis');
}

export const successTextEmphasis = () => {
  return getColor('success-text-emphasis');
}

export const infoTextEmphasis = () => {
  return getColor('info-text-emphasis');
}

export const warningTextEmphasis = () => {
  return getColor('warning-text-emphasis');
}

export const dangerTextEmphasis = () => {
  return getColor('danger-text-emphasis');
}

export const gray_100 = () => {
  return getColor('gray-100');
}

export const gray_200 = () => {
  return getColor('gray-200');
}

export const gray_300 = () => {
  return getColor('gray-300');
}

export const gray_400 = () => {
  return getColor('gray-400');
}

export const gray_500 = () => {
  return getColor('gray-500');
}

export const gray_600 = () => {
  return getColor('gray-600');
}

export const gray_700 = () => {
  return getColor('gray-700');
}

export const gray_800 = () => {
  return getColor('gray-800');
}

export const gray_900 = () => {
  return getColor('gray-900');
}