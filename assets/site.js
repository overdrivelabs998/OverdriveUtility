/* Overdrive Utility — shared behaviour: TH/EN switch, mobile nav, active link.
   Everything runs locally in the browser; nothing is sent anywhere. */
(function () {
  var KEY = "ov-lang";

  function pick() {
    try { var q = new URLSearchParams(location.search).get("lang"); if (q === "th" || q === "en") return q; } catch (e) {}
    try { var s = localStorage.getItem(KEY); if (s === "th" || s === "en") return s; } catch (e) {}
    var l = (navigator.language || "en").toLowerCase();
    return l.indexOf("th") === 0 ? "th" : "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll("[data-th],[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i], v = n.getAttribute("data-" + lang);
      if (v === null) continue;
      if (n.tagName === "INPUT" || n.tagName === "TEXTAREA") n.placeholder = v;
      else if (n.tagName === "TITLE") document.title = v;
      else n.textContent = v;
    }
    var only = document.querySelectorAll("[data-only]");
    for (var j = 0; j < only.length; j++) {
      if (only[j].getAttribute("data-only") === lang) only[j].removeAttribute("data-lang-hidden");
      else only[j].setAttribute("data-lang-hidden", "");
    }
    var t = document.getElementById("langToggle");
    if (t) t.textContent = lang === "th" ? "EN" : "ไทย";
  }

  var current = pick();
  window.OV = {
    lang: function () { return current; },
    set: function (l) { current = l; try { localStorage.setItem(KEY, l); } catch (e) {} apply(l); }
  };

  document.addEventListener("DOMContentLoaded", function () {
    apply(current);
    var t = document.getElementById("langToggle");
    if (t) t.addEventListener("click", function () { window.OV.set(current === "th" ? "en" : "th"); });
    var m = document.getElementById("menuBtn"), links = document.getElementById("navLinks");
    if (m && links) m.addEventListener("click", function () { links.classList.toggle("open"); });
    var here = location.pathname.split("/").pop() || "index.html";
    var as = document.querySelectorAll("#navLinks a");
    for (var i = 0; i < as.length; i++) if (as[i].getAttribute("href") === here) as[i].classList.add("active");
  });
})();
