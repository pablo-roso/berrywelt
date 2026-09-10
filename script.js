/* ============================================================
   berrywelt — Seitenlogik
   Der Baukasten: vier Auswahlschritte, ein Becher, der sich
   mitfärbt, und am Ende ein Satz, den man an der Theke vorlesen
   kann. Kein Warenkorb, keine Bestellung — der Laden ist neu und
   hat noch keine abgestimmte Karte.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var liquid = document.getElementById('liquid');
  var foam = document.getElementById('foam');
  var pearls = document.getElementById('pearls');
  var recipe = document.getElementById('recipe');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));
  if (!steps.length || !recipe) return;

  function chosen(step) {
    return step.querySelector('.chip.is-on');
  }

  function render() {
    var picked = {};
    steps.forEach(function (step) {
      var chip = chosen(step);
      if (chip) picked[step.dataset.step] = chip;
    });

    // Der Becher nimmt die Farbe des Geschmacks an; ohne Geschmack die der Basis.
    var tint = picked.flavour || picked.base;
    if (tint && liquid) {
      liquid.setAttribute('fill', tint.dataset.color || '#ec3a5c');
      if (foam) foam.setAttribute('fill', tint.dataset.foam || '#ff6f8f');
    }

    if (pearls && picked.topping) {
      var col = picked.topping.dataset.color;
      pearls.style.display = col ? '' : 'none';
      if (col) pearls.setAttribute('fill', col);
    }

    var base = picked.base ? picked.base.dataset.value : '';
    var flav = picked.flavour ? picked.flavour.dataset.value : '';
    var top = picked.topping ? picked.topping.dataset.value : '';
    var sweet = picked.sweet ? picked.sweet.dataset.value : '';

    var text = 'Einmal ' + flav + '-' + base.toLowerCase();
    text += top === 'ohne Topping' ? ', ohne Topping' : ' mit ' + top;
    text += ', ' + sweet + ', bitte.';
    recipe.textContent = text;
  }

  steps.forEach(function (step) {
    step.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip || !step.contains(chip)) return;
      step.querySelectorAll('.chip').forEach(function (other) {
        other.classList.toggle('is-on', other === chip);
        other.setAttribute('aria-checked', other === chip ? 'true' : 'false');
      });
      render();
    });
  });

  render();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
