// ════════════════════════════════════════════════════
//  DankQuest — translations.js
// ════════════════════════════════════════════════════

let _lang = localStorage.getItem('dankquest_lang') || 'en';

function getLang() { return _lang; }

function setLang(lang) {
  _lang = lang;
  localStorage.setItem('dankquest_lang', lang);
  document.documentElement.lang = lang;
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang.toUpperCase();
  _applyStaticTranslations();
  updateHeader();
  renderCurrentView();
}

function toggleLang() {
  setLang(_lang === 'en' ? 'es' : 'en');
}

function t(key) {
  return (TRANSLATIONS[_lang] && TRANSLATIONS[_lang][key]) || TRANSLATIONS['en'][key] || key;
}

function tLevel(levelNum) {
  return t('level_' + levelNum);
}

function tDiff(key) {
  return t('diff_' + key + '_label');
}

function tMission(id, field, weekly) {
  const prefix = weekly ? 'wmission_' : 'mission_';
  const val = (TRANSLATIONS[_lang] && TRANSLATIONS[_lang][prefix + id + '_' + field])
            || TRANSLATIONS['en'][prefix + id + '_' + field];
  return val || null;
}

function _applyStaticTranslations() {
  const set = (sel, key) => { const el = document.querySelector(sel); if (el) el.textContent = t(key); };
  set('[data-v="today"] span:last-child',  'nav_today');
  set('[data-v="quests"] span:last-child', 'nav_quests');
  set('[data-v="stats"] span:last-child',  'nav_stats');
  set('.focus-label',                      'focus_label');
  set('.focus-done-btn',                   'focus_done_btn');
  set('.focus-exit-btn',                   'focus_exit_btn');
  set('.uncheck-title',                    'uncheck_title');
  set('.uncheck-actions .btn-cancel',      'uncheck_cancel_btn');
  set('.btn-uncheck-confirm',              'uncheck_confirm_btn');
  set('.leveldown-title',                  'leveldown_title');
  set('.leveldown-inner > button',         'leveldown_btn');
  set('.levelup-title',                    'levelup_title');
  set('.levelup-inner > button',           'levelup_btn');
}

const TRANSLATIONS = {
  en: {
    // Nav
    nav_today: 'Today',
    nav_quests: 'Quests',
    nav_stats: 'Stats',

    // Focus overlay
    focus_label: '⚔️ FOCUS MODE',
    focus_done_btn: '✓ Done — Next Step',
    focus_exit_btn: 'Exit Focus',

    // Uncheck dialog
    uncheck_title: '⚠️ Uncheck Step?',
    uncheck_cancel_btn: 'Cancel',
    uncheck_confirm_btn: 'Lose the XP',
    uncheck_lose_xp: 'You will lose',
    uncheck_reopen: 'This will also re-open the quest',
    uncheck_reopen_suffix: 'and remove its completion bonus.',

    // Level down/up overlays
    leveldown_title: 'LEVEL DOWN',
    leveldown_btn: 'Face the Shame',
    levelup_title: 'LEVEL UP!',
    levelup_btn: 'Continue Quest',
    levelup_sub: 'You are now a',
    leveldown_sub: 'You fell back to',

    // Greetings
    greeting_morning: 'Good morning',
    greeting_afternoon: 'Good afternoon',
    greeting_evening: 'Good evening',

    // Today view
    today_next_waiting: 'Your next step is waiting.',
    today_add_quest_prompt: 'Looking strong — add a new quest!',
    today_active_step_label: '⚡ Your Next Step',
    today_starter_badge: '⭐ Starter Step — under 2 min',
    today_btn_done: '✓ Done',
    today_btn_focus: '🎯 Focus',
    today_empty_title: 'No active quests',
    today_empty_sub: 'Add a quest and break it down into tiny steps so you always know exactly what to do next.',
    today_btn_add: '+ Add a Quest',
    today_quest_queue: 'Quest Queue',
    today_quick_add_placeholder: 'Quick add a quest...',
    today_up_next: '▶ Up Next',

    // Reel
    reel_day: 'day',
    reel_days: 'days',
    reel_streak_suffix: 'streak',
    reel_best: 'Best',
    reel_step_today: 'step today',
    reel_steps_today: 'steps today',
    reel_all_time: 'total all-time',
    reel_quest_done: 'quest done',
    reel_quests_done: 'quests done',
    reel_xp_earned: 'XP earned',
    reel_max_level: 'MAX LEVEL 👑',

    // Deadline labels
    deadline_overdue: 'd overdue',
    deadline_today: 'due today',
    deadline_left: 'd left',

    // Missions
    daily_missions: 'Daily Missions',
    weekly_missions: 'Weekly Missions',
    weekly_days_left: 'd left',
    missions_new_daily: '🎯 New daily mission unlocked!',
    missions_all_daily: '🎊 All daily missions complete!',
    missions_new_weekly: '🗓️ New weekly mission unlocked!',
    missions_all_weekly: '🏆 All weekly missions complete!',

    // Quests view
    quests_active_title: 'Active Quests',
    quests_btn_new: '+ New Quest',
    quests_empty_title: 'No quests yet',
    quests_empty_sub: 'Each quest is a goal broken into small enough steps that starting feels effortless.',
    quests_btn_first: '+ Add Your First Quest',
    quests_completed_toggle: 'Completed Quests',
    quests_no_steps: 'No steps yet — add one below',
    quests_add_step_placeholder: 'Add a step...',
    quests_starter_badge: 'STARTER',
    quests_steps_label: 'steps',

    // Sort options
    sort_date: '🕐 Date',
    sort_priority: '# Priority',
    sort_deadline: '📅 Deadline',
    sort_alpha: 'A–Z',
    sort_steps: '📋 Steps',

    // Modal
    modal_title_new: 'New Quest ⚔️',
    modal_title_edit: 'Edit Quest ✏️',
    modal_sub_new: 'Name it now, break it down later.',
    modal_sub_edit: 'Update your quest details.',
    modal_tab_single: 'Single Quest',
    modal_tab_bulk: 'Bulk Add',
    modal_label_name: 'Quest Name',
    modal_placeholder_name: 'What do you need to accomplish?',
    modal_label_difficulty: 'Difficulty',
    modal_label_priority: 'Priority #',
    modal_optional: '(optional)',
    modal_label_deadline: 'Deadline',
    modal_label_steps: 'Steps',
    modal_label_steps_hint: '(min 2)',
    modal_btn_add_step: '+ Add another step',
    modal_btn_cancel: 'Cancel',
    modal_btn_save: 'Save Quest ⚔️',
    modal_btn_save_edit: 'Save Changes ✓',
    modal_step_placeholder_first: 'Easiest possible first action...',
    modal_step_placeholder_next: 'Next step...',
    modal_step_hint: "⭐ Make this so easy you can't say no (under 2 min)",

    // Bulk modal
    bulk_title: 'Bulk Add Quests ⚔️',
    bulk_sub: 'One quest per line. Add steps to each one later.',
    bulk_label: 'Quest Names',
    bulk_btn: 'Add All Quests ⚔️',

    // Toast messages
    toast_backup_downloaded: '📁 Backup downloaded!',
    toast_data_imported: '✅ Data imported!',
    toast_invalid_backup: '⚠️ Invalid backup file',
    toast_google_fail: '⚠️ Google sign-in failed',
    toast_drive_saved: '☁️ Saved to Google Drive!',
    toast_drive_save_fail: '⚠️ Drive save failed',
    toast_drive_no_backup: '⚠️ No backup found in Drive',
    toast_drive_loaded: '☁️ Loaded from Google Drive!',
    toast_drive_load_fail: '⚠️ Drive load failed',
    toast_quest_added: '⚔️ Quest added!',
    toast_quest_updated: '✓ Quest updated!',
    toast_quest_duplicated: '📋 Quest duplicated!',
    toast_give_name: '⚠️ Give your quest a name!',
    toast_add_steps: '⚠️ Add at least 2 steps!',
    toast_enter_quest: '⚠️ Enter at least one quest name!',
    toast_quest_complete: '🎉 Quest Complete! Bonus XP incoming...',
    toast_daily_streak: 'Daily streak!',
    toast_step_done: 'Step done',
    toast_quest_complete_label: '⚔️ Quest complete!',
    toast_step_reverted: 'step reverted',
    toast_quests_added_one: '⚔️ 1 quest added!',
    toast_quests_added_many: '⚔️ {n} quests added!',

    // Quest duplicate suffix
    quest_copy_suffix: ' (copy)',

    // Stats view
    stats_xp_total: 'XP total',
    stats_xp_to: 'XP to',
    stats_max_level: 'MAX LEVEL 👑',
    stats_day_streak: 'Day Streak',
    stats_best_streak: 'Best Streak',
    stats_quests_done: 'Quests Done',
    stats_steps_taken: 'Steps Taken',
    stats_focus_sessions: 'Focus Sessions',
    stats_missions_done: 'Missions Done',
    stats_best_day: 'Best Day Steps',
    stats_active_days: 'Total Active Days',
    stats_weekly_xp: "This Week's XP",
    stats_weekly_reset: 'Resets every Monday',
    stats_quest_breakdown: 'Quest Breakdown',
    stats_no_quests: 'No quests yet',
    stats_done: 'Done',
    stats_in_progress: 'In Progress',
    stats_not_started: 'Not Started',
    stats_last_7_days: 'Last 7 Days',
    stats_level_progress: 'Level Progress',
    stats_level_max: 'MAX ✓',
    stats_accomplishments: 'Level Accomplishments',
    stats_no_levelups: 'No level-ups recorded yet',
    stats_at: 'at',
    stats_data: 'Data',
    stats_data_sub: 'Export your data to back it up or move it to another device.',
    stats_export: '⬇️ Export JSON',
    stats_import: '⬆️ Import JSON',
    stats_drive_save: '☁️ Save to Drive',
    stats_drive_load: '☁️ Load from Drive',
    stats_drive_active: '✅ Drive autosave active — syncs after each action',
    stats_drive_inactive: 'Sign in above to enable Drive autosave',
    stats_activity_log: '📋 Activity Log',
    stats_activity_search: 'Search activity...',
    stats_activity_no_match: 'No matching entries',
    stats_activity_empty: 'No activity recorded yet',

    // Side panel
    side_active_quests: 'Active Quests',
    side_no_quests: 'No active quests yet.<br>Add one to get started!',
    side_daily_missions: 'Daily Missions',
    side_weekly_missions: 'Weekly Missions',

    // Level short label
    lvl_short: 'Lvl',

    // Difficulties
    diff_side_label: 'Side Quest',
    diff_quest_label: 'Quest',
    diff_main_label: 'Main Quest',
    diff_boss_label: 'Boss Battle',

    // Level titles
    level_1: 'Wanderer',
    level_2: 'Apprentice',
    level_3: 'Journeyman',
    level_4: 'Warrior',
    level_5: 'Veteran',
    level_6: 'Champion',
    level_7: 'Master',
    level_8: 'Legend',
    level_9: 'Grandmaster',
    level_10: 'Overlord',
    level_11: 'Tyrant',
    level_12: 'Warlord',
    level_13: 'Titan',
    level_14: 'Conqueror',
    level_15: 'Sovereign',
    level_16: 'Archon',
    level_17: 'Arbiter',
    level_18: 'High Lord',
    level_19: 'Elder',
    level_20: 'Archmage',
    level_21: 'Dreadlord',
    level_22: 'Dragonborn',
    level_23: 'Ancient',
    level_24: 'Transcendent',
    level_25: 'Immortal',
    level_26: 'Celestial',
    level_27: 'Demigod',
    level_28: 'God-King',
    level_29: 'Eternal',
    level_30: 'Supreme',

    // Daily mission titles and descs
    mission_first_step_title:   '⚔️ First Blood',
    mission_first_step_desc:    'Complete your first step today',
    mission_three_steps_title:  '🔥 Momentum Builder',
    mission_three_steps_desc:   'Complete 3 steps today',
    mission_five_steps_title:   '💪 On a Roll',
    mission_five_steps_desc:    'Complete 5 steps today',
    mission_ten_steps_title:    '🌪️ Step Storm',
    mission_ten_steps_desc:     'Complete 10 steps today',
    mission_one_task_title:     '🏆 Quest Slayer',
    mission_one_task_desc:      'Complete 1 full quest today',
    mission_two_tasks_title:    '⚡ Double Victory',
    mission_two_tasks_desc:     'Complete 2 full quests today',
    mission_new_quest_title:    '📝 Quest Planner',
    mission_new_quest_desc:     'Break down a new quest into steps',
    mission_two_quests_title:   '📋 Quest Collector',
    mission_two_quests_desc:    'Add 2 new quests today',
    mission_focus_mode_title:   '🎯 Deep Focus',
    mission_focus_mode_desc:    'Use Focus Mode at least once today',
    mission_focus_triple_title: '🧘 Flow State',
    mission_focus_triple_desc:  'Use Focus Mode 3 times today',

    // Weekly mission titles and descs
    wmission_w_10steps_title:   '⚔️ Step Warrior',
    wmission_w_10steps_desc:    'Complete 10 steps this week',
    wmission_w_25steps_title:   '💪 Momentum Beast',
    wmission_w_25steps_desc:    'Complete 25 steps this week',
    wmission_w_50steps_title:   '🌪️ Unstoppable',
    wmission_w_50steps_desc:    'Complete 50 steps this week',
    wmission_w_3tasks_title:    '🏆 Triple Threat',
    wmission_w_3tasks_desc:     'Complete 3 quests this week',
    wmission_w_5tasks_title:    '💀 Quest Overlord',
    wmission_w_5tasks_desc:     'Complete 5 quests this week',
    wmission_w_focus5_title:    '🎯 Focus Master',
    wmission_w_focus5_desc:     'Use Focus Mode 5 times this week',
    wmission_w_3newquest_title: '📝 Quest Architect',
    wmission_w_3newquest_desc:  'Add 3 new quests this week',
    wmission_w_5days_title:     '🔥 Week Warrior',
    wmission_w_5days_desc:      'Be active 5 days this week',
    wmission_w_7days_title:     '👑 Perfect Week',
    wmission_w_7days_desc:      'Be active every day this week',
  },

  es: {
    // Nav
    nav_today: 'Hoy',
    nav_quests: 'Misiones',
    nav_stats: 'Estadísticas',

    // Focus overlay
    focus_label: '⚔️ MODO ENFOQUE',
    focus_done_btn: '✓ Listo — Siguiente Paso',
    focus_exit_btn: 'Salir del Enfoque',

    // Uncheck dialog
    uncheck_title: '⚠️ ¿Desmarcar Paso?',
    uncheck_cancel_btn: 'Cancelar',
    uncheck_confirm_btn: 'Perder la XP',
    uncheck_lose_xp: 'Perderás',
    uncheck_reopen: 'Esto también reabrirá la misión',
    uncheck_reopen_suffix: 'y eliminará su bonificación de completado.',

    // Level down/up overlays
    leveldown_title: '¡BAJASTE DE NIVEL!',
    leveldown_btn: 'Aceptar la Derrota',
    levelup_title: '¡SUBISTE DE NIVEL!',
    levelup_btn: 'Continuar la Misión',
    levelup_sub: 'Ahora eres',
    leveldown_sub: 'Regresaste a',

    // Greetings
    greeting_morning: 'Buenos días',
    greeting_afternoon: 'Buenas tardes',
    greeting_evening: 'Buenas noches',

    // Today view
    today_next_waiting: 'Tu siguiente paso te espera.',
    today_add_quest_prompt: '¡Vas bien — agrega una nueva misión!',
    today_active_step_label: '⚡ Tu Siguiente Paso',
    today_starter_badge: '⭐ Paso Inicial — menos de 2 min',
    today_btn_done: '✓ Listo',
    today_btn_focus: '🎯 Enfoque',
    today_empty_title: 'Sin misiones activas',
    today_empty_sub: 'Agrega una misión y divídela en pasos pequeños para saber siempre exactamente qué hacer a continuación.',
    today_btn_add: '+ Agregar Misión',
    today_quest_queue: 'Cola de Misiones',
    today_quick_add_placeholder: 'Agregar misión rápida...',
    today_up_next: '▶ A Continuación',

    // Reel
    reel_day: 'día',
    reel_days: 'días',
    reel_streak_suffix: 'de racha',
    reel_best: 'Récord',
    reel_step_today: 'paso hoy',
    reel_steps_today: 'pasos hoy',
    reel_all_time: 'en total',
    reel_quest_done: 'misión completada',
    reel_quests_done: 'misiones completadas',
    reel_xp_earned: 'XP ganada',
    reel_max_level: 'NIVEL MÁXIMO 👑',

    // Deadline labels
    deadline_overdue: 'd de retraso',
    deadline_today: 'vence hoy',
    deadline_left: 'd restantes',

    // Missions
    daily_missions: 'Misiones Diarias',
    weekly_missions: 'Misiones Semanales',
    weekly_days_left: 'd restantes',
    missions_new_daily: '🎯 ¡Nueva misión diaria desbloqueada!',
    missions_all_daily: '🎊 ¡Todas las misiones diarias completadas!',
    missions_new_weekly: '🗓️ ¡Nueva misión semanal desbloqueada!',
    missions_all_weekly: '🏆 ¡Todas las misiones semanales completadas!',

    // Quests view
    quests_active_title: 'Misiones Activas',
    quests_btn_new: '+ Nueva Misión',
    quests_empty_title: 'Sin misiones aún',
    quests_empty_sub: 'Cada misión es un objetivo dividido en pasos lo suficientemente pequeños como para que empezar se sienta fácil.',
    quests_btn_first: '+ Agrega Tu Primera Misión',
    quests_completed_toggle: 'Misiones Completadas',
    quests_no_steps: 'Sin pasos aún — agrega uno abajo',
    quests_add_step_placeholder: 'Agregar un paso...',
    quests_starter_badge: 'INICIAL',
    quests_steps_label: 'pasos',

    // Sort options
    sort_date: '🕐 Fecha',
    sort_priority: '# Prioridad',
    sort_deadline: '📅 Fecha Límite',
    sort_alpha: 'A–Z',
    sort_steps: '📋 Pasos',

    // Modal
    modal_title_new: 'Nueva Misión ⚔️',
    modal_title_edit: 'Editar Misión ✏️',
    modal_sub_new: 'Nómbrala ahora, divídela después.',
    modal_sub_edit: 'Actualiza los detalles de tu misión.',
    modal_tab_single: 'Misión Individual',
    modal_tab_bulk: 'Agregar en Bloque',
    modal_label_name: 'Nombre de la Misión',
    modal_placeholder_name: '¿Qué necesitas lograr?',
    modal_label_difficulty: 'Dificultad',
    modal_label_priority: 'Prioridad #',
    modal_optional: '(opcional)',
    modal_label_deadline: 'Fecha Límite',
    modal_label_steps: 'Pasos',
    modal_label_steps_hint: '(mín. 2)',
    modal_btn_add_step: '+ Agregar otro paso',
    modal_btn_cancel: 'Cancelar',
    modal_btn_save: 'Guardar Misión ⚔️',
    modal_btn_save_edit: 'Guardar Cambios ✓',
    modal_step_placeholder_first: 'La acción inicial más sencilla posible...',
    modal_step_placeholder_next: 'Siguiente paso...',
    modal_step_hint: '⭐ Hazlo tan fácil que no puedas decir que no (menos de 2 min)',

    // Bulk modal
    bulk_title: 'Agregar Misiones en Bloque ⚔️',
    bulk_sub: 'Una misión por línea. Agrega pasos a cada una después.',
    bulk_label: 'Nombres de Misiones',
    bulk_btn: 'Agregar Todas las Misiones ⚔️',

    // Toast messages
    toast_backup_downloaded: '📁 ¡Respaldo descargado!',
    toast_data_imported: '✅ ¡Datos importados!',
    toast_invalid_backup: '⚠️ Archivo de respaldo inválido',
    toast_google_fail: '⚠️ Error al iniciar sesión con Google',
    toast_drive_saved: '☁️ ¡Guardado en Google Drive!',
    toast_drive_save_fail: '⚠️ Error al guardar en Drive',
    toast_drive_no_backup: '⚠️ No se encontró respaldo en Drive',
    toast_drive_loaded: '☁️ ¡Cargado desde Google Drive!',
    toast_drive_load_fail: '⚠️ Error al cargar desde Drive',
    toast_quest_added: '⚔️ ¡Misión agregada!',
    toast_quest_updated: '✓ ¡Misión actualizada!',
    toast_quest_duplicated: '📋 ¡Misión duplicada!',
    toast_give_name: '⚠️ ¡Dale un nombre a tu misión!',
    toast_add_steps: '⚠️ ¡Agrega al menos 2 pasos!',
    toast_enter_quest: '⚠️ ¡Ingresa al menos un nombre de misión!',
    toast_quest_complete: '🎉 ¡Misión Completa! XP de bonificación en camino...',
    toast_daily_streak: '¡Racha diaria!',
    toast_step_done: 'Paso completado',
    toast_quest_complete_label: '⚔️ ¡Misión completa!',
    toast_step_reverted: 'paso revertido',
    toast_quests_added_one: '⚔️ ¡1 misión agregada!',
    toast_quests_added_many: '⚔️ ¡{n} misiones agregadas!',

    // Quest duplicate suffix
    quest_copy_suffix: ' (copia)',

    // Stats view
    stats_xp_total: 'XP en total',
    stats_xp_to: 'XP para',
    stats_max_level: 'NIVEL MÁXIMO 👑',
    stats_day_streak: 'Racha Diaria',
    stats_best_streak: 'Mejor Racha',
    stats_quests_done: 'Misiones Hechas',
    stats_steps_taken: 'Pasos Dados',
    stats_focus_sessions: 'Sesiones de Enfoque',
    stats_missions_done: 'Misiones Completadas',
    stats_best_day: 'Mejor Día (pasos)',
    stats_active_days: 'Días Activos en Total',
    stats_weekly_xp: 'XP de Esta Semana',
    stats_weekly_reset: 'Se reinicia cada lunes',
    stats_quest_breakdown: 'Desglose de Misiones',
    stats_no_quests: 'Sin misiones aún',
    stats_done: 'Hechas',
    stats_in_progress: 'En Progreso',
    stats_not_started: 'Sin Iniciar',
    stats_last_7_days: 'Últimos 7 Días',
    stats_level_progress: 'Progreso de Nivel',
    stats_level_max: 'MÁX ✓',
    stats_accomplishments: 'Logros de Nivel',
    stats_no_levelups: 'Sin subidas de nivel registradas aún',
    stats_at: 'a las',
    stats_data: 'Datos',
    stats_data_sub: 'Exporta tus datos para respaldarlos o moverlos a otro dispositivo.',
    stats_export: '⬇️ Exportar JSON',
    stats_import: '⬆️ Importar JSON',
    stats_drive_save: '☁️ Guardar en Drive',
    stats_drive_load: '☁️ Cargar desde Drive',
    stats_drive_active: '✅ Autoguardado en Drive activo — sincroniza después de cada acción',
    stats_drive_inactive: 'Inicia sesión arriba para activar el autoguardado en Drive',
    stats_activity_log: '📋 Registro de Actividad',
    stats_activity_search: 'Buscar actividad...',
    stats_activity_no_match: 'Sin resultados',
    stats_activity_empty: 'Sin actividad registrada aún',

    // Side panel
    side_active_quests: 'Misiones Activas',
    side_no_quests: 'Sin misiones activas aún.<br>¡Agrega una para comenzar!',
    side_daily_missions: 'Misiones Diarias',
    side_weekly_missions: 'Misiones Semanales',

    // Level short label
    lvl_short: 'Niv',

    // Difficulties
    diff_side_label: 'Misión Secundaria',
    diff_quest_label: 'Misión',
    diff_main_label: 'Misión Principal',
    diff_boss_label: 'Batalla Final',

    // Level titles
    level_1:  'Errante',
    level_2:  'Aprendiz',
    level_3:  'Oficial',
    level_4:  'Guerrero',
    level_5:  'Veterano',
    level_6:  'Campeón',
    level_7:  'Maestro',
    level_8:  'Leyenda',
    level_9:  'Gran Maestro',
    level_10: 'Señor Supremo',
    level_11: 'Tirano',
    level_12: 'Señor de la Guerra',
    level_13: 'Titán',
    level_14: 'Conquistador',
    level_15: 'Soberano',
    level_16: 'Arconte',
    level_17: 'Árbitro',
    level_18: 'Alto Señor',
    level_19: 'Anciano',
    level_20: 'Archimago',
    level_21: 'Señor del Terror',
    level_22: 'Nacido del Dragón',
    level_23: 'Antiguo',
    level_24: 'Trascendente',
    level_25: 'Inmortal',
    level_26: 'Celestial',
    level_27: 'Semidiós',
    level_28: 'Rey Dios',
    level_29: 'Eterno',
    level_30: 'Supremo',

    // Daily mission titles and descs
    mission_first_step_title:   '⚔️ Primera Sangre',
    mission_first_step_desc:    'Completa tu primer paso hoy',
    mission_three_steps_title:  '🔥 Constructor de Impulso',
    mission_three_steps_desc:   'Completa 3 pasos hoy',
    mission_five_steps_title:   '💪 En Racha',
    mission_five_steps_desc:    'Completa 5 pasos hoy',
    mission_ten_steps_title:    '🌪️ Tormenta de Pasos',
    mission_ten_steps_desc:     'Completa 10 pasos hoy',
    mission_one_task_title:     '🏆 Cazador de Misiones',
    mission_one_task_desc:      'Completa 1 misión completa hoy',
    mission_two_tasks_title:    '⚡ Victoria Doble',
    mission_two_tasks_desc:     'Completa 2 misiones completas hoy',
    mission_new_quest_title:    '📝 Planificador de Misiones',
    mission_new_quest_desc:     'Divide una nueva misión en pasos',
    mission_two_quests_title:   '📋 Coleccionista de Misiones',
    mission_two_quests_desc:    'Agrega 2 nuevas misiones hoy',
    mission_focus_mode_title:   '🎯 Enfoque Profundo',
    mission_focus_mode_desc:    'Usa el Modo Enfoque al menos una vez hoy',
    mission_focus_triple_title: '🧘 Estado de Flujo',
    mission_focus_triple_desc:  'Usa el Modo Enfoque 3 veces hoy',

    // Weekly mission titles and descs
    wmission_w_10steps_title:   '⚔️ Guerrero de Pasos',
    wmission_w_10steps_desc:    'Completa 10 pasos esta semana',
    wmission_w_25steps_title:   '💪 Bestia del Impulso',
    wmission_w_25steps_desc:    'Completa 25 pasos esta semana',
    wmission_w_50steps_title:   '🌪️ Imparable',
    wmission_w_50steps_desc:    'Completa 50 pasos esta semana',
    wmission_w_3tasks_title:    '🏆 Triple Amenaza',
    wmission_w_3tasks_desc:     'Completa 3 misiones esta semana',
    wmission_w_5tasks_title:    '💀 Señor Supremo de Misiones',
    wmission_w_5tasks_desc:     'Completa 5 misiones esta semana',
    wmission_w_focus5_title:    '🎯 Maestro del Enfoque',
    wmission_w_focus5_desc:     'Usa el Modo Enfoque 5 veces esta semana',
    wmission_w_3newquest_title: '📝 Arquitecto de Misiones',
    wmission_w_3newquest_desc:  'Agrega 3 nuevas misiones esta semana',
    wmission_w_5days_title:     '🔥 Guerrero Semanal',
    wmission_w_5days_desc:      'Mantente activo 5 días esta semana',
    wmission_w_7days_title:     '👑 Semana Perfecta',
    wmission_w_7days_desc:      'Mantente activo todos los días de la semana',
  },
};
