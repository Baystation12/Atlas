export const name = 'Sol'
export const angle = 0
export const range = 0
export const factions = ['SCA', 'First Colonies']
export const routes = ['Alpha Centauri', 'Tau Ceti', 'Sirius']
export const bodies = {}

const sol = (bodies['Sol'] = {
  type: 'star',
  angle: 0,
  range: 0
}).bodies = {}

sol['Mercury'] = {
  type: 'planet',
  range: 0.39,
  color: '#ca3'
}

sol['Venus'] = {
  type: 'planet',
  range: 0.72,
  color: "#ef9"
}

const earth = (sol['Earth'] = {
  type: 'planet',
  range: 1,
  color: "#88c"
}).bodies = {}

earth['Luna'] = {
  type: 'moon'
}

const mars = (sol['Mars'] = {
  type: 'planet',
  range: 1.52,
  color: "#a61",
  bodies: {}
}).bodies = {}

mars['Phobos'] = {
  type: 'moon'
}

mars['Deimos'] = {
  type: 'moon'
}

sol['Ceres'] = {
  type: 'object',
  range: 2.77,
  color: "#a98"
}

const jupiter = (sol['Jupiter'] = {
  type: 'planet',
  range: 5.2,
  color: "#ba4"
}).bodies = {}

jupiter['Io'] = {
  type: 'moon'
}

jupiter['Europa'] = {
  type: 'moon'
}

jupiter['Ganymede'] = {
  type: 'moon'
}

jupiter['Callisto'] = {
  type: 'moon'
}

const saturn = (sol['Saturn'] = {
  type: 'planet',
  range: 9.5,
  color: "#ab2"
}).bodies = {}

saturn['Enceladus'] = {
  type: 'moon'
}

saturn['Tethys'] = {
  type: 'moon'
}

saturn['Dione'] = {
  type: 'moon'
}

saturn['Rhea'] = {
  type: 'moon'
}

saturn['Titan'] = {
  type: 'moon'
}

saturn['Iapetus'] = {
  type: 'moon'
}

const uranus = (sol['Uranus'] = {
  type: 'planet',
  range: 19.2,
  color: "#abf"
}).bodies = {}

uranus['Ariel'] = {
  type: 'moon'
}

uranus['Umbriel'] = {
  type: 'moon'
}

uranus['Titania'] = {
  type: 'moon'
}

uranus['Oberon'] = {
  type: 'moon'
}

const neptune = (sol['Neptune'] = {
  type: 'planet',
  range: 30.1,
  color: "#88a"
}).bodies = {}

neptune['Triton'] = {
  type: 'moon'
}

sol['Pluto'] = {
  type: 'planet',
  range: 39.5,
  color: "#ffd"
}
