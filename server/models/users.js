const pool = require('./db');

exports.getAllUsers = async () => {
  const res = await pool.query('SELECT * FROM users;');
  return res.rows;
};

exports.addUser = async user => {
  const res = await pool.query(`INSERT INTO users (user_id, first_name, last_name, credits, picture, salt, passhash, address, email) VALUES ('${user.userId}', ${user.firstName}, ${user.lastName}, ${user.credits}, ${user.picture}, ${user.salt}, ${user.passhash}, ${user.address}, ${user.email}) RETURNING *`);
  return res.rows;
};

exports.getUsersSkills = async user => {
  const res = await pool.query(`
    select 
      first_name, last_name, name
    from 
      users
    join 
      users_skills
    on
      users_skills.${user.userId} = users.${user.userId}
    join
      skills
    on
      skills.skill_id = users_skills.skill_id`
  )
}

exports.getSkillsByUser = async (user, skill) => {
  const res = await pool.query(`
    select 
      first_name, last_name, name
    from 
      users
    join 
      users_skills
    on
      users_skills.${user.userId} = users.${user.userId}
    join
      skills
    on
      skills.skill_id = users_skills.skill_id
    where
      name = ${skill}`
  )
}