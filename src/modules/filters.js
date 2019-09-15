export default {
  limit(value = '', length = 20) {
    let output = value
    if (value.length > length) {
      output = value.substring(0, length)
    }
    while (output[output.length - 1] === ' ') {
      output = output.substring(0, output.length - 1)
    }
    if (output !== value) {
      output = `${output}...`
    }
    return output
  }
}
