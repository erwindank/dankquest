// ════════════════════════════════════════════════════
//  DankQuest — app.js
// ════════════════════════════════════════════════════

const LEVELS = [
  { level: 1,  title: 'Wanderer',     xp: 0     },
  { level: 2,  title: 'Apprentice',   xp: 300   },
  { level: 3,  title: 'Journeyman',   xp: 800   },
  { level: 4,  title: 'Warrior',      xp: 1600  },
  { level: 5,  title: 'Expert',       xp: 2800  },
  { level: 6,  title: 'Champion',     xp: 4500  },
  { level: 7,  title: 'Master',       xp: 7000  },
  { level: 8,  title: 'Legend',       xp: 10500 },
  { level: 9,  title: 'Grandmaster',  xp: 15000 },
  { level: 10, title: 'Overlord',     xp: 21000 },
];

const DIFFICULTIES = {
  side:  { label: 'Side Quest',   icon: '⚡', bonus: 50,  fill: 'fill-side'  },
  quest: { label: 'Quest',        icon: '📜', bonus: 100, fill: 'fill-quest' },
  main:  { label: 'Main Quest',   icon: '🔥', bonus: 200, fill: 'fill-main'  },
  boss:  { label: 'Boss Battle',  icon: '💀', bonus: 400, fill: 'fill-boss'  },
};

const MISSION_POOL = [
  { id: 'first_step',  title: '⚔️ First Blood',     desc: 'Complete your first step today',     target: 1, type: 'steps',    xp: 50  },
  { id: 'three_steps', title: '🔥 Momentum Builder', desc: 'Complete 3 steps today',              target: 3, type: 'steps',    xp: 100 },
  { id: 'five_steps',  title: '💪 On a Roll',        desc: 'Complete 5 steps today',              target: 5, type: 'steps',    xp: 200 },
  { id: 'one_task',    title: '🏆 Quest Slayer',     desc: 'Complete 1 full quest today',         target: 1, type: 'tasks',    xp: 250 },
  { id: 'new_quest',   title: '📝 Quest Planner',    desc: 'Break down a new quest into steps',   target: 1, type: 'newTask',  xp: 75  },
  { id: 'focus_mode',  title: '🎯 Deep Focus',       desc: 'Use Focus Mode at least once today',  target: 1, type: 'focus',    xp: 75  },
];

const XP_PER_STEP = 15;

// ─── STATE ──────────────────────────────────────────
let state = {
  user: {
    xp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    totalTasksCompleted: 0,
    totalStepsCompleted: 0,
    joinedDate: todayStr(),
  },
  tasks: [],
  dailyMissions: null,
  currentView: 'today',
  focusTaskId: null,
  focusStepId: null,
  showCompleted: false,
};

// ─── PERSISTENCE ────────────────────────────────────
function save() {
  localStorage.setItem('dankquest_v1', JSON.stringify(state));
}

function load() {
  try {
    const raw = localStorage.getItem('dankquest_v1');
    if (raw) {
      const saved = JSON.parse(raw);
      state.user = { ...state.user, ...saved.user };
      state.tasks = saved.tasks || [];
      state.dailyMissions = saved.dailyMissions || null;
      state.showCompleted = saved.showCompleted || false;
    }
  } catch (e) { /* corrupt data, start fresh */ }
  checkDailyReset();
  checkStreakDecay();
}

// ─── EXPORT / IMPORT ────────────────────────────────
function exportData() {
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dankquest-backup-${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('📁 Backup downloaded!');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!imported.user || !imported.tasks) throw new Error('Invalid file');
        state = { ...state, ...imported };
        save();
        updateHeader();
        renderCurrentView();
        toast('✅ Data imported!');
      } catch {
        toast('⚠️ Invalid backup file');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ─── DATE UTILS ─────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function checkDailyReset() {
  const t = todayStr();
  if (!state.dailyMissions || state.dailyMissions.date !== t) {
    generateDailyMissions(t);
  }
}

function checkStreakDecay() {
  if (!state.user.lastActiveDate) return;
  const diff = daysBetween(state.user.lastActiveDate, todayStr());
  if (diff > 1) {
    state.user.streak = 0;
    save();
  }
}

function generateDailyMissions(date) {
  const pool = [...MISSION_POOL];
  const chosen = [];
  for (let i = 0; i < 3 && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    chosen.push({ ...pool[idx], progress: 0, completed: false });
    pool.splice(idx, 1);
  }
  state.dailyMissions = {
    date,
    missions: chosen,
    stepsToday: 0,
    tasksToday: 0,
    newTaskToday: 0,
    focusToday: 0,
  };
  save();
}

// ─── UTILS ──────────────────────────────────────────
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function escHtml(str) {
  return (str == null ? '' : String(str))
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── LEVEL UTILS ────────────────────────────────────
function getLevel(xp) {
  let lvl = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.xp) lvl = l;
    else break;
  }
  return lvl;
}

function getNextLevel(xp) {
  const cur = getLevel(xp);
  return LEVELS.find(l => l.xp > cur.xp) || null;
}

function xpPercent(xp) {
  const cur = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  return Math.min(100, Math.round(((xp - cur.xp) / (next.xp - cur.xp)) * 100));
}

// ─── XP AWARD ───────────────────────────────────────
function awardXP(amount, label) {
  const oldLevel = getLevel(state.user.xp).level;
  state.user.xp += amount;
  const newLevel = getLevel(state.user.xp).level;

  toast(`+${amount} XP${label ? ' — ' + label : ''} ✨`);
  updateHeader();
  save();

  if (newLevel > oldLevel) {
    setTimeout(() => showLevelUp(getLevel(state.user.xp)), 700);
  }
}

function showLevelUp(lvl) {
  document.getElementById('levelup-sub').textContent = `You are now a ${lvl.title}`;
  document.getElementById('levelup-overlay').classList.remove('hidden');
}

function dismissLevelUp() {
  document.getElementById('levelup-overlay').classList.add('hidden');
}

// ─── STREAK ─────────────────────────────────────────
function markActiveToday() {
  const t = todayStr();
  if (state.user.lastActiveDate === t) return;

  if (state.user.lastActiveDate && daysBetween(state.user.lastActiveDate, t) === 1) {
    state.user.streak++;
  } else {
    state.user.streak = 1;
  }

  if (state.user.streak > state.user.longestStreak) {
    state.user.longestStreak = state.user.streak;
  }

  state.user.lastActiveDate = t;
  awardXP(50, 'Daily streak!');
  save();
}

// ─── MISSIONS ───────────────────────────────────────
function updateMissions(type) {
  if (!state.dailyMissions) return;
  const dm = state.dailyMissions;

  if (type === 'steps')   dm.stepsToday   = (dm.stepsToday   || 0) + 1;
  if (type === 'tasks')   dm.tasksToday   = (dm.tasksToday   || 0) + 1;
  if (type === 'newTask') dm.newTaskToday = (dm.newTaskToday || 0) + 1;
  if (type === 'focus')   dm.focusToday   = (dm.focusToday   || 0) + 1;

  const countMap = {
    steps:   dm.stepsToday   || 0,
    tasks:   dm.tasksToday   || 0,
    newTask: dm.newTaskToday || 0,
    focus:   dm.focusToday   || 0,
  };

  let allDone = true;
  for (const m of dm.missions) {
    if (!m.completed) {
      if (m.type === type) {
        m.progress = Math.min(m.target, countMap[type]);
        if (m.progress >= m.target) {
          m.completed = true;
          setTimeout(() => awardXP(m.xp, m.title), 400);
        }
      }
      if (!m.completed) allDone = false;
    }
  }

  if (allDone && dm.missions.length > 0 && !dm.allDoneToasted) {
    dm.allDoneToasted = true;
    setTimeout(() => toast('🎊 All daily missions complete!'), 1000);
  }

  save();
}

// ─── TASK ACTIONS ────────────────────────────────────
function completeStep(taskId, stepId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  const step = task.steps.find(s => s.id === stepId);
  if (!step || step.completed) return;

  step.completed = true;
  step.completedAt = new Date().toISOString();
  state.user.totalStepsCompleted++;

  markActiveToday();
  awardXP(XP_PER_STEP, 'Step done');
  updateMissions('steps');

  const allDone = task.steps.length > 0 && task.steps.every(s => s.completed);
  if (allDone && !task.completedAt) {
    task.completedAt = new Date().toISOString();
    state.user.totalTasksCompleted++;
    const diff = DIFFICULTIES[task.difficulty] || DIFFICULTIES.quest;
    setTimeout(() => awardXP(diff.bonus, '⚔️ Quest complete!'), 500);
    updateMissions('tasks');
    setTimeout(() => toast('🎉 Quest Complete! Bonus XP incoming...'), 200);
  }

  save();
  renderCurrentView();
}

function getActiveStep() {
  for (const task of state.tasks) {
    if (task.completedAt) continue;
    const step = task.steps.find(s => !s.completed);
    if (step) return { task, step };
  }
  return null;
}

// ─── VIEWS ──────────────────────────────────────────
function showView(name) {
  state.currentView = name;
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.v === name);
  });
  renderCurrentView();
}

function renderCurrentView() {
  switch (state.currentView) {
    case 'today':  renderToday();  break;
    case 'quests': renderQuests(); break;
    case 'stats':  renderStats();  break;
  }
}

// ─── TODAY VIEW ──────────────────────────────────────
function renderToday() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const active = getActiveStep();
  const dm = state.dailyMissions;

  let html = `
    <div class="greeting">${greeting} ⚔️</div>
    <div class="greeting-sub">${active ? 'Your next step is waiting.' : 'Looking strong — add a new quest!'}</div>

    <div class="quick-add-bar">
      <input
        id="quick-add-input"
        class="quick-add-input"
        type="text"
        placeholder="Quick add a quest..."
        onkeydown="handleQuickAddKey(event)"
      />
      <button class="quick-add-btn" onclick="quickAddQuest()">+</button>
    </div>
  `;

  if (active) {
    html += `
      <div class="active-step-card">
        <div class="active-step-label">⚡ Your Next Step</div>
        <div class="active-step-task">${escHtml(active.task.title)}</div>
        ${active.step.isStarter ? '<div class="starter-badge">⭐ Starter Step — under 2 min</div>' : ''}
        <div class="active-step-text">${escHtml(active.step.text)}</div>
        <div class="step-actions">
          <button class="btn-complete" onclick="completeStep('${active.task.id}', '${active.step.id}')">
            ✓ Done
          </button>
          <button class="btn-focus" onclick="enterFocus('${active.task.id}', '${active.step.id}')">
            🎯 Focus
          </button>
        </div>
      </div>
    `;
  } else {
    html += `
      <div class="empty-state">
        <div class="empty-emoji">🗡️</div>
        <div class="empty-title">No active quests</div>
        <div class="empty-sub">Add a quest and break it down into tiny steps so you always know exactly what to do next.</div>
        <button class="btn-primary" onclick="openAddQuest()">+ Add a Quest</button>
      </div>
    `;
  }

  if (dm) {
    html += `<div class="card"><div class="card-title">Daily Missions</div>`;
    for (const m of dm.missions) {
      const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
      html += `
        <div class="mission-item${m.completed ? ' completed' : ''}">
          <div class="mission-icon ${m.completed ? 'done' : 'pending'}">${m.completed ? '✅' : '🎯'}</div>
          <div class="mission-info">
            <div class="mission-title">${escHtml(m.title)}</div>
            <div class="mission-desc">${escHtml(m.desc)}</div>
            ${!m.completed ? `
              <div class="mission-progress-bar">
                <div class="mission-progress-fill" style="width:${pct}%"></div>
              </div>
            ` : ''}
          </div>
          <div class="mission-xp">${m.completed ? '✓' : '+' + m.xp + ' XP'}</div>
        </div>
      `;
    }
    html += `</div>`;
  }

  document.getElementById('view').innerHTML = html;
}

// ─── QUESTS VIEW ─────────────────────────────────────
function renderQuests() {
  const active = state.tasks.filter(t => !t.completedAt);
  const done   = state.tasks.filter(t =>  t.completedAt);

  let html = `
    <div class="section-header">
      <div class="section-title">Active Quests</div>
      <button class="btn-add" onclick="openAddQuest()">+ New Quest</button>
    </div>
  `;

  if (active.length === 0) {
    html += `
      <div class="empty-state" style="padding: 28px 20px;">
        <div class="empty-emoji">📜</div>
        <div class="empty-title">No quests yet</div>
        <div class="empty-sub">Each quest is a goal broken into small enough steps that starting feels effortless.</div>
        <button class="btn-primary" onclick="openAddQuest()">+ Add Your First Quest</button>
      </div>
    `;
  } else {
    active.forEach(t => { html += renderQuestCard(t); });
  }

  if (done.length > 0) {
    html += `
      <div class="completed-section">
        <button class="completed-toggle" onclick="toggleCompleted()">
          ${state.showCompleted ? '▼' : '▶'} Completed Quests (${done.length})
        </button>
        ${state.showCompleted ? done.map(renderQuestCard).join('') : ''}
      </div>
    `;
  }

  document.getElementById('view').innerHTML = html;
}

function renderQuestCard(task) {
  const diff = DIFFICULTIES[task.difficulty] || DIFFICULTIES.quest;
  const total = task.steps.length;
  const doneCount = task.steps.filter(s => s.completed).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const expanded = task._expanded;

  let stepsHtml = '';
  if (expanded) {
    stepsHtml = `<div class="quest-steps open">`;
    if (task.steps.length === 0) {
      stepsHtml += `<div class="no-steps-hint">No steps yet — add one below</div>`;
    }
    task.steps.forEach(step => {
      stepsHtml += `
        <div class="step-row" onclick="toggleStep('${task.id}', '${step.id}')">
          <div class="step-check${step.completed ? ' done' : ''}">${step.completed ? '✓' : ''}</div>
          <div class="step-text${step.completed ? ' done' : ''}">
            ${escHtml(step.text)}
            ${step.isStarter ? '<span class="step-starter-badge">STARTER</span>' : ''}
          </div>
        </div>
      `;
    });
    if (!task.completedAt) {
      stepsHtml += `
        <div class="inline-add-step">
          <input
            id="inline-input-${task.id}"
            class="inline-step-input"
            type="text"
            placeholder="Add a step..."
            onkeydown="handleInlineStepKey(event, '${task.id}')"
          />
          <button class="inline-add-btn" onclick="addInlineStep('${task.id}')">+</button>
        </div>
      `;
    }
    stepsHtml += `</div>`;
  }

  const editBtn = !task.completedAt ? `
    <button class="quest-edit-btn" onclick="event.stopPropagation(); openEditQuest('${task.id}')">✏️</button>
  ` : '';

  return `
    <div class="quest-card${task.completedAt ? ' completed' : ''}">
      <div class="quest-header" onclick="toggleQuestExpand('${task.id}')">
        <div class="quest-diff">${diff.icon}</div>
        <div class="quest-info">
          <div class="quest-title">${escHtml(task.title)}</div>
          <div class="quest-meta">${diff.label} • ${doneCount}/${total} steps</div>
        </div>
        ${editBtn}
        <div class="quest-expand-icon">${expanded ? '▲' : '▼'}</div>
      </div>
      <div class="quest-progress">
        <div class="progress-bar">
          <div class="progress-fill ${diff.fill}" style="width:${pct}%"></div>
        </div>
      </div>
      ${stepsHtml}
    </div>
  `;
}

function toggleQuestExpand(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) { task._expanded = !task._expanded; renderCurrentView(); }
}

function toggleStep(taskId, stepId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task || task.completedAt) return;
  const step = task.steps.find(s => s.id === stepId);
  if (!step) return;

  if (step.completed) {
    step.completed = false;
    step.completedAt = null;
    save();
    renderCurrentView();
  } else {
    completeStep(taskId, stepId);
  }
}

function toggleCompleted() {
  state.showCompleted = !state.showCompleted;
  renderCurrentView();
}

// ─── STATS VIEW ──────────────────────────────────────
function renderStats() {
  const lvl  = getLevel(state.user.xp);
  const next = getNextLevel(state.user.xp);
  const pct  = xpPercent(state.user.xp);
  const xpToNext = next ? next.xp - state.user.xp : 0;

  const days = [];
  const activeDate = state.user.lastActiveDate;
  const streak = state.user.streak;

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const dn = d.toLocaleDateString('en', { weekday: 'short' }).slice(0, 2);
    let isActive = false;
    if (activeDate) {
      const daysFromActive = daysBetween(ds, activeDate);
      isActive = daysFromActive >= 0 && daysFromActive < streak;
    }
    days.push({ ds, dn, isToday: i === 0, isActive });
  }

  const calHtml = days.map(d => `
    <div class="cal-day ${d.isActive ? 'active' : 'inactive'} ${d.isToday ? 'today' : ''}">
      <div class="cal-dot"></div>
      <div>${d.dn}</div>
    </div>
  `).join('');

  document.getElementById('view').innerHTML = `
    <div class="stats-hero">
      <div class="stats-level-num">${lvl.level}</div>
      <div class="stats-level-title">${lvl.title}</div>
      <div class="stats-xp-sub">
        ${state.user.xp.toLocaleString()} XP total
        ${next ? `<br>${xpToNext.toLocaleString()} XP to ${next.title}` : '<br>MAX LEVEL 👑'}
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-value" style="color:var(--orange)">🔥 ${state.user.streak}</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${state.user.longestStreak}</div>
        <div class="stat-label">Best Streak</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--green)">${state.user.totalTasksCompleted}</div>
        <div class="stat-label">Quests Done</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--purple-light)">${state.user.totalStepsCompleted}</div>
        <div class="stat-label">Steps Taken</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Last 7 Days</div>
      <div class="streak-calendar">${calHtml}</div>
    </div>

    <div class="card">
      <div class="card-title">Level Progress</div>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
        <span style="color:var(--text2)">Lvl ${lvl.level} — ${lvl.title}</span>
        ${next ? `<span style="color:var(--text2)">Lvl ${next.level} — ${next.title}</span>` : '<span style="color:var(--gold)">MAX ✓</span>'}
      </div>
      <div class="progress-bar" style="height:12px;">
        <div class="progress-fill fill-quest" style="width:${pct}%;background:linear-gradient(90deg,var(--purple),var(--gold))"></div>
      </div>
      <div style="text-align:center;font-size:12px;color:var(--text2);margin-top:8px;">${pct}%</div>
    </div>

    <div class="card">
      <div class="card-title">Data</div>
      <p style="font-size:13px;color:var(--text2);margin-bottom:12px;">
        Export your data to back it up or move it to another device.
      </p>
      <div class="export-row">
        <button class="btn-export" onclick="exportData()">⬇️ Export JSON</button>
        <button class="btn-export" onclick="importData()">⬆️ Import JSON</button>
      </div>
    </div>
  `;
}

// ─── FOCUS MODE ──────────────────────────────────────
function enterFocus(taskId, stepId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  const step = task.steps.find(s => s.id === stepId);
  if (!step) return;

  state.focusTaskId = taskId;
  state.focusStepId = stepId;

  document.getElementById('focus-task-name').textContent = task.title;
  document.getElementById('focus-step-text').textContent = step.text;
  document.getElementById('focus-overlay').classList.remove('hidden');

  updateMissions('focus');
  save();
}

function completeFocusStep() {
  if (!state.focusTaskId || !state.focusStepId) return;
  completeStep(state.focusTaskId, state.focusStepId);

  const task = state.tasks.find(t => t.id === state.focusTaskId);
  if (!task || task.completedAt) { exitFocus(); return; }

  const next = task.steps.find(s => !s.completed);
  if (next) {
    state.focusStepId = next.id;
    document.getElementById('focus-step-text').textContent = next.text;
  } else {
    exitFocus();
  }
}

function exitFocus() {
  state.focusTaskId = null;
  state.focusStepId = null;
  document.getElementById('focus-overlay').classList.add('hidden');
}

// ─── MODAL STATE ─────────────────────────────────────
let modalMode = 'add'; // 'add' | 'edit' | 'bulk'
let editingTaskId = null;
let newQ = { title: '', difficulty: 'quest', steps: [''] };

// ─── ADD / EDIT QUEST MODAL ──────────────────────────
function openAddQuest() {
  modalMode = 'add';
  editingTaskId = null;
  newQ = { title: '', difficulty: 'quest', steps: [''] };
  renderModal();
  document.getElementById('modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('q-title')?.focus(), 80);
}

function openEditQuest(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  modalMode = 'edit';
  editingTaskId = taskId;
  newQ = {
    title: task.title,
    difficulty: task.difficulty,
    steps: task.steps.length > 0 ? task.steps.map(s => s.text) : [''],
  };
  renderModal();
  document.getElementById('modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('q-title')?.focus(), 80);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function handleOverlayClick(e) {
  if (e.target.id === 'modal-overlay') closeModal();
}

function switchModalTab(tab) {
  syncModalSteps();
  modalMode = tab;
  renderModal();
  if (tab === 'add')  setTimeout(() => document.getElementById('q-title')?.focus(), 80);
  if (tab === 'bulk') setTimeout(() => document.getElementById('bulk-input')?.focus(), 80);
}

function renderModal() {
  if (modalMode === 'bulk') { renderBulkModal(); return; }

  const isEdit = modalMode === 'edit';

  const tabsHtml = isEdit ? '' : `
    <div class="modal-tabs">
      <button class="modal-tab active">Single Quest</button>
      <button class="modal-tab" onclick="switchModalTab('bulk')">Bulk Add</button>
    </div>
  `;

  const diffHtml = Object.entries(DIFFICULTIES).map(([k, d]) => `
    <div class="diff-opt${newQ.difficulty === k ? ' selected' : ''}" onclick="selectDiff('${k}')">
      <div class="diff-opt-icon">${d.icon}</div>
      <div class="diff-opt-name">${d.label}</div>
      <div class="diff-opt-xp">+${d.bonus} XP</div>
    </div>
  `).join('');

  const stepsHtml = newQ.steps.map((s, i) => `
    <div class="step-input-row">
      <div class="step-num${i === 0 ? ' first' : ''}">${i + 1}</div>
      <input
        class="step-input"
        type="text"
        placeholder="${i === 0 ? 'Easiest possible first action...' : 'Next step...'}"
        value="${escHtml(s)}"
        oninput="newQ.steps[${i}] = this.value"
        onkeydown="handleStepKey(event, ${i})"
      />
      ${i >= 1 ? `<button class="step-del" onclick="removeStep(${i})">✕</button>` : ''}
    </div>
    ${i === 0 ? '<div class="step-hint">⭐ Make this so easy you can\'t say no (under 2 min)</div>' : ''}
  `).join('');

  document.getElementById('modal').innerHTML = `
    ${tabsHtml}
    <h2>${isEdit ? 'Edit Quest ✏️' : 'New Quest ⚔️'}</h2>
    <p class="modal-sub">${isEdit ? 'Update your quest details.' : 'Name it now, break it down later.'}</p>

    <div class="form-group">
      <label class="form-label">Quest Name</label>
      <input
        id="q-title"
        class="form-input"
        type="text"
        placeholder="What do you need to accomplish?"
        value="${escHtml(newQ.title)}"
        oninput="newQ.title = this.value"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Difficulty</label>
      <div class="diff-picker">${diffHtml}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Steps <span style="color:var(--text3);font-weight:400">(optional)</span></label>
      <div id="steps-list">${stepsHtml}</div>
      <button class="btn-add-step" onclick="addModalStep()">+ Add another step</button>
    </div>

    <div class="modal-actions">
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      <button class="btn-save" onclick="${isEdit ? 'saveEditQuest()' : 'saveQuest()'}">${isEdit ? 'Save Changes ✓' : 'Save Quest ⚔️'}</button>
    </div>
  `;
}

function renderBulkModal() {
  document.getElementById('modal').innerHTML = `
    <div class="modal-tabs">
      <button class="modal-tab" onclick="switchModalTab('add')">Single Quest</button>
      <button class="modal-tab active">Bulk Add</button>
    </div>
    <h2>Bulk Add Quests ⚔️</h2>
    <p class="modal-sub">One quest per line. Add steps to each one later.</p>
    <div class="form-group">
      <label class="form-label">Quest Names</label>
      <textarea
        id="bulk-input"
        class="form-input bulk-textarea"
        placeholder="Write a report&#10;Call the dentist&#10;Fix the login bug&#10;..."
      ></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      <button class="btn-save" onclick="saveBulkQuests()">Add All Quests ⚔️</button>
    </div>
  `;
}

function selectDiff(k) {
  syncModalSteps();
  newQ.difficulty = k;
  renderModal();
}

function syncModalSteps() {
  document.querySelectorAll('.step-input').forEach((inp, i) => {
    if (i < newQ.steps.length) newQ.steps[i] = inp.value;
  });
  const titleEl = document.getElementById('q-title');
  if (titleEl) newQ.title = titleEl.value;
}

function addModalStep() {
  syncModalSteps();
  newQ.steps.push('');
  renderModal();
  const inputs = document.querySelectorAll('.step-input');
  if (inputs.length) inputs[inputs.length - 1].focus();
}

function removeStep(i) {
  syncModalSteps();
  newQ.steps.splice(i, 1);
  renderModal();
}

function handleStepKey(e, i) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (i === newQ.steps.length - 1) addModalStep();
    else document.querySelectorAll('.step-input')[i + 1]?.focus();
  }
}

function saveQuest() {
  syncModalSteps();
  if (!newQ.title.trim()) { toast('⚠️ Give your quest a name!'); return; }
  const validSteps = newQ.steps.map(s => s.trim()).filter(Boolean);

  const task = {
    id: uid(),
    title: newQ.title.trim(),
    difficulty: newQ.difficulty,
    createdAt: todayStr(),
    completedAt: null,
    _expanded: false,
    steps: validSteps.map((text, i) => ({
      id: uid(),
      text,
      isStarter: i === 0,
      completed: false,
      completedAt: null,
    })),
  };

  state.tasks.unshift(task);
  updateMissions('newTask');
  save();
  closeModal();
  toast('⚔️ Quest added!');
  showView('today');
}

function saveEditQuest() {
  syncModalSteps();
  if (!newQ.title.trim()) { toast('⚠️ Give your quest a name!'); return; }

  const task = state.tasks.find(t => t.id === editingTaskId);
  if (!task) return;

  const validSteps = newQ.steps.map(s => s.trim()).filter(Boolean);

  task.title = newQ.title.trim();
  task.difficulty = newQ.difficulty;

  // Preserve completed state for steps that match by text
  task.steps = validSteps.map((text, i) => {
    const existing = task.steps.find(s => s.text === text && !s._matched);
    if (existing) {
      existing._matched = true;
      return { ...existing, isStarter: i === 0 };
    }
    return { id: uid(), text, isStarter: i === 0, completed: false, completedAt: null };
  });
  task.steps.forEach(s => delete s._matched);

  // Re-evaluate completion status
  if (task.steps.length > 0 && task.steps.every(s => s.completed)) {
    if (!task.completedAt) task.completedAt = new Date().toISOString();
  } else {
    task.completedAt = null;
  }

  save();
  closeModal();
  toast('✓ Quest updated!');
  renderCurrentView();
}

function saveBulkQuests() {
  const raw = document.getElementById('bulk-input')?.value || '';
  const titles = raw.split('\n').map(l => l.trim()).filter(Boolean);
  if (titles.length === 0) { toast('⚠️ Enter at least one quest name!'); return; }

  titles.forEach(title => {
    state.tasks.unshift({
      id: uid(),
      title,
      difficulty: 'quest',
      createdAt: todayStr(),
      completedAt: null,
      _expanded: false,
      steps: [],
    });
  });

  updateMissions('newTask');
  save();
  closeModal();
  toast(`⚔️ ${titles.length} quest${titles.length > 1 ? 's' : ''} added!`);
  showView('quests');
}

// ─── INLINE STEP ADD ─────────────────────────────────
function addInlineStep(taskId) {
  const input = document.getElementById(`inline-input-${taskId}`);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.steps.push({
    id: uid(),
    text,
    isStarter: task.steps.length === 0,
    completed: false,
    completedAt: null,
  });

  save();
  renderCurrentView();
}

function handleInlineStepKey(e, taskId) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addInlineStep(taskId);
  }
}

// ─── QUICK ADD ───────────────────────────────────────
function quickAddQuest() {
  const input = document.getElementById('quick-add-input');
  if (!input) return;
  const title = input.value.trim();
  if (!title) return;

  state.tasks.unshift({
    id: uid(),
    title,
    difficulty: 'quest',
    createdAt: todayStr(),
    completedAt: null,
    _expanded: false,
    steps: [],
  });

  updateMissions('newTask');
  save();
  input.value = '';
  toast('⚔️ Quest added!');
  renderCurrentView();
}

function handleQuickAddKey(e) {
  if (e.key === 'Enter') quickAddQuest();
}

// ─── HEADER ──────────────────────────────────────────
function updateHeader() {
  const lvl  = getLevel(state.user.xp);
  const next = getNextLevel(state.user.xp);
  const pct  = xpPercent(state.user.xp);

  document.getElementById('streak-num').textContent = state.user.streak;
  document.getElementById('level-pill').textContent = `Lvl ${lvl.level}`;
  document.getElementById('xp-fill').style.width = pct + '%';

  const xpText = next
    ? `${state.user.xp.toLocaleString()} / ${next.xp.toLocaleString()} XP • ${lvl.title}`
    : `${state.user.xp.toLocaleString()} XP • ${lvl.title} 👑`;
  document.getElementById('xp-text').textContent = xpText;
}

// ─── TOAST ───────────────────────────────────────────
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 2600);
}

// ─── INIT ────────────────────────────────────────────
load();
updateHeader();
showView('today');
