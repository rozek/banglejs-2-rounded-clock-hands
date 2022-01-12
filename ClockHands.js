;(function () {
  var HourHandWidth   = 2*3, halfHourHandWidth   = HourHandWidth/2;
  var MinuteHandWidth = 2*2, halfMinuteHandWidth = MinuteHandWidth/2;

  var SecondHandOffset = halfHourHandWidth + 10;

  var outerBoltRadius = halfHourHandWidth + 2, innerBoltRadius = outerBoltRadius - 4;
  var HandOffset = outerBoltRadius + 4;

  var twoPi  = 2*Math.PI, deg2rad = Math.PI/180;
  var Pi     = Math.PI;
  var halfPi = Math.PI/2;

  var sin = Math.sin, cos = Math.cos;

  var sine = [0, sin(30*deg2rad), sin(60*deg2rad), 1];

  var HandPolygon = [
    -sine[3],-sine[0], -sine[2],-sine[1], -sine[1],-sine[2], -sine[0],-sine[3],
     sine[0],-sine[3],  sine[1],-sine[2],  sine[2],-sine[1],  sine[3],-sine[0],
     sine[3], sine[0],  sine[2], sine[1],  sine[1], sine[2],  sine[0], sine[3],
    -sine[0], sine[3], -sine[1], sine[2], -sine[2], sine[1], -sine[3], sine[0],
  ];

  var HourHandLength  = 0;
  var HourHandPolygon = new Array(HandPolygon.length);

  function prepareHourHandPolygon(newHourHandLength) {
    if (HourHandLength === newHourHandLength) { return; }

    HourHandLength = newHourHandLength;
    for (var i = 0, l = HandPolygon.length; i < l; i+=2) {
      HourHandPolygon[i]   = halfHourHandWidth*HandPolygon[i];
      HourHandPolygon[i+1] = halfHourHandWidth*HandPolygon[i+1];
      if (i < l/2) { HourHandPolygon[i+1] -= HourHandLength; }
      if (i > l/2) { HourHandPolygon[i+1] += HandOffset; }
    }
  }

  var MinuteHandLength  = 0;
  var MinuteHandPolygon = new Array(HandPolygon.length);

  function prepareMinuteHandPolygon(newMinuteHandLength) {
    if (MinuteHandLength === newMinuteHandLength) { return; }

    MinuteHandLength = newMinuteHandLength;
    for (var i = 0, l = HandPolygon.length; i < l; i+=2) {
      MinuteHandPolygon[i]   = halfMinuteHandWidth*HandPolygon[i];
      MinuteHandPolygon[i+1] = halfMinuteHandWidth*HandPolygon[i+1];
      if (i < l/2) { MinuteHandPolygon[i+1] -= MinuteHandLength; }
      if (i > l/2) { MinuteHandPolygon[i+1] += HandOffset; }
    }
  }

  var transformedPolygon = new Array(HandPolygon.length);

  function transformPolygon (originalPolygon, OriginX,OriginY, Phi) {
    var sPhi = sin(Phi), cPhi = cos(Phi), x,y;

    for (var i = 0, l = originalPolygon.length; i < l; i+=2) {
      x = originalPolygon[i];
      y = originalPolygon[i+1];

      transformedPolygon[i]   = OriginX + x*cPhi + y*sPhi;
      transformedPolygon[i+1] = OriginY + x*sPhi - y*cPhi;
    }
  }

  exports.draw = function draw (
    Settings, CenterX, CenterY, outerRadius, Hours,Minutes,Seconds
  ) {
    prepareHourHandPolygon  (outerRadius * 0.5);
    prepareMinuteHandPolygon(outerRadius * 0.8);

    var HoursAngle   = (Hours+(Minutes/60))/12 * twoPi - Pi;
    var MinutesAngle = (Minutes/60)            * twoPi - Pi;

    g.setColor(Settings.Foreground === 'Theme' ? g.theme.fg : Settings.Foreground || '#000000');

    transformPolygon(HourHandPolygon, CenterX,CenterY, HoursAngle);
    g.fillPoly(transformedPolygon);

    transformPolygon(MinuteHandPolygon, CenterX,CenterY, MinutesAngle);
    g.fillPoly(transformedPolygon);

    if (Seconds != null) {
      g.setColor(Settings.Seconds === 'Theme' ? g.theme.fgH : Settings.Seconds || '#FFFF00');

      var SecondsAngle = (Seconds/60) * twoPi - Pi;

      var sPhi = Math.sin(SecondsAngle), cPhi = Math.cos(SecondsAngle);

      var SecondHandLength = outerRadius * 0.9;
      g.drawLine(
        CenterX + SecondHandOffset*sPhi,
        CenterY - SecondHandOffset*cPhi,
        CenterX - SecondHandLength*sPhi,
        CenterY + SecondHandLength*cPhi
      );
    }

    g.setColor(Settings.Foreground === 'Theme' ? g.theme.fg : Settings.Foreground || '#000000');
    g.fillCircle(CenterX,CenterY, outerBoltRadius);

    g.setColor(Settings.Background === 'Theme' ? g.theme.bg : Settings.Background || '#FFFFFF');
    g.drawCircle(CenterX,CenterY, outerBoltRadius);
    g.fillCircle(CenterX,CenterY, innerBoltRadius);
  };
})();

