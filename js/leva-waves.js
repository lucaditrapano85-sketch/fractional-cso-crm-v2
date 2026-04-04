/* ============================================================
   LEVA — Deep Space Waves
   js/leva-waves.js
   Funzione riusabile: initLevaWaves(canvasId)
   ============================================================ */

(function() {
  'use strict';

  var WAVE_DEFS = [
    /* viola principale */
    { color: '123,97,255',   opacity: 0.10, thickness: 4.0, amplitude: 44, speed: 0.00028, phase: 0.00 },
    { color: '123,97,255',   opacity: 0.06, thickness: 2.0, amplitude: 28, speed: 0.00022, phase: 1.20 },
    { color: '167,139,250',  opacity: 0.07, thickness: 2.5, amplitude: 36, speed: 0.00032, phase: 2.40 },
    { color: '167,139,250',  opacity: 0.04, thickness: 1.5, amplitude: 20, speed: 0.00018, phase: 3.80 },

    /* arancione */
    { color: '255,107,43',   opacity: 0.09, thickness: 3.5, amplitude: 50, speed: 0.00025, phase: 0.70 },
    { color: '255,107,43',   opacity: 0.05, thickness: 1.5, amplitude: 22, speed: 0.00038, phase: 4.50 },

    /* smeraldo */
    { color: '52,211,153',   opacity: 0.06, thickness: 2.0, amplitude: 32, speed: 0.00020, phase: 1.90 },
    { color: '52,211,153',   opacity: 0.03, thickness: 1.5, amplitude: 18, speed: 0.00042, phase: 5.10 },

    /* rosa / danger */
    { color: '244,63,94',    opacity: 0.07, thickness: 2.5, amplitude: 38, speed: 0.00030, phase: 0.40 },
    { color: '244,63,94',    opacity: 0.04, thickness: 1.5, amplitude: 22, speed: 0.00035, phase: 3.20 },

    /* oro */
    { color: '251,191,36',   opacity: 0.08, thickness: 3.0, amplitude: 42, speed: 0.00024, phase: 2.70 },
    { color: '251,191,36',   opacity: 0.05, thickness: 1.5, amplitude: 24, speed: 0.00040, phase: 5.60 },
  ];

  /**
   * Avvia l'animazione delle onde su un canvas.
   * @param {string} canvasId  — ID dell'elemento <canvas>
   * @returns {{ stop: function }} — oggetto con metodo stop() per cancellare l'animazione
   */
  window.initLevaWaves = function initLevaWaves(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return { stop: function() {} };

    var ctx = canvas.getContext('2d');
    var raf = null;
    var stopped = false;

    function resize() {
      canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight || 300;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(ts) {
      if (stopped) return;
      var W = canvas.width;
      var H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < WAVE_DEFS.length; i++) {
        var w = WAVE_DEFS[i];
        var t = ts * w.speed;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(' + w.color + ',' + w.opacity + ')';
        ctx.lineWidth   = w.thickness;
        ctx.shadowColor = 'rgba(' + w.color + ',' + (w.opacity * 0.5) + ')';
        ctx.shadowBlur  = w.thickness * 3;

        /* linea d'onda attraverso l'intera larghezza */
        var baseY = H * (0.35 + (i % 3) * 0.12);
        var step  = 2; /* px per campione — buon bilanciamento qualità/perf */

        for (var x = 0; x <= W; x += step) {
          var progress = x / W;
          var y = baseY
            + Math.sin(progress * 2.8 + t + w.phase) * w.amplitude
            + Math.sin(progress * 1.4 + t * 0.6 + w.phase * 0.7) * (w.amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else         ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return {
      stop: function() {
        stopped = true;
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
      }
    };
  };

})();
