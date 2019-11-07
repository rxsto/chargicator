const axios = require('axios');

class DiscordManager {

  constructor(client) {
    this.client = client;
  }

  getUser(id) {
    return axios.get(`${process.env.DISCORD_API_URL}/users/${id}`, {
      headers: {
        'authorization': `Bot ${process.env.DISCORD_TOKEN}`
      }
    }).then(result => {
      return result.data;
    }).catch(error => {
      console.error(error);
    });
  }
}

module.exports = DiscordManager;
