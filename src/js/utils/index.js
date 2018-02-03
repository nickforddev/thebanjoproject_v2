export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const permalinks = {
  peoples: 'players',
  narratives: 'narratives',
  timelines: 'timelines',
  maps: 'maps',
  videos: 'videos',
  audio: 'audio',
  texts: 'text',
  page: 'pages'
}

export function convertPermalinks (type) {
  return permalinks[type]
}
