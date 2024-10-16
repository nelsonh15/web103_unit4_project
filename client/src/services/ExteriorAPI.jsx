export const loadAllExteriors = async () => {
  try {
    const response = await fetch('/exterior');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading exteriors:', error);
  }
};