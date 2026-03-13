/* ============================================================
   DATA-MANAGER.JS -- Shared localStorage data layer for Tinaht
   ============================================================ */
(function () {
  'use strict';

  var KEYS = {
    blogs: 'tinaht_blogs',
    testimonials: 'tinaht_testimonials',
    team: 'tinaht_team'
  };

  var CATEGORIES = {
    'ai-automation': 'AI & Automation',
    'hosting-devops': 'Hosting & DevOps',
    'cybersecurity': 'Cybersecurity',
    'web-performance': 'Web Performance',
    'industry-news': 'Industry News'
  };

  function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function getAll(type) {
    var key = KEYS[type];
    if (!key) return null;
    var raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function save(type, items) {
    var key = KEYS[type];
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(items));
  }

  function add(type, item) {
    var items = getAll(type) || [];
    if (!item.id) item.id = generateId();
    items.push(item);
    save(type, items);
    return item;
  }

  function update(type, id, updatedItem) {
    var items = getAll(type) || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        updatedItem.id = id;
        items[i] = updatedItem;
        break;
      }
    }
    save(type, items);
  }

  function remove(type, id) {
    var items = getAll(type) || [];
    items = items.filter(function (item) { return item.id !== id; });
    save(type, items);
  }

  function getById(type, id) {
    var items = getAll(type) || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) return items[i];
    }
    return null;
  }

  function exportAll() {
    return JSON.stringify({
      blogs: getAll('blogs') || [],
      testimonials: getAll('testimonials') || [],
      team: getAll('team') || [],
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  function importAll(jsonString) {
    var data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }
    if (data.blogs && Array.isArray(data.blogs)) {
      save('blogs', data.blogs);
    }
    if (data.testimonials && Array.isArray(data.testimonials)) {
      save('testimonials', data.testimonials);
    }
    if (data.team && Array.isArray(data.team)) {
      save('team', data.team);
    }
  }

  function clearAll() {
    Object.values(KEYS).forEach(function (key) {
      localStorage.removeItem(key);
    });
  }

  window.TinahtData = {
    CATEGORIES: CATEGORIES,
    getAll: getAll,
    save: save,
    add: add,
    update: update,
    remove: remove,
    getById: getById,
    exportAll: exportAll,
    importAll: importAll,
    clearAll: clearAll
  };
})();
