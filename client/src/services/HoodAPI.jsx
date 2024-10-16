export const loadAllHoods = async () => {
  try {
    const response = await fetch('/hood');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading hoods:', error);
  }
};