import express from 'express'
import { getExterior, getExteriorById } from '../controllers/exterior.js';
import { getHood, getHoodById } from '../controllers/hood.js';
import { getInterior, getInteriorById } from '../controllers/interior.js';
import { getRestriction } from '../controllers/restriction.js';
import { getSpoiler, getSpoilerById } from '../controllers/spoiler.js';
import { getWheels, getWheelsById } from '../controllers/wheels.js';
import { getCars, getCarsById, createCars, editCars, deleteCars } from '../controllers/cars.js';

const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/exterior', getExterior);
router.get('/exterior/:id', getExteriorById);

router.get('/hood', getHood);
router.get('/hood/:id', getHoodById);

router.get('/interior', getInterior);
router.get('/interior/:id', getInteriorById);

router.get('/restriction', getRestriction);

router.get('/spoiler', getSpoiler);
router.get('/spoiler/:id', getSpoilerById);

router.get('/wheels', getWheels);
router.get('/wheels/:id', getWheelsById);

router.get('/cars', getCars);
router.get('/cars/:id', getCarsById)
router.post('/cars', createCars);
router.patch('/cars/:id', editCars);
router.delete('/cars/:id', deleteCars);

export default router