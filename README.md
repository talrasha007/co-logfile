co-logfile
==========
  A log file util that can split log file by day/hour/filesize.
  
# Install
```
npm install co-logfile
```

# Usage
```js
var Logger = require('../');

var shlog = new Logger('sfoo.log', { splitBy: { hour: true, size: 512  } }); // Split by hour & filesize 512
var hlog = new Logger('foo.log', { splitBy: { hour: true  } }); // Split by hour
var dlog = new Logger('bar.log'); // Split by day.

setInterval(function () {
    shlog.write({ bb: 'bb' });
    hlog.write({ foo: 'bar' });
    dlog.write({ bar: 'foo' });
}, 100);
```
