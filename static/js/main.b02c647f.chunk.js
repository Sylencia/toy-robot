(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,n){e.exports=n(72)},26:function(e,t,n){},4:function(e,t,n){e.exports={app:"App_app__MSMPD",commandsText:"App_commandsText__3ifD4",outputs:"App_outputs__2o39G",report:"App_report__2siFh"}},72:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(17),o=n.n(c),i=(n(26),n(1)),s=n(18),l=n.n(s),u=n(4),p=n.n(u),m=n(19),d=n.n(m),f=n(20),v=n.n(f),E={NORTH:0,EAST:1,SOUTH:2,WEST:3},h={0:{x:0,y:1},1:{x:1,y:0},2:{x:0,y:-1},3:{x:-1,y:0}},y=function(e,t){return e>=0&&t>=0&&e<5&&t<5},x=function(e){return"PLACE"===e.split(" ")[0]?function(e){var t=e.split(" ");if(2!==t.length)return!1;var n=Object(i.a)(t,2)[1].split(",");if(3!==n.length)return!1;var a=Object(i.a)(n,3),r=a[0],c=a[1],o=a[2],s=parseInt(r),l=parseInt(c);return!isNaN(s)&&!isNaN(l)&&void 0!==E[o]}(e):d()(["REPORT","MOVE","LEFT","RIGHT"],e)},b=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)([]),s=Object(i.a)(o,2),u=s[0],m=s[1];return Object(a.useEffect)(function(){m(function(e){var t=!1,n={x:-1,y:-1,direction:-1},a=[],r=e.split("\n"),c=!0,o=!1,s=void 0;try{for(var l,u=r[Symbol.iterator]();!(c=(l=u.next()).done);c=!0){var p=l.value,m=p.split(" "),d=Object(i.a)(m,2),f=d[0],b=d[1];if(!t){if("PLACE"!==f&&x(p))continue;t=!0}if(x(p))switch(f){case"REPORT":var O=v()(E)[n.direction];a.push("".concat(n.x,",").concat(n.y,",").concat(O));break;case"LEFT":n.direction=(n.direction+4-1)%4;break;case"RIGHT":n.direction=(n.direction+4+1)%4;break;case"PLACE":var w=b.split(","),T=Object(i.a)(w,3),_=T[0],k=T[1],g=T[2],j=parseInt(_),I=parseInt(k);y(j,I)&&(n.x=j,n.y=I,n.direction=parseInt(E[g]));break;case"MOVE":var N=h[n.direction],A=n.x+N.x,R=n.y+N.y;y(A,R)&&(n.x=A,n.y=R)}}}catch(S){o=!0,s=S}finally{try{c||null==u.return||u.return()}finally{if(o)throw s}}return a}(n))},[n]),r.a.createElement("div",{className:p.a.app},r.a.createElement("div",null,r.a.createElement("h3",null,"Input"),r.a.createElement("textarea",{className:p.a.commandsText,value:n,onChange:function(e){return c(e.target.value)},spellCheck:"false"})),r.a.createElement("div",{className:p.a.outputs},r.a.createElement("h3",null,"Report Outputs"),r.a.createElement("div",{className:p.a.report},r.a.createElement("ul",null,u.map(function(e){return r.a.createElement("li",{key:l.a.generate()},e)})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,1,2]]]);
//# sourceMappingURL=main.b02c647f.chunk.js.map