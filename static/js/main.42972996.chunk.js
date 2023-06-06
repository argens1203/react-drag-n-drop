(this["webpackJsonpswap-frontend"]=this["webpackJsonpswap-frontend"]||[]).push([[0],{76:function(e,n,t){},80:function(e,n,t){},97:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),i=t(22),o=t.n(i),a=(t(76),t(7)),l=t(116),d=t(120),u="ROOT",s=(t(80),t(53)),f=t(33),b={blocks:{},isChildren:{},childrenOrder:{},findParent:{}},j=Object(f.b)({name:"data",initialState:b,reducers:{putBlock:function(e,n){var t=n.payload;e.blocks[t.id]=t},editBlock:function(e,n){var t=n.payload;e.blocks[t.id]=Object.assign({},e.blocks[t.id],t)},removeBlock:function(e,n){var t=n.payload;delete e.blocks[t];var r=e.findParent[t];r&&k(e,t,r),D(e,t)},setParent:function(e,n){var t=n.payload,r=t.child,c=t.parent;r!==c&&r!==u&&(m(e,r,c),k(e,r,c),y(e,c,r))},putBeforeAndSetSibling:function(e,n){var t=n.payload,r=t.target,c=t.before;if(c!==u&&r!==c){var i=e.findParent[c];m(e,r,i),k(e,r,i);var o=e.childrenOrder[i].indexOf(c);y(e,i,r,o)}}}}),v=j.reducer,O=j.actions,h=O.putBlock,p=(O.editBlock,O.removeBlock),g=O.setParent,x=O.putBeforeAndSetSibling;function k(e,n,t){var r=e.childrenOrder[t].indexOf(n);-1!==r&&e.childrenOrder[t].splice(r,1)}function y(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1;-1===r?e.childrenOrder[n].push(t):e.childrenOrder[n].splice(r,0,t)}function m(e,n,t){if(function(e,n,t){var r=n;for(;r!==u;){if(r===e)return!0;r=t[r]}return!1}(n,t,e.findParent)){var r=n,c=t,i=e.findParent[r];D(e,c),w(e,c,i),D(e,r),w(e,r,c)}else D(e,n),w(e,n,t)}function D(e,n){var t=e.findParent[n];t&&(e.isChildren[t][n]=!1),delete e.findParent[n]}function w(e,n,t){var r,c,i;e.isChildren[t]||(e.isChildren[t]={}),e.childrenOrder[t]||(e.childrenOrder[t]=[]),e.isChildren[t][n]=!0,e.findParent[n]=t,e.blocks[n].level=(null!==(r=null===(c=e.blocks)||void 0===c||null===(i=c[t])||void 0===i?void 0:i.level)&&void 0!==r?r:-1)+1,e.childrenOrder[t].includes(n)||e.childrenOrder[t].push(n)}var C=["red","blue","grey","green","yellow","black"];function B(){return function(e){C.forEach((function(n){var t=function(e){return{id:Object(s.generate)(),color:e}}(n);e(h(t)),e(g({child:t.id,parent:u}))}))}}var M=t(119),L=t(10),P=10,S=t(121),I={BLOCK:"BLOCK"};var E=t(3);function T(e){var n=e.id,t=(Object(a.c)((function(e){return e.block.blocks[n]}))||{}).level,r=void 0===t?0:t,c=function(e){var n=Object(a.b)();return Object(S.a)((function(){return{accept:I.BLOCK,drop:function(t){n(x({target:t.id,before:e}))},collect:function(e){return{hovered:e.isOver(),canDrop:e.canDrop()}},canDrop:function(n){return n.id!==e}}}))}(n),i=Object(L.a)(c,2),o=i[0],l=i[1],d=o.hovered,u=o.canDrop,s="transparent";return d&&u&&(s="blue"),Object(E.jsx)("div",{ref:l,style:{height:10,display:"flex",backgroundColor:s,marginLeft:P*r}})}var F=c.a.forwardRef((function(e,n){var t=e.id,r=e.hovered,c=e.canDrop,i=(Object(a.c)((function(e){return e.block.blocks[t]}))||{}).color,o=r&&c?.5:1;return Object(E.jsx)("div",{ref:n,style:{borderLeft:"1px solid ".concat(i),backgroundColor:"white",height:100,flex:1,opacity:o}})}));function K(e){var n=e.id,t=function(e){var n=Object(a.b)();return Object(S.a)((function(){return{accept:I.BLOCK,drop:function(t){n(g({child:t.id,parent:e}))},collect:function(e){return{hovered:e.isOver(),canDrop:e.canDrop()}},canDrop:function(n){return n.id!==e}}}))}(n),r=Object(L.a)(t,2),c=r[0],i=r[1],o=c||{},l=o.hovered,d=o.canDrop;return Object(E.jsx)(F,{ref:i,id:n,hovered:l,canDrop:d})}var z=t(122);var R,X=t(114),U=(R=X.a,function(e){var n,t=e.id,r=Object(z.a)((function(){return{type:I.BLOCK,item:{id:t}}})),c=Object(L.a)(r,2)[1];return Object(E.jsx)("div",{ref:c,style:null!==(n=e.style)&&void 0!==n?n:{},children:Object(E.jsx)(R,{})})}),A=t(20),J={isDragging:!1,start:void 0,current:void 0,translate:0};var W=t(115);function q(e){var n=e.passedThreshold?"2em":"1em";return Object(E.jsx)("div",{style:{backgroundColor:"red",height:"100%",width:"100%",position:"absolute",left:0,top:0,zIndex:-1,display:"flex",alignItems:"center",justifyContent:"flex-end",overflow:"hidden"},children:Object(E.jsx)("div",{style:{marginRight:"2em"},children:Object(E.jsx)(W.a,{style:{height:n,width:n,color:"white",zIndex:0}})})})}var G=100;function H(e){var n=e.style,t=void 0===n?{}:n,c=e.onDelete,i=void 0===c?function(){}:c,o=function(){var e=Object(r.useState)(J),n=Object(L.a)(e,2),t=n[0],c=n[1];return[{onMouseDown:function(e){c((function(n){return Object(A.a)(Object(A.a)({},n),{},{isDragging:!0,start:e.clientX})}))},onMouseMove:function(e){c((function(n){return Object(A.a)(Object(A.a)({},n),{},{current:n.isDragging?e.clientX:void 0,translate:n.start&&n.current?n.current-n.start:0})}))},onMouseUp:function(e){c(J)}},t]}(),a=Object(L.a)(o,2),l=a[0],d=a[1],u=l.onMouseDown,s=l.onMouseUp,f=l.onMouseMove,b=d.translate,j=d.isDragging,v=Object(r.useState)(),O=Object(L.a)(v,2),h=O[0],p=O[1],g=Object(r.createRef)();Object(r.useEffect)((function(){var e;p(null===(e=g.current)||void 0===e?void 0:e.offsetWidth);var n=function(e){var n;p(null===(n=g.current)||void 0===n?void 0:n.offsetWidth)};return window.addEventListener("resize",n),function(){window.removeEventListener("resize",n)}}),[g]);var x=Object(r.useState)(!1),k=Object(L.a)(x,2),y=k[0],m=k[1];Object(r.useEffect)((function(){j&&b&&h&&m(-b/h>.25)}),[b,h,j]);var D=y&&!j?"translateX(-1000%)":"translateX(".concat(Math.min(b,0),"px)");return Object(r.useEffect)((function(){y&&!j&&setTimeout((function(){return i()}),G)}),[y,j,i]),Object(E.jsxs)("div",{ref:g,onMouseDown:u,onMouseMove:f,onMouseUp:s,onMouseLeave:s,style:Object(A.a)({position:"relative"},t),children:[Object(E.jsx)("div",{style:{transform:D,cursor:"move"},children:e.children}),Object(E.jsx)(q,{passedThreshold:y})]})}function N(e){var n=e.id,t=Object(a.b)(),r=Object(a.c)((function(e){return e.block.blocks[n]}))||{},c=r.color,i=r.level,o=void 0===i?0:i,l=Object(a.c)((function(e){return e.block.isChildren[n]}))||{},d=Object(a.c)((function(e){return e.block.childrenOrder[n]||[]})).filter((function(e){return l[e]})),u=o*P;return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsxs)(M.a,{flexDirection:"column",display:"flex",flex:1,alignItems:"stretch",children:[Object(E.jsx)(T,{id:n}),Object(E.jsx)(H,{style:{marginLeft:u},onDelete:function(){return t(function(e){return function(n){n(p(e))}}(n))},children:Object(E.jsxs)(M.a,{flexDirection:"row",display:"flex",alignItems:"center",position:"relative",style:{border:"1px solid ".concat(c)},children:[Object(E.jsx)(U,{id:n,style:{backgroundColor:"white",alignSelf:"stretch",alignItems:"center",display:"flex"}}),Object(E.jsx)(K,{id:n})]})})]}),d.map((function(e){return Object(E.jsx)(N,{id:e},e)}))]})}var Q=function(){var e=Object(a.c)((function(e){return e.block.isChildren[u]}))||{},n=(Object(a.c)((function(e){return e.block.childrenOrder[u]}))||[]).filter((function(n){return e[n]})),t=Object(a.b)();return Object(E.jsxs)(l.a,{children:[Object(E.jsx)(d.a,{onClick:function(){t(B())},children:"initBlocks"}),n.map((function(e){return Object(E.jsx)(N,{id:e},e)}))]})},V=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,125)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,i=n.getLCP,o=n.getTTFB;t(e),r(e),c(e),i(e),o(e)}))},Y=t(15),Z=t(26),$=Object(Y.b)({block:v}),_=Object(f.a)({reducer:$,middleware:[Z.a]}),ee=t(117),ne=t(60);o.a.render(Object(E.jsx)(c.a.StrictMode,{children:Object(E.jsx)(a.a,{store:_,children:Object(E.jsx)(ee.a,{backend:ne.a,children:Object(E.jsx)(Q,{})})})}),document.getElementById("root")),V()}},[[97,1,2]]]);
//# sourceMappingURL=main.42972996.chunk.js.map