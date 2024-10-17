export const loadAllExteriors = async () => {
  try {
    const response = await fetch('/exterior');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading exteriors:', error);
  }
};

export const getExteriorById = async (id) => {
  try {
    const response = await fetch(`/exterior/${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Error loading exterior with id: ${id}`, error);
  }
};