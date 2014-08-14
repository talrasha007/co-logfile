var Logger = require('../');

var shlog = new Logger('sfoo.log', { splitBy: { hour: true, size: 512  } });
var hlog = new Logger('foo.log', { splitBy: { hour: true  } });
var dlog = new Logger('bar.log');

setInterval(function () {
    shlog.write({ bb: 'bb' });
    hlog.write({ foo: 'bar' });
    dlog.write({ bar: 'foo' });
}, 100);