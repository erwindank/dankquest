// ════════════════════════════════════════════════════
//  DankQuest — app.js
// ════════════════════════════════════════════════════

const LEVELS = [
  { level: 1,  title: 'Wanderer',      xp: 0,      icon: '◌', tier: 1 },
  { level: 2,  title: 'Apprentice',    xp: 300,    icon: '○', tier: 1 },
  { level: 3,  title: 'Journeyman',    xp: 800,    icon: '◎', tier: 1 },
  { level: 4,  title: 'Warrior',       xp: 1600,   icon: '◆', tier: 1 },
  { level: 5,  title: 'Veteran',       xp: 2800,   icon: '★', tier: 1 },
  { level: 6,  title: 'Champion',      xp: 4500,   icon: '✦', tier: 2 },
  { level: 7,  title: 'Master',        xp: 7000,   icon: '✪', tier: 2 },
  { level: 8,  title: 'Legend',        xp: 10500,  icon: '✸', tier: 2 },
  { level: 9,  title: 'Grandmaster',   xp: 15000,  icon: '♛', tier: 2 },
  { level: 10, title: 'Overlord',      xp: 21000,  icon: '♕', tier: 2 },
  { level: 11, title: 'Tyrant',        xp: 29000,  icon: '♚', tier: 3 },
  { level: 12, title: 'Warlord',       xp: 39000,  icon: '♔', tier: 3 },
  { level: 13, title: 'Titan',         xp: 51000,  icon: '❋', tier: 3 },
  { level: 14, title: 'Conqueror',     xp: 65000,  icon: '✱', tier: 3 },
  { level: 15, title: 'Sovereign',     xp: 82000,  icon: '✳', tier: 3 },
  { level: 16, title: 'Archon',        xp: 100000, icon: '✴', tier: 4 },
  { level: 17, title: 'Arbiter',       xp: 120000, icon: '✶', tier: 4 },
  { level: 18, title: 'High Lord',     xp: 142000, icon: '✤', tier: 4 },
  { level: 19, title: 'Elder',         xp: 166000, icon: '✻', tier: 4 },
  { level: 20, title: 'Archmage',      xp: 192000, icon: '✽', tier: 4 },
  { level: 21, title: 'Dreadlord',     xp: 220000, icon: '∞', tier: 5 },
  { level: 22, title: 'Dragonborn',    xp: 250000, icon: '⊕', tier: 5 },
  { level: 23, title: 'Ancient',       xp: 282000, icon: 'Δ', tier: 5 },
  { level: 24, title: 'Transcendent',  xp: 316000, icon: 'Ω', tier: 5 },
  { level: 25, title: 'Immortal',      xp: 352000, icon: 'Ψ', tier: 5 },
  { level: 26, title: 'Celestial',     xp: 390000, icon: 'Λ', tier: 6 },
  { level: 27, title: 'Demigod',       xp: 430000, icon: 'Φ', tier: 6 },
  { level: 28, title: 'God-King',      xp: 472000, icon: 'Σ', tier: 6 },
  { level: 29, title: 'Eternal',       xp: 516000, icon: '∇', tier: 6 },
  { level: 30, title: 'Supreme',       xp: 562000, icon: '◈', tier: 6 },
];

const DIFFICULTIES = {
  side:  { label: 'Side Quest',   icon: '⚡', bonus: 50,  fill: 'fill-side'  },
  quest: { label: 'Quest',        icon: '📜', bonus: 100, fill: 'fill-quest' },
  main:  { label: 'Main Quest',   icon: '🔥', bonus: 200, fill: 'fill-main'  },
  boss:  { label: 'Boss Battle',  icon: '💀', bonus: 400, fill: 'fill-boss'  },
};

const MISSION_POOL = [
  { id: 'first_step',   title: '⚔️ First Blood',      desc: 'Complete your first step today',      target: 1,  type: 'steps',   xp: 50  },
  { id: 'three_steps',  title: '🔥 Momentum Builder',  desc: 'Complete 3 steps today',               target: 3,  type: 'steps',   xp: 100 },
  { id: 'five_steps',   title: '💪 On a Roll',         desc: 'Complete 5 steps today',               target: 5,  type: 'steps',   xp: 200 },
  { id: 'ten_steps',    title: '🌪️ Step Storm',         desc: 'Complete 10 steps today',              target: 10, type: 'steps',   xp: 350 },
  { id: 'one_task',     title: '🏆 Quest Slayer',      desc: 'Complete 1 full quest today',          target: 1,  type: 'tasks',   xp: 250 },
  { id: 'two_tasks',    title: '⚡ Double Victory',    desc: 'Complete 2 full quests today',         target: 2,  type: 'tasks',   xp: 450 },
  { id: 'new_quest',    title: '📝 Quest Planner',     desc: 'Break down a new quest into steps',    target: 1,  type: 'newTask', xp: 75  },
  { id: 'two_quests',   title: '📋 Quest Collector',   desc: 'Add 2 new quests today',               target: 2,  type: 'newTask', xp: 120 },
  { id: 'focus_mode',   title: '🎯 Deep Focus',        desc: 'Use Focus Mode at least once today',   target: 1,  type: 'focus',   xp: 75  },
  { id: 'focus_triple', title: '🧘 Flow State',        desc: 'Use Focus Mode 3 times today',         target: 3,  type: 'focus',   xp: 180 },
];

const WEEKLY_MISSION_POOL = [
  { id: 'w_10steps',   title: '⚔️ Step Warrior',     desc: 'Complete 10 steps this week',        target: 10, type: 'steps',      xp: 300 },
  { id: 'w_25steps',   title: '💪 Momentum Beast',   desc: 'Complete 25 steps this week',        target: 25, type: 'steps',      xp: 600 },
  { id: 'w_50steps',   title: '🌪️ Unstoppable',       desc: 'Complete 50 steps this week',        target: 50, type: 'steps',      xp: 1000 },
  { id: 'w_3tasks',    title: '🏆 Triple Threat',    desc: 'Complete 3 quests this week',        target: 3,  type: 'tasks',      xp: 500 },
  { id: 'w_5tasks',    title: '💀 Quest Overlord',   desc: 'Complete 5 quests this week',        target: 5,  type: 'tasks',      xp: 800 },
  { id: 'w_focus5',    title: '🎯 Focus Master',     desc: 'Use Focus Mode 5 times this week',   target: 5,  type: 'focus',      xp: 350 },
  { id: 'w_3newquest', title: '📝 Quest Architect',  desc: 'Add 3 new quests this week',         target: 3,  type: 'newTask',    xp: 250 },
  { id: 'w_5days',     title: '🔥 Week Warrior',     desc: 'Be active 5 days this week',         target: 5,  type: 'activeDays', xp: 450 },
  { id: 'w_7days',     title: '👑 Perfect Week',     desc: 'Be active every day this week',      target: 7,  type: 'activeDays', xp: 750 },
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
    totalFocusSessions: 0,
    totalMissionsCompleted: 0,
    bestDaySteps: 0,
    allTimeActiveDates: [],
    weeklyXpEarned: 0,
    joinedDate: todayStr(),
  },
  tasks: [],
  dailyMissions: null,
  weeklyMissions: null,
  currentView: 'today',
  focusTaskId: null,
  focusStepId: null,
  showCompleted: false,
  questSort: 'created',
  questSortDir: 'desc',
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
      state.dailyMissions  = saved.dailyMissions  || null;
      state.weeklyMissions = saved.weeklyMissions || null;
      state.showCompleted = saved.showCompleted || false;
      state.questSort    = saved.questSort    || 'created';
      state.questSortDir = saved.questSortDir || 'desc';
    }
  } catch (e) { /* corrupt data, start fresh */ }

  // One-time fix: dates were stored as UTC strings before local-date migration.
  // If the transition caused markActiveToday to fire for a false "new day", undo the +1.
  if (!state.user.localDatesMigrated) {
    state.user.localDatesMigrated = true;
    const utcToday = new Date().toISOString().slice(0, 10);
    const localToday = todayStr();
    if (daysBetween(utcToday, localToday) === 1 &&
        state.user.lastActiveDate === localToday &&
        state.user.streak > 0) {
      state.user.streak--;
    }
    save();
  }

  checkDailyReset();
  checkWeeklyReset();
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

// ─── GOOGLE DRIVE BACKUP ────────────────────────────
const GDRIVE_CLIENT_ID = '966589279218-m8kaa41o6guvgksv4ssh1rlh94a9qenv.apps.googleusercontent.com';
const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const GDRIVE_FILENAME = 'dankquest-backup.json';
let _gdriveToken = null;

function _gdriveAuth(callback) {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GDRIVE_CLIENT_ID,
    scope: GDRIVE_SCOPE,
    callback: (response) => {
      if (response.error) { toast('⚠️ Google sign-in failed'); return; }
      _gdriveToken = response.access_token;
      callback();
    },
  });
  tokenClient.requestAccessToken();
}

async function _gdriveFindFile() {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name%3D'${GDRIVE_FILENAME}'+and+trashed%3Dfalse&fields=files(id)`,
    { headers: { Authorization: `Bearer ${_gdriveToken}` } }
  );
  const data = await res.json();
  return data.files && data.files.length > 0 ? data.files[0].id : null;
}

async function saveToGoogleDrive() {
  _gdriveAuth(async () => {
    try {
      const json = JSON.stringify(state, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const fileId = await _gdriveFindFile();

      if (fileId) {
        await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${_gdriveToken}`, 'Content-Type': 'application/json' },
          body: blob,
        });
      } else {
        const meta = { name: GDRIVE_FILENAME, mimeType: 'application/json' };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(meta)], { type: 'application/json' }));
        form.append('file', blob);
        await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: { Authorization: `Bearer ${_gdriveToken}` },
          body: form,
        });
      }
      toast('☁️ Saved to Google Drive!');
    } catch { toast('⚠️ Drive save failed'); }
  });
}

async function loadFromGoogleDrive() {
  _gdriveAuth(async () => {
    try {
      const fileId = await _gdriveFindFile();
      if (!fileId) { toast('⚠️ No backup found in Drive'); return; }
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${_gdriveToken}` },
      });
      const imported = await res.json();
      if (!imported.user || !imported.tasks) throw new Error('Invalid file');
      state = { ...state, ...imported };
      save();
      updateHeader();
      renderCurrentView();
      toast('☁️ Loaded from Google Drive!');
    } catch { toast('⚠️ Drive load failed'); }
  });
}

// ─── DATE UTILS ─────────────────────────────────────
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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

function pickRandom(pool, usedIds, count) {
  const available = pool.filter(m => !usedIds.includes(m.id));
  const chosen = [];
  const used = [];
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    const m = available.splice(idx, 1)[0];
    chosen.push({ ...m, progress: 0, completed: false });
    used.push(m.id);
  }
  return { chosen, used };
}

function generateDailyMissions(date) {
  // Check if yesterday's step count beats the record before resetting
  const prevSteps = state.dailyMissions ? (state.dailyMissions.stepsToday || 0) : 0;
  if (prevSteps > (state.user.bestDaySteps || 0)) {
    state.user.bestDaySteps = prevSteps;
  }
  const { chosen, used } = pickRandom(MISSION_POOL, [], 3);
  state.dailyMissions = {
    date,
    missions: chosen,
    usedIds: used,
    stepsToday: 0,
    tasksToday: 0,
    newTaskToday: 0,
    focusToday: 0,
  };
  save();
}

function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function checkWeeklyReset() {
  const ws = getWeekStart();
  if (!state.weeklyMissions || state.weeklyMissions.weekStart !== ws) {
    generateWeeklyMissions(ws);
  }
}

function generateWeeklyMissions(weekStart) {
  state.user.weeklyXpEarned = 0;
  const { chosen, used } = pickRandom(WEEKLY_MISSION_POOL, [], 3);
  state.weeklyMissions = {
    weekStart,
    missions: chosen,
    usedIds: used,
    stepsThisWeek: 0,
    tasksThisWeek: 0,
    newTaskThisWeek: 0,
    focusThisWeek: 0,
    activeDaysThisWeek: 0,
    activeDates: [],
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

function lvlIcon(lvl, extraClass = '') {
  return `<span class="level-icon tier-${lvl.tier}${extraClass ? ' ' + extraClass : ''}">${lvl.icon}</span>`;
}

// ─── XP AWARD ───────────────────────────────────────
function awardXP(amount, label) {
  const oldLevel = getLevel(state.user.xp).level;
  state.user.xp += amount;
  state.user.weeklyXpEarned = (state.user.weeklyXpEarned || 0) + amount;
  const newLevel = getLevel(state.user.xp).level;

  toast(`+${amount} XP${label ? ' — ' + label : ''} ✨`);
  updateHeader();
  save();

  if (newLevel > oldLevel) {
    setTimeout(() => showLevelUp(getLevel(state.user.xp)), 700);
  }
}

function showLevelUp(lvl) {
  document.getElementById('levelup-icon').innerHTML = lvlIcon(lvl, 'level-icon-xl');
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
  if (!state.user.allTimeActiveDates) state.user.allTimeActiveDates = [];
  if (!state.user.allTimeActiveDates.includes(t)) state.user.allTimeActiveDates.push(t);
  awardXP(50, 'Daily streak!');
  updateWeeklyMissions('activeDay');
  save();
}

// ─── MISSIONS ───────────────────────────────────────
function updateMissions(type) {
  if (!state.dailyMissions) return;
  const dm = state.dailyMissions;
  if (!dm.usedIds) dm.usedIds = dm.missions.map(m => m.id);

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

  for (const m of dm.missions) {
    if (!m.completed && m.type === type) {
      m.progress = Math.min(m.target, countMap[type]);
      if (m.progress >= m.target) {
        m.completed = true;
        state.user.totalMissionsCompleted = (state.user.totalMissionsCompleted || 0) + 1;
        setTimeout(() => awardXP(m.xp, m.title), 400);
        const { chosen, used } = pickRandom(MISSION_POOL, dm.usedIds, 1);
        if (chosen.length > 0) {
          const newM = chosen[0];
          newM.progress = Math.min(newM.target, countMap[newM.type] || 0);
          if (newM.progress >= newM.target) {
            newM.completed = true;
            state.user.totalMissionsCompleted = (state.user.totalMissionsCompleted || 0) + 1;
            setTimeout(() => awardXP(newM.xp, newM.title), 900);
          }
          dm.missions.push(newM);
          dm.usedIds.push(...used);
          setTimeout(() => toast('🎯 New daily mission unlocked!'), 700);
        }
      }
    }
  }

  const poolDone = dm.usedIds.length >= MISSION_POOL.length;
  if (poolDone && dm.missions.every(m => m.completed) && !dm.allDoneToasted) {
    dm.allDoneToasted = true;
    setTimeout(() => toast('🎊 All daily missions complete!'), 1000);
  }

  save();
}

function updateWeeklyMissions(type) {
  if (!state.weeklyMissions) return;
  const wm = state.weeklyMissions;
  if (!wm.usedIds) wm.usedIds = wm.missions.map(m => m.id);

  if (type === 'steps')     wm.stepsThisWeek   = (wm.stepsThisWeek   || 0) + 1;
  if (type === 'tasks')     wm.tasksThisWeek   = (wm.tasksThisWeek   || 0) + 1;
  if (type === 'newTask')   wm.newTaskThisWeek = (wm.newTaskThisWeek || 0) + 1;
  if (type === 'focus')     wm.focusThisWeek   = (wm.focusThisWeek   || 0) + 1;
  if (type === 'activeDay') {
    if (!wm.activeDates) wm.activeDates = [];
    const t = todayStr();
    if (!wm.activeDates.includes(t)) {
      wm.activeDates.push(t);
      wm.activeDaysThisWeek = wm.activeDates.length;
    }
  }

  const countMap = {
    steps:      wm.stepsThisWeek    || 0,
    tasks:      wm.tasksThisWeek    || 0,
    newTask:    wm.newTaskThisWeek  || 0,
    focus:      wm.focusThisWeek    || 0,
    activeDays: wm.activeDaysThisWeek || 0,
  };

  const matchType = type === 'activeDay' ? 'activeDays' : type;
  for (const m of wm.missions) {
    if (!m.completed && m.type === matchType) {
      m.progress = Math.min(m.target, countMap[matchType]);
      if (m.progress >= m.target) {
        m.completed = true;
        state.user.totalMissionsCompleted = (state.user.totalMissionsCompleted || 0) + 1;
        setTimeout(() => awardXP(m.xp, m.title), 400);
        const { chosen, used } = pickRandom(WEEKLY_MISSION_POOL, wm.usedIds, 1);
        if (chosen.length > 0) {
          const newM = chosen[0];
          newM.progress = Math.min(newM.target, countMap[newM.type] || 0);
          if (newM.progress >= newM.target) {
            newM.completed = true;
            state.user.totalMissionsCompleted = (state.user.totalMissionsCompleted || 0) + 1;
            setTimeout(() => awardXP(newM.xp, newM.title), 900);
          }
          wm.missions.push(newM);
          wm.usedIds.push(...used);
          setTimeout(() => toast('🗓️ New weekly mission unlocked!'), 700);
        }
      }
    }
  }

  const poolDone = wm.usedIds.length >= WEEKLY_MISSION_POOL.length;
  if (poolDone && wm.missions.every(m => m.completed) && !wm.allDoneToasted) {
    wm.allDoneToasted = true;
    setTimeout(() => toast('🏆 All weekly missions complete!'), 1000);
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
  updateWeeklyMissions('steps');

  const allDone = task.steps.length > 0 && task.steps.every(s => s.completed);
  if (allDone && !task.completedAt) {
    task.completedAt = new Date().toISOString();
    state.user.totalTasksCompleted++;
    const diff = DIFFICULTIES[task.difficulty] || DIFFICULTIES.quest;
    let bonusXP = diff.bonus;
    let lateMsg = '';
    if (task.deadline) {
      const daysLate = Math.floor((new Date(todayStr()) - new Date(task.deadline)) / 86400000);
      if (daysLate > 0) {
        const pct = daysLate <= 3 ? 0.75 : daysLate <= 7 ? 0.5 : 0.25;
        bonusXP = Math.max(1, Math.round(diff.bonus * pct));
        lateMsg = ` (−${diff.bonus - bonusXP} XP late penalty)`;
      }
    }
    setTimeout(() => awardXP(bonusXP, '⚔️ Quest complete!'), 500);
    updateMissions('tasks');
    updateWeeklyMissions('tasks');
    setTimeout(() => toast(`🎉 Quest Complete! Bonus XP incoming...${lateMsg}`), 200);
  }

  save();
  renderCurrentView();
}

// Shift all other tasks with priority >= p up by 1, excluding excludeId
function shiftPriorities(p, excludeId) {
  if (p == null) return;
  state.tasks.forEach(t => {
    if (t.id !== excludeId && t.priority != null && t.priority >= p) {
      t.priority += 1;
    }
  });
}

function sortedByPriority(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.priority == null && b.priority == null) return 0;
    if (a.priority == null) return 1;
    if (b.priority == null) return -1;
    return a.priority - b.priority;
  });
}

function applySortToActive(tasks) {
  const arr = [...tasks];
  const d = state.questSortDir === 'desc' ? -1 : 1;
  switch (state.questSort) {
    case 'priority':
      return arr.sort((a, b) => {
        if (a.priority == null && b.priority == null) return 0;
        if (a.priority == null) return 1;
        if (b.priority == null) return -1;
        return (a.priority - b.priority) * d;
      });
    case 'alpha':
      return arr.sort((a, b) => a.title.localeCompare(b.title) * d);
    case 'steps':
      return arr.sort((a, b) => (a.steps.length - b.steps.length) * d);
    case 'deadline':
      return arr.sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline) * d;
      });
    case 'created':
    default:
      return arr.sort((a, b) => {
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return a.createdAt.localeCompare(b.createdAt) * d;
      });
  }
}

function setQuestSort(key) {
  if (state.questSort === key) {
    state.questSortDir = state.questSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    const opt = SORT_OPTIONS.find(o => o.key === key);
    state.questSort    = key;
    state.questSortDir = opt ? opt.defaultDir : 'asc';
  }
  save();
  renderCurrentView();
}

function getActiveStep() {
  for (const task of sortedByPriority(state.tasks)) {
    if (task.completedAt) continue;
    const step = task.steps.find(s => !s.completed);
    if (step) return { task, step };
  }
  return null;
}

// ─── REEL ────────────────────────────────────────────
let reelTimer = null;
let reelIdx   = 0;

function startReel() {
  if (reelTimer) clearInterval(reelTimer);
  reelIdx = 0;
  reelTimer = setInterval(advanceReel, 3200);
}

function stopReel() {
  if (reelTimer) { clearInterval(reelTimer); reelTimer = null; }
}

function advanceReel() {
  const slides = document.querySelectorAll('.reel-slide');
  const dots   = document.querySelectorAll('.reel-dot');
  if (!slides.length) { stopReel(); return; }
  slides[reelIdx].classList.remove('active');
  dots[reelIdx].classList.remove('active');
  reelIdx = (reelIdx + 1) % slides.length;
  slides[reelIdx].classList.add('active');
  dots[reelIdx].classList.add('active');
}

// ─── VIEWS ──────────────────────────────────────────
function showView(name) {
  stopReel();
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
  renderSidePanel();
}

// ─── MISSION RENDER HELPER ───────────────────────────
function renderMissionList(missions, weekly = false) {
  return missions.map(m => {
    const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
    return `
      <div class="mission-item${m.completed ? ' completed' : ''}">
        <div class="mission-icon ${m.completed ? 'done' : 'pending'}">${m.completed ? '✅' : (weekly ? '🗓️' : '🎯')}</div>
        <div class="mission-info">
          <div class="mission-title">${escHtml(m.title)}</div>
          <div class="mission-desc">${escHtml(m.desc)}</div>
          ${!m.completed ? `
            <div class="mission-progress-bar">
              <div class="mission-progress-fill${weekly ? ' weekly' : ''}" style="width:${pct}%"></div>
            </div>
          ` : ''}
        </div>
        <div class="mission-xp">${m.completed ? '✓' : '+' + m.xp + ' XP'}</div>
      </div>
    `;
  }).join('');
}

// ─── TODAY VIEW ──────────────────────────────────────
function renderToday() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const active = getActiveStep();
  const dm = state.dailyMissions;

  const lvl      = getLevel(state.user.xp);
  const next     = getNextLevel(state.user.xp);
  const xpInLvl  = state.user.xp - lvl.xp;
  const xpNeeded = next ? next.xp - lvl.xp : 1;
  const xpPct    = next ? Math.min(100, Math.round((xpInLvl / xpNeeded) * 100)) : 100;
  const stepsToday = state.tasks.flatMap(t => t.steps)
    .filter(s => s.completedAt && s.completedAt.startsWith(todayStr())).length;
  const questsDone = state.tasks.filter(t => t.completedAt).length;

  const reelSlides = [
    {
      icon: '<span class="flame-anim">🔥</span>',
      value: state.user.streak || 0,
      unit: (state.user.streak === 1 ? 'day' : 'days') + ' streak',
      detail: `Best: ${state.user.longestStreak || 0} days`,
    },
    {
      icon: lvlIcon(lvl, 'level-icon-reel'),
      value: lvl.title,
      unit: `Level ${lvl.level}`,
      detail: next
        ? `${xpInLvl.toLocaleString()} / ${xpNeeded.toLocaleString()} XP → ${next.title}`
        : 'MAX LEVEL 👑',
      bar: xpPct,
    },
    {
      icon: '✅',
      value: stepsToday,
      unit: stepsToday === 1 ? 'step today' : 'steps today',
      detail: `${state.user.totalStepsCompleted || 0} total all-time`,
    },
    {
      icon: '🏆',
      value: questsDone,
      unit: questsDone === 1 ? 'quest done' : 'quests done',
      detail: `${state.user.xp.toLocaleString()} XP earned`,
    },
  ];

  const reelHtml = `
    <div class="progress-reel">
      ${reelSlides.map((s, i) => `
        <div class="reel-slide${i === 0 ? ' active' : ''}">
          <div class="reel-icon-wrap">${s.icon}</div>
          <div class="reel-content">
            <div class="reel-top">
              <span class="reel-value">${s.value}</span>
              <span class="reel-unit">${s.unit}</span>
            </div>
            <div class="reel-detail">${s.detail}</div>
            ${s.bar !== undefined ? `
              <div class="reel-bar-track">
                <div class="reel-bar-fill" style="width:${s.bar}%"></div>
              </div>` : ''}
          </div>
        </div>
      `).join('')}
      <div class="reel-dots">
        ${reelSlides.map((_, i) => `<span class="reel-dot${i === 0 ? ' active' : ''}"></span>`).join('')}
      </div>
    </div>
  `;

  let html = `
    <div class="greeting">${greeting} ⚔️</div>
    <div class="greeting-sub">${active ? 'Your next step is waiting.' : 'Looking strong — add a new quest!'}</div>
    ${reelHtml}

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

  const activeTasks = sortedByPriority(state.tasks.filter(t => !t.completedAt));
  if (activeTasks.length > 0) {
    html += `
      <div class="section-header" style="margin-top:20px">
        <div class="section-title">Quest Queue</div>
      </div>
    `;
    activeTasks.forEach(t => {
      const doneCount = t.steps.filter(s => s.completed).length;
      const total = t.steps.length;
      const isActive = active && active.task.id === t.id;
      let deadlineMeta = '';
      if (t.deadline) {
        const daysLeft = Math.round((new Date(t.deadline) - new Date(todayStr())) / 86400000);
        const cls = daysLeft < 0 ? 'deadline-overdue' : daysLeft <= 3 ? 'deadline-soon' : 'deadline-ok';
        const label = daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'due today' : `${daysLeft}d left`;
        deadlineMeta = ` • <span class="${cls}" style="font-weight:600">📅 ${label}</span>`;
      }
      html += `
        <div class="today-quest-row${isActive ? ' today-quest-active' : ''}">
          <div class="priority-badge${t.priority == null ? ' no-priority' : ''}">${t.priority != null ? '#' + t.priority : '—'}</div>
          <div class="today-quest-info">
            <div class="today-quest-title">${escHtml(t.title)}</div>
            <div class="today-quest-meta">${doneCount}/${total} steps${deadlineMeta}</div>
          </div>
          ${isActive ? '<div class="today-quest-arrow">▶ Up Next</div>' : ''}
        </div>
      `;
    });
  }

  if (dm) {
    html += `<div class="card" style="margin-top:20px"><div class="card-title">Daily Missions</div>`;
    html += renderMissionList(dm.missions);
    html += `</div>`;
  }

  const wm = state.weeklyMissions;
  if (wm) {
    const daysLeft = 7 - ((new Date().getDay() + 6) % 7);
    html += `<div class="card" style="margin-top:12px"><div class="card-title">Weekly Missions <span style="font-size:11px;color:var(--text3);font-weight:400">${daysLeft}d left</span></div>`;
    html += renderMissionList(wm.missions, true);
    html += `</div>`;
  }

  document.getElementById('view').innerHTML = html;
  startReel();
}

// ─── QUESTS VIEW ─────────────────────────────────────
const SORT_OPTIONS = [
  { key: 'created',  label: '🕐 Date',      defaultDir: 'desc' },
  { key: 'priority', label: '# Priority',   defaultDir: 'asc'  },
  { key: 'deadline', label: '📅 Deadline',  defaultDir: 'asc'  },
  { key: 'alpha',    label: 'A–Z',          defaultDir: 'asc'  },
  { key: 'steps',    label: '📋 Steps',     defaultDir: 'desc' },
];

function renderQuests() {
  const active = applySortToActive(state.tasks.filter(t => !t.completedAt));
  const done   = state.tasks.filter(t =>  t.completedAt);

  const sortPills = SORT_OPTIONS.map(o => {
    const isActive = state.questSort === o.key;
    const arrow = isActive ? (state.questSortDir === 'asc' ? ' ↑' : ' ↓') : '';
    return `<button class="sort-pill${isActive ? ' active' : ''}" onclick="setQuestSort('${o.key}')">${o.label}${arrow}</button>`;
  }).join('');

  let html = `
    <div class="section-header">
      <div class="section-title">Active Quests</div>
      <button class="btn-add" onclick="openAddQuest()">+ New Quest</button>
    </div>
    <div class="sort-bar">${sortPills}</div>
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
          <span class="drag-handle" onpointerdown="questStepPointerDown(event,'${task.id}')" title="Drag to reorder">⠿</span>
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

  const dupBtn = `<button class="quest-edit-btn quest-dup-btn" title="Duplicate quest" onclick="event.stopPropagation(); duplicateQuest('${task.id}')">⧉</button>`;

  const deadlineBadge = (() => {
    if (!task.deadline) return '';
    const today = todayStr();
    const daysLeft = Math.round((new Date(task.deadline) - new Date(today)) / 86400000);
    const cls = daysLeft < 0 ? 'deadline-overdue' : daysLeft <= 3 ? 'deadline-soon' : 'deadline-ok';
    const label = daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'due today' : `${daysLeft}d left`;
    return `<span class="deadline-badge ${cls}">📅 ${label}</span>`;
  })();

  const createdLabel = (() => {
    if (!task.createdAt) return '';
    const d = new Date(task.createdAt);
    const date = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    return `${date} · ${time}`;
  })();

  return `
    <div class="quest-card${task.completedAt ? ' completed' : ''}">
      <div class="quest-header" onclick="toggleQuestExpand('${task.id}')">
        <div class="quest-diff">${diff.icon}</div>
        <div class="quest-info">
          <div class="quest-title">${escHtml(task.title)}</div>
          <div class="quest-meta">
            ${task.priority != null ? `<span class="priority-badge-inline">#${task.priority}</span>` : ''}
            ${diff.label} • ${doneCount}/${total} steps
            ${deadlineBadge}
          </div>
          ${createdLabel ? `<div class="quest-created">${createdLabel}</div>` : ''}
        </div>
        ${editBtn}
        ${dupBtn}
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
    const taskWasCompleted = !!task.completedAt;
    let xpLost = XP_PER_STEP;

    step.completed = false;
    step.completedAt = null;
    state.user.totalStepsCompleted = Math.max(0, state.user.totalStepsCompleted - 1);

    if (taskWasCompleted) {
      task.completedAt = null;
      state.user.totalTasksCompleted = Math.max(0, state.user.totalTasksCompleted - 1);
      const diff = DIFFICULTIES[task.difficulty] || DIFFICULTIES.quest;
      xpLost += diff.bonus;
      if (state.dailyMissions) {
        state.dailyMissions.tasksToday = Math.max(0, (state.dailyMissions.tasksToday || 0) - 1);
      }
      if (state.weeklyMissions) {
        state.weeklyMissions.tasksThisWeek = Math.max(0, (state.weeklyMissions.tasksThisWeek || 0) - 1);
      }
    }

    if (state.dailyMissions) {
      state.dailyMissions.stepsToday = Math.max(0, (state.dailyMissions.stepsToday || 0) - 1);
    }
    if (state.weeklyMissions) {
      state.weeklyMissions.stepsThisWeek = Math.max(0, (state.weeklyMissions.stepsThisWeek || 0) - 1);
    }

    state.user.xp = Math.max(0, state.user.xp - xpLost);
    toast(`-${xpLost} XP — step reverted`);
    updateHeader();
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
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

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
      <div class="stats-level-icon">${lvlIcon(lvl, 'level-icon-lg')}</div>
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
        <div class="stat-value">🏆 ${state.user.longestStreak}</div>
        <div class="stat-label">Best Streak</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--green)">✅ ${state.user.totalTasksCompleted}</div>
        <div class="stat-label">Quests Done</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--purple-light)">👣 ${state.user.totalStepsCompleted}</div>
        <div class="stat-label">Steps Taken</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--gold)">🎯 ${state.user.totalFocusSessions || 0}</div>
        <div class="stat-label">Focus Sessions</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--purple-light)">⚔️ ${state.user.totalMissionsCompleted || 0}</div>
        <div class="stat-label">Missions Done</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--orange)">🚀 ${state.user.bestDaySteps || 0}</div>
        <div class="stat-label">Best Day Steps</div>
      </div>
      <div class="stat-box">
        <div class="stat-value" style="color:var(--green)">📅 ${(state.user.allTimeActiveDates || []).length}</div>
        <div class="stat-label">Total Active Days</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">This Week's XP</div>
      <div style="font-size:36px;font-weight:900;color:var(--gold);text-align:center;padding:8px 0;">${(state.user.weeklyXpEarned || 0).toLocaleString()} <span style="font-size:16px;color:var(--text2);font-weight:600">XP</span></div>
      <div style="font-size:12px;color:var(--text2);text-align:center;">Resets every Monday</div>
    </div>

    <div class="card">
      <div class="card-title">Quest Breakdown</div>
      ${(() => {
        const allTasks = state.tasks;
        const done = allTasks.filter(t => t.completedAt).length;
        const inProg = allTasks.filter(t => !t.completedAt && t.steps.some(s => s.completed)).length;
        const notStarted = allTasks.filter(t => !t.completedAt && !t.steps.some(s => s.completed)).length;
        const total = allTasks.length;
        if (total === 0) return '<div style="text-align:center;color:var(--text3);font-size:13px;padding:12px 0;">No quests yet</div>';
        const donePct = Math.round((done / total) * 100);
        const inProgPct = Math.round((inProg / total) * 100);
        const notStartedPct = 100 - donePct - inProgPct;
        return `
          <div class="quest-breakdown-bar">
            ${donePct > 0 ? `<div class="qb-seg qb-done" style="width:${donePct}%"></div>` : ''}
            ${inProgPct > 0 ? `<div class="qb-seg qb-inprog" style="width:${inProgPct}%"></div>` : ''}
            ${notStartedPct > 0 ? `<div class="qb-seg qb-none" style="width:${notStartedPct}%"></div>` : ''}
          </div>
          <div class="quest-breakdown-legend">
            <div class="qb-legend-item"><span class="qb-dot qb-done"></span><span>${done} Done</span></div>
            <div class="qb-legend-item"><span class="qb-dot qb-inprog"></span><span>${inProg} In Progress</span></div>
            <div class="qb-legend-item"><span class="qb-dot qb-none"></span><span>${notStarted} Not Started</span></div>
          </div>
        `;
      })()}
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
      <div class="export-row" style="margin-top:8px;">
        <button class="btn-export" onclick="saveToGoogleDrive()">☁️ Save to Drive</button>
        <button class="btn-export" onclick="loadFromGoogleDrive()">☁️ Load from Drive</button>
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

  state.user.totalFocusSessions = (state.user.totalFocusSessions || 0) + 1;
  updateMissions('focus');
  updateWeeklyMissions('focus');
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

// ─── DRAG STATE ──────────────────────────────────────
let _pd = null;

function _pdCleanup() {
  if (!_pd) return;
  _pd.clone.remove();
  _pd.indicator.remove();
  _pd.origEl.style.opacity = '';
  document.removeEventListener('pointermove', _pdMove);
  document.removeEventListener('pointerup', _pdEnd);
  document.removeEventListener('pointercancel', _pdCleanup);
  _pd = null;
}

function _pdRows() {
  const sel = _pd.context === 'quest' ? '.step-row' : '.step-input-row';
  return Array.from(_pd.container.querySelectorAll(sel));
}

function _pdInsertIdx(rows, y) {
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i].getBoundingClientRect();
    if (y < r.top + r.height / 2) return i;
  }
  return rows.length;
}

function _pdInit(e, context, taskId) {
  e.preventDefault();
  const rowSel = context === 'quest' ? '.step-row' : '.step-input-row';
  const row = e.currentTarget.closest(rowSel);
  if (!row) return;

  const rect = row.getBoundingClientRect();

  const clone = row.cloneNode(true);
  clone.style.cssText = [
    'position:fixed',
    `left:${rect.left}px`,
    `top:${rect.top}px`,
    `width:${rect.width}px`,
    'z-index:9999',
    'pointer-events:none',
    'box-shadow:0 16px 48px rgba(0,0,0,0.7),0 0 0 2px var(--purple-light)',
    'border-radius:10px',
    'background:var(--card2)',
    'transform:scale(1.03) rotate(-0.8deg)',
    'opacity:0.97',
    'will-change:left,top',
  ].join(';');
  document.body.appendChild(clone);

  row.style.opacity = '0.2';

  const indicator = document.createElement('div');
  indicator.style.cssText = [
    'position:fixed',
    `width:${rect.width}px`,
    `left:${rect.left}px`,
    'height:3px',
    'background:var(--purple-light)',
    'z-index:9998',
    'pointer-events:none',
    'border-radius:3px',
    'box-shadow:0 0 12px var(--purple-light)',
    'display:none',
  ].join(';');
  document.body.appendChild(indicator);

  _pd = {
    context, taskId,
    origEl: row,
    container: row.parentElement,
    clone, indicator,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top,
    targetIdx: null,
  };

  document.addEventListener('pointermove', _pdMove, { passive: false });
  document.addEventListener('pointerup', _pdEnd);
  document.addEventListener('pointercancel', _pdCleanup);
}

function _pdMove(e) {
  if (!_pd) return;
  e.preventDefault();
  _pd.clone.style.left = (e.clientX - _pd.offsetX) + 'px';
  _pd.clone.style.top  = (e.clientY - _pd.offsetY) + 'px';

  const rows = _pdRows();
  const idx = _pdInsertIdx(rows, e.clientY);
  _pd.targetIdx = idx;

  const refRow = idx < rows.length ? rows[idx] : rows[rows.length - 1];
  if (refRow) {
    const r = refRow.getBoundingClientRect();
    _pd.indicator.style.top = ((idx < rows.length ? r.top : r.bottom) - 1) + 'px';
    _pd.indicator.style.display = 'block';
  }
}

function _pdEnd() {
  if (!_pd) return;
  const { context, taskId, origEl, targetIdx } = _pd;
  const rows = _pdRows();
  const fromIdx = rows.indexOf(origEl);
  _pdCleanup();

  if (fromIdx === -1 || targetIdx === null) return;
  const toIdx = targetIdx > fromIdx ? targetIdx - 1 : targetIdx;
  if (toIdx === fromIdx) return;

  if (context === 'quest') {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;
    const [moved] = task.steps.splice(fromIdx, 1);
    task.steps.splice(toIdx, 0, moved);
    task.steps.forEach((s, i) => { s.isStarter = i === 0; });
    save();
    renderCurrentView();
  } else {
    syncModalSteps();
    const [moved] = newQ.steps.splice(fromIdx, 1);
    newQ.steps.splice(toIdx, 0, moved);
    renderModal();
  }
}

function questStepPointerDown(e, taskId) {
  _pdInit(e, 'quest', taskId);
}

function modalStepPointerDown(e) {
  _pdInit(e, 'modal', null);
}

// ─── MODAL STATE ─────────────────────────────────────
let modalMode = 'add'; // 'add' | 'edit' | 'bulk'
let editingTaskId = null;
let newQ = { title: '', difficulty: 'quest', steps: [''] };

// ─── ADD / EDIT QUEST MODAL ──────────────────────────
function openAddQuest() {
  modalMode = 'add';
  editingTaskId = null;
  newQ = { title: '', difficulty: 'quest', steps: ['', ''], priority: null, deadline: '' };
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
    priority: task.priority != null ? task.priority : null,
    deadline: task.deadline || '',
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
      <span class="drag-handle" onpointerdown="modalStepPointerDown(event)" title="Drag to reorder">⠿</span>
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

    <div class="modal-row-2">
      <div class="form-group">
        <label class="form-label">Priority # <span style="color:var(--text3);font-weight:400">(optional)</span></label>
        <input
          id="q-priority"
          class="form-input priority-input"
          type="number"
          min="1"
          max="99"
          placeholder="1, 2, 3…"
          value="${newQ.priority != null ? newQ.priority : ''}"
          oninput="newQ.priority = this.value !== '' ? parseInt(this.value) : null"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Deadline <span style="color:var(--text3);font-weight:400">(optional)</span></label>
        <input
          id="q-deadline"
          class="form-input deadline-input"
          type="date"
          value="${newQ.deadline || ''}"
          oninput="newQ.deadline = this.value"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Steps <span style="color:var(--text3);font-weight:400">(min 2)</span></label>
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
  const priorityEl = document.getElementById('q-priority');
  if (priorityEl) newQ.priority = priorityEl.value !== '' ? parseInt(priorityEl.value) : null;
  const deadlineEl = document.getElementById('q-deadline');
  if (deadlineEl) newQ.deadline = deadlineEl.value;
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
  if (validSteps.length < 2) { toast('⚠️ Add at least 2 steps!'); return; }

  const task = {
    id: uid(),
    title: newQ.title.trim(),
    difficulty: newQ.difficulty,
    priority: newQ.priority != null ? newQ.priority : null,
    deadline: newQ.deadline || null,
    createdAt: new Date().toISOString(),
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

  shiftPriorities(task.priority, task.id);
  state.tasks.unshift(task);
  updateMissions('newTask');
  updateWeeklyMissions('newTask');
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
  const newPriority = newQ.priority != null ? newQ.priority : null;
  if (newPriority !== task.priority) shiftPriorities(newPriority, task.id);
  task.priority = newPriority;
  task.deadline = newQ.deadline || null;

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

function duplicateQuest(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  const copy = {
    id: uid(),
    title: task.title + ' (copy)',
    difficulty: task.difficulty,
    priority: task.priority != null ? task.priority : null,
    deadline: task.deadline || null,
    createdAt: new Date().toISOString(),
    completedAt: null,
    _expanded: false,
    steps: task.steps.map((s, i) => ({
      id: uid(),
      text: s.text,
      isStarter: i === 0,
      completed: false,
      completedAt: null,
    })),
  };

  shiftPriorities(copy.priority, copy.id);
  state.tasks.unshift(copy);
  updateMissions('newTask');
  updateWeeklyMissions('newTask');
  save();
  toast('📋 Quest duplicated!');
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
      createdAt: new Date().toISOString(),
      completedAt: null,
      _expanded: false,
      steps: [],
    });
  });

  updateMissions('newTask');
  updateWeeklyMissions('newTask');
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
    createdAt: new Date().toISOString(),
    completedAt: null,
    _expanded: false,
    steps: [],
  });

  updateMissions('newTask');
  updateWeeklyMissions('newTask');
  save();
  input.value = '';
  toast('⚔️ Quest added!');
  renderCurrentView();
}

function handleQuickAddKey(e) {
  if (e.key === 'Enter') quickAddQuest();
}

// ─── SIDE PANEL ──────────────────────────────────────
function openQuestInPanel(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) task._expanded = true;
  showView('quests');
}

function renderSidePanel() {
  const panel = document.getElementById('side-panel');
  if (!panel) return;

  if (state.currentView === 'quests') {
    const dm = state.dailyMissions;
    const wm = state.weeklyMissions;
    let html = '';

    const renderSideMissions = (missions, weekly = false) => missions.map(m => {
      const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
      return `
        <div class="side-quest-card" style="cursor:default">
          <div class="side-quest-header">
            <span>${m.completed ? '✅' : (weekly ? '🗓️' : '🎯')}</span>
            <span class="side-quest-title">${escHtml(m.title)}</span>
            <span style="font-size:11px;color:var(--gold);font-weight:700;white-space:nowrap">${m.completed ? '✓' : '+' + m.xp + ' XP'}</span>
          </div>
          ${!m.completed ? `<div class="mission-progress-bar" style="margin-top:6px"><div class="mission-progress-fill${weekly ? ' weekly' : ''}" style="width:${pct}%"></div></div>` : ''}
          <div class="side-quest-meta">${escHtml(m.desc)}</div>
        </div>
      `;
    }).join('');

    if (dm) {
      html += '<div class="side-panel-title">Daily Missions</div>';
      html += renderSideMissions(dm.missions);
    }
    if (wm) {
      const daysLeft = 7 - ((new Date().getDay() + 6) % 7);
      html += `<div class="side-panel-title" style="margin-top:14px">Weekly Missions <span style="font-size:11px;color:var(--text3);font-weight:400">${daysLeft}d left</span></div>`;
      html += renderSideMissions(wm.missions, true);
    }

    panel.innerHTML = html || '';
    return;
  }

  const active = state.tasks.filter(t => !t.completedAt);
  if (active.length === 0) {
    panel.innerHTML = `
      <div class="side-panel-title">Active Quests</div>
      <div class="side-panel-empty">No active quests yet.<br>Add one to get started!</div>
    `;
    return;
  }

  let html = '<div class="side-panel-title">Active Quests</div>';
  active.forEach(t => {
    const diff = DIFFICULTIES[t.difficulty] || DIFFICULTIES.quest;
    const done = t.steps.filter(s => s.completed).length;
    const total = t.steps.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    html += `
      <div class="side-quest-card" onclick="openQuestInPanel('${t.id}')">
        <div class="side-quest-header">
          <span>${diff.icon}</span>
          <span class="side-quest-title">${escHtml(t.title)}</span>
        </div>
        <div class="progress-bar" style="height:4px;margin-top:6px">
          <div class="progress-fill ${diff.fill}" style="width:${pct}%"></div>
        </div>
        <div class="side-quest-meta">${done}/${total} steps • ${diff.label}</div>
      </div>
    `;
  });
  panel.innerHTML = html;
}

// ─── HEADER ──────────────────────────────────────────
function updateHeader() {
  const lvl  = getLevel(state.user.xp);
  const next = getNextLevel(state.user.xp);
  const pct  = xpPercent(state.user.xp);

  document.getElementById('streak-num').textContent = state.user.streak;
  document.getElementById('level-pill').innerHTML = `${lvlIcon(lvl)} Lvl ${lvl.level} · ${lvl.title}`;
  document.getElementById('xp-fill').style.width = pct + '%';

  const xpHtml = next
    ? `${state.user.xp.toLocaleString()} / ${next.xp.toLocaleString()} XP &bull; ${lvlIcon(lvl)} ${lvl.title}`
    : `${state.user.xp.toLocaleString()} XP &bull; ${lvlIcon(lvl)} ${lvl.title} 👑`;
  document.getElementById('xp-text').innerHTML = xpHtml;
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
