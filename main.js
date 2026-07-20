// ====================================================================
// main.js — Git Analysis Plugin (ПОЛНАЯ ВЕРСИЯ)
// ====================================================================

const { Plugin, Notice, Modal, PluginSettingTab, Setting } = require('obsidian');
const path = require('path');
const fs = require('fs');

// ====================================================================
// LOCALE MANAGER
// ====================================================================
class LocaleManager {
    constructor(plugin) {
        this.plugin = plugin;
        this.currentLang = 'ru';
        this.translations = {};
        this.loadedLangs = new Set();
    }

    async loadLanguage(lang) {
        if (this.loadedLangs.has(lang)) return;
        const localePath = path.join(this.plugin.manifest.dir, 'locales', `${lang}.json`);
        try {
            if (fs.existsSync(localePath)) {
                const data = fs.readFileSync(localePath, 'utf8');
                this.translations[lang] = JSON.parse(data);
                this.loadedLangs.add(lang);
            } else {
                if (lang === 'en') this.createFallbackEN();
                if (lang === 'ru') this.createFallbackRU();
            }
        } catch (e) {
            if (lang === 'en') this.createFallbackEN();
            if (lang === 'ru') this.createFallbackRU();
        }
    }

    createFallbackEN() {
        this.translations['en'] = {
            "pluginName": "Git Analysis", "pluginLoaded": "🚀 Git analysis ready!",
            "missingGit": "⚠️ Git not found!", "openAnalysis": "Open Git Analysis",
            "title": "📊 Git Repository Analysis", "startButton": "🚀 Run Git Analysis",
            "welcome": "Click the button below to analyze the Git history of your Markdown files.",
            "fullscreen": "Fullscreen", "collapse": "Collapse", "close": "Close",
            "progressInit": "⏳ Initializing...", "progressLog": "⏳ Fetching Git log...",
            "logError": "❌ Git error: ", "logReceived": "✅ Log received",
            "progressParse": "⏳ Parsing...", "progressMap": "⏳ Building move map...",
            "progressStats": "⏳ Generating statistics...", "ready": "✅ Done!",
            "notGitRepo": "❌ Vault is not a Git repository!", "noHistory": "ℹ️ No commit history found.",
            "exportButton": "📄 Export to file", "saved": "✅ Saved!", "saveError": "❌ Save error: ",
            "noDataExport": "❌ No data to export", "heatmapTitle": "📊 Heatmap",
            "folderTitle": "📁 Folders", "totalFiles": "Total files", "symbols": "symbols",
            "reportTitle": "📋 Detailed Report", "btnToday": "📅 Today", "btnWeek": "📆 Week",
            "btnMonth": "🗓 Month", "btnAll": "📊 All", "btnInterval": "📅 Apply",
            "btnShow": "🔍 Show", "btnCopy": "📋 Copy", "copied": "✅ Copied!",
            "dayStats": "📊 Statistics for", "newFiles": "🟢 New files",
            "movedFiles": "🔄 Moved files", "deletedFiles": "❌ Deleted files",
            "noChanges": "no changes", "folderError": "❌ Scan error",
            "langSetting": "Interface language", "langDesc": "Select plugin language",
            "hotkeySetting": "Hotkey", "hotkeyDesc": "Use Obsidian hotkeys for plugin commands",
            "daysWithActivity": "📅 Days with activity", "newFilesTotal": "📄 New files",
            "totalSymbols": "📊 Total symbols", "less": "Less", "more": "More",
            "fileSaved": "✅ Saved: ", "parseProgress": "Parsing:",
            "statsProgress": "Statistics:", "root": "Root",
            "themeSetting": "Color theme", "themeDesc": "Select light or dark theme"
        };
        this.loadedLangs.add('en');
    }

    createFallbackRU() {
        this.translations['ru'] = {
            "pluginName": "Git-анализ", "pluginLoaded": "🚀 Git-анализ готов!",
            "missingGit": "⚠️ Git не найден!", "openAnalysis": "Открыть Git-анализ",
            "title": "📊 Git-анализ хранилища", "startButton": "🚀 Запустить анализ Git",
            "welcome": "Нажмите кнопку ниже, чтобы проанализировать Git‑историю ваших Markdown‑файлов.",
            "fullscreen": "На весь экран", "collapse": "Свернуть", "close": "Закрыть",
            "progressInit": "⏳ Инициализация...", "progressLog": "⏳ Получение лога Git...",
            "logError": "❌ Ошибка Git: ", "logReceived": "✅ Лог получен",
            "progressParse": "⏳ Парсинг...", "progressMap": "⏳ Карта перемещений...",
            "progressStats": "⏳ Статистика...", "ready": "✅ Готово!",
            "notGitRepo": "❌ Хранилище не Git-репозиторий!", "noHistory": "ℹ️ Нет истории коммитов.",
            "exportButton": "📄 Выгрузить в файл", "saved": "✅ Сохранено!",
            "saveError": "❌ Ошибка сохранения: ", "noDataExport": "❌ Нет данных для экспорта",
            "heatmapTitle": "📊 Тепловая карта", "folderTitle": "📁 Папки (текущие файлы)",
            "totalFiles": "Всего файлов", "symbols": "символов",
            "reportTitle": "📋 Детальный отчёт", "btnToday": "📅 Сегодня",
            "btnWeek": "📆 Неделя", "btnMonth": "🗓 Месяц", "btnAll": "📊 Весь объём",
            "btnInterval": "📅 Применить", "btnShow": "🔍 Показать", "btnCopy": "📋 Копировать",
            "copied": "✅ Скопировано!", "dayStats": "📊 Статистика за",
            "newFiles": "🟢 Новые файлы", "movedFiles": "🔄 Перемещённые файлы",
            "deletedFiles": "❌ Удалённые файлы", "noChanges": "нет изменений",
            "folderError": "❌ Ошибка сканирования", "langSetting": "Язык интерфейса",
            "langDesc": "Выберите язык плагина", "hotkeySetting": "Горячая клавиша",
            "hotkeyDesc": "Используйте стандартные горячие клавиши Obsidian",
            "daysWithActivity": "📅 Дней с активностью", "newFilesTotal": "📄 Новых файлов",
            "totalSymbols": "📊 Всего символов", "less": "Меньше", "more": "Больше",
            "fileSaved": "✅ Сохранено: ", "parseProgress": "Парсинг:",
            "statsProgress": "Статистика:", "root": "Корень",
            "themeSetting": "Цветовая тема", "themeDesc": "Выберите светлую или тёмную тему"
        };
        this.loadedLangs.add('ru');
    }

    setLanguage(lang) { if (this.translations[lang]) this.currentLang = lang; }

    t(key) {
        if (this.translations[this.currentLang]?.[key]) return this.translations[this.currentLang][key];
        if (this.translations['en']?.[key]) return this.translations['en'][key];
        return key;
    }
}

// ====================================================================
// MODAL
// ====================================================================
class GitAnalysisModal extends Modal {
    constructor(app, plugin) {
        super(app);
        this.plugin = plugin;
        this.isFullscreen = false;
        this.heatmapTheme = 'dark';
        this.stats = null;
        this.reportStats = null;
        this.YEAR = window.moment().format('YYYY');
        this.MAX_INTENSITY = 9;
        this.exportBtn = null;
    }

    t(key) { return this.plugin.localeManager.t(key); }

    async onOpen() {
        const { contentEl } = this;
        contentEl.addClass('git-analysis-modal');

        const overlay = this.modalEl.parentElement;
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }, true);
        }

        // ---------- ЗАГОЛОВОК С КНОПКОЙ РАЗВОРАЧИВАНИЯ ----------
        this.titleEl.setText(this.t('title'));
        this.titleEl.addClass('modal-title');

        const fullscreenBtn = this.titleEl.createEl('button');
        fullscreenBtn.innerHTML = '⛶';
        fullscreenBtn.title = this.t('fullscreen');
        fullscreenBtn.addClass('ga-header-btn');
        fullscreenBtn.onclick = () => {
            this.isFullscreen = !this.isFullscreen;
            if (this.isFullscreen) {
                this.modalEl.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;max-width:100vw;max-height:100vh;margin:0;border-radius:0;z-index:1000;';
                fullscreenBtn.innerHTML = '✕';
                fullscreenBtn.title = this.t('collapse');
            } else {
                this.modalEl.style.cssText = '';
                fullscreenBtn.innerHTML = '⛶';
                fullscreenBtn.title = this.t('fullscreen');
            }
        };

        const body = contentEl.createDiv();
        body.addClass('ga-body');

        const topContainer = body.createDiv();
        topContainer.id = 'top-container';
        topContainer.style.cssText = 'flex-shrink:0;text-align:center;';

        const welcomeDiv = topContainer.createDiv();
        welcomeDiv.id = 'welcome-screen';
        welcomeDiv.addClass('ga-welcome');

        const welcomeIcon = welcomeDiv.createDiv();
        welcomeIcon.innerHTML = '📊';
        welcomeIcon.addClass('ga-welcome-icon');

        const welcomeText = welcomeDiv.createEl('p', { text: this.t('welcome') });
        welcomeText.addClass('ga-welcome-text');

        const btn = welcomeDiv.createEl('button', { text: this.t('startButton') });
        btn.addClass('ga-btn-primary');

        const indicator = topContainer.createDiv();
        indicator.id = 'progress-indicator';
        indicator.addClass('ga-progress');
        indicator.style.display = 'none';

        const lowerArea = body.createDiv();
        lowerArea.id = 'lower-area';
        lowerArea.addClass('ga-lower-area');
        lowerArea.style.display = 'none';

        const scrollContainer = lowerArea.createDiv();
        scrollContainer.id = 'scroll-container';
        scrollContainer.addClass('ga-scroll-container');

        const folderContainer = lowerArea.createDiv();
        folderContainer.id = 'folder-container';
        folderContainer.addClass('ga-folder-container');

        btn.onclick = async () => {
            welcomeDiv.style.display = 'none';
            indicator.style.display = 'block';
            indicator.textContent = this.t('progressInit');
            try {
                await this.runAnalysis(topContainer, indicator, scrollContainer, folderContainer, lowerArea);
            } catch (err) {
                indicator.textContent = '❌ ' + err.message;
                welcomeDiv.style.display = 'flex';
                indicator.style.display = 'none';
                console.error('Git Analysis error:', err);
            }
        };
    }

    // ======================== АНАЛИЗ ========================
    async runAnalysis(topContainer, indicator, scrollContainer, folderContainer, lowerArea) {
        const { execSync, execFileSync } = require('child_process');
        const fs = require('fs');
        const path = require('path');
        const vaultPath = this.app.vault.adapter.basePath;

        if (!window.moment) {
            indicator.textContent = '❌ Moment.js not available';
            return;
        }
        const YEAR = this.YEAR;
        const SHOW_SYMBOLS = true;
        const updateStatus = (text) => { indicator.textContent = text; };

        try {
            execSync(`git -C "${vaultPath}" rev-parse --git-dir`, { stdio: 'ignore' });
        } catch {
            updateStatus(this.t('notGitRepo'));
            return;
        }

        updateStatus(this.t('progressLog'));
        let gitOutput = '';
        try {
            gitOutput = execSync(
                `git -c core.quotepath=false -C "${vaultPath}" log --diff-filter=ACDR --find-renames --format="%aI %H" --name-status -- "*.md"`,
                { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }
            );
        } catch (e) {
            updateStatus(this.t('logError') + e.message);
            return;
        }
        if (!gitOutput.trim()) {
            updateStatus(this.t('noHistory'));
            return;
        }
        updateStatus(`${this.t('logReceived')} (${(gitOutput.length / 1024).toFixed(1)} KB)`);

        updateStatus(this.t('progressParse'));
        const lines = gitOutput.split('\n').filter(l => l.trim());
        const rawRecords = {};
        const allMoves = [];
        let currentDate = null, currentCommit = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (i % 200 === 0) {
                updateStatus(`${this.t('parseProgress')} ${Math.round((i / lines.length) * 100)}%`);
                await new Promise(r => setTimeout(r, 1));
            }
            const dateMatch = line.match(/^(\d{4}-\d{2}-\d{2})T/);
            if (dateMatch) {
                currentDate = dateMatch[1];
                currentCommit = line.split(/\s+/)[1] || null;
                const fileDate = window.moment(currentDate);
                if (!fileDate.isValid() || fileDate.format('YYYY') !== YEAR) {
                    currentDate = null;
                    continue;
                }
                const dayKey = fileDate.format('YYYY-MM-DD');
                if (!rawRecords[dayKey]) rawRecords[dayKey] = [];
                continue;
            }
            if (!currentDate) continue;

            const parts = line.split('\t');
            if (parts.length < 2) continue;
            const [status, file1, file2] = parts;
            if (!file1.endsWith('.md') && (file2 && !file2.endsWith('.md'))) continue;

            const dayKey = window.moment(currentDate).format('YYYY-MM-DD');
            if (status === 'A') {
                rawRecords[dayKey].push({ type: 'A', file: file1, commit: currentCommit, date: currentDate, order: i });
            } else if (status.startsWith('R') && file2) {
                const rec = { type: 'R', oldFile: file1, newFile: file2, commit: currentCommit, date: currentDate, order: i };
                rawRecords[dayKey].push(rec);
                allMoves.push(rec);
            } else if (status === 'D') {
                rawRecords[dayKey].push({ type: 'D', file: file1, commit: currentCommit, date: currentDate, order: i });
            }
        }

        updateStatus(this.t('progressMap'));
        const moveMap = {};
        const moveChain = {};
        allMoves.sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);
        for (const mv of allMoves) {
            moveMap[mv.oldFile] = {
                newPath: mv.newFile,
                day: window.moment(mv.date).format('YYYY-MM-DD'),
                commit: mv.commit
            };
        }

        function getFinalPath(filePath) {
            let current = filePath;
            const visited = new Set();
            const chain = [filePath];
            while (moveMap[current] && !visited.has(current)) {
                visited.add(current);
                current = moveMap[current].newPath;
                chain.push(current);
            }
            return { finalPath: current, chain };
        }

        for (const oldPath of Object.keys(moveMap)) {
            moveChain[oldPath] = getFinalPath(oldPath);
        }

        updateStatus(this.t('progressStats'));
        const stats = {};
        let grandTotalFiles = 0, grandTotalSymbols = 0;

        const countSym = (ch, fp) => {
            if (!ch || !fp) return 0;
            try {
                return execFileSync('git', ['-C', vaultPath, 'show', `${ch}:${fp}`], {
                    encoding: 'utf8', maxBuffer: 10 * 1024 * 1024,
                    stdio: ['pipe', 'pipe', 'ignore']
                }).length;
            } catch { return 0; }
        };

        for (const [day, records] of Object.entries(rawRecords)) {
            records.sort((a, b) => a.order - b.order);
            const dayStats = {
                files: 0,
                totalSymbols: 0,
                movedSymbols: 0,
                dirs: {},
                added: [],
                moved: [],
                deleted: []
            };

            for (const rec of records) {
                if (rec.type === 'D') {
                    const sym = SHOW_SYMBOLS ? countSym(rec.commit, rec.file) : 0;
                    dayStats.deleted.push({ path: rec.file, symbols: sym, hash: rec.commit });
                }
            }

            for (const rec of records) {
                if (rec.type === 'R') {
                    const sym = SHOW_SYMBOLS ? countSym(rec.commit, rec.newFile) : 0;
                    if (rec.newFile.includes('.trash/')) {
                        dayStats.deleted.push({ path: rec.newFile, symbols: sym, hash: rec.commit });
                        continue;
                    }
                    if (records.some(r => r.type === 'A' && r.file === rec.oldFile && r.order < rec.order)) continue;
                    const chain = moveChain[rec.oldFile] || { finalPath: rec.newFile, chain: [rec.oldFile, rec.newFile] };
                    dayStats.movedSymbols += sym;
                    dayStats.moved.push({
                        oldPath: rec.oldFile,
                        newPath: rec.newFile,
                        chain: chain.chain,
                        finalPath: chain.finalPath,
                        symbols: sym,
                        hash: rec.commit
                    });
                }
            }

            for (const rec of records) {
                if (rec.type === 'A') {
                    if (rec.file.includes('.trash/')) {
                        const sym = SHOW_SYMBOLS ? countSym(rec.commit, rec.file) : 0;
                        dayStats.deleted.push({ path: rec.file, symbols: sym, hash: rec.commit });
                        continue;
                    }

                    const chainData = moveChain[rec.file];
                    let finalPath = null, chain = null, isMoved = false;
                    if (chainData && chainData.chain && chainData.chain.length > 1) {
                        finalPath = chainData.finalPath;
                        chain = chainData.chain;
                        isMoved = true;
                    }

                    const sameDayMove = records.find(r =>
                        r.type === 'R' &&
                        r.oldFile === rec.file &&
                        r.order > rec.order &&
                        !r.newFile.includes('.trash/')
                    );
                    if (sameDayMove) {
                        isMoved = true;
                        finalPath = sameDayMove.newFile;
                        chain = [rec.file, sameDayMove.newFile];
                    }

                    const sym = SHOW_SYMBOLS ? countSym(rec.commit, rec.file) : 0;
                    dayStats.files++;
                    dayStats.totalSymbols += sym;
                    grandTotalFiles++;
                    grandTotalSymbols += sym;

                    const idx = rec.file.lastIndexOf('/');
                    const dir = idx > 0 ? rec.file.substring(0, idx) : '/';
                    const name = idx > 0 ? rec.file.substring(idx + 1) : rec.file;

                    if (!dayStats.dirs[dir]) dayStats.dirs[dir] = { files: 0, symbols: 0, items: [] };
                    dayStats.dirs[dir].files++;
                    dayStats.dirs[dir].symbols += sym;
                    dayStats.dirs[dir].items.push({
                        name, symbols: sym, path: rec.file,
                        finalPath, chain, isMoved,
                        hash: rec.commit, status: 'A'
                    });

                    dayStats.added.push({
                        path: rec.file, finalPath, chain, isMoved,
                        symbols: sym, hash: rec.commit
                    });
                }
            }

            stats[day] = dayStats;
        }

        this.stats = stats;
        this.reportStats = {
            YEAR,
            totalDays: Object.keys(stats).length,
            grandTotalFiles,
            grandTotalSymbols,
            stats
        };

        updateStatus(this.t('ready'));

        const totalDays = this.reportStats.totalDays;
        const symStr = grandTotalSymbols > 1e6 ? (grandTotalSymbols / 1e6).toFixed(1) + 'M' :
                      grandTotalSymbols > 1e3 ? (grandTotalSymbols / 1e3).toFixed(1) + 'K' :
                      grandTotalSymbols;

        let topHtml = `<div class="ga-cards-grid">
            <div class="ga-card ga-card-primary"><div style="font-size:12px;opacity:0.9;">${this.t('daysWithActivity')}</div><div style="font-size:28px;font-weight:bold;">${totalDays}</div></div>
            <div class="ga-card ga-card-pink"><div style="font-size:12px;opacity:0.9;">${this.t('newFilesTotal')}</div><div style="font-size:28px;font-weight:bold;">${grandTotalFiles}</div></div>
            <div class="ga-card ga-card-teal"><div style="font-size:12px;opacity:0.7;">${this.t('totalSymbols')}</div><div style="font-size:28px;font-weight:bold;">${symStr}</div></div>
        </div>`;
        topHtml += this.renderHeatmap(stats, YEAR);
        topContainer.innerHTML = topHtml;

        lowerArea.style.display = 'flex';
        scrollContainer.innerHTML = '<div id="report-section"></div>';
        folderContainer.innerHTML = this.renderFolderTree();

        this.initHeatmapHandlers(topContainer);
        this.initReports();
        this.bindExportButton(topContainer);

        setTimeout(() => { indicator.style.display = 'none'; }, 2000);
    }

    // ======================== ТЕПЛОВАЯ КАРТА ========================
    renderHeatmap(stats, YEAR) {
        const today = window.moment();
        const isDark = this.heatmapTheme === 'dark';

        const darkColors = [
            'rgba(255,255,255,0.05)', 'rgba(34,139,34,0.2)', 'rgba(34,139,34,0.35)',
            'rgba(34,139,34,0.5)', 'rgba(46,160,67,0.6)', 'rgba(46,160,67,0.7)',
            'rgba(57,211,83,0.75)', 'rgba(57,211,83,0.85)', 'rgba(63,185,80,0.9)', 'rgba(63,185,80,1)'
        ];
        const lightColors = [
            '#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127',
            '#0e4429', '#006d32', '#26a641', '#39d353', '#1b5e20'
        ];
        const colors = isDark ? darkColors : lightColors;
        const getColor = (intensity) => colors[Math.min(intensity, 9)];

        let html = '<div class="ga-heatmap">';
        html += '<div class="ga-heatmap-header">';
        html += `<h3 style="color:var(--text-normal);margin:0;">${this.t('heatmapTitle')} (${YEAR})</h3>`;
        html += '<div style="display:flex;gap:12px;align-items:center;">';
        html += `<button id="btn-export-heatmap" class="ga-btn-export">${this.t('exportButton')}</button>`;
        html += '<div class="ga-theme-toggle">';
        html += `<button class="ga-theme-btn heatmap-theme-btn ${this.heatmapTheme === 'light' ? 'active' : ''}" data-theme="light">☀️</button>`;
        html += `<button class="ga-theme-btn heatmap-theme-btn ${this.heatmapTheme === 'dark' ? 'active' : ''}" data-theme="dark">🌙</button>`;
        html += '</div></div></div>';

        html += '<div class="ga-heatmap-grid">';
        for (let m = 0; m < 12; m++) {
            const monthStart = window.moment().year(YEAR).month(m).startOf('month');
            const isCurrentMonth = today.month() === m && today.year() === parseInt(YEAR);

            html += `<div class="ga-heatmap-month${isCurrentMonth ? ' current' : ''}">`;
            html += `<div class="ga-heatmap-month-name${isCurrentMonth ? ' current' : ''}">${monthStart.format('MMM')}</div>`;
            html += '<div class="ga-heatmap-days">';

            for (let d = 1; d <= monthStart.daysInMonth(); d++) {
                const day = monthStart.date(d).format('YYYY-MM-DD');
                const data = stats[day];
                const intensity = data ? Math.min(data.files, this.MAX_INTENSITY) : 0;
                const isToday = day === today.format('YYYY-MM-DD');

                html += `<div class="ga-heatmap-cell${isToday ? ' today' : ''}" style="background:${getColor(intensity)};" title="${day}: ${data ? data.files + ' files' : 'none'}" data-day="${day}"></div>`;
            }

            html += '</div></div>';
        }
        html += '</div>';

        html += `<div style="display:flex;align-items:center;gap:6px;font-size:10px;justify-content:center;margin-top:12px;color:var(--text-muted);"><span>${this.t('less')}</span>`;
        for (let i = 0; i < 10; i++) {
            html += `<div style="width:14px;height:14px;background:${getColor(i)};border-radius:3px;border:1px solid var(--ga-cell-border);"></div>`;
        }
        html += `<span>${this.t('more')}</span></div></div>`;

        return html;
    }

    getHeatmapColor(intensity) {
        const isDark = this.heatmapTheme === 'dark';
        const darkColors = [
            'rgba(255,255,255,0.05)', 'rgba(34,139,34,0.2)', 'rgba(34,139,34,0.35)',
            'rgba(34,139,34,0.5)', 'rgba(46,160,67,0.6)', 'rgba(46,160,67,0.7)',
            'rgba(57,211,83,0.75)', 'rgba(57,211,83,0.85)', 'rgba(63,185,80,0.9)', 'rgba(63,185,80,1)'
        ];
        const lightColors = [
            '#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127',
            '#0e4429', '#006d32', '#26a641', '#39d353', '#1b5e20'
        ];
        const colors = isDark ? darkColors : lightColors;
        return colors[Math.min(intensity, 9)];
    }

    bindExportButton(container) {
        const btn = container.querySelector('#btn-export-heatmap');
        if (btn) {
            btn.onclick = () => this.exportToFile();
            this.exportBtn = btn;
        }
    }

    initHeatmapHandlers(container) {
        container.querySelectorAll('.heatmap-theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.heatmapTheme = btn.dataset.theme;
                const top = document.getElementById('top-container');
                top.innerHTML = this.renderHeatmap(this.stats, this.YEAR);
                this.initHeatmapHandlers(top);
                this.bindExportButton(top);
            });
        });

        container.querySelectorAll('[data-day]').forEach(cell => {
            cell.addEventListener('click', () => {
                const day = cell.getAttribute('data-day');
                this.showDayReport(day);
            });
        });
    }

    // ======================== ПАПКИ ========================
    renderFolderTree() {
        const fs = require('fs');
        const path = require('path');
        const vaultPath = this.app.vault.adapter.basePath;

        const getAllMdFiles = (dir) => {
            let results = [];
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    if (!entry.name.startsWith('.')) results = results.concat(getAllMdFiles(fullPath));
                } else if (entry.isFile() && entry.name.endsWith('.md')) {
                    results.push(fullPath);
                }
            }
            return results;
        };

        let allFiles = [];
        try {
            allFiles = getAllMdFiles(vaultPath);
        } catch {
            return `<p>${this.t('folderError')}</p>`;
        }

        const tree = { children: {}, files: 0, symbols: 0 };
        for (const filePath of allFiles) {
            const relative = path.relative(vaultPath, filePath);
            const parts = relative.split(path.sep);
            parts.pop();
            let current = tree;
            for (const part of parts) {
                if (!current.children[part]) current.children[part] = { children: {}, files: 0, symbols: 0 };
                current = current.children[part];
                current.files++;
                try { current.symbols += fs.readFileSync(filePath, 'utf8').length; } catch {}
            }
            tree.files++;
            try { tree.symbols += fs.readFileSync(filePath, 'utf8').length; } catch {}
        }

        const accumulate = (node) => {
            let totalFiles = node.files || 0;
            let totalSymbols = node.symbols || 0;
            for (const child of Object.values(node.children)) {
                const childStats = accumulate(child);
                totalFiles += childStats.files;
                totalSymbols += childStats.symbols;
            }
            node.totalFiles = totalFiles;
            node.totalSymbols = totalSymbols;
            return { files: totalFiles, symbols: totalSymbols };
        };
        accumulate(tree);

        const totalFiles = tree.totalFiles || 0;
        const totalSymbols = tree.totalSymbols || 0;

        const renderNode = (node, name, level) => {
            const indent = level * 20;
            const percent = totalFiles > 0 ? (node.totalFiles / totalFiles * 100).toFixed(1) : 0;
            if (node.totalFiles === 0) return '';

            let html = `<div class="folder-tree-item" style="display:flex;align-items:center;gap:8px;padding-left:${indent}px;margin:2px 0;">`;
            html += `<div class="folder-tree-name" style="width:160px;font-size:11px;text-align:right;color:var(--text-normal);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${name}">${name}</div>`;
            html += `<div class="folder-tree-bar" style="flex:1;height:20px;background:var(--background-secondary);border-radius:4px;overflow:hidden;">`;
            html += `<div class="folder-tree-fill" style="height:100%;background:linear-gradient(90deg,var(--ga-primary),var(--ga-primary-dark));width:${Math.max(percent, 5)}%;display:flex;align-items:center;padding-left:6px;font-size:10px;color:white;">${node.totalFiles} (${(node.totalSymbols / 1000).toFixed(1)}K)</div>`;
            html += `</div><div class="folder-tree-stats" style="font-size:10px;color:var(--text-muted);width:40px;">${percent}%</div></div>`;

            const sortedChildren = Object.keys(node.children).sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));
            for (const childName of sortedChildren) {
                html += renderNode(node.children[childName], childName, level + 1);
            }
            return html;
        };

        let html = `<div><h3>${this.t('folderTitle')}</h3>`;
        html += `<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">${this.t('totalFiles')}: ${totalFiles}, ${this.t('symbols')}: ${totalSymbols.toLocaleString()}</div>`;
        html += '<div style="display:flex;flex-direction:column;gap:2px;">';

        if (tree.files > 0) {
            html += renderNode({ children: tree.children, totalFiles: tree.files, totalSymbols: tree.symbols }, this.t('root'), 0);
        }
        const rootChildren = Object.keys(tree.children).sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));
        for (const name of rootChildren) {
            html += renderNode(tree.children[name], name, 0);
        }

        html += '</div></div>';
        return html;
    }

    // ======================== ГЕНЕРАТОР ОТЧЁТА ЗА ДЕНЬ ========================
    generateDayReportHTML(day, d) {
        if (!d) return `<p>📅 ${day} — ${this.t('noChanges')}</p>`;
        const movedSize = d.moved.reduce((s, m) => s + m.symbols, 0);
        const deletedSize = d.deleted.reduce((s, d) => s + d.symbols, 0);
        let html = `<h4>${this.t('dayStats')} ${day}</h4>`;
        html += `<div class="ga-report-summary">`;
        html += `<span>📄 <strong>${d.files}</strong> ${this.t('newFiles')}</span>`;
        if (d.totalSymbols > 0) html += ` | 📊 <strong>${d.totalSymbols.toLocaleString()}</strong> ${this.t('symbols')}`;
        html += ` | 🔄 <strong>${d.moved.length}</strong> ${this.t('movedFiles')} (${movedSize.toLocaleString()} ${this.t('symbols')})`;
        if (d.deleted.length > 0) html += ` | ❌ <strong>${d.deleted.length}</strong> ${this.t('deletedFiles')} (${deletedSize.toLocaleString()} ${this.t('symbols')})`;
        html += ` | 📁 <strong>${Object.keys(d.dirs).length}</strong> папок`;
        html += `</div>`;

        if (d.added.length) {
            html += `<details class="ga-report-details"><summary style="color:var(--ga-new-file);cursor:pointer;">${this.t('newFiles')} (${d.added.length})</summary><div class="detail-content">`;
            for (const f of d.added) {
                if (f.isMoved && f.chain && f.chain.length > 1) {
                    html += `<div style="font-size:13px;"><span style="color:var(--ga-new-file);">➕ ${f.chain[0]}</span>`;
                    for (let i = 1; i < f.chain.length; i++) {
                        html += ` <span style="color:var(--ga-moved-file);">→</span> <span style="color:var(--ga-moved-file);">${f.chain[i]}</span>`;
                    }
                    html += ` (${f.symbols.toLocaleString()} ${this.t('symbols')})</div>`;
                } else {
                    html += `<div style="font-size:13px;color:var(--ga-new-file);">➕ ${f.path} (${f.symbols.toLocaleString()} ${this.t('symbols')})</div>`;
                }
            }
            html += '</div></details>';
        }

        if (d.moved.length) {
            html += `<details class="ga-report-details"><summary style="color:var(--ga-moved-file);cursor:pointer;">${this.t('movedFiles')} (${d.moved.length})</summary><div class="detail-content">`;
            for (const mv of d.moved) {
                if (mv.chain && mv.chain.length > 2) {
                    html += `<div style="font-size:13px;"><span style="color:var(--ga-deleted-file);">➖ ${mv.chain[0]}</span>`;
                    for (let i = 1; i < mv.chain.length; i++) {
                        html += ` <span style="color:var(--ga-moved-file);">→</span> <span style="color:var(--ga-moved-file);">${mv.chain[i]}</span>`;
                    }
                    html += ` (${mv.symbols.toLocaleString()} ${this.t('symbols')})</div>`;
                } else {
                    html += `<div style="font-size:13px;"><span style="color:var(--ga-deleted-file);">➖ ${mv.oldPath}</span> <span style="color:var(--ga-moved-file);">→</span> <span style="color:var(--ga-moved-file);">${mv.newPath}</span> (${mv.symbols.toLocaleString()} ${this.t('symbols')})</div>`;
                }
            }
            html += '</div></details>';
        }

        if (d.deleted.length) {
            html += `<details class="ga-report-details"><summary style="color:var(--ga-deleted-file);cursor:pointer;">${this.t('deletedFiles')} (${d.deleted.length})</summary><div class="detail-content">`;
            for (const del of d.deleted) {
                html += `<div style="font-size:13px;color:var(--ga-deleted-file);">➖ ${del.path} (${del.symbols.toLocaleString()} ${this.t('symbols')})</div>`;
            }
            html += '</div></details>';
        }

        return html;
    }

    // ======================== ОТЧЁТЫ ========================
    initReports() {
        const reportSection = document.getElementById('report-section');
        if (!reportSection) return;

        const today = window.moment().format('YYYY-MM-DD');
        reportSection.innerHTML = `
            <h3>${this.t('reportTitle')}</h3>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:15px;">
                <button class="ga-report-btn" id="btn-today">${this.t('btnToday')}</button>
                <button class="ga-report-btn" id="btn-week">${this.t('btnWeek')}</button>
                <button class="ga-report-btn" id="btn-month">${this.t('btnMonth')}</button>
                <button class="ga-report-btn" id="btn-all">${this.t('btnAll')}</button>
                <input class="ga-report-input" id="date-from" placeholder="YYYY-MM-DD">
                <input class="ga-report-input" id="date-to" placeholder="YYYY-MM-DD">
                <button class="ga-report-btn" id="btn-interval">${this.t('btnInterval')}</button>
                <input class="ga-report-input" id="date-input" value="${today}">
                <button class="ga-report-btn" id="btn-show">${this.t('btnShow')}</button>
                <button class="ga-report-btn" id="btn-copy">${this.t('btnCopy')}</button>
            </div>
            <div id="report-content"></div>
        `;

        const showDay = (day) => this.showDayReport(day);
        const showRange = (days) => this.showRangeReport(days);

        document.getElementById('btn-today').onclick = () => { document.getElementById('date-input').value = today; showDay(today); };
        document.getElementById('btn-week').onclick = () => {
            const days = [];
            for (let i = 6; i >= 0; i--) days.push(window.moment().subtract(i, 'days').format('YYYY-MM-DD'));
            showRange(days);
        };
        document.getElementById('btn-month').onclick = () => {
            const start = window.moment().startOf('month');
            const days = [];
            for (let i = 0; i < window.moment().daysInMonth(); i++) days.push(start.clone().add(i, 'days').format('YYYY-MM-DD'));
            showRange(days);
        };
        document.getElementById('btn-all').onclick = () => {
            const start = window.moment().year(this.YEAR).startOf('year');
            const days = [];
            let cur = start.clone();
            while (cur <= window.moment()) {
                days.push(cur.format('YYYY-MM-DD'));
                cur.add(1, 'day');
            }
            showRange(days);
        };
        document.getElementById('btn-interval').onclick = () => {
            const fromVal = document.getElementById('date-from').value;
            const toVal = document.getElementById('date-to').value;
            if (!fromVal || !toVal) return;
            const from = window.moment(fromVal), to = window.moment(toVal);
            if (!from.isValid() || !to.isValid() || from > to) return;
            const days = [];
            let cur = from.clone();
            while (cur <= to) {
                days.push(cur.format('YYYY-MM-DD'));
                cur.add(1, 'day');
            }
            showRange(days);
        };
        document.getElementById('btn-show').onclick = () => {
            const val = document.getElementById('date-input').value;
            if (val) showDay(val);
        };
        document.getElementById('btn-copy').onclick = () => {
            const content = document.getElementById('report-content').innerText;
            navigator.clipboard.writeText(content).then(() => {
                const btn = document.getElementById('btn-copy');
                btn.textContent = this.t('copied');
                setTimeout(() => { btn.textContent = this.t('btnCopy'); }, 1500);
            });
        };

        showDay(today);
    }

    showDayReport(day) {
        const d = this.stats?.[day];
        const reportContent = document.getElementById('report-content');
        if (!d) {
            reportContent.innerHTML = `<p>📅 ${day} — ${this.t('noChanges')}</p>`;
            return;
        }
        reportContent.innerHTML = this.generateDayReportHTML(day, d);
    }

    showRangeReport(days) {
        const reportContent = document.getElementById('report-content');
        let totalFiles = 0, totalSymbols = 0, totalMoves = 0, totalMoveSize = 0, totalDeletes = 0, totalDeleteSize = 0;
        let hasData = false;

        for (const day of days) {
            const d = this.stats?.[day];
            if (d) {
                totalFiles += d.files;
                totalSymbols += d.totalSymbols;
                totalMoves += d.moved.length;
                totalMoveSize += d.moved.reduce((s, m) => s + m.symbols, 0);
                totalDeletes += d.deleted.length;
                totalDeleteSize += d.deleted.reduce((s, del) => s + del.symbols, 0);
                hasData = true;
            }
        }

        let html = `<h3>📊 Статистика за ${days.length} дней</h3>`;
        if (hasData) {
            html += `<div class="ga-report-summary">`;
            html += `<span>📄 <strong>${totalFiles}</strong> новых файлов</span>`;
            if (totalSymbols > 0) html += ` | 📊 <strong>${totalSymbols.toLocaleString()}</strong> символов`;
            html += ` | 🔄 <strong>${totalMoves}</strong> перемещений (${totalMoveSize.toLocaleString()} симв.)`;
            if (totalDeletes > 0) html += ` | ❌ <strong>${totalDeletes}</strong> удалений (${totalDeleteSize.toLocaleString()} симв.)`;
            html += `</div>`;

            // Мини-тепловая карта периода
            html += `<div style="display:flex;gap:2px;flex-wrap:wrap;margin-bottom:15px;">`;
            for (const day of days) {
                const d = this.stats?.[day];
                const intensity = d ? Math.min(d.files, this.MAX_INTENSITY) : 0;
                const color = this.getHeatmapColor(intensity);
                html += `<div style="width:24px;height:24px;background:${color};border-radius:3px;cursor:pointer;" 
                         title="${day}: ${d ? d.files + ' новых файлов' : 'нет'}"
                         data-day="${day}"> </div>`;
            }
            html += `</div>`;

            // Детали по дням
            for (const day of days) {
                const d = this.stats?.[day];
                if (d) {
                    html += this.generateDayReportHTML(day, d);
                }
            }
        } else {
            html += `<p>${this.t('noChanges')}</p>`;
        }

        reportContent.innerHTML = html;

        // Обработчики кликов по мини-клеткам
        reportContent.querySelectorAll('[data-day]').forEach(cell => {
            cell.addEventListener('click', () => {
                const day = cell.getAttribute('data-day');
                document.getElementById('date-input').value = day;
                this.showDayReport(day);
            });
        });
    }

    // ======================== ЭКСПОРТ ========================
    async exportToFile() {
        if (!this.reportStats) {
            new Notice(this.t('noDataExport'));
            return;
        }
        const { YEAR, totalDays, grandTotalFiles, grandTotalSymbols, stats } = this.reportStats;
        const timestamp = window.moment().format('YYYY-MM-DD_HH-mm');
        const fileName = `Git-analysis_${timestamp}.md`;

        let md = `# 📊 Git Analysis\n\n> ${window.moment().format('DD.MM.YYYY HH:mm')} | Year: ${YEAR}\n\n## 📈 Stats\n| Metric | Value |\n|---|---|\n| Days | ${totalDays} |\n| New files | ${grandTotalFiles} |\n| Symbols | ${grandTotalSymbols.toLocaleString()} |\n\n`;

        for (const day of Object.keys(stats).sort().reverse()) {
            const d = stats[day];
            if (!d.files && !d.moved.length) continue;
            md += `### ${day}\n- New: ${d.files}, Symbols: ${d.totalSymbols.toLocaleString()}\n`;
            if (d.moved.length) md += `- Moves: ${d.moved.length}\n`;
            for (const [dir, dd] of Object.entries(d.dirs)) {
                md += `  - ${dir}: ${dd.files} files\n`;
                for (const item of dd.items) {
                    md += `    - ${item.name} (${item.symbols.toLocaleString()} sym.)\n`;
                }
            }
            md += '\n';
        }

        try {
            const file = await this.app.vault.create(fileName, md);
            new Notice(`${this.t('fileSaved')}${fileName}`);
            if (this.exportBtn) {
                this.exportBtn.textContent = this.t('saved');
                setTimeout(() => { if (this.exportBtn) this.exportBtn.textContent = this.t('exportButton'); }, 2000);
            }
            const leaf = this.app.workspace.getLeaf(false);
            if (leaf) leaf.openFile(file);
        } catch (e) {
            new Notice(this.t('saveError') + e.message);
        }
    }

    onClose() {
        this.contentEl.empty();
    }
}

// ====================================================================
// SETTINGS TAB
// ====================================================================
class GitAnalysisSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Git Analysis' });

        new Setting(containerEl)
            .setName(this.plugin.t('langSetting'))
            .setDesc(this.plugin.t('langDesc'))
            .addDropdown(dropdown => dropdown
                .addOption('ru', '🇷🇺 Русский')
                .addOption('en', '🇬🇧 English')
                .setValue(this.plugin.localeManager.currentLang)
                .onChange(async (value) => {
                    this.plugin.localeManager.setLanguage(value);
                    await this.plugin.saveData({ language: value });
                    new Notice(value === 'ru' ? 'Язык: Русский' : 'Language: English');
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName(this.plugin.t('hotkeySetting'))
            .setDesc(this.plugin.t('hotkeyDesc'))
            .addButton(button => button
                .setButtonText('ℹ️')
                .onClick(() => new Notice('Use Obsidian Settings → Hotkeys'))
            );
    }
}

// ====================================================================
// PLUGIN
// ====================================================================
module.exports = class GitAnalysisPlugin extends Plugin {
    async onload() {
        this.localeManager = new LocaleManager(this);
        await this.localeManager.loadLanguage('en');
        await this.localeManager.loadLanguage('ru');

        const savedData = await this.loadData() || {};
        if (savedData.language) {
            this.localeManager.setLanguage(savedData.language);
        } else {
            const obsidianLang = this.app.vault.getConfig('language') || 'en';
            this.localeManager.setLanguage(obsidianLang.startsWith('ru') ? 'ru' : 'en');
        }

        this.addSettingTab(new GitAnalysisSettingTab(this.app, this));

        if (!this.checkGit()) {
            new Notice(this.t('missingGit'), 10000);
            return;
        }

        new Notice(this.t('pluginLoaded'));
        this.addRibbonIcon('bar-chart-3', this.t('pluginName'), () => new GitAnalysisModal(this.app, this).open());
        this.addCommand({
            id: 'run-analysis',
            name: this.t('openAnalysis'),
            callback: () => new GitAnalysisModal(this.app, this).open()
        });
    }

    t(key) {
        return this.localeManager.t(key);
    }

    checkGit() {
        try {
            require('child_process').execSync('git --version', { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    }

    onunload() {}
};