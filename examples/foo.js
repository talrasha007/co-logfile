var Logger = require('../');

var shlog = new Logger('sfoo', { splitBy: { hour: true, size: 512 * 1024  } }); // Split by hour & filesize 512k
var hlog = new Logger('foo', { splitBy: { hour: true  } }); // Split by hour
var dlog = new Logger('bar'); // Split by day.

setInterval(function () {
    shlog.write({ bb: 'bb' });
    hlog.write({ foo: 'bar' });
    dlog.write({ bar: 'foo' });
}, 100);