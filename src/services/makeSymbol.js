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
    }
  }
}
export default makeSymbol();
