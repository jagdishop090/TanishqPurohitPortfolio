import { useEffect, useRef, useState } from 'react'
import './ShooterGame.css'

const ShooterGame = () => {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const joystickRef = useRef(null)
  const joystickStickRef = useRef(null)
  const jumpButtonRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const joystickPositionRef = useRef({ x: 0, y: 0 })
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
      e.stopPropagation()
      
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

      if (!isPlaying) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      // Shoot bullet towards mouse
      const angle = Math.atan2(
        mouseY - game.player.y - game.player.height / 2,
        mouseX - game.player.x - game.player.width / 2
      )
      game.bullets.push({
        x: game.player.x + game.player.width / 2,
        y: game.player.y + game.player.height / 2,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8
      })
    }

    // Joystick handling
    const handleTouchStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (game.gameOver) {
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

      if (!joystickRef.current) return
      const touch = e.touches[0]
      const rect = joystickRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const touchX = touch.clientX - centerX
      const touchY = touch.clientY - centerY
      
      setIsJoystickActive(true)
      joystickPositionRef.current = { x: touchX, y: touchY }
      setJoystickPosition({ x: touchX, y: touchY })
    }

    const handleTouchMove = (e) => {
      if (!isJoystickActive || !joystickRef.current) return
      e.preventDefault()
      e.stopPropagation()
      const touch = e.touches[0]
      const rect = joystickRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const touchX = touch.clientX - centerX
      const touchY = touch.clientY - centerY
      const distance = Math.sqrt(touchX * touchX + touchY * touchY)
      const maxDistance = 40
      
      if (distance > maxDistance) {
        const angle = Math.atan2(touchY, touchX)
        joystickPositionRef.current = {
          x: Math.cos(angle) * maxDistance,
          y: Math.sin(angle) * maxDistance
        }
      } else {
        joystickPositionRef.current = { x: touchX, y: touchY }
      }
      setJoystickPosition(joystickPositionRef.current)
    }

    const handleTouchEnd = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      setIsJoystickActive(false)
      joystickPositionRef.current = { x: 0, y: 0 }
      setJoystickPosition({ x: 0, y: 0 })
    }

    const handleJump = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      if (game.player.onGround) {
        game.player.velocityY = -game.player.jumpPower
        game.player.onGround = false
      }
    }

    // Touch shooting
    const handleCanvasTouch = (e) => {
      if (game.gameOver) {
        // Reset game on touch
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
      
      if (!isPlaying) return
      
      e.preventDefault()
      e.stopPropagation()
      
      if (!e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const canvasX = (touch.clientX - rect.left) * scaleX
      const canvasY = (touch.clientY - rect.top) * scaleY

      // Don't shoot if touching joystick or jump button area
      const joystickRect = joystickRef.current?.getBoundingClientRect()
      const jumpRect = jumpButtonRef.current?.getBoundingClientRect()
      if (joystickRect && touch.clientX >= joystickRect.left && touch.clientX <= joystickRect.right &&
          touch.clientY >= joystickRect.top && touch.clientY <= joystickRect.bottom) {
        return
      }
      if (jumpRect && touch.clientX >= jumpRect.left && touch.clientX <= jumpRect.right &&
          touch.clientY >= jumpRect.top && touch.clientY <= jumpRect.bottom) {
        return
      }

      const angle = Math.atan2(
        canvasY - game.player.y - game.player.height / 2,
        canvasX - game.player.x - game.player.width / 2
      )
      game.bullets.push({
        x: game.player.x + game.player.width / 2,
        y: game.player.y + game.player.height / 2,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8
      })
    }

    const handleCanvasTouchMove = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleCanvasTouchEnd = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchstart', handleCanvasTouch, { passive: false })
    canvas.addEventListener('touchmove', handleCanvasTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleCanvasTouchEnd, { passive: false })
    
    // Also listen on document for touchmove/touchend to handle joystick when touch moves outside
    if (isMobile) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: false })
    }
    
    // Add joystick listeners with a small delay to ensure refs are set
    const joystickTimeout = setTimeout(() => {
      if (joystickRef.current && isMobile) {
        joystickRef.current.addEventListener('touchstart', handleTouchStart, { passive: false })
      }
    }, 100)
    
    // Add jump button listeners with a small delay to ensure refs are set
    const jumpTimeout = setTimeout(() => {
      if (jumpButtonRef.current && isMobile) {
        jumpButtonRef.current.addEventListener('click', handleJump)
        jumpButtonRef.current.addEventListener('touchstart', handleJump, { passive: false })
      }
    }, 100)

    // Game loop
    const gameLoop = () => {
      if (game.gameOver && !isPlaying) return

      // Clear with light grey background
      ctx.fillStyle = '#d3d3d3'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw platforms
      ctx.fillStyle = '#a0a0a0'
      game.platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
      })

      // Update player
      if (game.keys['ArrowLeft'] || game.keys['a'] || game.keys['A']) {
        game.player.x -= game.player.speed
      }
      if (game.keys['ArrowRight'] || game.keys['d'] || game.keys['D']) {
        game.player.x += game.player.speed
      }

      // Mobile joystick movement
      if (isJoystickActive && joystickPositionRef.current.x !== 0) {
        game.player.x += joystickPositionRef.current.x * 0.15
      }

      // Gravity and jumping
      game.player.velocityY += 0.5
      game.player.y += game.player.velocityY

      // Platform collision
      game.player.onGround = false
      game.platforms.forEach(platform => {
        if (
          game.player.x < platform.x + platform.width &&
          game.player.x + game.player.width > platform.x &&
          game.player.y < platform.y + platform.height &&
          game.player.y + game.player.height > platform.y
        ) {
          if (game.player.velocityY > 0) {
            game.player.y = platform.y - game.player.height
            game.player.velocityY = 0
            game.player.onGround = true
          }
        }
      })

      // Keep player in bounds
      game.player.x = Math.max(0, Math.min(canvas.width - game.player.width, game.player.x))
      game.player.y = Math.max(0, Math.min(canvas.height - game.player.height, game.player.y))

      // Update bullets
      game.bullets = game.bullets.filter(bullet => {
        bullet.x += bullet.vx
        bullet.y += bullet.vy
        return bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height
      })

      // Spawn enemies
      if (Math.random() < 0.02) {
        game.enemies.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 50),
          width: 30,
          height: 30,
          speed: 2 + Math.random() * 2
        })
      }

      // Update enemies
      game.enemies = game.enemies.filter(enemy => {
        enemy.x -= enemy.speed

        // Bullet collision
        for (let i = game.bullets.length - 1; i >= 0; i--) {
          const bullet = game.bullets[i]
          if (
            bullet.x > enemy.x &&
            bullet.x < enemy.x + enemy.width &&
            bullet.y > enemy.y &&
            bullet.y < enemy.y + enemy.height
          ) {
            game.bullets.splice(i, 1)
            game.score++
            return false
          }
        }

        // Player collision
        if (
          game.player.x < enemy.x + enemy.width &&
          game.player.x + game.player.width > enemy.x &&
          game.player.y < enemy.y + enemy.height &&
          game.player.y + game.player.height > enemy.y
        ) {
          game.gameOver = true
          setIsPlaying(false)
        }

        return enemy.x > -50
      })

      // Draw player
      ctx.font = '30px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(game.player.emoji, game.player.x + game.player.width / 2, game.player.y + game.player.height / 2)

      // Draw bullets
      ctx.fillStyle = '#ffff00'
      game.bullets.forEach(bullet => {
        ctx.beginPath()
        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw enemies
      game.enemies.forEach(enemy => {
        // Draw ghost emoji with red outline
        ctx.font = '25px Arial'
        ctx.strokeStyle = '#ff0000'
        ctx.lineWidth = 3
        ctx.strokeText('👻', enemy.x + enemy.width / 2, enemy.y + enemy.height / 2)
        ctx.fillText('👻', enemy.x + enemy.width / 2, enemy.y + enemy.height / 2)
      })

      // Draw score
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 20px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillRect(10, 10, 120, 30)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`Score: ${game.score}`, 20, 15)

      // Draw game over
      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 32px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20)
        ctx.font = '18px Inter, sans-serif'
        ctx.fillText('Click or Tap to Restart', canvas.width / 2, canvas.height / 2 + 20)
      }

      // Throttle FPS
      const fps = mobile ? 30 : 60
      gameRef.current.animationId = setTimeout(() => {
        requestAnimationFrame(gameLoop)
      }, 1000 / fps)
    }

    // Start game automatically
    setIsPlaying(true)
    gameLoop()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchstart', handleCanvasTouch)
      canvas.removeEventListener('touchmove', handleCanvasTouchMove)
      canvas.removeEventListener('touchend', handleCanvasTouchEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      if (joystickRef.current) {
        joystickRef.current.removeEventListener('touchstart', handleTouchStart)
      }
      if (jumpButtonRef.current) {
        jumpButtonRef.current.removeEventListener('click', handleJump)
        jumpButtonRef.current.removeEventListener('touchstart', handleJump)
      }
      if (gameRef.current?.animationId) {
        clearTimeout(gameRef.current.animationId)
      }
      clearTimeout(joystickTimeout)
      clearTimeout(jumpTimeout)
    }
  }, [isPlaying, isMobile, isJoystickActive])

  return (
    <div className="shooter-game-container">
      <canvas
        ref={canvasRef}
        className="shooter-game-canvas"
      />
      {isMobile && (
        <div className="mobile-controls">
          <div className="joystick-container">
            <div
              ref={joystickRef}
              className="joystick-base"
              onTouchStart={(e) => {
                e.stopPropagation()
                handleTouchStart(e)
              }}
            >
              <div
                ref={joystickStickRef}
                className="joystick-stick"
                style={{
                  transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)`
                }}
              />
            </div>
          </div>
          <button
            ref={jumpButtonRef}
            className="jump-button"
            aria-label="Jump"
            onClick={(e) => {
              e.stopPropagation()
              handleJump(e)
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
              handleJump(e)
            }}
            type="button"
          >
            JUMP
          </button>
        </div>
      )}
    </div>
  )
}

export default ShooterGame

