function importsidebar() {
  var template = document.createElement("p");
  var topbar = document.createElement("p");
  var append = document.getElementById("import");
  var top = document.getElementById("top");

  topbar.innerHTML = `<div class="topnav">
    <a class="active" href="/home">Suzu</a>
    <a class="extra" href="/docs">Docs</a>
    <a class="Dashboard" href="/">Dashboard</a> 
    <a href="/experiments">Experiments</a>
  </div>
  </div>`
  top.prepend(topbar)
  template.innerHTML = `<div class="sidenav">
    <a href="/docs/web/setupExpress">setupExpress</a>
    <a href="/docs/client/setupIntents">setupIntents</a>
    <a href="/docs/client/clientSetup">clientSetup</a>
    <a href="/docs/minecraft/setUpBot">setUpBot</a>
    <a href="/docs/extras/console">console</a>
    <a href="/docs/extras/envExports">envExports</a>
    <a href="/docs/minecraft/chatHandling/getRank">getGuildRank</a>
    <a href="/docs/minecraft/chatHandling/getRank">getRank</a>
    <a href="/docs/minecraft/chatHandling/getUsername">getUsername</a>
    <a href="/docs/minecraft/chatHandling/handleMessages">handleMessages</a>
    <a href="/docs/minecraft/chatHandling/removeExtras">removeExtras</a>
    <a href="/docs/minecraft/apifunctions/weight/getProfile">weight/getProfile<a>
    <a href="/docs/minecraft/apifunctions/weight/getWeight">getWeight<a>
    <a href="/docs/minecraft/apifunctions/weight/weight">weight<a>
    </div>`;
  append.appendChild(template);
}