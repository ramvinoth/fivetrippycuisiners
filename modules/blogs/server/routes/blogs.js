var myController = require('../controllers/blogs');
/**
 * Init the controller
 */
module.exports = function(System) {
  var posts = myController(System);

  var routes = [];
  
  routes.push({
    method: 'post',
    path: '/',
    handler: posts.create,
    authorized: true
  });

  routes.push({
    method: 'post',
    path: '/bogs/add',
    handler: posts.create,
    authorized: true
  });

  routes.push({
    method: 'get',
    path: '/blogs',
    handler: posts.feed,
    authorized: true
  });

  routes.push({
    method: 'get',
    path: '/timeline/:userId',
    handler: posts.timeline,
    authorized: true
  });

  routes.push({
    method: 'get',
    path: '/stream/:streamId',
    handler: posts.streamPosts,
    authorized: true
  });
  
  routes.push({
    method: 'post',
    path: '/:postId/unlike',
    handler: posts.unlike,
    authorized: true
  });

  return routes;
};