This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation and running

In the project directory, you can run:

### `yarn install`

Run this to get the packages installed. Must be run first.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner.
The tests verify the instruction validates correctly and that the actual instruction runner behaves as expected

## Assumptions made for this project

- All commands must be made in uppercase. The verifier checks for uppercase without doing any transformations itself.
- PLACE commands beyond the first one will still place the robot in the (x, y) position and facing the specified direction like the first command.
- REPORT command is listed in the same way as the document had specified: x,y,f

## Potential Improvements

- Split Input/Output into their own components. As the size of the project was small enough to accomodate both, this felt unnecessary. However, if another component such as a visual runner were to be added, it would be split out.
- Runner report. Modify the runInstructions() method to also return whether each command ran, and if not - why it didn't run. The information would then be shown between the Input/Outputs.
- Visual Runner. This was specified to be unnecessary for this project, but would be a nice to have given extra time.

## Extra test done (manual)

```
REPORT
PLACE 0,0,NORTH
RIGHT
REPORT
MOVE
MOVE
LEFT
MOVE
REPORT
LEFT
LEFT
MOVE
PLACE 5,4,NORTH
MOVE
REPORT
PLACE 4,4,WEST
REPORT
```

Expected Output:

```
0,0,EAST
2,1,NORTH
2,0,SOUTH
4,4,WEST
```
