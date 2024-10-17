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
    const { name, price, exterior_id, interior_id, hood_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name } = req.body
    const results = await pool.query(`
        INSERT INTO cars (name, price, exterior_id, hood_id, interior_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
      [name, price, exterior_id, hood_id, interior_id, spoiler_id, wheels_id, exterior_name, interior_name, hood_name, spoiler_name, wheels_name]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const editCars = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, price, exterior_id, hood_id, interior_id, spoiler_id, wheels_id } = req.body
    const results = await pool.query(`
        UPDATE cars SET name = $1, price = $2, exterior_id = $3, hood_id = $4, interior_id = $5, spoiler_id = $6, wheels_id= $7 WHERE id = $8`,
      [name, price, exterior_id, hood_id, interior_id, spoiler_id, wheels_id, id]
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
