import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const CARD_WIDTH = 350; // Fixed width for all cards
const CARD_HEIGHT = 350; // Fixed height for all cards
const IMAGE_HEIGHT = 400; // Fixed height for all images
const IMAGE_WIDTH = 400; // Fixed width for all images

const CustomCard = styled(Card)(({ theme, selected }) => ({
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: selected ? `4px solid ${theme.palette.primary.main}` : '1px solid #ddd',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  backgroundColor: selected ? '#f5f5f5' : '#fff',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#e0e0e0',
  },
}));

const StyledCardActionArea = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%', // Slightly smaller than the card to ensure it's visibly centered
  height: '100%',
});

const ImageContainer = styled(Box)({
  height: IMAGE_HEIGHT,
  width: IMAGE_WIDTH,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginBottom: '16px', // Space between image and content
});

const StyledCardMedia = styled(CardMedia)({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

const ContentContainer = styled(CardContent)({
  width: '100%',
  textAlign: 'center',
});

function CustomItem({ item, selected, onSelect }) {
  return (
    
    <Box sx={{  display: 'flex', justifyContent: 'center' }}>
      <CustomCard selected={selected}>
        <StyledCardActionArea onClick={() => onSelect(item.id)}>
          <ImageContainer>
            <StyledCardMedia
              component="img"
              image={item.image}
              alt={item.name}
            />
          </ImageContainer>
          <ContentContainer>
            <Typography sx={{ fontSize: '1vw' }} variant="h6" component="div" >
              {item.name}
            </Typography>
            <Typography sx={{ fontSize: '0.8vw' }} variant="h6" color="text.secondary">
              Price: ${item.price}
            </Typography>
          </ContentContainer>
        </StyledCardActionArea>
      </CustomCard>
    </Box>
  );
}

CustomItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CustomItem;