import { validateCommand, runInstructions } from './Utils'

describe('validateCommand', () => {
  it('returns true on valid commands', () => {
    expect(validateCommand('MOVE')).toEqual(true)
    expect(validateCommand('LEFT')).toEqual(true)
    expect(validateCommand('RIGHT')).toEqual(true)
    expect(validateCommand('REPORT')).toEqual(true)
    expect(validateCommand('PLACE 1,2,EAST')).toEqual(true)
    // Only syntax checks, thus any number should pass
    expect(validateCommand('PLACE 100,-100,NORTH')).toEqual(true)
  })

  it('returns false on invalid commands', () => {
    expect(validateCommand('')).toEqual(false)
    expect(validateCommand('move')).toEqual(false)
    expect(validateCommand('Left')).toEqual(false)
    expect(validateCommand('RIGHT LEFT')).toEqual(false)
    expect(validateCommand('RIGHT ')).toEqual(false)
    expect(validateCommand('PLACE')).toEqual(false)
    expect(validateCommand('PLACE X,2,EAST')).toEqual(false)
    expect(validateCommand('PLACE 1,X,EAST')).toEqual(false)
    expect(validateCommand('PLACE 1,2,TEST')).toEqual(false)
  })
})

describe('runInstructions', () => {
  // since PLACE must be printed before anything happens, this must be tested first.
  // To get an output for the test, we must also REPORT. Thus, we test both PRINT and REPORT at the same time.
  it('runs the PLACE/REPORT command correctly', () => {
    const basicCommand = `PLACE 1,2,NORTH\nREPORT`
    expect(runInstructions(basicCommand)).toEqual(['1,2,NORTH'])
    const invalidPlaceCommand = `PLACE 1,2,NORTH\nPLACE 8,5,EAST\nREPORT`
    expect(runInstructions(invalidPlaceCommand)).toEqual(['1,2,NORTH'])
    const multiplePlaceCommand = `PLACE 1,2,NORTH\nPLACE 4,3,WEST\nREPORT`
    expect(runInstructions(multiplePlaceCommand)).toEqual(['4,3,WEST'])
    const noPlaceCommand = `REPORT`
    expect(runInstructions(noPlaceCommand)).toEqual([])
  })

  // All further tests assume the REPORT command works correctly from the previous tests
  it('runs the MOVE command correctly', () => {
    const northMove = `PLACE 0,0,NORTH\nMOVE\nREPORT`
    expect(runInstructions(northMove)).toEqual(['0,1,NORTH'])
    const eastMove = `PLACE 0,0,EAST\nMOVE\nREPORT`
    expect(runInstructions(eastMove)).toEqual(['1,0,EAST'])
    const southMove = `PLACE 2,2,SOUTH\nMOVE\nREPORT`
    expect(runInstructions(southMove)).toEqual(['2,1,SOUTH'])
    const westMove = `PLACE 2,2,WEST\nMOVE\nREPORT`
    expect(runInstructions(westMove)).toEqual(['1,2,WEST'])

    const multipleMoves = `PLACE 0,0,NORTH\nMOVE\nREPORT\nMOVE\nREPORT`
    expect(runInstructions(multipleMoves)).toEqual(['0,1,NORTH', '0,2,NORTH'])

    const invalidNorth = `PLACE 2,4,NORTH\nMOVE\nREPORT`
    expect(runInstructions(invalidNorth)).toEqual(['2,4,NORTH'])
    const invalidEast = `PLACE 4,2,EAST\nMOVE\nREPORT`
    expect(runInstructions(invalidEast)).toEqual(['4,2,EAST'])
    const invalidSouth = `PLACE 2,0,SOUTH\nMOVE\nREPORT`
    expect(runInstructions(invalidSouth)).toEqual(['2,0,SOUTH'])
    const invalidWest = `PLACE 0,2,WEST\nMOVE\nREPORT`
    expect(runInstructions(invalidWest)).toEqual(['0,2,WEST'])

    const noPlace = `MOVE\nREPORT`
    expect(runInstructions(noPlace)).toEqual([])
  })

  // Testing the LEFT/RIGHT command 4 times covers all valid cases for it
  it('runs the LEFT command correctly', () => {
    const validCommand = `PLACE 0,0,NORTH\nLEFT\nREPORT\nLEFT\nREPORT\nLEFT\nREPORT\nLEFT\nREPORT`
    expect(runInstructions(validCommand)).toEqual([
      '0,0,WEST',
      '0,0,SOUTH',
      '0,0,EAST',
      '0,0,NORTH',
    ])

    const noPlace = `LEFT\nREPORT`
    expect(runInstructions(noPlace)).toEqual([])
  })

  it('runs the RIGHT command correctly', () => {
    const validCommand = `PLACE 0,0,NORTH\nRIGHT\nREPORT\nRIGHT\nREPORT\nRIGHT\nREPORT\nRIGHT\nREPORT`
    expect(runInstructions(validCommand)).toEqual([
      '0,0,EAST',
      '0,0,SOUTH',
      '0,0,WEST',
      '0,0,NORTH',
    ])

    const noPlace = `RIGHT\nREPORT`
    expect(runInstructions(noPlace)).toEqual([])
  })
})
