/*!
 * eXeLearning Hacker Style Script
 * --------------------------------
 * Author: Área de Tecnología Educativa · Consejería de Educación, FP y
 *         Actividad Física y Deportes del Gobierno de Canarias
 * Project: eXeLearning.net
 * License: Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
 *
 * Injects the hacker chrome on top of the default eXeLearning DOM:
 *   - Matrix digital rain (<canvas id="hkRain">), paused when data-rain=off.
 *   - PipBoy rail chrome around #siteNav (header, stats, tabs, clock footer).
 *   - Tron border draw-in on every .box (4 lines + 4 corner notches).
 *   - AI typewriter effect on text idevice content, char-by-char, with caret.
 *   - ROBCO boot overlay (once per session, skippable).
 *   - Tweaks panel (gear toggler) persisted in localStorage.exeHackerTweaks,
 *     driving body[data-*] flags for accent/rain/scanlines/flicker/curve/
 *     pixel/typewriter.
 *
 * jQuery-flavoured vanilla, same style as the Universal / Spectrum128K themes.
 */

var eXeHackerStyle = {
    breadcrumbs: false,
    dropdownNavigation: true,
    tweaksTitle: "Tweaks",
    darkModeTitle: "Modo oscuro",
    bootKey: "exe-hacker-booted",
    tweaksKey: "exeHackerTweaks",
    defaults: {
        accent:     "green",
        rain:       "on",
        scanlines:  "on",
        flicker:    "on",
        curve:      "off",
        pixel:      "chrome",
        typewriter: "on"
    },

    /* -------------------------------------------------- */
    init: function () {
        if (this.inIframe()) $("body").addClass("in-iframe");

        // Apply persisted tweaks synchronously BEFORE any chrome renders.
        this.tweaks.applyAll();

        // Top-bar togglers (dark mode + tweaks + menu if available)
        this.buildTogglers();

        // Matrix rain background canvas
        this.rain.init();

        // PipBoy chrome around #siteNav
        this.pipBoy.init();

        // Tron border spans on every .box (and trigger the draw-in)
        this.boxes.decorate();

        // AI typewriter on text idevices
        this.typewriter.init();

        // Tweaks panel
        this.tweaks.buildPanel();

        // Keyboard shortcuts
        this.bindKeys();

        // Boot overlay (once per session; skipped inside editor iframe)
        if (!this.inIframe()) this.boot.autoShowOnce();

        // Trigger Tron border draw after layout is committed
        this.boxes.draw();
    },

    /* -------------------------------------------------- */
    inIframe: function () {
        try { return window.self !== window.top; } catch (e) { return true; }
    },
    isLocalStorageAvailable: function () {
        try {
            var k = "__exeHacker_ls__";
            localStorage.setItem(k, k);
            localStorage.removeItem(k);
            return true;
        } catch (e) { return false; }
    },
    prefersReducedMotion: function () {
        try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
    },

    /* ==================================================
       Togglers (top-bar buttons)
       ================================================== */
    buildTogglers: function () {
        var label = this.tweaksTitle;
        var darkLabel = (window.$exe_i18n && $exe_i18n.mode_toggler) || this.darkModeTitle;
        var menuLabel = "Menú";
        var searchLabel = "Buscar";

        var togglers = "";
        togglers +=
            '<button type="button" id="menuToggler" class="toggler" title="' + menuLabel + '" aria-pressed="true">' +
                '<span>' + menuLabel + '</span>' +
            '</button>';
        togglers +=
            '<button type="button" id="searchToggler" class="toggler" title="' + searchLabel + '" aria-pressed="false">' +
                '<span>' + searchLabel + '</span>' +
            '</button>';
        togglers +=
            '<button type="button" id="darkModeToggler" class="toggler" title="' + darkLabel + '">' +
                '<span>' + darkLabel + '</span>' +
            '</button>';
        togglers +=
            '<button type="button" id="hackerTweaksToggler" class="toggler" title="' + label + '">' +
                '<span>' + label + '</span>' +
            '</button>';

        var wrap = $('<div class="toggler-wrap"></div>').append(togglers);
        $("body").append(wrap);

        // --- Light / Dark mode ---------------------------------------------
        // Default is DARK. `html.exe-light-mode` opts into the bright palette.
        // Convention reused: localStorage.exeDarkMode = "on" (dark, default)
        // or "off" (light). A missing key keeps dark.
        var stored = this.isLocalStorageAvailable() ? localStorage.getItem("exeDarkMode") : null;
        if (stored === "off") {
            $("html").addClass("exe-light-mode");
        } else {
            // Mark dark explicitly so consumers can rely on the class.
            $("html").addClass("exe-dark-mode");
        }
        $(document).on("click", "#darkModeToggler", function () {
            var goingLight = !$("html").hasClass("exe-light-mode");
            $("html").toggleClass("exe-light-mode", goingLight);
            $("html").toggleClass("exe-dark-mode", !goingLight);
            try { localStorage.setItem("exeDarkMode", goingLight ? "off" : "on"); } catch (e) {}
        });

        // --- Sidebar (menu) toggler ----------------------------------------
        // Persist collapsed state in localStorage.exeHackerRail = "off"|"on".
        var railStored = this.isLocalStorageAvailable() ? localStorage.getItem("exeHackerRail") : null;
        if (railStored === "off") {
            $("body").addClass("siteNav-off");
            $("#menuToggler").attr("aria-pressed", "false");
        }
        $(document).on("click", "#menuToggler", function () {
            var nowOff = !$("body").hasClass("siteNav-off");
            $("body").toggleClass("siteNav-off", nowOff);
            $(this).attr("aria-pressed", nowOff ? "false" : "true");
            try { localStorage.setItem("exeHackerRail", nowOff ? "off" : "on"); } catch (e) {}
        });

        // --- Search toggler (reveals #exe-client-search) -------------------
        $(document).on("click", "#searchToggler", function () {
            var now = !$("body").hasClass("search-open");
            $("body").toggleClass("search-open", now);
            $(this).attr("aria-pressed", now ? "true" : "false");
            if (now) {
                // Focus the input on open for keyboard-first UX
                setTimeout(function () {
                    var input = document.querySelector("#exe-client-search input, #exe-client-search [type='search'], #exe-client-search [type='text']");
                    if (input) input.focus();
                }, 30);
            }
        });

        // --- Tweaks toggler ------------------------------------------------
        $(document).on("click", "#hackerTweaksToggler", function () {
            $("#hackerTweaks").toggleClass("open");
        });
    },

    /* ==================================================
       Matrix rain
       ================================================== */
    rain: {
        raf: null,
        ctx: null,
        cvs: null,
        state: null,
        glyphs: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHJKLMNPQRSTUVWXYZ<>/\\|{}[]$#@!?=+-*:;",

        init: function () {
            if (eXeHackerStyle.prefersReducedMotion()) return;
            var cvs = document.createElement("canvas");
            cvs.id = "hkRain";
            document.body.insertBefore(cvs, document.body.firstChild);
            this.cvs = cvs;
            this.ctx = cvs.getContext("2d");

            var self = this;
            this.resize();
            window.addEventListener("resize", function () { self.resize(); });
            this.rgb = this.hexToRgb(this.accent());
            this.lastCheck = 0;

            if (document.body.getAttribute("data-rain") !== "off") {
                this.raf = requestAnimationFrame(function (t) { self.tick(t); });
            }

            // React to data-rain flips (driven by the tweaks panel)
            var obs = new MutationObserver(function () {
                var off = document.body.getAttribute("data-rain") === "off";
                if (off && self.raf) { cancelAnimationFrame(self.raf); self.raf = null; }
                else if (!off && !self.raf) { self.raf = requestAnimationFrame(function (t) { self.tick(t); }); }
            });
            obs.observe(document.body, { attributes: true, attributeFilter: ["data-rain"] });
        },
        resize: function () {
            if (!this.cvs) return;
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.W = window.innerWidth;
            this.H = window.innerHeight;
            this.cvs.width = this.W * dpr;
            this.cvs.height = this.H * dpr;
            this.cvs.style.width = this.W + "px";
            this.cvs.style.height = this.H + "px";
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            this.fontSize = Math.max(14, Math.round(this.W / 110));
            this.ctx.font = this.fontSize + 'px "JetBrains Mono", ui-monospace, monospace';
            this.cols = Math.ceil(this.W / this.fontSize);
            var fontH = Math.max(1, Math.floor(this.H / this.fontSize));
            this.drops = [];
            this.speeds = [];
            for (var i = 0; i < this.cols; i++) {
                this.drops.push(Math.floor(Math.random() * -fontH));
                // Slower, more cinematic fall — each column moves between
                // 0.18 and 0.66 px/frame (before scaling by fontSize).
                this.speeds.push(0.18 + Math.random() * 0.48);
            }
            // Throttle frame rate to ~30 fps so the fall reads as liquid rather
            // than a blur at 60/120 Hz displays.
            this.frameInterval = 1000 / 30;
            this.lastFrame = 0;
        },
        accent: function () {
            var css = getComputedStyle(document.documentElement);
            var v = (css.getPropertyValue("--hk-accent") || "#00ff9c").trim();
            return v || "#00ff9c";
        },
        hexToRgb: function (h) {
            h = h.replace("#", "");
            if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
            var n = parseInt(h, 16);
            return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        },
        tick: function (t) {
            var self = this;
            if (t - this.lastFrame < this.frameInterval) {
                this.raf = requestAnimationFrame(function (t2) { self.tick(t2); });
                return;
            }
            this.lastFrame = t;
            if (t - this.lastCheck > 400) {
                this.rgb = this.hexToRgb(this.accent());
                this.lastCheck = t;
            }
            var ctx = this.ctx;
            // Lighter trail fade so glyphs linger longer = slower feel.
            ctx.fillStyle = "rgba(0,0,0,0.05)";
            ctx.fillRect(0, 0, this.W, this.H);
            ctx.font = this.fontSize + 'px "JetBrains Mono", ui-monospace, monospace';

            var r = this.rgb;
            for (var i = 0; i < this.cols; i++) {
                var x = i * this.fontSize;
                var y = this.drops[i] * this.fontSize;
                var g = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
                ctx.fillStyle = "rgba(" + Math.min(255, r[0] + 120) + "," + Math.min(255, r[1] + 120) + "," + Math.min(255, r[2] + 120) + ",1)";
                ctx.fillText(g, x, y);
                if (y > this.fontSize) {
                    var prevG = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
                    ctx.fillStyle = "rgba(" + r[0] + "," + r[1] + "," + r[2] + ",0.6)";
                    ctx.fillText(prevG, x, y - this.fontSize);
                }
                // Higher respawn threshold → columns rest longer at the top.
                if (y > this.H && Math.random() > 0.99) this.drops[i] = 0;
                this.drops[i] += this.speeds[i];
            }
            this.raf = requestAnimationFrame(function (t2) { self.tick(t2); });
        }
    },

    /* ==================================================
       PipBoy rail chrome
       ================================================== */
    pipBoy: {
        init: function () {
            var nav = document.getElementById("siteNav");
            if (!nav) return;

            var head =
                '<div class="pip-head">' +
                    '<div>' +
                        '<div class="pip-logo">EXE//</div>' +
                        '<div class="pip-sub">PIP-OS v3.0 · ROBCO UNITY</div>' +
                    '</div>' +
                    '<div class="pip-pwr" title="online"></div>' +
                '</div>' +
                '<div class="pip-stats">' +
                    '<div class="pip-stat"><span class="lbl">USR</span><span class="val">student_01</span></div>' +
                    '<div class="pip-stat"><span class="lbl">HP</span><span class="pip-bar"><i style="width:92%"></i></span></div>' +
                    '<div class="pip-stat"><span class="lbl">XP</span><span class="val">1240</span></div>' +
                    '<div class="pip-stat"><span class="lbl">PRG</span><span class="pip-bar"><i id="pipProg" style="width:0%"></i></span></div>' +
                '</div>' +
                '<div class="pip-tabs">' +
                    '<button type="button" class="pip-tab active">DATA</button>' +
                    '<button type="button" class="pip-tab">MAP</button>' +
                    '<button type="button" class="pip-tab">INV</button>' +
                    '<button type="button" class="pip-tab">STAT</button>' +
                '</div>' +
                '<div class="pip-section-hd">INDEX.sys</div>';

            var foot =
                '<div class="pip-foot">' +
                    '<span id="pipClock">—</span>' +
                    '<span class="blink">● REC</span>' +
                '</div>';

            var $nav = $(nav);
            $nav.prepend(head);
            $nav.append(foot);

            // Tab toggling — purely cosmetic (DATA always shows the index)
            $nav.on("click", ".pip-tab", function () {
                $nav.find(".pip-tab").removeClass("active");
                $(this).addClass("active");
            });

            // Live clock
            function updateClock() {
                var d = new Date();
                var t = d.toTimeString().slice(0, 8);
                var day = d.toLocaleDateString("es-ES");
                var el = document.getElementById("pipClock");
                if (el) el.textContent = day + " · " + t;
            }
            updateClock();
            setInterval(updateClock, 1000);

            // Progress bar in stats: current page index over total
            var links = $nav.find("> ul a");
            var total = links.length;
            var activeIdx = Math.max(0, links.index($nav.find("> ul a.active, > ul a.main-node.active, > ul a[aria-current='page']").first()));
            var prog = total > 0 ? Math.round(((activeIdx + 1) / total) * 100) : 0;
            var pb = document.getElementById("pipProg");
            if (pb) pb.style.width = prog + "%";

            // Active marker: convert eXe's `.active` to a stable class + ARIA
            $nav.find("a.active").attr("aria-current", "page");
        }
    },

    /* ==================================================
       Tron border draw-in on .box
       ================================================== */
    boxes: {
        decorate: function () {
            $("article.box, .exe-content .box").each(function () {
                if (this.querySelector(":scope > .b-top")) return; // already decorated
                var frag =
                    '<span class="b-top"></span>' +
                    '<span class="b-right"></span>' +
                    '<span class="b-bot"></span>' +
                    '<span class="b-left"></span>' +
                    '<span class="corner tl"></span>' +
                    '<span class="corner tr"></span>' +
                    '<span class="corner bl"></span>' +
                    '<span class="corner br"></span>';
                // Insert at the top so stacking order is below content
                var firstChild = this.firstChild;
                var tmp = document.createElement("div");
                tmp.innerHTML = frag;
                while (tmp.firstChild) this.insertBefore(tmp.firstChild, firstChild);
            });
        },
        draw: function () {
            if (eXeHackerStyle.prefersReducedMotion()) {
                $(".box").addClass("drawn");
                return;
            }
            var boxes = document.querySelectorAll(".box");
            Array.prototype.forEach.call(boxes, function (b, i) {
                setTimeout(function () { b.classList.add("drawn"); }, 80 + i * 120);
            });
        }
    },

    /* ==================================================
       Typewriter (AI typing)
       ================================================== */
    typewriter: {
        timers: [],
        kill: function () {
            while (this.timers.length) clearTimeout(this.timers.pop());
        },
        init: function () {
            if (eXeHackerStyle.prefersReducedMotion()) return;
            if (document.body.getAttribute("data-typewriter") === "off") return;

            var self = this;
            // Target the first text paragraph of every text idevice
            var targets = document.querySelectorAll(
                ".idevice_node.text .exe-text-activity p:first-of-type, " +
                ".idevice_node .exe-text-activity > div > p:first-of-type"
            );
            var seen = new Set();
            Array.prototype.forEach.call(targets, function (p, i) {
                if (seen.has(p)) return;
                seen.add(p);
                if (p.getAttribute("data-typed") === "1") return;
                p.setAttribute("data-typed", "1");
                self.typeNode(p, 80 + i * 120);
            });
        },
        typeNode: function (el, delay) {
            if (!el) return;
            var original = el.cloneNode(true);
            var text = el.textContent;
            if (!text || text.trim().length === 0) return;

            // Walk text nodes; compute char positions
            var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
            var nodes = [];
            var n;
            while ((n = walker.nextNode())) {
                if (!n.nodeValue) continue;
                nodes.push({ node: n, full: n.nodeValue });
                n.nodeValue = "";
            }

            // Append a cursor span at the end of the target element
            var cursor = document.createElement("span");
            cursor.className = "typer-cursor";
            el.appendChild(cursor);

            var self = this;
            var ni = 0, ci = 0;
            function step() {
                if (ni >= nodes.length) {
                    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                    el.classList.add("typer-done");
                    return;
                }
                var cur = nodes[ni];
                if (ci >= cur.full.length) { ni++; ci = 0; step(); return; }
                cur.node.nodeValue = cur.full.slice(0, ci + 1);
                var ch = cur.full.charAt(ci);
                ci++;
                var pause = ch === "." ? 130 : ch === "," ? 70 : ch === "\n" ? 150 : 18 + Math.random() * 14;
                self.timers.push(setTimeout(step, pause));
            }
            this.timers.push(setTimeout(step, delay || 80));

            // Guard: if the user toggles typewriter off mid-animation, restore the node
            el._hkRestore = function () {
                self.kill();
                el.innerHTML = original.innerHTML;
            };
        }
    },

    /* ==================================================
       Tweaks
       ================================================== */
    tweaks: {
        read: function () {
            var d = Object.assign({}, eXeHackerStyle.defaults);
            if (!eXeHackerStyle.isLocalStorageAvailable()) return d;
            try {
                var raw = localStorage.getItem(eXeHackerStyle.tweaksKey);
                if (raw) Object.assign(d, JSON.parse(raw));
            } catch (e) {}
            return d;
        },
        save: function (s) {
            if (!eXeHackerStyle.isLocalStorageAvailable()) return;
            try { localStorage.setItem(eXeHackerStyle.tweaksKey, JSON.stringify(s)); } catch (e) {}
        },
        apply: function (s) {
            document.documentElement.setAttribute("data-accent", s.accent === "green" ? "" : s.accent);
            var b = document.body;
            b.setAttribute("data-rain",       s.rain);
            b.setAttribute("data-scanlines",  s.scanlines);
            b.setAttribute("data-flicker",    s.flicker);
            b.setAttribute("data-curve",      s.curve);
            b.setAttribute("data-pixel",      s.pixel);
            b.setAttribute("data-typewriter", s.typewriter);

            // Live typewriter toggle: restore nodes if turning off mid-animation
            if (s.typewriter === "off") {
                var typed = document.querySelectorAll("[data-typed='1']");
                Array.prototype.forEach.call(typed, function (el) {
                    if (el._hkRestore) el._hkRestore();
                });
            }
        },
        applyAll: function () {
            this.apply(this.read());
        },
        set: function (key, value) {
            var s = this.read();
            s[key] = value;
            this.save(s);
            this.apply(s);
            // Reflect .on state across buttons
            var root = document.getElementById("hackerTweaks");
            if (!root) return;
            var rows = root.querySelectorAll(".tw-row[data-key='" + key + "']");
            Array.prototype.forEach.call(rows, function (row) {
                var segs = row.querySelectorAll(".tw-seg");
                Array.prototype.forEach.call(segs, function (b) {
                    b.classList.toggle("on", b.getAttribute("data-value") === value);
                });
            });
        },
        buildPanel: function () {
            var self = this;
            var state = this.read();

            var rows = [
                ["accent",     "color acento",   [["green", "verde"], ["amber", "naranja"], ["cyan", "cian"]]],
                ["rain",       "lluvia matrix",  [["on", "on"], ["off", "off"]]],
                ["scanlines",  "scanlines CRT",  [["on", "on"], ["off", "off"]]],
                ["flicker",    "flicker CRT",    [["on", "on"], ["off", "off"]]],
                ["curve",      "marco curvo",    [["off", "off"], ["on", "on"]]],
                ["pixel",      "fuente pixel",   [["chrome", "solo títulos"], ["all", "todo"], ["none", "nada"]]],
                ["typewriter", "escritura IA",   [["on", "on"], ["off", "off"]]]
            ];

            var html = '<div class="tw-head"><span>▓ TWEAKS.CFG</span>' +
                '<button type="button" class="tw-close" aria-label="Cerrar">×</button></div>' +
                '<div class="tw-body">';
            rows.forEach(function (r) {
                var key = r[0], label = r[1], opts = r[2];
                html += '<div class="tw-row" data-key="' + key + '">';
                html += '<div class="tw-label">' + label + '</div>';
                html += '<div class="tw-segs">';
                opts.forEach(function (o) {
                    var v = o[0], lbl = o[1];
                    var sw = key === "accent" ? '<span class="sw"></span>' : '';
                    var on = state[key] === v ? " on" : "";
                    html += '<button type="button" class="tw-seg' + on + '" data-key="' + key + '" data-value="' + v + '">' + sw + lbl + '</button>';
                });
                html += '</div></div>';
            });
            html +=
                '<div class="tw-row" data-key="boot">' +
                    '<div class="tw-label">boot intro</div>' +
                    '<div class="tw-segs">' +
                        '<button type="button" class="tw-seg" id="hkReboot">reproducir</button>' +
                    '</div>' +
                '</div>';
            html += '</div>';

            var panel = $('<div id="hackerTweaks" role="dialog" aria-label="Tweaks"></div>').html(html);
            $("body").append(panel);

            panel.on("click", ".tw-seg[data-key]", function () {
                self.set($(this).attr("data-key"), $(this).attr("data-value"));
            });
            panel.on("click", ".tw-close", function () {
                panel.removeClass("open");
            });
            panel.on("click", "#hkReboot", function () {
                panel.removeClass("open");
                try { sessionStorage.removeItem(eXeHackerStyle.bootKey); } catch (e) {}
                eXeHackerStyle.boot.show();
            });
        }
    },

    /* ==================================================
       Boot overlay
       ================================================== */
    boot: {
        autoShowOnce: function () {
            var shouldBoot = true;
            try { shouldBoot = !sessionStorage.getItem(eXeHackerStyle.bootKey); } catch (e) {}
            if (!shouldBoot) return;
            try { sessionStorage.setItem(eXeHackerStyle.bootKey, "1"); } catch (e) {}
            this.show();
        },
        show: function () {
            if (eXeHackerStyle.prefersReducedMotion()) return;
            var lines = [
                "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL",
                "EST. 2077 · PIP-OS v3.0 · COPYRIGHT 2075-2077 ROBCO",
                "-Server 1-",
                "",
                "> authenticating user… student_01",
                "> loading kernel exeLearning-3.0……… OK",
                "> mounting /vault/content …",
                "> linking iDevices [████████████████] 100%",
                "> rain.sys         [ON]",
                "> scanlines.crt    [ON]",
                "> accent.hue       [GREEN]",
                "",
                "> WELCOME, OVERSEER.",
                "> PRESS ANY KEY TO ENTER VAULT_EXE"
            ];
            var boot = document.createElement("div");
            boot.id = "hkBoot";
            var caret = document.createElement("span");
            caret.className = "hb-caret";
            boot.appendChild(caret);
            document.body.appendChild(boot);

            var i = 0;
            var timers = [];
            function tick() {
                if (i >= lines.length) {
                    timers.push(setTimeout(function () {
                        boot.classList.add("fade");
                        timers.push(setTimeout(function () { if (boot.parentNode) boot.parentNode.removeChild(boot); }, 500));
                    }, 900));
                    return;
                }
                var span = document.createElement("span");
                span.className = "bl";
                span.textContent = lines[i] || " ";
                boot.insertBefore(span, caret);
                i++;
                timers.push(setTimeout(tick, 110));
            }
            tick();

            function kill() {
                timers.forEach(clearTimeout);
                boot.classList.add("fade");
                setTimeout(function () { if (boot.parentNode) boot.parentNode.removeChild(boot); }, 300);
                window.removeEventListener("keydown", kill);
                boot.removeEventListener("click", kill);
            }
            window.addEventListener("keydown", kill);
            boot.addEventListener("click", kill);
        }
    },

    /* ==================================================
       Keyboard shortcuts
       ================================================== */
    bindKeys: function () {
        $(document).on("keydown", function (e) {
            var tag = e.target && e.target.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
            if (e.key === "t" || e.key === "T") {
                $("#hackerTweaks").toggleClass("open");
            }
            if (e.key === "Escape") {
                $("#hackerTweaks").removeClass("open");
                $("body").removeClass("search-open");
                $("#searchToggler").attr("aria-pressed", "false");
            }
            if (e.key === "ArrowRight") {
                var next = document.querySelector("a.nav-button-right");
                if (next && next.getAttribute("href")) window.location.href = next.getAttribute("href");
            }
            if (e.key === "ArrowLeft") {
                var prev = document.querySelector("a.nav-button-left");
                if (prev && prev.getAttribute("href")) window.location.href = prev.getAttribute("href");
            }
        });
    }
};

$(document).ready(function () {
    eXeHackerStyle.init();
});
