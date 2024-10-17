import pool from '../config/database.js';

export const getWheels = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM wheels ORDER BY id ASC`
    const results = await pool.query(selectQuery);
    if (results) {
      res.status(200).json(results.rows)
    }
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getWheelsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM wheels WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}
