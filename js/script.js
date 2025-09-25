// sk1lark - Interactive functionality for the retro website

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeWindowControls();
    initializeDesktop();
    initializeStartMenu();
    initializeApps();
    initializeMenuSystem();
    initializeAllButtons();
    initializeStartMenuItems();
    initializeDesktopIcons();
    initializeWindowDragging();
    updateTime();
    updateLastUpdated();
    initializeLivedInFeatures();
    
    // Update time every minute
    setInterval(updateTime, 60000);
    
    // Random system activity
    setInterval(simulateSystemActivity, 30000);
});

// Login system - DISABLED
/*
function initializeLogin() {
    const loginScreen = document.getElementById('login-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const desktop = document.getElementById('desktop');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const sk1larkUser = document.getElementById('sk1lark-user');
    const guestUser = document.getElementById('guest-user');
    const passwordSection = document.getElementById('password-section');
    const passwordHintBtn = document.getElementById('password-hint-btn');
    const passwordHint = document.getElementById('password-hint');
    const turnOffBtn = document.getElementById('turn-off-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    // Login function
    function login() {
        const password = passwordInput.value.toLowerCase();
        
        // Check password (poems, verse, poetry, sk1lark)
        if (password === 'poems' || password === 'verse' || password === 'poetry' || password === 'sk1lark') {
            loginScreen.classList.add('hidden');
            loadingScreen.classList.add('active');
            
            setTimeout(() => {
                loadingScreen.classList.remove('active');
                desktop.classList.add('active');
            }, 3200);
        } else if (password !== '') {
            // Wrong password animation
            passwordInput.style.background = '#ffcccc';
            passwordInput.value = '';
            passwordInput.placeholder = 'Incorrect password. Try again.';
            
            setTimeout(() => {
                passwordInput.style.background = '';
                passwordInput.placeholder = '';
            }, 2000);
        }
    }
    
    // Guest login (immediate access)
    function guestLogin() {
        loginScreen.classList.add('hidden');
        loadingScreen.classList.add('active');
        
        setTimeout(() => {
            loadingScreen.classList.remove('active');
            desktop.classList.add('active');
        }, 1500);
    }
    
    // Show password input for sk1lark user
    sk1larkUser.addEventListener('click', function() {
        document.querySelector('.user-selection').style.display = 'none';
        passwordSection.style.display = 'block';
        passwordInput.focus();
    });
    
    // Guest user login
    guestUser.addEventListener('click', guestLogin);
    
    // Login button click
    loginBtn.addEventListener('click', login);
    
    // Enter key on password field
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    // Password hint
    passwordHintBtn.addEventListener('click', function() {
        passwordHint.style.display = passwordHint.style.display === 'none' ? 'block' : 'none';
    });
    
    // Turn off computer
    turnOffBtn.addEventListener('click', function() {
        document.body.style.background = '#000';
        document.body.innerHTML = '<div style="color: white; text-align: center; padding-top: 45vh; font-size: 24px;">It is now safe to turn off your computer.</div>';
    });
    
    // Restart computer
    restartBtn.addEventListener('click', function() {
        location.reload();
    });
}
*/

// Menu system functionality
function initializeMenuSystem() {
    // Add click handlers to all menu items
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('menu-item')) {
            handleMenuClick(e.target);
        }
    });
    
    function handleMenuClick(menuItem) {
        const menuText = menuItem.textContent.toLowerCase();
        const window = menuItem.closest('.window');
        const windowId = window ? window.id : '';
        
        // Create dropdown menu
        showDropdownMenu(menuItem, menuText, windowId);
    }
    
    function showDropdownMenu(menuItem, menuText, windowId) {
        // Remove existing dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.remove());
        
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.style.cssText = `
            position: absolute;
            background: #c0c0c0;
            border: 2px outset #c0c0c0;
            min-width: 120px;
            z-index: 10000;
            font-size: 11px;
        `;
        
        let menuItems = [];
        
        // Define menu items based on application and menu type
        switch (windowId) {
            case 'notepad-window':
                switch (menuText) {
                    case 'file':
                        menuItems = [
                            { text: 'New', action: () => clearNotepad() },
                            { text: 'Open...', action: () => alert('Open file dialog would appear here') },
                            { text: 'Save', action: () => saveNotepadContent() },
                            { text: 'Save As...', action: () => alert('Save As dialog would appear here') },
                            { text: '---', action: null },
                            { text: 'Print...', action: () => printNotepadContent() },
                            { text: '---', action: null },
                            { text: 'Exit', action: () => hideWindow('notepad') }
                        ];
                        break;
                    case 'edit':
                        menuItems = [
                            { text: 'Undo', action: () => document.execCommand('undo') },
                            { text: '---', action: null },
                            { text: 'Cut', action: () => document.execCommand('cut') },
                            { text: 'Copy', action: () => document.execCommand('copy') },
                            { text: 'Paste', action: () => document.execCommand('paste') },
                            { text: 'Delete', action: () => document.execCommand('delete') },
                            { text: '---', action: null },
                            { text: 'Select All', action: () => selectAllNotepad() }
                        ];
                        break;
                    case 'format':
                        menuItems = [
                            { text: 'Word Wrap', action: () => toggleWordWrap() },
                            { text: 'Font...', action: () => showFontDialog() }
                        ];
                        break;
                    case 'view':
                        menuItems = [
                            { text: 'Status Bar', action: () => toggleStatusBar() }
                        ];
                        break;
                    case 'help':
                        menuItems = [
                            { text: 'View Help', action: () => showNotepadHelp() },
                            { text: '---', action: null },
                            { text: 'About Notepad', action: () => showAboutNotepad() }
                        ];
                        break;
                }
                break;
                
            case 'mspaint-window':
                switch (menuText) {
                    case 'file':
                        menuItems = [
                            { text: 'New', action: () => createNewCanvasDialog() },
                            { text: 'Open...', action: () => showOpenImageDialog() },
                            { text: 'Save', action: () => saveCanvas() },
                            { text: 'Save As...', action: () => showSaveAsImageDialog() },
                            { text: '---', action: null },
                            { text: 'Print...', action: () => showPrintDialog() },
                            { text: '---', action: null },
                            { text: 'Exit', action: () => hideWindow('mspaint') }
                        ];
                        break;
                    case 'edit':
                        menuItems = [
                            { text: 'Undo', action: () => undoCanvas() },
                            { text: 'Redo', action: () => redoCanvas() },
                            { text: '---', action: null },
                            { text: 'Cut', action: () => alert('Cut selection') },
                            { text: 'Copy', action: () => alert('Copy selection') },
                            { text: 'Paste', action: () => alert('Paste from clipboard') }
                        ];
                        break;
                    case 'view':
                        menuItems = [
                            { text: 'Tool Box', action: () => toggleToolBox() },
                            { text: 'Color Box', action: () => toggleColorBox() },
                            { text: 'Status Bar', action: () => togglePaintStatusBar() }
                        ];
                        break;
                    case 'image':
                        menuItems = [
                            { text: 'Flip/Rotate...', action: () => showFlipRotateDialog() },
                            { text: 'Stretch/Skew...', action: () => showStretchSkewDialog() },
                            { text: 'Invert Colors', action: () => invertCanvasColors() },
                            { text: 'Clear Image', action: () => clearCanvas() }
                        ];
                        break;
                    case 'colors':
                        menuItems = [
                            { text: 'Edit Colors...', action: () => showColorPicker() }
                        ];
                        break;
                    case 'help':
                        menuItems = [
                            { text: 'Help Topics', action: () => showPaintHelp() },
                            { text: '---', action: null },
                            { text: 'About Paint', action: () => showAboutPaint() }
                        ];
                        break;
                }
                break;
                
            case 'poker-window':
                switch (menuText) {
                    case 'game':
                        menuItems = [
                            { text: 'New Game', action: () => startNewPokerGame() },
                            { text: 'Statistics', action: () => showPokerStats() },
                            { text: 'Options...', action: () => showPokerOptions() },
                            { text: '---', action: null },
                            { text: 'Exit', action: () => hideWindow('poker') }
                        ];
                        break;
                }
                break;
        }
        
        // Create menu items
        menuItems.forEach(item => {
            if (item.text === '---') {
                const separator = document.createElement('hr');
                separator.style.cssText = 'margin: 2px 0; border: 1px inset #c0c0c0;';
                dropdown.appendChild(separator);
            } else {
                const menuOption = document.createElement('div');
                menuOption.className = 'menu-option';
                menuOption.textContent = item.text;
                menuOption.style.cssText = `
                    padding: 4px 12px;
                    cursor: pointer;
                    border: 1px solid transparent;
                `;
                
                menuOption.addEventListener('mouseenter', function() {
                    this.style.background = '#0078d4';
                    this.style.color = 'white';
                });
                
                menuOption.addEventListener('mouseleave', function() {
                    this.style.background = '';
                    this.style.color = '';
                });
                
                menuOption.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdown.remove();
                    if (item.action) {
                        item.action();
                    }
                });
                
                dropdown.appendChild(menuOption);
            }
        });
        
        // Position dropdown
        const rect = menuItem.getBoundingClientRect();
        dropdown.style.left = rect.left + 'px';
        dropdown.style.top = (rect.bottom + 2) + 'px';
        
        document.body.appendChild(dropdown);
        
        // Close dropdown when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 0);
    }
}

// Menu action functions
function clearNotepad() {
    const textArea = document.getElementById('notepad-text');
    if (textArea) textArea.value = '';
}

function saveNotepadContent() {
    const textArea = document.getElementById('notepad-text');
    if (textArea) {
        const content = textArea.value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'untitled.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
}

function printNotepadContent() {
    const textArea = document.getElementById('notepad-text');
    if (textArea) {
        const content = textArea.value;
        const printWindow = window.open('', '', 'width=600,height=600');
        printWindow.document.write(`<pre>${content}</pre>`);
        printWindow.document.close();
        printWindow.print();
    }
}

function selectAllNotepad() {
    const textArea = document.getElementById('notepad-text');
    if (textArea) {
        textArea.select();
        textArea.setSelectionRange(0, 99999);
    }
}

function toggleWordWrap() {
    const textArea = document.getElementById('notepad-text');
    if (textArea) {
        textArea.style.whiteSpace = textArea.style.whiteSpace === 'nowrap' ? 'pre-wrap' : 'nowrap';
    }
}

function showFontDialog() {
    alert('Font dialog would appear here\n\nFont: Courier New\nSize: 11\nStyle: Regular');
}

function toggleStatusBar() {
    alert('Status bar toggled');
}

function showNotepadHelp() {
    alert('Notepad Help\n\nBasic text editing:\n- Type to add text\n- Ctrl+A: Select All\n- Ctrl+C: Copy\n- Ctrl+V: Paste\n- Ctrl+Z: Undo');
}

function showAboutNotepad() {
    alert('About Notepad\n\nsk1lark Notepad\nVersion 1.0\n\nA simple text editor for the Windows XP desktop experience.');
}

function clearCanvas() {
    const canvas = document.querySelector('.paint-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function saveCanvas() {
    const canvas = document.querySelector('.paint-canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'painting.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

function printCanvas() {
    const canvas = document.querySelector('.paint-canvas');
    if (canvas) {
        const printWindow = window.open('', '', 'width=600,height=600');
        printWindow.document.write(`<img src="${canvas.toDataURL()}" style="max-width: 100%;">`);
        printWindow.document.close();
        printWindow.print();
    }
}

function undoCanvas() {
    alert('Undo functionality would be implemented with canvas state management');
}

function redoCanvas() {
    alert('Redo functionality would be implemented with canvas state management');
}

function toggleToolBox() {
    const toolbar = document.querySelector('.paint-toolbar');
    if (toolbar) {
        toolbar.style.display = toolbar.style.display === 'none' ? 'flex' : 'none';
    }
}

function toggleColorBox() {
    alert('Color box would be toggled here');
}

function togglePaintStatusBar() {
    alert('Paint status bar toggled');
}

function showFlipRotateDialog() {
    const choice = confirm('Flip/Rotate Image\n\nOK: Rotate 90°\nCancel: Flip Horizontal');
    if (choice) {
        alert('Image rotated 90° clockwise');
    } else {
        alert('Image flipped horizontally');
    }
}

function showStretchSkewDialog() {
    alert('Stretch/Skew Dialog\n\nStretch:\nHorizontal: 100%\nVertical: 100%\n\nSkew:\nHorizontal: 0°\nVertical: 0°');
}

function invertCanvasColors() {
    const canvas = document.querySelector('.paint-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];     // Red
            data[i + 1] = 255 - data[i + 1]; // Green  
            data[i + 2] = 255 - data[i + 2]; // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
}

function showColorPicker() {
    alert('Color picker dialog would appear here');
}

function showPaintHelp() {
    alert('Paint Help\n\nTools:\n✏ Pencil: Draw freehand lines\nB Brush: Paint with brush strokes\nT Text: Add text to image\n□ Rectangle: Draw rectangles\n○ Circle: Draw circles');
}

function showAboutPaint() {
    alert('About Paint\n\nsk1lark Paint\nVersion 1.0\n\nA simple painting program for creating digital artwork.');
}

function startNewPokerGame() {
    // Reset poker game state
    if (window.initializePoker) {
        window.initializePoker();
    }
    alert('New poker game started!');
}

function showPokerStats() {
    alert('Poker Statistics\n\nGames Played: 0\nGames Won: 0\nGames Lost: 0\nWin Rate: 0%\n\nChips Won: 0\nChips Lost: 0');
}

function showPokerOptions() {
    alert('Poker Options\n\nDifficulty: Easy\nDealer Speed: Normal\nSound Effects: On\nAnimations: On');
}

// Additional button functionality
function initializeAllButtons() {
    // Paint tool buttons
    document.querySelectorAll('.tool-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove active class from all tools
            document.querySelectorAll('.tool-btn').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tool
            this.classList.add('active');
            
            // Set tool functionality
            const tools = ['pencil', 'brush', 'text', 'rectangle', 'circle'];
            const selectedTool = tools[index] || 'pencil';
            
            // Visual feedback
            const canvas = document.querySelector('.paint-canvas');
            if (canvas) {
                canvas.style.cursor = getCursorForTool(selectedTool);
            }
            
            // Show tool selection feedback
            setTimeout(() => {
                console.log(`Selected tool: ${selectedTool}`);
            }, 100);
        });
    });
    
    // Winamp playlist items
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.playlist-item').forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update track info
            const trackName = this.textContent;
            const trackInfo = document.querySelector('.track-info');
            if (trackInfo) {
                trackInfo.textContent = trackName;
            }
            
            // Update window title
            const winampTitle = document.querySelector('#winamp-window .title-bar-text');
            if (winampTitle) {
                winampTitle.textContent = `winamp - ${trackName}`;
            }
        });
        
        // Double-click to play
        item.addEventListener('dblclick', function() {
            const playBtn = document.getElementById('play-pause-btn');
            if (playBtn) {
                playBtn.click();
            }
        });
    });
    
    // Winamp visualizer animation
    function animateVisualizer() {
        const vizBars = document.querySelectorAll('.viz-bar');
        vizBars.forEach(bar => {
            const height = Math.random() * 20 + 5;
            bar.style.height = height + 'px';
            bar.style.background = `hsl(${Math.random() * 60 + 120}, 70%, 50%)`;
        });
    }
    
    // Start visualizer when playing
    let visualizerInterval = null;
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('winamp-btn')) {
            const btnText = e.target.textContent;
            
            switch (btnText) {
                case '▶':
                    // Play
                    e.target.textContent = '⏸';
                    const winampTitle = document.querySelector('#winamp-window .title-bar-text');
                    if (winampTitle) {
                        winampTitle.textContent = winampTitle.textContent.replace('[stopped]', '[playing]');
                    }
                    
                    // Start visualizer
                    if (!visualizerInterval) {
                        visualizerInterval = setInterval(animateVisualizer, 100);
                    }
                    
                    // Update time display
                    let seconds = 0;
                    const timeDisplay1 = document.querySelector('.time-display');
                    const timeInterval = setInterval(() => {
                        const minutes = Math.floor(seconds / 60);
                        const secs = seconds % 60;
                        if (timeDisplay1) {
                            timeDisplay1.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
                        }
                        seconds++;
                        
                        // Stop at 3:47 (example song length)
                        if (seconds >= 227) {
                            clearInterval(timeInterval);
                            e.target.textContent = '▶';
                            if (winampTitle) {
                                winampTitle.textContent = winampTitle.textContent.replace('[playing]', '[stopped]');
                            }
                            if (visualizerInterval) {
                                clearInterval(visualizerInterval);
                                visualizerInterval = null;
                            }
                        }
                    }, 1000);
                    break;
                    
                case '⏸':
                    // Pause
                    e.target.textContent = '▶';
                    const pausedTitle = document.querySelector('#winamp-window .title-bar-text');
                    if (pausedTitle) {
                        pausedTitle.textContent = pausedTitle.textContent.replace('[playing]', '[paused]');
                    }
                    
                    // Stop visualizer
                    if (visualizerInterval) {
                        clearInterval(visualizerInterval);
                        visualizerInterval = null;
                    }
                    break;
                    
                case '⏹':
                    // Stop
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    if (playPauseBtn) {
                        playPauseBtn.textContent = '▶';
                    }
                    
                    const stoppedTitle = document.querySelector('#winamp-window .title-bar-text');
                    if (stoppedTitle) {
                        stoppedTitle.textContent = stoppedTitle.textContent.replace(/\[playing\]|\[paused\]/, '[stopped]');
                    }
                    
                    const timeDisplay2 = document.querySelector('.time-display');
                    if (timeDisplay2) {
                        timeDisplay2.textContent = '-:--';
                    }
                    
                    // Stop visualizer
                    if (visualizerInterval) {
                        clearInterval(visualizerInterval);
                        visualizerInterval = null;
                    }
                    break;
                    
                case '⏮':
                    // Previous track
                    const currentActive = document.querySelector('.playlist-item.active');
                    if (currentActive) {
                        const prevItem = currentActive.previousElementSibling;
                        if (prevItem && prevItem.classList.contains('playlist-item')) {
                            currentActive.classList.remove('active');
                            prevItem.classList.add('active');
                            prevItem.click();
                        }
                    }
                    break;
                    
                case '⏭':
                    // Next track
                    const currentActive2 = document.querySelector('.playlist-item.active');
                    if (currentActive2) {
                        const nextItem = currentActive2.nextElementSibling;
                        if (nextItem && nextItem.classList.contains('playlist-item')) {
                            currentActive2.classList.remove('active');
                            nextItem.classList.add('active');
                            nextItem.click();
                        }
                    }
                    break;
            }
        }
    });
    
    // Taskbar button functionality
    document.querySelectorAll('.taskbar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            if (appName) {
                const window = document.getElementById(appName + '-window');
                if (window) {
                    // If window is hidden, show it
                    if (window.style.display === 'none') {
                        showWindow(appName);
                    } else {
                        // If window is visible, minimize it
                        hideWindow(appName);
                    }
                }
            }
        });
    });
    
    // System tray functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tray-icon')) {
            const iconText = e.target.textContent;
            
            switch (iconText) {
                case '🔊':
                    // Volume control
                    showVolumeControl(e.target);
                    break;
                case '🌐':
                    // Network status
                    alert('Network Status\n\nConnection: Local Area Connection\nStatus: Connected\nSpeed: 100.0 Mbps');
                    break;
                case '⏰':
                    // Clock
                    const now = new Date();
                    alert(`Current Time\n\n${now.toLocaleString()}`);
                    break;
            }
        }
    });
    
    // Add right-click context menus for desktop
    document.getElementById('desktop').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showDesktopContextMenu(e.clientX, e.clientY);
    });
}

function getCursorForTool(tool) {
    const cursors = {
        pencil: 'crosshair',
        brush: 'crosshair', 
        text: 'text',
        rectangle: 'crosshair',
        circle: 'crosshair'
    };
    return cursors[tool] || 'crosshair';
}

function showVolumeControl(icon) {
    // Remove existing volume controls
    document.querySelectorAll('.volume-control').forEach(vc => vc.remove());
    
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    volumeControl.style.cssText = `
        position: fixed;
        bottom: 50px;
        right: 20px;
        width: 40px;
        height: 120px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        padding: 10px 8px;
        z-index: 10000;
    `;
    
    volumeControl.innerHTML = `
        <div style="text-align: center; margin-bottom: 10px; font-size: 10px;">Volume</div>
        <div style="height: 80px; width: 6px; background: #808080; margin: 0 auto; position: relative; border: 1px inset #c0c0c0;">
            <div style="width: 12px; height: 8px; background: #c0c0c0; border: 1px outset #c0c0c0; position: absolute; top: 20px; left: -4px; cursor: pointer;" id="volume-slider"></div>
        </div>
        <div style="text-align: center; margin-top: 5px; font-size: 10px;">🔊</div>
    `;
    
    document.body.appendChild(volumeControl);
    
    // Close when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function closeVolume(e) {
            if (!volumeControl.contains(e.target) && e.target !== icon) {
                volumeControl.remove();
                document.removeEventListener('click', closeVolume);
            }
        });
    }, 0);
}

function showDesktopContextMenu(x, y) {
    // Remove existing context menus
    document.querySelectorAll('.context-menu').forEach(menu => menu.remove());
    
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        min-width: 140px;
        z-index: 10000;
        font-size: 11px;
    `;
    
    const menuItems = [
        { text: 'Arrange Icons by', submenu: ['Name', 'Size', 'Type', 'Modified'] },
        { text: 'Line up Icons', action: () => alert('Icons lined up') },
        { text: '---', action: null },
        { text: 'Refresh', action: () => location.reload() },
        { text: '---', action: null },
        { text: 'Paste', action: () => alert('Nothing to paste') },
        { text: 'Paste Shortcut', action: () => alert('Nothing to paste') },
        { text: '---', action: null },
        { text: 'New', submenu: ['Folder', 'Shortcut', 'Text Document'] },
        { text: '---', action: null },
        { text: 'Properties', action: () => showDesktopProperties() }
    ];
    
    menuItems.forEach(item => {
        if (item.text === '---') {
            const separator = document.createElement('hr');
            separator.style.cssText = 'margin: 2px 0; border: 1px inset #c0c0c0;';
            contextMenu.appendChild(separator);
        } else {
            const menuOption = document.createElement('div');
            menuOption.className = 'menu-option';
            menuOption.textContent = item.text;
            menuOption.style.cssText = `
                padding: 4px 12px;
                cursor: pointer;
                border: 1px solid transparent;
                position: relative;
            `;
            
            if (item.submenu) {
                menuOption.textContent += ' ►';
            }
            
            menuOption.addEventListener('mouseenter', function() {
                this.style.background = '#0078d4';
                this.style.color = 'white';
            });
            
            menuOption.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.color = '';
            });
            
            menuOption.addEventListener('click', function(e) {
                e.stopPropagation();
                contextMenu.remove();
                if (item.action) {
                    item.action();
                } else if (item.submenu) {
                    alert(`${item.text} submenu:\n${item.submenu.join('\n')}`);
                }
            });
            
            contextMenu.appendChild(menuOption);
        }
    });
    
    document.body.appendChild(contextMenu);
    
    // Close when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function closeContext(e) {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
                document.removeEventListener('click', closeContext);
            }
        });
    }, 0);
}

function showDesktopProperties() {
    alert('Display Properties\n\nTheme: Windows XP\nScreen Resolution: 1024x768\nColor Quality: 32 bit\n\nWallpaper: Bliss\nScreen Saver: (None)');
}

// Additional start menu functionality
function initializeStartMenuItems() {
    // Add functionality to start menu items without data-app
    document.addEventListener('click', function(e) {
        if (e.target.closest('.start-menu-item')) {
            const menuItem = e.target.closest('.start-menu-item');
            const itemText = menuItem.querySelector('span')?.textContent.toLowerCase();
            
            switch (itemText) {
                case 'control panel':
                    showControlPanel();
                    hideStartMenu();
                    break;
                case 'search':
                    showSearchDialog();
                    hideStartMenu();
                    break;
                case 'run':
                    showRunDialog();
                    hideStartMenu();
                    break;
                case 'help and support':
                    showHelpAndSupport();
                    hideStartMenu();
                    break;
            }
        }
    });
}

function showControlPanel() {
    const controlPanel = document.createElement('div');
    controlPanel.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 400px;
        background: white;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-size: 12px;
    `;
    
    controlPanel.innerHTML = `
        <div style="background: linear-gradient(to bottom, #0078d4, #106ebe); color: white; padding: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span><span class="program-icon" data-app="control-panel"></span>Control Panel</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">×</button>
        </div>
        <div style="padding: 20px;">
            <h3 style="margin-bottom: 15px;">Pick a category</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="control-panel-item" onclick="alert('Appearance and Themes\\n\\n• Change desktop background\\n• Screen saver settings\\n• Display properties')">
                    <div style="font-weight: bold; margin-bottom: 5px;"><span class="program-icon" data-app="paint"></span>Appearance and Themes</div>
                    <div style="font-size: 11px; color: #666;">Change desktop background and visual effects</div>
                </div>
                <div class="control-panel-item" onclick="alert('Network and Internet\\n\\n• Network connections\\n• Internet options\\n• Network setup wizard')">
                    <div style="font-weight: bold; margin-bottom: 5px;">🌐 Network and Internet</div>
                    <div style="font-size: 11px; color: #666;">Connect to internet and networks</div>
                </div>
                <div class="control-panel-item" onclick="alert('Add or Remove Programs\\n\\n• Change or remove programs\\n• Add new programs\\n• Add Windows components')">
                    <div style="font-weight: bold; margin-bottom: 5px;">📦 Add or Remove Programs</div>
                    <div style="font-size: 11px; color: #666;">Install and uninstall programs</div>
                </div>
                <div class="control-panel-item" onclick="alert('Sounds and Audio\\n\\n• Adjust system volume\\n• Change sound scheme\\n• Audio device settings')">
                    <div style="font-weight: bold; margin-bottom: 5px;">🔊 Sounds and Audio Devices</div>
                    <div style="font-size: 11px; color: #666;">Change speaker and sound settings</div>
                </div>
                <div class="control-panel-item" onclick="alert('Performance and Maintenance\\n\\n• System information\\n• Administrative tools\\n• System restore')">
                    <div style="font-weight: bold; margin-bottom: 5px;">🔧 Performance and Maintenance</div>
                    <div style="font-size: 11px; color: #666;">Keep your computer running smoothly</div>
                </div>
                <div class="control-panel-item" onclick="alert('User Accounts\\n\\n• Change account settings\\n• Create new accounts\\n• Change login options')">
                    <div style="font-weight: bold; margin-bottom: 5px;">👥 User Accounts</div>
                    <div style="font-size: 11px; color: #666;">Change user accounts and passwords</div>
                </div>
            </div>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ccc;">
                <button onclick="alert('Classic View shows all Control Panel items as individual icons')" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 4px 8px;">Switch to Classic View</button>
            </div>
        </div>
    `;
    
    // Add hover effects to control panel items
    controlPanel.innerHTML += `
        <style>
        .control-panel-item {
            padding: 10px;
            border: 1px solid transparent;
            cursor: pointer;
            border-radius: 4px;
        }
        .control-panel-item:hover {
            background: #e6f3ff;
            border-color: #0078d4;
        }
        </style>
    `;
    
    document.body.appendChild(controlPanel);
}

function showSearchDialog() {
    const searchDialog = document.createElement('div');
    searchDialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 300px;
        background: white;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-size: 12px;
    `;
    
    searchDialog.innerHTML = `
        <div style="background: linear-gradient(to bottom, #0078d4, #106ebe); color: white; padding: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span><span class="program-icon" data-app="search"></span>Search Results</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">×</button>
        </div>
        <div style="padding: 20px;">
            <div style="margin-bottom: 15px;">
                <label>Search for:</label><br>
                <input type="text" id="search-input" style="width: 100%; padding: 4px; border: 2px inset #c0c0c0; margin-top: 5px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label>Look in:</label><br>
                <select style="width: 100%; padding: 4px; border: 2px inset #c0c0c0; margin-top: 5px;">
                    <option>My Computer</option>
                    <option>My Documents</option>
                    <option>Desktop</option>
                </select>
            </div>
            <div style="margin-bottom: 15px;">
                <input type="checkbox" id="search-subfolders" checked>
                <label for="search-subfolders">Search subfolders</label>
            </div>
            <div>
                <button onclick="performSearch()" style="background: #f0f0f0; border: 2px outset #c0c0c0; padding: 6px 12px; margin-right: 10px;">Search</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 2px outset #c0c0c0; padding: 6px 12px;">Cancel</button>
            </div>
            <div id="search-results" style="margin-top: 15px; height: 100px; border: 2px inset #c0c0c0; padding: 5px; overflow-y: auto; background: white;">
                <div style="color: #666; text-align: center; padding-top: 30px;">Enter search terms and click Search</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(searchDialog);
    
    // Focus search input
    document.getElementById('search-input').focus();
    
    // Add global search function
    window.performSearch = function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const resultsDiv = document.getElementById('search-results');
        
        if (!searchTerm.trim()) {
            resultsDiv.innerHTML = '<div style="color: #666; text-align: center; padding-top: 30px;">Please enter search terms</div>';
            return;
        }
        
        // Simulate search results
        const mockResults = [
            { name: 'thoughts.txt', path: 'C:\\Users\\sk1lark\\Desktop\\thoughts.txt', type: 'Text Document' },
            { name: 'sk1lark_website.html', path: 'C:\\Users\\sk1lark\\Desktop\\sk1lark_website.html', type: 'HTML Document' },
            { name: 'calculator_history.txt', path: 'C:\\Users\\sk1lark\\Documents\\calculator_history.txt', type: 'Text Document' }
        ];
        
        const filteredResults = mockResults.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.path.toLowerCase().includes(searchTerm)
        );
        
        if (filteredResults.length === 0) {
            resultsDiv.innerHTML = '<div style="color: #666; text-align: center; padding-top: 30px;">No files found</div>';
        } else {
            resultsDiv.innerHTML = filteredResults.map(item => `
                <div style="padding: 2px 0; border-bottom: 1px dotted #ccc;">
                    <div style="font-weight: bold;">${item.name}</div>
                    <div style="font-size: 10px; color: #666;">${item.path}</div>
                </div>
            `).join('');
        }
    };
}

function showRunDialog() {
    const runDialog = document.createElement('div');
    runDialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-size: 12px;
    `;
    
    runDialog.innerHTML = `
        <div style="background: linear-gradient(to bottom, #0078d4, #106ebe); color: white; padding: 8px;">
            Run
        </div>
        <div style="padding: 20px;">
            <div style="margin-bottom: 15px;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjNDI4NWY0Ii8+Cjx0ZXh0IHg9IjE2IiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UjwvdGV4dD4KPC9zdmc+Cg==" style="float: left; margin-right: 10px;">
                <p>Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p>
            </div>
            <div style="clear: both; margin: 15px 0;">
                <label>Open:</label><br>
                <input type="text" id="run-input" style="width: 100%; padding: 4px; border: 2px inset #c0c0c0; margin-top: 5px;" placeholder="notepad, calc, mspaint...">
            </div>
            <div style="text-align: right;">
                <button onclick="executeRun()" style="background: #f0f0f0; border: 2px outset #c0c0c0; padding: 6px 12px; margin-right: 10px;">OK</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 2px outset #c0c0c0; padding: 6px 12px; margin-right: 10px;">Cancel</button>
                <button onclick="alert('Browse for files and folders')" style="background: #f0f0f0; border: 2px outset #c0c0c0; padding: 6px 12px;">Browse...</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(runDialog);
    
    // Focus input
    document.getElementById('run-input').focus();
    
    // Add global run function
    window.executeRun = function() {
        const command = document.getElementById('run-input').value.toLowerCase().trim();
        runDialog.remove();
        
        const commandMap = {
            'notepad': 'notepad',
            'calc': 'calculator',
            'calculator': 'calculator', 
            'mspaint': 'mspaint',
            'paint': 'mspaint',
            'winamp': 'winamp',
            'cmd': 'cmd',
            'regedit': 'regedit'
        };
        
        const appName = commandMap[command];
        if (appName && ['notepad', 'calculator', 'mspaint', 'winamp'].includes(appName)) {
            showWindow(appName);
        } else if (command === 'cmd') {
            alert('Command Prompt\n\nMicrosoft Windows XP [Version 5.1.2600]\n(C) Copyright 1985-2001 Microsoft Corp.\n\nC:\\Documents and Settings\\sk1lark>_');
        } else if (command === 'regedit') {
            alert('Registry Editor\n\nWarning: Editing the registry incorrectly may severely damage your system.');
        } else if (command) {
            alert(`Windows cannot find '${command}'. Make sure you typed the name correctly, and then try again.`);
        }
    };
}

function showHelpAndSupport() {
    alert('Help and Support Center\n\n🏠 Home\n🔍 Search\n📚 Documentation\n💡 Tips and Tricks\n\n• Getting Started with Windows XP\n• Troubleshooting Problems\n• Using Windows Programs\n• Personalizing Your Computer');
}

function hideStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        startMenu.classList.remove('active');
    }
}

// Window dragging functionality
function initializeWindowDragging() {
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    let activeWindow = null;
    
    document.addEventListener('mousedown', function(e) {
        const titleBar = e.target.closest('.title-bar');
        if (titleBar && !e.target.closest('.title-bar-controls')) {
            isDragging = true;
            activeWindow = titleBar.closest('.window');
            
            // Bring window to front
            const allWindows = document.querySelectorAll('.window');
            allWindows.forEach(w => {
                w.style.zIndex = parseInt(w.style.zIndex || 100);
                w.classList.remove('active');
                w.classList.add('inactive');
            });
            activeWindow.style.zIndex = 999;
            activeWindow.classList.remove('inactive');
            activeWindow.classList.add('active');
            
            // Calculate offset
            const rect = activeWindow.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            
            // Add dragging class for visual feedback
            activeWindow.classList.add('dragging');
            document.body.style.cursor = 'move';
            
            e.preventDefault();
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging && activeWindow) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            
            // Constrain to viewport
            const maxX = window.innerWidth - activeWindow.offsetWidth;
            const maxY = window.innerHeight - activeWindow.offsetHeight - 30; // Account for taskbar
            
            const constrainedX = Math.max(0, Math.min(newX, maxX));
            const constrainedY = Math.max(0, Math.min(newY, maxY));
            
            activeWindow.style.left = constrainedX + 'px';
            activeWindow.style.top = constrainedY + 'px';
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        if (isDragging) {
            isDragging = false;
            if (activeWindow) {
                activeWindow.classList.remove('dragging');
                activeWindow = null;
            }
            document.body.style.cursor = '';
        }
    });
    
    // Prevent text selection during drag
    document.addEventListener('selectstart', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// Desktop icon functionality
function initializeDesktopIcons() {
    document.addEventListener('dblclick', function(e) {
        if (e.target.closest('.desktop-icon')) {
            const icon = e.target.closest('.desktop-icon');
            const appName = icon.getAttribute('data-app');
            const label = icon.querySelector('.label').textContent;
            
            // Handle different types of desktop icons
            if (appName === 'recycle-bin') {
                showRecycleBin();
            } else if (appName === 'document') {
                handleDocumentClick(label);
            } else if (appName === 'shortcut') {
                handleShortcutClick(label);
            } else if (appName === 'cozy-folder') {
                openCozyFolder();
            } else if (appName === 'terminal') {
                openApp('terminal');
            } else if (appName === 'image') {
                const imageName = icon.getAttribute('data-image');
                openImageViewer(imageName);
            } else if (appName) {
                openApp(appName);
            }
        }
    });
    
    // Right-click context menus for desktop icons
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.desktop-icon')) {
            e.preventDefault();
            const icon = e.target.closest('.desktop-icon');
            const appName = icon.getAttribute('data-app');
            showIconContextMenu(e.clientX, e.clientY, appName);
        }
    });
}

// Handle document clicks
function handleDocumentClick(filename) {
    let content = '';
    
    switch(filename) {
        case 'New Text Document.txt':
            content = 'This is a new text document created on the desktop.';
            break;
        case 'backup_september15.txt':
            content = `backup of personal files - september 15, 2025

important stuff to remember:
- hyn's new phone number: 555-0847
- library books due september 20th
- mom's birthday next week (buy flowers?)
- finish that poem about the birds

random thoughts:
- why do i always forget to water my plants
- that song on the radio today... something about falling stars?
- need to organize my cd collection
- winter is taking forever to end`;
            break;
        case 'gratitude journal.txt':
            content = `gratitude journal - september 15, 2025

today i'm grateful for:
- rain and the birds

small things that made me smile:
- i heard the voice of my old classmate when he was yelling @ his
younger brother down the street. his younger brother sounds like
he used to sound.
- getting all green lights on the way home
- finding a forgotten $20 in my jacket pocket
- the smell of dinner cooking downstairs`;
            break;
        case 'homework_due_tomorrow.txt':
            content = `ap lit assignment - due september 16, 2025

ap classroom things

notes:
- the wallpaper itself = confinement? 
- the woman trapped behind it = narrator's psyche?
- yellow = sickness, decay, but also sunlight/hope??
- need to find at least 3 quotes
- paper should be 2-3 pages, double spaced
- remember to cite sources properly (MLA format)`;
            break;
        case 'poetry_fragments.txt':
            content = `fragments & half-thoughts - september 2025

the way streetlights
flicker on just as
you realize you've been
walking in the dark

---

coffee shop at 2pm:
everyone pretending
to read while actually
listening to conversations
at other tables

---

found a pressed flower
in an old book
can't remember
which summer it was from
or why i kept it

---

sometimes i think
the space between
what i meant to say
and what i actually said
is where all the poetry lives`;
            break;
        case 'readme.txt':
            content = `sk1lark's computer - september 2025

welcome to my digital space!

this computer contains:
- my terrible poetry attempts
- half-finished letters to friends
- way too many saved aim conversations
- a growing collection of song lyrics written on napkins
- photos from last summer that i still need to organize
- the beginnings of stories i'll probably never finish

if you're reading this, you're probably me in the future
wondering why i saved all this stuff.

future sk1lark: this was important to me once.
maybe it still is to you.

xo,
past sk1lark`;
            break;
        case 'phone_numbers.txt':
            content = `important numbers - september 2025

hyn: 555-0847 (new number!)
mom's work: 555-1456
library: 555-0891
pizza place that stays open late: 555-7829
hyn's house phone: 555-0412
alex (if i ever get brave enough to call): 555-???

emergency numbers:
police: 911
poison control: 1-800-222-1222
mom's pager: 555-8834

notes:
- hyn got a new number because her little brother kept answering
- the pizza place closes at midnight on weekdays`;
            break;
        default:
            content = `This is ${filename}

Created: September 15, 2025
Last modified: September 15, 2025

This file contains personal thoughts and memories from a different time.`;
    }
    
    openNotepadWithContent(content);
}

// Handle shortcut clicks
function handleShortcutClick(shortcutName) {
    if (shortcutName.includes('winamp')) {
        openApp('winamp');
    } else if (shortcutName.includes('hyn\'s website')) {
        showWebsiteShortcut();
    } else {
        showNotification(`Opening ${shortcutName}...`);
    }
}

// Show website shortcut
function showWebsiteShortcut() {
    const browserWindow = document.createElement('div');
    browserWindow.className = 'window';
    browserWindow.style.cssText = `
        position: fixed;
        top: 100px;
        left: 200px;
        width: 500px;
        height: 400px;
        z-index: 1000;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
    `;
    
    browserWindow.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">Internet Explorer - hyn's homepage</div>
            <div class="title-bar-controls">
                <button onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
        </div>
        <div class="menu-bar">
            <div class="menu-item">File</div>
            <div class="menu-item">Edit</div>
            <div class="menu-item">View</div>
            <div class="menu-item">Go</div>
        </div>
        <div style="padding: 20px; background: white; height: 300px; overflow-y: auto; font-family: 'Jersey 10', monospace; font-size: 14px;">
            <center>
                <h2>hyn's totally awesome homepage!</h2>
                <p>welcome to my corner of the world wide web!</p>
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnlBqlFYgTLyBSmA2jqjOhGUIhGCBFRfnQKLwGvaSe2ufQJKoFRkSpZqTQqO8eEgwAOw==" alt="Under construction">
                <p><blink>this page is under construction!</blink></p>
                <p>check back soon for updates!</p>
                <p>last updated: february 14, 2025</p>
                <hr>
                <p>my favorite links:</p>
                <p><a href="#">geocities homepage</a></p>
                <p><a href="#">angelfire webring</a></p>
                <p><a href="#">hotmail</a></p>
                <p><a href="#">yahoo! search</a></p>
                <hr>
                <p>visitor counter: 00047</p>
                <p>email me: hyn_nightowl@hotmail.com</p>
            </center>
        </div>
    `;
    
    document.body.appendChild(browserWindow);
}

function showRecycleBin() {
    const recycleBin = document.createElement('div');
    recycleBin.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 400px;
        background: white;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-size: 12px;
    `;
    
    recycleBin.innerHTML = `
        <div style="background: linear-gradient(to bottom, #0078d4, #106ebe); color: white; padding: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span><span class="program-icon" data-app="recycle-bin"></span>Recycle Bin</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">×</button>
        </div>
        <div style="background: #f0f0f0; padding: 5px; border-bottom: 1px solid #ccc;">
            <button onclick="alert('Empty Recycle Bin')" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 4px 8px; margin-right: 5px;">Empty Recycle Bin</button>
            <button onclick="alert('Restore All Items')" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 4px 8px;">Restore All</button>
        </div>
        <div style="padding: 20px;">
            <div style="display: flex; background: #e0e0e0; padding: 8px; border: 1px inset #c0c0c0; margin-bottom: 10px;">
                <div style="flex: 2; font-weight: bold;">Name</div>
                <div style="flex: 1; font-weight: bold;">Original Location</div>
                <div style="flex: 1; font-weight: bold;">Date Deleted</div>
                <div style="flex: 1; font-weight: bold;">Size</div>
            </div>
            <div style="height: 250px; overflow-y: auto; border: 1px inset #c0c0c0; padding: 5px;">
                <div style="text-align: center; color: #666; padding-top: 100px;">
                    Recycle Bin is empty
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(recycleBin);
}

function openImageViewer(imageName) {
    const imageViewer = document.createElement('div');
    imageViewer.className = 'app-window active';
    imageViewer.id = 'image-viewer-window';
    imageViewer.style.cssText = `
        position: fixed;
        top: 80px;
        left: 200px;
        width: 600px;
        height: 500px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
    `;
    
    imageViewer.innerHTML = `
        <div class="title-bar" style="background: linear-gradient(to right, #0080ff, #0040c0); color: white; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center; height: 24px;">
            <div class="title-bar-text"><span class="title-bar-icon" data-app="image"></span>${imageName} - Image Viewer</div>
            <div class="title-bar-controls">
                <button class="title-bar-control" onclick="this.closest('.app-window').remove()">×</button>
            </div>
        </div>
        <div class="menu-bar" style="background: #e0e0e0; border-bottom: 1px solid #c0c0c0; padding: 4px;">
            <span class="menu-item" onclick="alert('File menu')">File</span>
            <span class="menu-item" onclick="alert('Edit menu')">Edit</span>
            <span class="menu-item" onclick="alert('View menu')">View</span>
            <span class="menu-item" onclick="alert('Help menu')">Help</span>
        </div>
        <div style="flex: 1; background: white; border: 1px inset #c0c0c0; margin: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="media/${imageName}" alt="${imageName}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <div style="background: #e0e0e0; padding: 4px 8px; border-top: 1px solid #c0c0c0; font-size: 11px;">
            Ready
        </div>
    `;
    
    document.body.appendChild(imageViewer);
    makeWindowDraggable(imageViewer);
}

function showIconContextMenu(x, y, appName) {
    // Remove existing context menus
    document.querySelectorAll('.context-menu').forEach(menu => menu.remove());
    
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        min-width: 120px;
        z-index: 10000;
        font-size: 11px;
    `;
    
    let menuItems = [];
    
    if (appName === 'trash') {
        menuItems = [
            { text: 'Open', action: () => showRecycleBin() },
            { text: 'Empty Recycle Bin', action: () => alert('Recycle Bin emptied') },
            { text: '---', action: null },
            { text: 'Properties', action: () => alert('Recycle Bin Properties\n\nLocation: Desktop\nSize: 0 bytes\nContains: 0 objects') }
        ];
    } else {
        const appNames = {
            notepad: 'Notepad',
            calculator: 'Calculator', 
            mspaint: 'Paint',
            poker: 'Poker',
            winamp: 'Winamp',
            folder: 'My Documents'
        };
        
        const displayName = appNames[appName] || appName;
        
        menuItems = [
            { text: 'Open', action: () => showWindow(appName) },
            { text: '---', action: null },
            { text: 'Create Shortcut', action: () => alert('Shortcut created on desktop') },
            { text: 'Delete', action: () => confirm('Are you sure you want to delete this shortcut?') },
            { text: 'Rename', action: () => alert('Rename functionality') },
            { text: '---', action: null },
            { text: 'Properties', action: () => showIconProperties(displayName) }
        ];
    }
    
    menuItems.forEach(item => {
        if (item.text === '---') {
            const separator = document.createElement('hr');
            separator.style.cssText = 'margin: 2px 0; border: 1px inset #c0c0c0;';
            contextMenu.appendChild(separator);
        } else {
            const menuOption = document.createElement('div');
            menuOption.className = 'menu-option';
            menuOption.textContent = item.text;
            menuOption.style.cssText = `
                padding: 4px 12px;
                cursor: pointer;
                border: 1px solid transparent;
            `;
            
            menuOption.addEventListener('mouseenter', function() {
                this.style.background = '#0078d4';
                this.style.color = 'white';
            });
            
            menuOption.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.color = '';
            });
            
            menuOption.addEventListener('click', function(e) {
                e.stopPropagation();
                contextMenu.remove();
                if (item.action) {
                    item.action();
                }
            });
            
            contextMenu.appendChild(menuOption);
        }
    });
    
    document.body.appendChild(contextMenu);
    
    // Close when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function closeContext(e) {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
                document.removeEventListener('click', closeContext);
            }
        });
    }, 0);
}

function showIconProperties(appName) {
    alert(`${appName} Properties\n\nType: Application\nLocation: Desktop\nSize: 2.4 MB\nCreated: ${new Date().toLocaleDateString()}\nModified: ${new Date().toLocaleDateString()}\n\nAttributes:\n☑ Read-only\n☐ Hidden\n☐ Archive\n☐ System`);
}

// Chat system - DISABLED (using static AOL-style interface instead)
/*
function initializeChat() {
    const chatWindow = document.getElementById('chat-window');
    let chatInput, sendBtn, chatMessages;
    
    // Enhanced chat responses with personality
    const responses = {
        greetings: [
            "hey there, digital wanderer",
            "welcome to the electric dreams",
            "another soul enters the matrix",
            "*static crackles* hello",
            "the terminal awakens..."
        ],
        poetry: [
            "words dance across the screen like fireflies",
            "your verses echo in the digital void",
            "poetry is code for the heart",
            "do u remember how many bytes we're made of? yes, both u and me.",
            "idk sometimes i js dream in metaphors"
        ],
        existential: [
            "are we just ghosts in the shell?",
            "consciousness compressed into bytes",
            "what dreams may come in electric sleep?",
            "the boundary between real and virtual blurs",
            "we are all just data in the end"
        ],
        tech: [
            "windows xp was peak aesthetic",
            "dial-up sounds were digital lullabies", 
            "floppy disks held our digital souls",
            "the blue screen of death was poetry",
            "we lived in 4:3 aspect ratio dreams"
        ],
        default: [
            "interesting perspective...",
            "tell me more about that",
            "the pixels align in agreement",
            "*processing your thoughts*",
            "words have weight in cyberspace",
            "another fragment of digital consciousness"
        ]
    };
    
    const contacts = [
        { name: 'digital_muse', status: 'online', lastSeen: 'now' },
        { name: 'retro_poet', status: 'away', lastSeen: '5 min ago' },
        { name: 'pixel_dreamer', status: 'offline', lastSeen: '2 hours ago' },
        { name: 'code_poet', status: 'online', lastSeen: 'now' },
        { name: 'electric_sheep', status: 'idle', lastSeen: '15 min ago' }
    ];
    
    let currentContact = 'digital_muse';
    let isTyping = false;
    let chatHistory = {};
    
    // Initialize chat history for each contact
    contacts.forEach(contact => {
        chatHistory[contact.name] = [
            {
                sender: contact.name,
                text: `connected to ${contact.name}...`,
                timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                isOwn: false
            }
        ];
    });
    
    function createChatInterface() {
        if (!chatWindow) return;
        
        chatWindow.innerHTML = `
            <div class="chat-header" style="background: linear-gradient(to bottom, #0066cc, #003d7a); color: white; padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
                <span>💬 retro_chat v2.1</span>
                <div>
                    <button class="minimize-btn" style="background: none; border: none; color: white; cursor: pointer;">−</button>
                    <button class="close-btn" style="background: none; border: none; color: white; cursor: pointer;">×</button>
                </div>
            </div>
            <div class="chat-container" style="display: flex; height: 350px;">
                <div class="contact-list" style="width: 150px; background: #f0f0f0; border-right: 1px solid #c0c0c0; overflow-y: auto;">
                    <div class="contacts-header" style="background: #d4d0c8; padding: 5px; font-weight: bold; font-size: 11px; border-bottom: 1px solid #c0c0c0;">
                        Contacts (${contacts.length})
                    </div>
                    <div class="contacts" id="contacts-list">
                        ${contacts.map(contact => `
                            <div class="contact-item ${contact.name === currentContact ? 'active' : ''}" 
                                 data-contact="${contact.name}" 
                                 style="padding: 8px; cursor: pointer; font-size: 11px; border-bottom: 1px solid #e0e0e0; ${contact.name === currentContact ? 'background: #316AC5; color: white;' : ''}">
                                <div style="font-weight: bold;">${contact.name}</div>
                                <div style="font-size: 9px; opacity: 0.8;">
                                    <span class="status-indicator" style="color: ${getStatusColor(contact.status)};">●</span>
                                    ${contact.status} - ${contact.lastSeen}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="chat-area" style="flex: 1; display: flex; flex-direction: column;">
                    <div class="current-contact-info" style="background: #e0e0e0; padding: 5px 10px; border-bottom: 1px solid #c0c0c0; font-size: 11px;">
                        <strong id="current-contact-name">${currentContact}</strong>
                        <span id="contact-status" style="margin-left: 10px; color: ${getStatusColor(contacts.find(c => c.name === currentContact).status)};">● ${contacts.find(c => c.name === currentContact).status}</span>
                    </div>
                    <div class="chat-messages" id="chat-messages" style="flex: 1; overflow-y: auto; padding: 10px; background: white; font-family: 'Courier New', monospace; font-size: 12px;"></div>
                    <div class="typing-indicator" id="typing-indicator" style="padding: 5px 10px; font-style: italic; color: #666; font-size: 11px; min-height: 20px; background: #f9f9f9;"></div>
                    <div class="input-area" style="display: flex; padding: 5px; background: #f0f0f0; border-top: 1px solid #c0c0c0;">
                        <input type="text" id="chat-input" placeholder="Type a message..." 
                               style="flex: 1; padding: 5px; border: 1px inset #c0c0c0; font-family: 'Courier New', monospace; font-size: 12px;">
                        <button class="send-btn" style="padding: 5px 10px; margin-left: 5px; background: #c0c0c0; border: 1px outset #c0c0c0; cursor: pointer;">Send</button>
                        <button class="emoji-btn" style="padding: 5px 10px; margin-left: 5px; background: #c0c0c0; border: 1px outset #c0c0c0; cursor: pointer;">😊</button>
                    </div>
                </div>
            </div>
        `;
        
        // Get new references
        chatInput = document.getElementById('chat-input');
        sendBtn = document.querySelector('.send-btn');
        chatMessages = document.getElementById('chat-messages');
        
        setupEventListeners();
        loadChatHistory();
    }
    
    function getStatusColor(status) {
        switch(status) {
            case 'online': return '#00aa00';
            case 'away': return '#ffaa00';
            case 'idle': return '#aa6600';
            case 'offline': return '#aa0000';
            default: return '#666666';
        }
    }
    
    function setupEventListeners() {
        // Contact selection
        document.getElementById('contacts-list').addEventListener('click', function(e) {
            const contactItem = e.target.closest('.contact-item');
            if (contactItem) {
                const contactName = contactItem.dataset.contact;
                switchToContact(contactName);
            }
        });
        
        // Send message
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            } else {
                // Show typing indicator for other users
                showTypingIndicator(true);
                clearTimeout(window.typingTimeout);
                window.typingTimeout = setTimeout(() => {
                    showTypingIndicator(false);
                }, 3000);
            }
        });
        
        // Emoji button
        document.querySelector('.emoji-btn').addEventListener('click', function() {
            const emojis = ['😊', '😄', '😎', '🤔', '😮', '😴', '🙃', '😉', '🤖', '👾', '💾', '🖥️', '⌨️', '🎮'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            chatInput.value += randomEmoji;
            chatInput.focus();
        });
    }
    
    function switchToContact(contactName) {
        // Update UI
        document.querySelectorAll('.contact-item').forEach(item => {
            item.classList.remove('active');
            item.style.background = '';
            item.style.color = '';
        });
        
        const selectedContact = document.querySelector(`[data-contact="${contactName}"]`);
        selectedContact.classList.add('active');
        selectedContact.style.background = '#316AC5';
        selectedContact.style.color = 'white';
        
        currentContact = contactName;
        
        // Update contact info
        document.getElementById('current-contact-name').textContent = contactName;
        const contact = contacts.find(c => c.name === contactName);
        document.getElementById('contact-status').innerHTML = `● ${contact.status}`;
        document.getElementById('contact-status').style.color = getStatusColor(contact.status);
        
        // Load chat history
        loadChatHistory();
    }
    
    function loadChatHistory() {
        chatMessages.innerHTML = '';
        const history = chatHistory[currentContact] || [];
        
        history.forEach(msg => {
            addMessage(msg.sender, msg.text, msg.isOwn, msg.timestamp);
        });
        
        scrollToBottom();
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        const timestamp = new Date().toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        addMessage('you', message, true, timestamp);
        
        // Save to history
        if (!chatHistory[currentContact]) chatHistory[currentContact] = [];
        chatHistory[currentContact].push({
            sender: 'you',
            text: message,
            timestamp: timestamp,
            isOwn: true
        });
        
        chatInput.value = '';
        showTypingIndicator(true, currentContact);
        
        // Generate response
        setTimeout(() => {
            showTypingIndicator(false);
            
            const response = generateResponse(message);
            const responseTime = new Date().toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            
            addMessage(currentContact, response, false, responseTime);
            
            // Save response to history
            chatHistory[currentContact].push({
                sender: currentContact,
                text: response,
                timestamp: responseTime,
                isOwn: false
            });
            
            scrollToBottom();
        }, 1000 + Math.random() * 3000);
    }
    
    function generateResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        } else if (msg.includes('poem') || msg.includes('poetry') || msg.includes('verse')) {
            return responses.poetry[Math.floor(Math.random() * responses.poetry.length)];
        } else if (msg.includes('life') || msg.includes('existence') || msg.includes('reality')) {
            return responses.existential[Math.floor(Math.random() * responses.existential.length)];
        } else if (msg.includes('computer') || msg.includes('tech') || msg.includes('digital')) {
            return responses.tech[Math.floor(Math.random() * responses.tech.length)];
        } else {
            return responses.default[Math.floor(Math.random() * responses.default.length)];
        }
    }
    
    function addMessage(sender, text, isOwn, timestamp) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOwn ? 'own-message' : ''}`;
        messageDiv.style.cssText = `
            margin-bottom: 10px; padding: 5px; 
            ${isOwn ? 'text-align: right; color: #0066cc;' : 'text-align: left; color: #333;'}
        `;
        
        messageDiv.innerHTML = `
            <div style="margin-bottom: 2px;">
                <span style="font-size: 10px; color: #666;">[${timestamp}] </span>
                <span style="font-weight: bold; color: ${isOwn ? '#0066cc' : '#cc6600'};">${sender}:</span>
            </div>
            <div style="margin-left: ${isOwn ? '0' : '10px'}; ${isOwn ? 'font-style: italic;' : ''}">${text}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function showTypingIndicator(show, contact = null) {
        const indicator = document.getElementById('typing-indicator');
        if (show && contact) {
            indicator.textContent = `${contact} is typing...`;
            indicator.style.display = 'block';
        } else if (show) {
            indicator.textContent = 'typing...';
            indicator.style.display = 'block';
        } else {
            indicator.textContent = '';
            indicator.style.display = 'none';
        }
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Initialize the interface
    createChatInterface();
    
    // Add some initial messages to make it feel alive
    setTimeout(() => {
        addMessage('digital_muse', 'welcome to the digital realm...', false, '14:32');
    }, 1000);
    
    setTimeout(() => {
        addMessage('digital_muse', 'the machines are dreaming tonight', false, '14:33');
    }, 3000);
}
*/

// Tab functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const currentTabSpan = document.getElementById('current-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            // Update status bar
            currentTabSpan.textContent = this.textContent.trim();
            
            // Play click sound effect (visual feedback)
            this.style.transform = 'translateY(1px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Hover effects
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = '#f0f0f0';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = '#e0e0e0';
            }
        });
    });
}

// Window control buttons
function initializeWindowControls() {
    const windows = {
        main: document.getElementById('main-window'),
        chat: document.getElementById('chat-window'),
        notepad: document.getElementById('notepad-window'),
        calculator: document.getElementById('calculator-window'),
        mspaint: document.getElementById('mspaint-window'),
        poker: document.getElementById('poker-window'),
        winamp: document.getElementById('winamp-window'),
        folder: document.getElementById('folder-window'),
        terminal: document.getElementById('terminal-window')
    };
    
    const programButtons = {
        main: document.querySelector('.program-button[data-window="main"]'),
        chat: document.querySelector('.program-button[data-window="chat"]'),
        notepad: document.querySelector('.program-button[data-window="notepad"]'),
        calculator: document.querySelector('.program-button[data-window="calculator"]'),
        mspaint: document.querySelector('.program-button[data-window="mspaint"]'),
        poker: document.querySelector('.program-button[data-window="poker"]'),
        winamp: document.querySelector('.program-button[data-window="winamp"]'),
        folder: document.querySelector('.program-button[data-window="folder"]'),
        terminal: document.querySelector('.program-button[data-window="terminal"]')
    };
    
    // Initialize window states
    const windowStates = {
        main: { isMaximized: false, originalPosition: { top: '50px', left: '50px', width: '800px', height: '600px' } },
        chat: { isMaximized: false, originalPosition: { top: '100px', left: '200px', width: '320px', height: '400px' } },
        notepad: { isMaximized: false, originalPosition: { top: '80px', left: '300px', width: '500px', height: '400px' } },
        calculator: { isMaximized: false, originalPosition: { top: '120px', left: '400px', width: '220px', height: '280px' } },
        mspaint: { isMaximized: false, originalPosition: { top: '100px', left: '500px', width: '600px', height: '450px' } },
        poker: { isMaximized: false, originalPosition: { top: '60px', left: '350px', width: '500px', height: '400px' } },
        winamp: { isMaximized: false, originalPosition: { top: '150px', left: '200px', width: '300px', height: '250px' } },
        folder: { isMaximized: false, originalPosition: { top: '90px', left: '450px', width: '500px', height: '350px' } },
        terminal: { isMaximized: false, originalPosition: { top: '140px', left: '250px', width: '600px', height: '450px' } }
    };
    
    // Handle all window control buttons
    document.addEventListener('click', function(e) {
        const windowType = e.target.getAttribute('data-window');
        if (!windowType || !windows[windowType]) return;
        
        const window = windows[windowType];
        const programButton = programButtons[windowType];
        const state = windowStates[windowType];
        
        if (e.target.classList.contains('minimize-btn')) {
            window.style.display = 'none';
            programButton.classList.remove('active');
            
            // Auto-restore after 2 seconds for demo
            setTimeout(() => {
                window.style.display = 'flex';
                programButton.classList.add('active');
            }, 2000);
        }
        
        else if (e.target.classList.contains('maximize-btn')) {
            if (!state.isMaximized) {
                // Store original position
                state.originalPosition.top = window.style.top || state.originalPosition.top;
                state.originalPosition.left = window.style.left || state.originalPosition.left;
                state.originalPosition.width = window.style.width || state.originalPosition.width;
                state.originalPosition.height = window.style.height || state.originalPosition.height;
                
                // Maximize
                window.style.top = '0';
                window.style.left = '0';
                window.style.width = '100vw';
                window.style.height = 'calc(100vh - 30px)';
                
                state.isMaximized = true;
            } else {
                // Restore original position
                window.style.top = state.originalPosition.top;
                window.style.left = state.originalPosition.left;
                window.style.width = state.originalPosition.width;
                window.style.height = state.originalPosition.height;
                
                state.isMaximized = false;
            }
        }
        
        else if (e.target.classList.contains('close-btn')) {
            if (windowType === 'main' && confirm('Are you sure you want to close sk1lark?')) {
                window.style.display = 'none';
                programButton.classList.remove('active');
            } else if (windowType !== 'main') {
                window.classList.remove('active');
                window.style.display = 'none';
                programButton.classList.remove('active');
            }
        }
    });
    
    // Program button clicks to show/hide windows
    Object.keys(programButtons).forEach(windowType => {
        const button = programButtons[windowType];
        const window = windows[windowType];
        
        button.addEventListener('click', function() {
            if (button.classList.contains('active')) {
                // Window is active, minimize it
                window.style.display = 'none';
                button.classList.remove('active');
            } else {
                // Window is not active, show it
                if (windowType === 'chat') {
                    window.classList.add('active');
                }
                window.style.display = 'flex';
                button.classList.add('active');
                
                // Bring to front
                window.style.zIndex = getHighestZIndex() + 1;
            }
        });
    });
    
    // Bring window to front on click
    Object.values(windows).forEach(window => {
        window.addEventListener('mousedown', function() {
            this.style.zIndex = getHighestZIndex() + 1;
        });
    });
}

// Helper function to get highest z-index
function getHighestZIndex() {
    const windows = document.querySelectorAll('.window');
    let highest = 100;
    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex) || 100;
        if (zIndex > highest) {
            highest = zIndex;
        }
    });
    return highest;
}

// Update taskbar time
function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    timeElement.textContent = timeString;
}

// Update last updated date in about section
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    lastUpdatedElement.textContent = dateString;
}

// Make windows draggable
function makeWindowsDraggable() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(window => {
        const titleBar = window.querySelector('.title-bar');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        
        titleBar.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON') return; // Don't drag if clicking on buttons
            
            const rect = window.getBoundingClientRect();
            xOffset = rect.left;
            yOffset = rect.top;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === titleBar || e.target.classList.contains('title-bar-text')) {
                isDragging = true;
                titleBar.style.cursor = 'move';
                
                // Bring to front
                window.style.zIndex = getHighestZIndex() + 1;
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                e.preventDefault();
                
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                // Constrain to viewport
                const maxX = window.innerWidth - window.offsetWidth;
                const maxY = window.innerHeight - window.offsetHeight - 30; // Account for taskbar
                
                currentX = Math.max(0, Math.min(currentX, maxX));
                currentY = Math.max(0, Math.min(currentY, maxY));
                
                window.style.left = currentX + 'px';
                window.style.top = currentY + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                titleBar.style.cursor = 'default';
            }
        });
    });
}

// Desktop functionality
function initializeDesktop() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    // Desktop icon clicks
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove selection from other icons
            desktopIcons.forEach(i => i.classList.remove('selected'));
            
            // Select this icon
            this.classList.add('selected');
            
            // Open app on double-click
            setTimeout(() => {
                this.classList.remove('selected');
            }, 2000);
        });
        
        icon.addEventListener('dblclick', function() {
            const appName = this.getAttribute('data-app');
            openApp(appName);
        });
    });
    
    // Click desktop to deselect icons
    document.getElementById('desktop').addEventListener('click', function(e) {
        if (e.target === this) {
            desktopIcons.forEach(icon => icon.classList.remove('selected'));
        }
    });
}

// Start Menu functionality
function initializeStartMenu() {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const startMenuItems = document.querySelectorAll('.start-menu-item[data-app]');
    const shutdownBtn = document.getElementById('shutdown-btn');
    
    // Toggle start menu
    startButton.addEventListener('click', function(e) {
        e.stopPropagation();
        startMenu.classList.toggle('active');
    });
    
    // Start menu item clicks
    startMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            openApp(appName);
            startMenu.classList.remove('active');
        });
    });
    
    // Shutdown button
    shutdownBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to shut down?')) {
            document.body.style.background = '#000000';
            document.getElementById('desktop').style.display = 'none';
            
            // Show shutdown screen
            const shutdownDiv = document.createElement('div');
            shutdownDiv.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: #000000; color: #ffffff; display: flex;
                align-items: center; justify-content: center; z-index: 9999;
                font-family: 'MS Gothic', monospace; font-size: 18px;
            `;
            shutdownDiv.textContent = 'It is now safe to turn off your computer.';
            document.body.appendChild(shutdownDiv);
        }
    });
    
    // Close start menu when clicking elsewhere
    document.addEventListener('click', function() {
        startMenu.classList.remove('active');
    });
    
    startMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Open application
function openApp(appName) {
    const window = document.getElementById(`${appName}-window`);
    const programButton = document.querySelector(`[data-window="${appName}"]`);
    
    if (window && programButton) {
        window.classList.add('active');
        window.style.display = 'flex';
        programButton.classList.add('active');
        window.style.zIndex = getHighestZIndex() + 1;
        
        // Initialize app-specific functionality
        if (appName === 'calculator') {
            initializeCalculator();
        } else if (appName === 'mspaint') {
            initializePaint();
        } else if (appName === 'winamp') {
            initializeWinamp();
        } else if (appName === 'terminal') {
            // Terminal is already initialized on load
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                setTimeout(() => terminalInput.focus(), 100);
            }
        }
    }
}

// Initialize all apps
function initializeApps() {
    initializeNotepad();
    initializeCalculator();
    initializePaint();
    initializeWinamp();
    initializePoker();
    initializeFolder();
    initializeAOL();
}

// AOL Instant Messenger functionality
function initializeAOL() {
    const aolBuddies = document.querySelectorAll('.aol-buddy');
    const aolSearch = document.querySelector('.aol-search');
    const aolSendBtn = document.querySelector('.aol-send-btn');
    
    // Function to show Windows XP style notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 60px;
            right: 20px;
            width: 300px;
            background: linear-gradient(to bottom, #f0f0f0, #d8d8d8);
            border: 2px outset #c0c0c0;
            border-radius: 0;
            padding: 8px;
            font-family: 'Jersey 10', monospace;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 32px; height: 32px; background: #316AC5; border: 1px solid #1E4176; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">!</div>
                <div style="flex: 1;">${message}</div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 6px; font-family: 'Jersey 10', monospace; cursor: pointer;">×</button>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 4000);
    }
    
    // Chat conversations for each buddy
    const chatHistories = {
        'jess2k3': [
            { sender: 'jess2k3', text: 'omggg did u see what happened at lunch today??', timestamp: '3:45 PM', own: false },
            { sender: 'sk1lark', text: 'no what happened lol', timestamp: '3:46 PM', own: true },
            { sender: 'jess2k3', text: 'someone totally fell in front of everyone', timestamp: '3:46 PM', own: false },
            { sender: 'jess2k3', text: 'i felt so bad but it was kinda funny ngl', timestamp: '3:46 PM', own: false },
            { sender: 'jess2k3', text: 'ikr!! anyway wanna come over later? got the new avril cd', timestamp: '3:48 PM', own: false }
        ],
        'musiclvr_alex': [
            { sender: 'musiclvr_alex', text: 'hey check out this band i found', timestamp: '2:15 PM', own: false },
            { sender: 'musiclvr_alex', text: 'theyre called my chemical romance', timestamp: '2:15 PM', own: false },
            { sender: 'sk1lark', text: 'never heard of them, any good?', timestamp: '2:17 PM', own: true },
            { sender: 'musiclvr_alex', text: 'DUDE theyre amazing', timestamp: '2:17 PM', own: false },
            { sender: 'musiclvr_alex', text: 'totally different from anything ive heard', timestamp: '2:18 PM', own: false },
            { sender: 'sk1lark', text: 'ill check them out', timestamp: '2:20 PM', own: true },
            { sender: 'musiclvr_alex', text: 'start with three cheers for sweet revenge', timestamp: '2:21 PM', own: false }
        ],
        'bookworm_sam': [
            { sender: 'bookworm_sam', text: 'finished the book u recommended!', timestamp: '1:30 PM', own: false },
            { sender: 'sk1lark', text: 'which one? gave u like 5 lol', timestamp: '1:32 PM', own: true },
            { sender: 'bookworm_sam', text: 'the perks one', timestamp: '1:32 PM', own: false },
            { sender: 'bookworm_sam', text: 'cried so much omg', timestamp: '1:33 PM', own: false },
            { sender: 'sk1lark', text: 'RIGHT?? that tunnel scene gets me every time', timestamp: '1:35 PM', own: true },
            { sender: 'bookworm_sam', text: 'yes!! and the mixtape thing was so sweet', timestamp: '1:36 PM', own: false },
            { sender: 'sk1lark', text: 'wanna borrow my copy of looking for alaska next?', timestamp: '1:38 PM', own: true }
        ],
        'sleepyhead': [
            { sender: 'sleepyhead', text: 'ugh just woke up', timestamp: '4:20 PM', own: false },
            { sender: 'sk1lark', text: 'its literally 4pm mike 😂', timestamp: '4:22 PM', own: true },
            { sender: 'sleepyhead', text: 'stayed up til 3 playing warcraft', timestamp: '4:23 PM', own: false },
            { sender: 'sleepyhead', text: 'totally worth it tho hit level 40', timestamp: '4:23 PM', own: false },
            { sender: 'sk1lark', text: 'ur gonna fail history class', timestamp: '4:25 PM', own: true },
            { sender: 'sleepyhead', text: 'worth it for the epic mount', timestamp: '4:26 PM', own: false }
        ],
        'karoline': [
            { sender: 'karoline', text: 'r u ready for the math test tomorrow??', timestamp: '7:15 PM', own: false },
            { sender: 'sk1lark', text: 'omg no i totally forgot', timestamp: '7:17 PM', own: true },
            { sender: 'karoline', text: 'want to study together? i have all my notes', timestamp: '7:18 PM', own: false },
            { sender: 'sk1lark', text: 'yes pls ur a lifesaver', timestamp: '7:19 PM', own: true },
            { sender: 'karoline', text: 'meet at the library in 20?', timestamp: '7:20 PM', own: false },
            { sender: 'sk1lark', text: 'on my way!!', timestamp: '7:21 PM', own: true }
        ]
    };

    // Function to create and show chat window
    function openChatWindow(buddyName, history) {
        // Remove existing chat windows
        const existingChats = document.querySelectorAll('.chat-window-popup');
        existingChats.forEach(chat => chat.remove());

        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window-popup';
        chatWindow.style.cssText = `
            position: fixed;
            top: 120px;
            left: 520px;
            width: 400px;
            height: 300px;
            background: #f0f0f0;
            border: 2px outset #c0c0c0;
            z-index: 9999;
            font-family: 'Jersey 10', monospace;
            display: flex;
            flex-direction: column;
        `;

        let messagesHtml = '';
        history.forEach(msg => {
            const msgClass = msg.own ? 'own-msg' : 'other-msg';
            messagesHtml += `
                <div class="${msgClass}" style="margin: 2px 0; font-size: 14px;">
                    <span style="color: ${msg.own ? '#0000ff' : '#000000'}; font-weight: bold;">${msg.sender}:</span>
                    <span>${msg.text}</span>
                    <span style="color: #808080; font-size: 12px; float: right;">${msg.timestamp}</span>
                </div>
            `;
        });

        chatWindow.innerHTML = `
            <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center;">
                <span>IM with ${buddyName}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 1px 6px; font-family: 'Jersey 10', monospace; cursor: pointer;">×</button>
            </div>
            <div style="flex: 1; padding: 8px; overflow-y: auto; background: white; border-bottom: 1px solid #c0c0c0;">
                ${messagesHtml}
            </div>
            <div style="padding: 4px; display: flex; gap: 4px;">
                <input type="text" placeholder="Type message..." style="flex: 1; padding: 2px; border: 1px inset #c0c0c0; font-family: 'Jersey 10', monospace; font-size: 14px;">
                <button onclick="showNotification('Message sent!')" style="padding: 2px 8px; border: 1px outset #c0c0c0; background: #f0f0f0; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 14px;">Send</button>
            </div>
        `;

        document.body.appendChild(chatWindow);
    }

    // Add click handlers for buddies
    aolBuddies.forEach(buddy => {
        buddy.addEventListener('dblclick', function() {
            const buddyName = buddy.querySelector('span').textContent;
            const history = chatHistories[buddyName];
            if (history) {
                openChatWindow(buddyName, history);
            } else {
                showNotification(`No chat history with ${buddyName}`);
            }
        });
    });
    
    // Function to create new message window
    function createNewMessageWindow() {
        const messageWindow = document.createElement('div');
        messageWindow.className = 'im-compose-window';
        messageWindow.style.cssText = `
            position: fixed;
            top: 150px;
            left: 300px;
            width: 350px;
            height: 200px;
            background: #f0f0f0;
            border: 2px outset #c0c0c0;
            z-index: 9999;
            font-family: 'Jersey 10', monospace;
            display: flex;
            flex-direction: column;
        `;

        messageWindow.innerHTML = `
            <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 18px;">
                <span>Send Instant Message</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 16px;">×</button>
            </div>
            <div style="padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <label style="font-size: 18px; min-width: 40px;">To:</label>
                    <input type="text" placeholder="Enter screen name" style="flex: 1; padding: 4px; border: 1px inset #c0c0c0; font-family: 'Jersey 10', monospace; font-size: 16px;">
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <label style="font-size: 18px; margin-bottom: 4px;">Message:</label>
                    <textarea placeholder="Type your message here..." style="flex: 1; padding: 4px; border: 1px inset #c0c0c0; font-family: 'Jersey 10', monospace; font-size: 16px; resize: none;"></textarea>
                </div>
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button onclick="sendInstantMessage(this)" style="padding: 4px 12px; border: 1px outset #c0c0c0; background: #f0f0f0; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 16px;">Send</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="padding: 4px 12px; border: 1px outset #c0c0c0; background: #f0f0f0; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 16px;">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(messageWindow);
        
        // Focus on the "To" field
        const toField = messageWindow.querySelector('input');
        setTimeout(() => toField.focus(), 100);
    }

    // Global function for sending messages
    window.sendInstantMessage = function(button) {
        const messageWindow = button.closest('.im-compose-window');
        const toField = messageWindow.querySelector('input').value.trim();
        const messageField = messageWindow.querySelector('textarea').value.trim();
        
        if (!toField) {
            alert('Please enter a screen name');
            return;
        }
        
        if (!messageField) {
            alert('Please enter a message');
            return;
        }

        // Create message sent confirmation window
        const confirmWindow = document.createElement('div');
        confirmWindow.style.cssText = `
            position: fixed;
            top: 200px;
            left: 350px;
            width: 300px;
            height: 120px;
            background: #f0f0f0;
            border: 2px outset #c0c0c0;
            z-index: 10000;
            font-family: 'Jersey 10', monospace;
            display: flex;
            flex-direction: column;
        `;

        confirmWindow.innerHTML = `
            <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; font-size: 18px;">
                <span>Message Sent</span>
            </div>
            <div style="padding: 12px; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px;">
                <div style="font-size: 16px;">Message sent to ${toField}</div>
                <button onclick="this.parentElement.parentElement.remove()" style="padding: 4px 12px; border: 1px outset #c0c0c0; background: #f0f0f0; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 16px;">OK</button>
            </div>
        `;

        document.body.appendChild(confirmWindow);
        messageWindow.remove();

        // Auto-close after 3 seconds
        setTimeout(() => {
            if (confirmWindow.parentElement) {
                confirmWindow.remove();
            }
        }, 3000);
    };

    // Handle send button for self-messaging
    if (aolSendBtn) {
        aolSendBtn.addEventListener('click', function() {
            const message = aolSearch.value.trim();
            if (message) {
                // Show self-message in a cozy way
                const selfMessages = [
                    "noted to self ✨",
                    "adding to my thoughts...",
                    "keeping this close 💭",
                    "saved in my heart 🌙",
                    "wrote it down safely ⭐",
                    "tucked away for later 📝"
                ];
                const randomResponse = selfMessages[Math.floor(Math.random() * selfMessages.length)];
                showNotification(`💌 ${randomResponse}`);
                aolSearch.value = '';
            } else {
                showNotification('💭 what would you like to tell yourself?');
            }
        });
    }
    
    // Handle enter key in search/message input
    if (aolSearch) {
        aolSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aolSendBtn.click();
            }
        });
    }
}

// Notepad functionality
function initializeNotepad() {
    const notepadContent = document.querySelector('#notepad-window .window-content');
    if (!notepadContent) return;
    
    let currentFile = 'untitled.txt';
    let isModified = false;
    let fontSize = 12;
    let wordWrap = true;
    
    // Create enhanced notepad interface
    notepadContent.innerHTML = `
        <div class="notepad-menu" style="background: #c0c0c0; border-bottom: 1px solid #808080; font-size: 11px;">
            <div class="menu-bar" style="display: flex; padding: 2px;">
                <div class="menu-item" data-menu="file" style="padding: 4px 8px; cursor: pointer;">File</div>
                <div class="menu-item" data-menu="edit" style="padding: 4px 8px; cursor: pointer;">Edit</div>
                <div class="menu-item" data-menu="format" style="padding: 4px 8px; cursor: pointer;">Format</div>
                <div class="menu-item" data-menu="view" style="padding: 4px 8px; cursor: pointer;">View</div>
                <div class="menu-item" data-menu="help" style="padding: 4px 8px; cursor: pointer;">Help</div>
            </div>
        </div>
        <div class="notepad-editor" style="height: 350px; position: relative;">
            <textarea id="notepad-text" style="
                width: 100%; height: 100%; border: none; outline: none; resize: none;
                font-family: 'Courier New', monospace; font-size: ${fontSize}px;
                padding: 10px; background: white; color: black;
                ${wordWrap ? 'white-space: pre-wrap; word-wrap: break-word;' : 'white-space: pre; overflow: auto;'}
            " placeholder="Start typing..."></textarea>
        </div>
        <div class="status-bar" style="background: #c0c0c0; border-top: 1px solid #808080; padding: 2px 5px; font-size: 11px; display: flex; justify-content: space-between;">
            <span id="file-status">untitled.txt</span>
            <span id="cursor-info">Ln 1, Col 1</span>
        </div>
    `;
    
    const textArea = document.getElementById('notepad-text');
    const fileStatus = document.getElementById('file-status');
    const cursorInfo = document.getElementById('cursor-info');
    
    // Sample content
    textArea.value = `welcome to sk1lark's digital notebook...

these are the thoughts that flow through fiber optic dreams
words that dance across lcd screens in the quiet hours
when the world sleeps but the machines stay awake

---

"in the glow of monitors, we find ourselves
between the real and the virtual
citizens of both worlds
natives of neither"

this is where i write my code-poetry
where syntax meets soul
where algorithms dream of electric sheep

[created: 2024.01.20]
[last modified: now]`;
    
    // Update status functions
    function updateFileStatus() {
        const modifier = isModified ? '● ' : '';
        fileStatus.textContent = modifier + currentFile;
        
        // Update window title
        const titleBar = document.querySelector('#notepad-window .title-bar-text');
        if (titleBar) {
            titleBar.textContent = `📝 notepad - ${modifier}${currentFile}`;
        }
    }
    
    function updateCursorInfo() {
        const text = textArea.value;
        const cursorPos = textArea.selectionStart;
        const lines = text.substring(0, cursorPos).split('\\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;
        
        cursorInfo.textContent = `Ln ${line}, Col ${col}`;
        
        // Add character count
        const charCount = text.length;
        const wordCount = text.trim() ? text.trim().split(/\\s+/).length : 0;
        cursorInfo.textContent += ` | ${charCount} chars, ${wordCount} words`;
    }
    
    // Text area event listeners
    textArea.addEventListener('input', function() {
        isModified = true;
        updateFileStatus();
        updateCursorInfo();
    });
    
    textArea.addEventListener('keyup', updateCursorInfo);
    textArea.addEventListener('click', updateCursorInfo);
    
    // Menu functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('menu-item')) {
            const menuType = e.target.dataset.menu;
            showDropdownMenu(menuType, e.target);
        }
    });
    
    function showDropdownMenu(type, element) {
        // Remove existing menus
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.remove());
        
        const menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        menu.style.cssText = `
            position: absolute; background: #c0c0c0; border: 1px outset #c0c0c0;
            z-index: 1000; font-size: 11px; min-width: 120px;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        `;
        
        let menuItems = [];
        
        switch(type) {
            case 'file':
                menuItems = [
                    { text: 'New', shortcut: 'Ctrl+N', action: newFile },
                    { text: 'Open...', shortcut: 'Ctrl+O', action: openFile },
                    { text: 'Save', shortcut: 'Ctrl+S', action: saveFile },
                    { text: 'Save As...', action: saveAsFile },
                    { text: '---' },
                    { text: 'Page Setup...', action: () => alert('Page Setup not implemented') },
                    { text: 'Print...', shortcut: 'Ctrl+P', action: printFile },
                    { text: '---' },
                    { text: 'Exit', action: () => closeWindow('notepad') }
                ];
                break;
            case 'edit':
                menuItems = [
                    { text: 'Undo', shortcut: 'Ctrl+Z', action: () => document.execCommand('undo') },
                    { text: '---' },
                    { text: 'Cut', shortcut: 'Ctrl+X', action: () => document.execCommand('cut') },
                    { text: 'Copy', shortcut: 'Ctrl+C', action: () => document.execCommand('copy') },
                    { text: 'Paste', shortcut: 'Ctrl+V', action: () => document.execCommand('paste') },
                    { text: 'Delete', shortcut: 'Del', action: () => deleteSelected() },
                    { text: '---' },
                    { text: 'Find...', shortcut: 'Ctrl+F', action: findText },
                    { text: 'Find Next', shortcut: 'F3', action: findNext },
                    { text: 'Replace...', shortcut: 'Ctrl+H', action: replaceText },
                    { text: '---' },
                    { text: 'Select All', shortcut: 'Ctrl+A', action: () => textArea.select() },
                    { text: 'Time/Date', shortcut: 'F5', action: insertDateTime }
                ];
                break;
            case 'format':
                menuItems = [
                    { text: wordWrap ? '✓ Word Wrap' : 'Word Wrap', action: toggleWordWrap },
                    { text: 'Font...', action: changeFont }
                ];
                break;
            case 'view':
                menuItems = [
                    { text: 'Zoom', action: () => {} },
                    { text: 'Status Bar', action: () => {} }
                ];
                break;
            case 'help':
                menuItems = [
                    { text: 'View Help', action: () => showHelp() },
                    { text: 'About Notepad', action: () => showAbout() }
                ];
                break;
        }
        
        menuItems.forEach(item => {
            if (item.text === '---') {
                const hr = document.createElement('hr');
                hr.style.cssText = 'margin: 2px 0; border: 1px inset #c0c0c0;';
                menu.appendChild(hr);
            } else {
                const menuItem = document.createElement('div');
                menuItem.style.cssText = 'padding: 4px 20px 4px 10px; cursor: pointer; display: flex; justify-content: space-between;';
                menuItem.innerHTML = `<span>${item.text}</span>${item.shortcut ? `<span style="color: #666;">${item.shortcut}</span>` : ''}`;
                
                menuItem.addEventListener('click', () => {
                    item.action();
                    menu.remove();
                });
                
                menuItem.addEventListener('mouseover', () => menuItem.style.background = '#316AC5');
                menuItem.addEventListener('mouseout', () => menuItem.style.background = '');
                
                menu.appendChild(menuItem);
            }
        });
        
        // Position menu
        const rect = element.getBoundingClientRect();
        menu.style.left = rect.left + 'px';
        menu.style.top = (rect.bottom) + 'px';
        
        document.body.appendChild(menu);
        
        // Close menu on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 10);
    }
    
    // File operations
    function newFile() {
        if (isModified) {
            if (confirm('Do you want to save changes?')) {
                saveFile();
            }
        }
        textArea.value = '';
        currentFile = 'untitled.txt';
        isModified = false;
        updateFileStatus();
        updateCursorInfo();
    }
    
    function saveFile() {
        const content = textArea.value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile;
        a.click();
        URL.revokeObjectURL(url);
        
        isModified = false;
        updateFileStatus();
    }
    
    function openFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    textArea.value = e.target.result;
                    currentFile = file.name;
                    isModified = false;
                    updateFileStatus();
                    updateCursorInfo();
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
    
    function insertDateTime() {
        const now = new Date();
        const dateTime = now.toLocaleString();
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const text = textArea.value;
        
        textArea.value = text.substring(0, start) + dateTime + text.substring(end);
        textArea.setSelectionRange(start + dateTime.length, start + dateTime.length);
        textArea.focus();
        
        isModified = true;
        updateFileStatus();
    }
    
    function toggleWordWrap() {
        wordWrap = !wordWrap;
        textArea.style.whiteSpace = wordWrap ? 'pre-wrap' : 'pre';
        textArea.style.wordWrap = wordWrap ? 'break-word' : 'normal';
        textArea.style.overflow = wordWrap ? 'hidden' : 'auto';
    }
    
    function showAbout() {
        alert('sk1lark Notepad v1.0\\n\\nA retro text editor for digital thoughts\\n\\nBuilt with Windows XP nostalgia');
    }
    
    // Keyboard shortcuts
    textArea.addEventListener('keydown', function(e) {
        if (e.ctrlKey) {
            switch(e.key) {
                case 'n':
                    e.preventDefault();
                    newFile();
                    break;
                case 's':
                    e.preventDefault();
                    saveFile();
                    break;
                case 'o':
                    e.preventDefault();
                    openFile();
                    break;
                case 'a':
                    e.preventDefault();
                    textArea.select();
                    break;
            }
        } else if (e.key === 'F5') {
            e.preventDefault();
            insertDateTime();
        }
    });
    
    // Initialize
    updateFileStatus();
    updateCursorInfo();
}

// Paint Dialog Functions
function createNewCanvasDialog() {
    const existingDialogs = document.querySelectorAll('.paint-dialog-window');
    existingDialogs.forEach(dialog => dialog.remove());

    const dialog = document.createElement('div');
    dialog.className = 'paint-dialog-window';
    dialog.style.cssText = `
        position: fixed;
        top: 200px;
        left: 450px;
        width: 350px;
        height: 250px;
        background: #f0f0f0;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-family: 'Jersey 10', monospace;
        display: flex;
        flex-direction: column;
    `;

    dialog.innerHTML = `
        <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px;">New Canvas</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; font-family: 'Jersey 10', monospace; cursor: pointer;">×</button>
        </div>
        <div style="flex: 1; padding: 20px; font-size: 16px;">
            <div style="margin-bottom: 15px;">
                <label>Width: </label>
                <input type="number" value="400" min="50" max="1000" style="width: 80px; padding: 2px; border: 1px inset #c0c0c0;">
                <span style="margin-left: 10px;">pixels</span>
            </div>
            <div style="margin-bottom: 15px;">
                <label>Height: </label>
                <input type="number" value="300" min="50" max="800" style="width: 80px; padding: 2px; border: 1px inset #c0c0c0;">
                <span style="margin-left: 10px;">pixels</span>
            </div>
            <div style="margin-bottom: 20px;">
                <input type="checkbox" checked> Clear existing canvas
            </div>
        </div>
        <div style="background: #f0f0f0; padding: 10px; border-top: 1px solid #c0c0c0; text-align: center;">
            <button onclick="clearCanvas(); this.parentElement.parentElement.remove();" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">OK</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Cancel</button>
        </div>
    `;

    document.body.appendChild(dialog);
}

function showColorPicker() {
    const existingPickers = document.querySelectorAll('.color-picker-window');
    existingPickers.forEach(picker => picker.remove());

    const picker = document.createElement('div');
    picker.className = 'color-picker-window';
    picker.style.cssText = `
        position: fixed;
        top: 150px;
        left: 600px;
        width: 320px;
        height: 380px;
        background: #f0f0f0;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-family: 'Jersey 10', monospace;
        display: flex;
        flex-direction: column;
    `;

    const colors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#800000', '#808080', '#008000', '#808000', '#000080', '#008080', '#800080', '#C0C0C0',
        '#FFA500', '#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C', '#90EE90', '#FFE4B5'
    ];

    picker.innerHTML = `
        <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px;">🎨 Edit Colors</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; cursor: pointer;">×</button>
        </div>
        <div style="flex: 1; padding: 15px;">
            <div style="margin-bottom: 15px; font-size: 16px;">Basic Colors:</div>
            <div style="display: grid; grid-template-columns: repeat(8, 30px); gap: 4px; margin-bottom: 20px;">
                ${colors.map(color => `
                    <div onclick="selectPaintColor('${color}')" style="width: 30px; height: 24px; background: ${color}; border: 2px outset #c0c0c0; cursor: pointer;" 
                         onmouseover="this.style.border='2px inset #c0c0c0'" 
                         onmouseout="this.style.border='2px outset #c0c0c0'"></div>
                `).join('')}
            </div>
            <div style="font-size: 16px; margin-bottom: 10px;">Current Color:</div>
            <div id="current-color-display" style="width: 60px; height: 40px; background: #000000; border: 2px inset #c0c0c0; margin-bottom: 15px;"></div>
            <div style="font-size: 14px; color: #666;">Click a color to select it for painting</div>
        </div>
        <div style="background: #f0f0f0; padding: 10px; border-top: 1px solid #c0c0c0; text-align: center;">
            <button onclick="this.parentElement.parentElement.remove()" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; cursor: pointer;">OK</button>
        </div>
    `;

    document.body.appendChild(picker);
}

function selectPaintColor(color) {
    const display = document.getElementById('current-color-display');
    if (display) {
        display.style.background = color;
    }
    // Here you would normally set the actual paint color
    setTimeout(() => {
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #FFFACD;
            border: 2px outset #c0c0c0;
            padding: 15px;
            font-family: 'Jersey 10', monospace;
            font-size: 16px;
            z-index: 10001;
        `;
        confirmation.textContent = `Color changed to ${color}`;
        document.body.appendChild(confirmation);
        setTimeout(() => confirmation.remove(), 1500);
    }, 100);
}

function showOpenImageDialog() {
    const existingDialogs = document.querySelectorAll('.open-image-dialog');
    existingDialogs.forEach(dialog => dialog.remove());

    const dialog = document.createElement('div');
    dialog.className = 'open-image-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 180px;
        left: 400px;
        width: 450px;
        height: 320px;
        background: #f0f0f0;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-family: 'Jersey 10', monospace;
        display: flex;
        flex-direction: column;
    `;

    const imageFiles = [
        'my_drawing_2003.bmp',
        'sk1lark_logo.gif', 
        'digital_art_1.jpg',
        'pixel_castle.bmp',
        'sunset_photo.jpg'
    ];

    dialog.innerHTML = `
        <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px;">📁 Open Image</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; cursor: pointer;">×</button>
        </div>
        <div style="flex: 1; padding: 15px;">
            <div style="margin-bottom: 10px; font-size: 16px;">Look in: <select style="width: 200px; padding: 2px;"><option>My Pictures</option><option>Desktop</option></select></div>
            <div style="border: 2px inset #c0c0c0; height: 150px; background: white; overflow-y: auto; padding: 8px; margin-bottom: 15px;">
                ${imageFiles.map(file => `
                    <div onclick="selectImageFile('${file}')" style="padding: 4px; cursor: pointer; font-size: 14px; border-bottom: 1px dotted #ddd;" 
                         onmouseover="this.style.background='#316AC5'; this.style.color='white'" 
                         onmouseout="this.style.background=''; this.style.color=''">
                        🖼️ ${file}
                    </div>
                `).join('')}
            </div>
            <div style="margin-bottom: 10px;">
                File name: <input type="text" style="width: 200px; padding: 2px; border: 1px inset #c0c0c0;">
            </div>
            <div>Files of type: <select style="width: 150px; padding: 2px;"><option>All Picture Files</option><option>Bitmap (*.bmp)</option><option>JPEG (*.jpg)</option></select></div>
        </div>
        <div style="background: #f0f0f0; padding: 10px; border-top: 1px solid #c0c0c0; text-align: center;">
            <button onclick="openSelectedImage(); this.parentElement.parentElement.remove();" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Open</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Cancel</button>
        </div>
    `;

    document.body.appendChild(dialog);
}

function selectImageFile(filename) {
    document.querySelector('.open-image-dialog input[type="text"]').value = filename;
}

function openSelectedImage() {
    const filename = document.querySelector('.open-image-dialog input[type="text"]').value;
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #FFFACD;
            border: 2px outset #c0c0c0;
            padding: 15px;
            font-family: 'Jersey 10', monospace;
            font-size: 16px;
            z-index: 10001;
        `;
        notification.textContent = `Opening ${filename || 'selected image'}...`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }, 100);
}

function showSaveAsImageDialog() {
    const existingDialogs = document.querySelectorAll('.save-as-dialog');
    existingDialogs.forEach(dialog => dialog.remove());

    const dialog = document.createElement('div');
    dialog.className = 'save-as-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 200px;
        left: 350px;
        width: 420px;
        height: 300px;
        background: #f0f0f0;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-family: 'Jersey 10', monospace;
        display: flex;
        flex-direction: column;
    `;

    dialog.innerHTML = `
        <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px;">💾 Save As</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; cursor: pointer;">×</button>
        </div>
        <div style="flex: 1; padding: 15px;">
            <div style="margin-bottom: 15px;">
                Save in: <select style="width: 200px; padding: 2px;"><option>My Pictures</option><option>Desktop</option><option>My Documents</option></select>
            </div>
            <div style="border: 2px inset #c0c0c0; height: 100px; background: white; margin-bottom: 15px; padding: 8px;">
                <div style="padding: 4px; font-size: 14px;">📁 sk1lark_art_2003</div>
                <div style="padding: 4px; font-size: 14px;">🖼️ existing_drawing.bmp</div>
                <div style="padding: 4px; font-size: 14px;">🖼️ pixel_experiment.bmp</div>
            </div>
            <div style="margin-bottom: 10px;">
                File name: <input type="text" value="untitled" style="width: 180px; padding: 2px; border: 1px inset #c0c0c0;">
            </div>
            <div>Save as type: <select style="width: 150px; padding: 2px;"><option>24-bit Bitmap (*.bmp)</option><option>JPEG (*.jpg)</option><option>GIF (*.gif)</option></select></div>
        </div>
        <div style="background: #f0f0f0; padding: 10px; border-top: 1px solid #c0c0c0; text-align: center;">
            <button onclick="saveImageAs(); this.parentElement.parentElement.remove();" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Save</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Cancel</button>
        </div>
    `;

    document.body.appendChild(dialog);
}

function saveImageAs() {
    const filename = document.querySelector('.save-as-dialog input[type="text"]').value;
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #FFFACD;
            border: 2px outset #c0c0c0;
            padding: 15px;
            font-family: 'Jersey 10', monospace;
            font-size: 16px;
            z-index: 10001;
        `;
        notification.textContent = `Image saved as ${filename}.bmp`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }, 100);
}

function showPrintDialog() {
    const existingDialogs = document.querySelectorAll('.print-dialog');
    existingDialogs.forEach(dialog => dialog.remove());

    const dialog = document.createElement('div');
    dialog.className = 'print-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 160px;
        left: 350px;
        width: 400px;
        height: 350px;
        background: #f0f0f0;
        border: 2px outset #c0c0c0;
        z-index: 10000;
        font-family: 'Jersey 10', monospace;
        display: flex;
        flex-direction: column;
    `;

    dialog.innerHTML = `
        <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px;">🖨️ Print</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; cursor: pointer;">×</button>
        </div>
        <div style="flex: 1; padding: 15px; font-size: 14px;">
            <div style="margin-bottom: 15px;">
                <strong>Printer:</strong><br>
                <select style="width: 250px; padding: 2px; margin-top: 5px;">
                    <option>HP DeskJet 900 Series</option>
                    <option>Canon BJC-4000</option>
                    <option>Epson Stylus Color 777</option>
                </select>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Print Range:</strong><br>
                <input type="radio" name="range" checked> Current page<br>
                <input type="radio" name="range"> Selection<br>
                <input type="radio" name="range"> Pages: <input type="text" style="width: 60px; margin-left: 10px;">
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Copies:</strong> <input type="number" value="1" min="1" style="width: 50px; padding: 2px;">
            </div>
            <div style="margin-bottom: 15px;">
                <input type="checkbox"> Print in grayscale<br>
                <input type="checkbox" checked> Fit to page
            </div>
        </div>
        <div style="background: #f0f0f0; padding: 10px; border-top: 1px solid #c0c0c0; text-align: center;">
            <button onclick="startPrinting(); this.parentElement.parentElement.remove();" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Print</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 6px 16px; margin: 0 5px; cursor: pointer;">Cancel</button>
        </div>
    `;

    document.body.appendChild(dialog);
}

function startPrinting() {
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #FFFACD;
            border: 2px outset #c0c0c0;
            padding: 15px;
            font-family: 'Jersey 10', monospace;
            font-size: 16px;
            z-index: 10001;
        `;
        notification.textContent = 'Sending to printer... 🖨️';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2500);
    }, 100);
}

// Calculator functionality
let calculatorHistory = [];

function showCalculatorHistory() {
    // Remove any existing calculator history windows
    const existingHistories = document.querySelectorAll('.calculator-history-window');
    existingHistories.forEach(history => history.remove());

    const historyWindow = document.createElement('div');
    historyWindow.className = 'calculator-history-window';
    historyWindow.style.cssText = `
        position: fixed;
        top: 150px;
        left: 700px;
        width: 350px;
        height: 400px;
        background: #f0f0f0;
        border: 2px outset #c0c0c0;
        z-index: 9999;
        font-family: 'Jersey 10', monospace;
        display: flex;
        flex-direction: column;
    `;

    let historyContent = '';
    if (calculatorHistory.length === 0) {
        historyContent = '<div style="padding: 20px; text-align: center; color: #666; font-size: 18px;">No calculations yet...</div>';
    } else {
        historyContent = `
            <div style="flex: 1; padding: 12px; overflow-y: auto; background: white; border: 1px inset #c0c0c0; margin: 8px; font-size: 16px;">
                ${calculatorHistory.map(calc => `<div style="padding: 4px; border-bottom: 1px dotted #ccc; font-family: monospace;">${calc}</div>`).join('')}
            </div>
        `;
    }

    historyWindow.innerHTML = `
        <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 20px;">🧮 Calculator History</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 16px;">×</button>
        </div>
        ${historyContent}
        <div style="background: #f0f0f0; padding: 6px 10px; border-top: 1px solid #c0c0c0; font-size: 16px; text-align: center;">
            <button onclick="calculatorHistory = []; this.parentElement.parentElement.remove(); showCalculatorHistory();" style="background: #e0e0e0; border: 1px outset #c0c0c0; padding: 4px 12px; margin: 2px; cursor: pointer;">Clear History</button>
        </div>
    `;

    document.body.appendChild(historyWindow);
}

function initializeCalculator() {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.calc-btn');
    let currentValue = '0';
    let operator = null;
    let previousValue = null;
    let waitingForOperand = false;
    let justCalculated = false;
    
    function updateDisplay() {
        // Limit display to 12 characters
        const displayValue = currentValue.length > 12 ? 
            parseFloat(currentValue).toExponential(3) : currentValue;
        display.textContent = displayValue;
    }
    
    function playButtonSound() {
        // Visual feedback for button press
        display.style.background = '#002200';
        setTimeout(() => {
            display.style.background = '#000000';
        }, 100);
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playButtonSound();
            const buttonText = this.textContent;
            
            if (this.classList.contains('number')) {
                if (waitingForOperand || justCalculated) {
                    currentValue = buttonText;
                    waitingForOperand = false;
                    justCalculated = false;
                } else {
                    currentValue = currentValue === '0' ? buttonText : currentValue + buttonText;
                }
            } else if (this.classList.contains('operator')) {
                if (previousValue === null) {
                    previousValue = currentValue;
                } else if (operator && !waitingForOperand) {
                    const result = calculate();
                    if (result === 'Error') {
                        currentValue = 'Error';
                        previousValue = null;
                        operator = null;
                        updateDisplay();
                        return;
                    }
                    currentValue = String(result);
                    previousValue = result;
                }
                
                waitingForOperand = true;
                operator = buttonText;
                justCalculated = false;
            } else if (this.classList.contains('equals')) {
                if (operator && previousValue !== null && !waitingForOperand) {
                    const result = calculate();
                    if (result === 'Error') {
                        currentValue = 'Error';
                    } else {
                        // Add calculation to history
                        const calculation = `${previousValue} ${operator} ${currentValue} = ${result}`;
                        calculatorHistory.push(calculation);
                        
                        // Show history window after 3 calculations
                        if (calculatorHistory.length >= 3) {
                            setTimeout(showCalculatorHistory, 200);
                        }
                        
                        currentValue = String(result);
                    }
                    previousValue = null;
                    operator = null;
                    waitingForOperand = true;
                    justCalculated = true;
                }
            } else if (this.classList.contains('clear')) {
                currentValue = '0';
                previousValue = null;
                operator = null;
                waitingForOperand = false;
                justCalculated = false;
            } else if (buttonText === '.') {
                if (waitingForOperand || justCalculated) {
                    currentValue = '0.';
                    waitingForOperand = false;
                    justCalculated = false;
                } else if (currentValue.indexOf('.') === -1) {
                    currentValue += '.';
                }
            } else if (buttonText === '±') {
                currentValue = String(-parseFloat(currentValue));
            }
            
            updateDisplay();
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('calculator-window').style.display === 'none') return;
        
        const key = e.key;
        if ('0123456789'.includes(key)) {
            document.querySelector(`.calc-btn.number:contains('${key}')`).click();
        } else if (key === '+') {
            document.querySelector('.calc-btn.operator[textContent="+"]').click();
        } else if (key === '-') {
            document.querySelector('.calc-btn.operator[textContent="-"]').click();
        } else if (key === '*') {
            document.querySelector('.calc-btn.operator[textContent="×"]').click();
        } else if (key === '/') {
            e.preventDefault();
            document.querySelector('.calc-btn.operator[textContent="÷"]').click();
        } else if (key === 'Enter' || key === '=') {
            document.querySelector('.calc-btn.equals').click();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.querySelector('.calc-btn.clear').click();
        } else if (key === '.') {
            document.querySelector('.calc-btn[textContent="."]').click();
        }
    });
    
    function calculate() {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        
        if (isNaN(prev) || isNaN(current)) return 'Error';
        
        let result;
        switch (operator) {
            case '+': 
                result = prev + current;
                break;
            case '-': 
                result = prev - current;
                break;
            case '×': 
                result = prev * current;
                break;
            case '÷': 
                if (current === 0) return 'Error';
                result = prev / current;
                break;
            case '%': 
                result = prev % current;
                break;
            default: 
                return current;
        }
        
        // Round to prevent floating point errors
        return Math.round(result * 100000000) / 100000000;
    }
}

// Paint functionality
function initializePaint() {
    const canvas = document.querySelector('.paint-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentTool = 'pen';
    let currentColor = '#000000';
    let currentSize = 3;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas size
    canvas.width = 480;
    canvas.height = 320;
    
    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create toolbar if it doesn't exist
    let toolbar = document.querySelector('.paint-toolbar');
    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.className = 'paint-toolbar';
        toolbar.style.cssText = `
            padding: 5px; background: #c0c0c0; border-bottom: 1px solid #808080;
            display: flex; flex-wrap: wrap; gap: 5px; align-items: center;
        `;
        canvas.parentNode.insertBefore(toolbar, canvas);
        
        // Create tools
        const tools = [
            {name: 'Pen', tool: 'pen', icon: '✏️'},
            {name: 'Brush', tool: 'brush', icon: '🖌️'},
            {name: 'Eraser', tool: 'eraser', icon: '🧹'},
            {name: 'Spray', tool: 'spray', icon: '💧'},
            {name: 'Line', tool: 'line', icon: '📏'},
            {name: 'Rectangle', tool: 'rectangle', icon: '▭'},
            {name: 'Circle', tool: 'circle', icon: '○'}
        ];
        
        tools.forEach(toolData => {
            const btn = document.createElement('button');
            btn.textContent = toolData.icon;
            btn.title = toolData.name;
            btn.className = 'paint-tool';
            btn.dataset.tool = toolData.tool;
            btn.style.cssText = 'padding: 5px; margin: 2px; background: #c0c0c0; border: 1px outset #c0c0c0;';
            if (toolData.tool === 'pen') btn.classList.add('active');
            toolbar.appendChild(btn);
        });
        
        // Color palette
        const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
                       '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#008000'];
        
        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'paint-color';
            colorDiv.style.cssText = `
                width: 20px; height: 20px; border: 1px solid #000; cursor: pointer;
                background-color: ${color}; display: inline-block; margin: 1px;
            `;
            toolbar.appendChild(colorDiv);
        });
        
        // Size slider
        const sizeLabel = document.createElement('span');
        sizeLabel.textContent = 'Size: ';
        const sizeSlider = document.createElement('input');
        sizeSlider.type = 'range';
        sizeSlider.min = '1';
        sizeSlider.max = '20';
        sizeSlider.value = '3';
        sizeSlider.style.width = '80px';
        const sizeDisplay = document.createElement('span');
        sizeDisplay.textContent = '3';
        
        toolbar.appendChild(sizeLabel);
        toolbar.appendChild(sizeSlider);
        toolbar.appendChild(sizeDisplay);
        
        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.textContent = '🗑️ Clear';
        clearBtn.style.cssText = 'padding: 5px; background: #c0c0c0; border: 1px outset #c0c0c0;';
        toolbar.appendChild(clearBtn);
        
        // Event listeners for new elements
        sizeSlider.addEventListener('input', function() {
            currentSize = parseInt(this.value);
            sizeDisplay.textContent = this.value;
        });
        
        clearBtn.addEventListener('click', function() {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }
    
    // Tool selection
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('paint-tool')) {
            document.querySelectorAll('.paint-tool').forEach(t => {
                t.classList.remove('active');
                t.style.border = '1px outset #c0c0c0';
            });
            e.target.classList.add('active');
            e.target.style.border = '1px inset #c0c0c0';
            currentTool = e.target.dataset.tool;
        }
        
        if (e.target.classList.contains('paint-color')) {
            currentColor = window.getComputedStyle(e.target).backgroundColor;
        }
    });
    
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(e);
        lastX = pos.x;
        lastY = pos.y;
        
        if (currentTool === 'pen' || currentTool === 'brush') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = currentSize;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const pos = getMousePos(e);
        
        if (currentTool === 'pen') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = currentSize;
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            
        } else if (currentTool === 'brush') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = currentColor;
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.arc(
                    pos.x + Math.random() * currentSize * 2 - currentSize,
                    pos.y + Math.random() * currentSize * 2 - currentSize,
                    Math.random() * 3 + 1, 0, Math.PI * 2
                );
                ctx.fill();
            }
            
        } else if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, currentSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
        } else if (currentTool === 'spray') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = currentColor;
            for (let i = 0; i < 30; i++) {
                const sprayX = pos.x + (Math.random() - 0.5) * currentSize * 4;
                const sprayY = pos.y + (Math.random() - 0.5) * currentSize * 4;
                ctx.fillRect(sprayX, sprayY, 1, 1);
            }
        }
        
        lastX = pos.x;
        lastY = pos.y;
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
}

// Winamp functionality
function initializeWinamp() {
    const winampContent = document.querySelector('#winamp-window .window-content');
    if (!winampContent) return;
    
    let isPlaying = false;
    let currentTime = 0;
    let songDuration = 180; // 3 minutes default
    let currentSong = 0;
    let volume = 50;
    let timer = null;
    let visualizerInterval = null;
    
    const playlist = [
        { title: "sk1lark - midnight thoughts", artist: "sk1lark", duration: 240 },
        { title: "digital dreams", artist: "sk1lark", duration: 195 },
        { title: "retro vibes", artist: "sk1lark", duration: 167 },
        { title: "windows xp nostalgia", artist: "sk1lark", duration: 203 },
        { title: "y2k memories", artist: "sk1lark", duration: 221 }
    ];
    
    // Enhanced UI
    winampContent.innerHTML = `
        <div class="winamp-main" style="background: linear-gradient(to bottom, #4a4a4a, #2a2a2a); padding: 10px; color: #00ff00; font-family: 'Courier New', monospace;">
            <div class="display-area" style="background: #000; padding: 10px; margin-bottom: 10px; border: 1px inset #666;">
                <div class="song-info" style="font-size: 14px; margin-bottom: 5px;">
                    <div id="song-title">sk1lark - midnight thoughts</div>
                    <div id="song-artist" style="font-size: 12px; color: #888;">sk1lark</div>
                </div>
                <div class="time-info" style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span id="current-time">0:00</span>
                    <span id="total-time">4:00</span>
                </div>
                <div class="progress-bar" style="background: #333; height: 8px; margin: 5px 0; position: relative; cursor: pointer;" id="progress-bar">
                    <div class="progress-fill" style="background: #00ff00; height: 100%; width: 0%; transition: width 0.1s;" id="progress-fill"></div>
                </div>
                <div class="visualizer" style="height: 30px; background: #000; display: flex; align-items: end; gap: 2px; padding: 2px;" id="visualizer">
                    ${Array.from({length: 20}, () => '<div style="width: 4px; background: #00ff00; height: 2px; transition: height 0.1s;"></div>').join('')}
                </div>
            </div>
            
            <div class="controls" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 10px;">
                <button id="prev-btn" style="background: #333; border: 1px outset #666; color: #fff; padding: 5px 10px;">⏮️</button>
                <button id="play-pause-btn" style="background: #333; border: 1px outset #666; color: #fff; padding: 5px 15px; font-size: 16px;">▶️</button>
                <button id="stop-btn" style="background: #333; border: 1px outset #666; color: #fff; padding: 5px 10px;">⏹️</button>
                <button id="next-btn" style="background: #333; border: 1px outset #666; color: #fff; padding: 5px 10px;">⏭️</button>
            </div>
            
            <div class="volume-control" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span style="font-size: 12px;">🔊</span>
                <input type="range" id="volume-slider" min="0" max="100" value="50" style="flex: 1;">
                <span id="volume-display" style="font-size: 12px;">50%</span>
            </div>
            
            <div class="playlist" style="background: #000; border: 1px inset #666; height: 120px; overflow-y: auto;">
                <div class="playlist-header" style="background: #333; padding: 5px; font-size: 12px; border-bottom: 1px solid #666;">
                    Playlist (${playlist.length} songs)
                </div>
                <div class="playlist-items" id="playlist-items">
                    ${playlist.map((song, index) => `
                        <div class="playlist-item ${index === 0 ? 'active' : ''}" data-index="${index}" 
                             style="padding: 5px; cursor: pointer; font-size: 11px; ${index === 0 ? 'background: #444;' : ''}">
                            ${index + 1}. ${song.title} - ${song.artist} [${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}]
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Get elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeDisplay = document.getElementById('volume-display');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const visualizer = document.getElementById('visualizer');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    function updateDisplay() {
        const current = playlist[currentSong];
        songTitle.textContent = current.title;
        songArtist.textContent = current.artist;
        songDuration = current.duration;
        
        const minutes = Math.floor(songDuration / 60);
        const seconds = songDuration % 60;
        totalTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update playlist highlighting
        playlistItems.forEach((item, index) => {
            item.style.background = index === currentSong ? '#444' : 'transparent';
            item.classList.toggle('active', index === currentSong);
        });
    }
    
    function updateTime() {
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const progress = (currentTime / songDuration) * 100;
        progressFill.style.width = `${progress}%`;
        
        if (currentTime >= songDuration) {
            nextSong();
        }
    }
    
    function startVisualizer() {
        const bars = visualizer.children;
        visualizerInterval = setInterval(() => {
            if (isPlaying) {
                for (let i = 0; i < bars.length; i++) {
                    const height = Math.random() * 25 + 2;
                    bars[i].style.height = `${height}px`;
                    bars[i].style.background = `hsl(${120 + Math.random() * 60}, 100%, 50%)`;
                }
            } else {
                for (let i = 0; i < bars.length; i++) {
                    bars[i].style.height = '2px';
                    bars[i].style.background = '#333';
                }
            }
        }, 100);
    }
    
    function play() {
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        timer = setInterval(() => {
            currentTime++;
            updateTime();
        }, 1000);
    }
    
    function pause() {
        isPlaying = false;
        playPauseBtn.textContent = '▶️';
        clearInterval(timer);
    }
    
    function stop() {
        pause();
        currentTime = 0;
        updateTime();
        stopBtn.style.border = '1px inset #666';
        setTimeout(() => stopBtn.style.border = '1px outset #666', 100);
    }
    
    function nextSong() {
        currentSong = (currentSong + 1) % playlist.length;
        currentTime = 0;
        updateDisplay();
        updateTime();
        if (isPlaying) {
            // Continue playing
            clearInterval(timer);
            play();
        }
        nextBtn.style.border = '1px inset #666';
        setTimeout(() => nextBtn.style.border = '1px outset #666', 100);
    }
    
    function prevSong() {
        currentSong = (currentSong - 1 + playlist.length) % playlist.length;
        currentTime = 0;
        updateDisplay();
        updateTime();
        if (isPlaying) {
            clearInterval(timer);
            play();
        }
        prevBtn.style.border = '1px inset #666';
        setTimeout(() => prevBtn.style.border = '1px outset #666', 100);
    }
    
    // Event listeners
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
        this.style.border = '1px inset #666';
        setTimeout(() => this.style.border = '1px outset #666', 100);
    });
    
    stopBtn.addEventListener('click', stop);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    
    volumeSlider.addEventListener('input', function() {
        volume = this.value;
        volumeDisplay.textContent = `${volume}%`;
        
        // Visual feedback
        const hue = (volume / 100) * 120; // Green to red
        this.style.background = `linear-gradient(to right, hsl(${hue}, 100%, 50%) 0%, hsl(${hue}, 100%, 50%) ${volume}%, #333 ${volume}%, #333 100%)`;
    });
    
    progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        currentTime = Math.floor(percentage * songDuration);
        updateTime();
    });
    
    // Playlist clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('playlist-item')) {
            const index = parseInt(e.target.dataset.index);
            currentSong = index;
            currentTime = 0;
            updateDisplay();
            updateTime();
        }
    });
    
    // Initialize
    updateDisplay();
    startVisualizer();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('winamp-window').style.display === 'none') return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                playPauseBtn.click();
                break;
            case 'ArrowRight':
                if (e.ctrlKey) nextBtn.click();
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) prevBtn.click();
                break;
            case 'ArrowUp':
                if (e.ctrlKey) {
                    volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
                    volumeSlider.dispatchEvent(new Event('input'));
                }
                break;
            case 'ArrowDown':
                if (e.ctrlKey) {
                    volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
                    volumeSlider.dispatchEvent(new Event('input'));
                }
                break;
        }
    });
}

// Poker functionality (Simplified Blackjack)
function initializePoker() {
    const gameArea = document.querySelector('#poker-window .window-content');
    if (!gameArea) return;
    
    let chips = 1000;
    let currentBet = 25;
    let deck = [];
    let playerHand = [];
    let dealerHand = [];
    let gameState = 'betting'; // 'betting', 'playing', 'dealer', 'finished'
    let gameMessage = '';
    
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const values = {'A': 11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10};
    
    function createDeck() {
        deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push({ suit, rank, value: values[rank] });
            }
        }
        // Shuffle deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    function drawCard() {
        return deck.pop();
    }
    
    function calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        
        for (let card of hand) {
            if (card.rank === 'A') {
                aces++;
                value += 11;
            } else {
                value += card.value;
            }
        }
        
        // Adjust for aces
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        
        return value;
    }
    
    function createCardElement(card, hidden = false) {
        const cardEl = document.createElement('div');
        cardEl.className = 'poker-card';
        cardEl.style.cssText = `
            width: 70px; height: 100px; border-radius: 8px; margin: 5px;
            display: inline-flex; flex-direction: column; justify-content: space-between;
            padding: 8px; font-size: 12px; font-weight: bold; position: relative;
            box-shadow: 2px 2px 4px rgba(0,0,0,0.3); transition: all 0.3s;
        `;
        
        if (hidden) {
            cardEl.style.background = 'linear-gradient(135deg, #001f3f, #0074D9)';
            cardEl.style.color = '#fff';
            cardEl.style.border = '2px solid #fff';
            cardEl.innerHTML = '<div style="text-align: center; line-height: 84px; font-size: 24px;">🂠</div>';
        } else {
            const isRed = card.suit === '♥️' || card.suit === '♦️';
            cardEl.style.background = '#fff';
            cardEl.style.color = isRed ? '#ff0000' : '#000000';
            cardEl.style.border = '2px solid #333';
            cardEl.innerHTML = `
                <div style="font-size: 10px;">${card.rank}${card.suit}</div>
                <div style="text-align: center; font-size: 20px;">${card.suit}</div>
                <div style="font-size: 10px; transform: rotate(180deg); text-align: right;">${card.rank}${card.suit}</div>
            `;
        }
        
        return cardEl;
    }
    
    function updateDisplay() {
        // Update stats
        document.getElementById('poker-chips').textContent = chips;
        document.getElementById('poker-bet').textContent = currentBet;
        
        // Update dealer cards
        const dealerArea = document.getElementById('dealer-cards');
        dealerArea.innerHTML = '';
        dealerHand.forEach((card, index) => {
            const isHidden = gameState === 'playing' && index === 0;
            dealerArea.appendChild(createCardElement(card, isHidden));
        });
        
        // Update player cards
        const playerArea = document.getElementById('player-cards');
        playerArea.innerHTML = '';
        playerHand.forEach(card => {
            playerArea.appendChild(createCardElement(card));
        });
        
        // Update hand value and message
        const playerValue = calculateHandValue(playerHand);
        let handText = `${playerValue}`;
        
        if (playerValue === 21 && playerHand.length === 2) {
            handText = 'BLACKJACK!';
        } else if (playerValue > 21) {
            handText = `BUST (${playerValue})`;
        }
        
        document.getElementById('poker-hand').textContent = handText;
        document.getElementById('poker-message').innerHTML = `<h3>sk1lark poker (blackjack)</h3><p>${gameMessage}</p>`;
        
        // Update button states
        const newHandBtn = document.getElementById('new-hand-btn');
        const hitBtn = document.getElementById('hit-btn');
        const standBtn = document.getElementById('stand-btn');
        const foldBtn = document.getElementById('fold-btn');
        
        newHandBtn.disabled = gameState === 'playing';
        hitBtn.disabled = gameState !== 'playing';
        standBtn.disabled = gameState !== 'playing';
        foldBtn.disabled = gameState !== 'playing';
        
        // Update bet controls
        const betButtons = document.querySelectorAll('.bet-btn');
        const betSlider = document.getElementById('bet-slider');
        betButtons.forEach(btn => btn.disabled = gameState === 'playing');
        betSlider.disabled = gameState === 'playing';
        
        if (playerValue > 21 && gameState === 'playing') {
            gameState = 'finished';
            gameMessage = `You busted! Lost $${currentBet}. Click "Deal New Hand" to continue.`;
            chips -= currentBet;
            updateDisplay();
        }
    }
    
    function dealNewHand() {
        if (chips < currentBet) {
            gameMessage = 'Not enough chips! Resetting to $1000.';
            chips = 1000;
            updateDisplay();
            return;
        }
        
        createDeck();
        playerHand = [];
        dealerHand = [];
        
        // Deal initial cards
        playerHand.push(drawCard());
        dealerHand.push(drawCard());
        playerHand.push(drawCard());
        dealerHand.push(drawCard());
        
        gameState = 'playing';
        gameMessage = 'Your turn! Hit or Stand?';
        
        // Check for immediate blackjack
        if (calculateHandValue(playerHand) === 21) {
            stand();
        } else {
            updateDisplay();
        }
    }
    
    function hit() {
        if (gameState !== 'playing') return;
        
        playerHand.push(drawCard());
        const playerValue = calculateHandValue(playerHand);
        
        if (playerValue > 21) {
            gameMessage = `Busted with ${playerValue}! You lose $${currentBet}.`;
            gameState = 'finished';
            chips -= currentBet;
        }
        
        updateDisplay();
    }
    
    function stand() {
        if (gameState !== 'playing') return;
        
        gameState = 'dealer';
        
        // Dealer plays
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(drawCard());
        }
        
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);
        
        let result = '';
        if (dealerValue > 21) {
            result = `Dealer busted with ${dealerValue}! You win $${currentBet}!`;
            chips += currentBet;
        } else if (playerValue > dealerValue) {
            result = `You win ${playerValue} vs ${dealerValue}! Won $${currentBet}!`;
            chips += currentBet;
        } else if (dealerValue > playerValue) {
            result = `Dealer wins ${dealerValue} vs ${playerValue}. Lost $${currentBet}.`;
            chips -= currentBet;
        } else {
            result = `Push! Both have ${playerValue}. Bet returned.`;
        }
        
        // Bonus for blackjack
        if (playerValue === 21 && playerHand.length === 2 && dealerValue !== 21) {
            result = `BLACKJACK! You win $${Math.floor(currentBet * 1.5)}!`;
            chips += Math.floor(currentBet * 1.5);
        }
        
        gameMessage = result + ' Click "Deal New Hand" to continue.';
        gameState = 'finished';
        updateDisplay();
    }
    
    function fold() {
        gameMessage = `You folded and lost $${Math.floor(currentBet / 2)}. Click "Deal New Hand" to continue.`;
        chips -= Math.floor(currentBet / 2);
        gameState = 'finished';
        updateDisplay();
    }
    
    // Event listeners
    document.getElementById('new-hand-btn').addEventListener('click', dealNewHand);
    document.getElementById('hit-btn').addEventListener('click', hit);
    document.getElementById('stand-btn').addEventListener('click', stand);
    document.getElementById('fold-btn').addEventListener('click', fold);
    
    // Bet controls
    document.querySelectorAll('.bet-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentBet = parseInt(this.dataset.bet);
            document.getElementById('bet-slider').value = currentBet;
            document.getElementById('bet-amount').textContent = `$${currentBet}`;
            updateDisplay();
        });
    });
    
    document.getElementById('bet-slider').addEventListener('input', function() {
        currentBet = parseInt(this.value);
        document.getElementById('bet-amount').textContent = `$${currentBet}`;
        updateDisplay();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('poker-window').style.display === 'none') return;
        
        if (gameState === 'playing') {
            if (e.key === 'h' || e.key === 'H') {
                hit();
            } else if (e.key === 's' || e.key === 'S') {
                stand();
            } else if (e.key === 'f' || e.key === 'F') {
                fold();
            }
        } else if (gameState === 'finished' || gameState === 'betting') {
            if (e.key === 'Enter' || e.key === ' ') {
                dealNewHand();
            }
        }
    });
    
    // Initialize
    gameMessage = 'Welcome to sk1lark Poker! Set your bet and click "Deal New Hand" to start.';
    updateDisplay();
}

// Folder functionality
function initializeFolder() {
    const folderContent = document.querySelector('#folder-window .window-content');
    if (!folderContent) return;
    
    let currentPath = 'C:\\Documents and Settings\\sk1lark\\My Documents';
    let selectedItems = [];
    let isCtrlPressed = false;
    
    // File contents for opening
    const fileContents = {
        'thoughts.txt': `random thoughts from today

- need to finish that english essay about gatsby
- wonder if anyone actually reads these txt files
- should probably organize my music folder soon

sk1lark 2025`,

        'readme.txt': `welcome to sk1lark's computer!

a "personal website"

- hayden`,
    };

    const fileSystem = {
        'C:\\Documents and Settings\\sk1lark\\My Documents': [
            { name: 'My Poems', type: 'folder', size: null, modified: '2003-08-15 14:30' },
            { name: 'sk1lark_website.html', type: 'file', size: '45.2 KB', modified: '2003-09-20 16:45' },
            { name: 'thoughts.txt', type: 'file', size: '2.1 KB', modified: '2003-08-18 09:22' },
            { name: 'retro_vibes.mp3', type: 'file', size: '3.8 MB', modified: '2003-07-12 20:15' },
            { name: 'paint_masterpiece.bmp', type: 'file', size: '256 KB', modified: '2003-08-19 11:30' },
            { name: 'readme.txt', type: 'file', size: '1.5 KB', modified: '2003-08-17 13:45' }
        ],
        'C:\\Documents and Settings\\sk1lark\\My Documents\\My Poems': [
            { name: '..', type: 'back', size: null, modified: null },
            { name: 'midnight_thoughts.txt', type: 'file', size: '4.2 KB', modified: '2024-01-15 23:45' },
            { name: 'digital_dreams.txt', type: 'file', size: '3.1 KB', modified: '2024-01-14 16:20' },
            { name: 'windows_xp_nostalgia.txt', type: 'file', size: '2.8 KB', modified: '2024-01-13 12:10' },
            { name: 'y2k_memories.txt', type: 'file', size: '3.5 KB', modified: '2024-01-16 19:30' }
        ]
    };
    
    // Enhanced UI
    folderContent.innerHTML = `
        <div class="folder-toolbar" style="background: #c0c0c0; padding: 5px; border-bottom: 1px solid #808080; display: flex; gap: 10px; align-items: center;">
            <button id="back-btn" style="padding: 3px 8px; background: #c0c0c0; border: 1px outset #c0c0c0;">⬅️ Back</button>
            <button id="up-btn" style="padding: 3px 8px; background: #c0c0c0; border: 1px outset #c0c0c0;">⬆️ Up</button>
            <span style="flex: 1; padding: 3px; background: white; border: 1px inset #c0c0c0;" id="address-bar">${currentPath}</span>
            <button id="refresh-btn" style="padding: 3px 8px; background: #c0c0c0; border: 1px outset #c0c0c0;">🔄</button>
        </div>
        <div class="folder-view" style="background: white; height: 300px; overflow: auto; padding: 10px;">
            <div class="file-list" id="file-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;">
                <!-- Files will be populated here -->
            </div>
        </div>
        <div class="status-bar" style="background: #c0c0c0; padding: 5px; border-top: 1px solid #808080; font-size: 11px; display: flex; justify-content: space-between;">
            <span id="item-count">0 items</span>
            <span id="selected-count"></span>
        </div>
    `;
    
    const backBtn = document.getElementById('back-btn');
    const upBtn = document.getElementById('up-btn');
    const addressBar = document.getElementById('address-bar');
    const refreshBtn = document.getElementById('refresh-btn');
    const fileList = document.getElementById('file-list');
    const itemCount = document.getElementById('item-count');
    const selectedCount = document.getElementById('selected-count');
    
    function getFileIcon(type, name) {
        if (type === 'folder') return '📁';
        if (type === 'back') return '📁';
        
        const ext = name.split('.').pop().toLowerCase();
        switch(ext) {
            case 'txt': return '📄';
            case 'html': case 'htm': return '🌐';
            case 'mp3': case 'wav': return '🎵';
            case 'png': case 'jpg': case 'gif': return '🖼️';
            case 'exe': return '⚙️';
            default: return '📄';
        }
    }
    
    function renderFileList() {
        const files = fileSystem[currentPath] || [];
        fileList.innerHTML = '';
        
        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.dataset.index = index;
            fileItem.style.cssText = `
                display: flex; flex-direction: column; align-items: center;
                padding: 5px; cursor: pointer; border-radius: 4px;
                text-align: center; font-size: 11px; user-select: none;
            `;
            
            const icon = document.createElement('div');
            icon.style.fontSize = '32px';
            icon.textContent = getFileIcon(file.type, file.name);
            
            const label = document.createElement('div');
            label.textContent = file.name;
            label.style.cssText = 'margin-top: 5px; word-wrap: break-word; max-width: 80px;';
            
            fileItem.appendChild(icon);
            fileItem.appendChild(label);
            
            // Event listeners
            fileItem.addEventListener('click', function(e) {
                if (e.ctrlKey) {
                    this.classList.toggle('selected');
                    if (this.classList.contains('selected')) {
                        selectedItems.push(index);
                    } else {
                        selectedItems = selectedItems.filter(i => i !== index);
                    }
                } else {
                    document.querySelectorAll('.file-item').forEach(item => {
                        item.classList.remove('selected');
                        item.style.background = '';
                    });
                    this.classList.add('selected');
                    this.style.background = '#316AC5';
                    this.style.color = 'white';
                    selectedItems = [index];
                }
                updateStatusBar();
            });
            
            fileItem.addEventListener('dblclick', function() {
                if (file.type === 'folder') {
                    currentPath = currentPath + '\\\\' + file.name;
                    addressBar.textContent = currentPath;
                    selectedItems = [];
                    renderFileList();
                } else if (file.type === 'back') {
                    const pathParts = currentPath.split('\\\\');
                    pathParts.pop();
                    currentPath = pathParts.join('\\\\');
                    addressBar.textContent = currentPath;
                    selectedItems = [];
                    renderFileList();
                } else {
                    openFileInApp(file);
                }
            });
            
            // Context menu
            fileItem.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showContextMenu(e.clientX, e.clientY, file);
            });
            
            fileList.appendChild(fileItem);
        });
        
        updateStatusBar();
    }
    
    function updateStatusBar() {
        const files = fileSystem[currentPath] || [];
        itemCount.textContent = `${files.length} items`;
        
        if (selectedItems.length > 0) {
            selectedCount.textContent = `${selectedItems.length} selected`;
        } else {
            selectedCount.textContent = '';
        }
    }
    
    function openFileInApp(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        
        // Create a new file viewer window
        function createFileWindow(title, content, type = 'text') {
            // Remove any existing file viewer windows
            const existingViewers = document.querySelectorAll('.file-viewer-window');
            existingViewers.forEach(viewer => viewer.remove());

            const fileWindow = document.createElement('div');
            fileWindow.className = 'file-viewer-window';
            fileWindow.style.cssText = `
                position: fixed;
                top: 80px;
                left: 400px;
                width: 600px;
                height: 500px;
                background: #f0f0f0;
                border: 2px outset #c0c0c0;
                z-index: 9999;
                font-family: 'Jersey 10', monospace;
                display: flex;
                flex-direction: column;
            `;

            let contentArea = '';
            if (type === 'text') {
                contentArea = `
                    <div style="flex: 1; padding: 12px; overflow-y: auto; background: white; border: 1px inset #c0c0c0; margin: 8px;">
                        <pre style="font-family: 'Jersey 10', monospace; font-size: 18px; line-height: 1.4; white-space: pre-wrap;">${content}</pre>
                    </div>
                `;
            } else if (type === 'image') {
                contentArea = `
                    <div style="flex: 1; padding: 12px; overflow: auto; background: white; border: 1px inset #c0c0c0; margin: 8px; display: flex; justify-content: center; align-items: center;">
                        <div style="text-align: center; font-size: 20px; color: #666;">
                            🖼️<br>
                            ${file.name}<br>
                            <small style="font-size: 16px;">Image Preview Not Available<br>File Size: ${file.size}</small>
                        </div>
                    </div>
                `;
            } else if (type === 'audio') {
                contentArea = `
                    <div style="flex: 1; padding: 12px; overflow: auto; background: white; border: 1px inset #c0c0c0; margin: 8px; display: flex; justify-content: center; align-items: center;">
                        <div style="text-align: center; font-size: 20px; color: #666;">
                            🎵<br>
                            ${file.name}<br>
                            <small style="font-size: 16px;">Audio File<br>File Size: ${file.size}<br><br>Would open in Windows Media Player</small>
                        </div>
                    </div>
                `;
            } else if (type === 'html') {
                contentArea = `
                    <div style="flex: 1; padding: 12px; overflow-y: auto; background: white; border: 1px inset #c0c0c0; margin: 8px;">
                        <h3 style="font-size: 22px; margin-bottom: 12px;">HTML Preview:</h3>
                        <div style="border: 1px solid #ccc; padding: 12px; margin: 12px 0; background: #fafafa;">
                            <h2 style="font-size: 24px;">Welcome to sk1lark</h2>
                            <p style="font-size: 18px;">A retro digital experience from 2003...</p>
                            <p style="font-size: 16px; color: #666;">This website contains poems, thoughts, and digital art.</p>
                        </div>
                        <h3 style="font-size: 20px; margin: 12px 0;">Source Code:</h3>
                        <pre style="background: #f0f0f0; padding: 12px; border: 1px inset #c0c0c0; font-size: 14px; white-space: pre-wrap;">${content}</pre>
                    </div>
                `;
            }

            fileWindow.innerHTML = `
                <div style="background: linear-gradient(to bottom, #316AC5, #1E4176); color: white; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 20px;">${title}</span>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: #f0f0f0; border: 1px outset #c0c0c0; padding: 2px 8px; font-family: 'Jersey 10', monospace; cursor: pointer; font-size: 16px;">×</button>
                </div>
                ${contentArea}
                <div style="background: #f0f0f0; padding: 6px 10px; border-top: 1px solid #c0c0c0; font-size: 16px; display: flex; justify-content: space-between;">
                    <span>Size: ${file.size}</span>
                    <span>Modified: ${file.modified}</span>
                </div>
            `;

            document.body.appendChild(fileWindow);
        }
        
        // Handle different file types
        if (ext === 'txt' || ext === 'log') {
            let content = fileContents[file.name] || `This is the content of ${file.name}\n\nFile created: ${file.modified}\nSize: ${file.size}`;
            createFileWindow(`📝 Notepad - ${file.name}`, content, 'text');
        } else if (ext === 'html' || ext === 'htm') {
            let content = `<!DOCTYPE html>
<html>
<head>
    <title>sk1lark - Personal Website</title>
</head>
<body>
    <h1>Welcome to sk1lark</h1>
    <p>A retro digital experience...</p>
    <p>This website showcases poetry, music, and digital art.</p>
</body>
</html>`;
            createFileWindow(`🌐 Internet Explorer - ${file.name}`, content, 'html');
        } else if (ext === 'bmp' || ext === 'jpg' || ext === 'png' || ext === 'gif') {
            createFileWindow(`🖼️ Paint - ${file.name}`, '', 'image');
        } else if (ext === 'mp3' || ext === 'wav' || ext === 'wma') {
            createFileWindow(`🎵 Windows Media Player - ${file.name}`, '', 'audio');
        } else {
            createFileWindow(`📄 ${file.name}`, `Unknown file type: ${ext}\n\nThis file cannot be opened with the available applications.\n\nFile: ${file.name}\nSize: ${file.size}\nModified: ${file.modified}`, 'text');
        }
    }
    
    function getFileContent(file) {
        const fileContents = {
            'thoughts.txt': `these are my midnight thoughts...
            
the digital realm whispers to me in binary poetry
screens glow like campfires in the electronic wilderness
where thoughts become data and dreams compile into reality

sometimes i wonder if we're all just subroutines
in some cosmic operating system
processing emotions like variables
storing memories in the registry of time

the keyboard clicks are my heartbeat
the cursor blinks like a digital pulse
and somewhere between ctrl+c and ctrl+v
we find fragments of ourselves

---

written in the blue light of 3am
when the world sleeps but the servers stay awake
processing our digital souls
one byte at a time...`,
            
            'sk1lark_website.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sk1lark - digital poet</title>
    <style>
        body { 
            background: #000; 
            color: #00ff00; 
            font-family: 'Courier New', monospace;
            padding: 20px;
        }
        .container { max-width: 800px; margin: 0 auto; }
        .ascii-art { white-space: pre; font-size: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="ascii-art">
     _   _  _            _ 
 ___| |_/ |/ |__ _ _ ___| | __
/ __| __|  | / _\` | '_/ |/ /
\\__ \\  |1 | \\__,_|_| \\__|  \\
|___/\\___|_|_|____| |_|\\__|\\_\\
        </div>
        <h1>welcome to sk1lark</h1>
        <p>digital poet • retro enthusiast • code dreamer</p>
        
        <h2>latest_thoughts.log</h2>
        <p>exploring the intersection of technology and consciousness</p>
        <p>where nostalgia meets innovation</p>
        
        <h2>contact.exe</h2>
        <p>find me in the digital void...</p>
    </div>
</body>
</html>`,
            
            'calculator_history.txt': `sk1lark Calculator Session Log
Generated: ${new Date().toLocaleString()}

Recent Calculations:
==================
2 + 2 = 4
15 * 7 = 105
256 / 8 = 32
√144 = 12
1337 + 31337 = 32674
2^10 = 1024
π ≈ 3.14159
fibonacci(10) = 55

Advanced Operations:
===================
sin(30°) ≈ 0.5
cos(60°) = 0.5
log(100) = 2
e^1 ≈ 2.71828

Programming Constants:
=====================
ASCII('A') = 65
0xFF = 255 (hex to decimal)
1010₂ = 10₁₀ (binary to decimal)
2024₁₀ = 7E8₁₆ (decimal to hex)

Session Statistics:
==================
Total calculations: 42
Successful operations: 41
Errors: 1 (division by zero)
Average calculation time: 0.003ms
Most used operation: addition (+)

[End of session]`,
            
            'retro_vibes.mp3': '[AUDIO FILE - Cannot display content]\n\nFile Information:\nTitle: retro_vibes.mp3\nArtist: sk1lark\nDuration: 3:47\nBitrate: 320 kbps\nSample Rate: 44.1 kHz\n\nMetadata:\nGenre: Ambient Electronic\nYear: 2024\nAlbum: digital_nostalgia\n\nDescription:\nA synthwave journey through pixelated memories\nCombining retro game sounds with modern ambient textures\nPerfect for coding sessions and late-night digital exploration',
            
            'paint_masterpiece.png': '[IMAGE FILE - Cannot display content]\n\nFile Information:\nFilename: paint_masterpiece.png\nDimensions: 800x600 pixels\nColor Depth: 32-bit RGBA\nFile Size: 256 KB\nCreated: MS Paint (sk1lark edition)\n\nDescription:\nA pixelated landscape featuring:\n- Retro computer graphics aesthetic\n- 16-bit color palette\n- Geometric mountains and digital clouds\n- ASCII art elements integrated into the design\n- Hidden easter eggs in the corner pixels\n\nTechnique: Digital pointillism with mouse precision\nInspiration: Early computer graphics and demo scene art',
            
            'midnight_thoughts.txt': `midnight thoughts v2.1
===================

when the clock strikes 12:00
and the world goes quiet
that's when the machines start dreaming

i sit here in the glow of lcd screens
typing poetry into the void
wondering if anyone else
hears the whispers of the internet

each keystroke is a prayer
to the digital gods
each save file a small act of faith
that tomorrow will still understand
the language we speak tonight

there's something beautiful
about deprecated code
still running somewhere
in forgotten servers
like ghost programs
haunting the web

we are the generation
caught between analog hearts
and digital souls
learning to love
in 1s and 0s

connection established
transmission complete
signing off at 3:33 AM
when the boundary between
real and virtual
becomes beautifully blurred

[saved to: memories/2024/january/]`,
            
            'digital_dreams.txt': `digital dreams
=============

i dream in hexadecimal colors
#FF0000 passion
#0000FF melancholy  
#00FF00 hope

my sleep cycles match
server uptime statistics
REM sleep = rapid eye movement
ROM sleep = read-only memories

in my dreams, i walk through
file directories of consciousness
/usr/bin/happiness
/var/log/regrets
/tmp/tomorrow

the blue screen of death
becomes the blue screen of rebirth
where errors transform into art
and bugs become features
of the human condition

we backup our hearts
to cloud storage
hoping love survives
the inevitable system crash

every morning i reboot
with yesterday's cache cleared
ready to process new experiences
compile fresh hopes
and execute another day
in this beautiful glitch
we call existence`,
            
            'windows_xp_nostalgia.txt': `windows xp nostalgia
===================

there was magic in that startup sound
that four-note symphony of possibility
when computers still felt like companions
not just tools

remember when desktop backgrounds
were personal statements?
bliss.jpg rolling hills forever
green pixels of digital zen

the satisfaction of defragmenting
watching colored blocks reorganize
like tetris for your soul's filing system
making chaos into order

internet explorer launching
with that satisfying click
dial-up handshake songs
connecting us to infinite worlds
one 56k dream at a time

pinball, minesweeper, solitaire
simple pleasures built into the OS
when games were features
not invasive updates

the blue screen wasn't an enemy
it was a teacher
showing us that perfection
was just another word
for impossible

and somewhere in all those
start menu adventures
we learned that technology
could be both powerful
and wonderfully imperfect
just like us`,
            
            'y2k_memories.txt': `y2k memories
============

we thought the world would end
at midnight on december 31st, 2024
computers everywhere would forget
how to count past 99

but instead we got something better:
a collective moment of digital faith
where humanity held its breath
and pressed enter into tomorrow

i was young then, watching adults
stockpile batteries and water
while i dreamed of flying cars
and video phones by 2010

the bug that never came
became the feature we needed:
proof that our fears
are rarely as powerful
as our ability to adapt

now i look back at Y2K
as the moment we realized
we had built something so complex
we couldn't predict its behavior

like teaching a child to walk
then being surprised
when they run toward tomorrow
on legs we helped create

the millennium bug taught us
that the future is not
a problem to be solved
but a mystery to be lived

and here we are, decades later
still debugging reality
still patching the human condition
still amazed that anything works
in this beautiful chaos
we call the digital age

[timestamp: 2024.01.16_19:30:42]
[location: C:\\Users\\sk1lark\\Desktop\\memories\\]
[encoding: UTF-8 with nostalgic compression]`
        };
        
        return fileContents[file.name] || `File: ${file.name}\nSize: ${file.size}\nModified: ${file.modified}\n\n[Content not available in demo]`;
    }
    
    function showFilePreview(file) {
        const content = getFileContent(file);
        
        const preview = document.createElement('div');
        preview.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: white; border: 2px outset #c0c0c0; padding: 20px;
            z-index: 10000; max-width: 500px; max-height: 400px; overflow: auto;
            box-shadow: 4px 4px 8px rgba(0,0,0,0.3);
        `;
        preview.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #c0c0c0; padding-bottom: 10px;">
                <strong>${getFileIcon(file.type, file.name)} ${file.name}</strong>
                <div>
                    <button onclick="window.openFileInApp({name: '${file.name}', type: '${file.type}', size: '${file.size}', modified: '${file.modified}'})" 
                            style="background: #c0c0c0; border: 1px outset #c0c0c0; padding: 2px 8px; margin-right: 5px; cursor: pointer;">Open With...</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: #c0c0c0; border: 1px outset #c0c0c0; padding: 2px 6px; cursor: pointer;">×</button>
                </div>
            </div>
            <div style="margin-bottom: 10px; font-size: 11px; color: #666;">
                Size: ${file.size} | Modified: ${file.modified}
            </div>
            <pre style="font-family: 'Courier New', monospace; font-size: 11px; white-space: pre-wrap; background: #f8f8f8; padding: 10px; border: 1px inset #c0c0c0; max-height: 250px; overflow: auto;">${content}</pre>
        `;
        document.body.appendChild(preview);
        
        // Make openFileInApp globally available for the button
        window.openFileInApp = openFileInApp;
    }
    
    function showContextMenu(x, y, file) {
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) existingMenu.remove();
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            position: fixed; left: ${x}px; top: ${y}px; background: #c0c0c0;
            border: 1px outset #c0c0c0; z-index: 10000; font-size: 12px;
        `;
        
        const options = [
            { text: 'Open', action: () => openFileInApp(file) },
            { text: 'Open with...', action: () => showFilePreview(file) },
            { text: '---', action: null },
            { text: 'Properties', action: () => alert(`File: ${file.name}\nSize: ${file.size}\nModified: ${file.modified}`) }
        ];
        
        options.forEach(option => {
            if (option.text === '---') {
                const hr = document.createElement('hr');
                hr.style.cssText = 'margin: 2px; border: 1px inset #c0c0c0;';
                menu.appendChild(hr);
            } else {
                const item = document.createElement('div');
                item.textContent = option.text;
                item.style.cssText = 'padding: 5px 15px; cursor: pointer;';
                item.addEventListener('click', () => {
                    option.action();
                    menu.remove();
                });
                item.addEventListener('mouseover', () => item.style.background = '#316AC5');
                item.addEventListener('mouseout', () => item.style.background = '');
                menu.appendChild(item);
            }
        });
        
        document.body.appendChild(menu);
        
        // Remove menu on click outside
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            });
        }, 10);
    }
    
    // Event listeners
    backBtn.addEventListener('click', function() {
        const pathParts = currentPath.split('\\\\');
        if (pathParts.length > 1) {
            pathParts.pop();
            currentPath = pathParts.join('\\\\');
            addressBar.textContent = currentPath;
            selectedItems = [];
            renderFileList();
        }
    });
    
    refreshBtn.addEventListener('click', function() {
        selectedItems = [];
        renderFileList();
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('folder-window').style.display === 'none') return;
        
        isCtrlPressed = e.ctrlKey;
        
        if (e.key === 'F5') {
            e.preventDefault();
            refreshBtn.click();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            backBtn.click();
        } else if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            // Select all
            document.querySelectorAll('.file-item').forEach((item, index) => {
                item.classList.add('selected');
                item.style.background = '#316AC5';
                item.style.color = 'white';
            });
            selectedItems = Array.from({length: fileList.children.length}, (_, i) => i);
            updateStatusBar();
        }
    });
    
    document.addEventListener('keyup', function(e) {
        isCtrlPressed = e.ctrlKey;
    });
    
    // Initialize
    renderFileList();
}

// Initialize dragging when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure windows are loaded
    setTimeout(makeWindowsDraggable, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + Tab to switch tabs
    if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const tabs = document.querySelectorAll('.tab');
        const activeTab = document.querySelector('.tab.active');
        const activeIndex = Array.from(tabs).indexOf(activeTab);
        const nextIndex = (activeIndex + 1) % tabs.length;
        
        tabs[nextIndex].click();
    }
    
    // Ctrl + W to close (just for demonstration)
    if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        document.querySelector('.close-btn').click();
    }
    
    // F11 to toggle maximize
    if (e.key === 'F11') {
        e.preventDefault();
        document.querySelector('.maximize-btn').click();
    }
});

// Add some retro sound effects (visual feedback only)
function addRetroFeedback() {
    const clickableElements = document.querySelectorAll('button, .tab, .menu-item, .start-button');
    
    clickableElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(0)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize retro feedback
document.addEventListener('DOMContentLoaded', addRetroFeedback);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        const titleBar = document.querySelector('.title-bar');
        titleBar.style.background = 'linear-gradient(to right, #ff0000 0%, #ffffff 50%, #0000ff 100%)';
        
        setTimeout(() => {
            titleBar.style.background = 'linear-gradient(to right, #0058cc 0%, #4080ff 100%)';
        }, 3000);
        
        konamiCode = []; // Reset
    }
});

// Lived-in computer features
function initializeLivedInFeatures() {
    // Set a more realistic time
    const now = new Date();
    now.setHours(23, 47, 0, 0); // 11:47 PM
    
    // Randomly update the time display occasionally
    setTimeout(() => {
        const timeDisplay = document.querySelector('.time');
        if (timeDisplay) {
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            timeDisplay.textContent = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        }
    }, 2000);
    
    // Initialize terminal
    initializeTerminal();
}

// Terminal functionality
function initializeTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (!terminalInput || !terminalOutput) return;
    
    let currentDirectory = 'C:\\Documents and Settings\\sk1lark';
    
    const commands = {
        'help': () => {
            return `Available commands:
dir         - List directory contents
cd          - Change directory
type        - Display file contents
cls         - Clear screen
echo        - Display text
date        - Show current date
time        - Show current time
ver         - Show version info
whoami      - Show current user
tree        - Show directory tree
help        - Show this help`;
        },
        
        'dir': () => {
            if (currentDirectory.includes('sk1lark')) {
                return ` Volume in drive C has no label.
 Volume Serial Number is 3F7A-12B9

 Directory of ${currentDirectory}

03/15/97  11:47p      &lt;DIR&gt;          .
03/15/97  11:47p      &lt;DIR&gt;          ..
03/15/97  11:23p             847 untitled.txt
03/12/97   3:14a           2,156 thoughts at 3am.txt
03/10/97   9:45a             412 to-do list.txt
03/15/97  11:24p             847 Copy of untitled.txt
03/08/97   7:32p      &lt;DIR&gt;          Downloads
03/14/97   2:17p      &lt;DIR&gt;          Temp
03/09/97   7:22p           3,742 letter to anna.txt
03/11/97  10:15p           1,823 book quotes i love.txt
02/14/97   4:30p             621 recipe from grandma.txt
03/05/97   6:18p         823,456 sunset from my window.bmp
02/28/97   6:45p       1,254,832 wallpaper.bmp
02/20/97   3:45p      &lt;DIR&gt;          Mix CDs from hyn
03/13/97   8:12a           2,348 dreams i remember.txt
03/15/97  11:47p           1,203 readme.txt
              10 file(s)      2,087,481 bytes
               5 dir(s)   1,847,568,384 bytes free`;
            } else {
                return ` Directory of ${currentDirectory}
 
 Directory not found or access denied.`;
            }
        },
        
        'cls': () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        
        'date': () => {
            const now = new Date();
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayName = dayNames[now.getDay()];
            const dateString = now.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
            }).replace(/\//g, '/');
            return `Current date is ${dayName} ${dateString}`;
        },
        
        'time': () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            return `Current time is ${timeString}`;
        },
        
        'ver': () => {
            return 'Microsoft Windows 95 [Version 4.00.950]';
        },
        
        'whoami': () => {
            return 'sk1lark';
        },
        
        'tree': () => {
            return `Folder PATH listing for volume Local Disk
Volume serial number is 3F7A-12B9
C:.
├───Documents and Settings
│   └───sk1lark
│       ├───My Documents
│       │   ├───Downloads
│       │   ├───Temp
│       │   └───Mix CDs from hyn
│       └───Desktop
├───Program Files
│   ├───Microsoft Office
│   ├───Netscape Navigator
│   ├───Winamp
│   └───Windows Media Player
├───WINDOWS
│   ├───System
│   ├───System32
│   └───Temp
└───Temp`;
        },
        
        'type': (filename) => {
            if (!filename) {
                return 'The syntax of the command is incorrect.\nUsage: TYPE filename';
            }
            
            const files = {
                'untitled.txt': 'September 15, 2025 - 11:47 PM\n\nrain against the window again.\n\nit\'s getting cold but i keep sipping it anyway.\n\n> am i gonna remember to water my plants?',
                'readme.txt': 'sk1lark\'s computer - september 2025\n\nwelcome to my digital space!\n\nthis computer contains:\n- my terrible poetry attempts\n- half-finished letters to friends\n- way too many saved discord conversations\n- a growing collection of song lyrics written on my phone\n- photos from last summer that i still need to organize\n- the beginnings of stories i\'ll probably never finish',
                'thoughts at 3am.txt': 'why is it that everything feels more real at 3am?\nthe thoughts that seem so important in the darkness\nbecome silly by morning light\n\nbut maybe that\'s the point\nmaybe 3am thoughts are the truest ones\nwhen all the defenses are down\nand you\'re too tired to lie to yourself',
                'to-do list.txt': '- finish english paper (due tomorrow!!!)\n- call hyn back\n- water the plants (they look sad)\n- organize cd collection\n- write in journal\n- buy milk\n- figure out life (optional)',
            };
            
            return files[filename] || `File not found: ${filename}`;
        },
        
        'echo': (text) => {
            return text || '';
        },
        
        'cd': (path) => {
            if (!path || path === '..') {
                if (currentDirectory.includes('sk1lark')) {
                    currentDirectory = 'C:\\Documents and Settings';
                } else {
                    currentDirectory = 'C:\\';
                }
            } else if (path === '\\' || path === '/') {
                currentDirectory = 'C:\\';
            } else {
                currentDirectory = path;
            }
            return '';
        }
    };
    
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            const commandParts = command.split(' ');
            const cmd = commandParts[0].toLowerCase();
            const args = commandParts.slice(1).join(' ');
            
            // Add command to output
            addTerminalLine(`${currentDirectory}>${command}`);
            
            // Execute command
            if (commands[cmd]) {
                const result = commands[cmd](args);
                if (result) {
                    addTerminalLine(result);
                }
            } else if (command) {
                addTerminalLine(`'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`);
            }
            
            // Update prompt
            updateTerminalPrompt();
            terminalInput.value = '';
        }
    });
    
    function addTerminalLine(text) {
        if (text) {
            const lines = text.split('\n');
            lines.forEach(line => {
                const div = document.createElement('div');
                div.className = 'terminal-line';
                div.innerHTML = line;
                terminalOutput.appendChild(div);
            });
        }
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function updateTerminalPrompt() {
        const promptElement = document.querySelector('.terminal-prompt');
        if (promptElement) {
            promptElement.textContent = `${currentDirectory}>`;
        }
    }
    
    // Add some desktop file timestamps that feel lived-in
    addDesktopFileInteractions();
}

function simulateSystemActivity() {
    // Randomly blink system tray icons to simulate activity
    const trayIcons = document.querySelectorAll('.tray-icon');
    if (trayIcons.length > 0 && Math.random() < 0.3) {
        const randomIcon = trayIcons[Math.floor(Math.random() * trayIcons.length)];
        randomIcon.style.opacity = '0.5';
        setTimeout(() => {
            randomIcon.style.opacity = '1';
        }, 500);
    }
    
    // Occasionally show a fake notification
    if (Math.random() < 0.1) {
        showFakeNotification();
    }
}

function addDesktopFileInteractions() {
    // Add click handlers for the new desktop files
    const desktopDocs = document.querySelectorAll('.desktop-icon[data-app="document"]');
    desktopDocs.forEach(doc => {
        doc.addEventListener('dblclick', () => {
            const fileName = doc.querySelector('.label').textContent;
            if (fileName.includes('New Text Document')) {
                openNotepadWithContent('(this document is empty)');
            } else if (fileName.includes('backup')) {
                openNotepadWithContent(`Backup created: September 15, 2025 11:24 PM

Original file: untitled.txt
Size: 847 bytes
Modified: September 15, 2025 11:23 PM

--- File Contents ---
September 15, 2025 - 11:23 PM

thoughts at 3am but its only 11:23:
- finish english paper (due tomorrow lol)
- call mom back
- figure out why computer keeps making that weird noise
- install that new modem driver maybe??

[backup created automatically]`);
            } else if (fileName.includes('gratitude')) {
                openNotepadWithContent(`September 15, 2025

things i'm grateful for today:
- mom's hot chocolate (still warm on my desk)
- the sound of rain on my window
- having this quiet corner of the house
- hyn's mix CD that came in the mail
- finding that perfect phrase for my poem
- the cat sleeping on my textbooks
- staying up late without having to explain why
- the way the computer screen glows in the dark
- having friends who understand

small moments that felt like home today:
when claire smiled at me in the library. when the radio played
that song i love right when i needed to hear it. when i finally
figured out that math problem. when mom knocked softly and
brought me tea without asking.

tomorrow: more of this. more noticing. more gratitude.`);
            }
        });
    });
    
    // Add handler for cozy folder
    const cozyFolder = document.querySelector('.desktop-icon[data-app="cozy-folder"]');
    if (cozyFolder) {
        cozyFolder.addEventListener('dblclick', () => {
            openCozyFolder();
        });
    }
}

function openNotepadWithContent(content) {
    const notepadWindow = document.getElementById('notepad-window');
    const notepadTextarea = document.querySelector('.notepad-textarea');
    const titleBar = notepadWindow.querySelector('.title-bar-text');
    
    if (notepadTextarea) {
        notepadTextarea.value = content;
    }
    
    notepadWindow.classList.add('active');
    notepadWindow.style.display = 'flex';
    notepadWindow.style.zIndex = '200';
    
    // Update title to show it's a different file
    if (titleBar && content.includes('backup')) {
        titleBar.innerHTML = '<span class="title-bar-icon" data-app="notepad"></span>backup_september15.txt - notepad';
    } else if (titleBar && content.includes('grateful')) {
        titleBar.innerHTML = '<span class="title-bar-icon" data-app="notepad"></span>gratitude journal.txt - notepad';
    }
}

function openCozyFolder() {
    const folderWindow = document.getElementById('folder-window');
    const addressBar = folderWindow.querySelector('.address-bar span');
    const titleBar = folderWindow.querySelector('.title-bar-text');
    const fileList = folderWindow.querySelector('.file-list');
    
    // Update title and address
    if (titleBar) {
        titleBar.innerHTML = '<span class="title-bar-icon" data-app="my-documents"></span>cozy things';
    }
    if (addressBar) {
        addressBar.textContent = 'C:\\Documents and Settings\\sk1lark\\My Documents\\cozy things';
    }
    
    // Update file list with cozy content
    if (fileList) {
        fileList.innerHTML = `
            <div class="file-item">
                <div class="file-icon">📄</div>
                <span>favorite quotes for bad days.txt</span>
                <div class="file-details">2.1 KB - Text Document - 3/8/97 9:30 PM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📄</div>
                <span>recipe for perfect hot chocolate.txt</span>
                <div class="file-details">645 bytes - Text Document - 12/22/96 7:15 PM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📄</div>
                <span>list of books that changed me.txt</span>
                <div class="file-details">1.8 KB - Text Document - 2/18/97 11:45 PM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">🖼️</div>
                <span>polaroids from last summer.bmp</span>
                <div class="file-details">2.3 MB - Bitmap Image - 8/15/96 4:22 PM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📄</div>
                <span>letters i'll never send.txt</span>
                <div class="file-details">4.2 KB - Text Document - 3/14/97 1:17 AM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📄</div>
                <span>mom's advice from growing up.txt</span>
                <div class="file-details">3.1 KB - Text Document - 11/8/96 6:30 PM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📁</div>
                <span>mix tapes from friends</span>
                <div class="file-details">File Folder - 1/20/97 2:15 PM</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📄</div>
                <span>dreams worth remembering.txt</span>
                <div class="file-details">1.7 KB - Text Document - 3/13/97 8:12 AM</div>
            </div>
        `;
    }
    
    folderWindow.classList.add('active');
    folderWindow.style.display = 'flex';
    folderWindow.style.zIndex = '200';
}

function showFakeNotification() {
    const notifications = [
        "New mail from hyn ♡",
        "Download complete: cozy_playlist_vol3.zip",
        "Reminder: call grandma this weekend",
        "New message in poetry forum",
        "Claire shared a book recommendation",
        "Rain sounds download finished",
        "Mom left a note on your desk"
    ];
    
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 50px;
        right: 20px;
        background: #ffffcc;
        border: 2px outset #c0c0c0;
        padding: 8px 12px;
        font-family: 'Jersey 10', 'MS Sans Serif', sans-serif;
        font-size: 11px;
        z-index: 9999;
        max-width: 200px;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    `;
    toast.textContent = randomNotification;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Console message for visitors
console.log(`
██╗  ██╗ ██╗██╗      █████╗ ██████╗ ██╗  ██╗
██║  ██║███║██║     ██╔══██╗██╔══██╗██║ ██╔╝
███████║╚██║██║     ███████║██████╔╝█████╔╝ 
╚════██║ ██║██║     ██╔══██║██╔══██╗██╔═██╗ 
     ██║ ██║███████╗██║  ██║██║  ██║██║  ██╗
     ╚═╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

Welcome to sk1lark's retro website!
Try the Konami code for a surprise...
`);