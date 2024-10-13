import pool from '../config/database.js';

export const getSpoiler = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM spoiler ORDER BY id ASC`
    const results = await pool.query(selectQuery);
    if (results) {
      res.status(200).json(results.rows)
    }
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}