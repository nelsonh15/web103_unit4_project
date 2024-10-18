import React, { useState, useEffect } from 'react'
import '../App.css'
import { editCar, getCarById } from '../services/CarsAPI';
import { useLocation } from 'react-router-dom';
import FormSubmitted from "../components/FormSubmitted";
import { calcprice } from '../utilities/calcprice';
import { loadAllExteriors } from '../services/ExteriorAPI';
import { loadAllInteriors } from '../services/InteriorAPI';
import { loadAllHoods } from '../services/HoodAPI';
import { loadAllSpoilers } from '../services/SpoilerAPI';
import { loadAllWheels } from '../services/WheelsAPI';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Chip, Divider, Paper, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CustomItem from '../components/CustomItem';
import { loadAllRestrictions } from '../services/RestrictionAPI';

const Root = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 116,
  height: 60,
  padding: theme.spacing(1),
  ...theme.typography.body2,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

const EditCar = () => {
  const location = useLocation();
  const [car, setCar] = useState(location.state?.car || JSON.parse(localStorage.getItem('car')));
  const theme = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState(0);
  const [carName, setCarName] = useState(car.name);
  const [price, setPrice] = useState(car.price);
  const [exteriors, setExteriors] = useState([]);
  const [interiors, setInteriors] = useState([]);
  const [hoods, setHoods] = useState([]);
  const [spoilers, setSpoilers] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [exteriorsName, setexteriorsName] = useState(car.exterior_name);
  const [interiorsName, setinteriorsName] = useState(car.interior_name);
  const [hoodsName, sethoodsName] = useState(car.hood_name);
  const [spoilersName, setspoilersName] = useState(car.spoiler_name);
  const [wheelsName, setwheelsName] = useState(car.wheels_name);
  const [exteriorsPrice, setexteriorsPrice] = useState(car.exterior_price);
  const [interiorsPrice, setinteriorsPrice] = useState(car.interior_price);
  const [hoodsPrice, sethoodsPrice] = useState(car.hood_price);
  const [spoilersPrice, setspoilersPrice] = useState(car.spoiler_price);
  const [wheelsPrice, setwheelsPrice] = useState(car.wheels_price);
  const [itemsSelected, setItemsSelected] = useState(
    new Map([["Exterior", car.exterior_price],
    ["Interior", car.interior_price],
    ["Hood", car.hood_price],
    ["Spoiler", car.spoiler_price],
    ["Wheel", car.wheels_price]])
  );
  const [selectedExteriorId, setSelectedExteriorId] = useState(car.exterior_id);
  const [selectedInteriorId, setSelectedInteriorId] = useState(car.interior_id);
  const [selectedHoodId, setSelectedHoodId] = useState(car.hood_id);
  const [selectedSpoilerId, setSelectedSpoilerId] = useState(car.spoiler_id);
  const [selectedWheelId, setSelectedWheelId] = useState(car.wheels_id);
  const [restriction, setRestriction] = useState(null);
  const [restrictedItems, setRestrictedItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  console.log(restrictedItems)
  useEffect(() => {
    const fetchCarData = async () => {
      const restrictionData = await loadAllRestrictions();
      setRestriction(restrictionData);
      const latestCar = await getCarById(car.id);
      setCar(latestCar);
      setSelectedExteriorId(latestCar.exterior_id);
      setSelectedInteriorId(latestCar.interior_id);
      setSelectedHoodId(latestCar.hood_id);
      setSelectedSpoilerId(latestCar.spoiler_id);
      setSelectedWheelId(latestCar.wheels_id);
      setPrice(latestCar.price);
      setexteriorsName(latestCar.exterior_name);
      setinteriorsName(latestCar.interior_name);
      sethoodsName(latestCar.hood_name);
      setspoilersName(latestCar.spoiler_name);
      setwheelsName(latestCar.wheels_name);
      setexteriorsPrice(latestCar.exterior_price);
      setinteriorsPrice(latestCar.interior_price);
      sethoodsPrice(latestCar.hood_price);
      setspoilersPrice(latestCar.spoiler_price);
      setwheelsPrice(latestCar.wheels_price);
    };
    fetchCarData();
  }, []);

  useEffect(() => {
    updateRestrictedItems();
  }, [selectedExteriorId, selectedInteriorId, selectedHoodId, selectedSpoilerId, selectedWheelId, restriction]);

  useEffect(() => {
    const updatedPrice = calcprice(itemsSelected);
    setPrice(updatedPrice);
  }, [itemsSelected]);

  useEffect(() => {
    (async () => {
      try {
        const [exteriorData, interiorData, hoodData, spoilersData, wheelsData] = await Promise.all([
          loadAllExteriors(),
          loadAllInteriors(),
          loadAllHoods(),
          loadAllSpoilers(),
          loadAllWheels()
        ]);
        setExteriors(exteriorData);
        setInteriors(interiorData);
        setHoods(hoodData);
        setSpoilers(spoilersData);
        setWheels(wheelsData);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isDataLoaded && restriction) {
      updateRestrictedItems();
    }
  }, [selectedExteriorId, selectedInteriorId, selectedHoodId, selectedSpoilerId, selectedWheelId, restriction, isDataLoaded]);

  useEffect(() => {
    const updatedPrice = calcprice(itemsSelected);
    setPrice(updatedPrice);
  }, [itemsSelected]);

  const updateRestrictedItems = () => {
    if (!restriction || !isDataLoaded) return;

    const newRestrictedItems = [];
    restriction.forEach(r => {
      const selectedItems = {
        exterior_id: selectedExteriorId,
        interior_id: selectedInteriorId,
        hood_id: selectedHoodId,
        spoiler_id: selectedSpoilerId,
        wheels_id: selectedWheelId
      };

      let isRestrictionActive = false;
      Object.entries(selectedItems).forEach(([key, value]) => {
        if (r[key] === value && value !== null) {
          isRestrictionActive = true;
        }
      });

      if (isRestrictionActive) {
        Object.entries(r).forEach(([key, value]) => {
          if (value !== null && key !== 'id' && selectedItems[key] !== value) {
            const category = key.replace('_id', '');
            const itemName = getItemName(category, value);
            newRestrictedItems.push({ category, id: value, name: itemName });
          }
        });
      }
    });
    setRestrictedItems(newRestrictedItems);
    updateSnackbarMessage(newRestrictedItems);
  };

  const getItemName = (category, id) => {
    let items;
    switch (category) {
      case 'exterior':
        items = exteriors;
        break;
      case 'interior':
        items = interiors;
        break;
      case 'hood':
        items = hoods;
        break;
      case 'spoiler':
        items = spoilers;
        break;
      case 'wheels':
        items = wheels;
        break;
      default:
        return 'Unknown';
    }
    const item = items.find(item => item.id === id);
    return item ? item.name : 'Unknown';
  };

  const updateSnackbarMessage = (newRestrictedItems) => {
    if (newRestrictedItems.length > 0) {
      const itemsList = newRestrictedItems.map(item => `${item.name} (${item.category})`).join(', ');
      setSnackbarMessage(`The following items are now restricted: ${itemsList}`);
      setSnackbarOpen(true);
    }
  };

  const handleItemSelect = (category, id) => {
    if (isItemRestricted(category, id)) {
      return; // Don't allow selection of restricted items
    }

    let updatedItemsSelected = new Map(itemsSelected);
    let nameSetterFunc, priceSetterFunc, idSetterFunc, items;
    updateRestrictedItems();

    switch (category) {
      case 'exterior':
        nameSetterFunc = setexteriorsName;
        priceSetterFunc = setexteriorsPrice;
        idSetterFunc = setSelectedExteriorId;
        items = exteriors;
        break;
      case 'interior':
        nameSetterFunc = setinteriorsName;
        priceSetterFunc = setinteriorsPrice;
        idSetterFunc = setSelectedInteriorId;
        items = interiors;
        break;
      case 'hood':
        nameSetterFunc = sethoodsName;
        priceSetterFunc = sethoodsPrice;
        idSetterFunc = setSelectedHoodId;
        items = hoods;
        break;
      case 'spoiler':
        nameSetterFunc = setspoilersName;
        priceSetterFunc = setspoilersPrice;
        idSetterFunc = setSelectedSpoilerId;
        items = spoilers;
        break;
      case 'wheels':
        nameSetterFunc = setwheelsName;
        priceSetterFunc = setwheelsPrice;
        idSetterFunc = setSelectedWheelId;
        items = wheels;
        break;
    }

    const selectedItem = items.find(item => item.id === id);
    if (selectedItem) {
      nameSetterFunc(selectedItem.name);
      priceSetterFunc(selectedItem.price);
      idSetterFunc(id);
      updatedItemsSelected.set(category, selectedItem.price);
      setItemsSelected(updatedItemsSelected);
    }
    setSnackbarOpen(true);
  };

  const isItemRestricted = (category, id) => {
    return restrictedItems.some(item => item.category === category && item.id === id);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // for the tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCarNameChange = (event) => {
    setCarName(event.target.value); // Update the car name state on input change
  };

  const handleSubmit = async () => {
    await editCar(
      carName,
      price,
      selectedExteriorId,
      selectedInteriorId,
      selectedHoodId,
      selectedSpoilerId,
      selectedWheelId,
      exteriorsName,
      interiorsName,
      hoodsName,
      spoilersName,
      wheelsName,
      exteriorsPrice,
      interiorsPrice,
      hoodsPrice,
      spoilersPrice,
      wheelsPrice,
      car.id
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <div>
      <Box sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'gray',
        paddingLeft: 3
      }}>
        <label style={{ padding: 10, color: 'black' }}>Car Name: </label>
        <input disabled type="text" value={carName} onChange={handleCarNameChange}
          style={{
            width: '40%',
            height: '40px',
            marginTop: 22,
            background: 'white',
            color: 'black'
          }}
        />
        <Button variant="contained" onClick={handleSubmit} >Update</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', mt: 3 }}>
        <Box sx={{
          bgcolor: '#c2c2c2',
          width: '60%',
          height: '50vh',
        }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Exterior" {...a11yProps(0)} />
            <Tab label="Interior" {...a11yProps(1)} />
            <Tab label="Hood" {...a11yProps(2)} />
            <Tab label="Spoiler" {...a11yProps(3)} />
            <Tab label="Wheels" {...a11yProps(4)} />
          </Tabs>
          <Box
            sx={{
              gap: 2, // Spacing between grid items
              justifyItems: 'center', // Center each item horizontally
              mt: 1,
              height: '100%',
              overflow: 'auto',
              backgroundColor: 'black',
            }}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',  // 3 items per row
                  gap: '16px',  // spacing between items
                  justifyItems: 'center',
                }}>
                {exteriors.map((exterior) => (
                  <CustomItem
                    key={exterior.id}
                    item={exterior}
                    selected={exterior.id === selectedExteriorId}
                    onSelect={handleItemSelect}
                    isRestricted={isItemRestricted('exterior', exterior.id)}
                    category="exterior"
                  />
                ))}
              </Box>
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',  // 3 items per row
                  gap: '16px',  // spacing between items
                  justifyItems: 'center',
                }}>
                {interiors.map((interior) => (
                  <CustomItem
                    key={interior.id}
                    item={interior}
                    selected={interior.id === selectedInteriorId}
                    onSelect={handleItemSelect}
                    isRestricted={isItemRestricted('interior', interior.id)}
                    category="interior"
                  />
                ))}
              </Box>
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',  // 3 items per row
                  gap: '16px',  // spacing between items
                  justifyItems: 'center',
                }}>
                {hoods.map((hood) => (
                  <CustomItem
                    key={hood.id}
                    item={hood}
                    selected={hood.id === selectedHoodId}
                    onSelect={handleItemSelect}
                    isRestricted={isItemRestricted('hood', hood.id)}
                    category="hood"
                  />
                ))}
              </Box>
            </TabPanel>

            <TabPanel value={value} index={3} dir={theme.direction}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',  // 3 items per row
                  gap: '16px',  // spacing between items
                  justifyItems: 'center',
                }}>
                {spoilers.map((spoiler) => (
                  <CustomItem
                    key={spoiler.id}
                    item={spoiler}
                    selected={spoiler.id === selectedSpoilerId}
                    onSelect={handleItemSelect}
                    isRestricted={isItemRestricted('spoiler', spoiler.id)}
                    category="spoiler"
                  />
                ))}
              </Box>
            </TabPanel>

            <TabPanel value={value} index={4} dir={theme.direction}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',  // 3 items per row
                  gap: '16px',  // spacing between items
                  justifyItems: 'center',
                }}>
                {wheels.map((wheel) => (
                  <CustomItem
                    key={wheel.id}
                    item={wheel}
                    selected={wheel.id === selectedWheelId}
                    onSelect={handleItemSelect}
                    isRestricted={isItemRestricted('wheels', wheel.id)}
                    category="wheels"
                  />
                ))}
              </Box>
            </TabPanel>
          </Box>
        </Box>

        <Box sx={{
          backgroundColor: 'gray',
          padding: 2
        }}>
          <Root>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}>{exteriorsName} </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5, }}>
                <Typography sx={{ fontWeight: 'bold' }}>${exteriorsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Exterior" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}>{interiorsName} </Typography>
              </Box>
              <Box sx={{ paddingX: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>${interiorsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Interior" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}> {hoodsName} </Typography>
              </Box>
              <Box sx={{ paddingX: 5, }}>
                <Typography sx={{ fontWeight: 'bold' }}>${hoodsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Hood" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}> {spoilersName} </Typography>
              </Box>
              <Box sx={{ paddingX: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>${spoilersPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Spoiler" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16, }}> {wheelsName}</Typography>
              </Box>
              <Box sx={{ paddingX: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>${wheelsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Wheel" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h3" sx={{ color: 'orange' }}> Total Price</Typography>
              </Box>
              <DemoPaper square={false}>${price}</DemoPaper>
            </Box>

          </Root>
        </Box>
      </Box>
      <FormSubmitted open={submitted} setOpen={setSubmitted} message="Car Updated!" />
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default EditCar