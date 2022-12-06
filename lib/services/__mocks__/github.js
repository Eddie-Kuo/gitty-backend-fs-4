const exchangeCodeForToken = async (code) => {
  if (code) return 'Mock Token';
};

const getGithubProfile = async (token) => {
  if (token)
    return {
      login: 'mock github user',
      avatar_url: 'https://www.placeholder.com',
      email: 'mockgithubuser@testing.com',
    };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
