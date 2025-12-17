# Game Assets Required

Place the following assets in this directory:

## Sprites
- `player.png` - Player sprite sheet (64x64 pixels, 6 frames: 0-1 idle, 2-3 run, 4 jump, 5 shoot)
- `enemy.png` - Enemy sprite sheet (64x64 pixels, 4 frames: 0-1 idle, 2-3 run)
- `bullet.png` - Bullet sprite (small image, e.g., 16x16)

## Tilemap
- `tileset.png` - Tileset image for the level
- `map.json` - Tiled JSON map file with a "ground" layer that has collision property "collides: true"

## Backgrounds
- `bg-far.png` - Far background layer (parallax)
- `bg-mid.png` - Mid background layer (parallax)
- `bg-near.png` - Near background layer (parallax)

## Audio
- `jump.mp3` - Jump sound effect
- `shoot.mp3` - Shoot sound effect
- `hit.mp3` - Hit/damage sound effect

All assets should be optimized for web use.

