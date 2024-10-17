export const loadAllInteriors = async () => {
  try {
    const response = await fetch('/interior');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading interiors:', error);
  }
};

export const getInteriorById = async (id) => {
  try {
    const response = await fetch(`/interior/${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Error loading interior with id: ${id}`, error);
  }
};