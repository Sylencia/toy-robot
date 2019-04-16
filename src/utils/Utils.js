import _includes from 'lodash/includes'
import _invert from 'lodash/invert'

// Direction Number to String Enum
const directions = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
}

// Modification Enum
const movement = {
  0: { x: 0, y: 1 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: -1 },
  3: { x: -1, y: 0 },
}

const MAX_BOARD_SIZE = 5

const isWithinBounds = (x, y) => {
  return x >= 0 && y >= 0 && x < MAX_BOARD_SIZE && y < MAX_BOARD_SIZE
}

// Form: PLACE X,Y,F
// 1. Original command must have array length of 2 when split
// 2. Position instruction must have array length of 3 when split
// 3. X, Y must be numbers and F must be one of the four directions
// Note: Does not check if it is in bound as it is a syntax check only
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
  const xPosInt = parseInt(xPos)
  const yPosInt = parseInt(yPos)
  // Check [3]
  if (isNaN(xPosInt) || isNaN(yPosInt) || directions[facing] === undefined) {
    return false
  }

  return true
}

// Validate that the syntax of the command is correct
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

// Runs the instructions, validating as the instructions get read.
// Returns an array of output commands from REPORT commands
export const runInstructions = instructions => {
  let hasPlacedRobot = false
  const robotInfo = { x: -1, y: -1, direction: -1 }
  const reports = []

  const splitInstructions = instructions.split('\n')
  for (const instruction of splitInstructions) {
    const [command, payload] = instruction.split(' ')
    // While PLACE has not been called, we skip over commands.
    // If PLACE is called, first validate to make sure it's valid
    if (!hasPlacedRobot) {
      if (command !== 'PLACE' && validateCommand(instruction)) {
        continue
      } else {
        hasPlacedRobot = true
      }
    }

    if (validateCommand(instruction)) {
      switch (command) {
        case 'REPORT': {
          // Get the string based off the direction by inverting the enum
          const direction = _invert(directions)[robotInfo.direction]
          reports.push(`${robotInfo.x},${robotInfo.y},${direction}`)
          break
        }
        // 0-3 represents North to West clockwise.
        // Going left means -1, right means + 1
        // To account for going out of bounds when iterating/decrementing
        // we first add 4 to ensure it's a positive number, then take the modulus to get the final direction
        // This could alternatively be written more explicitly with -1 and 4 being taken into account in LEFT/RIGHT instructions
        case 'LEFT': {
          robotInfo.direction = (robotInfo.direction + 4 - 1) % 4
          break
        }
        case 'RIGHT': {
          robotInfo.direction = (robotInfo.direction + 4 + 1) % 4
          break
        }
        case 'PLACE': {
          const [xPos, yPos, facing] = payload.split(',')
          const xPosInt = parseInt(xPos)
          const yPosInt = parseInt(yPos)
          if (isWithinBounds(xPosInt, yPosInt)) {
            robotInfo.x = xPosInt
            robotInfo.y = yPosInt
            robotInfo.direction = parseInt(directions[facing])
          }

          break
        }
        case 'MOVE': {
          const directionValues = movement[robotInfo.direction]
          const newX = robotInfo.x + directionValues.x
          const newY = robotInfo.y + directionValues.y
          if (isWithinBounds(newX, newY)) {
            robotInfo.x = newX
            robotInfo.y = newY
          }
          break
        }
        default:
          break
      }
    }
  }

  return reports
}
