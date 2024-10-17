import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { List, ListItem } from '@mui/joy';

function CustomCar({ id, name, price, exterior, interior, hood, spoiler, wheels, deleteCarHandler}) {
  const image = "https://boltbucket.up.railway.app/assets/convertible-d1e22bba.png";

  return (
    <Card variant="outlined" sx={{ maxWidth: '80vw', display: 'flex', width: '100%', boxShadow: 3 }}>
      <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'center', width: '20%', padding: 3, }}>
        <img alt="selfie" src={image} style={{
          borderRadius: '90%',
          width: '10vw',
          height: '10vw',
          border: '2px solid black',
          objectFit: 'cover',
          objectPosition: 'center ',
        }} />
      </Box>
      <CardContent style={{ flex: 2 }}>
        <Typography sx={{ mb: 1, fontSize: { xs: '3.5vw', sm: '3.2vw', md: '3vw', lg: '3vw', xl: '2.5vw' }, }} variant="h3" component="div">
          {name}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: { xs: '2.25vw', sm: '1.5vw', md: '1.25vw' } }} color="text.secondary">
          ${price}
        </Typography>
        <List marker="disc" sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row', md: 'row' },
          flexWrap: 'wrap',
          columnGap: { xs: '5vw', sm: '3vw', md: '1.5vw' },
          rowGap: 0,
          paddingTop: 0
        }}>
          <ListItem sx={{ fontSize: { xs: '2vw', sm: '1.5vw', md: '0.8vw' }, }}>
            <Typography sx={{ color: 'black', textTransform: 'none', fontSize: { xs: '2.25vw', sm: '1.5vw', md: '1vw', lg: '1vw', xl: '1vw' } }}>
              <span style={{ fontWeight: 'bold' }}>Exterior:</span> <span style={{ textTransform: 'uppercase' }}>{exterior}</span>
            </Typography>
          </ListItem>

          <ListItem sx={{ fontSize: { xs: '2vw', sm: '1.5vw', md: '0.8vw' }, }}>
            <Typography sx={{ color: 'black', textTransform: 'none', fontSize: { xs: '2.25vw', sm: '1.5vw', md: '1vw', lg: '1vw', xl: '1vw' } }}>
              <span style={{ fontWeight: 'bold' }}>Interior:</span> <span style={{ textTransform: 'uppercase' }}>{interior}</span>
            </Typography>
          </ListItem>

          <ListItem sx={{ fontSize: { xs: '2vw', sm: '1.5vw', md: '0.8vw' }, }}>
            <Typography sx={{ color: 'black', textTransform: 'none', fontSize: { xs: '2.25vw', sm: '1.5vw', md: '1vw', lg: '1vw', xl: '1vw' } }}>
              <span style={{ fontWeight: 'bold' }}>Hood:</span> <span style={{ textTransform: 'uppercase' }}>{hood}</span>
            </Typography>
          </ListItem>

          <ListItem sx={{ fontSize: { xs: '2vw', sm: '1.5vw', md: '0.8vw' }, }}>
            <Typography sx={{ color: 'black', textTransform: 'none', fontSize: { xs: '2.25vw', sm: '1.5vw', md: '1vw', lg: '1vw', xl: '1vw' } }}>
              <span style={{ fontWeight: 'bold' }}>Spoiler:</span> <span style={{ textTransform: 'uppercase' }}>{spoiler}</span>
            </Typography>
          </ListItem>

          <ListItem sx={{ fontSize: { xs: '2vw', sm: '1.5vw', md: '0.8vw' }, }}>
            <Typography sx={{ color: 'black', textTransform: 'none', fontSize: { xs: '2.25vw', sm: '1.5vw', md: '1vw', lg: '1vw', xl: '1vw' } }}>
              <span style={{ fontWeight: 'bold' }}>Wheels:</span> <span style={{ textTransform: 'uppercase' }}>{wheels}</span>
            </Typography>
          </ListItem>
        </List>

      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '25%', padding: 3 }}>
        <Button variant="contained" sx={{ fontSize: '1vw', minWidth: '150px' }}>
          Edit
        </Button>
        <Button variant="contained" sx={{ fontSize: '1vw', minWidth: '150px', mt: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            deleteCarHandler(id)
          }}>
          Delete
        </Button>
      </Box>

    </Card>
  );
}

export default CustomCar;