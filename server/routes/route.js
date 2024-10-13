import express from 'express'
import { getExterior } from '../controllers/exterior.js';
import { getHood } from '../controllers/hood.js';
import { getInterior } from '../controllers/interior.js';
import { getRestriction } from '../controllers/restriction.js';
import { getSpoiler } from '../controllers/spoiler.js';
import { getWheels } from '../controllers/wheels.js';
import { getCars, createCars, editCars, deleteCars } from '../controllers/cars.js';

const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/exterior', getExterior);
router.get('/hood', getHood);
router.get('/interior', getInterior);
router.get('/restriction', getRestriction);
router.get('/spoiler', getSpoiler);
router.get('/wheels', getWheels);

router.get('/cars', getCars);
router.post('/cars', createCars);
router.patch('/cars/:id', editCars);
router.delete('/cars/:id', deleteCars);

export default router