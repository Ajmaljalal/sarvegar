var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'ajmaljalal' }, function(err, tunnel) {
  console.log('LT running')
});