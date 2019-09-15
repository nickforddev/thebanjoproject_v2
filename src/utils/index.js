export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const permalinks = {
  peoples: 'players',
  narratives: 'narratives',
  timelines: 'timelines',
  maps: 'maps',
  videos: 'videos',
  audio: 'audio',
  texts: 'text',
  page: {
    name: 'pages',
    slug: ''
  }
}

export function convertPermalinks(type, target = 'name') {
  const model = permalinks[type]
  const data = {
    name: model.name === undefined ? model : model.name,
    slug: model.slug === undefined ? model : model.slug
  }
  if (data.slug) {
    data.slug = '/' + data.slug
  }
  return data[target]
}

export function debounce(fn, time) {
  console.log(fn, time)
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
