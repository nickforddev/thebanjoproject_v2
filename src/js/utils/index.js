export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const permalinks = {
  peoples: 'players',
  narratives: 'narratives',
  timelines: 'timelines',
  maps: 'maps',
  videos: 'videos',
  audio: 'audio'
}

export function convertPermalinks (type) {
  return permalinks[type]
}
