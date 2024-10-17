import pool from './database.js';
import exteriorData from '../data/exterior.js';
import hoodData from '../data/hood.js';
import interiorData from '../data/interior.js';
import spoilerData from '../data/spoiler.js';
import wheelsData from '../data/wheels.js';
import restrictionData from '../data/restriction.js';

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS cars;

    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price SERIAL NOT NULL,
      exterior_id SERIAL NOT NULL,
      interior_id SERIAL NOT NULL,
      hood_id SERIAL NOT NULL,
      spoiler_id SERIAL NOT NULL,
      wheels_id SERIAL NOT NULL,
      exterior_name VARCHAR(255) NOT NULL,
      interior_name VARCHAR(255) NOT NULL,
      hood_name VARCHAR(255) NOT NULL,
      spoiler_name VARCHAR(255) NOT NULL,
      wheels_name VARCHAR(255) NOT NULL,
      exterior_price SERIAL NOT NULL,
      interior_price SERIAL NOT NULL,
      hood_price SERIAL NOT NULL,
      spoiler_price SERIAL NOT NULL,
      wheels_price SERIAL NOT NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 Cars table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const createExteriorTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS exterior;

    CREATE TABLE IF NOT EXISTS exterior (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price SERIAL NOT NULL,
      image VARCHAR(255) NOT NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 Exterior table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const seedExteriorTable = async () => {
  await createExteriorTable();

  const insertPromises = exteriorData.map(exterior => {
    const insertQuery = {
      text: 'INSERT INTO exterior (name, price, image) VALUES ($1, $2, $3)',
      values: [
        exterior.name,
        exterior.price,
        exterior.image
      ]
    };
    return pool.query(insertQuery);
  });

  try {
    await Promise.all(insertPromises);
    console.log('✅ All exterior added successfully');
  } catch (err) {
    console.error('⚠️ error inserting exterior:', err);
  }
};

const createHoodTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS hood;

    CREATE TABLE IF NOT EXISTS hood (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price SERIAL NOT NULL,
      image VARCHAR(255) NOT NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 hood table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const seedHoodTable = async () => {
  await createHoodTable();

  const insertPromises = hoodData.map(hood => {
    const insertQuery = {
      text: 'INSERT INTO hood (name, price, image) VALUES ($1, $2, $3)',
      values: [
        hood.name,
        hood.price,
        hood.image
      ]
    };
    return pool.query(insertQuery);
  });

  try {
    await Promise.all(insertPromises);
    console.log('✅ All hoods added successfully');
  } catch (err) {
    console.error('⚠️ error inserting hoods:', err);
  }
};

const createInteriorTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS interior;

    CREATE TABLE IF NOT EXISTS interior (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price SERIAL NOT NULL,
      image VARCHAR(255) NOT NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 interior table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const seedInteriorTable = async () => {
  await createInteriorTable();

  const insertPromises = interiorData.map(interior => {
    const insertQuery = {
      text: 'INSERT INTO interior (name, price, image) VALUES ($1, $2, $3)',
      values: [
        interior.name,
        interior.price,
        interior.image
      ]
    };
    return pool.query(insertQuery);
  });

  try {
    await Promise.all(insertPromises);
    console.log('✅ All interior added successfully');
  } catch (err) {
    console.error('⚠️ error inserting interior:', err);
  }
};

const createRestrictionTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS restriction;

    CREATE TABLE IF NOT EXISTS restriction (
      id SERIAL PRIMARY KEY,
      exterior_id INTEGER NULL,
      hood_id INTEGER NULL,
      interior_id INTEGER NULL,
      spoiler_id INTEGER NULL,
      wheels_id INTEGER NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 Restriction table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const seedRestrictionTable = async () => {
  await createRestrictionTable();

  const insertPromises = restrictionData.map(restriction => {
    const insertQuery = {
      text: 'INSERT INTO restriction (exterior_id, hood_id, interior_id, spoiler_id, wheels_id) VALUES ($1, $2, $3, $4, $5)',
      values: [
        restriction.exterior_id,
        restriction.hood_id,
        restriction.interior_id,
        restriction.spoiler_id,
        restriction.wheels_id
      ]
    };
    return pool.query(insertQuery);
  });

  try {
    await Promise.all(insertPromises);
    console.log('✅ All restrictions added successfully');
  } catch (err) {
    console.error('⚠️ error inserting restrictions:', err);
  }
};

const createSpoilerTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS spoiler;

    CREATE TABLE IF NOT EXISTS spoiler (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price SERIAL NOT NULL,
      image VARCHAR(255) NOT NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 Spoiler table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const seedSpoilerTable = async () => {
  await createSpoilerTable();

  const insertPromises = spoilerData.map(spoiler => {
    const insertQuery = {
      text: 'INSERT INTO spoiler (name, price, image) VALUES ($1, $2, $3)',
      values: [
        spoiler.name,
        spoiler.price,
        spoiler.image
      ]
    };
    return pool.query(insertQuery);
  });

  try {
    await Promise.all(insertPromises);
    console.log('✅ All spoilers added successfully');
  } catch (err) {
    console.error('⚠️ error inserting spoilers:', err);
  }
};

const createWheelsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS wheels;

    CREATE TABLE IF NOT EXISTS wheels (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price SERIAL NOT NULL,
      image VARCHAR(255) NOT NULL
    );
    `
  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 Wheels table created successfully');
  } catch (err) {
    console.error('⚠️ Error creating table:', err);
  }
};

const seedWheelsTable = async () => {
  await createWheelsTable();

  const insertPromises = wheelsData.map(wheel => {
    const insertQuery = {
      text: 'INSERT INTO wheels (name, price, image) VALUES ($1, $2, $3)',
      values: [
        wheel.name,
        wheel.price,
        wheel.image
      ]
    };
    return pool.query(insertQuery);
  });

  try {
    await Promise.all(insertPromises);
    console.log('✅ All wheels added successfully');
  } catch (err) {
    console.error('⚠️ error inserting wheels:', err);
  }
};

await createCarsTable();
seedExteriorTable();
seedHoodTable();
seedInteriorTable();
seedRestrictionTable();
seedSpoilerTable();
seedWheelsTable();