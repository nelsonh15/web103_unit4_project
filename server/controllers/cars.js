import pool from '../config/database.js';

export const getCars = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM cars ORDER BY id ASC`
    const results = await pool.query(selectQuery);
    if (results) {
      res.status(200).json(results.rows)
    }
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getCarsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const createCars = async (req, res) => {
  try {
    const { name, price, exterior_id, interior_id, hood_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name, exterior_price, interior_price, hood_price, spoiler_price, wheels_price } = req.body
    const results = await pool.query(`
        INSERT INTO cars (name, price, exterior_id, hood_id, interior_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name, exterior_price, interior_price, hood_price, spoiler_price, wheels_price)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *`,
      [name, price, exterior_id, hood_id, interior_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name, exterior_price, interior_price, hood_price, spoiler_price, wheels_price]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const editCars = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, price, exterior_id, interior_id, hood_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name,	wheels_name, exterior_price, interior_price, hood_price, spoiler_price, wheels_price } = req.body
    const results = await pool.query(
        'UPDATE cars SET name = $1, price = $2, exterior_id = $3, interior_id = $4, hood_id = $5, spoiler_id = $6, wheels_id = $7, exterior_name = $8, interior_name = $9, hood_name = $10, spoiler_name = $11, wheels_name = $12, exterior_price = $13, interior_price = $14, hood_price = $15, spoiler_price = $16, wheels_price = $17 WHERE id = $18',
      [name, price, exterior_id, interior_id, hood_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name, exterior_price, interior_price, hood_price, spoiler_price, wheels_price, id]
    )
    res.status(200).json(results.rows[0])
    
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const deleteCars = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM cars WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}
