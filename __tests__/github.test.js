const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end;
  });

  test('/api/v1/github/login should take users to github oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });
  test('/api/v1/github/callback should redirect the users to dashboard upon logging in', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=100')
      .redirects(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      login: 'mock github user',
      avatar: 'https://www.placeholder.com',
      email: 'mockgithubuser@testing.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  test('DELETE /api/v1/github should sign out a user', async () => {
    const res = await request.agent(app).delete('/api/v1/github');
    expect(res.status).toBe(204);
  });
});
