const pool = require('../utils/pool');

class Posts {
  id;
  github_users;
  title;
  description;
  constructor({ id, github_users, title, description }) {
    this.id = id;
    this.github_users = github_users;
    this.title = title;
    this.description = description;
  }
  static async getALL() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Posts(row));
  }
  static async post({ title, description }) {
    const { rows } = await pool.query(
      `
    INSERT INTO posts (title, description)
    VALUES ($1, $2)
    RETURNING *
    `,
      [title, description]
    );
    return new Posts(rows[0]);
  }
}

module.exports = { Posts };
