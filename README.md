co-logfile
==========
  A log file util that can split log file by day/hour/filesize.
  
# Install
```
npm install co-logfile
```

# Usage
  - new Logger(path, opt) # log filename will be path + logfile info + '.log'
  - logger.write(msg) # msg can be a string or an object.
  - logger.coWrite(msg) # For co, you can write code like: yield logger.cowrite('blabla');

```js
var Logger = require('../');

var shlog = new Logger('sfoo', { splitBy: { hour: true, size: 512  } }); // Split by hour & filesize 512
var hlog = new Logger('foo', { splitBy: { hour: true  } }); // Split by hour
var dlog = new Logger('bar'); // Split by day.

setInterval(function () {
    shlog.write({ bb: 'bb' });
    hlog.write({ foo: 'bar' });
    dlog.write({ bar: 'foo' });
}, 100);
```
