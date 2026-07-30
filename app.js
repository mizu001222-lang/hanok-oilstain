(function(){
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el){ observer.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add("is-visible"); });
  }

  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function(){
      nav.classList.toggle("nav-open");
    });
  }

  var statsEl = document.getElementById("aboutStats");
  if (statsEl) {
    var counters = statsEl.querySelectorAll(".count-num");
    var counted = false;
    var runCount = function(){
      if (counted) return;
      counted = true;
      counters.forEach(function(el){
        var target = parseInt(el.getAttribute("data-target"), 10);
        var duration = 1500;
        var startTime = null;
        var step = function(ts){
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        };
        requestAnimationFrame(step);
      });
    };
    if ("IntersectionObserver" in window) {
      var statsObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            runCount();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
      statsObserver.observe(statsEl);
    } else {
      runCount();
    }
    window.addEventListener("load", function(){
      var rect = statsEl.getBoundingClientRect();
      if (rect.top < window.innerHeight) runCount();
    });
  }

  var modal = document.getElementById("processModal");
  var openBtn = document.getElementById("oilStainTrigger");
  var closeBtn = document.getElementById("processClose");
  if (modal && openBtn && closeBtn) {
    var openModal = function(){
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    var closeModal = function(){
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function(e){
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape") closeModal();
    });
  }
})();
