/* eslint-disable no-param-reassign */

'use client'

import React, { memo, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { gsap } from 'gsap'

interface Point {
  x: number
  y: number
  originX: number
  originY: number
  active: number
  circle: Circle
  closest?: Point[]
}

interface Circle {
  pos: Point
  radius: number
  color: string
  active: number
  draw: (context: CanvasRenderingContext2D) => void
}

function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let width: number
    let height: number
    let largeHeader: HTMLDivElement
    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D | null
    let points: Point[]
    let target: Point
    let animateHeader = true

    const getDistance = (p1: Point, p2: Point): number => (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2

    const createCircle = (pos: Point, rad: number, color: string): Circle => ({
      pos,
      radius: rad,
      color,
      active: 0,
      draw: (context: CanvasRenderingContext2D) => {
        if (!context) return
        context.beginPath()
        context.arc(pos.x, pos.y, rad, 0, 2 * Math.PI, false)
        context.fillStyle = `rgba(156,217,249,${pos.active})`
        context.fill()
      },
    })

    const drawLines = (p: Point) => {
      if (!p.active || !ctx) return
      p.closest?.forEach((closest) => {
        if (!ctx) return

        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(closest.x, closest.y)
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`
        ctx.stroke()
      })
    }

    const shiftPoint = (p: Point) => {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: 'circ.easeInOut',
        onComplete: () => shiftPoint(p),
      })
    }

    const moveTarget = () => {
      const newX = Math.random() * width
      const newY = Math.random() * height
      const distance = Math.sqrt((newX - target.x) ** 2 + (newY - target.y) ** 2)
      const duration = distance / 150 // Adjust this number to change speed

      gsap.to(target, {
        x: newX,
        y: newY,
        duration,
        ease: 'none',
        onComplete: moveTarget,
      })
    }

    const animate = () => {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height)
        points.forEach((p) => {
          if (!ctx) return

          const distance = Math.abs(getDistance(target, p))
          if (distance < 4000) {
            p.active = 0.3
            p.circle.active = 0.6
          } else if (distance < 20000) {
            p.active = 0.1
            p.circle.active = 0.3
          } else if (distance < 40000) {
            p.active = 0.02
            p.circle.active = 0.1
          } else {
            p.active = 0
            p.circle.active = 0
          }
          drawLines(p)
          p.circle.draw(ctx)
        })
      }
      requestAnimationFrame(animate)
    }

    const initAnimation = () => {
      animate()
      points.forEach(shiftPoint)
      moveTarget() // Start the target movement
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      largeHeader.style.height = `${height}px`
      canvas.width = width
      canvas.height = height
    }

    const scrollCheck = () => {
      animateHeader = document.body.scrollTop <= height
    }

    const addListeners = () => {
      window.addEventListener('scroll', scrollCheck)
      window.addEventListener('resize', resize)
    }

    const initHeader = () => {
      width = window.innerWidth
      height = window.innerHeight
      target = {
        x: width / 2,
        y: height / 2,
        originX: width / 2,
        originY: height / 2,
        active: 1,
        circle: createCircle(
          {
            x: width / 2,
            y: height / 2,
            originX: width / 2,
            originY: height / 2,
            active: 1,
          } as Point,
          4,
          'rgba(255,255,255,0.3)',
        ),
      }

      largeHeader = headerRef.current!
      largeHeader.style.height = `${height}px`

      canvas = canvasRef.current!
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')

      points = []
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          const px = x + (Math.random() * width) / 20
          const py = y + (Math.random() * height) / 20
          const p: Point = {
            x: px,
            y: py,
            originX: px,
            originY: py,
            active: 0,
            circle: createCircle(
              { x: px, y: py, originX: px, originY: py, active: 0 } as Point,
              2 + Math.random() * 2,
              'rgba(255,255,255,0.3)',
            ),
          }
          points.push(p)
        }
      }

      points.forEach((p1) => {
        const closest: Point[] = []
        points.forEach((p2) => {
          if (p1 !== p2) {
            let placed = false
            for (let k = 0; k < 5; k += 1) {
              if (!placed && !closest[k]) {
                closest[k] = p2
                placed = true
              }
            }
            for (let k = 0; k < 5; k += 1) {
              if (!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2
                placed = true
              }
            }
          }
        })
        p1.closest = closest
      })
    }

    const init = () => {
      initHeader()
      initAnimation()
      addListeners()
    }

    init()

    return () => {
      window.removeEventListener('scroll', scrollCheck)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="absolute left-0 top-0 z-[-10] grid grid-cols-1 overflow-hidden">
      <div id="large-header" ref={headerRef} style={{ height: '100vh', width: '100%' }}>
        <canvas id="demo-canvas" ref={canvasRef} />
      </div>
    </div>
  )
}

export default memo(Background, isEqual)
