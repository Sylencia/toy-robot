import _includes from 'lodash/includes'

// Direction Enum
const directions = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
}

// Form: PLACE X,Y,F
// 1. Original command must have array length of 2 when split
// 2. Position instruction must have array length of 3 when split
// 3. X, Y must be numbers and F must be one of the four directions
const validatePlaceCommand = command => {
  const splitCommand = command.split(' ')

  // Check [1]
  if (splitCommand.length !== 2) {
    return false
  }

  const [, position] = splitCommand
  const splitPosition = position.split(',')
  // Check [2]
  if (splitPosition.length !== 3) {
    return false
  }

  const [xPos, yPos, facing] = splitPosition
  // Check [3]
  if (
    isNaN(parseInt(xPos)) ||
    isNaN(parseInt(yPos)) ||
    directions[facing] === undefined
  ) {
    return false
  }

  return true
}

export const validateCommand = instruction => {
  // Check based off the first word which is the command word
  const command = instruction.split(' ')[0]
  if (command === 'PLACE') {
    return validatePlaceCommand(instruction)
  } else {
    // We check via instruction as opposed to command to catch stray characters
    return _includes(['REPORT', 'MOVE', 'LEFT', 'RIGHT'], instruction)
  }
}
