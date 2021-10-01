let config = {
  type: Phaser.AUTO,
  width: 730,
  height: 600,
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
let xSpacing = 100; //will be image height of the gate
let baseYCoordinate = 100; 
let ySpacing = 100; //will be image width of the gate
function xCoordinateGrid(columnNumber){ //for 5x5 grid, can have values 0 to 4
  return baseXCoordinate + xSpacing * columnNumber
}
function yCoordianteGrid(rowNumber){ //for 5x5 grid, can have values 0 to 4
  return baseYCoordinate + ySpacing * rowNumber
}

function xCoordinateVertWall(columnNumber){ //for 5x5 grid, can have values 0 to 5
  return baseXCoordinate-50 + xSpacing * columnNumber //TODO: remove magic value 50...half the size of the image height, but asset needs to be changed
}
function yCoordinateVertWall(columnNumber){ //for 5x5 grid, can have values 0 to 4
  return baseYCoordinate + ySpacing * columnNumber
}

function xCoordinateHorizontalWall(columnNumber){ //for 5x5 grid, can have values 0 to 4
  return baseXCoordinate + xSpacing * columnNumber
}
function yCoordinateHorizontalWall(rowNumber){ //for 5x5 grid, can have values 0 to 5
  return baseYCoordinate-50 + ySpacing * rowNumber //TODO: remove magic value 50...half the size of the image height, but asset needs to be changed
}

function create ()
{
    this.add.image(xCoordinateGrid(0), yCoordianteGrid(0), 'hgate');
    this.add.image(xCoordinateGrid(1), yCoordianteGrid(0), 'xgate');
    this.add.image(xCoordinateGrid(2), yCoordianteGrid(0), 'zgate');
    this.add.image(xCoordinateGrid(3), yCoordianteGrid(0), 'hgate');
    this.add.image(xCoordinateGrid(4), yCoordianteGrid(0), 'xgate');

    this.add.image(xCoordinateGrid(0), yCoordianteGrid(1), 'zgate');
    this.add.image(xCoordinateGrid(1), yCoordianteGrid(1), 'hgate');
    this.add.image(xCoordinateGrid(2), yCoordianteGrid(1), 'xgate');
    this.add.image(xCoordinateGrid(3), yCoordianteGrid(1), 'xgate');
    this.add.image(xCoordinateGrid(4), yCoordianteGrid(1), 'hgate');

    this.add.image(xCoordinateGrid(0), yCoordianteGrid(2), 'hgate');
    this.add.image(xCoordinateGrid(1), yCoordianteGrid(2), 'zgate');
    this.add.image(xCoordinateGrid(2), yCoordianteGrid(2), 'hgate');
    this.add.image(xCoordinateGrid(3), yCoordianteGrid(2), 'xgate');
    this.add.image(xCoordinateGrid(4), yCoordianteGrid(2), 'zgate');

    this.add.image(xCoordinateGrid(0), yCoordianteGrid(3), 'zgate');
    this.add.image(xCoordinateGrid(1), yCoordianteGrid(3), 'xgate');
    this.add.image(xCoordinateGrid(2), yCoordianteGrid(3), 'zgate');
    this.add.image(xCoordinateGrid(3), yCoordianteGrid(3), 'hgate');
    this.add.image(xCoordinateGrid(4), yCoordianteGrid(3), 'hgate');

    this.add.image(xCoordinateGrid(0), yCoordianteGrid(4), 'xgate');
    this.add.image(xCoordinateGrid(1), yCoordianteGrid(4), 'hgate');
    this.add.image(xCoordinateGrid(2), yCoordianteGrid(4), 'xgate');
    this.add.image(xCoordinateGrid(3), yCoordianteGrid(4), 'zgate');
    this.add.image(xCoordinateGrid(4), yCoordianteGrid(4), 'hgate');

    this.add.image(xCoordinateHorizontalWall(0), yCoordinateHorizontalWall(0), 'wallh');
    this.add.image(xCoordinateHorizontalWall(1), yCoordinateHorizontalWall(0), 'wallh');
    this.add.image(xCoordinateHorizontalWall(2), yCoordinateHorizontalWall(0), 'wallh');
    this.add.image(xCoordinateHorizontalWall(3), yCoordinateHorizontalWall(0), 'wallh');
    this.add.image(xCoordinateHorizontalWall(4), yCoordinateHorizontalWall(0), 'wallh');
    
    this.add.image(xCoordinateHorizontalWall(1), yCoordinateHorizontalWall(1), 'wallh');
    this.add.image(xCoordinateHorizontalWall(3), yCoordinateHorizontalWall(1), 'wallh');
    
    this.add.image(xCoordinateHorizontalWall(2), yCoordinateHorizontalWall(2), 'wallh');
    this.add.image(xCoordinateHorizontalWall(3), yCoordinateHorizontalWall(2), 'wallh');
    
    this.add.image(xCoordinateHorizontalWall(2), yCoordinateHorizontalWall(4), 'wallh');
    this.add.image(xCoordinateHorizontalWall(3), yCoordinateHorizontalWall(4), 'wallh');
    this.add.image(xCoordinateHorizontalWall(4), yCoordinateHorizontalWall(4), 'wallh');
    
    this.add.image(xCoordinateHorizontalWall(0), yCoordinateHorizontalWall(5), 'wallh');
    this.add.image(xCoordinateHorizontalWall(1), yCoordinateHorizontalWall(5), 'wallh');
    this.add.image(xCoordinateHorizontalWall(2), yCoordinateHorizontalWall(5), 'wallh');
    this.add.image(xCoordinateHorizontalWall(3), yCoordinateHorizontalWall(5), 'wallh');
    this.add.image(xCoordinateHorizontalWall(4), yCoordinateHorizontalWall(5), 'wallh');
    
    this.add.image(xCoordinateVertWall(0), yCoordinateVertWall(1), 'wallv');
    this.add.image(xCoordinateVertWall(0), yCoordinateVertWall(2), 'wallv');
    this.add.image(xCoordinateVertWall(0), yCoordinateVertWall(3), 'wallv');
    this.add.image(xCoordinateVertWall(0), yCoordinateVertWall(4), 'wallv');
    
    this.add.image(xCoordinateVertWall(1), yCoordinateVertWall(1), 'wallv');
    this.add.image(xCoordinateVertWall(1), yCoordinateVertWall(2), 'wallv');
    this.add.image(xCoordinateVertWall(1), yCoordinateVertWall(3), 'wallv');
    this.add.image(xCoordinateVertWall(1), yCoordinateVertWall(4), 'wallv');
    
    this.add.image(xCoordinateVertWall(2), yCoordinateVertWall(3), 'wallv');
    
    this.add.image(xCoordinateVertWall(4), yCoordinateVertWall(2), 'wallv');
    this.add.image(xCoordinateVertWall(4), yCoordinateVertWall(3), 'wallv');
    
    this.add.image(xCoordinateVertWall(5), yCoordinateVertWall(0), 'wallv');
    this.add.image(xCoordinateVertWall(5), yCoordinateVertWall(1), 'wallv');
    this.add.image(xCoordinateVertWall(5), yCoordinateVertWall(2), 'wallv');
    this.add.image(xCoordinateVertWall(5), yCoordinateVertWall(3), 'wallv');
    
    this.add.image(xCoordinateGrid(-1), yCoordianteGrid(0), 'qbitup');
    this.add.image(xCoordinateGrid(5.1), yCoordianteGrid(4), 'solutionleft');
    this.add.image(xCoordinateGrid(4.5), yCoordianteGrid(4), 'goal');
  }

function update ()
{
}

