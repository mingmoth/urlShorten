function pick(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function shrinkUrl() {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const Upper = lower.toUpperCase()
  const num = '0123456789'
  const collection = lower + Upper + num
  let short_url = ''

  for (let i = 0; i < 6; i++) {
    short_url = short_url.concat(pick(collection))
  }
  return short_url
}

module.exports = shrinkUrl