'use strict';

module.exports = {
  REQUESTS_DELAY: 0,
  IMG_STATIC: 'http://www.tamizhans.in',
  IMG_STATIC_URL: 'http://www.tamizhans.in/image.php',
  REQUESTS_DELAY_SYSTEM: 0,
  baseURL: (process.env.BASEURL || 'https://fivetrippycuisiners.herokuapp.com'),
  db: 'mongodb://viyabiz_vinz:viyaSmart$6@ds261078.mlab.com:61078/trippycuisiners',
  server: {
    host: process.env.SERVER ||'https://fivetrippycuisiners.herokuapp.com',
    port: process.env.PORT
  },
  secret: 'trippycuisinerssecret',
  settings: {
  	perPage: 10,
  	email: {
  		service: 'Gmail'
  	}
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
};
