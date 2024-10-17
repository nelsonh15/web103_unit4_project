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

export const createCar = async (name, price, exterior_id, interior_id, hood_id, spoiler_id, wheels_id, exteriorsName, interiorsName, hoodsName, spoilersName, wheelsName) => {
  try {
    const data = {
      name: name, 
      price: price, 
      exterior_id: exterior_id, 
      interior_id: interior_id, 
      hood_id: hood_id, 
      spoiler_id: spoiler_id, 
      wheels_id: wheels_id,
      exterior_name: exteriorsName, 
      interior_name: interiorsName, 
      hood_name: hoodsName, 
      spoiler_name: spoilersName, 
      wheels_name: wheelsName
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    const response = fetch(`/cars`, options)
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
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = fetch(`/cars/${id}`, options)
    return response;
  }
  catch (error) {
    console.error(`Error deleting car with id: ${id}`, error);
  }
};

export const editCar = async (id) => {
  try {

  }
  catch (error) {

  }
};