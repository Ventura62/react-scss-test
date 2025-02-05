export const formatObject = (input) => {
  if (Array.isArray(input)) {
    return input.map(formatObject);
  } else if (input !== null && typeof input === "object") {
    const formatted = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        let value = input[key];
				if (camelCaseKey === "data" && typeof value === "string") {
          try {
            value = JSON.parse(value);
          } catch (e) {
            console.warn(`Failed to parse JSON for key: ${key}`, e);
          }
        }
        formatted[camelCaseKey] = formatObject(value);
      }
    }
    return formatted;
  }
  return input;
};

export const parsedDate = (datetime) => {
  const dateObj = new Date(datetime.split('.')[0]); 
  const formatted = dateObj.toISOString().slice(0, 19).replace('T', ' ')
  return formatted
} 

export const secondsToDHMS = (seconds) => {
  const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    return `${d} days, ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const capitalize = (str) => {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}