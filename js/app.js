/* ═══════════════════════════════════════════
   SCORE TRACKER — Full Application Logic
   Auth + OL/AL + Mandatory/Optional subjects
   ═══════════════════════════════════════════ */

(() => {
    'use strict';

    // ══════════════════════════════════════════
    //         SUBJECT DATABASES
    // ══════════════════════════════════════════

    // ── O/L Compulsory (auto-selected, cannot be removed) ──
    const firebaseConfig = {
        apiKey: "AIzaSyBNX8jXc7o1WrBJbodXWzg9v6LzLek-mYU",
        authDomain: "score-tracker-27.firebaseapp.com",
        projectId: "score-tracker-27",
        storageBucket: "score-tracker-27.firebasestorage.app",
        messagingSenderId: "246489207224",
        appId: "1:246489207224:web:c78454d94c846aa06a7f4d",
        measurementId: "G-5B37KPYPJQ"
    };

    // Initialize Firebase if scripts are loaded
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        var db = firebase.firestore();
        var auth = firebase.auth();
    }

    const OL_COMPULSORY = [
        { id: 'ol_first_lang', label: 'First Language', icon: '🇱🇰', group: 'Compulsory' },
        { id: 'ol_english', label: 'English Language', icon: '📝', group: 'Compulsory' },
        { id: 'ol_maths', label: 'Mathematics', icon: '📐', group: 'Compulsory' },
        { id: 'ol_science', label: 'Science', icon: '🔬', group: 'Compulsory' },
        { id: 'ol_history', label: 'History', icon: '🏛️', group: 'Compulsory' },
        { id: 'ol_religion', label: 'Religion', icon: '🙏', group: 'Compulsory' },
    ];

    // ── O/L Elective Subjects ──
    const OL_SUBJECTS = [

        // Basket 1 — Elective
        { id: 'ol_business', label: 'Business & Accounting', icon: '💼', group: 'Basket 1 — Elective' },
        { id: 'ol_geography', label: 'Geography', icon: '🌍', group: 'Basket 1 — Elective' },
        { id: 'ol_civic', label: 'Civic Education', icon: '⚖️', group: 'Basket 1 — Elective' },
        { id: 'ol_entrepreneur', label: 'Entrepreneurship Studies', icon: '💡', group: 'Basket 1 — Elective' },
        { id: 'ol_second_lang', label: 'Second Language', icon: '🗣️', group: 'Basket 1 — Elective' },
        { id: 'ol_pali', label: 'Pali', icon: '📜', group: 'Basket 1 — Elective' },
        { id: 'ol_sanskrit', label: 'Sanskrit', icon: '📜', group: 'Basket 1 — Elective' },
        { id: 'ol_french', label: 'French', icon: '🇫🇷', group: 'Basket 1 — Elective' },
        { id: 'ol_german', label: 'German', icon: '🇩🇪', group: 'Basket 1 — Elective' },
        { id: 'ol_hindi', label: 'Hindi', icon: '🇮🇳', group: 'Basket 1 — Elective' },
        { id: 'ol_japanese', label: 'Japanese', icon: '🇯🇵', group: 'Basket 1 — Elective' },
        { id: 'ol_arabic', label: 'Arabic', icon: '📜', group: 'Basket 1 — Elective' },
        { id: 'ol_korean', label: 'Korean', icon: '🇰🇷', group: 'Basket 1 — Elective' },
        { id: 'ol_chinese', label: 'Chinese', icon: '🇨🇳', group: 'Basket 1 — Elective' },
        { id: 'ol_russian', label: 'Russian', icon: '🇷🇺', group: 'Basket 1 — Elective' },

        // Basket 2 — Aesthetic
        { id: 'ol_music_eastern', label: 'Music (Eastern)', icon: '🎵', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_music_western', label: 'Music (Western)', icon: '🎶', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_music_carnatic', label: 'Music (Carnatic)', icon: '🎼', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_dance_eastern', label: 'Dancing (Eastern)', icon: '💃', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_dance_bharatha', label: 'Dancing (Bharatha)', icon: '💃', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_art', label: 'Art', icon: '🎨', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_drama', label: 'Drama & Theatre', icon: '🎭', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_lit_english', label: 'Literature (English)', icon: '📖', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_lit_sinhala', label: 'Literature (Sinhala)', icon: '📖', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_lit_tamil', label: 'Literature (Tamil)', icon: '📖', group: 'Basket 2 — Aesthetic' },
        { id: 'ol_lit_arabic', label: 'Literature (Arabic)', icon: '📖', group: 'Basket 2 — Aesthetic' },

        // Basket 3 — Technical
        { id: 'ol_ict', label: 'ICT', icon: '💻', group: 'Basket 3 — Technical' },
        { id: 'ol_agri_food', label: 'Agriculture & Food Tech', icon: '🌾', group: 'Basket 3 — Technical' },
        { id: 'ol_health_pe', label: 'Health & Physical Education', icon: '🏃', group: 'Basket 3 — Technical' },
        { id: 'ol_home_econ', label: 'Home Economics', icon: '🏠', group: 'Basket 3 — Technical' },
        { id: 'ol_media', label: 'Media Studies', icon: '📡', group: 'Basket 3 — Technical' },
        { id: 'ol_design_tech', label: 'Design & Technology', icon: '✏️', group: 'Basket 3 — Technical' },
    ];

    // ── A/L Subjects ──
    const AL_SUBJECTS = [
        // Physical Science
        { id: 'combined_maths', label: 'Combined Mathematics', icon: '📐', group: 'Physical Science' },
        { id: 'physics', label: 'Physics', icon: '⚛️', group: 'Physical Science' },
        { id: 'chemistry', label: 'Chemistry', icon: '🧪', group: 'Physical Science' },

        // Biological Science
        { id: 'biology', label: 'Biology', icon: '🧬', group: 'Biological Science' },
        { id: 'agri_science', label: 'Agricultural Science', icon: '🌾', group: 'Biological Science' },

        // Commerce
        { id: 'accounting', label: 'Accounting', icon: '📒', group: 'Commerce' },
        { id: 'business_studies', label: 'Business Studies', icon: '💼', group: 'Commerce' },
        { id: 'economics', label: 'Economics', icon: '📊', group: 'Commerce' },

        // Arts
        { id: 'sinhala', label: 'Sinhala', icon: '🇱🇰', group: 'Arts' },
        { id: 'tamil', label: 'Tamil', icon: '🔤', group: 'Arts' },
        { id: 'english', label: 'English', icon: '📝', group: 'Arts' },
        { id: 'history', label: 'History', icon: '🏛️', group: 'Arts' },
        { id: 'geography', label: 'Geography', icon: '🌍', group: 'Arts' },
        { id: 'political_sci', label: 'Political Science', icon: '⚖️', group: 'Arts' },
        { id: 'logic', label: 'Logic & Scientific Method', icon: '🧠', group: 'Arts' },
        { id: 'buddhist_civ', label: 'Buddhist Civilization', icon: '☸️', group: 'Arts' },
        { id: 'hindu_civ', label: 'Hindu Civilization', icon: '🕉️', group: 'Arts' },
        { id: 'christian_civ', label: 'Christian Civilization', icon: '✝️', group: 'Arts' },
        { id: 'islamic_civ', label: 'Islamic Civilization', icon: '☪️', group: 'Arts' },
        { id: 'pali', label: 'Pali', icon: '📜', group: 'Arts' },
        { id: 'sanskrit', label: 'Sanskrit', icon: '📜', group: 'Arts' },
        { id: 'arabic', label: 'Arabic', icon: '📜', group: 'Arts' },
        { id: 'eng_literature', label: 'English Literature', icon: '📖', group: 'Arts' },
        { id: 'communication', label: 'Communication & Media', icon: '📡', group: 'Arts' },
        { id: 'sociology', label: 'Sociology', icon: '👥', group: 'Arts' },

        // Technology
        { id: 'eng_technology', label: 'Engineering Technology', icon: '⚙️', group: 'Technology' },
        { id: 'science_for_tech', label: 'Science for Technology', icon: '🔬', group: 'Technology' },
        { id: 'ict', label: 'ICT', icon: '💻', group: 'Technology' },
        { id: 'bio_systems_tech', label: 'Bio-Systems Technology', icon: '🌿', group: 'Technology' },

        // Common
        { id: 'general_english', label: 'General English', icon: '🅰️', group: 'Common' },
        { id: 'general_paper', label: 'General Paper', icon: '📋', group: 'Common' },
    ];

    // Accent colors for subjects (up to 9 for OL)
    const ACCENT_COLORS = [
        { color: '#00e5ff', colorLight: '#00acc1', dim: 'rgba(0,229,255,0.15)', gradient: 'linear-gradient(135deg, #00bcd4, #00e5ff)' },
        { color: '#b388ff', colorLight: '#7c4dff', dim: 'rgba(179,136,255,0.15)', gradient: 'linear-gradient(135deg, #7c4dff, #b388ff)' },
        { color: '#ffab40', colorLight: '#ff9100', dim: 'rgba(255,171,64,0.15)', gradient: 'linear-gradient(135deg, #ff9100, #ffab40)' },
        { color: '#69f0ae', colorLight: '#00c853', dim: 'rgba(105,240,174,0.15)', gradient: 'linear-gradient(135deg, #00c853, #69f0ae)' },
        { color: '#ff80ab', colorLight: '#f50057', dim: 'rgba(255,128,171,0.15)', gradient: 'linear-gradient(135deg, #f50057, #ff80ab)' },
        { color: '#40c4ff', colorLight: '#0091ea', dim: 'rgba(64,196,255,0.15)', gradient: 'linear-gradient(135deg, #0091ea, #40c4ff)' },
        { color: '#ffd740', colorLight: '#ffc400', dim: 'rgba(255,215,64,0.15)', gradient: 'linear-gradient(135deg, #ffc400, #ffd740)' },
        { color: '#e040fb', colorLight: '#aa00ff', dim: 'rgba(224,64,251,0.15)', gradient: 'linear-gradient(135deg, #aa00ff, #e040fb)' },
        { color: '#ff6e40', colorLight: '#dd2c00', dim: 'rgba(255,110,64,0.15)', gradient: 'linear-gradient(135deg, #dd2c00, #ff6e40)' },
    ];
    // Extra accent for optional subjects
    const OPTIONAL_ACCENT = { color: '#4dd0e1', colorLight: '#00acc1', dim: 'rgba(77,208,225,0.12)', gradient: 'linear-gradient(135deg, #26c6da, #4dd0e1)' };

    // ══════════ STORAGE ══════════
    const USERS_KEY = 'scoreTracker_users';
    const SESSION_KEY = 'scoreTracker_session';
    const THEME_KEY = 'scoreTracker_theme';
    function scoreKey(userId, subjectId) { return `st_${userId}_${subjectId}`; }

    const $ = (sel) => document.querySelector(sel);

    // ── User DB (localStorage fallback + Firestore) ──
    async function getProfileData(email) {
        if (!db) return null;
        try {
            const doc = await db.collection('users').doc(email).get();
            return doc.exists ? doc.data() : null;
        } catch (e) { console.error(e); return null; }
    }

    async function saveProfileData(email, data) {
        if (!db) return;
        try { await db.collection('users').doc(email).set(data, { merge: true }); }
        catch (e) { console.error(e); }
    }

    function getSession() { return localStorage.getItem(SESSION_KEY); }
    function setSession(email) { localStorage.setItem(SESSION_KEY, email); }
    function clearSession() { localStorage.removeItem(SESSION_KEY); }

    // Global user state
    let currentUserProfile = null;
    let scoresCache = {};

    // ── Cache Loading (SYCNCHRONOUS & INSTANT) ──
    function loadCache() {
        const email = getSession();
        if (!email) return;

        const localUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
        const localProfile = localUsers[email];
        if (localProfile) {
            currentUserProfile = localProfile;
            const subjects = [...localProfile.mainSubjects, ...(localProfile.optionalSubjects || [])];
            subjects.forEach(sid => {
                if (!scoresCache[sid]) {
                    scoresCache[sid] = JSON.parse(localStorage.getItem(scoreKey(email, sid)) || '[]');
                }
            });
        }
    }

    // Call immediately
    loadCache();

    async function syncProfile() {
        const email = getSession();
        if (!email) {
            currentUserProfile = null;
            scoresCache = {};
            return null;
        }

        // 1. If we have a profile already, just return it and sync in background
        if (currentUserProfile) {
            backgroundSync(email, currentUserProfile);
            return currentUserProfile;
        }

        // 2. No memory profile? Try local storage (should be handled by loadCache but as fallback)
        const localUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
        const localProfile = localUsers[email];
        if (localProfile) {
            currentUserProfile = localProfile;
            backgroundSync(email, localProfile);
            return localProfile;
        }

        // 3. No local data at all? Then we MUST wait for the first fetch from Firestore
        const remote = await getProfileData(email);
        if (remote) {
            currentUserProfile = remote;
            backgroundSync(email, remote);
            return remote;
        }
        return null;
    }

    async function backgroundSync(email, currentProf) {
        if (!db) return;
        try {
            // A. Sync Profile first
            const remote = await getProfileData(email);
            let profileChanged = false;
            if (remote && JSON.stringify(remote) !== JSON.stringify(currentProf)) {
                currentUserProfile = remote;
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
                users[email] = remote;
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                profileChanged = true;
            }

            // B. Sync Scores
            const subjects = [...(currentUserProfile.mainSubjects || []), ...(currentUserProfile.optionalSubjects || [])];
            let scoresChanged = false;

            await Promise.all(subjects.map(async (sid) => {
                try {
                    const snapshot = await db.collection('users').doc(email).collection('scores').doc(sid).get();
                    if (snapshot.exists) {
                        const remoteScores = snapshot.data().entries || [];
                        if (JSON.stringify(remoteScores) !== JSON.stringify(scoresCache[sid])) {
                            scoresCache[sid] = remoteScores;
                            localStorage.setItem(scoreKey(email, sid), JSON.stringify(remoteScores));
                            scoresChanged = true;
                        }
                    } else if (scoresCache[sid] && scoresCache[sid].length > 0) {
                        // Upload local to remote if missing
                        await db.collection('users').doc(email).collection('scores').doc(sid).set({ entries: scoresCache[sid] });
                    }
                } catch (e) { console.warn(`Sync ${sid} failed`, e); }
            }));

            // C. Refresh UI if anything updated
            if (profileChanged || scoresChanged) {
                console.log('Sync complete: Updates found, refreshing UI');
                if (page === 'home') {
                    if (profileChanged) {
                        const greeting = $('#userGreeting');
                        if (greeting && currentUserProfile) greeting.textContent = `Hi, ${currentUserProfile.name}`;
                        const badge = $('#examBadge');
                        if (badge && currentUserProfile) badge.textContent = currentUserProfile.examType;
                        buildHomeNav();
                    }
                    renderHomeStats();
                    renderHomeTable();
                    renderHomeChart();
                    setTimeout(showMotivation, 1000); // Welcoming motivation
                } else if (page === 'subject' && typeof renderSubjectAll === 'function') {
                    renderSubjectAll();
                }
            }
        } catch (e) { console.error('Background sync fatal error', e); }
    }

    function getProfile() { return currentUserProfile; }

    // ── Scores (Firestore) ──
    // ── Scores (Cache + Async Firestore) ──
    function loadScores(subjectId) {
        return scoresCache[subjectId] || [];
    }

    async function saveScores(subjectId, scores) {
        scoresCache[subjectId] = scores;
        const email = getSession();
        if (!email) return;
        // Always update local storage immediately for fast next-load
        localStorage.setItem(scoreKey(email, subjectId), JSON.stringify(scores));
        if (!db) return;
        try {
            await db.collection('users').doc(email).collection('scores').doc(subjectId).set({ entries: scores });
            showMotivation(true); // Encouragement after saving
        } catch (e) { console.error(e); }
    }

    // ══════════ THEME ══════════
    function initTheme() { document.documentElement.setAttribute('data-theme', localStorage.getItem(THEME_KEY) || 'dark'); }
    function bindThemeToggle() {
        const btn = $('#themeToggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
            if (chart) renderChart();
        });
    }

    // ══════════ MOTIVATION ══════════
    const MOTIVATIONAL_QUOTES = [
        "The future belongs to those who believe in the beauty of their dreams. ✨",
        "Your hard work will pay off. Keep chasing those 100s! 🎯",
        "Every expert was once a beginner. Keep practicing! 📚",
        "Don't stop until you're proud. You've got this! 💪",
        "Success is the sum of small efforts, repeated day-in and day-out. 🔥",
        "Focus on your goal. Don't look in any direction but ahead. 🚀",
        "Believe you can and you're halfway there. 👑"
    ];

    function showMotivation(isNewScore = false) {
        if (isNewScore) {
            const congrats = [
                "Amazing job! Keep that momentum going! 🎉",
                "Excellent work! Your dedication is inspiring. 🌟",
                "Fantastic! Another step closer to your goal. 📈"
            ];
            showToast(congrats[Math.floor(Math.random() * congrats.length)]);
        } else {
            // Only show home motivation once per session or randomly
            if (!sessionStorage.getItem('motivation_shown')) {
                showToast(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
                sessionStorage.setItem('motivation_shown', 'true');
            }
        }
    }

    // ══════════ TOAST ══════════
    function showToast(msg) { const t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); }

    // ══════════ DATE HELPERS ══════════
    function formatDate(d) { return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    function formatDateShort(d) { return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); }
    function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

    let chart = null;
    let currentRange = 'month';

    // ══════════ DETECT PAGE ══════════
    const page = document.body.getAttribute('data-page');
    initTheme();
    bindThemeToggle();

    (async () => {
        try {
            // Priority 1: Always try to sync if we have a session (non-blocking if cached)
            if (getSession()) await syncProfile();

            // Priority 2: Page specific init
            if (page === 'home') {
                await requireLogin();
                initHomePage();
            } else if (page === 'subject') {
                await requireLogin();
                initSubjectPage();
            } else {
                // Login page
                if (getProfile()) {
                    window.location.replace('index.html');
                    return;
                }
                initLoginPage();
            }
        } catch (err) {
            console.error('Initialization error:', err);
            if (page !== 'home' && page !== 'subject') initLoginPage();
        }
    })();

    async function requireLogin() {
        console.log('RequireLogin checking profile...', !!getProfile());
        if (!getProfile()) {
            if (auth) {
                try {
                    console.log('Waiting for Auth state...');
                    const user = await Promise.race([
                        new Promise(r => { 
                            const unsub = auth.onAuthStateChanged(u => { 
                                unsub(); 
                                r(u); 
                            }); 
                        }),
                        new Promise(r => setTimeout(() => r(null), 1500)) // Slightly longer for the cold start
                    ]);
                    if (user) {
                        console.log('Auth confirmed for:', user.email);
                        setSession(user.email);
                        // No need to await here because getProfile() might already be true from loadCache
                        if (!getProfile()) await syncProfile();
                        return;
                    }
                } catch (e) { console.warn('Auth check failed', e); }
            }
            console.log('No valid session found, redirecting to login');
            window.location.replace('login.html'); // Use replace to prevent back-button loops
        }
    }

    function initLoginPage() {
        // Safe check already done in IIFE
        const authTabs = $('#authTabs');
        const loginForm = $('#loginForm');
        const signupForm = $('#signupForm');

        if (!authTabs) return;

        // Tab switching
        authTabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.auth-tab');
            if (!btn) return;
            authTabs.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            loginForm.style.display = mode === 'login' ? 'block' : 'none';
            signupForm.style.display = mode === 'signup' ? 'block' : 'none';
        });

        // ── Login ──
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = $('#loginEmail').value.trim().toLowerCase();
            const pw = $('#loginPassword').value;
            const btn = loginForm.querySelector('button[type="submit"]');

            try {
                btn.disabled = true;
                if (auth) {
                    await auth.signInWithEmailAndPassword(email, pw);
                } else {
                    // Local fallback if firebase fails to load
                    const localUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
                    if (!localUsers[email]) throw new Error('Account not found in cache');
                    if (localUsers[email].password !== pw) throw new Error('Incorrect password');
                }
                setSession(email);
                const prof = await syncProfile();
                if (!prof && auth) {
                    // Edge case: Auth exists but Firestore profile missing?
                    throw new Error('Profile setup incomplete. Please try signing up again.');
                }
                window.location.replace('index.html');
            } catch (err) {
                console.error('Login Error:', err);
                let msg = err.message;
                if (msg.includes('user-not-found')) msg = 'Account not found';
                if (msg.includes('wrong-password')) msg = 'Incorrect password';
                showToast(msg || 'Login failed');
                btn.disabled = false;
            }
        });

        // ── Google Sign-In (placeholder) ──
        const googleMsg = 'Google Sign-In requires a server & Client ID to activate';
        const gLoginBtn = $('#googleLoginBtn');
        const gSignupBtn = $('#googleSignupBtn');
        if (gLoginBtn) gLoginBtn.addEventListener('click', () => showToast(googleMsg));
        if (gSignupBtn) gSignupBtn.addEventListener('click', () => showToast(googleMsg));

        // ── Signup: step navigation ──
        const step1 = $('#signupStep1');
        const step2 = $('#signupStep2');
        const toStep2 = $('#toStep2Btn');
        const backStep1 = $('#backToStep1');

        let examType = 'OL';
        const examToggle = $('#examTypeToggle');
        examToggle.addEventListener('click', (e) => {
            const btn = e.target.closest('.exam-btn');
            if (!btn) return;
            examToggle.querySelectorAll('.exam-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            examType = btn.dataset.type;
        });

        toStep2.addEventListener('click', () => {
            console.log('Next button clicked');
            const name = $('#signupName').value.trim();
            const email = $('#signupEmail').value.trim().toLowerCase();
            const pw = $('#signupPassword').value;
            if (!name) return showToast('Please enter your name');
            if (!email) return showToast('Please enter your email');
            if (pw.length < 4) return showToast('Password must be at least 4 characters');

            console.log('Moving to step 2');
            step1.style.display = 'none';
            step2.style.display = 'block';
            buildSubjectGrids(examType);
        });

        backStep1.addEventListener('click', () => {
            step2.style.display = 'none';
            step1.style.display = 'block';
        });

        // ── Subject selection state ──
        const mainSelected = new Set();
        const optionalSelected = new Set();

        function buildSubjectGrids(type) {
            console.log('Building grids for:', type);
            const allSubjects = type === 'OL' ? OL_SUBJECTS : AL_SUBJECTS;
            const isOL = type === 'OL';
            const mainGrid = $('#mainSubjectGrid');
            const optGrid = $('#optionalSubjectGrid');
            const countEl = $('#mainSelectionCount');
            const submitBtn = $('#signupSubmitBtn');
            if (!mainGrid || !optGrid) { console.error('Grids not found'); return; }
            const parent = mainGrid.closest('.subject-selection');
            const selLabel = parent ? parent.querySelector('.selection-label') : null;
            mainGrid.innerHTML = '';
            optGrid.innerHTML = '';
            mainSelected.clear();
            optionalSelected.clear();

            const pickCount = 3;
            countEl.textContent = `0 / ${pickCount} selected`;
            countEl.classList.remove('complete');
            submitBtn.disabled = true;

            // For OL: show compulsory subjects as locked auto-selected
            if (isOL) {
                const hdr = document.createElement('div');
                hdr.className = 'subject-group-header';
                hdr.textContent = 'Compulsory (auto-selected)';
                mainGrid.appendChild(hdr);

                OL_COMPULSORY.forEach(subj => {
                    const div = document.createElement('div');
                    div.className = 'subject-option selected locked';
                    div.innerHTML = `
                        <span class="subject-option-icon">${subj.icon}</span>
                        <span class="subject-option-label">${subj.label}</span>
                        <svg class="subject-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    `;
                    div.addEventListener('click', () => showToast('Compulsory subjects cannot be removed'));
                    mainGrid.appendChild(div);
                });

                // Separator
                const sep = document.createElement('div');
                sep.className = 'subject-group-header';
                sep.textContent = 'Choose 3 Elective Subjects';
                mainGrid.appendChild(sep);
            }

            function buildGrid(container, subjects, selectedSet, isMain) {
                let lastGroup = '';
                subjects.forEach(subj => {
                    if (subj.group && subj.group !== lastGroup) {
                        lastGroup = subj.group;
                        const hdr = document.createElement('div');
                        hdr.className = 'subject-group-header';
                        hdr.textContent = subj.group;
                        container.appendChild(hdr);
                    }
                    const div = document.createElement('div');
                    div.className = 'subject-option';
                    div.setAttribute('data-id', subj.id);
                    div.innerHTML = `
                        <span class="subject-option-icon">${subj.icon}</span>
                        <span class="subject-option-label">${subj.label}</span>
                        <svg class="subject-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    `;
                    div.addEventListener('click', () => {
                        if (selectedSet.has(subj.id)) {
                            selectedSet.delete(subj.id);
                            div.classList.remove('selected');
                        } else {
                            if (isMain && selectedSet.size >= pickCount) return showToast(`You can only select ${pickCount} elective subjects`);
                            selectedSet.add(subj.id);
                            div.classList.add('selected');
                        }
                        if (isMain) {
                            countEl.textContent = `${selectedSet.size} / ${pickCount} selected`;
                            submitBtn.disabled = selectedSet.size !== pickCount;
                            countEl.classList.toggle('complete', selectedSet.size === pickCount);
                        }
                    });
                    container.appendChild(div);
                });
            }

            buildGrid(mainGrid, allSubjects.filter(s => s.group !== 'Common'), mainSelected, true);
            buildGrid(optGrid, allSubjects.filter(s => s.group === 'Common'), optionalSelected, false);
        }

        // ── Signup submit ──
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = $('#signupName').value.trim();
            const email = $('#signupEmail').value.trim().toLowerCase();
            const pw = $('#signupPassword').value;
            if (mainSelected.size !== 3) return showToast('Please select exactly 3 subjects');

            const btn = signupForm.querySelector('button[type="submit"]');
            try {
                btn.disabled = true;
                console.log('Starting signup for:', email);

                // For OL: include compulsory subjects automatically
                const compulsoryIds = examType === 'OL' ? OL_COMPULSORY.map(s => s.id) : [];
                const allMain = [...compulsoryIds, ...mainSelected];

                const profile = {
                    name,
                    password: pw,
                    examType,
                    mainSubjects: allMain,
                    optionalSubjects: [...optionalSelected],
                };

                if (auth) {
                    console.log('Creating Firebase Auth user...');
                    try {
                        await auth.createUserWithEmailAndPassword(email, pw);
                    } catch (authErr) {
                        if (authErr.code === 'auth/email-already-in-use') {
                            throw new Error('An account with this email already exists in our database.');
                        }
                        throw authErr;
                    }
                    console.log('Saving Firestore profile...');
                    await saveProfileData(email, profile);
                } else {
                    console.warn('Firebase Auth missing, using local storage fallback');
                    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
                    users[email] = profile;
                    localStorage.setItem(USERS_KEY, JSON.stringify(users));
                }

                setSession(email);
                await syncProfile();
                window.location.replace('index.html');
            } catch (err) {
                console.error('Signup Error:', err);
                showToast(err.message || 'Signup failed');
                btn.disabled = false;
            }
        });
    }

    // ═══════════════════════════════════════
    //             HOME PAGE
    // ═══════════════════════════════════════
    function getSubjectDB() {
        const profile = getProfile();
        return profile.examType === 'OL' ? [...OL_COMPULSORY, ...OL_SUBJECTS] : AL_SUBJECTS;
    }

    function getUserSubjects() {
        const profile = getProfile();
        if (!profile) return { main: [], optional: [] };
        const db = getSubjectDB();
        const main = profile.mainSubjects.map((id, idx) => {
            const info = db.find(s => s.id === id) || { id, label: id, icon: '📘' };
            return { ...info, index: idx, accent: ACCENT_COLORS[idx] };
        });
        const optional = (profile.optionalSubjects || []).map((id, idx) => {
            const info = db.find(s => s.id === id) || { id, label: id, icon: '📘' };
            return { ...info, index: idx + 3, accent: OPTIONAL_ACCENT };
        });
        return { main, optional };
    }

    function getAllUserSubjects() {
        const { main, optional } = getUserSubjects();
        return [...main, ...optional];
    }

    function initHomePage() {
        const profile = getProfile();
        const greeting = $('#userGreeting');
        if (greeting && profile) greeting.textContent = `Hi, ${profile.name}`;

        const examBadge = $('#examBadge');
        if (examBadge && profile) { examBadge.textContent = profile.examType; }

        const logoutBtn = $('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (confirm('Logout? Your data is synced to the cloud.')) {
                    if (auth) await auth.signOut();
                    clearSession();
                    window.location.href = 'login.html';
                }
            });
        }

        buildHomeNav();
        buildHomeStats();
        renderHomeStats();
        renderHomeTable();
        renderHomeChart();

        const tabs = $('#chartTabs');
        if (tabs) {
            tabs.addEventListener('click', (e) => {
                const btn = e.target.closest('.tab');
                if (!btn) return;
                tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                currentRange = btn.dataset.range;
                renderHomeChart();
            });
        }
    }

    function buildHomeNav() {
        const nav = $('#subjectNav');
        if (!nav) return;
        const { main, optional } = getUserSubjects();
        const allSubjects = [...main, ...optional];

        let html = '';
        // Section header for main subjects
        html += '<div class="nav-section-label">Main Subjects</div>';
        main.forEach((s) => {
            html += subjectCardHTML(s);
        });
        if (optional.length > 0) {
            html += '<div class="nav-section-label optional-label">Optional Subjects</div>';
            optional.forEach((s) => {
                html += subjectCardHTML(s);
            });
        }
        nav.innerHTML = html;
    }

    function subjectCardHTML(s) {
        return `
            <a href="subject.html?s=${s.id}" class="subject-card" style="--card-accent: ${s.accent.color}; --card-accent-dim: ${s.accent.dim};">
                <div class="subject-card-icon" style="background: ${s.accent.dim}; color: ${s.accent.color};">
                    <span class="subject-emoji">${s.icon}</span>
                </div>
                <div class="subject-card-info">
                    <h3>${s.label}</h3>
                    <span class="subject-card-count">${loadScores(s.id).length} entries</span>
                </div>
                <svg class="subject-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
        `;
    }

    function buildHomeStats() {
        const row = $('#statsRow');
        if (!row) return;
        const { main } = getUserSubjects();
        row.innerHTML = main.map(s => `
            <div class="stat-card" style="--stat-color: ${s.accent.color};">
                <span class="stat-label">${s.icon} ${s.label} Avg</span>
                <span class="stat-value accent-value" id="avg-${s.id}">—</span>
            </div>
        `).join('');
    }

    function renderHomeStats() {
        const { main } = getUserSubjects();
        main.forEach(s => {
            const el = $(`#avg-${s.id}`);
            if (!el) return;
            const scores = loadScores(s.id).map(e => e.score);
            if (scores.length === 0) { el.textContent = '—'; return; }
            el.textContent = (scores.reduce((a, v) => a + v, 0) / scores.length).toFixed(1);
            el.style.color = isDark() ? s.accent.color : s.accent.colorLight;
        });
    }

    function renderHomeTable() {
        const body = $('#historyBody'), emptyMsg = $('#tableEmptyMsg');
        if (!body) return;
        const all = [];
        getAllUserSubjects().forEach(s => {
            loadScores(s.id).forEach(entry => { all.push({ ...entry, subject: s }); });
        });
        all.sort((a, b) => b.date.localeCompare(a.date));
        
        // Performance: Limit to 15 most recent for Home Page
        const recent = all.slice(0, 15);
        
        body.innerHTML = '';
        if (all.length === 0) { if (emptyMsg) emptyMsg.style.display = 'block'; return; }
        if (emptyMsg) emptyMsg.style.display = 'none';

        const fragment = document.createDocumentFragment();
        recent.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatDate(s.date)}</td>
                <td><span class="score-pill" style="background:${s.subject.accent.dim}; color:${isDark() ? s.subject.accent.color : s.subject.accent.colorLight}">${s.subject.label}</span></td>
                <td class="paper-col">${s.paper || '—'}</td>
                <td><strong>${s.score}</strong> / 100</td>
            `;
            fragment.appendChild(tr);
        });
        body.appendChild(fragment);
    }

    // ── Home Chart ──
    function getFilteredScores(subjectId, range) {
        const scores = loadScores(subjectId);
        const now = new Date();
        let start;
        if (range === 'month') start = new Date(now.getFullYear(), now.getMonth(), 1);
        else if (range === '3months') start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        else start = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
        return scores.filter(s => new Date(s.date + 'T00:00:00') >= start);
    }

    function aggregateByMonth(data) {
        const buckets = {};
        data.forEach(s => { const k = s.date.substring(0, 7); if (!buckets[k]) buckets[k] = []; buckets[k].push(s.score); });
        const sorted = Object.keys(buckets).sort();
        return {
            labels: sorted.map(k => new Date(k + '-01T00:00:00').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })),
            values: sorted.map(k => { const a = buckets[k]; return +(a.reduce((s, v) => s + v, 0) / a.length).toFixed(1); }),
        };
    }

    function renderHomeChart() {
        const emptyMsg = $('#chartEmptyMsg');
        const { main } = getUserSubjects(); // Only chart main subjects

        const allLabelsSet = new Set();
        const subjData = {};
        main.forEach(s => {
            const filtered = getFilteredScores(s.id, currentRange);
            if (currentRange === 'month') {
                subjData[s.id] = { labels: filtered.map(e => formatDateShort(e.date)), values: filtered.map(e => e.score), raw: filtered };
            } else { subjData[s.id] = aggregateByMonth(filtered); }
            subjData[s.id].labels.forEach(l => allLabelsSet.add(l));
        });

        let unifiedLabels;
        if (currentRange === 'month') {
            const pairs = [];
            main.forEach(s => { getFilteredScores(s.id, currentRange).forEach(e => { if (!pairs.find(p => p.date === e.date)) pairs.push({ date: e.date, label: formatDateShort(e.date) }); }); });
            pairs.sort((a, b) => a.date.localeCompare(b.date));
            unifiedLabels = pairs.map(p => p.label);
        } else { unifiedLabels = [...allLabelsSet].sort(); }

        const datasets = main.map(s => {
            const d = subjData[s.id]; const valMap = {};
            if (currentRange === 'month') { d.raw.forEach(e => { valMap[formatDateShort(e.date)] = e.score; }); }
            else { d.labels.forEach((l, i) => { valMap[l] = d.values[i]; }); }
            return { label: s.label, data: unifiedLabels.map(l => valMap[l] ?? null), borderColor: isDark() ? s.accent.color : s.accent.colorLight, backgroundColor: s.accent.dim, borderWidth: 2.5, pointRadius: 5, pointHoverRadius: 8, pointBackgroundColor: isDark() ? s.accent.color : s.accent.colorLight, pointBorderColor: isDark() ? '#111827' : '#ffffff', pointBorderWidth: 2, tension: 0.35, fill: true };
        });
        drawChart(unifiedLabels, datasets, emptyMsg);
    }

    function renderChart() { if (page === 'home') renderHomeChart(); else if (page === 'subject') renderSubjectChart(); }

    function drawChart(labels, datasets, emptyMsg) {
        const hasData = datasets.some(ds => ds.data.some(v => v !== null));
        if (!hasData || labels.length === 0) { if (emptyMsg) emptyMsg.style.display = 'block'; if (chart) { chart.destroy(); chart = null; } return; }
        if (emptyMsg) emptyMsg.style.display = 'none';
        const gc = isDark() ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
        const tc = isDark() ? '#94a3b8' : '#64748b';
        const config = {
            type: 'line', data: { labels, datasets },
            options: {
                responsive: true, maintainAspectRatio: false, spanGaps: true, interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { color: tc, font: { family: "'Inter',sans-serif", size: 12, weight: 500 }, usePointStyle: true, pointStyle: 'circle', padding: 20 } },
                    tooltip: { backgroundColor: isDark() ? '#1e293b' : '#fff', titleColor: isDark() ? '#f1f5f9' : '#1e293b', bodyColor: isDark() ? '#cbd5e1' : '#475569', borderColor: isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderWidth: 1, cornerRadius: 12, padding: 12, titleFont: { family: "'Inter'" }, bodyFont: { family: "'Inter'" }, displayColors: true, boxPadding: 4 },
                },
                scales: { y: { beginAtZero: true, max: 100, grid: { color: gc }, ticks: { color: tc, padding: 8 }, border: { display: false } }, x: { grid: { display: false }, ticks: { color: tc, padding: 8 }, border: { display: false } } },
                animation: { duration: 600, easing: 'easeOutQuart' },
            },
        };
        if (chart) { chart.data = config.data; chart.options = config.options; chart.update('active'); }
        else { const ctx = $('#scoreChart'); if (ctx) chart = new Chart(ctx.getContext('2d'), config); }
    }

    // ═══════════════════════════════════════
    //           SUBJECT PAGE
    // ═══════════════════════════════════════
    function initSubjectPage() {
        const params = new URLSearchParams(window.location.search);
        const subjId = params.get('s');
        const allSubjects = getAllUserSubjects();
        const subj = allSubjects.find(s => s.id === subjId);

        if (!subj) { window.location.href = 'index.html'; return; }
        const accent = subj.accent;

        const titleEl = $('#subjectTitle');
        if (titleEl) { titleEl.textContent = subj.label; titleEl.style.background = accent.gradient; titleEl.style.webkitBackgroundClip = 'text'; titleEl.style.webkitTextFillColor = 'transparent'; titleEl.style.backgroundClip = 'text'; }
        document.title = `${subj.label} — ScoreTracker 27`;
        const formTitle = $('#formTitle');
        if (formTitle) formTitle.textContent = `Add ${subj.label} Score`;

        buildSubjectStats(accent);
        const scoreForm = $('#scoreForm'), dateEl = $('#scoreDate'), valEl = $('#scoreValue'), paperEl = $('#paperName'), submitBtn = $('#submitBtn');
        dateEl.value = new Date().toISOString().split('T')[0];
        submitBtn.style.background = accent.gradient;
        submitBtn.style.boxShadow = `0 4px 15px ${accent.dim}`;

        scoreForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = dateEl.value, score = parseInt(valEl.value, 10), paper = paperEl.value.trim();
            if (!date) return showToast('Please select a date');
            if (isNaN(score) || score < 0 || score > 100) return showToast('Score must be between 0 and 100');
            const scores = loadScores(subj.id);
            const existIdx = scores.findIndex(s => s.date === date && s.paper === paper);
            if (existIdx !== -1) { scores[existIdx].score = score; showToast('Score updated'); }
            else { scores.push({ date, score, paper: paper || '' }); showToast('Score added'); }
            scores.sort((a, b) => a.date.localeCompare(b.date));
            saveScores(subj.id, scores);
            valEl.value = ''; paperEl.value = '';
            renderSubjectAll(subj, accent);
        });

        const tabs = $('#chartTabs');
        if (tabs) { tabs.addEventListener('click', (e) => { const btn = e.target.closest('.tab'); if (!btn) return; tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active')); btn.classList.add('active'); currentRange = btn.dataset.range; renderSubjectChart(subj, accent); }); }

        renderSubjectAll(subj, accent);
        window._subj = subj; window._accent = accent;
    }

    function buildSubjectStats(accent) {
        const row = $('#subjectStats'); if (!row) return;
        row.innerHTML = `
            <div class="stat-card"><span class="stat-label">Average</span><span class="stat-value accent-value" id="subjectAvg" style="color:${accent.color}">—</span></div>
            <div class="stat-card"><span class="stat-label">Highest</span><span class="stat-value accent-value" id="subjectHigh" style="color:${accent.color}">—</span></div>
            <div class="stat-card"><span class="stat-label">Lowest</span><span class="stat-value accent-value" id="subjectLow" style="color:${accent.color}">—</span></div>
            <div class="stat-card"><span class="stat-label">Entries</span><span class="stat-value" id="subjectCount">0</span></div>
        `;
    }

    function renderSubjectAll(subj, accent) { if (!subj) { subj = window._subj; accent = window._accent; } renderSubjectStats(subj); renderSubjectTable(subj, accent); renderSubjectChart(subj, accent); }

    function renderSubjectStats(subj) {
        const scores = loadScores(subj.id).map(e => e.score);
        const avgEl = $('#subjectAvg'), highEl = $('#subjectHigh'), lowEl = $('#subjectLow'), countEl = $('#subjectCount');
        if (countEl) countEl.textContent = scores.length;
        if (scores.length === 0) { [avgEl, highEl, lowEl].forEach(el => { if (el) el.textContent = '—'; }); return; }
        if (avgEl) avgEl.textContent = (scores.reduce((s, v) => s + v, 0) / scores.length).toFixed(1);
        if (highEl) highEl.textContent = Math.max(...scores);
        if (lowEl) lowEl.textContent = Math.min(...scores);
    }

    function renderSubjectTable(subj, accent) {
        const body = $('#historyBody'), emptyMsg = $('#tableEmptyMsg'); if (!body) return;
        const scores = loadScores(subj.id); body.innerHTML = '';
        if (scores.length === 0) { if (emptyMsg) emptyMsg.style.display = 'block'; return; }
        if (emptyMsg) emptyMsg.style.display = 'none';
        
        const fragment = document.createDocumentFragment();
        [...scores].reverse().forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${formatDate(s.date)}</td><td class="paper-col">${s.paper || '—'}</td><td><span class="score-pill" style="background:${accent.dim}; color:${isDark() ? accent.color : accent.colorLight}">${s.score}</span></td><td><button class="btn-delete" data-date="${s.date}" data-paper="${s.paper || ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></td>`;
            fragment.appendChild(tr);
        });
        body.appendChild(fragment);

        body.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                let scores = loadScores(subj.id);
                const i = scores.findIndex(s => s.date === btn.dataset.date && (s.paper || '') === btn.dataset.paper);
                if (i !== -1) scores.splice(i, 1);
                saveScores(subj.id, scores); showToast('Deleted');
                renderSubjectAll(subj, accent);
            });
        });
    }

    function renderSubjectChart(subj, accent) {
        if (!subj) { subj = window._subj; accent = window._accent; }
        const emptyMsg = $('#chartEmptyMsg');
        const filtered = getFilteredScores(subj.id, currentRange);
        let labels, values;
        if (currentRange === 'month') { labels = filtered.map(e => formatDateShort(e.date)); values = filtered.map(e => e.score); }
        else { const agg = aggregateByMonth(filtered); labels = agg.labels; values = agg.values; }
        drawChart(labels, [{ label: subj.label, data: values, borderColor: isDark() ? accent.color : accent.colorLight, backgroundColor: accent.dim, borderWidth: 2.5, pointRadius: 5, pointHoverRadius: 8, pointBackgroundColor: isDark() ? accent.color : accent.colorLight, pointBorderColor: isDark() ? '#111827' : '#fff', pointBorderWidth: 2, tension: 0.35, fill: true }], emptyMsg);
    }

})();
