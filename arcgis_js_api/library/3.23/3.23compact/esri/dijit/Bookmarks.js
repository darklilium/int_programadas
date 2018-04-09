// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/templates/Bookmarks.html":'\x3cdiv class\x3d"${_css.esriBookmarks}"\x3e\r\n  \x3cdiv class\x3d"${_css.esriBookmarkList}" dojoAttachPoint\x3d"bookmarkDomNode"\x3e\r\n      \x3cdiv class\x3d"${_css.esriBookmarkTable}" dojoAttachPoint\x3d"bookmarkTable"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/Bookmarks","dojo/_base/array dojo/_base/connect dojo/_base/declare dojo/_base/lang dojo/has dojo/keys dojo/on dojo/query dojo/window dojo/dom dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dnd/Avatar dojo/dnd/Source dojo/i18n!../nls/jsapi dijit/a11yclick dijit/_WidgetBase ../kernel ../domUtils ../Evented ../geometry/Extent ./BookmarkItem dijit/_TemplatedMixin dojo/text!./templates/Bookmarks.html".split(" "),function(k,g,t,d,z,A,p,m,B,I,l,n,w,v,C,r,u,D,E,x,F,q,y,G,H){t=
t([D,G,F],{declaredClass:"esri.dijit.Bookmarks",templateString:H,bookmarks:[],bookmarkDomNode:null,bookmarkTable:null,initBookmarks:null,editable:null,map:null,_oldGenerateText:null,_customGenerateText:!1,_LTR:!0,_dndSource:null,_inputBox:null,_label:null,_css:{esriBookmarks:"esriBookmarks",esriBookmarksRTL:"esriBookmarksRTL",esriBookmarkList:"esriBookmarkList",esriBookmarkTable:"esriBookmarkTable",esriBookmarkEditImage:"esriBookmarkEditImage",esriBookmarkRemoveImage:"esriBookmarkRemoveImage",esriBookmarkLabel:"esriBookmarkLabel",
esriBookmarkItem:"esriBookmarkItem",esriBookmarkHighlight:"esriBookmarkHighlight",esriAddBookmark:"esriAddBookmark",esriBookmarkEditBox:"esriBookmarkEditBox"},_clickHandlers:[],_mouseOverHandlers:[],_mouseOutHandlers:[],_removeHandlers:[],_editHandlers:[],_dndHandlers:[],_eventMap:{click:!0,edit:!0,remove:!0},onClick:function(){},onEdit:function(){},onRemove:function(){},constructor:function(a,b){this.initBookmarks=a.bookmarks;delete a.bookmarks},postCreate:function(){this.srcNodeRef=this.domNode;
(this._LTR=this.isLeftToRight())||l.add(this.domNode,this._css.esriBookmarksRTL);this._dndSource=new C(this.bookmarkTable,{creator:this._avatarCreator,singular:!0,checkAcceptance:function(a,b){return this===a?!0:!1}});this._dndSourceNodes=this._dndSource.getAllNodes();this._dndHandlers.push(p(this._dndSource,"DndStart",d.hitch(this,function(a){a===this._dndSource&&(this._oldGenerateText=v.prototype._generateText,v.prototype._generateText=d.hitch(this,this._generateText),this._customGenerateText=!0,
this._inputBox&&this._inputBox.blur())})));this._dndHandlers.push(p(this._dndSource,"DndDrop",d.hitch(this,function(a){a===this._dndSource&&(this._syncBookmarksAfterReorder(),this.emit("reorder",this.bookmarks))})));this._dndHandlers.push(p(this._dndSource,"DndCancel",d.hitch(this,function(){this._customGenerateText&&(v.prototype._generateText=this._oldGenerateText,this._customGenerateText=!1)})));this._addInitialBookmarks()},destroy:function(){this.inherited(arguments);this.map=null;k.forEach(this._clickHandlers,
function(a){g.disconnect(a)});k.forEach(this._mouseOverHandlers,function(a){g.disconnect(a)});k.forEach(this._mouseOutHandlers,function(a){g.disconnect(a)});k.forEach(this._removeHandlers,function(a){g.disconnect(a)});k.forEach(this._editHandlers,function(a){g.disconnect(a)});n.destroy(this.bookmarkDomNode)},addBookmark:function(a){var b,c,e,f;"esri.dijit.BookmarkItem"===a.declaredClass?b=a:(b=new q(a.extent),b=new y({name:a.name,extent:b}));this.editable?(e=r.widgets.bookmarks,f=e.NLS_bookmark_edit,
e=e.NLS_bookmark_remove,c=n.create("div",{innerHTML:'\x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d\'esriBookmarkLabel\'\x3e'+a.name+'\x3c/div\x3e\x3cdiv tabindex\x3d"0" role\x3d"button" title\x3d\''+e+"' class\x3d'esriBookmarkRemoveImage'\x3e\x3cbr/\x3e\x3c/div\x3e\x3cdiv tabindex\x3d\"0\" role\x3d\"button\" title\x3d'"+f+"' class\x3d'esriBookmarkEditImage'\x3e\x3cbr/\x3e\x3c/div\x3e"}),f=m(".esriBookmarkEditImage",c)[0],e=m(".esriBookmarkRemoveImage",c)[0],this._removeHandlers.push(g.connect(e,
u,this,"_removeBookmark")),this._editHandlers.push(g.connect(f,u,this,"_editBookmarkLabel"))):c=n.create("div",{innerHTML:"\x3cdiv tabindex\x3d\"0\" class\x3d'esriBookmarkLabel'\x3e"+a.name+"\x3c/div\x3e"});l.add(c,this._css.esriBookmarkItem);"esri.geometry.Extent"!==a.extent.declaredClass&&new q(a.extent);f=m(".esriBookmarkLabel",c)[0];this._clickHandlers.push(g.connect(f,u,d.hitch(this,"_onClickHandler",a)));this._mouseOverHandlers.push(g.connect(c,"onmouseover",d.hitch(this,function(){l.add(c,
this._css.esriBookmarkHighlight)})));this._mouseOutHandlers.push(g.connect(c,"onmouseout",d.hitch(this,function(){l.remove(c,this._css.esriBookmarkHighlight)})));this.bookmarks.push(b);this._dndSource.insertNodes(!1,[c]);this._dndSourceNodes=this._dndSource.getAllNodes();B.scrollIntoView(c);this._syncBookmarksAfterReorder()},removeBookmark:function(a){this._inputBox&&this._inputBox.blur();var b;b=m(".esriBookmarkLabel",this.bookmarkDomNode);b=k.filter(b,function(b){return b.innerHTML===a});k.forEach(b,
function(a){a.parentNode.parentNode.parentNode.removeChild(a.parentNode.parentNode)});for(b=this.bookmarks.length-1;0<=b;b--)this.bookmarks[b].name===a&&this.bookmarks.splice(b,1);this.onRemove()},hide:function(){x.hide(this.bookmarkDomNode)},show:function(){x.show(this.bookmarkDomNode)},_addInitialBookmarks:function(){if(this.editable){var a=n.create("div",{tabIndex:0,role:"button",innerHTML:"\x3cdiv\x3e"+r.widgets.bookmarks.NLS_add_bookmark+"\x3c/div\x3e"});l.add(a,this._css.esriBookmarkItem);l.add(a,
this._css.esriAddBookmark);this._clickHandlers.push(g.connect(a,u,this,this._newBookmark));this._mouseOverHandlers.push(g.connect(a,"onmouseover",d.hitch(this,function(){l.add(a,this._css.esriBookmarkHighlight)})));this._mouseOutHandlers.push(g.connect(a,"onmouseout",d.hitch(this,function(){l.remove(a,this._css.esriBookmarkHighlight)})));this.domNode.appendChild(a)}this.bookmarks=[];k.forEach(this.initBookmarks,function(a){this.addBookmark(a)},this)},_newBookmark:function(){var a,b,c,e,f,h;h=this.map;
a=r.widgets.bookmarks.NLS_new_bookmark;var d=h.extent;h.spatialReference._isWrappable()?(b=q.prototype._normalizeX(d.xmin,h.spatialReference._getInfo()).x,c=q.prototype._normalizeX(d.xmax,h.spatialReference._getInfo()).x,b>c&&(e=(f=h.spatialReference.isWebMercator())?2.0037508342788905E7:180,f=f?-2.0037508342788905E7:-180,Math.abs(b-e)>Math.abs(c-f)?c=e:b=f),h=new q(b,d.ymin,c,d.ymax,h.spatialReference)):h=d;a=new y({name:a,extent:h});this.addBookmark(a);a=m(".esriBookmarkItem",this.bookmarkDomNode);
h=a[a.length-1];a={target:{parentNode:null}};a.target.parentNode=h;this._editBookmarkLabel(a)},_removeBookmark:function(a){a.target.parentNode.parentNode.parentNode.removeChild(a.target.parentNode.parentNode);this.removeBookmark(a.target.parentNode.textContent)},_syncBookmarksAfterReorder:function(){var a=[],b=this._dndSource.getAllNodes();k.forEach(b,d.hitch(this,function(b){var c=this._dndSourceNodes.map(function(a,c){if(a===b)return c}).filter(isFinite)[0];a.push(this.bookmarks[c])}));this.bookmarks=
a;this._dndSourceNodes=b},_generateText:function(){return this._dndSource&&this._dndSource.getSelectedNodes()[0]&&this._dndSource.getSelectedNodes()[0].firstChild.firstChild.innerHTML?this._dndSource.getSelectedNodes()[0].firstChild.firstChild.innerHTML:""},_editBookmarkLabel:function(a){this._inputBox&&this._inputBox.blur();var b=r.widgets.bookmarks.NLS_new_bookmark;a=a.target.parentNode;var c=a.firstChild||m(".esriBookmarkLabel",a)[0],e=w.position(a,!0),f=e.y;this._label=c;this._inputBox=n.create("input",
{className:"esriBookmarkEditBox",value:c.innerHTML!==b?c.textContent:"",style:{top:f+"px",left:this._LTR?e.x+"px":"0px"}},this.domNode);p(this._inputBox,"keyup",d.hitch(this,function(a){switch(a.keyCode){case A.ENTER:this._inputBox.blur()}}));p(this._inputBox,"focus",d.hitch(this,function(){this.map&&"function"===typeof this.map.disableKeyboardNavigation&&this.map.disableKeyboardNavigation()}));p(this._inputBox,"blur",d.hitch(this,function(){this.map&&"function"===typeof this.map.enableKeyboardNavigation&&
this.map.enableKeyboardNavigation();this._finishEdit()}));this._inputBox.focus();this._inputBox.select();b=w.position(a,!0);this._inputBox.style.left=this._LTR?b.x+"px":"0px";this._inputBox.style.top=b.y+"px"},_finishEdit:function(){if(this._inputBox){var a=r.widgets.bookmarks.NLS_new_bookmark,b=m(".esriBookmarkLabel",this.bookmarkDomNode),c=this._inputBox.value;c===this._label.innerHTML?(this._inputBox.parentNode.removeChild(this._inputBox),this._inputBox=null):(this._label.textContent=""!==c?c:
a,k.forEach(this.bookmarks,function(a,c){a&&b[c]&&(a.name=b[c].innerHTML)}),this._inputBox.parentNode.removeChild(this._inputBox),this._inputBox=null,this.onEdit())}},_avatarCreator:function(a,b){var c=n.create("div");c.id=dojo.dnd.getUniqueId();l.add(c,"dojoDndItem");"avatar"!==b&&n.place(a,c);return{node:c,data:a,type:"something"}},_onClickHandler:function(a){var b=a.extent;a.extent.declaredClass||(b=new q(a.extent));this.map.setExtent(b);this.onClick()},toJson:function(){var a=[];k.forEach(this.bookmarks,
function(b){b&&a.push(b.toJson())});return a}});z("extend-esri")&&d.setObject("dijit.Bookmarks",t,E);return t});