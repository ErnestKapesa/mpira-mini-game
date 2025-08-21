// Game: Mpira - African Ball Adventure
import { LEVELS, AFRICAN_PROVERBS } from './levels.js';

const { Engine, Render, World, Bodies, Body, Events, Vector } = Matter;

class StarJumpGame {
  constructor() {
    this.canvas = document.getElementById('game');
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.render = null;
    this.currentLevel = 0;
     this.gameState = 'menu'; // menu, playing, paused, won, lost
     this.score = 0;
     this.height = 0;
     this.maxHeight = 0;
     this.unlockedLevels = this.getUnlockedLevels(); // Dynamic level unlocking
     this.totalScore = this.getTotalScore();
     this.collectedStars = 0;
     this.levelScores = this.getLevelScores(); // Track individual level scores
     this.scoreRequirements = this.getScoreRequirements(); // Score needed to unlock each level
     this.isMobile = this.detectMobile(); // Mobile device detection
     this.lastTouchTime = 0; // Prevent double-tap zoom
    this.gameObjects = { 
      ball: null, 
      platforms: [], 
      obstacles: [], 
      stars: [], 
      movingPlatforms: [],
      powerUps: []
    };
    
    // African power-up effects
    this.activePowerUps = {
      strength: false,
      wisdom: false,
      protection: false,
      ancestral: false
    };
    this.powerUpTimers = {};
    this.gameLoop = null;
    this.camera = { y: 0 };
    this.jumpForce = this.isMobile ? 0.025 : 0.020; // Much stronger jump force for playable game
     this.isJumping = false;
     this.particles = [];
     this.touchStartTime = 0;
     this.touchHoldBonus = 0;
     
     this.setupEngine();
     this.setupUI();
     this.setupControls();
     this.powerupStatusEl = document.getElementById('powerupStatus');
     this.showMenu();
  }

  setupEngine() {
      this.engine.world.gravity.y = 0.6; // Balanced gravity for better jumping
      
      // Performance optimizations
      this.engine.timing.timeScale = 1;
      this.engine.positionIterations = 6;
      this.engine.velocityIterations = 4;
      this.engine.constraintIterations = 2;
      
    this.updateCanvasSize(); // Set responsive canvas size
    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
         width: this.canvas.width,
         height: this.canvas.height,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        showAngleIndicator: false,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showStats: false
      }
    });
    
    // Collision detection
    Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        this.handleCollision(bodyA, bodyB);
      });
    });
    
    // Custom African pattern rendering
    Events.on(this.render, 'afterRender', () => {
      this.renderAfricanPatterns();
    });
  }

  setupUI() {
    this.scoreEl = document.getElementById('score');
    this.heightEl = document.getElementById('height');
    this.levelNameEl = document.getElementById('levelName');
    this.overlay = document.getElementById('overlay');
    this.overlayTitle = document.getElementById('overlayTitle');
    this.overlayDesc = document.getElementById('overlayDesc');
    this.primaryBtn = document.getElementById('primaryAction');
     this.secondaryBtn = document.getElementById('secondaryAction');
     this.tapArea = document.getElementById('tapArea');
     this.gameControls = document.getElementById('gameControls');
     this.controlZones = document.getElementById('controlZones');
  }

  setupControls() {
     const pauseBtn = document.getElementById('pauseBtn');
     
     // Movement state tracking
     this.keys = { left: false, right: false };
     
     // Tap to jump controls
     const jump = (e) => {
       e.preventDefault();
       this.jump();
     };
     
     // Tap area for jumping (bottom area)
     ['touchstart', 'mousedown', 'pointerdown'].forEach(eventType => {
       this.tapArea.addEventListener(eventType, jump, { passive: false });
     });
     
     // Keyboard controls for movement and jumping
     document.addEventListener('keydown', (e) => {
       if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
         e.preventDefault();
         this.jump();
       }
       if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
         e.preventDefault();
         this.keys.left = true;
       }
       if (e.code === 'ArrowRight' || e.code === 'KeyD') {
         e.preventDefault();
         this.keys.right = true;
       }
       if (e.code === 'KeyP') {
         e.preventDefault();
         this.togglePause();
       }
     });
     
     document.addEventListener('keyup', (e) => {
       if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
         this.keys.left = false;
       }
       if (e.code === 'ArrowRight' || e.code === 'KeyD') {
         this.keys.right = false;
       }
     });
     
     // Touch controls for left/right movement
     this.setupTouchControls();
     
     pauseBtn.addEventListener('click', () => this.togglePause());
     this.primaryBtn.addEventListener('click', () => this.handlePrimaryAction());
     this.secondaryBtn.addEventListener('click', () => this.handleSecondaryAction());
     
     // Prevent scrolling and zoom
     document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
     document.addEventListener('gesturestart', (e) => e.preventDefault());
     document.addEventListener('gesturechange', (e) => e.preventDefault());
   }

   setupTouchControls() {
       // Get control zones
       const leftZone = document.getElementById('zoneLeft');
       const rightZone = document.getElementById('zoneRight');
       const jumpZone = document.getElementById('zoneJump');
       
       // Left zone controls
       ['touchstart', 'mousedown', 'pointerdown'].forEach(eventType => {
         leftZone.addEventListener(eventType, (e) => {
           e.preventDefault();
           this.keys.left = true;
         }, { passive: false });
       });
       
       ['touchend', 'mouseup', 'pointerup'].forEach(eventType => {
         leftZone.addEventListener(eventType, (e) => {
           e.preventDefault();
           this.keys.left = false;
         }, { passive: false });
       });
       
       // Right zone controls
       ['touchstart', 'mousedown', 'pointerdown'].forEach(eventType => {
         rightZone.addEventListener(eventType, (e) => {
           e.preventDefault();
           this.keys.right = true;
         }, { passive: false });
       });
       
       ['touchend', 'mouseup', 'pointerup'].forEach(eventType => {
         rightZone.addEventListener(eventType, (e) => {
           e.preventDefault();
           this.keys.right = false;
         }, { passive: false });
       });
       
       // Jump zone controls
       ['touchstart', 'mousedown', 'pointerdown'].forEach(eventType => {
         jumpZone.addEventListener(eventType, (e) => {
           e.preventDefault();
           this.jump();
         }, { passive: false });
       });
     }

  loadLevel(levelIndex) {
    this.currentLevel = levelIndex;
    const level = LEVELS[levelIndex];
    this.score = 0;
    this.height = 0;
    this.maxHeight = 0;
    this.camera.y = 0;
    
    console.log(`Loading level ${levelIndex}: ${level.name}`);
    
    // Clear world
     World.clear(this.world);
     this.gameObjects = { ball: null, platforms: [], obstacles: [], stars: [], movingPlatforms: [], enemies: [], powerUps: [] };
     this.collectedStars = 0; // Reset collected stars for new level
     
     // Reset power-ups
     this.activePowerUps = {
       strength: false,
       wisdom: false,
       protection: false,
       ancestral: false
     };
     Object.keys(this.powerUpTimers).forEach(timer => clearTimeout(this.powerUpTimers[timer]));
     this.powerUpTimers = {};
    console.log('World cleared, loading new level...');
    
    // Scale factor for responsive design
    const scale = Math.max(0.8, Math.min(this.canvas.width / 375, this.canvas.height / 667));
    
    // Create boundaries (solid black walls with proper collision)
       const walls = [
         // Left wall - solid barrier with bounce
         Bodies.rectangle(-25, this.canvas.height / 2, 50, this.canvas.height * 2, { 
           isStatic: true, 
           render: { fillStyle: '#0C0C0C' },
           restitution: 0.4, // Moderate bounce
           friction: 0.3,
           label: 'leftWall'
         }),
         // Right wall - solid barrier with bounce
         Bodies.rectangle(this.canvas.width + 25, this.canvas.height / 2, 50, this.canvas.height * 2, { 
           isStatic: true, 
           render: { fillStyle: '#0C0C0C' },
           restitution: 0.4, // Moderate bounce
           friction: 0.3,
           label: 'rightWall'
         }),
         // Top wall - prevent ball from going too high
         Bodies.rectangle(this.canvas.width / 2, -25, this.canvas.width, 50, { 
           isStatic: true, 
           render: { fillStyle: '#0C0C0C' },
           restitution: 0.1, // Much less bounce from top
           friction: 0.8,
           label: 'topWall'
         }),
         // Ground platform to prevent infinite falling
         Bodies.rectangle(this.canvas.width / 2, this.canvas.height - 25, this.canvas.width, 50, { 
           isStatic: true, 
           render: { fillStyle: '#0C0C0C' },
           restitution: 0.2, // Minimal bounce from ground
           friction: 0.8,
           label: 'ground'
         })
       ];
      World.add(this.world, walls);
      console.log('Created solid boundaries and ground platform');
    
    // Create enhanced platforms with beautiful African designs
    level.platforms?.forEach((platform, index) => {
      const body = Bodies.rectangle(
        (platform.x + platform.w / 2) * scale, 
        (platform.y + platform.h / 2) * scale,
        platform.w * scale, 
        platform.h * scale,
        { 
            isStatic: true, 
            render: { 
              fillStyle: '#3D2914',
              strokeStyle: '#8BAF5B',
              lineWidth: 3
            },
            restitution: 0.15,
            friction: 0.9,
            label: `platform_${index}`
          }
      );
      
      // Enhanced platform properties
      body.africanPattern = true;
      body.platformGlow = true;
      body.decorativeElements = true;
      this.gameObjects.platforms.push(body);
      World.add(this.world, body);
    });
    
    // Create moving platforms with African diamond patterns
    level.movingPlatforms?.forEach((platform, index) => {
      const body = Bodies.rectangle(
        (platform.x + platform.w / 2) * scale,
        (platform.y + platform.h / 2) * scale,
        platform.w * scale,
        platform.h * scale,
        {
            isStatic: true,
            render: { 
              fillStyle: '#8BAF5B',
              strokeStyle: '#0C0C0C',
              lineWidth: 3
            },
            restitution: 0.1,
            friction: 1.0,
            label: `movingPlatform_${index}`
          }
      );
      
      // Add movement properties
      body.originalX = (platform.x + platform.w / 2) * scale;
      body.moveRange = platform.moveX * scale;
      body.moveSpeed = platform.speed;
      body.moveDirection = 1;
      body.africanDiamond = true;
      
      this.gameObjects.movingPlatforms.push(body);
      World.add(this.world, body);
    });
    
    // Create obstacles
     level.obstacles?.forEach((obstacle, index) => {
       const body = Bodies.polygon(
         (obstacle.x + obstacle.w / 2) * scale,
         (obstacle.y + obstacle.h / 2) * scale,
         3, // triangle
         (obstacle.w / 2) * scale,
         {
           isStatic: true,
           render: { fillStyle: '#111' },
           label: `obstacle_${index}`
         }
       );
       this.gameObjects.obstacles.push(body);
       World.add(this.world, body);
     });
     
     // Create enemies
     level.enemies?.forEach((enemy, index) => {
       let body;
       
       if (enemy.type === 'patrol') {
          body = Bodies.rectangle(
            enemy.x * scale,
            enemy.y * scale,
            enemy.w * scale,
            enemy.h * scale,
            {
              isStatic: false,
              render: { fillStyle: '#8B0000' }, // Dark red
              label: `enemy_${index}`,
              frictionAir: 0.01,
              density: 0.001
            }
          );
         
         const enemyObj = {
           body: body,
           type: 'patrol',
           startX: enemy.x * scale,
           range: enemy.range * scale,
           speed: enemy.speed,
           direction: 1
         };
         
         this.gameObjects.enemies.push(enemyObj);
       } else if (enemy.type === 'bouncer') {
          body = Bodies.circle(
            enemy.x * scale,
            enemy.y * scale,
            enemy.radius * scale,
            {
              isStatic: false,
              render: { fillStyle: '#8B0000' },
              label: `enemy_${index}`,
              restitution: 0.8,
              density: 0.001
            }
          );
         
         const enemyObj = {
           body: body,
           type: 'bouncer',
           maxY: enemy.y * scale,
           bounceForce: enemy.bounceForce || 10
         };
         
         this.gameObjects.enemies.push(enemyObj);
       }
       
       if (body) {
         World.add(this.world, body);
         console.log(`Created ${enemy.type} enemy at (${enemy.x * scale}, ${enemy.y * scale})`);
       }
     });
     
     // Create beautiful African power-ups with enhanced Adinkra symbols
     level.powerUps?.forEach((powerUp, index) => {
       const powerUpBody = Bodies.circle(
         powerUp.x * scale,
         powerUp.y * scale,
         15 * scale,
         {
           isStatic: true,
           isSensor: true,
           render: { 
             fillStyle: '#FFD700',
             strokeStyle: '#8BAF5B',
             lineWidth: 4
           },
           label: `powerUp_${index}`,
           powerUpType: powerUp.type,
           symbol: powerUp.symbol
         }
       );
       
       // Enhanced power-up properties
       powerUpBody.adinkraSymbol = powerUp.symbol;
       powerUpBody.isAdinkra = true;
       powerUpBody.glowEffect = true;
       powerUpBody.pulseAnimation = true;
       powerUpBody.rotationSpeed = 0.02;
       powerUpBody.currentRotation = 0;
       
       this.gameObjects.powerUps.push(powerUpBody);
       World.add(this.world, powerUpBody);
       console.log(`Created enhanced ${powerUp.type} power-up with ${powerUp.symbol} symbol at (${powerUp.x * scale}, ${powerUp.y * scale})`);
     });
    
    // Create glowing stars for maximum visibility
      level.stars?.forEach((star, index) => {
        const body = Bodies.circle(
          star.x * scale, 
          star.y * scale, 
          10 * scale, 
          {
            isStatic: true,
            isSensor: true,
            render: { 
              fillStyle: '#FFFF00',
              strokeStyle: '#FFFFFF',
              lineWidth: 3
            },
            label: `star_${index}`
          }
        );
        body.points = star.points;
        body.isGlowingStar = true;
        body.pulsePhase = Math.random() * Math.PI * 2;
        this.gameObjects.stars.push(body);
        World.add(this.world, body);
        console.log(`Created glowing star ${index} at (${star.x * scale}, ${star.y * scale})`);
      });
    
    // Create Mpira (African ball) with enhanced visual design
      this.gameObjects.ball = Bodies.circle(
        level.player.x * scale, 
        level.player.y * scale,
        12 * scale,
        { 
          render: { 
            fillStyle: '#2C1810',
            strokeStyle: '#8BAF5B',
            lineWidth: 3
          }, 
          restitution: 0.35, 
          friction: 0.3,
          frictionAir: 0.003,
          density: 0.0015,
          label: 'ball'
        }
      );
      
      // Enhanced Mpira properties
      this.gameObjects.ball.isMpira = true;
      this.gameObjects.ball.glowEffect = true;
      this.gameObjects.ball.trailParticles = [];
     World.add(this.world, this.gameObjects.ball);
     console.log(`Created ball at (${level.player.x * scale}, ${level.player.y * scale})`);
     console.log(`World gravity: ${this.engine.world.gravity.y}`);
     console.log(`Total bodies in world: ${this.world.bodies.length}`);
    
    this.updateUI();
    
    // Apply mobile optimizations
    this.optimizeForMobile();
  }

  jump() {
      console.log(`Jump attempt - Game state: ${this.gameState}, Ball exists: ${!!this.gameObjects.ball}`);
      
      if (this.gameState !== 'playing') {
        console.log('Cannot jump - game not in playing state');
        return;
      }
      
      if (!this.gameObjects.ball) {
        console.log('Cannot jump - no ball exists');
        return;
      }
      
      // Prevent double-tap zoom on mobile
      const currentTime = Date.now();
      if (this.isMobile && currentTime - this.lastTouchTime < 300) {
        this.lastTouchTime = currentTime;
        return;
      }
      this.lastTouchTime = currentTime;
      
      // Calculate jump force with strength power-up and mobile bonus
      let jumpForce = this.jumpForce;
      if (this.activePowerUps.strength) {
        jumpForce *= 1.5; // 50% stronger jumps
      }
      
      // Mobile-specific jump enhancements
      if (this.isMobile) {
        jumpForce *= 1.1; // 10% bonus for mobile
        
        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
      
      // Apply upward force
      Body.applyForce(this.gameObjects.ball, this.gameObjects.ball.position, {
        x: 0,
        y: -jumpForce
      });
      
      // Create jump particles
      this.createJumpParticles(this.gameObjects.ball.position);
      
      console.log(`Jump applied! Force: ${jumpForce}, Ball position: (${this.gameObjects.ball.position.x}, ${this.gameObjects.ball.position.y})`);
      
      this.isJumping = true;
      
      // Reset jump state after short delay
      setTimeout(() => {
        this.isJumping = false;
      }, 200);
    }

  handleCollision(bodyA, bodyB) {
     const bodies = [bodyA, bodyB];
     const ballIndex = bodies.findIndex(body => body === this.gameObjects.ball);
     const otherBody = ballIndex !== -1 ? bodies[1 - ballIndex] : null;
     
     if (ballIndex !== -1 && otherBody) {
       const otherLabel = otherBody.label;
       console.log(`Ball collision with: ${otherLabel}`);
       
       // Star collection
       if (otherLabel && otherLabel.startsWith('star_')) {
         const starIndex = parseInt(otherLabel.split('_')[1]);
         const starBody = this.gameObjects.stars[starIndex];
         if (starBody) {
           this.score += starBody.points;
           this.collectedStars++;
           console.log(`Collected star ${starIndex} for ${starBody.points} points. Total score: ${this.score}, Stars collected: ${this.collectedStars}`);
           this.showScorePopup(starBody.points, starBody.position);
           World.remove(this.world, starBody);
           this.gameObjects.stars[starIndex] = null;
           this.updateUI();
         }
       }
       
       // Power-up collection
       if (otherLabel && otherLabel.startsWith('powerUp_')) {
         const powerUpIndex = parseInt(otherLabel.split('_')[1]);
         const powerUpBody = this.gameObjects.powerUps[powerUpIndex];
         if (powerUpBody) {
           this.activatePowerUp(powerUpBody.powerUpType);
           this.showPowerUpPopup(powerUpBody.symbol, powerUpBody.position);
           World.remove(this.world, powerUpBody);
           this.gameObjects.powerUps[powerUpIndex] = null;
           console.log(`Activated ${powerUpBody.powerUpType} power-up`);
         }
       }
       
       // Obstacle collision
       if (otherLabel && otherLabel.startsWith('obstacle_')) {
         console.log('Hit obstacle - game over!');
         this.gameOver(false);
       }
       
       // Enemy collision
       if (otherLabel && otherLabel.startsWith('enemy_')) {
         if (this.activePowerUps.protection) {
           console.log('Protected from enemy by ancestral shield!');
           // Remove the enemy instead of game over
           const enemyIndex = parseInt(otherLabel.split('_')[1]);
           const enemyObj = this.gameObjects.enemies.find(e => e.body && e.body.label === otherLabel);
           if (enemyObj) {
             World.remove(this.world, enemyObj.body);
             this.gameObjects.enemies = this.gameObjects.enemies.filter(e => e !== enemyObj);
           }
         } else {
           console.log('Hit enemy - game over!');
           this.gameOver(false);
         }
       }
       
       // Wall collision - ball bounces off walls
       if (otherLabel === 'leftWall' || otherLabel === 'rightWall' || otherLabel === 'topWall') {
         console.log(`Ball bounced off ${otherLabel}`);
         // Walls automatically handle bounce due to restitution property
       }
       
       // Ground collision
       if (otherLabel === 'ground') {
         console.log('Ball hit ground');
       }
       
       // Platform landing - allow jumping from platforms
         if (otherLabel && (otherLabel.startsWith('platform_') || otherLabel.startsWith('movingPlatform_') || otherLabel === 'ground')) {
           if (this.gameObjects.ball.velocity.y > 0.5) { // Only if falling with significant velocity
             Body.setVelocity(this.gameObjects.ball, {
               x: this.gameObjects.ball.velocity.x * 0.95,
               y: Math.min(this.gameObjects.ball.velocity.y * -0.1, -0.5) // Minimal bounce, allow resting
             });
             console.log(`Ball landed on ${otherLabel}`);
           }
         }
     }
   }

  showScorePopup(points, position) {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = `+${points}`;
    popup.style.cssText = `
      position: absolute;
      left: ${position.x}px;
      top: ${position.y - this.camera.y}px;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
      pointer-events: none;
      z-index: 1000;
      animation: scoreFloat 1s ease-out forwards;
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 1000);
  }

  updateCamera() {
    if (!this.gameObjects.ball) return;
    
    const ballY = this.gameObjects.ball.position.y;
    const targetCameraY = Math.max(0, ballY - this.canvas.height * 0.7);
    
    // Smooth camera follow
    this.camera.y += (targetCameraY - this.camera.y) * 0.1;
    
    // Update render bounds for camera
    this.render.bounds.min.y = this.camera.y;
    this.render.bounds.max.y = this.camera.y + this.canvas.height;
  }

  updateMovingPlatforms() {
    this.gameObjects.movingPlatforms.forEach(platform => {
      if (!platform) return;
      
      const newX = platform.position.x + (platform.moveSpeed * platform.moveDirection);
      
      // Check bounds and reverse direction
      if (newX >= platform.originalX + platform.moveRange || newX <= platform.originalX - platform.moveRange) {
        platform.moveDirection *= -1;
      }
      
      Body.translate(platform, { x: platform.moveSpeed * platform.moveDirection, y: 0 });
    });
  }

  updateBallMovement() {
       if (!this.gameObjects.ball || this.gameState !== 'playing') return;
       
       const horizontalForce = 0.003; // Further reduced for smoother control
       
       // Apply horizontal movement while in air or on ground
       if (this.keys.left) {
         Body.applyForce(this.gameObjects.ball, this.gameObjects.ball.position, {
           x: -horizontalForce,
           y: 0
         });
         // Create movement particles
         this.createMovementParticles(this.gameObjects.ball.position, 'left');
       }
       
       if (this.keys.right) {
         Body.applyForce(this.gameObjects.ball, this.gameObjects.ball.position, {
           x: horizontalForce,
           y: 0
         });
         // Create movement particles
         this.createMovementParticles(this.gameObjects.ball.position, 'right');
       }
       
       // Limit horizontal velocity to prevent excessive speed
       const maxHorizontalVelocity = 3; // Much slower for tutorial-friendly control
       if (Math.abs(this.gameObjects.ball.velocity.x) > maxHorizontalVelocity) {
         Body.setVelocity(this.gameObjects.ball, {
           x: Math.sign(this.gameObjects.ball.velocity.x) * maxHorizontalVelocity,
           y: this.gameObjects.ball.velocity.y
         });
       }
     }

   updateEnemies() {
     // Update enemy movement and behavior
     this.gameObjects.enemies?.forEach(enemy => {
       if (!enemy || !enemy.body) return;
       
       if (enemy.type === 'patrol') {
         // Move enemy back and forth
         const newX = enemy.body.position.x + (enemy.speed * enemy.direction);
         
         if (newX >= enemy.startX + enemy.range || newX <= enemy.startX - enemy.range) {
           enemy.direction *= -1;
         }
         
         Body.translate(enemy.body, { x: enemy.speed * enemy.direction, y: 0 });
       } else if (enemy.type === 'bouncer') {
         // Bouncing enemy
         if (enemy.body.position.y >= enemy.maxY) {
           Body.setVelocity(enemy.body, { x: 0, y: -enemy.bounceForce });
         }
       }
     });
   }

   updateHeight() {
      if (!this.gameObjects.ball) return;
      
      const level = LEVELS[this.currentLevel];
      const ballY = this.gameObjects.ball.position.y;
      const startY = level.player.y;
      
      this.height = Math.max(0, Math.floor((startY - ballY) / 10));
      this.maxHeight = Math.max(this.maxHeight, this.height);
      
      // Check win condition - either reach target height OR collect all stars
      const totalStars = level.stars ? level.stars.length : 0;
      
      if (this.height >= level.targetHeight || this.collectedStars >= totalStars) {
        console.log(`Level complete! Height: ${this.height}/${level.targetHeight}, Stars: ${this.collectedStars}/${totalStars}`);
        this.gameOver(true);
      }
    }

  checkBallBounds() {
    if (!this.gameObjects.ball) return;
    
    const ball = this.gameObjects.ball;
    
    // Reset if ball falls below the canvas height
    if (ball.position.y > this.canvas.height + 50) {
      this.gameOver(false);
    }
  }

  updateUI() {
    this.scoreEl.textContent = this.score;
    this.heightEl.textContent = `${this.height}m`;
    this.levelNameEl.textContent = LEVELS[this.currentLevel].name;
  }

  startGame() {
      console.log('Starting game...');
      this.gameState = 'playing';
      this.loadLevel(this.currentLevel);
      this.hideOverlay();
      
      // Show control zones during gameplay
      this.controlZones.style.display = 'block';
      
      // Show control hints for tutorial
      if (this.currentLevel === 0) {
        this.gameControls.style.display = 'block';
        setTimeout(() => {
          this.gameControls.style.display = 'none';
        }, 5000);
      }
    
    // Only start render and engine if not already running
    if (!this.render.runner) {
      console.log('Starting render...');
      Render.run(this.render);
    }
    if (!this.engine.runner) {
      console.log('Starting engine...');
      Engine.run(this.engine);
    }
    
    // Clear any existing game loop
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    
    // Game loop for updates
      this.gameLoop = setInterval(() => {
        if (this.gameState === 'playing') {
          this.updateBallMovement();
         this.updateCamera();
         this.updateMovingPlatforms();
         this.updateEnemies();
         this.updateHeight();
         this.checkBallBounds();
         this.updateUI();
        }
      }, 16); // ~60 FPS
    
    console.log('Game started successfully!');
  }

  gameOver(won) {
    this.gameState = won ? 'won' : 'lost';
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
    
    if (won) {
      // Save the level score and update progression
      this.saveLevelScore(this.currentLevel, this.score);
      
      // Check if new levels were unlocked
      const newUnlockedLevels = this.getUnlockedLevels();
      const levelsUnlocked = newUnlockedLevels > this.unlockedLevels;
      this.unlockedLevels = newUnlockedLevels;
      
      if (levelsUnlocked) {
        console.log(`New levels unlocked! Now have access to ${this.unlockedLevels} levels`);
      }
    }
    
    this.overlayTitle.textContent = won ? 'Congratulations!' : 'Ubuntu Wisdom';
    
    if (won) {
        if (this.currentLevel === 0) {
          this.overlayDesc.textContent = `■ Mpira's journey begins! You collected ${this.score} points and climbed ${this.height}m! The community sees hope returning. Ready for greater challenges to rebuild what was lost?`;
        } else if (this.currentLevel === LEVELS.length - 1) {
           this.overlayDesc.textContent = `● Ubuntu Achieved! Mpira has brought complete harmony to all communities! You collected ${this.score} points and reached the ultimate height of ${this.height}m. The spirit of Ubuntu - "I am because we are" - now flows through every village!`;
        } else {
          this.overlayDesc.textContent = `★ Incredible progress! Mpira gathered ${this.score} points and reached ${this.height}m! The community grows stronger with each star collected. Continue the journey of rebuilding!`;
        }
      } else {
        // Show African wisdom proverb for motivation
        const randomProverb = AFRICAN_PROVERBS[Math.floor(Math.random() * AFRICAN_PROVERBS.length)];
        this.overlayDesc.textContent = `"${randomProverb.text}" - ${randomProverb.origin} Wisdom\n\nMpira stumbled, but the ancestors guide us forward! You collected ${this.score} points. The community believes in your strength - try again to continue the journey of Ubuntu!`;
      }
    
    this.primaryBtn.textContent = won && this.currentLevel < LEVELS.length - 1 ? 'Next Chapter' : 'Try Again';
    this.secondaryBtn.textContent = 'Return Home';
    this.showOverlay();
  }

  togglePause() {
    if (this.gameState === 'playing') {
      this.gameState = 'paused';
      this.overlayTitle.textContent = 'Paused';
      this.overlayDesc.textContent = 'Game is paused. Tap Play to continue.';
      this.primaryBtn.textContent = 'Resume';
      this.secondaryBtn.textContent = 'Menu';
      this.showOverlay();
    } else if (this.gameState === 'paused') {
      this.gameState = 'playing';
      this.hideOverlay();
    }
  }

  showMenu() {
    this.gameState = 'menu';
    this.overlayTitle.textContent = 'Mpira';
    this.overlayDesc.textContent = '● Meet Mpira, an African ball who lost everything but never lost hope. Help him rebuild his life by collecting green stars to bring joy and prosperity back to his community. ▲ TAP to JUMP | Move LEFT/RIGHT while jumping | Collect green stars | Avoid red enemies and black spikes!';
    this.primaryBtn.textContent = 'Begin Journey';
    this.secondaryBtn.textContent = 'Select Chapter';
    
    // Hide control zones in menu
    this.controlZones.style.display = 'none';
    this.gameControls.style.display = 'none';
    
    this.showOverlay();
  }

  showLevelSelect() {
      this.gameState = 'levelSelect';
      this.overlayTitle.textContent = '● Mpira\'s Journey - African Chapters';
      
      // Hide control zones in level select
      this.controlZones.style.display = 'none';
      this.gameControls.style.display = 'none';
      
      let levelList = '<div class="african-chapter-grid">';
      
      // Group chapters by acts
       const acts = [
         { name: 'ACT I: THE AWAKENING', start: 0, end: 4, icon: '▲' },
         { name: 'ACT II: THE GREAT JOURNEY', start: 5, end: 9, icon: '♦' },
         { name: 'ACT III: THE RETURN', start: 10, end: 14, icon: '●' }
       ];
      
      acts.forEach(act => {
        levelList += `<div class="act-header">${act.icon} ${act.name}</div>`;
        
        for (let i = act.start; i <= act.end; i++) {
          if (i < LEVELS.length) {
            const isUnlocked = this.isLevelUnlocked(i);
            const chapterNum = i + 1;
            
            // Add African pattern based on chapter
            let pattern = '';
            if (i < 5) pattern = '◆'; // Awakening - diamonds
            else if (i < 10) pattern = '▲'; // Journey - triangles  
            else pattern = '●'; // Return - circles
            
            let statusText = '';
            let levelTitle = '';
            
            if (isUnlocked) {
              levelTitle = LEVELS[i].name;
              const levelScore = this.levelScores[i] || 0;
              statusText = levelScore > 0 ? `★ ${levelScore}` : '★';
            } else {
              levelTitle = 'Chapter Locked';
              const requiredScore = this.scoreRequirements[i];
              const currentTotal = this.totalScore;
              statusText = `🔒 Need ${requiredScore - currentTotal} more points`;
            }
            
            levelList += `
              <div class="african-chapter-item ${isUnlocked ? 'unlocked' : 'locked'}" data-level="${i}" ${!isUnlocked ? 'title="Score ' + this.scoreRequirements[i] + ' points total to unlock this level"' : ''}>
                <div class="chapter-pattern">${pattern}</div>
                <div class="chapter-info">
                  <div class="chapter-number">Chapter ${chapterNum}</div>
                  <div class="chapter-title">${levelTitle}</div>
                </div>
                <div class="chapter-status">${statusText}</div>
              </div>`;
          }
        }
      });
      
      levelList += '</div>';
      
      this.overlayDesc.innerHTML = levelList;
      this.primaryBtn.textContent = '■ Return to Village';
      this.secondaryBtn.style.display = 'none';
      
      // Add click handlers for level selection
      setTimeout(() => {
        document.querySelectorAll('.african-chapter-item.unlocked').forEach(item => {
          item.addEventListener('click', (e) => {
            const levelIndex = parseInt(e.currentTarget.dataset.level);
            this.currentLevel = levelIndex;
            this.startGame();
          });
        });
      }, 100);
      
      this.showOverlay();
    }

  showOverlay() {
    this.overlay.classList.remove('hidden');
  }

  hideOverlay() {
    this.overlay.classList.add('hidden');
    this.secondaryBtn.style.display = 'block'; // Reset secondary button
  }

  handlePrimaryAction() {
    switch (this.gameState) {
      case 'menu':
        this.startGame();
        break;
      case 'levelSelect':
        this.showMenu();
        break;
      case 'paused':
        this.togglePause();
        break;
      case 'won':
        if (this.currentLevel < LEVELS.length - 1 && this.isLevelUnlocked(this.currentLevel + 1)) {
          this.currentLevel++;
          this.startGame();
        } else if (this.currentLevel < LEVELS.length - 1) {
          // Next level is not unlocked, show level select
          this.showLevelSelect();
        } else {
          // Completed all levels, restart from beginning
          this.currentLevel = 0;
          this.startGame();
        }
        break;
      case 'lost':
        this.startGame();
        break;
    }
  }

  handleSecondaryAction() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
    
    if (this.gameState === 'menu') {
      this.showLevelSelect();
    } else {
      this.showMenu();
    }
  }

  createJumpParticles(position) {
           // Particles removed
         }

   createMovementParticles(position, direction) {
           // Particles removed
         }

     createTailParticles(position, velocity) {
           // Particles removed
         }

   updateParticles() {
        // Particles removed
      }
      
   renderAfricanPatterns() {
     const ctx = this.render.canvas.getContext('2d');
     
     // Render enhanced patterns on platforms
     this.gameObjects.platforms.forEach(platform => {
       if (platform && platform.africanPattern) {
         this.drawEnhancedPlatformPattern(ctx, platform);
       }
     });
     
     // Render enhanced diamond patterns on moving platforms
     this.gameObjects.movingPlatforms.forEach(platform => {
       if (platform && platform.africanDiamond) {
         this.drawEnhancedMovingPlatform(ctx, platform);
       }
     });
     
     // Render beautiful Adinkra symbols on power-ups
     this.gameObjects.powerUps.forEach(powerUp => {
       if (powerUp && powerUp.isAdinkra) {
         this.drawEnhancedAdinkraSymbol(ctx, powerUp);
       }
     });
     
     // Render enhanced Mpira with glow and trail
     if (this.gameObjects.ball && this.gameObjects.ball.isMpira) {
       this.drawEnhancedMpira(ctx, this.gameObjects.ball);
     }
     
     // Render glowing stars
     this.gameObjects.stars.forEach(star => {
       if (star && star.isGlowingStar) {
         this.drawGlowingStar(ctx, star);
       }
     });
     
     // Render particle effects
     this.renderParticleEffects(ctx);
   }
   
   drawEnhancedPlatformPattern(ctx, body) {
     const pos = body.position;
     const bounds = body.bounds;
     const width = bounds.max.x - bounds.min.x;
     const height = bounds.max.y - bounds.min.y;
     const time = Date.now() * 0.002;
     
     ctx.save();
     
     // Platform glow effect
     if (body.platformGlow) {
       ctx.shadowColor = '#8BAF5B';
       ctx.shadowBlur = 8;
     }
     
     // Enhanced zigzag pattern with gradient
     const gradient = ctx.createLinearGradient(bounds.min.x, pos.y, bounds.max.x, pos.y);
     gradient.addColorStop(0, '#8BAF5B');
     gradient.addColorStop(0.5, '#FFD700');
     gradient.addColorStop(1, '#8BAF5B');
     
     ctx.strokeStyle = gradient;
     ctx.lineWidth = 2;
     
     // Animated zigzag pattern
     const zigzagHeight = height / 3;
     const zigzagWidth = width / 10;
     
     ctx.beginPath();
     for (let i = 0; i <= 10; i++) {
       const x = bounds.min.x + (i * zigzagWidth);
       const offset = Math.sin(time + i * 0.5) * 2;
       const y = pos.y + (i % 2 === 0 ? -zigzagHeight/2 + offset : zigzagHeight/2 + offset);
       if (i === 0) ctx.moveTo(x, y);
       else ctx.lineTo(x, y);
     }
     ctx.stroke();
     
     // Decorative dots
     ctx.fillStyle = '#FFD700';
     for (let i = 0; i < 5; i++) {
       const x = bounds.min.x + (width / 4) * i;
       const y = pos.y + Math.sin(time + i) * 3;
       ctx.beginPath();
       ctx.arc(x, y, 1.5, 0, Math.PI * 2);
       ctx.fill();
     }
     
     ctx.restore();
   }
   
   drawEnhancedMovingPlatform(ctx, body) {
      const pos = body.position;
      const bounds = body.bounds;
      const width = bounds.max.x - bounds.min.x;
      const height = bounds.max.y - bounds.min.y;
      const time = Date.now() * 0.004;
      
      ctx.save();
      
      // Moving platform glow
      ctx.shadowColor = '#8BAF5B';
      ctx.shadowBlur = 12;
      
      // Enhanced diamond pattern with animation
      const diamondSize = Math.min(width, height) / 3;
      const pulseSize = diamondSize + Math.sin(time * 2) * 3;
      
      // Outer diamond with gradient
      const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulseSize);
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
      gradient.addColorStop(0.7, 'rgba(139, 175, 91, 0.6)');
      gradient.addColorStop(1, 'rgba(139, 175, 91, 0.2)');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#8BAF5B';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y - pulseSize);
      ctx.lineTo(pos.x + pulseSize, pos.y);
      ctx.lineTo(pos.x, pos.y + pulseSize);
      ctx.lineTo(pos.x - pulseSize, pos.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Inner rotating diamond
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(time);
      
      const innerSize = diamondSize * 0.6;
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(0, -innerSize);
      ctx.lineTo(innerSize, 0);
      ctx.lineTo(0, innerSize);
      ctx.lineTo(-innerSize, 0);
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
      ctx.restore();
    }
   
   drawEnhancedAdinkraSymbol(ctx, body) {
      const pos = body.position;
      const radius = 15;
      const time = Date.now() * 0.003;
      
      ctx.save();
      
      // Enhanced glow effect
      if (body.glowEffect) {
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
      }
      
      // Rotation animation
      if (body.pulseAnimation) {
        body.currentRotation += body.rotationSpeed;
        ctx.translate(pos.x, pos.y);
        ctx.rotate(body.currentRotation);
        ctx.translate(-pos.x, -pos.y);
      }
      
      // Pulsing size
      const pulseScale = 1 + Math.sin(time * 4) * 0.1;
      const scaledRadius = radius * pulseScale;
      
      ctx.strokeStyle = '#2C1810';
      ctx.fillStyle = '#2C1810';
      ctx.lineWidth = 3;
      
      // Draw enhanced Adinkra symbols
      switch(body.adinkraSymbol) {
        case 'dwennimmen': // Ram's horns - Strength
          this.drawEnhancedDwennimmen(ctx, pos.x, pos.y, scaledRadius);
          break;
        case 'sankofa': // Return and get it - Learning
          this.drawEnhancedSankofa(ctx, pos.x, pos.y, scaledRadius);
          break;
        case 'nyansapo': // Wisdom knot
          this.drawEnhancedNyansapo(ctx, pos.x, pos.y, scaledRadius);
          break;
        case 'mask': // Tribal mask
          this.drawEnhancedTribalMask(ctx, pos.x, pos.y, scaledRadius);
          break;
      }
      
      ctx.restore();
    }
   
   drawDwennimmen(ctx, x, y, size) {
     // Ram's horns symbol
     ctx.beginPath();
     ctx.arc(x - size/3, y, size/3, 0, Math.PI, true);
     ctx.arc(x + size/3, y, size/3, 0, Math.PI, true);
     ctx.stroke();
     
     // Center dot
     ctx.beginPath();
     ctx.arc(x, y, size/6, 0, Math.PI * 2);
     ctx.fill();
   }
   
   drawSankofa(ctx, x, y, size) {
     // Bird looking back symbol
     ctx.beginPath();
     ctx.arc(x, y, size/2, 0, Math.PI * 2);
     ctx.stroke();
     
     // Arrow pointing back
     ctx.beginPath();
     ctx.moveTo(x, y + size/2);
     ctx.lineTo(x, y + size);
     ctx.moveTo(x - size/4, y + size - size/4);
     ctx.lineTo(x, y + size);
     ctx.lineTo(x + size/4, y + size - size/4);
     ctx.stroke();
   }
   
   drawNyansapo(ctx, x, y, size) {
     // Wisdom knot
     ctx.strokeRect(x - size/2, y - size/2, size, size);
     ctx.beginPath();
     ctx.moveTo(x - size/2, y);
     ctx.lineTo(x + size/2, y);
     ctx.moveTo(x, y - size/2);
     ctx.lineTo(x, y + size/2);
     ctx.stroke();
     
     // Corner dots
     const dotSize = size/8;
     ctx.beginPath();
     ctx.arc(x - size/4, y - size/4, dotSize, 0, Math.PI * 2);
     ctx.arc(x + size/4, y - size/4, dotSize, 0, Math.PI * 2);
     ctx.arc(x - size/4, y + size/4, dotSize, 0, Math.PI * 2);
     ctx.arc(x + size/4, y + size/4, dotSize, 0, Math.PI * 2);
     ctx.fill();
   }
   
   drawTribalMask(ctx, x, y, size) {
     // Tribal mask outline
     ctx.beginPath();
     ctx.ellipse(x, y, size/2, size * 0.7, 0, 0, Math.PI * 2);
     ctx.stroke();
     
     // Eyes
     ctx.beginPath();
     ctx.arc(x - size/4, y - size/4, size/8, 0, Math.PI * 2);
     ctx.arc(x + size/4, y - size/4, size/8, 0, Math.PI * 2);
     ctx.fill();
     
     // Mouth
     ctx.beginPath();
     ctx.arc(x, y + size/4, size/4, 0, Math.PI);
     ctx.stroke();
   }
   
   drawEnhancedMpira(ctx, body) {
     const pos = body.position;
     const radius = 12;
     const time = Date.now() * 0.003;
     
     ctx.save();
     
     // Glow effect
     if (body.glowEffect) {
       ctx.shadowColor = '#8BAF5B';
       ctx.shadowBlur = 15;
       ctx.shadowOffsetX = 0;
       ctx.shadowOffsetY = 0;
     }
     
     // Draw enhanced African circular pattern
     ctx.strokeStyle = '#8BAF5B';
     ctx.lineWidth = 2;
     
     // Outer decorative ring
     ctx.beginPath();
     for (let i = 0; i < 12; i++) {
       const angle = (i * Math.PI * 2) / 12 + time;
       const x = pos.x + Math.cos(angle) * radius * 0.8;
       const y = pos.y + Math.sin(angle) * radius * 0.8;
       
       if (i === 0) ctx.moveTo(x, y);
       else ctx.lineTo(x, y);
     }
     ctx.closePath();
     ctx.stroke();
     
     // Inner pattern with rotation
     ctx.strokeStyle = '#FFD700';
     ctx.lineWidth = 1.5;
     ctx.beginPath();
     for (let i = 0; i < 6; i++) {
       const angle = (i * Math.PI * 2) / 6 - time;
       const x = pos.x + Math.cos(angle) * radius * 0.5;
       const y = pos.y + Math.sin(angle) * radius * 0.5;
       
       if (i === 0) ctx.moveTo(x, y);
       else ctx.lineTo(x, y);
     }
     ctx.closePath();
     ctx.stroke();
     
     // Center dot with pulse
     const pulseSize = radius * 0.2 + Math.sin(time * 3) * 2;
     ctx.fillStyle = '#8BAF5B';
     ctx.beginPath();
     ctx.arc(pos.x, pos.y, pulseSize, 0, Math.PI * 2);
     ctx.fill();
     
     ctx.restore();
   }
      
   renderParticleEffects(ctx) {
      // Render trail particles for Mpira
      if (this.gameObjects.ball && this.gameObjects.ball.trailParticles) {
        this.gameObjects.ball.trailParticles.forEach((particle, index) => {
          if (particle.life > 0) {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            // Update particle
            particle.life -= 0.02;
            particle.size *= 0.98;
          } else {
            this.gameObjects.ball.trailParticles.splice(index, 1);
          }
        });
      }
      
      // Add new trail particles
      if (this.gameObjects.ball && this.gameState === 'playing') {
        if (!this.gameObjects.ball.trailParticles) {
          this.gameObjects.ball.trailParticles = [];
        }
        
        if (Math.random() < 0.3) {
          this.gameObjects.ball.trailParticles.push({
            x: this.gameObjects.ball.position.x + (Math.random() - 0.5) * 10,
            y: this.gameObjects.ball.position.y + (Math.random() - 0.5) * 10,
            size: 2 + Math.random() * 3,
            life: 1,
            color: Math.random() > 0.5 ? '#8BAF5B' : '#FFD700'
          });
        }
      }
    }
    
    // Enhanced Adinkra symbol drawing functions
    drawEnhancedDwennimmen(ctx, x, y, size) {
      // Enhanced Ram's horns symbol with gradients
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(1, '#8BAF5B');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      
      ctx.beginPath();
      ctx.arc(x - size/3, y, size/3, 0, Math.PI, true);
      ctx.arc(x + size/3, y, size/3, 0, Math.PI, true);
      ctx.stroke();
      
      // Enhanced center dot
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size/5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    drawEnhancedSankofa(ctx, x, y, size) {
      // Enhanced bird looking back symbol
      const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
      gradient.addColorStop(0, '#8BAF5B');
      gradient.addColorStop(0.5, '#FFD700');
      gradient.addColorStop(1, '#8BAF5B');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.arc(x, y, size/2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Enhanced arrow pointing back
      ctx.beginPath();
      ctx.moveTo(x, y + size/2);
      ctx.lineTo(x, y + size);
      ctx.moveTo(x - size/3, y + size - size/3);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x + size/3, y + size - size/3);
      ctx.stroke();
    }
    
    drawEnhancedNyansapo(ctx, x, y, size) {
      // Enhanced wisdom knot with beautiful patterns
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(0.7, '#8BAF5B');
      gradient.addColorStop(1, '#2C1810');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      
      ctx.strokeRect(x - size/2, y - size/2, size, size);
      ctx.beginPath();
      ctx.moveTo(x - size/2, y);
      ctx.lineTo(x + size/2, y);
      ctx.moveTo(x, y - size/2);
      ctx.lineTo(x, y + size/2);
      ctx.stroke();
      
      // Enhanced corner dots with glow
      ctx.fillStyle = '#FFD700';
      const dotSize = size/6;
      const positions = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
      positions.forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(x + dx * size/3, y + dy * size/3, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    drawEnhancedTribalMask(ctx, x, y, size) {
       // Enhanced tribal mask with detailed features
       const gradient = ctx.createLinearGradient(x, y - size, x, y + size);
       gradient.addColorStop(0, '#8BAF5B');
       gradient.addColorStop(0.5, '#FFD700');
       gradient.addColorStop(1, '#2C1810');
       
       ctx.strokeStyle = gradient;
       ctx.lineWidth = 3;
       
       // Mask outline
       ctx.beginPath();
       ctx.ellipse(x, y, size/2, size * 0.7, 0, 0, Math.PI * 2);
       ctx.stroke();
       
       // Enhanced eyes with glow
       ctx.fillStyle = '#FFD700';
       ctx.beginPath();
       ctx.arc(x - size/4, y - size/4, size/6, 0, Math.PI * 2);
       ctx.arc(x + size/4, y - size/4, size/6, 0, Math.PI * 2);
       ctx.fill();
       
       // Enhanced mouth
       ctx.strokeStyle = '#8BAF5B';
       ctx.lineWidth = 4;
       ctx.beginPath();
       ctx.arc(x, y + size/4, size/3, 0, Math.PI);
       ctx.stroke();
     }
     
     drawGlowingStar(ctx, body) {
       const pos = body.position;
       const radius = 10;
       const time = Date.now() * 0.005;
       
       ctx.save();
       
       // Intense glow effect for maximum visibility
       ctx.shadowColor = '#FFFF00';
       ctx.shadowBlur = 25;
       ctx.shadowOffsetX = 0;
       ctx.shadowOffsetY = 0;
       
       // Pulsing size based on individual phase
       const pulseScale = 1 + Math.sin(time * 3 + body.pulsePhase) * 0.3;
       const glowRadius = radius * pulseScale;
       
       // Outer glow ring
       const outerGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius * 2);
       outerGradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
       outerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
       outerGradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
       
       ctx.fillStyle = outerGradient;
       ctx.beginPath();
       ctx.arc(pos.x, pos.y, glowRadius * 2, 0, Math.PI * 2);
       ctx.fill();
       
       // Main star body with bright yellow
       ctx.fillStyle = '#FFFF00';
       ctx.strokeStyle = '#FFFFFF';
       ctx.lineWidth = 3;
       
       // Draw 5-pointed star shape
       ctx.beginPath();
       for (let i = 0; i < 5; i++) {
         const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
         const outerRadius = glowRadius;
         const innerRadius = glowRadius * 0.4;
         
         // Outer point
         const outerX = pos.x + Math.cos(angle) * outerRadius;
         const outerY = pos.y + Math.sin(angle) * outerRadius;
         
         // Inner point
         const innerAngle = angle + Math.PI / 5;
         const innerX = pos.x + Math.cos(innerAngle) * innerRadius;
         const innerY = pos.y + Math.sin(innerAngle) * innerRadius;
         
         if (i === 0) {
           ctx.moveTo(outerX, outerY);
         } else {
           ctx.lineTo(outerX, outerY);
         }
         ctx.lineTo(innerX, innerY);
       }
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       
       // Inner sparkle effect
       ctx.fillStyle = '#FFFFFF';
       ctx.beginPath();
       ctx.arc(pos.x, pos.y, glowRadius * 0.2, 0, Math.PI * 2);
       ctx.fill();
       
       // Rotating sparkles around the star
       for (let i = 0; i < 4; i++) {
         const sparkleAngle = time * 2 + (i * Math.PI / 2);
         const sparkleDistance = glowRadius * 1.5;
         const sparkleX = pos.x + Math.cos(sparkleAngle) * sparkleDistance;
         const sparkleY = pos.y + Math.sin(sparkleAngle) * sparkleDistance;
         
         ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
         ctx.beginPath();
         ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
         ctx.fill();
       }
       
       ctx.restore();
     }
       
    activatePowerUp(type) {
      // Clear existing timer if any
      if (this.powerUpTimers[type]) {
        clearTimeout(this.powerUpTimers[type]);
      }
      
      // Map power-up types to effects
      const powerUpMap = {
        'adinkra_strength': 'strength',
        'adinkra_wisdom': 'wisdom', 
        'tribal_protection': 'protection',
        'ancestral_boost': 'ancestral'
      };
      
      const effectType = powerUpMap[type] || type;
      this.activePowerUps[effectType] = true;
      
      // Set duration based on power-up type
      const duration = effectType === 'ancestral' ? 15000 : 10000;
      
      this.powerUpTimers[effectType] = setTimeout(() => {
        this.activePowerUps[effectType] = false;
        this.updatePowerUpStatus();
        console.log(`${effectType} power-up expired`);
      }, duration);
      
      this.updatePowerUpStatus();
      console.log(`Activated ${effectType} power-up for ${duration/1000} seconds`);
    }
   
   showPowerUpPopup(symbol, position) {
      const popup = document.createElement('div');
      popup.className = 'powerup-popup';
      
      // African symbols for different power-ups
      const symbolMap = {
        'dwennimmen': '⚡', // Strength
        'nyansapo': '🧠', // Wisdom  
        'mask': '🛡️', // Protection
        'sankofa': '✨' // Ancestral
      };
      
      popup.textContent = symbolMap[symbol] || '●';
      popup.style.cssText = `
        position: absolute;
        left: ${position.x}px;
        top: ${position.y - this.camera.y}px;
        font-size: 24px;
        color: #8BAF5B;
        font-weight: bold;
        pointer-events: none;
        z-index: 1001;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      `;
      
      document.body.appendChild(popup);
      
      setTimeout(() => {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup);
        }
      }, 2000);
    }
    
    updatePowerUpStatus() {
      if (!this.powerupStatusEl) return;
      
      this.powerupStatusEl.innerHTML = '';
      
      const statusMap = {
        strength: '⚡ Dwennimmen Power',
        wisdom: '🧠 Nyansapo Wisdom', 
        protection: '🛡️ Ancestral Shield',
        ancestral: '✨ Sankofa Blessing'
      };
      
      Object.keys(this.activePowerUps).forEach(type => {
        if (this.activePowerUps[type]) {
          const indicator = document.createElement('div');
          indicator.className = 'powerup-indicator';
          indicator.textContent = statusMap[type] || type;
          this.powerupStatusEl.appendChild(indicator);
        }
      });
    }

    updateCanvasSize() {
      // Get viewport dimensions
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate HUD and tap area heights based on screen size
      let hudHeight = 56;
      let tapAreaHeight = 120;
      
      if (vw <= 320) {
        hudHeight = 40;
        tapAreaHeight = 70;
      } else if (vw <= 480) {
        hudHeight = 44;
        tapAreaHeight = 80;
      } else if (vw <= 768) {
        hudHeight = 48;
        tapAreaHeight = 100;
      }
      
      // Handle landscape orientation
      if (vh <= 500 && vw > vh) {
        hudHeight = 36;
        tapAreaHeight = 60;
      }
      
      // Get device pixel ratio for crisp rendering on mobile
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = vw;
      const displayHeight = vh - hudHeight - tapAreaHeight;
      
      // Set canvas display size (CSS pixels)
      this.canvas.style.width = displayWidth + 'px';
      this.canvas.style.height = displayHeight + 'px';
      
      // Set canvas actual size (device pixels) for crisp rendering
      this.canvas.width = displayWidth * dpr;
      this.canvas.height = displayHeight * dpr;
      
      // Scale the canvas context to match device pixel ratio
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      // Update render options if render exists
      if (this.render) {
        this.render.options.width = displayWidth;
        this.render.options.height = displayHeight;
        this.render.canvas.width = this.canvas.width;
        this.render.canvas.height = this.canvas.height;
        
        // Enable mobile-optimized rendering
        this.render.options.pixelRatio = dpr;
        this.render.options.hasBounds = false;
        this.render.options.enabled = true;
      }
    }
    
    getScoreRequirements() {
      // Score requirements to unlock each level
      return [
        0,    // Level 1 - always unlocked
        50,   // Level 2 - need 50 points from level 1
        150,  // Level 3 - need 150 total points
        300,  // Level 4 - need 300 total points
        500,  // Level 5 - need 500 total points
        750,  // Level 6 - need 750 total points
        1050, // Level 7 - need 1050 total points
        1400, // Level 8 - need 1400 total points
        1800, // Level 9 - need 1800 total points
        2250, // Level 10 - need 2250 total points
        2750, // Level 11 - need 2750 total points
        3300, // Level 12 - need 3300 total points
        3900, // Level 13 - need 3900 total points
        4550, // Level 14 - need 4550 total points
        5250  // Level 15 - need 5250 total points
      ];
    }
    
    getLevelScores() {
      const saved = localStorage.getItem('mpira_level_scores');
      return saved ? JSON.parse(saved) : new Array(LEVELS.length).fill(0);
    }
    
    getTotalScore() {
      const levelScores = this.getLevelScores();
      return levelScores.reduce((total, score) => total + score, 0);
    }
    
    getUnlockedLevels() {
      const totalScore = this.getTotalScore();
      const requirements = this.getScoreRequirements();
      
      let unlockedCount = 1; // Always have level 1 unlocked
      for (let i = 1; i < requirements.length; i++) {
        if (totalScore >= requirements[i]) {
          unlockedCount = i + 1;
        } else {
          break;
        }
      }
      
      return unlockedCount;
    }
    
    saveLevelScore(levelIndex, score) {
      this.levelScores[levelIndex] = Math.max(this.levelScores[levelIndex], score);
      localStorage.setItem('mpira_level_scores', JSON.stringify(this.levelScores));
      
      // Update total score and unlocked levels
      this.totalScore = this.getTotalScore();
      this.unlockedLevels = this.getUnlockedLevels();
    }
    
    isLevelUnlocked(levelIndex) {
      return levelIndex < this.unlockedLevels;
    }
    
    detectMobile() {
       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
              ('ontouchstart' in window) || 
              (navigator.maxTouchPoints > 0);
     }
     
     optimizeForMobile() {
       if (this.isMobile) {
         // Adjust physics for mobile
         this.engine.world.gravity.y = 0.5; // Lighter gravity for mobile touch controls
         
         // Improve ball physics for touch
         if (this.gameObjects.ball) {
           this.gameObjects.ball.restitution = 0.4; // More bouncy
           this.gameObjects.ball.frictionAir = 0.002; // Less air resistance
         }
       }
     }
     
     resize() {
       this.updateCanvasSize();
       
       // Reload current level with new dimensions if playing
       if (this.gameState === 'playing' && this.gameObjects.ball) {
         this.loadLevel(this.currentLevel);
       }
     }
  }

// Initialize game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const game = new StarJumpGame();
  
  // Portrait orientation lock
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('portrait').catch(() => {
      console.log('Orientation lock not supported');
    });
  }
  
  window.addEventListener('resize', () => game.resize());
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      game.resize();
      // Re-attempt orientation lock after orientation change
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(() => {});
      }
    }, 100);
   });
});