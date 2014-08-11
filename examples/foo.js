var Logger = require('../');

var logger = new Location('foo.%s.log', { splitBy: { hour: true, size: 512  } });

setInterval(function () {
    logger.write({ foo: 'bar' });
}, 100);