/* Lake Woodcraft: small pop-up menus for the phone number and directions links.
   Without JavaScript, the links still work normally (call / Google Maps). */
(function () {
  var sheets = {
    contact: {
      title: 'Contact Nathaniel',
      sub: '(585) 813-5955',
      actions: [
        { label: 'Text (preferred)', href: 'sms:+15858135955', primary: true },
        { label: 'Call', href: 'tel:+15858135955' }
      ]
    },
    directions: {
      title: 'Get directions',
      sub: 'Sweet Life Country Store, Elba, NY',
      actions: [
        {
          label: 'Apple Maps',
          href: 'https://maps.apple.com/?daddr=100+S+Main+St,+Elba,+NY+14058&dirflg=d',
          external: true
        },
        {
          label: 'Google Maps',
          href: 'https://www.google.com/maps/dir/?api=1&destination=Sweet+Life+Country+Store,+100+S+Main+St,+Elba,+NY+14058',
          external: true
        }
      ]
    }
  };

  var dialog = document.createElement('dialog');
  if (typeof dialog.showModal !== 'function') return; // very old browser: links work as normal

  dialog.className = 'sheet';
  dialog.setAttribute('aria-labelledby', 'sheet-title');
  dialog.innerHTML =
    '<h2 id="sheet-title" class="sheet-title"></h2>' +
    '<p class="sheet-sub"></p>' +
    '<div class="sheet-actions"></div>' +
    '<button type="button" class="sheet-cancel">Cancel</button>';
  document.body.appendChild(dialog);

  var titleEl = dialog.querySelector('.sheet-title');
  var subEl = dialog.querySelector('.sheet-sub');
  var actionsEl = dialog.querySelector('.sheet-actions');

  function open(key) {
    var s = sheets[key];
    if (!s) return false;
    titleEl.textContent = s.title;
    subEl.textContent = s.sub;
    actionsEl.innerHTML = '';
    s.actions.forEach(function (a) {
      var link = document.createElement('a');
      link.className = 'sheet-btn' + (a.primary ? ' sheet-btn-primary' : '');
      link.href = a.href;
      link.textContent = a.label;
      if (a.external) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      link.addEventListener('click', function () {
        setTimeout(function () { dialog.close(); }, 150);
      });
      actionsEl.appendChild(link);
    });
    dialog.showModal();
    return true;
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-sheet]');
    if (!trigger) return;
    if (open(trigger.getAttribute('data-sheet'))) e.preventDefault();
  });

  dialog.querySelector('.sheet-cancel').addEventListener('click', function () {
    dialog.close();
  });

  // Tap outside the box to close
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
})();
