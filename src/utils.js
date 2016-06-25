export const mapObject = (obj, funct) => (
  Object.keys(obj).reduce((previous, key, index) => {
    previous[key] = funct(obj[key], key, index)
    return previous
  }, {})
)
