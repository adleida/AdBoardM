/**
 * Created by kliu on 06/07/2015.
 */

function ScreenMap(mapId){
    var self = this;
    self.map = new BMap.Map(mapId);
    self.map.centerAndZoom(new BMap.Point(116.404,39.915), 15);
    self.map.enableScrollWheelZoom();
    self.map.addControl(new BMap.NavigationControl());
};

ScreenMap.prototype.addScreen = function(lon, lat){
    var self = this;
    var point = new BMap.Point(lon, lat);
    var myIcon = new BMap.Icon("/images/screen.png", new BMap.Size(50, 40), {
        offset : new BMap.Size(25, 140)
        //imageOffset: new BMap.Size(-20, 0)
    });
    var marker = new BMap.Marker(point, {icon : myIcon});
    self.map.addOverlay(marker);
};