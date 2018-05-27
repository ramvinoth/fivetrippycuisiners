'use strict';

module.exports = {
  REQUESTS_DELAY: 0,
  IMG_STATIC: 'http://www.tamizhans.in',
  IMG_STATIC_URL: 'http://www.tamizhans.in/image.php',
  REQUESTS_DELAY_SYSTEM: 0,
  baseURL: (process.env.BASEURL || 'https://www.tamizhans.com'),
  db: 'mongodb://viyabiz_vinz:viyaSmart$6@ds261078.mlab.com:61078/trippycuisiners',
  server: {
    host: process.env.SERVER ||'https://www.tamizhans.com',
    port: process.env.PORT
  },
  secret: 'trippycuisinerssecret',
  settings: {
  	perPage: 10,
  	email: {
  		service: 'thaco.websitewelcome.com'
  	}
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  FACEBOOK_SECRET: 'bb0908d09db0197a9988152a322e41a4',
};
