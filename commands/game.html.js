/*CMD
  command: game.html
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>BB Bug Hunter</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
  <script src='//whephiwums.com/sdk.js' data-zone='8975372' data-sdk='show_8975372'></script>
  <style>
    :root {
      --primary-color: #2e3d49;
      --accent-color: #ff6f61;
      --bg-color: #f7f7f7;
      --game-bg: #e0f7fa;
      --zeher-color: rgba(255, 0, 0, 0.3);
      --bottle-color: #4CAF50;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', sans-serif;
      background: var(--bg-color);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
    }

    .game-container {
      text-align: center;
      width: 100%;
      height: 100%;
      position: relative;
    }

    #score, #bugCount, #bottlePercentage, #highScore {
      font-size: 1.2em;
      margin-top: 80px;
      color: var(--primary-color);
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
    }

    #bugCount {
      top: 40px;
    }

    #bottlePercentage {
      top: 70px;
    }

    #highScore {
      top: 100px;
    }

    #gameArea {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    .bug {
      position: absolute;
      font-size: 52px;
      cursor: pointer;
      user-select: none;
    }

    .bug.splat {
      animation: splat 0.4s forwards;
    }

    @keyframes splat {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    #bottle {
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 40px;
      height: 80px;
      background-image: url('https://i.ibb.co/6jkRnKY/pngegg.png');
      background-size: cover;
      cursor: pointer;
      z-index: 2;
    }

    #bottleFill {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: red;
      transition: height 0.5s;
    }

    .zeherZone {
      position: absolute;
      background: var(--zeher-color);
      border-radius: 50%;
      pointer-events: none;
      animation: spray 0.5s ease-out;
    }

    @keyframes spray {
      0% { transform: scale(0); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    #pauseButton, #muteButton, #hapticButton {
      position: absolute;
      top: 100px;
      right: 10px;
      font-size: 1.2em;
      cursor: pointer;
      z-index: 2;
      background: rgba(255, 255, 255, 0.8);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #muteButton {
      right: 60px;
    }

    #hapticButton {
      right: 110px;
    }

    #startScreen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #2e3d49, #1c2833);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 3;
      color: white;
    }

    #startScreen h1 {
      font-size: 3em;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    #startScreen p {
      font-size: 1.2em;
      margin-bottom: 40px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    #startScreen button {
      font-size: 1.2em;
      padding: 10px 20px;
      margin: 10px;
      cursor: pointer;
      background: var(--accent-color);
      border: none;
      border-radius: 5px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #startScreen #highScoreHome {
      font-size: 1.2em;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .modal {
      width: 90%;
      max-width: 600px;
    }

    .modal .slider-container {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 300px;
    }

    .modal .slider {
      display: flex;
      transition: transform 0.5s ease;
      height: 100%;
    }

    .modal img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      border: 2px solid white;
      border-radius: 10px;
      flex: 0 0 100%;
    }

    .modal .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.8);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
    }

    .modal .arrow.left {
      left: 10px;
    }

    .modal .arrow.right {
      right: 10px;
    }

    #pausePopup {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 3;
      color: white;
    }

    #pausePopup button {
      font-size: 1.2em;
      padding: 10px 20px;
      margin: 10px;
      cursor: pointer;
      background: var(--accent-color);
      border: none;
      border-radius: 5px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <div id="score">Score: 0</div>
    <div id="bugCount">Alive Bugs: 0/100</div>
    <div id="bottlePercentage">Zeher Filled: 0%</div>
    <div id="highScore">High Score: 0</div>
    <button id="pauseButton" onclick="pauseGame()"><i class="fas fa-pause"></i></button>
    <button id="muteButton" onclick="toggleMute()"><i class="fas fa-volume-up"></i></button>
    <button id="hapticButton" onclick="toggleHaptic()"><i class="fas fa-hand-paper"></i></button>
    <div id="gameArea">
      <div id="bottle" onclick="activateZeher()">
        <div id="bottleFill"></div>
      </div>
    </div>
    <div id="startScreen">
      <h1>BB Bug Hunter</h1>
      <p>Kill bugs before they overrun the area!</p>
      <div id="highScoreHome">High Score: 0</div>
      <button onclick="startGame()"><i class="fas fa-play"></i> Play</button>
      <button onclick="showBackgroundSelection()"><i class="fas fa-image"></i> Change Background</button>
    </div>
    <div id="pausePopup">
      <button onclick="resumeGame()"><i class="fas fa-play"></i> Resume</button>
      <button onclick="showBackgroundSelection()"><i class="fas fa-image"></i> Change Background</button>
    </div>
  </div>

  <div id="backgroundModal" class="modal">
    <div class="modal-content">
      <h4>Select Background</h4>
      <div class="slider-container">
        <div class="slider">
          <img src="https://i.ibb.co/MkC7Tbpv/IMG-20250306-090738-871.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/dschjJGt/IMG-20250306-090852-186.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/Y4ZWHZcY/IMG-20250306-091051-133.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/WNq8HJ5J/IMG-20250306-091116-774.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/G47cp26L/IMG-20250306-091136-768.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/DHnHwNTb/IMG-20250306-091202-233.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/NcNQQkP/IMG-20250306-091236-592.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/DPy89jRt/IMG-20250306-091326-494.jpg" onclick="changeBackground(this.src)">
          <img src="https://i.ibb.co/HLFFGzSR/IMG-20250306-091256-060.jpg" onclick="changeBackground(this.src)">
        </div>
        <button class="arrow left" onclick="slideBackground(-1)"><i class="fas fa-chevron-left"></i></button>
        <button class="arrow right" onclick="slideBackground(1)"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script>
  
    const tg = window.Telegram.WebApp;
    tg.ready()
    tg.requestFullscreen()
    tg.disableVerticalSwipes()
    tg.enableClosingConfirmation()
    const maxBugs = 100;
    const bugSpawnIntervalTime = 500;
    const bottleFillTime = 15000;
    const zeherDuration = 6000;
    const zeherRadius = 120;
    const backgroundImages = [
      "https://i.ibb.co/MkC7Tbpv/IMG-20250306-090738-871.jpg",
      "https://i.ibb.co/dschjJGt/IMG-20250306-090852-186.jpg",
      "https://i.ibb.co/Y4ZWHZcY/IMG-20250306-091051-133.jpg",
      "https://i.ibb.co/WNq8HJ5J/IMG-20250306-091116-774.jpg",
      "https://i.ibb.co/G47cp26L/IMG-20250306-091136-768.jpg",
      "https://i.ibb.co/DHnHwNTb/IMG-20250306-091202-233.jpg",
      "https://i.ibb.co/NcNQQkP/IMG-20250306-091236-592.jpg",
      "https://i.ibb.co/DPy89jRt/IMG-20250306-091326-494.jpg",
      "https://i.ibb.co/HLFFGzSR/IMG-20250306-091256-060.jpg"
    ];

    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    const bugCountDisplay = document.getElementById('bugCount');
    const bottlePercentageDisplay = document.getElementById('bottlePercentage');
    const highScoreDisplay = document.getElementById('highScore');
    const highScoreHomeDisplay = document.getElementById('highScoreHome');
    const bottleFill = document.getElementById('bottleFill');
    const startScreen = document.getElementById('startScreen');
    const pausePopup = document.getElementById('pausePopup');
    const backgroundModal = document.getElementById('backgroundModal');
    const slider = document.querySelector('.slider');
    const muteButton = document.getElementById('muteButton');
    const hapticButton = document.getElementById('hapticButton');
    let score = 0;
    let aliveBugs = 0;
    const bugEmojis = ['🐞', '🦗', '🐜', '🦟'];
    let bugs = [];
    let bottleFilled = false;
    let zeherZone = null;
    let gamePaused = false;
    let bugSpawnInterval;
    let bottleFillInterval;
    let currentSlide = 0;
    let highScore = 0;
    let isMuted = false;
    let isHapticEnabled = true;
    let audio = new Audio('https://upayme.link/music/best-game.mp3');

    document.addEventListener('DOMContentLoaded', function () {
      const modal = M.Modal.init(backgroundModal, {
        onCloseEnd: () => {
          if (gamePaused) {
            pausePopup.style.display = 'flex';
          }
        }
      });
    });

    tg.CloudStorage.getItem('highScore', (err, value) => {
      if (!err && value) {
        highScore = parseInt(value, 10);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        highScoreHomeDisplay.textContent = `High Score: ${highScore}`;
      }
    });

    gameArea.style.backgroundImage = `url('${backgroundImages[Math.floor(Math.random() * backgroundImages.length)]}')`;

    function startGame() {
      startScreen.style.display = 'none';
      gamePaused = false;
      score = 0;
      aliveBugs = 0;
      updateScore();
      updateBugCount();
      bottleFill.style.height = '0%';
      bottlePercentageDisplay.textContent = 'Zeher Filled: 0%';
      bugs.forEach(bug => gameArea.removeChild(bug));
      bugs = [];

      audio.loop = true;
      audio.play();

      bugSpawnInterval = setInterval(() => {
        if (!gamePaused && aliveBugs < maxBugs) {
          const bug = createBug();
          bugs.push(bug);
          aliveBugs++;
          updateBugCount();
          checkBugInZeher(bug);
        } else if (aliveBugs >= maxBugs) {
          endGame();
        }
      }, bugSpawnIntervalTime);

      bottleFillInterval = setInterval(() => {
        if (!gamePaused && !bottleFilled) {
          const fillHeight = parseFloat(bottleFill.style.height) || 0;
          const newFillHeight = Math.min(fillHeight + 10, 100);
          bottleFill.style.height = `${newFillHeight}%`;
          bottlePercentageDisplay.textContent = `Zeher Filled: ${newFillHeight}%`;
          if (newFillHeight >= 100) {
            bottleFilled = true;
          }
        }
      }, bottleFillTime / 10);
    }

    function pauseGame() {
      gamePaused = true;
      audio.pause();
      pausePopup.style.display = 'flex';
      show_8975372().then(() => {
      }).catch(e => {
      });
    }

    function resumeGame() {
      gamePaused = false;
      audio.play();
      pausePopup.style.display = 'none';
    }

    function showBackgroundSelection() {
      const modal = M.Modal.getInstance(backgroundModal);
      modal.open();
    }

    function changeBackground(src) {
      gameArea.style.backgroundImage = `url('${src}')`;
      const modal = M.Modal.getInstance(backgroundModal);
      modal.close();
    }

    function slideBackground(direction) {
      currentSlide = (currentSlide + direction + backgroundImages.length) % backgroundImages.length;
      slider.style.transform = `translateX(${-currentSlide * 100}%)`;
    }

    function createBug() {
      const bug = document.createElement('span');
      bug.classList.add('bug');
      bug.textContent = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];
      const pos = randomPosition();
      bug.style.left = pos.x + 'px';
      bug.style.top = pos.y + 'px';
      gameArea.appendChild(bug);

      bug.moveInterval = setInterval(() => {
        if (!gamePaused && !bug.classList.contains('splat')) {
          const newPos = randomPosition();
          bug.style.left = newPos.x + 'px';
          bug.style.top = newPos.y + 'px';
          checkBugInZeher(bug);
        }
      }, 1500 + Math.random() * 1000);

      bug.addEventListener('click', () => {
        if (!gamePaused && !bug.classList.contains('splat')) {
          killBug(bug);
        }
      });

      return bug;
    }

    function randomPosition() {
      const bugSize = 60;
      const gameRect = gameArea.getBoundingClientRect();
      const bottleRect = document.getElementById('bottle').getBoundingClientRect();
      const scoreRect = document.getElementById('score').getBoundingClientRect();
      const bugCountRect = document.getElementById('bugCount').getBoundingClientRect();
      const bottlePercentageRect = document.getElementById('bottlePercentage').getBoundingClientRect();
      const highScoreRect = document.getElementById('highScore').getBoundingClientRect();

      const padding = 0.03;
      const minX = gameRect.width * padding;
      const maxX = gameRect.width * (1 - padding);
      const minY = gameRect.height * padding;
      const maxY = gameRect.height * (1 - padding);

      let x, y;
      do {
        x = Math.random() * (maxX - minX) + minX;
        y = Math.random() * (maxY - minY) + minY;
      } while (
        x + bugSize > bottleRect.left && x < bottleRect.right &&
        y + bugSize > bottleRect.top && y < bottleRect.bottom
      );

      return { x, y };
    }

    function activateZeher() {
      if (bottleFilled && !gamePaused) {
        bottleFilled = false;
        bottleFill.style.height = '0%';
        bottlePercentageDisplay.textContent = 'Zeher Filled: 0%';
        const pos = randomPosition();
        zeherZone = document.createElement('div');
        zeherZone.classList.add('zeherZone');
        zeherZone.style.width = `${zeherRadius * 2}px`;
        zeherZone.style.height = `${zeherRadius * 2}px`;
        zeherZone.style.left = `${pos.x - zeherRadius}px`;
        zeherZone.style.top = `${pos.y - zeherRadius}px`;
        gameArea.appendChild(zeherZone);

        bugs.forEach(bug => {
          checkBugInZeher(bug);
        });

        setTimeout(() => {
          if (zeherZone && gameArea.contains(zeherZone)) {
            gameArea.removeChild(zeherZone);
            zeherZone = null;
          }
        }, zeherDuration);
      }
    }

    function checkBugInZeher(bug) {
      if (zeherZone && !bug.classList.contains('splat')) {
        const bugRect = bug.getBoundingClientRect();
        const bugX = bugRect.left + bugRect.width / 2;
        const bugY = bugRect.top + bugRect.height / 2;
        const zeherX = parseFloat(zeherZone.style.left) + zeherRadius;
        const zeherY = parseFloat(zeherZone.style.top) + zeherRadius;
        if (Math.hypot(bugX - zeherX, bugY - zeherY) < zeherRadius) {
          killBug(bug);
        }
      }
    }

    function killBug(bug) {
      bug.classList.add('splat');
      score++;
      aliveBugs--;
      updateScore();
      updateBugCount();
      setTimeout(() => gameArea.removeChild(bug), 400);

      if (isHapticEnabled) {
        tg.HapticFeedback.impactOccurred('light');
      }
    }

    function updateScore() {
      scoreDisplay.textContent = `Score: ${score}`;
    }

    function updateBugCount() {
      bugCountDisplay.textContent = `Alive Bugs: ${aliveBugs}/${maxBugs}`;
    }

    function toggleMute() {
      isMuted = !isMuted;
      audio.muted = isMuted;
      muteButton.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    }

    function toggleHaptic() {
      isHapticEnabled = !isHapticEnabled;
      hapticButton.innerHTML = isHapticEnabled ? '<i class="fas fa-hand-paper"></i>' : '<i class="fas fa-hand-paper" style="opacity: 0.5;"></i>';
    }

    function endGame() {
      audio.pause();
      clearInterval(bugSpawnInterval);
      clearInterval(bottleFillInterval);
      if (score > highScore) {
        highScore = score;
        tg.CloudStorage.setItem('highScore', highScore.toString(), (err) => {
          if (err) {
            console.error('Failed to save high score:', err);
          }
        });
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        highScoreHomeDisplay.textContent = `High Score: ${highScore}`;
      }

      Swal.fire({
        title: 'Game Over!',
        html: `Your final score is <b>${score}</b>. High Score: <b>${highScore}</b>`,
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Back to Home',
      }).then((result) => {
        if (result.isConfirmed) {
          show_8975372().then(() => {
           window.location.reload();
          });
        } else {
          show_8975372().then(() => {
            window.location.reload();
          });
        }
      });
    }
  </script>
</body>
</html>
