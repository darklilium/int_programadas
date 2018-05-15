//import Map from 'esri/map';

//TO DO: this var sets the map to be used in the whole app.
var mapa = {
    createMap: function(centerx,centery,zoom){
      this.map = new esri.Map("map", {
        center: [centerx , centery],
        basemap: 'topo',
        zoom: zoom,
        logo: false

      });
        return this.map;
    },
    getMap: function(){
      return this.map;
    }
};

export default mapa;
