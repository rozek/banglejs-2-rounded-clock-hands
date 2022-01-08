# banglejs-2-rounded-clock-hands #

draws still simple, yet rounded, hands for an analog clock on a Bangle.js 2

This module draws some still simple, but already rounded, hands for an analog clock running on a [Bangle.js 2](https://www.espruino.com/Bangle.js2).

## Usage ##

Within a clock implementation, the module may be used as follows:

```
let ClockHands = require('https://raw.githubusercontent.com/rozek/banglejs-2-rounded-clock-hands/main/ClockHands.js');
```

Whenever needed, the module's exported `draw` method will then be invoked as follows:

```
ClockHands.draw(Settings, CenterX,CenterY, outerRadius, Hours,Minutes,Seconds);
```

The `Seconds` argument is optional and may be missing (or set to `null` or `undefined`) - in that case no seconds hands should be drawn.

## License ##

[MIT License](LICENSE.md)
