export const loadAllHoods = async () => {
  try {
    const response = await fetch('/hood');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading hoods:', error);
  }
};

export const getHoodById = async (id) => {
  try {
    const response = await fetch(`/hood/${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Error loading hood with id: ${id}`, error);
  }
};