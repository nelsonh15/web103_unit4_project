import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { loadAllCars, deleteCar } from '../services/CarsAPI';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { List, ListItem } from '@mui/joy';
import CustomCar from '../components/CustomCar';

const ViewCars = () => {
  const navigate = useNavigate();
  const [allCars, setAllCars] = useState([]);
  
  useEffect(() => {
    const getAllCars = async () => {
      try {
        const carsData = await loadAllCars();
        setAllCars(carsData);
      }
      catch (error) {
        throw error
      }
    }
    getAllCars();
  }, [])

  const viewCarHandler = async (id) => {
    const selectedCar = allCars.find(car => car.id === id);

    if (selectedCar) {
      navigate(`/customcars/${id}`, { state: { car: selectedCar } });
    } else {
      console.error('Car not found');
    }
  }

  const deleteCarHandler = async (id) => {
    const response = await deleteCar(id);
    if (response.ok) {
      console.log('Car deleted!');
      setAllCars(prevCars => prevCars.filter(car => car.id !== id));
    }
    else {
      console.error("Error deleting cars!", response);
    }
  }

  return (
    <div>
      <Box sx={{ padding: '2vw', }}>
        {allCars.map((car) => (
          <Box key={car.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '20px',
              width: '100%',
              alignItems: 'center'
            }}>
            <CustomCar
              id={car.id}
              name={car.name}
              price={car.price}
              exterior={car.exterior_name}
              interior={car.interior_name}
              hood={car.hood_name}
              spoiler={car.spoiler_name}
              wheels={car.wheels_name}
              viewCarHandler={viewCarHandler}
              deleteCarHandler={deleteCarHandler}
            />
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default ViewCars