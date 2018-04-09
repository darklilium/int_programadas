// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/TileHandler","require exports module dojo/Deferred dojo/promise/all dojo/has ../../core/workers ../../core/promiseUtils ../../core/requireUtils ../../core/LRUCache ../../request ../2d/tiling/TileKey ./TileIndex ./SpriteMosaic ./SpriteSource ./GlyphMosaic ./GlyphSource ./VectorTileDisplayObject ./GeometryUtils".split(" "),function(r,F,t,u,n,v,w,f,x,y,p,h,z,A,B,C,D,E,q){var l=new y(10),k=new Map;return function(){function b(a,c,b,d,g){void 0===d&&(d=
!1);this.devicePixelRatio=b;this.allowUpdates=d;this._tileIndex=this._connection=this._glyphMosaic=this._spriteMosaic=null;this._updateQueue=new Map;this._ongoingRequests=new Map;this._vectorTileLayer=a;this._styleRepository=a.styleRepository;this._requestUpdate=c}b.prototype.destroy=function(){this.stop();this._vectorTileLayer=this._requestUpdate=this._styleRepository=null;this._spriteMosaic&&(this._spriteMosaic.dispose(),this._spriteMosaic=null);this._glyphMosaic&&(this._glyphMosaic.dispose(),this._glyphMosaic=
null)};Object.defineProperty(b.prototype,"initialized",{get:function(){return this._broadcastPromise&&this._broadcastPromise.isFulfilled()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"spriteMosaic",{get:function(){return this._spriteMosaic},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"glyphMosaic",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"ongoingRequestCount",{get:function(){return this._ongoingRequests.size},
enumerable:!0,configurable:!0});b.prototype.start=function(){var a=this;this.stop();var c=this._styleRepository,b=new B(c.sprite,this.devicePixelRatio);b.devicePixelRatio=this.devicePixelRatio;var d=b.load().then(function(){a._spriteMosaic=new A(1024,1024,250);a._spriteMosaic.setSpriteSource(b);v("stable-symbol-rendering")&&a._spriteMosaic.preloadSpriteItems()}),g=new D(c.glyphs);this._glyphMosaic=new C(1024,1024,g);var e=this._fetchTileMap(this._vectorTileLayer.tileIndexUrl),m=w.open(this,x.getAbsMid("./WorkerTileHandler",
r,t)).then(function(c){a._connection=c}),f=new u(function(a){d.isFulfilled()||d.cancel();e.isFulfilled()||e.cancel();m.isFulfilled()||m.cancel()});n([d,e,m]).then(function(b){n(a._connection.broadcast("setLayers",c.styleJSON)).then(function(){f.resolve()})});return this._broadcastPromise=f.promise};b.prototype.stop=function(){this._broadcastPromise&&!this._broadcastPromise.isFulfilled()&&this._broadcastPromise.cancel();this._updateQueue.forEach(function(a){return a.cancel()});this._ongoingRequests.forEach(function(a){return a.cancel()});
this._connection&&(this._connection.close(),this._connection=null)};b.prototype.updateTile=function(a,c){var b=this;if(!this.allowUpdates)return f.resolve(null);if(!this._broadcastPromise.isFulfilled()||!this._connection)return f.reject(Error("no connection"));var d=Math.round(q.degToByte(c.state.rotation));if(a.rotation===d)return f.resolve(null);var g,e=a.key;this._updateQueue.has(e.id)&&(g=this._updateQueue.get(e.id),g.cancel("cancel"));a.rotation=d;g=this._connection.invoke("update",{key:a.id,
rotation:d},[],{id:a.workerID}).then(function(c){a.updateSymbolData(c);return c}).always(function(){b._updateQueue["delete"](e.id)});this._updateQueue.set(a.id,g);return g};b.prototype.getVectorTileWithLRC=function(a,c,b,d){var g=this;void 0===d&&(d=0);a=new h(a,c,b,0);c=this.getRefKey(a);var e=new E(a,c,this._vectorTileLayer.tileInfo,this._styleRepository,0);return this.getTileData(e.key,0).then(function(a){e.setData(a.tileData,a.workerId,g._connection);return e})};b.prototype.getTileData=function(a,
c){var b=this;if(!this._broadcastPromise.isFulfilled()||!this._connection)return f.reject(Error("no connection"));var d=this._tileIndex?this._tileIndex.dataKey(a):a;if(!d)return f.reject(Error("no data"));var g=Math.round(q.degToByte(c));return this._getTileData(this._connection,a,d,g).then(function(a){return a&&a.tileData?{tileData:a.tileData,workerId:a.workerId,connection:b._connection}:f.reject("No data")})};b.prototype.getRefKey=function(a){return this._tileIndex?this._tileIndex.dataKey(a):a};
b.prototype.fetchTileData=function(a){a=h.pool.acquire(a);var b=this._vectorTileLayer.getTileUrl(a.level,a.row,a.col);h.pool.release(a);return p(b,{callbackParamName:"callback",responseType:"array-buffer"}).then(function(a){return{data:{protobuff:a.data},buffers:[a.data]}})};b.prototype.getSprites=function(a){return f.resolve({data:{spriteItems:this._spriteMosaic.getSpriteItems(a.sprites)}})};b.prototype.getGlyphs=function(a){return this._glyphMosaic.getGlyphItems(a.tileID,a.font,a.codePoints).then(function(a){return{data:{glyphItems:a}}})};
b.prototype.getStyleRepository=function(){return this._styleRepository};b.prototype.getTileIndex=function(){return this._tileIndex};b.prototype._getTileData=function(a,b,k,d){var c=this,e={id:null};if(a=this._ongoingRequests.get(b.id))return a;a=this._connection.invoke("getTile",{key:b.id,refKey:k.id,rotation:d,cacheTile:this.allowUpdates},[],e).then(function(a){c._ongoingRequests["delete"](b.id);return{tileData:a,workerId:e.id}}).otherwise(function(a){c._ongoingRequests["delete"](b.id);c._connection.invoke("destructTileData",
{key:b.id},[],e);return f.reject(a)});this._ongoingRequests.set(b.id,a);return a};b.prototype._fetchTileMap=function(a){var b=this;if(!a)return null;if(l.has(a))return this._tileIndex=l.use(a),f.resolve();if(k.has(a))return k.get(a);var h=p(a,{callbackParamName:"callback",responseType:"json"}).then(function(c){b._tileIndex=new z(c.data);k["delete"](a);l.insert(a,b._tileIndex)});k.set(a,h);return h};return b}()});