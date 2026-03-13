/* ============================================================
   ADMIN.JS -- Admin Panel Logic
   ============================================================ */
(function () {
  'use strict';

  // SHA-256 hash of password "tinaht2026" — change this to your own password hash
  var ADMIN_HASH = 'e05c2309ba719875aa795e2ea3894593cee462964874b27629517bf3649ccc0e';

  var currentTab = 'blogs';
  var editingId = null;
  var deleteId = null;

  // DOM references
  var gate = document.getElementById('admin-gate');
  var gateForm = document.getElementById('gate-form');
  var gatePassword = document.getElementById('gate-password');
  var gateError = document.getElementById('gate-error');
  var adminBody = document.getElementById('admin-body');
  var logoutBtn = document.getElementById('logout-btn');
  var addBtn = document.getElementById('add-btn');
  var seedBtn = document.getElementById('seed-btn');
  var exportBtn = document.getElementById('export-btn');
  var importBtn = document.getElementById('import-btn');
  var importFile = document.getElementById('import-file');
  var clearBtn = document.getElementById('clear-btn');
  var contentGrid = document.getElementById('admin-content');
  var modal = document.getElementById('admin-modal');
  var modalTitle = document.getElementById('modal-title');
  var modalForm = document.getElementById('modal-form');
  var confirmDialog = document.getElementById('admin-confirm');
  var confirmMessage = document.getElementById('confirm-message');
  var confirmCancel = document.getElementById('confirm-cancel');
  var confirmDelete = document.getElementById('confirm-delete');
  var tabButtons = document.querySelectorAll('.admin-tabs .filter-btn');

  // ── Utilities ──────────────────────────────────────────────

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function truncate(str, maxLen) {
    if (!str) return '';
    return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
  }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function showToast(message, type) {
    var toast = document.createElement('div');
    toast.className = 'admin-toast admin-toast--' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });
    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  // Pure JS SHA-256 (works without crypto.subtle / non-HTTPS)
  function hashPassword(password) {
    function rr(n, x) { return (x >>> n) | (x << (32 - n)); }
    function ch(x, y, z) { return (x & y) ^ (~x & z); }
    function maj(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }
    function s0(x) { return rr(2, x) ^ rr(13, x) ^ rr(22, x); }
    function s1(x) { return rr(6, x) ^ rr(11, x) ^ rr(25, x); }
    function g0(x) { return rr(7, x) ^ rr(18, x) ^ (x >>> 3); }
    function g1(x) { return rr(17, x) ^ rr(19, x) ^ (x >>> 10); }
    var K = [
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
    ];
    var bytes = [];
    for (var i = 0; i < password.length; i++) {
      var c = password.charCodeAt(i);
      if (c < 128) bytes.push(c);
      else if (c < 2048) { bytes.push(192 | (c >> 6)); bytes.push(128 | (c & 63)); }
      else { bytes.push(224 | (c >> 12)); bytes.push(128 | ((c >> 6) & 63)); bytes.push(128 | (c & 63)); }
    }
    var len = bytes.length;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    var bitLen = len * 8;
    for (var i = 7; i >= 0; i--) bytes.push((bitLen >>> (i * 8)) & 0xff);
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    for (var off = 0; off < bytes.length; off += 64) {
      var W = [];
      for (var t = 0; t < 16; t++) W[t] = (bytes[off+t*4]<<24)|(bytes[off+t*4+1]<<16)|(bytes[off+t*4+2]<<8)|bytes[off+t*4+3];
      for (var t = 16; t < 64; t++) W[t] = (g1(W[t-2]) + W[t-7] + g0(W[t-15]) + W[t-16]) | 0;
      var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
      for (var t = 0; t < 64; t++) {
        var T1 = (h + s1(e) + ch(e,f,g) + K[t] + W[t]) | 0;
        var T2 = (s0(a) + maj(a,b,c)) | 0;
        h=g; g=f; f=e; e=(d+T1)|0; d=c; c=b; b=a; a=(T1+T2)|0;
      }
      H[0]=(H[0]+a)|0; H[1]=(H[1]+b)|0; H[2]=(H[2]+c)|0; H[3]=(H[3]+d)|0;
      H[4]=(H[4]+e)|0; H[5]=(H[5]+f)|0; H[6]=(H[6]+g)|0; H[7]=(H[7]+h)|0;
    }
    return H.map(function(v){return ('00000000'+(v>>>0).toString(16)).slice(-8);}).join('');
  }

  // ── Authentication ─────────────────────────────────────────

  function checkAuth() {
    if (sessionStorage.getItem('tinaht_admin_auth') === 'true') {
      showAdmin();
    }
  }

  function showAdmin() {
    gate.classList.add('is-hidden');
    adminBody.classList.add('is-visible');
    renderList();
  }

  function logout() {
    sessionStorage.removeItem('tinaht_admin_auth');
    gate.classList.remove('is-hidden');
    adminBody.classList.remove('is-visible');
    gatePassword.value = '';
    gateError.classList.remove('is-visible');
  }

  gateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var hash = hashPassword(gatePassword.value);
    if (hash === ADMIN_HASH) {
      sessionStorage.setItem('tinaht_admin_auth', 'true');
      showAdmin();
    } else {
      gateError.classList.add('is-visible');
      gatePassword.value = '';
      gatePassword.focus();
    }
  });

  logoutBtn.addEventListener('click', logout);

  // ── Tab Switching ──────────────────────────────────────────

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      currentTab = btn.getAttribute('data-tab');
      renderList();
    });
  });

  // ── Rendering ──────────────────────────────────────────────

  function renderList() {
    var items = TinahtData.getAll(currentTab) || [];
    if (items.length === 0) {
      var labels = { blogs: 'blog post', testimonials: 'testimonial', team: 'team member' };
      contentGrid.innerHTML =
        '<div class="admin-empty">' +
        '<div class="admin-empty__icon">+</div>' +
        '<h3>No ' + labels[currentTab] + 's yet</h3>' +
        '<p>Click "Add New" to create your first ' + labels[currentTab] + ', or "Seed Defaults" to load sample data.</p>' +
        '</div>';
      return;
    }

    var html = '';
    if (currentTab === 'blogs') {
      items.forEach(function (item) {
        html +=
          '<div class="admin-item">' +
          '<div class="admin-item__header">' +
          '<span class="admin-item__tag">' + escapeHTML(TinahtData.CATEGORIES[item.category] || item.category) + '</span>' +
          (item.featured ? '<span class="admin-item__featured">Featured</span>' : '') +
          '</div>' +
          '<h4 class="admin-item__title">' + escapeHTML(item.title) + '</h4>' +
          '<p class="admin-item__text">' + escapeHTML(truncate(item.description, 100)) + '</p>' +
          '<p class="admin-item__meta">' + escapeHTML(item.author) + ' &bull; ' + formatDate(item.date) + '</p>' +
          '<div class="admin-item__actions">' +
          '<button class="btn btn-secondary" data-edit="' + item.id + '">Edit</button>' +
          '<button class="btn btn-danger btn-secondary" data-delete="' + item.id + '">Delete</button>' +
          '</div>' +
          '</div>';
      });
    } else if (currentTab === 'testimonials') {
      items.forEach(function (item) {
        html +=
          '<div class="admin-item">' +
          '<div class="admin-item__avatar">' + escapeHTML(item.avatarInitials || '') + '</div>' +
          '<h4 class="admin-item__title">' + escapeHTML(item.authorName) + '</h4>' +
          '<p class="admin-item__text">"' + escapeHTML(truncate(item.quote, 120)) + '"</p>' +
          '<p class="admin-item__meta">' + escapeHTML(item.role) + ', ' + escapeHTML(item.company) + '</p>' +
          '<div class="admin-item__actions">' +
          '<button class="btn btn-secondary" data-edit="' + item.id + '">Edit</button>' +
          '<button class="btn btn-danger btn-secondary" data-delete="' + item.id + '">Delete</button>' +
          '</div>' +
          '</div>';
      });
    } else if (currentTab === 'team') {
      items.forEach(function (item) {
        html +=
          '<div class="admin-item">' +
          '<div class="admin-item__avatar">' + escapeHTML(item.avatarInitials || '') + '</div>' +
          '<h4 class="admin-item__title">' + escapeHTML(item.name) + '</h4>' +
          '<p class="admin-item__text">' + escapeHTML(truncate(item.bio, 120)) + '</p>' +
          '<p class="admin-item__meta">' + escapeHTML(item.role) + '</p>' +
          '<div class="admin-item__actions">' +
          '<button class="btn btn-secondary" data-edit="' + item.id + '">Edit</button>' +
          '<button class="btn btn-danger btn-secondary" data-delete="' + item.id + '">Delete</button>' +
          '</div>' +
          '</div>';
      });
    }

    contentGrid.innerHTML = html;

    // Bind edit/delete buttons
    contentGrid.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-edit');
        openModal(TinahtData.getById(currentTab, id));
      });
    });
    contentGrid.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        deleteId = btn.getAttribute('data-delete');
        var item = TinahtData.getById(currentTab, deleteId);
        var name = item ? (item.title || item.authorName || item.name || 'this item') : 'this item';
        confirmMessage.textContent = 'Are you sure you want to delete "' + name + '"? This cannot be undone.';
        confirmDialog.classList.add('is-open');
      });
    });
  }

  // ── Modal Form ─────────────────────────────────────────────

  function openModal(item) {
    editingId = item ? item.id : null;
    modalTitle.textContent = (item ? 'Edit' : 'Add') + ' ' +
      { blogs: 'Blog Post', testimonials: 'Testimonial', team: 'Team Member' }[currentTab];

    var html = '';

    if (currentTab === 'blogs') {
      html =
        '<div class="form-group">' +
        '<label for="f-title">Title *</label>' +
        '<input type="text" id="f-title" class="form-input" required value="' + escapeHTML(item ? item.title : '') + '">' +
        '</div>' +
        '<div class="admin-form__row">' +
        '<div class="form-group">' +
        '<label for="f-category">Category</label>' +
        '<select id="f-category" class="form-input">' +
        Object.keys(TinahtData.CATEGORIES).map(function (key) {
          return '<option value="' + key + '"' + (item && item.category === key ? ' selected' : '') + '>' + TinahtData.CATEGORIES[key] + '</option>';
        }).join('') +
        '</select>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-date">Date</label>' +
        '<input type="date" id="f-date" class="form-input" value="' + (item ? item.date : new Date().toISOString().split('T')[0]) + '">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-imageUrl">Image URL</label>' +
        '<input type="text" id="f-imageUrl" class="form-input" placeholder="https://images.unsplash.com/..." value="' + escapeHTML(item ? item.imageUrl : '') + '">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-description">Description *</label>' +
        '<textarea id="f-description" class="form-input" required>' + escapeHTML(item ? item.description : '') + '</textarea>' +
        '</div>' +
        '<div class="admin-form__row">' +
        '<div class="form-group">' +
        '<label for="f-author">Author</label>' +
        '<input type="text" id="f-author" class="form-input" value="' + escapeHTML(item ? item.author : 'Djonny Noel') + '">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-readTime">Read Time</label>' +
        '<input type="text" id="f-readTime" class="form-input" placeholder="8 min read" value="' + escapeHTML(item ? item.readTime : '') + '">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="admin-form__checkbox"><input type="checkbox" id="f-featured"' + (item && item.featured ? ' checked' : '') + '><span>Featured Article</span></label>' +
        '</div>' +
        '<div class="admin-form__footer">' +
        '<button type="button" class="btn btn-secondary admin-modal-cancel">Cancel</button>' +
        '<button type="submit" class="btn btn-primary">Save</button>' +
        '</div>';
    } else if (currentTab === 'testimonials') {
      html =
        '<div class="form-group">' +
        '<label for="f-quote">Quote *</label>' +
        '<textarea id="f-quote" class="form-input" required>' + escapeHTML(item ? item.quote : '') + '</textarea>' +
        '</div>' +
        '<div class="admin-form__row">' +
        '<div class="form-group">' +
        '<label for="f-authorName">Author Name *</label>' +
        '<input type="text" id="f-authorName" class="form-input" required value="' + escapeHTML(item ? item.authorName : '') + '">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-avatarInitials">Initials</label>' +
        '<input type="text" id="f-avatarInitials" class="form-input" maxlength="2" placeholder="SM" value="' + escapeHTML(item ? item.avatarInitials : '') + '">' +
        '</div>' +
        '</div>' +
        '<div class="admin-form__row">' +
        '<div class="form-group">' +
        '<label for="f-role">Role / Title</label>' +
        '<input type="text" id="f-role" class="form-input" placeholder="CTO" value="' + escapeHTML(item ? item.role : '') + '">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-company">Company</label>' +
        '<input type="text" id="f-company" class="form-input" value="' + escapeHTML(item ? item.company : '') + '">' +
        '</div>' +
        '</div>' +
        '<div class="admin-form__footer">' +
        '<button type="button" class="btn btn-secondary admin-modal-cancel">Cancel</button>' +
        '<button type="submit" class="btn btn-primary">Save</button>' +
        '</div>';
    } else if (currentTab === 'team') {
      html =
        '<div class="admin-form__row">' +
        '<div class="form-group">' +
        '<label for="f-name">Name *</label>' +
        '<input type="text" id="f-name" class="form-input" required value="' + escapeHTML(item ? item.name : '') + '">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-avatarInitials">Initials</label>' +
        '<input type="text" id="f-avatarInitials" class="form-input" maxlength="2" placeholder="DN" value="' + escapeHTML(item ? item.avatarInitials : '') + '">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-role">Role / Title *</label>' +
        '<input type="text" id="f-role" class="form-input" required value="' + escapeHTML(item ? item.role : '') + '">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="f-bio">Bio</label>' +
        '<textarea id="f-bio" class="form-input">' + escapeHTML(item ? item.bio : '') + '</textarea>' +
        '</div>' +
        '<div class="admin-form__footer">' +
        '<button type="button" class="btn btn-secondary admin-modal-cancel">Cancel</button>' +
        '<button type="submit" class="btn btn-primary">Save</button>' +
        '</div>';
    }

    modalForm.innerHTML = html;
    modal.classList.add('is-open');

    // Bind cancel buttons in modal
    modalForm.querySelectorAll('.admin-modal-cancel').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    editingId = null;
  }

  // Save handler
  modalForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var item = {};

    if (currentTab === 'blogs') {
      item = {
        title: document.getElementById('f-title').value.trim(),
        category: document.getElementById('f-category').value,
        categoryLabel: TinahtData.CATEGORIES[document.getElementById('f-category').value],
        imageUrl: document.getElementById('f-imageUrl').value.trim(),
        description: document.getElementById('f-description').value.trim(),
        author: document.getElementById('f-author').value.trim() || 'Djonny Noel',
        date: document.getElementById('f-date').value,
        readTime: document.getElementById('f-readTime').value.trim(),
        featured: document.getElementById('f-featured').checked
      };
    } else if (currentTab === 'testimonials') {
      item = {
        quote: document.getElementById('f-quote').value.trim(),
        authorName: document.getElementById('f-authorName').value.trim(),
        avatarInitials: document.getElementById('f-avatarInitials').value.trim().toUpperCase(),
        role: document.getElementById('f-role').value.trim(),
        company: document.getElementById('f-company').value.trim()
      };
    } else if (currentTab === 'team') {
      item = {
        name: document.getElementById('f-name').value.trim(),
        avatarInitials: document.getElementById('f-avatarInitials').value.trim().toUpperCase(),
        role: document.getElementById('f-role').value.trim(),
        bio: document.getElementById('f-bio').value.trim()
      };
    }

    if (editingId) {
      TinahtData.update(currentTab, editingId, item);
      showToast('Item updated successfully', 'success');
    } else {
      TinahtData.add(currentTab, item);
      showToast('Item added successfully', 'success');
    }

    closeModal();
    renderList();
  });

  // Close modal on backdrop click or X button
  modal.querySelector('.admin-modal__backdrop').addEventListener('click', closeModal);
  modal.querySelector('.admin-modal__close').addEventListener('click', closeModal);

  // ── Delete Confirm ─────────────────────────────────────────

  confirmCancel.addEventListener('click', function () {
    confirmDialog.classList.remove('is-open');
    deleteId = null;
  });

  confirmDialog.querySelector('.admin-confirm__backdrop').addEventListener('click', function () {
    confirmDialog.classList.remove('is-open');
    deleteId = null;
  });

  confirmDelete.addEventListener('click', function () {
    if (deleteId) {
      TinahtData.remove(currentTab, deleteId);
      showToast('Item deleted', 'success');
      deleteId = null;
      confirmDialog.classList.remove('is-open');
      renderList();
    }
  });

  // ── Add Button ─────────────────────────────────────────────

  addBtn.addEventListener('click', function () {
    openModal(null);
  });

  // ── Export / Import ────────────────────────────────────────

  exportBtn.addEventListener('click', function () {
    var json = TinahtData.exportAll();
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'tinaht-data-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
  });

  importBtn.addEventListener('click', function () {
    importFile.click();
  });

  importFile.addEventListener('change', function () {
    var file = importFile.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        TinahtData.importAll(e.target.result);
        showToast('Data imported successfully', 'success');
        renderList();
      } catch (err) {
        showToast('Import failed: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    importFile.value = '';
  });

  // ── Clear All ──────────────────────────────────────────────

  clearBtn.addEventListener('click', function () {
    deleteId = '__clear_all__';
    confirmMessage.textContent = 'Are you sure you want to clear ALL data? This will remove all blogs, testimonials, and team members. Public pages will revert to hardcoded content.';
    confirmDialog.classList.add('is-open');
  });

  // Override confirm delete to handle clear-all
  var origConfirmHandler = confirmDelete.onclick;
  confirmDelete.addEventListener('click', function () {
    if (deleteId === '__clear_all__') {
      TinahtData.clearAll();
      showToast('All data cleared', 'success');
      deleteId = null;
      confirmDialog.classList.remove('is-open');
      renderList();
    }
  });

  // ── Seed Defaults ──────────────────────────────────────────

  var SEED_DATA = {
    blogs: [
      {
        id: 'seed-blog-1',
        title: 'How AI Workflow Automation Is Transforming Small Business Operations',
        category: 'ai-automation',
        categoryLabel: 'AI & Automation',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        description: 'Discover how small and mid-sized businesses are leveraging AI-driven workflows to reduce manual tasks, cut costs, and scale operations without adding headcount.',
        author: 'Djonny Noel',
        date: '2026-03-05',
        readTime: '8 min read',
        featured: true
      },
      {
        id: 'seed-blog-2',
        title: 'Docker vs. Kubernetes: Choosing the Right Container Strategy',
        category: 'hosting-devops',
        categoryLabel: 'Hosting & DevOps',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
        description: 'A practical comparison of container orchestration tools to help you pick the best fit for your infrastructure needs and team size.',
        author: 'Djonny Noel',
        date: '2026-02-28',
        readTime: '6 min read',
        featured: false
      },
      {
        id: 'seed-blog-3',
        title: 'Zero Trust Architecture: A Practical Implementation Guide',
        category: 'cybersecurity',
        categoryLabel: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
        description: 'Move beyond perimeter security with a step-by-step guide to implementing zero trust principles in your organization.',
        author: 'Djonny Noel',
        date: '2026-02-20',
        readTime: '10 min read',
        featured: false
      },
      {
        id: 'seed-blog-4',
        title: 'Core Web Vitals in 2026: What Changed and How to Optimize',
        category: 'web-performance',
        categoryLabel: 'Web Performance',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        description: "Google's latest Core Web Vitals update brings new metrics. Here's what matters for your site speed and SEO rankings.",
        author: 'Djonny Noel',
        date: '2026-02-14',
        readTime: '7 min read',
        featured: false
      },
      {
        id: 'seed-blog-5',
        title: 'Building Custom AI Chatbots: From Concept to Deployment',
        category: 'ai-automation',
        categoryLabel: 'AI & Automation',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
        description: 'A technical walkthrough of designing, training, and deploying custom AI chatbots that actually solve customer problems.',
        author: 'Djonny Noel',
        date: '2026-02-07',
        readTime: '12 min read',
        featured: false
      },
      {
        id: 'seed-blog-6',
        title: 'The Rise of Edge Computing: What It Means for Your Infrastructure',
        category: 'industry-news',
        categoryLabel: 'Industry News',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        description: 'Edge computing is reshaping how businesses think about latency, data processing, and distributed architecture.',
        author: 'Djonny Noel',
        date: '2026-01-30',
        readTime: '5 min read',
        featured: false
      },
      {
        id: 'seed-blog-7',
        title: 'SSL/TLS Best Practices: Securing Your Web Applications in 2026',
        category: 'hosting-devops',
        categoryLabel: 'Hosting & DevOps',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80',
        description: 'From certificate management to cipher suites, everything you need to know about modern TLS configuration.',
        author: 'Djonny Noel',
        date: '2026-01-22',
        readTime: '9 min read',
        featured: false
      }
    ],
    testimonials: [
      {
        id: 'seed-test-1',
        quote: 'Tinaht transformed our network infrastructure. Their team delivered a solution that exceeded our expectations and reduced our downtime significantly. Highly recommended for any business.',
        authorName: 'Sarah Mitchell',
        role: 'CTO',
        company: 'TechVenture Inc.',
        avatarInitials: 'SM'
      },
      {
        id: 'seed-test-2',
        quote: 'The AI automation solutions from Tinaht saved us over 20 hours per week in manual processes. Their team understood our needs from day one and delivered beyond our expectations.',
        authorName: 'Marcus Johnson',
        role: 'CEO',
        company: 'GrowthScale Labs',
        avatarInitials: 'MJ'
      },
      {
        id: 'seed-test-3',
        quote: "Moving to Tinaht's managed hosting was the best decision we made. Zero downtime during migration, Docker deployments are seamless, and their support team is incredibly responsive.",
        authorName: 'Emily Chen',
        role: 'VP of Engineering',
        company: 'DataFlow Systems',
        avatarInitials: 'EC'
      }
    ],
    team: [
      {
        id: 'seed-team-1',
        name: 'Djonny Noel',
        role: 'Founder & Lead Engineer',
        bio: 'Full-stack engineer and network architect with a passion for building scalable solutions that make a real impact.',
        avatarInitials: 'DN'
      },
      {
        id: 'seed-team-2',
        name: 'Team Hiring',
        role: 'Position Open',
        bio: "We're growing! Interested in joining our team? Reach out to us and let's build the future of technology together.",
        avatarInitials: 'TH'
      },
      {
        id: 'seed-team-3',
        name: 'Team Hiring',
        role: 'Position Open',
        bio: "We're always looking for talented engineers, developers, and consultants who share our vision for excellence.",
        avatarInitials: 'TH'
      }
    ]
  };

  seedBtn.addEventListener('click', function () {
    TinahtData.importAll(JSON.stringify(SEED_DATA));
    showToast('Default data seeded successfully', 'success');
    renderList();
  });

  // ── Keyboard shortcuts ─────────────────────────────────────

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (confirmDialog.classList.contains('is-open')) {
        confirmDialog.classList.remove('is-open');
        deleteId = null;
      } else if (modal.classList.contains('is-open')) {
        closeModal();
      }
    }
  });

  // ── Init ───────────────────────────────────────────────────

  // Generate the correct hash on first load — for setup, open console and run:
  // hashPassword('yourpassword').then(h => console.log(h))
  // Then replace ADMIN_HASH above with the result.
  // Default hash is for empty string — change it!

  checkAuth();

})();
