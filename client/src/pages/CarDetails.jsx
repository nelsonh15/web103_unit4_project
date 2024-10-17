import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import { AspectRatio, Button, Card, CardContent, IconButton, List, ListItem, Typography } from '@mui/joy';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import '../App.css'
import { useLocation } from 'react-router-dom';
import { getExteriorById } from "../services/ExteriorAPI";
import { getInteriorById } from "../services/InteriorAPI";
import { getHoodById } from "../services/HoodAPI";
import { getSpoilerById } from "../services/SpoilerAPI";
import { getWheelsById } from "../services/WheelsAPI";

const CarDetails = () => {
  const location = useLocation();
  const [car, setCar] = useState(location.state?.car || JSON.parse(localStorage.getItem('car')));

  useEffect(() => {
    if (!car) return;
  
    if (
      car.exterior_image &&
      car.interior_image &&
      car.hood_image &&
      car.spoiler_image &&
      car.wheels_image
    ) {
      return; 
    }
  
    (async () => {
      try {
        const exteriorData = await getExteriorById(car.exterior_id);
        const interiorData = await getInteriorById(car.interior_id);
        const hoodData = await getHoodById(car.hood_id);
        const spoilerData = await getSpoilerById(car.spoiler_id);
        const wheelsData = await getWheelsById(car.wheels_id);
  
        setCar(prevCar => ({
          ...prevCar,
          exterior_image: exteriorData.image,
          exterior_price: exteriorData.price,
          interior_image: interiorData.image,
          interior_price: interiorData.price,
          hood_image: hoodData.image,
          hood_price: hoodData.price,
          spoiler_image: spoilerData.image,
          spoiler_price: spoilerData.price,
          wheels_image: wheelsData.image,
          wheels_price: wheelsData.price,
        }));
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    })();
  }, [car]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          mt: 5
        }}>

        <Card sx={{ width: 1500, height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', height: '100%' }}>
            <Box sx={{display: 'flex', flexDirection: 'center'}}>
              <CardContent orientation="horizontal">
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ mb: 1, color: 'black', fontSize: { xs: '3.5vw', sm: '3.2vw', md: '3vw', lg: '3vw', xl: '3.5vw' }, }} variant="h2" component="div">
                    {car.name}
                  </Typography>
                  <Typography sx={{ fontSize: 'xl', fontWeight: 'xl' }}>💰${car.price}</Typography>
                </Box>
              </CardContent>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', }}>
              <Card sx={{ width: 320, mb: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box>
                    <Typography sx={{ textTransform: 'uppercase', }} level="title-lg" >{car.exterior_name}</Typography>
                  </Box>
                  <AspectRatio minHeight="120px" maxHeight="200px" objectFit='cover'>
                    <img
                      src={car.exterior_image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="vertical">
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${car.exterior_price}</Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>

              <Card sx={{ width: 320, mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box>
                    <Typography sx={{ textTransform: 'uppercase', }} level="title-lg" >{car.interior_name}</Typography>
                  </Box>
                  <AspectRatio minHeight="120px" maxHeight="200px" objectFit='cover'>
                    <img
                      src={car.interior_image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="vertical">
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${car.interior_price}</Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card sx={{ width: 320 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box>
                    <Typography sx={{ textTransform: 'uppercase', }} level="title-lg" >{car.hood_name}</Typography>
                  </Box>
                  <AspectRatio minHeight="120px" maxHeight="200px" objectFit='cover'>
                    <img
                      src={car.hood_image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="vertical">
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${car.hood_price}</Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
              <Card sx={{ width: 320, mb: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box>
                    <Typography sx={{ textTransform: 'uppercase', }} level="title-lg" >{car.spoiler_name}</Typography>
                  </Box>
                  <AspectRatio minHeight="120px" maxHeight="200px" objectFit='cover'>
                    <img
                      src={car.spoiler_image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="vertical">
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${car.spoiler_price}</Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>

              <Card sx={{ width: 320, mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box>
                    <Typography sx={{ textTransform: 'uppercase', }} level="title-lg" >{car.wheels_name}</Typography>
                  </Box>
                  <AspectRatio minHeight="120px" maxHeight="200px" objectFit='cover'>
                    <img
                      src={car.wheels_image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="vertical">
                    <Box sx={{ paddingTop: 2 }}>
                      <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${car.wheels_price}</Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Box>

          </Box>
        </Card>
      </Box >
    </div >
  )
}

export default CarDetails