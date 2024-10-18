import React, { useState, useEffect } from 'react'
import '../App.css'
import FormSubmitted from "../components/FormSubmitted";
import { createCar } from '../services/CarsAPI';
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

const CreateCar = () => {
  const theme = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [missingItem, setMissingItem] = useState(false);
  const [value, setValue] = useState(0);
  const [carName, setCarName] = useState('');
  const [price, setPrice] = useState(60000);
  const [exteriors, setExteriors] = useState([]);
  const [interiors, setInteriors] = useState([]);
  const [hoods, setHoods] = useState([]);
  const [spoilers, setSpoilers] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [exteriorsName, setexteriorsName] = useState("");
  const [interiorsName, setinteriorsName] = useState("");
  const [hoodsName, sethoodsName] = useState("");
  const [spoilersName, setspoilersName] = useState("");
  const [wheelsName, setwheelsName] = useState("");
  const [exteriorsPrice, setexteriorsPrice] = useState(0);
  const [interiorsPrice, setinteriorsPrice] = useState(0);
  const [hoodsPrice, sethoodsPrice] = useState(0);
  const [spoilersPrice, setspoilersPrice] = useState(0);
  const [wheelsPrice, setwheelsPrice] = useState(0);
  const [itemsSelected, setItemsSelected] = useState(new Map());
  const [selectedExteriorId, setSelectedExteriorId] = useState(null);
  const [selectedInteriorId, setSelectedInteriorId] = useState(null);
  const [selectedHoodId, setSelectedHoodId] = useState(null);
  const [selectedSpoilerId, setSelectedSpoilerId] = useState(null);
  const [selectedWheelId, setSelectedWheelId] = useState(null);
  const [restriction, setRestriction] = useState(null);
  const [restrictedItems, setRestrictedItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const restrictionData = await loadAllRestrictions();
        setRestriction(restrictionData);
        const exteriorData = await loadAllExteriors();
        setExteriors(exteriorData);
        const interiorData = await loadAllInteriors();
        setInteriors(interiorData);
        const hoodData = await loadAllHoods();
        setHoods(hoodData);
        const spoilersData = await loadAllSpoilers();
        setSpoilers(spoilersData);
        const wheelsData = await loadAllWheels();
        setWheels(wheelsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    updateRestrictedItems();
  }, [selectedExteriorId, selectedInteriorId, selectedHoodId, selectedSpoilerId, selectedWheelId, restriction]);

  useEffect(() => {
    const updatedPrice = calcprice(itemsSelected);
    setPrice(updatedPrice);
  }, [itemsSelected]);

  const updateRestrictedItems = () => {
    if (!restriction) return;

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCarNameChange = (event) => {
    setCarName(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedExteriorId != null && selectedInteriorId != null && selectedHoodId != null && selectedSpoilerId != null && selectedWheelId != null) {
      await createCar(
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
        wheelsPrice
      );
      setSelectedExteriorId(null);
      setSelectedInteriorId(null);
      setSelectedHoodId(null);
      setSelectedSpoilerId(null);
      setSelectedWheelId(null);
      setCarName("");
      setPrice(60000);
      setexteriorsName("");
      setinteriorsName("");
      sethoodsName("");
      setspoilersName("");
      setwheelsName("");
      setexteriorsPrice(0);
      setinteriorsPrice(0);
      sethoodsPrice(0);
      setspoilersPrice(0);
      setwheelsPrice(0);
      setItemsSelected(new Map());
      setSubmitted(true);
      setRestrictedItems([]);
      setSnackbarOpen(false);
      setSnackbarMessage('');
      setTimeout(() => setSubmitted(false), 2000);
    } else {
      setMissingItem(true);
      setTimeout(() => setMissingItem(false), 2000);
    }
  };

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
        <input required type="text" value={carName} onChange={handleCarNameChange}
          style={{
            width: '40%',
            height: '40px',
            marginTop: 22,
            background: 'white',
            color: 'black'
          }}
        />
        <Button variant="contained" onClick={handleSubmit} >Create</Button>
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
      <FormSubmitted open={submitted} setOpen={setSubmitted} message="Car Created!" />
      <FormSubmitted open={missingItem} setOpen={setMissingItem} message="You must make a selection for each custom item." />
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
export default CreateCar;