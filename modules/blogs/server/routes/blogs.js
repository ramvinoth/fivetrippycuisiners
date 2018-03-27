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
        path: '/blogs/add',
        handler: posts.create,
        authorized: true
      });

    routes.push({
      method: 'get',
      path: '/',
      handler: posts.feed,
      authorized: true
    });

    routes.push({
        method: 'get',
        path: '/blogs',
        handler: posts.feed,
        authorized: true
      });
      
    return routes;
}