(()=>{let e=null,s=null;function o(e,s){console.log("Enviando credenciales a todos los content scripts"),chrome.tabs.query({},(function(o){o.forEach((function(o){chrome.tabs.sendMessage(o.id,{credentials:{savedSessionKey:e,password:s}},(function(e){chrome.runtime.lastError||console.log(e.farewell)}))}))}))}setInterval((()=>{console.log("Credenciales actuales")}),5e3),chrome.permissions.getAll((function(e){console.log("Permisos actuales:",e)})),chrome.runtime.onInstalled.addListener((function(){console.log("Instaled")})),chrome.runtime.onMessage.addListener(((t,n,r)=>{if("downloadFile"===t.type){const e=t.text,s=JSON.stringify(e),o="data:application/json;charset=utf-8,"+encodeURIComponent(s);return chrome.downloads.download({url:o,filename:"myData.json",saveAs:!1,conflictAction:"uniquify"},(e=>{chrome.runtime.lastError?(console.error("Error en la descarga:",chrome.runtime.lastError),r({success:!1})):(console.log("Descarga iniciada con ID:",e),r({success:!0}))})),!0}"setPass"===t.message?(e=t.pass,o(s,e)):"getPass"===t.message?(e?r({pass:e}):(console.log("### PETICION A LOS SCRIPTS"),r(function(){try{chrome.tabs.query({},(function(o){o.forEach((o=>{chrome.tabs.sendMessage(o.id,{message:"getKeys"},(function(o){chrome.runtime.lastError?console.log("Error en funcion de pedir keys a los scripts",chrome.runtime.lastError.message):(console.log("response de scripts"),e=o.savedPass?o.savedPass:e,o.savedPass&&console.log("#### PASSWORD RECIBIDO"),s=o.sessionKey?o.sessionKey:s,o.sessionKey&&console.log("#### SESSION KEY RECIBIDO"))}))}))}))}catch(e){console.log(e)}finally{return{pass:e}}}())),o(s,e)):"setSessionKey"===t.message?(console.log("Session key setted"),s=t.sessionKey,o(s,e)):"getSessionKey"===t.message?r({sessionKey:s}):t.message})),chrome.tabs.onActivated.addListener((e=>{chrome.tabs.get(e.tabId,(e=>{e.url.includes("whatsapp.com")?chrome.scripting.executeScript({target:{tabId:e.id},files:["wappScript.js"]}):e.url.includes("instagram.com/direct")&&chrome.scripting.executeScript({target:{tabId:e.id},files:["igScript.js"]})}))})),chrome.tabs.onUpdated.addListener(((e,s,o)=>{"complete"===s.status&&o.url.includes("whatsapp.com")?chrome.scripting.executeScript({target:{tabId:o.id},files:["wappScript.js"]}):"complete"===s.status&&o.url.includes("instagram.com/direct/t")&&chrome.scripting.executeScript({target:{tabId:o.id},files:["igScript.js"]})}))})();