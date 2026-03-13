/* ============================================================
   TEAM-RENDER.JS -- Renders team section from content.json
   Must load AFTER data-manager.js, BEFORE main.js
   ============================================================ */
(function () {
  'use strict';

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  TinahtData.fetchPublished().then(function (data) {
    if (!data) return; // fetch failed — keep hardcoded HTML

    var team = data.team;
    if (!team || team.length === 0) return;

    var grid = document.querySelector('.team-grid');
    if (!grid) return;

    var html = '';
    team.forEach(function (member) {
      html +=
        '<div class="team-card">' +
        '<div class="team-card__avatar">' + escapeHTML(member.avatarInitials || '') + '</div>' +
        '<h3>' + escapeHTML(member.name) + '</h3>' +
        '<p class="team-card__role">' + escapeHTML(member.role) + '</p>' +
        '<p>' + escapeHTML(member.bio) + '</p>' +
        '</div>';
    });

    grid.innerHTML = html;
  });
})();
