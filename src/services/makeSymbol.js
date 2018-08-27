import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import Color from "esri/Color";

function makeSymbol(){

  return {
    makePolygon(){
      var mySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
        new Color([255,0,0]), 2),new Color([255,255,0,0.25])
      );
      return mySymbol;
    },
    makePoint(){
      var mySymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        30,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new esri.Color([0, 40, 255, 0.9]),
          1
        ),
        new esri.Color([255, 51, 255, 0.7])
      );

      return mySymbol;
    },
    makeLine(){
      var mySymbol = new esri.symbol.CartographicLineSymbol(
        esri.symbol.CartographicLineSymbol.STYLE_SOLID,
        new esri.Color([0,0,255,0.9]), 15,
        esri.symbol.CartographicLineSymbol.CAP_ROUND,
        esri.symbol.CartographicLineSymbol.JOIN_MITER, 5
      );

      return mySymbol;
    },
  }
}
export default makeSymbol();
