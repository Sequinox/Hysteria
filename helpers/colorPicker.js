module.exports = {
  randomColor () {
    var values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    var hexCode = '#'
    for (var i = 0; i < 6; i++) {
      hexCode += values[Math.floor(Math.random() * 16)]
    }
    return hexCode
  }
}
