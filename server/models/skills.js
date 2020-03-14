const pool = require('./db');

exports.getAllSkills = async () => {
  const res = await pool.query('SELECT * FROM skills;');
  return res.rows;
};

exports.addSkill = async skill => {
  const res = await pool.query(`INSERT INTO skills (skill_id, name) VALUES ('${skill.skillId}', ${skill.name}) RETURNING *`);
  return res.rows;
};

exports.deleteskill = async skill => {
  const res = await pool.query();
}

