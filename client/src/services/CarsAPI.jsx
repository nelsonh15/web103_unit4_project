export const loadAllCars = async () => {
  try {
    const response = await fetch('/cars');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading cars:', error);
  }
};

export const getCarById = async (id) => {
  try {
    const response = await fetch(`/cars/${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Error loading cars with id: ${id}`, error);
  }
};

export const createCar = async (name, price, exterior_id, interior_id, hood_id, spoiler_id, wheels_id) => {
  try {
    const data = {
      name: name, 
      price: price, 
      exterior_id: exterior_id, 
      interior_id: interior_id, 
      hood_id: hood_id, 
      spoiler_id: spoiler_id, 
      wheels_id: wheels_id
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    const response = fetch('/cars', options)
    if (response.ok) {
      return response;
    }
  }
  catch (error) {
    console.error(`Error adding cars`, error);
  }
};

export const deleteCar = async (id) => {
  try {

  }
  catch (error) {

  }
};

export const editCar = async (id) => {
  try {

  }
  catch (error) {

  }
};