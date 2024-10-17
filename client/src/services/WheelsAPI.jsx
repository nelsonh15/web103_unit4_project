export const loadAllWheels = async () => {
  try {
    const response = await fetch('/wheels');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading wheels:', error);
  }
};

export const getWheelsById = async (id) => {
  try {
    const response = await fetch(`/wheels/${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Error loading wheels with id: ${id}`, error);
  }
};