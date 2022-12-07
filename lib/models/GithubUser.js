const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  email;
  login;
  avatar;
  constructor({ id, email, login, avatar }) {
    this.id = id;
    this.email = email;
    this.login = login;
    this.avatar = avatar;
  }

  static async findByLogin(login) {
    const { rows } = await pool.query(
      'SELECT * FROM github_users WHERE login = $1',
      [login]
    );
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }

  static async insert({ login, email, avatar }) {
    const { rows } = await pool.query(
      `
      INSERT INTO github_users (login, email, avatar)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [login, email, avatar]
    );
    return new GithubUser(rows[0]);
  }
};
