export const loadAllRestrictions = async () => {
  try {
    const response = await fetch('/restriction');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading restrictions:', error);
  }
};