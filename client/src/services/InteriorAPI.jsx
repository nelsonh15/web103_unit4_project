export const loadAllInteriors = async () => {
  try {
    const response = await fetch('/interior');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading interiors:', error);
  }
};