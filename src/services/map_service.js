import Map from 'esri/map';

//TO DO: this var sets the map to be used in the whole app.
var mapa = {
    createMap: function(){
      /*this.map = new esri.Map("map", {
        center: [centerx , centery],
        basemap: 'topo',
        zoom: zoom,
        logo: false

      });
      */
      this.map = new Map("map", {
        center: [-71.6022, -33.1397],
        zoom: 6,
        basemap: "topo",
        sliderStyle: "small",
        logo: false
      });

        return this.map;
    },
    getMap: function(){
      return this.map;
    }
};

export default mapa;
