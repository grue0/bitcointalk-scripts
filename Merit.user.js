// ==UserScript==
// @name        bitcointalk merit
// @namespace   grue
// @include     https://bitcointalk.org/index.php?topic=*
// @require     https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js
// @version     1.2
// @downloadURL https://github.com/grue0/bitcointalk-scripts/raw/master/Merit.user.js
// @grant none
// ==/UserScript==

(() => {
  //get csrf token from the logout link
  let sc = $('td.maintab_back a[href*="index.php?action=logout;sesc="').attr("href");
  sc = /;sesc=(.*)/.exec(sc)[1];
  
  //selector for the "+Merit" link
  $('td.td_headerandpost div[id^=ignmsgbttns] a[href*="index.php?action=merit;msg="]')
  .each((i, e) => {
    const msgId = /msg=([0-9]+)/.exec(e.href)[1];
    
    const $popup = $(['<div id="grue-merit-popup' + msgId +'" class="grue-merit-popup" style="position: absolute; right: 40px; background-color: #ddd; font-size: 13px; padding: 8px;border-width: 1px;border-color: black;border-style: solid;">',
      '  <form>',
      '    <div>',
      '      Merit points: <input size="6" name="merits" value="0" type="text"/>',
      '    </div>',
      '    <div style="margin-top: 6px"><input value="Send" type="submit"></div>',
      '  </form>',
      '</div>'
    ].join("\n"));
    $popup.find("form").submit( (e) => {
      e.preventDefault();
      $popup.find('input[type="submit"]')
        .prop("disabled", true)
        .val("Sending...");
      const merits = e.target.elements["merits"].value;
      
      $.post(
        "https://bitcointalk.org/index.php?action=merit",
        {merits, msgID: msgId, sc}
      ).then((data) => {
        //Error pages usually have this (rough heuristic)
        if(data.includes("<title>An Error Has Occurred!</title")) {
          throw "error";
        }
        //double check and see whether the post we merited was added to the list. Its msgId should be visible in the page source.
        if(data.includes("#msg" + msgId)) {
          alert("Merit added.");
          $("#grue-merit-popup" + msgId).toggle(false);
          return;
        }
        alert("Server response indeterminate.");
      })
      .catch(() => alert("Failed to add merit."))
      .always(() => {
        $popup.find('input[type="submit"]')
        .prop("disabled", false)
        .val("Send");
      });
    });
    $popup.insertAfter(e);
    
    $(e).click((e) => {
      e.preventDefault();
      $("#grue-merit-popup" + msgId).toggle();
    });
  });
   $(".grue-merit-popup").toggle(false);
})();