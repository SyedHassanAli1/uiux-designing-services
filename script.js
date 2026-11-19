/* ============================================================
   SCRIPTS — lightweight vanilla JS, all motion-safe
   ============================================================ */
    (function () {
      'use strict';
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* --- Sticky nav condense on scroll --- */
      var navElement = document.getElementById('nav');
      function onScroll() {
        if (window.scrollY > 24) navElement.classList.add('condensed');
        else navElement.classList.remove('condensed');
      }
      window.addEventListener('scroll', onScroll, {passive: true});
      onScroll();

      /* --- Mobile nav positioning --- */
      var nav = document.getElementById('nav');
      var mobileMenu = document.getElementById('mobileMenu');
      var hamburger = document.getElementById('hamburger');

      function syncMobileNavHeight() {
        if (!nav) return;
        document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
      }
      syncMobileNavHeight();
      window.addEventListener('resize', syncMobileNavHeight, {passive: true});

      /* --- Mobile Services accordion --- */
      var mServicesBtn = document.getElementById('mServicesBtn');
      var mServicesPanel = document.getElementById('mServicesPanel');

      function collapseServices() {
        if (!mServicesBtn || !mServicesPanel) return;
        mServicesPanel.hidden = true;
        mServicesBtn.setAttribute('aria-expanded', 'false');
      }

      /* --- Mobile menu toggle --- */
      function setMenu(open) {
        if (!mobileMenu || !hamburger) return;

        mobileMenu.hidden = !open;
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

        // Keep the mobile panel locked to the viewport and prevent the page
        // behind it from scrolling while the menu is open.
        document.documentElement.style.overflow = open ? 'hidden' : '';
        document.body.style.overflow = open ? 'hidden' : '';

        if (!open) collapseServices();
      }

      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function (e) {
          e.preventDefault();
          setMenu(mobileMenu.hidden);
        });

        // Any navigation link closes the mobile menu.
        mobileMenu.addEventListener('click', function (e) {
          var target = e.target;
          var link = target && target.closest ? target.closest('a') : null;
          if (link && mobileMenu.contains(link)) {
            setMenu(false);
          }
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.hidden) setMenu(false);
      });

      if (mServicesBtn && mServicesPanel) {
        mServicesBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var isOpen = mServicesBtn.getAttribute('aria-expanded') === 'true';
          var shouldOpen = !isOpen;

          mServicesPanel.hidden = !shouldOpen;
          mServicesBtn.setAttribute('aria-expanded', String(shouldOpen));
        });
      }

      // Reset the mobile menu when returning to desktop.
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.hidden) {
          setMenu(false);
        }
      }, {passive: true});

      /* --- Scroll reveal (fade + slight rise) --- */
      var revealEls = document.querySelectorAll('.reveal');
      if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) {el.classList.add('is-visible');});
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
        revealEls.forEach(function (el) {io.observe(el);});
      }

      /* --- Testimonial card reveal (own observer for sequenced inner animations) --- */
      var testiCards = document.querySelectorAll('.testi-card');
      if (reduceMotion || !('IntersectionObserver' in window)) {
        testiCards.forEach(function (el) {el.classList.add('is-visible');});
      } else {
        var tio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              tio.unobserve(entry.target);
            }
          });
        }, {threshold: 0.15, rootMargin: '0px 0px -60px 0px'});
        testiCards.forEach(function (el) {tio.observe(el);});
      }

      /* --- Capability card reveal ("What We Do") --- */
      var capCards = document.querySelectorAll('.cap-card');
      if (reduceMotion || !('IntersectionObserver' in window)) {
        capCards.forEach(function (el) {el.classList.add('is-visible');});
      } else {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              cio.unobserve(entry.target);
            }
          });
        }, {threshold: 0.12, rootMargin: '0px 0px -50px 0px'});
        capCards.forEach(function (el) {cio.observe(el);});
      }

      /* --- Problem card reveal ("The Problem") --- */
      var probCards = document.querySelectorAll('.prob-card');
      if (reduceMotion || !('IntersectionObserver' in window)) {
        probCards.forEach(function (el) {el.classList.add('is-visible');});
      } else {
        var pio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              pio.unobserve(entry.target);
            }
          });
        }, {threshold: 0.12, rootMargin: '0px 0px -50px 0px'});
        probCards.forEach(function (el) {pio.observe(el);});
      }

      /* --- Related service card reveal --- */
      var relCards = document.querySelectorAll('.related-card');
      if (reduceMotion || !('IntersectionObserver' in window)) {
        relCards.forEach(function (el) {el.classList.add('is-visible');});
      } else {
        var rio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              rio.unobserve(entry.target);
            }
          });
        }, {threshold: 0.15, rootMargin: '0px 0px -60px 0px'});
        relCards.forEach(function (el) {rio.observe(el);});
      }

      /* --- Count-up on stats --- */
      function animateCounter(el) {
        var target = parseFloat(el.getAttribute('data-target'));
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduceMotion) {el.textContent = target.toFixed(decimals) + suffix; return;}
        var start = null, duration = 1400;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(tick);
      }
      var counters = document.querySelectorAll('.counter');
      if (!('IntersectionObserver' in window)) {
        counters.forEach(animateCounter);
      } else {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {animateCounter(entry.target); cio.unobserve(entry.target);}
          });
        }, {threshold: 0.6});
        counters.forEach(function (el) {cio.observe(el);});
      }

      /* --- Reflect dropdown open state on aria-expanded --- */
      document.querySelectorAll('.has-dropdown').forEach(function (d) {
        var btn = d.querySelector('button');
        if (!btn) return;
        d.addEventListener('mouseenter', function () {btn.setAttribute('aria-expanded', 'true');});
        d.addEventListener('mouseleave', function () {btn.setAttribute('aria-expanded', 'false');});
        d.addEventListener('focusin', function () {btn.setAttribute('aria-expanded', 'true');});
        d.addEventListener('focusout', function () {btn.setAttribute('aria-expanded', 'false');});
      });

      /* --- Section 5 · "Start here" situation selector --- */
      (function () {
        var list = document.getElementById('fitList');
        if (!list) return;
        var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
        var indicator = document.getElementById('fitIndicator');
        var panel = document.getElementById('fitPanel');
        var inner = document.getElementById('fitPanelInner');
        var solutionEl = document.getElementById('fitSolution');
        var linkEl = document.getElementById('fitLink');

        // Approach + service for each situation (index-matched to the tabs)
        var data = [
          {solution: "We audit the experience and redesign the parts that lose people.", label: "UX Audit & Redesign", href: "#work"},
          {solution: "We design it right from the first screen — clear, usable, ready to build.", label: "Product Design", href: "#services"},
          {solution: "We build a design system so every screen looks and works as one.", label: "Design Systems", href: "#services"}
        ];
        var current = 0, swapTimer;

        function moveIndicator(btn) {
          indicator.style.height = btn.offsetHeight + 'px';
          indicator.style.transform = 'translateY(' + btn.offsetTop + 'px)';
        }

        function select(i, focus) {
          if (i === current) {if (focus) tabs[i].focus(); return;}
          tabs.forEach(function (t, idx) {
            var on = idx === i;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
          });
          panel.setAttribute('aria-labelledby', tabs[i].id);
          moveIndicator(tabs[i]);

          // Cross-fade the panel; latest selection always wins (guards fast hover sweeps)
          clearTimeout(swapTimer);
          inner.classList.add('is-swapping');
          swapTimer = window.setTimeout(function () {
            solutionEl.textContent = data[i].solution;
            linkEl.childNodes[0].nodeValue = data[i].label + ' ';
            linkEl.setAttribute('href', data[i].href);
            inner.classList.remove('is-swapping');
          }, 160);

          current = i;
          if (focus) tabs[i].focus();
        }

        tabs.forEach(function (tab, i) {
          tab.addEventListener('click', function () {select(i, false);});
          tab.addEventListener('mouseenter', function () {select(i, false);});
          tab.addEventListener('keydown', function (e) {
            var n = null;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
            else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
            else if (e.key === 'Home') n = 0;
            else if (e.key === 'End') n = tabs.length - 1;
            if (n !== null) {e.preventDefault(); select(n, true);}
          });
        });

        // Place the indicator once layout/fonts have settled, and keep it aligned on resize
        function place() {moveIndicator(tabs[current]);}
        if (document.readyState === 'complete') place();
        else window.addEventListener('load', place);
        window.addEventListener('resize', place);
      })();

      /* --- Section 9 · Testimonial spotlight (auto-advancing) --- */
      (function () {
        var spot = document.getElementById('tSpot');
        if (!spot) return;
        var quoteEl = document.getElementById('tQuote');
        var nameEl = document.getElementById('tName');
        var roleEl = document.getElementById('tRole');
        var avatarEl = document.getElementById('tAvatar');
        var bar = document.getElementById('tBar');
        var chips = Array.prototype.slice.call(document.querySelectorAll('.testi-chip'));
        var avatars = document.querySelectorAll('.testi-av');

        var data = [
          {q: "They didn't just make it look better — they made it make sense. Our users finally get it.", name: "Sarah Lin", role: "Product Lead, [Company]", initials: "SL", grad: "linear-gradient(135deg,#7FE85A,#2f9e44)"},
          {q: "Having design and build in one team meant nothing got lost in translation. Fast and clean.", name: "James Okoro", role: "Founder, [Company]", initials: "JO", grad: "linear-gradient(135deg,#c7c7c3,#52525b)"},
          {q: "The clearest, most structured design process we've worked with. We always knew the next step.", name: "Priya Nair", role: "CEO, [Company]", initials: "PN", grad: "linear-gradient(135deg,#b8f18f,#4d7c0f)"}
        ];
        var current = 0, timer, INTERVAL = 6000;

        // Paint the fixed avatar backgrounds once (main + chips share index order)
        avatars.forEach(function (av) {
          var t = av.textContent.trim();
          var d = data.filter(function (x) {return x.initials === t;})[0];
          if (d) av.style.background = d.grad;
        });

        function restartBar() {
          if (reduceMotion) return;
          bar.classList.remove('run');
          void bar.offsetWidth; // reflow to restart the CSS animation
          bar.classList.add('run');
        }

        function schedule() {
          window.clearTimeout(timer);
          if (reduceMotion) return;
          timer = window.setTimeout(function () {select((current + 1) % data.length, false);}, INTERVAL);
        }

        function select(i, fromClick) {
          if (i === current && fromClick) return;
          var d = data[i];
          chips.forEach(function (c, idx) {c.setAttribute('aria-pressed', String(idx === i));});

          spot.classList.add('is-swapping');
          window.setTimeout(function () {
            quoteEl.textContent = d.q;
            nameEl.textContent = d.name;
            roleEl.textContent = d.role;
            avatarEl.textContent = d.initials;
            avatarEl.style.background = d.grad;
            spot.classList.remove('is-swapping');
          }, 200);

          current = i;
          restartBar();
          schedule();
        }

        chips.forEach(function (chip) {
          var i = parseInt(chip.getAttribute('data-i'), 10);
          chip.addEventListener('click', function () {select(i, true);});
        });

        // Pause on hover / focus so people can read; resume on leave
        function pause() {window.clearTimeout(timer); if (!reduceMotion) bar.style.animationPlayState = 'paused';}
        function resume() {if (!reduceMotion) {bar.style.animationPlayState = 'running'; restartBar(); schedule();} }
        spot.parentElement.addEventListener('mouseenter', pause);
        spot.parentElement.addEventListener('mouseleave', resume);
        spot.parentElement.addEventListener('focusin', pause);
        spot.parentElement.addEventListener('focusout', resume);

        // Kick things off
        restartBar();
        schedule();
      })();

      /* --- Section 6 · Work horizontal scroller --- */
      (function () {
        var scroller = document.getElementById('workScroller');
        if (!scroller) return;
        var prev = document.getElementById('workPrev');
        var next = document.getElementById('workNext');

        function stepSize() {
          var slide = scroller.querySelector('.work-slide');
          return slide ? slide.getBoundingClientRect().width + 24 /* gap-6 */ : scroller.clientWidth * 0.8;
        }
        function go(dir) {
          scroller.scrollBy({left: dir * stepSize(), behavior: reduceMotion ? 'auto' : 'smooth'});
        }
        if (prev) prev.addEventListener('click', function () {go(-1);});
        if (next) next.addEventListener('click', function () {go(1);});

        function update() {
          var max = scroller.scrollWidth - scroller.clientWidth - 2;
          if (prev) prev.disabled = scroller.scrollLeft <= 2;
          if (next) next.disabled = scroller.scrollLeft >= max;
        }
        scroller.addEventListener('scroll', update, {passive: true});
        window.addEventListener('resize', update);
        update();
      })();
    })();

/* ============================================================
   Interaction polish — additive, motion-safe, touch-safe.
   (Does not alter any existing behavior.)
   ============================================================ */
    (function () {
      'use strict';
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      /* --- Scroll progress bar --- */
      var bar = document.getElementById('scrollProgress');
      if (bar && !reduce) {
        var barTicking = false;
        function updateBar() {
          var st = window.scrollY || document.documentElement.scrollTop || 0;
          var h = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
          barTicking = false;
        }
        window.addEventListener('scroll', function () {
          if (!barTicking) {window.requestAnimationFrame(updateBar); barTicking = true;}
        }, {passive: true});
        window.addEventListener('resize', updateBar, {passive: true});
        updateBar();
      }

      /* --- Staggered reveals: cascade siblings that enter together --- */
      if (!reduce) {
        document.querySelectorAll('.reveal').forEach(function (el) {
          var parent = el.parentElement;
          if (!parent) return;
          var sibs = Array.prototype.filter.call(parent.children, function (c) {
            return c.classList && c.classList.contains('reveal');
          });
          if (sibs.length < 2) return;
          var idx = sibs.indexOf(el);
          if (idx > 0) el.style.transitionDelay = Math.min(idx * 70, 350) + 'ms';
        });
      }

      /* --- Magnetic primary buttons (desktop pointer only) --- */
      if (canHover && !reduce) {
        document.querySelectorAll('.btn-primary').forEach(function (btn) {
          btn.classList.add('is-magnetic');
          var strength = 0.28, max = 6;
          btn.addEventListener('pointermove', function (e) {
            var r = btn.getBoundingClientRect();
            var x = (e.clientX - (r.left + r.width / 2)) * strength;
            var y = (e.clientY - (r.top + r.height / 2)) * strength;
            x = Math.max(-max, Math.min(max, x));
            y = Math.max(-max, Math.min(max, y));
            btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (y - 2).toFixed(1) + 'px)';
          });
          btn.addEventListener('pointerleave', function () {btn.style.transform = '';});
        });
      }

      /* --- Gentle parallax on the hero glow --- */
      if (canHover && !reduce) {
        var heroBlob = document.querySelector('#hero .blob.parallax');
        if (heroBlob) {
          var pending = false, lastX = 0, lastY = 0;
          function applyParallax() {
            heroBlob.style.transform = 'translate3d(calc(-50% + ' + lastX.toFixed(1) + 'px), ' + lastY.toFixed(1) + 'px, 0)';
            pending = false;
          }
          window.addEventListener('pointermove', function (e) {
            var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
            lastX = ((e.clientX - cx) / cx) * 22;
            lastY = ((e.clientY - cy) / cy) * 22;
            if (!pending) {window.requestAnimationFrame(applyParallax); pending = true;}
          }, {passive: true});
        }
      }
    })();

    /* --- Hero subhead: mobile "Read more" toggle ---
       The full paragraph always stays in the DOM (SEO). JS adds .is-clamped,
       so without JS the text is simply shown in full. CSS only clamps < 640px. */
    (function () {
      var sub = document.getElementById('heroSub');
      var btn = document.querySelector('.hero-more');
      if (!sub || !btn) return;
      sub.classList.add('is-clamped');
      btn.hidden = false;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        sub.classList.toggle('is-clamped', open);
        btn.setAttribute('aria-expanded', String(!open));
        btn.textContent = open ? 'Read more' : 'Show less';
      });
    })();

    /* --- Services: mobile swipe counter ("1 / 6") --- */
    (function () {
      var grid = document.getElementById('svcGrid');
      var cur = document.getElementById('svcCurrent');
      if (!grid || !cur) return;
      var cards = grid.querySelectorAll('.svc-card');
      var ticking = false;
      function update() {
        ticking = false;
        var gl = grid.getBoundingClientRect().left, best = 0, bestD = Infinity;
        cards.forEach(function (c, i) {
          var d = Math.abs(c.getBoundingClientRect().left - gl - 24);
          if (d < bestD) { bestD = d; best = i; }
        });
        cur.textContent = String(best + 1);
      }
      grid.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
      }, {passive: true});
    })();

    /* --- Services: clamp descriptions + "Read more" detail panel ---
       Full text stays in each card (SEO). Without JS, cards show full text. */
    (function () {
      var grid = document.getElementById('svcGrid');
      var panel = document.getElementById('svcPanel');
      if (!grid || !panel || typeof panel.showModal !== 'function') return;

      var $ = function (sel) { return panel.querySelector(sel); };
      var opener = null;

      grid.classList.add('is-enhanced');
      grid.querySelectorAll('.svc-more').forEach(function (btn) {
        btn.hidden = false;
        btn.setAttribute('aria-controls', 'svcPanel');
        btn.addEventListener('click', function () {
          var card = btn.closest('.svc-card');
          var link = card.querySelector('.svc-link');
          var tags = card.querySelector('.svc-tags');
          $('.svc-panel-title').innerHTML = card.querySelector('h3').innerHTML;
          $('.svc-panel-hook').textContent = card.querySelector('.svc-hook').textContent;
          $('.svc-panel-desc').textContent = card.querySelector('.svc-desc').textContent;
          var tagBox = $('.svc-panel-tags');
          tagBox.innerHTML = '';
          if (tags) {
            var label = document.createElement('p');
            label.className = 'svc-panel-tags-label';
            label.textContent = 'You receive';
            tagBox.appendChild(label);
            tagBox.appendChild(tags.cloneNode(true));
          }
          var pl = $('.svc-panel-link');
          pl.href = link.getAttribute('href');
          pl.innerHTML = link.innerHTML;
          opener = btn;
          document.documentElement.classList.add('svc-panel-open');
          panel.showModal();
          $('.svc-panel-close').focus();
        });
      });

      function close() {
        if (!panel.open || panel.classList.contains('is-closing')) return;
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { panel.close(); return; }
        panel.classList.add('is-closing');
        setTimeout(function () { panel.classList.remove('is-closing'); panel.close(); }, 220);
      }

      panel.addEventListener('close', function () {
        document.documentElement.classList.remove('svc-panel-open');
        if (opener) opener.focus({ preventScroll: true });
      });
      panel.addEventListener('cancel', function (e) { e.preventDefault(); close(); }); /* Esc */
      $('.svc-panel-close').addEventListener('click', close);
      panel.addEventListener('click', function (e) { if (e.target === panel) close(); }); /* backdrop */
      panel.querySelectorAll('[data-close]').forEach(function (a) {
        a.addEventListener('click', function () {
          panel.close();               /* close instantly so the anchor scroll isn't blocked */
          opener = null;
        });
      });
    })();
