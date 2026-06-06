const db = require('../db');

const getExpenses = async (req, res) => {
  const { range, start, end } = req.query;
  let dateFilter = '';
  let params = [req.userId];

  if (range === 'week') {
    dateFilter = 'AND expense_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
  } else if (range === 'month') {
    dateFilter = 'AND expense_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)';
  } else if (range === '3months') {
    dateFilter = 'AND expense_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)';
  } else if (start && end) {
    dateFilter = 'AND expense_date BETWEEN ? AND ?';
    params.push(start, end);
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM expenses WHERE user_id = ? ${dateFilter} ORDER BY expense_date DESC`,
      params
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createExpense = async (req, res) => {
  const { title, amount, category, expense_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, title, amount, category, expense_date) VALUES (?, ?, ?, ?, ?)',
      [req.userId, title, amount, category, expense_date]
    );
    res.status(201).json({ message: 'Expense created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExpense = async (req, res) => {
  const { title, amount, category, expense_date } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE expenses SET title=?, amount=?, category=?, expense_date=? WHERE id=? AND user_id=?',
      [title, amount, category, expense_date, req.params.id, req.userId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM expenses WHERE id=? AND user_id=?',
      [req.params.id, req.userId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };