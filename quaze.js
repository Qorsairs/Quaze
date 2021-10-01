let config = {
  type: Phaser.AUTO,
  width: 730,
  height: 600,
  backgroundColor: '#ADD8E6',
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);

function preload ()
{
  this.load.image('xgate', 'assets/xgate.png');
  this.load.image('zgate', 'assets/zgate.png');
  this.load.image('hgate', 'assets/hgate.png');
  this.load.image('wallh', 'assets/wallh.png');
  this.load.image('wallv', 'assets/wallv.png');
  this.load.image('qbitup', 'assets/qbitup.png');
  this.load.image('solutionleft', 'assets/solutionleft.png');
  this.load.image('goal', 'assets/goal.png');
}

let baseXCoordinate = 160;
let xSpacing = 100; //will be image width of a gate (i.e. grid column)
let baseYCoordinate = 100; 
let ySpacing = 100; //will be image height of a gate (i.e. grid row)
function xCoordinateGrid(columnNumber){ 
  return baseXCoordinate + xSpacing * columnNumber
}
function yCoordianteGrid(rowNumber){ 
  return baseYCoordinate + ySpacing * rowNumber
}

let h = 'hgate'
let x = 'xgate'
let z = 'zgate'
let gatesGrid = [[h, x, z, h, x], [z, h, x, x, h], [h, z, h, x, z], [z, x, z, h, h], [x, h, x, z, h]] //each subarray represents a row starting from the top of the grid

let T = true
let F = false
let horizontalWalls = [[T, T, T, T, T], [F, T, F, T, F], [F, F, T, T, F], [F, F, F, F, F], [F, F, T, T, T], [T, T, T, T, T]] //each subarray represents a row starting from the top of the grid
let verticalWalls = [[F, T, T, T, T], [F, T, T, T, T], [F, F, F, T, F], [F, F, F, F, F], [F, F, T, T, F], [T, T, T, T, F]] //each subarray represents a column starting from the left of the grid

function create ()
{
  for(let row=0; row<5; row++){
    for(let column=0; column<5; column++){
      this.add.image(xCoordinateGrid(row), yCoordianteGrid(column), gatesGrid[row][column])
    }
  }
  for(let row=0; row<6; row++){
    for(let column=0; column<5; column++){
      if(horizontalWalls[row][column]){
        this.add.image(xCoordinateGrid(column), yCoordianteGrid(row)-50, 'wallh'); //TODO: remove magic value '50' by changing asset?
      }
      if(verticalWalls[row][column]){
        this.add.image(xCoordinateGrid(row)-50, yCoordianteGrid(column), 'wallv'); //TODO: remove magic value '50' by changing asset?
      }
    }
  }
  
  this.add.image(xCoordinateGrid(4.5), yCoordianteGrid(4), 'goal');
  this.add.image(xCoordinateGrid(5)+10, yCoordianteGrid(4), 'solutionleft');
  this.add.image(xCoordinateGrid(-1), yCoordianteGrid(0), 'qbitup');
}

function update ()
{
}

