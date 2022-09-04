const TWO_PI = Math.PI * 2

const detail = document.getElementById('detail')
const canvas = document.getElementById('viewer')
const ctx = canvas.getContext('2d')

let mouseX
let mouseY
let mousePX
let mousePY

canvas.addEventListener('mousemove', event => {
  mousePX = (mouseX = event.clientX) / canvas.clientWidth
  mousePY = (mouseY = event.clientY) / canvas.clientHeight
})



document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowLeft': case 'a': {
      camera.x -= SPEED * lerp(0, 7, camera.scale < 7 ? camera.scale / 7 : 0.1 + (12 - camera.scale) / 4.9)
      break
    }
    case 'ArrowUp': case 'w': {
      camera.y -= SPEED * lerp(0, 7, camera.scale < 7 ? camera.scale / 7 : 0.1 + (12 - camera.scale) / 4.9)
      break
    }
    case 'ArrowRight': case 'd': {
      camera.x += SPEED * lerp(0, 7, camera.scale < 7 ? camera.scale / 7 : 0.1 + (12 - camera.scale) / 4.9)
      break
    }
    case 'ArrowDown': case 's': {
      camera.y += SPEED * lerp(0, 7, camera.scale < 7 ? camera.scale / 7 : 0.1 +(12 - camera.scale) / 4.9)
      break
    }
  }
  window.location.hash = `${camera.x},${camera.y},${camera.scale}`
})

const lerp = (a, b, t) => a + (b - a) * t

const SCALE = 50
const SPEED = 20
const MIN_ZOOM = 0.3
const MAX_ZOOM = 12

document.addEventListener('wheel', event => {
  camera.scale -= 0.02 * (event.deltaY > 0 ? 1 : -1) * lerp(1, 8, camera.scale < 7 ? camera.scale / 7 : (12 - camera.scale) / 5)
  camera.scale = camera.scale > MAX_ZOOM ? MAX_ZOOM : camera.scale < MIN_ZOOM ? MIN_ZOOM : camera.scale
  window.location.hash = `${camera.x},${camera.y},${camera.scale}`
})

const drawSystem = function (x, y, color, name, scale) {
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.beginPath()
  let smol = scale * Math.floor(Math.max((topX > topY ? topY : topX) * 0.01, 5))
  ctx.ellipse(x, y, smol, smol, 0, 0, TWO_PI)
  ctx.fill()
  if (scale > 0.4) {
    ctx.stroke()
    ctx.font = '0.6rem Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(name, x, y - smol - 1)
  }
  //else

}

const drawBodies = function (x, y, bodies, scale) {
  bodies.forEach(body => {
    ctx.strokeStyle = body.color
    ctx.fillStyle = body.color
    let bs = (5 - (MAX_ZOOM - scale)) / 5
    let bx = x + body.x() * bs
    let by = y + body.y() * bs
    ctx.font = '0.6rem Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(body.name, x, y - body.orbit() * bs)
    ctx.beginPath()
    ctx.ellipse(bx, by, bs * body.size, bs * body.size, 0, 0, TWO_PI)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(x, y, bs * body.orbit(), bs * body.orbit(), 0, 0, TWO_PI)
    ctx.stroke()
    if (body.bodies.length > 0) {
      drawBodies(bx, by, body.bodies, scale)
    }
  })
}

let topX
let topY
let oX
let oY
let oS
const frame = () => {
detail.innerText = `${mouseX} (${Math.floor(mousePX*100)}), ${mouseY} (${Math.floor(mousePY*100)})`
  requestAnimationFrame(frame)
  if (oX === camera.x && oY === camera.Y && oS === camera.scale) {
    return
  }
  oX = camera.x
  oY = camera.y
  oS = camera.scale
  let { clientWidth, clientHeight } = canvas
  topX = clientWidth
  topY = clientHeight
  topY != canvas.height && (canvas.height = topY)
  topX != canvas.width && (canvas.width = topX)
  let midX = topX / 2
  let midY = topY / 2
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, topX, topY)

  galaxy.forEach(system => {
    let dx = system.x() - camera.x
    let ax = Math.abs(dx)
    if (ax > midX && (camera.scale < 7 || ax > topX)) {
      return
    }
    let dy = system.y() - camera.y
    let ay = Math.abs(dy)
    if (ay > midY && (camera.scale < 7 || ay > topY)) {
      return
    }
    if (camera.scale > 7) {
      drawBodies(midX + dx, midY + dy, system.bodies, camera.scale, system.size)
    }
    else {
      drawSystem(midX + dx, midY + dy, system.color, system.name, camera.scale)
    }
  })
}

const [iniX = 0, iniY = 0, iniScale = 1] = window.location.hash.substr(1).split(',').filter(v => v)
const camera = { scale: parseFloat(iniScale) || 1, x: parseFloat(iniX) || 0, y: parseFloat(iniY) || 0, z: 1 }

const System = (name = 'system', radius = 0 /* pc */, angle = 0 /* rad */, color = COLOR_STAR_YELLOW, bodies = []) => ({
  name: name,
  bodies: bodies,
  color: color,
  radius: radius,
  x: () => camera.scale * SCALE * radius * Math.cos(Math.PI * angle),
  y: () => camera.scale * SCALE * radius * Math.sin(Math.PI * angle),
})

const Body = (name = 'body', radius = 0, angle = 0, color = COLOR_MOON_GREY, size = 1, bodies = []) => ({
  name: name,
  bodies: bodies,
  size: size,
  color: color,
  radius: radius,
  orbit: () => SCALE * radius,
  x: () => SCALE * radius * Math.cos(Math.PI * angle),
  y: () => SCALE * radius * Math.sin(Math.PI * angle),
})

// The following is temporary data, to be replaced with the data/ dir.

const COLOR_SCA = '#0af'
const COLOR_GC = '#f03'
const COLOR_CSL = '#092'
const COLOR_FS = '#993'
const COLOR_IS = '#929'
const COLOR_UC = '#040'
const COLOR_VOX = '#4f4'
const COLOR_SKRELL = '#eb7'
const COLOR_ASCENT = '#f0f'

const COLOR_STAR_YELLOW = '#ffa'
const COLOR_DUST_ORANGE = '#ca3'
const COLOR_MOON_GREY = '#888'
const COLOR_OCEAN_BLUE = '#77a'
const COLOR_BONE_WHITE = '#ffd'

const galaxy = [
  System('Sol', 0, 0, COLOR_SCA, [
    Body('Sol', 0, 0, COLOR_STAR_YELLOW, 5, [
      Body('Mercury', 0.39, 0, COLOR_DUST_ORANGE, 3),
      Body('Venus', 0.72, 0.2, COLOR_DUST_ORANGE, 4),
      Body('Earth', 1, 0.4, COLOR_OCEAN_BLUE, 4),
      Body('Mars', 1.52, 0.6, COLOR_DUST_ORANGE, 4),
      Body('Ceres', 2.77, 0.8, COLOR_MOON_GREY, 1),
      Body('Jupiter', 5.2, 1, COLOR_DUST_ORANGE, 40),
      Body('Saturn', 9.5, 1.2, COLOR_DUST_ORANGE, 30),
      Body('Uranus', 19.2, 1.4, COLOR_MOON_GREY, 3),
      Body('Neptune', 30.1, 1.6, COLOR_MOON_GREY, 2),
      Body('Pluto', 39.5, 1.8, COLOR_BONE_WHITE, 1),
    ])
  ]),

  System('Alpha Centauri', 1.34, 1.65, COLOR_SCA),
  System('Tau Ceti', 3.65, 0.87, COLOR_SCA),
  System('Nueva Castilla', 3.41, 0.6, COLOR_SCA),
  System('Helios', 6.16, 1.65, COLOR_SCA),
  System('Victor\'s Star', 9.8, 1.76, COLOR_SCA),
  System('XX-168', 9.1, 1.6, COLOR_SCA),
  System('Theia', 7.1, 0.99, COLOR_SCA),
  System('Kruger', 4.1, 0.23, COLOR_SCA),
  System('Groombridge', 5.8, 0.86, COLOR_SCA),
  System('Lordania', 11.73, 1.22, COLOR_SCA),
  System('Lucinaer', 12.82, 1.2, COLOR_SCA),
  System('Yuklid', 11.8, 1.19, COLOR_SCA),
  System('Gessshire', 10.12, 1.2, COLOR_SCA),
  System('Gavil', 13.7, 1.22, COLOR_SCA),
  System('Delta Pavonis', 6.43, 1.23, COLOR_SCA),
  System('Sirius', 2.64, 1.18, COLOR_SCA),
  System('Alexander', 11.2, 1.4, COLOR_SCA),
  System('Trajan', 13.31, 1.39, COLOR_SCA),
  System('Grace', 9.6, 1.41, COLOR_SCA),
  System('Sinclair\'s Star', 14.5, 1.59, COLOR_SCA),

  System('Altair', 9.43, 0.2, COLOR_GC),
  System('Gilgamesh', 12.43, 0.07, COLOR_GC),
  System('Sestris', 12.93, 0.1, COLOR_GC),
  System('Bratis', 12.73, 0.12, COLOR_GC),
  System('Providence', 9.73, 1.96, COLOR_GC),
  System('Gagarin', 11.1, 0.01, COLOR_GC),
  System('Valy', 10.13, 1.85, COLOR_GC),
  System('Kvasvezda', 9.02, 1.89, COLOR_GC),
  System('Vega', 13.41, 0.27, COLOR_GC),
  System('Kopeychik', 14.1, 0.22, COLOR_GC),
  System('Antarova', 12.0, 0.27, COLOR_GC),
  System('Zeta Tucanae', 16.7, 1.75, COLOR_FS),
  System('Evergreen', 13.8, 1.74, COLOR_FS),
  System('Renenet', 14.8, 1.79, COLOR_FS),
  System('Novoslavia', 13.2, 1.83, COLOR_FS),
  System('Avalon', 12.7, 1.76, COLOR_FS),
  System('Rose', 11.9, 1.67, COLOR_FS),
  System('Galilei', 8.43, 0.1, COLOR_IS),
  System('Nyx', 8.9, 0.78, COLOR_IS),
  System('Ursa', 13.1, 1.89, COLOR_IS),
  System('Mirania', 6.2, 0.73, COLOR_IS),
  System('Barstow', 17.1, 0.16, COLOR_IS),
  System('Wythe', 7.1, 0.35, COLOR_IS),
  System('Cassandra', 5.1, 0.5, COLOR_IS),
  System('Moghes', 6.1, 1.36, COLOR_UC),
  System('Calvin\'s Maelstrom', 7.2, 0.6, COLOR_SCA),
  System('Pandora', 9.6, 0.56, COLOR_SCA),

  System('Nouveau Lyon', 10.12, 1.23, COLOR_CSL),
  System('Tyannani', 10.6, 1.245, COLOR_CSL),
  System('Denebola', 10.3, 1.28, COLOR_CSL),
  System('Visser', 11.3, 1.26, COLOR_CSL),
  System('Chardan', 12, 1.275, COLOR_CSL),

  System('Kraken', 19.6, 1.44, COLOR_ASCENT),
  System('Basilisk', 18.2, 1.38, COLOR_ASCENT),
  System('Banshee', 20.2, 1.31, COLOR_ASCENT),

  System('Charybdis', 11.8, 0.64, COLOR_VOX),
  System('Hydra', 13.7, 0.51, COLOR_VOX),
  System('Manticore', 14.2, 0.73, COLOR_VOX),
  System('Medusa', 17.2, 0.33, COLOR_VOX),
  System('Typhon', 11.2, 0.37, COLOR_VOX),

  System('Kel\'Xi', 19.5, 1.61, COLOR_SKRELL),
  System('Harr\'Kelm', 18.5, 1.68, COLOR_SKRELL),
  System('Garr\'Qol', 21.2, 1.75, COLOR_SKRELL),
  System('Go\'Kal', 23.2, 1.83, COLOR_SKRELL),
  System('Qrri\'Vol', 24.7, 1.87, COLOR_SKRELL),
  System('Qarr\'Go\'I', 27, 1.92, COLOR_SKRELL),
  System('Born Between Endless Lights', 35, 1.7, COLOR_UC),
]

frame()
