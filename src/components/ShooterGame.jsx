import { useEffect, useRef, useState } from 'react'
import './ShooterGame.css'

const ShooterGame = () => {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const leftButtonRef = useRef(null)
  const rightButtonRef = useRef(null)
  const jumpButtonRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMovingLeft, setIsMovingLeft] = useState(false)
  const [isMovingRight, setIsMovingRight] = useState(false)

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
        jumpPower: 14,
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
      // Allow jump if on ground or very close to ground (small buffer for better feel)
      if ((e.key === ' ' || e.key === 'ArrowUp') && (game.player.onGround || game.player.velocityY <= 1)) {
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

    // Mobile button handlers
    const handleLeftPress = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      setIsMovingLeft(true)
    }

    const handleLeftRelease = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      setIsMovingLeft(false)
    }

    const handleRightPress = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      setIsMovingRight(true)
    }

    const handleRightRelease = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      setIsMovingRight(false)
    }

    const handleJump = (e) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      // Allow jump if on ground or very close to ground (small buffer for better feel)
      if (game.player.onGround || game.player.velocityY <= 1) {
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

      // Don't shoot if touching movement buttons or jump button area
      const leftRect = leftButtonRef.current?.getBoundingClientRect()
      const rightRect = rightButtonRef.current?.getBoundingClientRect()
      const jumpRect = jumpButtonRef.current?.getBoundingClientRect()
      if (leftRect && touch.clientX >= leftRect.left && touch.clientX <= leftRect.right &&
          touch.clientY >= leftRect.top && touch.clientY <= leftRect.bottom) {
        return
      }
      if (rightRect && touch.clientX >= rightRect.left && touch.clientX <= rightRect.right &&
          touch.clientY >= rightRect.top && touch.clientY <= rightRect.bottom) {
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
    
    // Add mobile button listeners with a small delay to ensure refs are set
    const buttonTimeout = setTimeout(() => {
      if (isMobile) {
        if (leftButtonRef.current) {
          leftButtonRef.current.addEventListener('touchstart', handleLeftPress, { passive: false })
          leftButtonRef.current.addEventListener('touchend', handleLeftRelease, { passive: false })
          leftButtonRef.current.addEventListener('touchcancel', handleLeftRelease, { passive: false })
        }
        if (rightButtonRef.current) {
          rightButtonRef.current.addEventListener('touchstart', handleRightPress, { passive: false })
          rightButtonRef.current.addEventListener('touchend', handleRightRelease, { passive: false })
          rightButtonRef.current.addEventListener('touchcancel', handleRightRelease, { passive: false })
        }
        if (jumpButtonRef.current) {
          jumpButtonRef.current.addEventListener('click', handleJump)
          jumpButtonRef.current.addEventListener('touchstart', handleJump, { passive: false })
        }
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

      // Mobile button movement
      if (isMovingLeft) {
        game.player.x -= game.player.speed
      }
      if (isMovingRight) {
        game.player.x += game.player.speed
      }

      // Gravity and jumping - balanced gravity
      game.player.velocityY += 0.6
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

      // Keep player in bounds horizontally
      game.player.x = Math.max(0, Math.min(canvas.width - game.player.width, game.player.x))
      
      // Check if player fell off the screen - death by falling
      if (game.player.y > canvas.height) {
        game.gameOver = true
        setIsPlaying(false)
      }
      
      // Keep player from going above screen
      if (game.player.y < 0) {
        game.player.y = 0
        game.player.velocityY = 0
      }

      // Update bullets
      game.bullets = game.bullets.filter(bullet => {
        bullet.x += bullet.vx
        bullet.y += bullet.vy
        return bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height
      })

      // Spawn enemies - reduced spawn rate for better performance
      if (Math.random() < 0.015) {
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

        // Player collision - improved detection with better bounds checking
        const playerCenterX = game.player.x + game.player.width / 2
        const playerCenterY = game.player.y + game.player.height / 2
        const enemyCenterX = enemy.x + enemy.width / 2
        const enemyCenterY = enemy.y + enemy.height / 2
        
        const distanceX = Math.abs(playerCenterX - enemyCenterX)
        const distanceY = Math.abs(playerCenterY - enemyCenterY)
        const collisionDistance = (game.player.width + enemy.width) / 2 - 5 // Slightly smaller for better feel
        
        if (distanceX < collisionDistance && distanceY < collisionDistance) {
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

      // Use requestAnimationFrame directly for smoother performance
      // No throttling needed - browser handles frame rate optimization
      gameRef.current.animationId = requestAnimationFrame(gameLoop)
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
      if (leftButtonRef.current) {
        leftButtonRef.current.removeEventListener('touchstart', handleLeftPress)
        leftButtonRef.current.removeEventListener('touchend', handleLeftRelease)
        leftButtonRef.current.removeEventListener('touchcancel', handleLeftRelease)
      }
      if (rightButtonRef.current) {
        rightButtonRef.current.removeEventListener('touchstart', handleRightPress)
        rightButtonRef.current.removeEventListener('touchend', handleRightRelease)
        rightButtonRef.current.removeEventListener('touchcancel', handleRightRelease)
      }
      if (jumpButtonRef.current) {
        jumpButtonRef.current.removeEventListener('click', handleJump)
        jumpButtonRef.current.removeEventListener('touchstart', handleJump)
      }
      if (gameRef.current?.animationId) {
        cancelAnimationFrame(gameRef.current.animationId)
      }
      if (buttonTimeout) clearTimeout(buttonTimeout)
    }
  }, [isPlaying, isMobile, isMovingLeft, isMovingRight])

  return (
    <div className="shooter-game-container">
      <canvas
        ref={canvasRef}
        className="shooter-game-canvas"
      />
      {isMobile && (
        <div className="mobile-controls">
          <div className="movement-buttons">
            <button
              ref={leftButtonRef}
              className="move-button move-left"
              aria-label="Move Left"
              onTouchStart={(e) => {
                e.stopPropagation()
                handleLeftPress(e)
              }}
              onTouchEnd={(e) => {
                e.stopPropagation()
                handleLeftRelease(e)
              }}
              onTouchCancel={(e) => {
                e.stopPropagation()
                handleLeftRelease(e)
              }}
              type="button"
            >
              ←
            </button>
            <button
              ref={rightButtonRef}
              className="move-button move-right"
              aria-label="Move Right"
              onTouchStart={(e) => {
                e.stopPropagation()
                handleRightPress(e)
              }}
              onTouchEnd={(e) => {
                e.stopPropagation()
                handleRightRelease(e)
              }}
              onTouchCancel={(e) => {
                e.stopPropagation()
                handleRightRelease(e)
              }}
              type="button"
            >
              →
            </button>
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

