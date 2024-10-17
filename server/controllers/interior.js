import pool from '../config/database.js';

export const getInterior = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM interior ORDER BY id ASC`
    const results = await pool.query(selectQuery);
    if (results) {
      res.status(200).json(results.rows)
    }
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getInteriorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM interior WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}
