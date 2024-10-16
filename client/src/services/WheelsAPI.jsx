export const loadAllWheels = async () => {
  try {
    const response = await fetch('/wheels');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading wheels:', error);
  }
};