import { validateCommand } from './Utils'

describe('validateCommand', () => {
  it('returns true on valid commands', () => {
    expect(validateCommand('MOVE')).toEqual(true)
    expect(validateCommand('LEFT')).toEqual(true)
    expect(validateCommand('RIGHT')).toEqual(true)
    expect(validateCommand('REPORT')).toEqual(true)
    expect(validateCommand('PLACE 1,2,EAST')).toEqual(true)
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
