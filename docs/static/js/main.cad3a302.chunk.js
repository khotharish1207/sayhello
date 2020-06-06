(this["webpackJsonpjisti-chat"]=this["webpackJsonpjisti-chat"]||[]).push([[0],{30:function(e,t,a){e.exports=a(45)},38:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(11),o=a.n(i),l=a(18),c=a.n(l),u=(a(38),a(12)),s=a(47),d=a(29),m=a(53),E=a(52),h=a(48);var f=function(e){var t=e.show;return r.a.createElement(E.a,{show:t,size:"sm",centered:!0},r.a.createElement(E.a.Header,null,r.a.createElement(E.a.Title,null,"Loading")),r.a.createElement(E.a.Body,null,r.a.createElement(s.a,{className:"justify-content-md-center"},r.a.createElement(h.a,{animation:"grow",variant:"primary"}))))},p=a(49),v=a(54),y=a(50),g=a(51);var w=[{name:"Audio",value:1},{name:"Video",value:2}];var O=function(e){var t=e.onClose,a=e.onStart,i=e.show,o=new c.a(window.location.href,!0),l=o.query.roomId,s=Object(n.useState)(1),m=Object(u.a)(s,2),h=m[0],f=m[1],O=Object(n.useState)(l||""),b=Object(u.a)(O,2),A=b[0],N=b[1],S=Object(n.useState)(function(e){for(var t=e+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var r=a[n];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null}("displayName")||"My Name"),I=Object(u.a)(S,2),T=I[0],_=I[1];return r.a.createElement(E.a,{show:i,backdrop:"static",keyboard:!1,centered:!0},r.a.createElement(E.a.Header,{className:"justify-content-md-center"},r.a.createElement(E.a.Title,null,"Start Meet")),r.a.createElement(E.a.Body,null,r.a.createElement(p.a,{className:"mb-3"},r.a.createElement(p.a.Prepend,null,r.a.createElement(p.a.Text,{id:"inputGroup-sizing-default"},"Room Id")),r.a.createElement(v.a,{onChange:function(e){return N(e.target.value)},value:A,"aria-label":"Default","aria-describedby":"inputGroup-sizing-default"})),r.a.createElement(p.a,{className:"mb-3"},r.a.createElement(p.a.Prepend,null,r.a.createElement(p.a.Text,{id:"inputGroup-sizing-default"},"Name")),r.a.createElement(v.a,{onChange:function(e){return _(e.target.value)},value:T,"aria-label":"Default","aria-describedby":"inputGroup-sizing-default"})),r.a.createElement(p.a,{className:"mb-3"},r.a.createElement(y.a,{toggle:!0},w.map((function(e,t){return r.a.createElement(g.a,{key:t,type:"radio",variant:h===e.value?"primary":"outline-primary",name:"radio",value:e.value,checked:h===e.value,onChange:function(e){return f(Number(e.currentTarget.value))}},e.name)}))))),r.a.createElement(E.a.Footer,null,r.a.createElement(d.a,{variant:"primary",onClick:function(){var e,n;e="displayName",n=T,document.cookie=e+"="+(n||"")+"; path=/",o.query.roomId=A,window.history.pushState("","",o.toString());var r=1===h;t(),a(A,T,r)}},"Say Hello")))};var b=function(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],i=t[1],o=Object(n.useState)(!1),l=Object(u.a)(o,2),c=l[0],E=l[1],h=Object(n.useState)(!1),p=Object(u.a)(h,2),v=p[0],y=p[1],g={display:a?"none":"block",width:"100%",height:"100%"};return Object(n.useEffect)((function(){window.JitsiMeetExternalAPI?E(!0):alert("Jitsi Meet API script not loaded")}),[]),r.a.createElement("div",{fluid:!0,style:{width:"100%",height:"100vh"}},r.a.createElement(f,{show:a}),r.a.createElement(O,{show:c,onStart:function(e,t,a){i(!0);try{var n={roomName:"".concat(e),parentNode:document.getElementById("jitsi-container"),interfaceConfigOverwrite:{filmStripOnly:!1,DEFAULT_REMOTE_DISPLAY_NAME:"",SHOW_JITSI_WATERMARK:!1,SHOW_WATERMARK_FOR_GUESTS:!1,APP_NAME:"Say Hello",DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT:!1,NATIVE_APP_NAME:"Say Hello",PROVIDER_NAME:"Harish",INVITATION_POWERED_BY:!1,VERTICAL_FILMSTRIP:!0,ENABLE_FEEDBACK_ANIMATION:!0,VIDEO_QUALITY_LABEL_DISABLED:!0,SHOW_CHROME_EXTENSION_BANNER:!1,HIDE_KICK_BUTTON_FOR_GUESTS:!0,TOOLBAR_BUTTONS:["microphone","camera","closedcaptions",![/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some((function(e){return navigator.userAgent.match(e)}))&&"desktop","fullscreen","hangup","profile","chat","sharedvideo","raisehand","videoquality","filmstrip","mute-everyone","security"].filter((function(e){return e}))},configOverwrite:{disableSimulcast:!1,enableClosePage:!1,enableWelcomePage:!0,enableNoAudioDetection:!1,disableDeepLinking:!0,enableNoisyMicDetection:!1,startAudioOnly:a}},r=new window.JitsiMeetExternalAPI("meet.jit.si",n);r.addEventListener("videoConferenceJoined",(function(){i(!1),r.executeCommand("displayName",t)})),r.addEventListener("readyToClose",(function(){window.location.reload()}))}catch(o){console.error("Failed to load Jitsi API",o)}},onClose:function(){return E(!1)}}),!a&&!c&&r.a.createElement(s.a,{style:{position:"absolute",margin:"10px"}},r.a.createElement(d.a,{variant:"outline-light",size:"sm",onClick:function(e){navigator.clipboard.writeText(window.location.href).then((function(){y(!0),setTimeout((function(){y(!1)}),1500)}),(function(e){console.error("Async: Could not copy text: ")}))}},"Copy meeting"),r.a.createElement(m.a,{show:v},r.a.createElement(m.a.Body,null,"Url copied to clipboard"))),r.a.createElement("div",{id:"jitsi-container",style:g}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(44);var A=new c.a(window.location.href,!0),N=A.query.roomId;N||(N=(new Date).getTime(),A.query.roomId=N,window.history.pushState("","",A.toString())),o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.cad3a302.chunk.js.map