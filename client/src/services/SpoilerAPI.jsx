export const loadAllSpoilers = async () => {
  try {
    const response = await fetch('/spoiler');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading spoilers:', error);
  }
};

export const getSpoilerById = async (id) => {
  try {
    const response = await fetch(`/spoiler/${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Error loading spoiler with id: ${id}`, error);
  }
};