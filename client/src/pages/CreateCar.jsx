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
import { Box, Button, Chip, Divider, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import CustomItem from '../components/CustomItem';

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
          <Typography>{children}</Typography>
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
  const [exteriorsPrice, setexteriorsPrice] = useState("");
  const [interiorsPrice, setinteriorsPrice] = useState("");
  const [hoodsPrice, sethoodsPrice] = useState("");
  const [spoilersPrice, setspoilersPrice] = useState("");
  const [wheelsPrice, setwheelsPrice] = useState("");
  const [itemsSelected, setItemsSelected] = useState(new Map());
  const [selectedExteriorId, setSelectedExteriorId] = useState(null);
  const [selectedInteriorId, setSelectedInteriorId] = useState(null);
  const [selectedHoodId, setSelectedHoodId] = useState(null);
  const [selectedSpoilerId, setSelectedSpoilerId] = useState(null);
  const [selectedWheelId, setSelectedWheelId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
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
      }
      catch (error) {
        throw error
      }
    })()
  }, [])

  useEffect(() => {
    const updatedPrice = calcprice(itemsSelected);
    setPrice(updatedPrice);
  }, [itemsSelected]);

  const handleExteriorSelect = (Id) => {
    setexteriorsName(exteriors[Id - 1].name)
    setexteriorsPrice("$" + exteriors[Id - 1].price)
    setSelectedExteriorId(Id);

    setItemsSelected(map => new Map(map.set("Exterior", exteriors[Id - 1].price)));
  };
  const handleInteriorSelect = (Id) => {
    setinteriorsName(interiors[Id - 1].name)
    setinteriorsPrice("$" + interiors[Id - 1].price)
    setSelectedInteriorId(Id);

    setItemsSelected(map => new Map(map.set("Interior", interiors[Id - 1].price)));
  };
  const handleHoodSelect = (Id) => {
    sethoodsName(hoods[Id - 1].name)
    sethoodsPrice("$" + hoods[Id - 1].price)
    setSelectedHoodId(Id);

    setItemsSelected(map => new Map(map.set("Hood", hoods[Id - 1].price)));
  };
  const handleSpoilerSelect = (Id) => {
    setspoilersName(spoilers[Id - 1].name)
    setspoilersPrice("$" + spoilers[Id - 1].price)
    setSelectedSpoilerId(Id);

    setItemsSelected(map => new Map(map.set("Spoiler", spoilers[Id - 1].price)));
  };
  const handleWheelSelect = (Id) => {
    setwheelsName(wheels[Id - 1].name)
    setwheelsPrice("$" + wheels[Id - 1].price)
    setSelectedWheelId(Id);

    setItemsSelected(map => new Map(map.set("Wheel", wheels[Id - 1].price)));
  };

  // for the tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCarNameChange = (event) => {
    setCarName(event.target.value); // Update the car name state on input change
  };

  const handleSubmit = () => {
    if (selectedExteriorId != null && selectedInteriorId != null && selectedHoodId != null && selectedSpoilerId != null && selectedWheelId != null) {
      createCar(carName, price, selectedExteriorId, selectedInteriorId, selectedHoodId, selectedSpoilerId, selectedWheelId);
      setSelectedExteriorId(null);
      setSelectedInteriorId(null);
      setSelectedHoodId(null);
      setSelectedSpoilerId(null);
      setSelectedWheelId(null);
      setCarName("");
      setPrice(60000);
      setexteriorsName("")
      setinteriorsName("")
      sethoodsName("")
      setspoilersName("")
      setwheelsName("")
      setexteriorsPrice("")
      setinteriorsPrice("")
      sethoodsPrice("")
      setspoilersPrice("")
      setwheelsPrice("")
      setItemsSelected(new Map());
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
    else {
      console.log('empty')
    }
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
                    onSelect={handleExteriorSelect}
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
                    onSelect={handleInteriorSelect}
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
                    onSelect={handleHoodSelect}
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
                    onSelect={handleSpoilerSelect}
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
                    onSelect={handleWheelSelect}
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
                <Typography sx={{ fontWeight: 'bold' }}>{exteriorsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Exterior" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}>{interiorsName} </Typography>
              </Box>
              <Box sx={{ paddingX: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>{interiorsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Interior" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}> {hoodsName} </Typography>
              </Box>
              <Box sx={{ paddingX: 5, }}>
                <Typography sx={{ fontWeight: 'bold' }}>{hoodsPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Hood" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16 }}> {spoilersName} </Typography>
              </Box>
              <Box sx={{ paddingX: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>{spoilersPrice} </Typography>
              </Box>
            </Box>
            <Divider><Chip label="Spoiler" size="small" /></Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: 'white', textTransform: 'uppercase', fontSize: 16, }}> {wheelsName}</Typography>
              </Box>
              <Box sx={{ paddingX: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>{wheelsPrice} </Typography>
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
    </div>
  );
}
export default CreateCar;