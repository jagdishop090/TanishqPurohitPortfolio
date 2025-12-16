import { useEffect, useRef, useState } from 'react'
import './ShooterGame.css'

const ShooterGame = () => {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const joystickRef = useRef(null)
  const joystickStickRef = useRef(null)
  const jumpButtonRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const isMobileRef = useRef(false)
  const joystickPositionRef = useRef({ x: 0, y: 0 })
  const isJoystickActiveRef = useRef(false)
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 })
  const [isJoystickActive, setIsJoystickActive] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      return window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    const mobile = checkMobile()
    setIsMobile(mobile)
    isMobileRef.current = mobile

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 400

    // Game state
    const game = {
      player: {
        x: 50,
        y: 300,
        width: 35,
        height: 35,
        speed: 5,
        jumpPower: 12,
        velocityY: 0,
        onGround: false,
        emoji: '🐸'
      },
      bullets: [],
      enemies: [],
      platforms: [
        { x: 0, y: 350, width: 200, height: 50 },
        { x: 250, y: 280, width: 150, height: 50 },
        { x: 450, y: 220, width: 150, height: 50 },
        { x: 0, y: 150, width: 100, height: 50 },
        { x: 500, y: 350, width: 100, height: 50 }
      ],
      keys: {},
      score: 0,
      gameOver: false
    }

    gameRef.current = game

    // Input handling
    const handleKeyDown = (e) => {
      game.keys[e.key] = true
      if (e.key === ' ' && game.player.onGround) {
        game.player.velocityY = -game.player.jumpPower
        game.player.onGround = false
      }
      if (e.key === 'ArrowUp' && game.player.onGround) {
        game.player.velocityY = -game.player.jumpPower
        game.player.onGround = false
      }
    }

    const handleKeyUp = (e) => {
      game.keys[e.key] = false
    }

    const handleClick = (e) => {
      if (game.gameOver) {
        // Reset game
        game.player.x = 50
        game.player.y = 300
        game.player.velocityY = 0
        game.bullets = []
        game.enemies = []
        game.score = 0
        game.gameOver = false
        setIsPlaying(true)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Shoot bullet towards mouse
      const angle = Math.atan2(
        mouseY - (game.player.y + game.player.height / 2),
        mouseX - (game.player.x + game.player.width / 2)
      )

      game.bullets.push({
        x: game.player.x + game.player.width / 2,
        y: game.player.y + game.player.height / 2,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8,
        radius: 4
      })
    }

    // Joystick handlers
    const joystickBase = joystickRef.current
    const joystickStick = joystickStickRef.current
    const jumpButton = jumpButtonRef.current
    let activeTouchId = null
    let joystickBaseRect = null
    const container = canvas.parentElement

    const getJoystickPosition = (touch) => {
      if (!joystickBase || !joystickBaseRect) return { x: 0, y: 0 }
      
      const baseCenterX = joystickBaseRect.left + joystickBaseRect.width / 2
      const baseCenterY = joystickBaseRect.top + joystickBaseRect.height / 2
      const baseRadius = joystickBaseRect.width / 2
      
      const deltaX = touch.clientX - baseCenterX
      const deltaY = touch.clientY - baseCenterY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      const clampedDistance = Math.min(distance, baseRadius * 0.7)
      const angle = Math.atan2(deltaY, deltaX)
      
      return {
        x: (clampedDistance / baseRadius) * Math.cos(angle),
        y: (clampedDistance / baseRadius) * Math.sin(angle)
      }
    }

    const handleTouchStart = (e) => {
      if (!isMobileRef.current) return
      
      const touch = e.touches[0]
      if (!touch) return
      
      activeTouchId = touch.identifier
      
      if (joystickBase) {
        joystickBaseRect = joystickBase.getBoundingClientRect()
        const touchX = touch.clientX
        const touchY = touch.clientY
        
        // Check if touch is on joystick base
        const baseCenterX = joystickBaseRect.left + joystickBaseRect.width / 2
        const baseCenterY = joystickBaseRect.top + joystickBaseRect.height / 2
        const distance = Math.sqrt(
          Math.pow(touchX - baseCenterX, 2) + Math.pow(touchY - baseCenterY, 2)
        )
        
        if (distance <= joystickBaseRect.width / 2 + 30) { // Add tolerance for easier interaction
          e.preventDefault()
          e.stopPropagation()
          setIsJoystickActive(true)
          isJoystickActiveRef.current = true
          const pos = getJoystickPosition(touch)
          setJoystickPosition(pos)
          joystickPositionRef.current = pos
          if (joystickStick) {
            joystickStick.style.transform = `translate(${pos.x * 35}px, ${pos.y * 35}px)`
          }
          return
        }
      }
      
      if (jumpButton) {
        const jumpRect = jumpButton.getBoundingClientRect()
        if (
          touch.clientX >= jumpRect.left - 10 &&
          touch.clientX <= jumpRect.right + 10 &&
          touch.clientY >= jumpRect.top - 10 &&
          touch.clientY <= jumpRect.bottom + 10
        ) {
          e.preventDefault()
          e.stopPropagation()
          // Jump
          if (game.player.onGround) {
            game.player.velocityY = -game.player.jumpPower
            game.player.onGround = false
          }
          return
        }
      }
      
      // Shoot at touch position (on canvas)
      const rect = canvas.getBoundingClientRect()
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        e.preventDefault()
        const mouseX = touch.clientX - rect.left
        const mouseY = touch.clientY - rect.top
        
        const angle = Math.atan2(
          mouseY - (game.player.y + game.player.height / 2),
          mouseX - (game.player.x + game.player.width / 2)
        )
        
        game.bullets.push({
          x: game.player.x + game.player.width / 2,
          y: game.player.y + game.player.height / 2,
          vx: Math.cos(angle) * 8,
          vy: Math.sin(angle) * 8,
          radius: 4
        })
      }
    }

    const handleTouchMove = (e) => {
      if (!isMobileRef.current || !isJoystickActiveRef.current || !activeTouchId) return
      
      const touch = Array.from(e.touches).find(t => t.identifier === activeTouchId)
      if (!touch) return
      
      e.preventDefault()
      const pos = getJoystickPosition(touch)
      setJoystickPosition(pos)
      joystickPositionRef.current = pos
      if (joystickStick) {
        joystickStick.style.transform = `translate(${pos.x * 35}px, ${pos.y * 35}px)`
      }
    }

    const handleTouchEnd = (e) => {
      if (!isMobileRef.current) return
      
      const touch = Array.from(e.changedTouches).find(t => t.identifier === activeTouchId)
      if (touch) {
        e.preventDefault()
        setIsJoystickActive(false)
        isJoystickActiveRef.current = false
        setJoystickPosition({ x: 0, y: 0 })
        joystickPositionRef.current = { x: 0, y: 0 }
        if (joystickStick) {
          joystickStick.style.transform = 'translate(0, 0)'
        }
        activeTouchId = null
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('click', handleClick)
    
      if (isMobileRef.current && container) {
        container.addEventListener('touchstart', handleTouchStart, { passive: false })
        container.addEventListener('touchmove', handleTouchMove, { passive: false })
        container.addEventListener('touchend', handleTouchEnd, { passive: false })
      }

    // Collision detection
    const checkCollision = (rect1, rect2) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      )
    }

    const checkPointInRect = (point, rect) => {
      return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
      )
    }

    // Game loop
    let lastTime = 0
    let enemySpawnTimer = 0

    const gameLoop = (currentTime) => {
      if (!gameRef.current) return

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Clear canvas
      ctx.fillStyle = '#dadbd4'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update player - support joystick input
      const joystickPos = joystickPositionRef.current
      const joystickActive = isJoystickActiveRef.current
      const moveLeft = game.keys['ArrowLeft'] || game.keys['a'] || game.keys['A'] || (joystickActive && joystickPos.x < -0.3)
      const moveRight = game.keys['ArrowRight'] || game.keys['d'] || game.keys['D'] || (joystickActive && joystickPos.x > 0.3)
      
      if (moveLeft) {
        game.player.x = Math.max(0, game.player.x - game.player.speed)
      }
      if (moveRight) {
        game.player.x = Math.min(canvas.width - game.player.width, game.player.x + game.player.speed)
      }

      // Apply gravity
      game.player.velocityY += 0.6
      game.player.y += game.player.velocityY

      // Platform collision
      game.player.onGround = false
      for (const platform of game.platforms) {
        if (
          game.player.x < platform.x + platform.width &&
          game.player.x + game.player.width > platform.x &&
          game.player.y + game.player.height > platform.y &&
          game.player.y + game.player.height < platform.y + platform.height &&
          game.player.velocityY > 0
        ) {
          game.player.y = platform.y - game.player.height
          game.player.velocityY = 0
          game.player.onGround = true
        }
      }

      // Keep player in bounds
      if (game.player.y > canvas.height) {
        game.player.y = 300
        game.player.velocityY = 0
        game.player.onGround = true
      }

      // Spawn enemies
      enemySpawnTimer += deltaTime
      if (enemySpawnTimer > 2000 && !game.gameOver) {
        game.enemies.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 50),
          width: 30,
          height: 30,
          speed: 2 + Math.random() * 2,
          emoji: '👻'
        })
        enemySpawnTimer = 0
      }

      // Update enemies
      game.enemies = game.enemies.filter(enemy => {
        enemy.x -= enemy.speed

        // Check collision with player
        if (checkCollision(game.player, enemy)) {
          game.gameOver = true
          setIsPlaying(false)
        }

        return enemy.x > -enemy.width
      })

      // Update bullets
      game.bullets = game.bullets.filter(bullet => {
        bullet.x += bullet.vx
        bullet.y += bullet.vy

        // Check collision with enemies
        for (let i = game.enemies.length - 1; i >= 0; i--) {
          const enemy = game.enemies[i]
          if (
            bullet.x >= enemy.x &&
            bullet.x <= enemy.x + enemy.width &&
            bullet.y >= enemy.y &&
            bullet.y <= enemy.y + enemy.height
          ) {
            game.enemies.splice(i, 1)
            game.score += 10
            return false
          }
        }

        return (
          bullet.x > 0 &&
          bullet.x < canvas.width &&
          bullet.y > 0 &&
          bullet.y < canvas.height
        )
      })

      // Draw platforms
      ctx.fillStyle = '#9ca3af'
      ctx.strokeStyle = '#6b7280'
      ctx.lineWidth = 2
      game.platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height)
      })

      // Draw player (gun emoji)
      ctx.font = `${game.player.height}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        game.player.emoji,
        game.player.x + game.player.width / 2,
        game.player.y + game.player.height / 2
      )

      // Draw bullets
      ctx.fillStyle = '#000000'
      game.bullets.forEach(bullet => {
        ctx.beginPath()
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw enemies (ghost emoji with red outline)
      game.enemies.forEach(enemy => {
        ctx.font = `${enemy.height}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const centerX = enemy.x + enemy.width / 2
        const centerY = enemy.y + enemy.height / 2
        
        // Draw red outline by drawing emoji multiple times with offsets
        // Create a glow effect by drawing in a circle pattern
        const outlineRadius = 2.5
        const numPoints = 16
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2
          const dx = Math.cos(angle) * outlineRadius
          const dy = Math.sin(angle) * outlineRadius
          ctx.fillText(enemy.emoji, centerX + dx, centerY + dy)
        }
        
        // Draw additional outline points for thicker effect
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2
          const dx = Math.cos(angle) * (outlineRadius * 0.7)
          const dy = Math.sin(angle) * (outlineRadius * 0.7)
          ctx.fillText(enemy.emoji, centerX + dx, centerY + dy)
        }
        
        // Draw red circle behind for better visibility
        ctx.strokeStyle = '#dc2626'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, enemy.width / 2 + 2, 0, Math.PI * 2)
        ctx.stroke()
        
        // Draw the ghost emoji on top
        ctx.fillText(enemy.emoji, centerX, centerY)
      })

      // Draw UI
      ctx.font = 'bold 18px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      
      // Draw background for score text
      const scoreText = `Score: ${game.score}`
      const textMetrics = ctx.measureText(scoreText)
      const textWidth = textMetrics.width
      const textHeight = 20
      const padding = 8
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fillRect(10, 10, textWidth + padding * 2, textHeight + padding)
      
      ctx.fillStyle = '#1a1a1a'
      ctx.fillText(scoreText, 10 + padding, 10 + padding)

      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 32px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20)
        ctx.font = '18px Inter, sans-serif'
        ctx.fillText(`Final Score: ${game.score}`, canvas.width / 2, canvas.height / 2 + 20)
        ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 50)
        ctx.textAlign = 'left'
      } else {
        ctx.fillStyle = '#666666'
        ctx.font = '14px Inter, sans-serif'
        const instructionText = isMobileRef.current 
          ? 'Tap to Shoot | Use Joystick to Move' 
          : 'Click to Shoot | Arrow Keys to Move'
        ctx.fillText(instructionText, 10, canvas.height - 10)
      }

      requestAnimationFrame(gameLoop)
    }

    setIsPlaying(true)
    gameLoop(0)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('click', handleClick)
      if (isMobileRef.current && container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
      gameRef.current = null
    }
  }, [isMobile])

  return (
    <div className="shooter-game-container">
      <canvas ref={canvasRef} className="shooter-game-canvas"></canvas>
      <div className="mobile-controls">
        <div className="joystick-container">
          <div ref={joystickRef} className="joystick-base">
            <div ref={joystickStickRef} className="joystick-stick"></div>
          </div>
        </div>
        <button 
          ref={jumpButtonRef}
          className="jump-button"
        >
          JUMP
        </button>
      </div>
    </div>
  )
}

export default ShooterGame

