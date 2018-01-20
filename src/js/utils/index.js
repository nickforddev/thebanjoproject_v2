import config from '@/config'

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function convertPermalinks (type) {
  return config.permalinks[type]
}
