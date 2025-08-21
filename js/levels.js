// Level definitions for Star Jump - Tap to Jump Game
// Coordinates relative to a virtual 375x667 board (mobile-first design)
// Game mechanics: Ball falls with gravity, tap to jump, collect stars, avoid obstacles

// African Wisdom Proverbs for Motivational Messages
export const AFRICAN_PROVERBS = [
  { text: "The tree that would grow high must sink its roots deep", origin: "Akan", context: "falling" },
  { text: "Haraka haraka haina baraka - Haste makes waste", origin: "Swahili", context: "rushing" },
  { text: "When climbing a tall tree, don't forget you started from the ground", origin: "Yoruba", context: "overconfidence" },
  { text: "Ubuntu ngumuntu ngabantu - I am because we are", origin: "Zulu", context: "community" },
  { text: "A coward lion is defeated by a brave dog", origin: "Amharic", context: "courage" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now", origin: "African", context: "persistence" },
  { text: "If you want to go fast, go alone. If you want to go far, go together", origin: "African", context: "teamwork" },
  { text: "Smooth seas do not make skillful sailors", origin: "African", context: "challenge" },
  { text: "The child who is not embraced by the village will burn it down to feel its warmth", origin: "African", context: "belonging" },
  { text: "When the roots of a tree begin to decay, it spreads death to the branches", origin: "Nigerian", context: "foundation" }
];

export const LEVELS = [
  {
    name: 'Village Awakening - Mpira Learns to Bounce',
    startHeight: 0,
    targetHeight: 200,
    player: { x: 187, y: 580 },
    
    // Very easy platforms for learning
    platforms: [
      { x: 87, y: 530, w: 200, h: 20 }, // Extra wide starting platform
      { x: 50, y: 460, w: 140, h: 20 },  // Left platform
      { x: 185, y: 460, w: 140, h: 20 }, // Right platform
      { x: 100, y: 380, w: 175, h: 20 }, // Wide middle platform
      { x: 62, y: 300, w: 250, h: 20 },  // Victory platform
    ],
    
    // No obstacles in tutorial
    obstacles: [],
    
    // Easy to reach stars with African meaning
    stars: [
      { x: 187, y: 500, points: 10 }, // Hope star
      { x: 120, y: 430, points: 15 }, // Strength star
      { x: 255, y: 430, points: 15 }, // Courage star
      { x: 187, y: 350, points: 20 }, // Wisdom star
      { x: 187, y: 270, points: 50 }  // Unity star
    ],
    
    movingPlatforms: [],
    enemies: [],
    powerUps: [] // New power-up system
  },
  
  {
    name: 'Journey to the Baobab Tree - First Trials',
    startHeight: 0,
    targetHeight: 350,
    player: { x: 187, y: 580 },
    
    // Same smooth spacing as level 1
    platforms: [
      { x: 120, y: 530, w: 135, h: 20 },
      { x: 50, y: 460, w: 120, h: 20 },
      { x: 205, y: 460, w: 120, h: 20 },
      { x: 90, y: 390, w: 130, h: 20 },
      { x: 165, y: 330, w: 130, h: 20 },
      { x: 40, y: 260, w: 140, h: 20 },
      { x: 195, y: 260, w: 140, h: 20 },
      { x: 112, y: 190, w: 150, h: 20 } // Victory platform
    ],
    
    // Fewer, better positioned obstacles
    obstacles: [
      { x: 350, y: 440, w: 18, h: 22 }
    ],
    
    stars: [
      { x: 195, y: 500, points: 15 },
      { x: 107, y: 430, points: 20 },
      { x: 267, y: 430, points: 20 },
      { x: 150, y: 360, points: 25 },
      { x: 225, y: 300, points: 30 },
      { x: 105, y: 230, points: 35 },
      { x: 270, y: 230, points: 35 },
      { x: 187, y: 160, points: 100 } // Baobab blessing
    ],
    
    // Very gentle moving platforms
    movingPlatforms: [
      { x: 280, y: 400, w: 90, h: 20, moveX: 30, speed: 0.4 }
    ],
    
    // Very slow enemies
    enemies: [
      { type: 'patrol', x: 160, y: 480, w: 10, h: 10, range: 25, speed: 0.2 }
    ],
    
    // Introduce power-ups
    powerUps: [
      { type: 'adinkra_strength', x: 150, y: 350, symbol: 'dwennimmen' },
      { type: 'ancestral_boost', x: 225, y: 290, symbol: 'sankofa' }
    ]
  },
  
  {
    name: 'Return to the Village - Community Celebration',
    startHeight: 0,
    targetHeight: 450,
    player: { x: 187, y: 580 },
    
    // Smooth and forgiving like level 1
    platforms: [
      { x: 140, y: 530, w: 95, h: 20 },
      { x: 60, y: 460, w: 100, h: 20 },
      { x: 215, y: 460, w: 100, h: 20 },
      { x: 40, y: 390, w: 105, h: 20 },
      { x: 230, y: 390, w: 105, h: 20 },
      { x: 100, y: 320, w: 100, h: 20 },
      { x: 175, y: 320, w: 100, h: 20 },
      { x: 60, y: 250, w: 110, h: 20 },
      { x: 205, y: 250, w: 110, h: 20 },
      { x: 90, y: 180, w: 120, h: 20 },
      { x: 165, y: 180, w: 120, h: 20 },
      { x: 112, y: 120, w: 150, h: 20 } // Victory celebration platform
    ],
    
    // Strategic obstacle placement
    obstacles: [
      { x: 345, y: 510, w: 20, h: 25 },
      { x: 10, y: 440, w: 20, h: 25 }
    ],
    
    stars: [
      { x: 187, y: 500, points: 20 },
      { x: 125, y: 430, points: 25 },
      { x: 252, y: 430, points: 25 },
      { x: 92, y: 360, points: 30 },
      { x: 262, y: 360, points: 30 },
      { x: 147, y: 290, points: 35 },
      { x: 222, y: 290, points: 35 },
      { x: 125, y: 220, points: 40 },
      { x: 260, y: 220, points: 40 },
      { x: 137, y: 150, points: 50 },
      { x: 237, y: 150, points: 50 },
      { x: 187, y: 90, points: 200 } // Community celebration star
    ],
    
    // Smooth moving platforms
    movingPlatforms: [
      { x: 140, y: 440, w: 80, h: 20, moveX: 35, speed: 0.5 },
      { x: 80, y: 360, w: 85, h: 20, moveX: 40, speed: 0.6 }
    ],
    
    // Gentle enemies
    enemies: [
      { type: 'patrol', x: 130, y: 480, w: 10, h: 10, range: 30, speed: 0.25 },
      { type: 'patrol', x: 200, y: 340, w: 10, h: 10, range: 25, speed: 0.3 }
    ],
    
    // Multiple African power-ups
    powerUps: [
       { type: 'adinkra_wisdom', x: 147, y: 280, symbol: 'nyansapo' },
       { type: 'tribal_protection', x: 222, y: 280, symbol: 'mask' },
       { type: 'ancestral_boost', x: 187, y: 140, symbol: 'sankofa' }
     ]
   },
   
   // CHAPTER 4: THE ELDER'S CALL - Ancient Wisdom Beckons
   {
     name: 'The Elder\'s Call - Ancient Wisdom Beckons',
     startHeight: 0,
     targetHeight: 400,
     player: { x: 187, y: 580 },
     
     platforms: [
       { x: 130, y: 530, w: 115, h: 20 },
       { x: 40, y: 460, w: 100, h: 20 },
       { x: 235, y: 460, w: 100, h: 20 },
       { x: 80, y: 390, w: 110, h: 20 },
       { x: 185, y: 330, w: 110, h: 20 },
       { x: 30, y: 260, w: 120, h: 20 },
       { x: 225, y: 260, w: 120, h: 20 },
       { x: 100, y: 190, w: 130, h: 20 },
       { x: 125, y: 120, w: 125, h: 20 }
     ],
     
     obstacles: [
       { x: 360, y: 500, w: 15, h: 20 },
       { x: 5, y: 420, w: 15, h: 20 }
     ],
     
     stars: [
       { x: 187, y: 500, points: 25 },
       { x: 90, y: 430, points: 30 },
       { x: 285, y: 430, points: 30 },
       { x: 135, y: 360, points: 35 },
       { x: 240, y: 300, points: 40 },
       { x: 90, y: 230, points: 45 },
       { x: 285, y: 230, points: 45 },
       { x: 165, y: 160, points: 50 },
       { x: 187, y: 90, points: 150 }
     ],
     
     movingPlatforms: [
       { x: 280, y: 380, w: 70, h: 20, moveX: 40, speed: 0.6 },
       { x: 60, y: 300, w: 80, h: 20, moveX: 50, speed: 0.7 }
     ],
     
     enemies: [
       { type: 'patrol', x: 150, y: 480, w: 10, h: 10, range: 35, speed: 0.3 },
       { type: 'patrol', x: 220, y: 350, w: 10, h: 10, range: 30, speed: 0.35 }
     ],
     
     powerUps: [
       { type: 'adinkra_strength', x: 135, y: 350, symbol: 'dwennimmen' },
       { type: 'ancestral_boost', x: 240, y: 290, symbol: 'sankofa' },
       { type: 'tribal_protection', x: 165, y: 150, symbol: 'mask' }
     ],
     
     keys: [
       { x: 90, y: 220, opens: 'gate_1' }
     ],
     
     gates: [
       { x: 160, y: 180, w: 20, h: 40, id: 'gate_1' }
     ]
   },
   
   // CHAPTER 5: CROSSING THE RIVER - First Major Challenge
   {
     name: 'Crossing the River - First Major Challenge',
     startHeight: 0,
     targetHeight: 450,
     player: { x: 187, y: 580 },
     
     platforms: [
       { x: 120, y: 530, w: 110, h: 20 },
       { x: 30, y: 460, w: 90, h: 20 },
       { x: 255, y: 460, w: 90, h: 20 },
       { x: 70, y: 390, w: 100, h: 20 },
       { x: 205, y: 330, w: 100, h: 20 },
       { x: 20, y: 260, w: 110, h: 20 },
       { x: 245, y: 260, w: 110, h: 20 },
       { x: 90, y: 190, w: 120, h: 20 },
       { x: 165, y: 120, w: 120, h: 20 },
       { x: 112, y: 50, w: 150, h: 20 }
     ],
     
     obstacles: [
       { x: 370, y: 480, w: 15, h: 25 },
       { x: 0, y: 400, w: 15, h: 25 },
       { x: 375, y: 320, w: 15, h: 25 }
     ],
     
     stars: [
       { x: 175, y: 500, points: 30 },
       { x: 75, y: 430, points: 35 },
       { x: 300, y: 430, points: 35 },
       { x: 120, y: 360, points: 40 },
       { x: 255, y: 300, points: 45 },
       { x: 75, y: 230, points: 50 },
       { x: 300, y: 230, points: 50 },
       { x: 150, y: 160, points: 55 },
       { x: 225, y: 90, points: 60 },
       { x: 187, y: 20, points: 200 }
     ],
     
     movingPlatforms: [
       { x: 140, y: 420, w: 60, h: 20, moveX: 60, speed: 0.8 },
       { x: 50, y: 350, w: 70, h: 20, moveX: 70, speed: 0.9 },
       { x: 200, y: 280, w: 65, h: 20, moveX: 50, speed: 0.7 }
     ],
     
     enemies: [
       { type: 'patrol', x: 140, y: 480, w: 10, h: 10, range: 40, speed: 0.4 },
       { type: 'patrol', x: 180, y: 380, w: 10, h: 10, range: 35, speed: 0.45 },
       { type: 'patrol', x: 220, y: 310, w: 10, h: 10, range: 30, speed: 0.4 }
     ],
     
     powerUps: [
       { type: 'adinkra_wisdom', x: 120, y: 350, symbol: 'nyansapo' },
       { type: 'adinkra_strength', x: 255, y: 290, symbol: 'dwennimmen' },
       { type: 'ancestral_boost', x: 150, y: 150, symbol: 'sankofa' },
       { type: 'tribal_protection', x: 225, y: 80, symbol: 'mask' }
     ],
     
     waterLevel: 600,
     currentSpeed: 0.5
   },
   
   // CHAPTER 6: SAVANNA WINDS - Learning to Flow with Nature
   {
     name: 'Savanna Winds - Learning to Flow with Nature',
     startHeight: 0,
     targetHeight: 500,
     player: { x: 187, y: 580 },
     
     platforms: [
       { x: 110, y: 530, w: 100, h: 18 },
       { x: 20, y: 460, w: 85, h: 18 },
       { x: 270, y: 460, w: 85, h: 18 },
       { x: 60, y: 390, w: 90, h: 18 },
       { x: 225, y: 330, w: 90, h: 18 },
       { x: 10, y: 260, w: 100, h: 18 },
       { x: 265, y: 260, w: 100, h: 18 },
       { x: 80, y: 190, w: 110, h: 18 },
       { x: 185, y: 120, w: 110, h: 18 },
       { x: 100, y: 50, w: 140, h: 18 }
     ],
     
     obstacles: [
       { x: 375, y: 470, w: 15, h: 30 },
       { x: 0, y: 380, w: 15, h: 30 },
       { x: 380, y: 290, w: 15, h: 30 },
       { x: 5, y: 200, w: 15, h: 30 }
     ],
     
     stars: [
       { x: 160, y: 500, points: 35 },
       { x: 62, y: 430, points: 40 },
       { x: 312, y: 430, points: 40 },
       { x: 105, y: 360, points: 45 },
       { x: 270, y: 300, points: 50 },
       { x: 60, y: 230, points: 55 },
       { x: 315, y: 230, points: 55 },
       { x: 135, y: 160, points: 60 },
       { x: 240, y: 90, points: 65 },
       { x: 170, y: 20, points: 250 }
     ],
     
     movingPlatforms: [
       { x: 130, y: 420, w: 55, h: 18, moveX: 80, speed: 1.0 },
       { x: 40, y: 350, w: 60, h: 18, moveX: 90, speed: 1.1 },
       { x: 180, y: 280, w: 65, h: 18, moveX: 70, speed: 0.9 },
       { x: 120, y: 210, w: 70, h: 18, moveX: 60, speed: 0.8 }
     ],
     
     enemies: [
       { type: 'patrol', x: 130, y: 480, w: 9, h: 9, range: 50, speed: 0.5 },
       { type: 'patrol', x: 170, y: 380, w: 9, h: 9, range: 45, speed: 0.55 },
       { type: 'patrol', x: 200, y: 300, w: 9, h: 9, range: 40, speed: 0.5 },
       { type: 'patrol', x: 150, y: 220, w: 9, h: 9, range: 35, speed: 0.45 }
     ],
     
     powerUps: [
       { type: 'adinkra_strength', x: 105, y: 350, symbol: 'dwennimmen' },
       { type: 'adinkra_wisdom', x: 270, y: 290, symbol: 'nyansapo' },
       { type: 'tribal_protection', x: 135, y: 150, symbol: 'mask' },
       { type: 'ancestral_boost', x: 240, y: 80, symbol: 'sankofa' },
       { type: 'wind_blessing', x: 170, y: 10, symbol: 'wind' }
     ],
     
     windForce: { x: 0.002, y: 0 },
      windDirection: 'right'
    },
    
    // CHAPTER 7: DESERT TRIALS - Endurance and Patience
    {
      name: 'Desert Trials - Endurance and Patience',
      startHeight: 0,
      targetHeight: 550,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 100, y: 530, w: 90, h: 16 },
        { x: 10, y: 460, w: 80, h: 16 },
        { x: 285, y: 460, w: 80, h: 16 },
        { x: 50, y: 390, w: 85, h: 16 },
        { x: 240, y: 330, w: 85, h: 16 },
        { x: 5, y: 260, w: 90, h: 16 },
        { x: 280, y: 260, w: 90, h: 16 },
        { x: 70, y: 190, w: 100, h: 16 },
        { x: 205, y: 120, w: 100, h: 16 },
        { x: 90, y: 50, w: 130, h: 16 }
      ],
      
      obstacles: [
        { x: 380, y: 450, w: 15, h: 35 },
        { x: 0, y: 360, w: 15, h: 35 },
        { x: 385, y: 270, w: 15, h: 35 },
        { x: 0, y: 180, w: 15, h: 35 },
        { x: 380, y: 90, w: 15, h: 35 }
      ],
      
      stars: [
        { x: 145, y: 500, points: 40 },
        { x: 50, y: 430, points: 45 },
        { x: 325, y: 430, points: 45 },
        { x: 92, y: 360, points: 50 },
        { x: 282, y: 300, points: 55 },
        { x: 50, y: 230, points: 60 },
        { x: 325, y: 230, points: 60 },
        { x: 120, y: 160, points: 65 },
        { x: 255, y: 90, points: 70 },
        { x: 155, y: 20, points: 300 }
      ],
      
      movingPlatforms: [
        { x: 120, y: 420, w: 50, h: 16, moveX: 100, speed: 1.2 },
        { x: 30, y: 350, w: 55, h: 16, moveX: 110, speed: 1.3 },
        { x: 160, y: 280, w: 60, h: 16, moveX: 90, speed: 1.1 },
        { x: 100, y: 210, w: 65, h: 16, moveX: 80, speed: 1.0 },
        { x: 140, y: 140, w: 70, h: 16, moveX: 70, speed: 0.9 }
      ],
      
      enemies: [
        { type: 'patrol', x: 120, y: 480, w: 8, h: 8, range: 60, speed: 0.6 },
        { type: 'patrol', x: 160, y: 380, w: 8, h: 8, range: 55, speed: 0.65 },
        { type: 'patrol', x: 180, y: 290, w: 8, h: 8, range: 50, speed: 0.6 },
        { type: 'patrol', x: 140, y: 210, w: 8, h: 8, range: 45, speed: 0.55 },
        { type: 'patrol', x: 170, y: 130, w: 8, h: 8, range: 40, speed: 0.5 }
      ],
      
      powerUps: [
        { type: 'desert_endurance', x: 92, y: 350, symbol: 'camel' },
        { type: 'adinkra_wisdom', x: 282, y: 290, symbol: 'nyansapo' },
        { type: 'oasis_blessing', x: 120, y: 150, symbol: 'water' },
        { type: 'ancestral_boost', x: 255, y: 80, symbol: 'sankofa' },
        { type: 'mirage_protection', x: 155, y: 10, symbol: 'eye' }
      ],
      
      heatWaves: true,
      sandstorms: [{ x: 200, y: 400, radius: 80, strength: 0.003 }]
    },
    
    // CHAPTER 8: MOUNTAIN PEAKS - Reaching New Heights
    {
      name: 'Mountain Peaks - Reaching New Heights',
      startHeight: 0,
      targetHeight: 600,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 90, y: 530, w: 85, h: 14 },
        { x: 5, y: 460, w: 75, h: 14 },
        { x: 295, y: 460, w: 75, h: 14 },
        { x: 40, y: 390, w: 80, h: 14 },
        { x: 255, y: 330, w: 80, h: 14 },
        { x: 0, y: 260, w: 85, h: 14 },
        { x: 290, y: 260, w: 85, h: 14 },
        { x: 60, y: 190, w: 90, h: 14 },
        { x: 225, y: 120, w: 90, h: 14 },
        { x: 80, y: 50, w: 120, h: 14 }
      ],
      
      obstacles: [
        { x: 385, y: 430, w: 15, h: 40 },
        { x: 0, y: 340, w: 15, h: 40 },
        { x: 390, y: 250, w: 15, h: 40 },
        { x: 0, y: 160, w: 15, h: 40 },
        { x: 385, y: 70, w: 15, h: 40 }
      ],
      
      stars: [
        { x: 132, y: 500, points: 45 },
        { x: 42, y: 430, points: 50 },
        { x: 332, y: 430, points: 50 },
        { x: 80, y: 360, points: 55 },
        { x: 295, y: 300, points: 60 },
        { x: 42, y: 230, points: 65 },
        { x: 332, y: 230, points: 65 },
        { x: 105, y: 160, points: 70 },
        { x: 270, y: 90, points: 75 },
        { x: 140, y: 20, points: 350 }
      ],
      
      movingPlatforms: [
        { x: 110, y: 420, w: 45, h: 14, moveX: 120, speed: 1.4 },
        { x: 20, y: 350, w: 50, h: 14, moveX: 130, speed: 1.5 },
        { x: 140, y: 280, w: 55, h: 14, moveX: 100, speed: 1.3 },
        { x: 80, y: 210, w: 60, h: 14, moveX: 90, speed: 1.2 },
        { x: 120, y: 140, w: 65, h: 14, moveX: 80, speed: 1.1 },
        { x: 100, y: 70, w: 70, h: 14, moveX: 70, speed: 1.0 }
      ],
      
      enemies: [
        { type: 'patrol', x: 110, y: 480, w: 7, h: 7, range: 70, speed: 0.7 },
        { type: 'patrol', x: 150, y: 380, w: 7, h: 7, range: 65, speed: 0.75 },
        { type: 'patrol', x: 170, y: 280, w: 7, h: 7, range: 60, speed: 0.7 },
        { type: 'patrol', x: 130, y: 200, w: 7, h: 7, range: 55, speed: 0.65 },
        { type: 'patrol', x: 160, y: 120, w: 7, h: 7, range: 50, speed: 0.6 },
        { type: 'flying', x: 200, y: 300, radius: 6, speed: 0.8, pattern: 'circle' }
      ],
      
      powerUps: [
        { type: 'mountain_strength', x: 80, y: 350, symbol: 'peak' },
        { type: 'adinkra_strength', x: 295, y: 290, symbol: 'dwennimmen' },
        { type: 'eagle_vision', x: 105, y: 150, symbol: 'eagle' },
        { type: 'ancestral_boost', x: 270, y: 80, symbol: 'sankofa' },
        { type: 'summit_blessing', x: 140, y: 10, symbol: 'crown' }
      ],
      
      altitude: 2000,
      thinAir: true,
      rockSlides: [{ x: 150, y: 350, width: 100, interval: 5000 }]
    },
    
    // CHAPTER 9: FOREST SPIRITS - Navigating the Unknown
    {
      name: 'Forest Spirits - Navigating the Unknown',
      startHeight: 0,
      targetHeight: 650,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 80, y: 530, w: 80, h: 12 },
        { x: 0, y: 460, w: 70, h: 12 },
        { x: 305, y: 460, w: 70, h: 12 },
        { x: 30, y: 390, w: 75, h: 12 },
        { x: 270, y: 330, w: 75, h: 12 },
        { x: 5, y: 260, w: 80, h: 12 },
        { x: 290, y: 260, w: 80, h: 12 },
        { x: 50, y: 190, w: 85, h: 12 },
        { x: 240, y: 120, w: 85, h: 12 },
        { x: 70, y: 50, w: 110, h: 12 }
      ],
      
      obstacles: [
        { x: 390, y: 410, w: 10, h: 45 },
        { x: 0, y: 320, w: 10, h: 45 },
        { x: 395, y: 230, w: 10, h: 45 },
        { x: 0, y: 140, w: 10, h: 45 },
        { x: 390, y: 50, w: 10, h: 45 }
      ],
      
      stars: [
        { x: 120, y: 500, points: 50 },
        { x: 35, y: 430, points: 55 },
        { x: 340, y: 430, points: 55 },
        { x: 67, y: 360, points: 60 },
        { x: 307, y: 300, points: 65 },
        { x: 45, y: 230, points: 70 },
        { x: 330, y: 230, points: 70 },
        { x: 92, y: 160, points: 75 },
        { x: 282, y: 90, points: 80 },
        { x: 125, y: 20, points: 400 }
      ],
      
      movingPlatforms: [
        { x: 100, y: 420, w: 40, h: 12, moveX: 140, speed: 1.6 },
        { x: 10, y: 350, w: 45, h: 12, moveX: 150, speed: 1.7 },
        { x: 120, y: 280, w: 50, h: 12, moveX: 120, speed: 1.5 },
        { x: 60, y: 210, w: 55, h: 12, moveX: 110, speed: 1.4 },
        { x: 100, y: 140, w: 60, h: 12, moveX: 100, speed: 1.3 },
        { x: 80, y: 70, w: 65, h: 12, moveX: 90, speed: 1.2 }
      ],
      
      enemies: [
        { type: 'patrol', x: 100, y: 480, w: 6, h: 6, range: 80, speed: 0.8 },
        { type: 'patrol', x: 140, y: 380, w: 6, h: 6, range: 75, speed: 0.85 },
        { type: 'patrol', x: 160, y: 270, w: 6, h: 6, range: 70, speed: 0.8 },
        { type: 'patrol', x: 120, y: 190, w: 6, h: 6, range: 65, speed: 0.75 },
        { type: 'patrol', x: 150, y: 110, w: 6, h: 6, range: 60, speed: 0.7 },
        { type: 'flying', x: 180, y: 280, radius: 5, speed: 1.0, pattern: 'zigzag' },
        { type: 'spirit', x: 220, y: 200, radius: 8, speed: 0.6, pattern: 'phase' }
      ],
      
      powerUps: [
        { type: 'forest_wisdom', x: 67, y: 350, symbol: 'tree' },
        { type: 'spirit_protection', x: 307, y: 290, symbol: 'ghost' },
        { type: 'nature_harmony', x: 92, y: 150, symbol: 'leaf' },
        { type: 'ancestral_boost', x: 282, y: 80, symbol: 'sankofa' },
        { type: 'forest_blessing', x: 125, y: 10, symbol: 'vine' }
      ],
      
      fogLevel: 0.3,
      mysticalPortals: [{ x: 200, y: 350, targetX: 200, targetY: 150 }]
    },
    
    // CHAPTER 10: THE GREAT GATHERING - Meeting Other Communities
    {
      name: 'The Great Gathering - Meeting Other Communities',
      startHeight: 0,
      targetHeight: 700,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 70, y: 530, w: 75, h: 10 },
        { x: 5, y: 460, w: 65, h: 10 },
        { x: 315, y: 460, w: 65, h: 10 },
        { x: 20, y: 390, w: 70, h: 10 },
        { x: 285, y: 330, w: 70, h: 10 },
        { x: 10, y: 260, w: 75, h: 10 },
        { x: 290, y: 260, w: 75, h: 10 },
        { x: 40, y: 190, w: 80, h: 10 },
        { x: 255, y: 120, w: 80, h: 10 },
        { x: 60, y: 50, w: 100, h: 10 }
      ],
      
      obstacles: [
        { x: 395, y: 390, w: 5, h: 50 },
        { x: 0, y: 300, w: 5, h: 50 },
        { x: 400, y: 210, w: 5, h: 50 },
        { x: 0, y: 120, w: 5, h: 50 },
        { x: 395, y: 30, w: 5, h: 50 }
      ],
      
      stars: [
        { x: 107, y: 500, points: 55 },
        { x: 37, y: 430, points: 60 },
        { x: 347, y: 430, points: 60 },
        { x: 55, y: 360, points: 65 },
        { x: 320, y: 300, points: 70 },
        { x: 47, y: 230, points: 75 },
        { x: 337, y: 230, points: 75 },
        { x: 80, y: 160, points: 80 },
        { x: 295, y: 90, points: 85 },
        { x: 110, y: 20, points: 450 }
      ],
      
      movingPlatforms: [
        { x: 90, y: 420, w: 35, h: 10, moveX: 160, speed: 1.8 },
        { x: 0, y: 350, w: 40, h: 10, moveX: 170, speed: 1.9 },
        { x: 100, y: 280, w: 45, h: 10, moveX: 140, speed: 1.7 },
        { x: 40, y: 210, w: 50, h: 10, moveX: 130, speed: 1.6 },
        { x: 80, y: 140, w: 55, h: 10, moveX: 120, speed: 1.5 },
        { x: 60, y: 70, w: 60, h: 10, moveX: 110, speed: 1.4 }
      ],
      
      enemies: [
        { type: 'patrol', x: 90, y: 480, w: 5, h: 5, range: 90, speed: 0.9 },
        { type: 'patrol', x: 130, y: 380, w: 5, h: 5, range: 85, speed: 0.95 },
        { type: 'patrol', x: 150, y: 260, w: 5, h: 5, range: 80, speed: 0.9 },
        { type: 'patrol', x: 110, y: 180, w: 5, h: 5, range: 75, speed: 0.85 },
        { type: 'patrol', x: 140, y: 100, w: 5, h: 5, range: 70, speed: 0.8 },
        { type: 'flying', x: 160, y: 260, radius: 4, speed: 1.2, pattern: 'spiral' },
        { type: 'guardian', x: 200, y: 180, radius: 12, health: 3, speed: 0.5 }
      ],
      
      powerUps: [
        { type: 'community_strength', x: 55, y: 350, symbol: 'hands' },
        { type: 'unity_blessing', x: 320, y: 290, symbol: 'circle' },
        { type: 'gathering_wisdom', x: 80, y: 150, symbol: 'council' },
        { type: 'ancestral_boost', x: 295, y: 80, symbol: 'sankofa' },
        { type: 'ubuntu_power', x: 110, y: 10, symbol: 'ubuntu' }
      ],
      
      communityHelpers: [
        { x: 150, y: 400, type: 'guide', helps: 'navigation' },
        { x: 250, y: 300, type: 'healer', helps: 'health' }
      ]
    },
    
    // CHAPTER 11: THE WISDOM KEEPER - Learning Ancient Secrets
    {
      name: 'The Wisdom Keeper - Learning Ancient Secrets',
      startHeight: 0,
      targetHeight: 750,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 60, y: 530, w: 70, h: 8 },
        { x: 10, y: 460, w: 60, h: 8 },
        { x: 325, y: 460, w: 60, h: 8 },
        { x: 10, y: 390, w: 65, h: 8 },
        { x: 300, y: 330, w: 65, h: 8 },
        { x: 15, y: 260, w: 70, h: 8 },
        { x: 290, y: 260, w: 70, h: 8 },
        { x: 30, y: 190, w: 75, h: 8 },
        { x: 270, y: 120, w: 75, h: 8 },
        { x: 50, y: 50, w: 90, h: 8 }
      ],
      
      obstacles: [
        { x: 400, y: 370, w: 5, h: 55 },
        { x: 0, y: 280, w: 5, h: 55 },
        { x: 400, y: 190, w: 5, h: 55 },
        { x: 0, y: 100, w: 5, h: 55 },
        { x: 400, y: 10, w: 5, h: 55 }
      ],
      
      stars: [
        { x: 95, y: 500, points: 60 },
        { x: 40, y: 430, points: 65 },
        { x: 355, y: 430, points: 65 },
        { x: 42, y: 360, points: 70 },
        { x: 332, y: 300, points: 75 },
        { x: 50, y: 230, points: 80 },
        { x: 325, y: 230, points: 80 },
        { x: 67, y: 160, points: 85 },
        { x: 307, y: 90, points: 90 },
        { x: 95, y: 20, points: 500 }
      ],
      
      movingPlatforms: [
        { x: 80, y: 420, w: 30, h: 8, moveX: 180, speed: 2.0 },
        { x: 5, y: 350, w: 35, h: 8, moveX: 190, speed: 2.1 },
        { x: 80, y: 280, w: 40, h: 8, moveX: 160, speed: 1.9 },
        { x: 20, y: 210, w: 45, h: 8, moveX: 150, speed: 1.8 },
        { x: 60, y: 140, w: 50, h: 8, moveX: 140, speed: 1.7 },
        { x: 40, y: 70, w: 55, h: 8, moveX: 130, speed: 1.6 }
      ],
      
      enemies: [
        { type: 'patrol', x: 80, y: 480, w: 4, h: 4, range: 100, speed: 1.0 },
        { type: 'patrol', x: 120, y: 380, w: 4, h: 4, range: 95, speed: 1.05 },
        { type: 'patrol', x: 140, y: 250, w: 4, h: 4, range: 90, speed: 1.0 },
        { type: 'patrol', x: 100, y: 170, w: 4, h: 4, range: 85, speed: 0.95 },
        { type: 'patrol', x: 130, y: 90, w: 4, h: 4, range: 80, speed: 0.9 },
        { type: 'flying', x: 140, y: 240, radius: 3, speed: 1.4, pattern: 'infinity' },
        { type: 'ancient_guardian', x: 180, y: 160, radius: 15, health: 5, speed: 0.3 }
      ],
      
      powerUps: [
        { type: 'ancient_wisdom', x: 42, y: 350, symbol: 'scroll' },
        { type: 'keeper_blessing', x: 332, y: 290, symbol: 'staff' },
        { type: 'secret_knowledge', x: 67, y: 150, symbol: 'eye' },
        { type: 'ancestral_boost', x: 307, y: 80, symbol: 'sankofa' },
        { type: 'wisdom_mastery', x: 95, y: 10, symbol: 'crown' }
      ],
      
      ancientRunes: [
        { x: 200, y: 400, symbol: 'strength', effect: 'jump_boost' },
        { x: 200, y: 300, symbol: 'wisdom', effect: 'slow_time' },
        { x: 200, y: 200, symbol: 'protection', effect: 'shield' }
      ]
    },
    
    // CHAPTER 12: STORM CLOUDS - Facing the Greatest Challenge
    {
      name: 'Storm Clouds - Facing the Greatest Challenge',
      startHeight: 0,
      targetHeight: 800,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 50, y: 530, w: 65, h: 6 },
        { x: 15, y: 460, w: 55, h: 6 },
        { x: 335, y: 460, w: 55, h: 6 },
        { x: 5, y: 390, w: 60, h: 6 },
        { x: 315, y: 330, w: 60, h: 6 },
        { x: 20, y: 260, w: 65, h: 6 },
        { x: 290, y: 260, w: 65, h: 6 },
        { x: 20, y: 190, w: 70, h: 6 },
        { x: 285, y: 120, w: 70, h: 6 },
        { x: 40, y: 50, w: 80, h: 6 }
      ],
      
      obstacles: [
        { x: 400, y: 350, w: 5, h: 60 },
        { x: 0, y: 260, w: 5, h: 60 },
        { x: 400, y: 170, w: 5, h: 60 },
        { x: 0, y: 80, w: 5, h: 60 }
      ],
      
      stars: [
        { x: 82, y: 500, points: 65 },
        { x: 42, y: 430, points: 70 },
        { x: 362, y: 430, points: 70 },
        { x: 35, y: 360, points: 75 },
        { x: 345, y: 300, points: 80 },
        { x: 52, y: 230, points: 85 },
        { x: 322, y: 230, points: 85 },
        { x: 55, y: 160, points: 90 },
        { x: 320, y: 90, points: 95 },
        { x: 80, y: 20, points: 600 }
      ],
      
      movingPlatforms: [
        { x: 70, y: 420, w: 25, h: 6, moveX: 200, speed: 2.2 },
        { x: 10, y: 350, w: 30, h: 6, moveX: 210, speed: 2.3 },
        { x: 60, y: 280, w: 35, h: 6, moveX: 180, speed: 2.1 },
        { x: 10, y: 210, w: 40, h: 6, moveX: 170, speed: 2.0 },
        { x: 40, y: 140, w: 45, h: 6, moveX: 160, speed: 1.9 },
        { x: 20, y: 70, w: 50, h: 6, moveX: 150, speed: 1.8 }
      ],
      
      enemies: [
        { type: 'storm_spirit', x: 70, y: 480, radius: 8, speed: 1.2, pattern: 'lightning' },
        { type: 'wind_demon', x: 110, y: 380, w: 3, h: 3, range: 120, speed: 1.2 },
        { type: 'thunder_beast', x: 130, y: 240, radius: 10, health: 4, speed: 0.8 },
        { type: 'lightning_strike', x: 90, y: 160, radius: 5, speed: 2.0, pattern: 'random' },
        { type: 'storm_lord', x: 160, y: 80, radius: 20, health: 7, speed: 0.4 }
      ],
      
      powerUps: [
        { type: 'storm_resistance', x: 35, y: 350, symbol: 'shield' },
        { type: 'lightning_speed', x: 345, y: 290, symbol: 'bolt' },
        { type: 'thunder_strength', x: 55, y: 150, symbol: 'hammer' },
        { type: 'ancestral_boost', x: 320, y: 80, symbol: 'sankofa' },
        { type: 'storm_mastery', x: 80, y: 10, symbol: 'storm' }
      ],
      
      weather: {
        lightning: true,
        wind: { strength: 0.005, direction: 'variable' },
        rain: { intensity: 0.8, affects: 'friction' }
      }
    },
    
    // CHAPTER 13: THE UNITY RITUAL - Bringing Communities Together
    {
      name: 'The Unity Ritual - Bringing Communities Together',
      startHeight: 0,
      targetHeight: 850,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 40, y: 530, w: 60, h: 4 },
        { x: 20, y: 460, w: 50, h: 4 },
        { x: 345, y: 460, w: 50, h: 4 },
        { x: 0, y: 390, w: 55, h: 4 },
        { x: 330, y: 330, w: 55, h: 4 },
        { x: 25, y: 260, w: 60, h: 4 },
        { x: 290, y: 260, w: 60, h: 4 },
        { x: 10, y: 190, w: 65, h: 4 },
        { x: 300, y: 120, w: 65, h: 4 },
        { x: 30, y: 50, w: 70, h: 4 }
      ],
      
      obstacles: [
        { x: 400, y: 330, w: 5, h: 65 },
        { x: 0, y: 240, w: 5, h: 65 },
        { x: 400, y: 150, w: 5, h: 65 },
        { x: 0, y: 60, w: 5, h: 65 }
      ],
      
      stars: [
        { x: 70, y: 500, points: 70 },
        { x: 45, y: 430, points: 75 },
        { x: 370, y: 430, points: 75 },
        { x: 27, y: 360, points: 80 },
        { x: 357, y: 300, points: 85 },
        { x: 55, y: 230, points: 90 },
        { x: 320, y: 230, points: 90 },
        { x: 42, y: 160, points: 95 },
        { x: 332, y: 90, points: 100 },
        { x: 65, y: 20, points: 700 }
      ],
      
      movingPlatforms: [
        { x: 60, y: 420, w: 20, h: 4, moveX: 220, speed: 2.4 },
        { x: 15, y: 350, w: 25, h: 4, moveX: 230, speed: 2.5 },
        { x: 40, y: 280, w: 30, h: 4, moveX: 200, speed: 2.3 },
        { x: 0, y: 210, w: 35, h: 4, moveX: 190, speed: 2.2 },
        { x: 20, y: 140, w: 40, h: 4, moveX: 180, speed: 2.1 },
        { x: 10, y: 70, w: 45, h: 4, moveX: 170, speed: 2.0 }
      ],
      
      enemies: [
        { type: 'unity_challenger', x: 60, y: 480, radius: 6, speed: 1.4, pattern: 'unity_test' },
        { type: 'division_spirit', x: 100, y: 380, w: 2, h: 2, range: 140, speed: 1.4 },
        { type: 'harmony_guardian', x: 120, y: 220, radius: 12, health: 6, speed: 0.6 },
        { type: 'ritual_protector', x: 80, y: 140, radius: 8, speed: 1.6, pattern: 'circle' },
        { type: 'ubuntu_spirit', x: 140, y: 60, radius: 25, health: 10, speed: 0.2 }
      ],
      
      powerUps: [
        { type: 'unity_power', x: 27, y: 350, symbol: 'unity' },
        { type: 'harmony_blessing', x: 357, y: 290, symbol: 'harmony' },
        { type: 'ritual_strength', x: 42, y: 150, symbol: 'ritual' },
        { type: 'ancestral_boost', x: 332, y: 80, symbol: 'sankofa' },
        { type: 'ubuntu_mastery', x: 65, y: 10, symbol: 'ubuntu' }
      ],
      
      ritualCircles: [
        { x: 200, y: 400, radius: 50, effect: 'unity_boost' },
        { x: 200, y: 250, radius: 60, effect: 'harmony_field' },
        { x: 200, y: 100, radius: 70, effect: 'ubuntu_power' }
      ]
    },
    
    // CHAPTER 14: THE FINAL TEST - Proving Worthiness
    {
      name: 'The Final Test - Proving Worthiness',
      startHeight: 0,
      targetHeight: 900,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 30, y: 530, w: 55, h: 2 },
        { x: 25, y: 460, w: 45, h: 2 },
        { x: 355, y: 460, w: 45, h: 2 },
        { x: 5, y: 390, w: 50, h: 2 },
        { x: 345, y: 330, w: 50, h: 2 },
        { x: 30, y: 260, w: 55, h: 2 },
        { x: 290, y: 260, w: 55, h: 2 },
        { x: 0, y: 190, w: 60, h: 2 },
        { x: 315, y: 120, w: 60, h: 2 },
        { x: 20, y: 50, w: 65, h: 2 }
      ],
      
      obstacles: [
        { x: 400, y: 310, w: 5, h: 70 },
        { x: 0, y: 220, w: 5, h: 70 },
        { x: 400, y: 130, w: 5, h: 70 },
        { x: 0, y: 40, w: 5, h: 70 }
      ],
      
      stars: [
        { x: 57, y: 500, points: 75 },
        { x: 47, y: 430, points: 80 },
        { x: 377, y: 430, points: 80 },
        { x: 30, y: 360, points: 85 },
        { x: 370, y: 300, points: 90 },
        { x: 57, y: 230, points: 95 },
        { x: 317, y: 230, points: 95 },
        { x: 30, y: 160, points: 100 },
        { x: 345, y: 90, points: 105 },
        { x: 52, y: 20, points: 800 }
      ],
      
      movingPlatforms: [
        { x: 50, y: 420, w: 15, h: 2, moveX: 240, speed: 2.6 },
        { x: 20, y: 350, w: 20, h: 2, moveX: 250, speed: 2.7 },
        { x: 20, y: 280, w: 25, h: 2, moveX: 220, speed: 2.5 },
        { x: 5, y: 210, w: 30, h: 2, moveX: 210, speed: 2.4 },
        { x: 10, y: 140, w: 35, h: 2, moveX: 200, speed: 2.3 },
        { x: 0, y: 70, w: 40, h: 2, moveX: 190, speed: 2.2 }
      ],
      
      enemies: [
        { type: 'final_guardian', x: 50, y: 480, radius: 4, speed: 1.6, pattern: 'perfect' },
        { type: 'master_spirit', x: 90, y: 380, w: 1, h: 1, range: 160, speed: 1.6 },
        { type: 'ultimate_test', x: 110, y: 200, radius: 15, health: 8, speed: 0.8 },
        { type: 'worthiness_judge', x: 70, y: 120, radius: 6, speed: 1.8, pattern: 'judgment' },
        { type: 'final_boss', x: 120, y: 40, radius: 30, health: 15, speed: 0.1 }
      ],
      
      powerUps: [
        { type: 'final_strength', x: 30, y: 350, symbol: 'power' },
        { type: 'ultimate_wisdom', x: 370, y: 290, symbol: 'wisdom' },
        { type: 'perfect_harmony', x: 30, y: 150, symbol: 'balance' },
        { type: 'ancestral_boost', x: 345, y: 80, symbol: 'sankofa' },
        { type: 'worthiness_proof', x: 52, y: 10, symbol: 'worthy' }
      ],
      
      finalTest: {
        perfectJumps: 10,
        timeLimit: 300,
        noMistakes: true
      }
    },
    
    // CHAPTER 15: UBUNTU ACHIEVED - Complete Community Harmony
    {
      name: 'Ubuntu Achieved - Complete Community Harmony',
      startHeight: 0,
      targetHeight: 1000,
      player: { x: 187, y: 580 },
      
      platforms: [
        { x: 162, y: 530, w: 50, h: 15 },
        { x: 137, y: 460, w: 100, h: 15 },
        { x: 112, y: 390, w: 150, h: 15 },
        { x: 87, y: 320, w: 200, h: 15 },
        { x: 62, y: 250, w: 250, h: 15 },
        { x: 37, y: 180, w: 300, h: 15 },
        { x: 12, y: 110, w: 350, h: 15 },
        { x: 0, y: 40, w: 375, h: 20 }
      ],
      
      obstacles: [],
      
      stars: [
        { x: 187, y: 500, points: 100 },
        { x: 137, y: 430, points: 100 },
        { x: 237, y: 430, points: 100 },
        { x: 112, y: 360, points: 100 },
        { x: 262, y: 360, points: 100 },
        { x: 87, y: 290, points: 100 },
        { x: 287, y: 290, points: 100 },
        { x: 62, y: 220, points: 100 },
        { x: 312, y: 220, points: 100 },
        { x: 37, y: 150, points: 100 },
        { x: 337, y: 150, points: 100 },
        { x: 12, y: 80, points: 100 },
        { x: 362, y: 80, points: 100 },
        { x: 187, y: 10, points: 1000 }
      ],
      
      movingPlatforms: [],
      
      enemies: [],
      
      powerUps: [
        { type: 'ubuntu_eternal', x: 187, y: 490, symbol: 'ubuntu' },
        { type: 'community_blessing', x: 187, y: 350, symbol: 'community' },
        { type: 'harmony_eternal', x: 187, y: 210, symbol: 'harmony' },
        { type: 'ancestral_blessing', x: 187, y: 70, symbol: 'ancestors' },
        { type: 'mpira_mastery', x: 187, y: 0, symbol: 'crown' }
      ],
      
      celebration: {
        fireworks: true,
        music: 'ubuntu_song',
        communityGathering: true,
        finalMessage: 'Ubuntu - I am because we are. Mpira has brought harmony to all communities!'
      }
    }
  ];