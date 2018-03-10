'use strict';

module.exports = {
  REQUESTS_DELAY: 0,
  REQUESTS_DELAY_SYSTEM: 0,
  baseURL: (process.env.BASEURL || 'http://fivetrippycuisiners.com'),
  db: 'mongodb://viyabiz_vinz:viyaSmart$6@ds261078.mlab.com:61078' + (process.env.DB || 'trippycuisiners'),
  server: {
    host: process.env.SERVER ||'localhost',
    port: process.env.PORT || 8111
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
