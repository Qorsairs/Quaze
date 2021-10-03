let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 650,
  backgroundColor: '#FFFFFF',
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
        debug: false
    }
},
};

let game = new Phaser.Game(config);
let qubit;
let walls;
let hgates;
let xgates;
let zgates;
let gameOver = false;

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

let baseXCoordinate = 180;
let xSpacing = 100; //will be image width of a gate (i.e. grid column)
let baseYCoordinate = 110; 
let ySpacing = 100; //will be image height of a gate (i.e. grid row)
function xCoordinateGrid(columnNumber){ 
  return baseXCoordinate + xSpacing * columnNumber
}
function yCoordianteGrid(rowNumber){ 
  return baseYCoordinate + ySpacing * rowNumber
}

const h = 'hgate'
const x = 'xgate'
const z = 'zgate'
const T = true
const F = false
const gameData = {
  gridSize: {
    rows: 5,
    columns: 5
  }, //the grid is 5x5
  gatesGrid: [[h, z, h, z, x], [x, h, z, x, h], [z, x, h, z, x], [h, x, x, h, z], [x, h, z, h, h]], //each subarray represents a row starting from the top of the grid
  horizontalWalls: [[T, T, T, T, T], [F, T, F, T, F], [F, F, T, T, F], [F, F, F, F, F], [F, F, T, T, T], [T, T, T, T, T]], //each subarray represents a row starting from the top of the grid
  verticalWalls: [[F, T, T, T, T], [F, T, T, T, T], [F, F, F, T, F], [F, F, F, F, F], [F, F, T, T, F], [T, T, T, T, F]], //each subarray represents a column starting from the left of the grid
  qubitInitialState: 0, //facing up
  qubitFinalState: 3, //facing left
}
let qubitState = gameData.qubitInitialState; //initial state of qubit is facing up. (0 = up, 1 = right, 2 = down, 3 = left)

function create ()
{
  hgates = this.physics.add.staticGroup();
  xgates = this.physics.add.staticGroup();
  zgates = this.physics.add.staticGroup();
  for(let row=0; row<gameData.gridSize.rows; row++){
    for(let column=0; column<gameData.gridSize.columns; column++){
      let gate = gameData.gatesGrid[row][column];
      if(gate==='hgate'){
        hgates.create(xCoordinateGrid(row), yCoordianteGrid(column), gate)
      }
      if(gate==='xgate'){
        xgates.create(xCoordinateGrid(row), yCoordianteGrid(column), gate)
      }
      if(gate==='zgate'){
        zgates.create(xCoordinateGrid(row), yCoordianteGrid(column), gate)
      }
    }
  }

  walls = this.physics.add.staticGroup(); //group of static objects

  for(let row=0; row<gameData.gridSize.rows+1; row++){
    for(let column=0; column<gameData.gridSize.columns; column++){
      if(gameData.horizontalWalls[row][column]){
        walls.create(xCoordinateGrid(column), yCoordianteGrid(row)-50, 'wallh'); //TODO: remove magic value '50' by changing asset?
      }
      if(gameData.verticalWalls[row][column]){
        walls.create(xCoordinateGrid(row)-50, yCoordianteGrid(column), 'wallv'); //TODO: remove magic value '50' by changing asset?
      }
    }
  }

  let goal = this.physics.add.image(xCoordinateGrid(4.5), yCoordianteGrid(4), 'goal');
  this.add.image(xCoordinateGrid(5)+10, yCoordianteGrid(4), 'solutionleft').setScale(0.7);
  
  qubit = this.physics.add.image(xCoordinateGrid(-1), yCoordianteGrid(0), 'qbitup').setScale(0.7);
  qubit.setCollideWorldBounds(true); //qubit cannot run off the edge of the game screen
  
  let startText = this.add.text(xCoordinateGrid(-1)-25, yCoordianteGrid(-1)+30, 'Start', { fontSize: '16px', fill: '#000' }); 

  this.physics.add.collider(qubit, walls); 

  let qubitAngles = {
    0: 0, //up
    1: 90, //right
    2: 180, //down
    3: -90 //left
  }
  function hTransform(qubit, gate){
    gate.disableBody(true, true); //TODO: figure out way to enable re-enable the body when the qubit is no longer overlapping a specific gate!
    if (qubitState===0) {
      qubitState = 1
      qubit.angle = qubitAngles[qubitState];
    }else if (qubitState===1) {
      qubitState = 0
      qubit.angle = qubitAngles[qubitState];
    }else if (qubitState===2) {
      qubitState = 3
      qubit.angle = qubitAngles[qubitState];
    }else if (qubitState===3) {
      qubitState = 2
      qubit.angle = qubitAngles[qubitState];
    }

  }
  function xTransform(qubit, gate){
    gate.disableBody(true, true);
    if(qubitState===0){
      qubitState = 2
      qubit.angle = qubitAngles[qubitState];
	  }else if(qubitState===2){
      qubitState = 0
      qubit.angle = qubitAngles[qubitState];
    }
  }
  function zTransform(qubit, gate){
    gate.disableBody(true, true);
    if(qubitState===1){
      qubitState = 3
      qubit.angle = qubitAngles[qubitState];
    }else if(qubitState===3){
      qubitState = 1
      qubit.angle = qubitAngles[qubitState];
    }
  }
  function winOrLose(qubit, goal){
    let gameEndText = this.add.text(xCoordinateGrid(5)-45, yCoordianteGrid(5)-30, '', { fontSize: '32px', fill: '#000' }); 
    if(qubitState===gameData.qubitFinalState){
      gameEndText.setText('You Win'); 
    }else{
      gameEndText.setText('You Lose'); 
    }
    setTimeout(()=>{
      gameOver = true
    }, 250)
  }

  this.physics.add.overlap(qubit, hgates, hTransform, null, this); 
  this.physics.add.overlap(qubit, xgates, xTransform, null, this); 
  this.physics.add.overlap(qubit, zgates, zTransform, null, this); 
  this.physics.add.overlap(qubit, goal, winOrLose, null, this); 

  cursors = this.input.keyboard.createCursorKeys(); 
}

function update ()
{
  if(gameOver) return;

  if(cursors.left.isDown){
    qubit.setVelocityX(-100);
  }else if(cursors.right.isDown){
    qubit.setVelocityX(100);
  }else if(cursors.down.isDown){
    qubit.setVelocityY(100);
  }else if(cursors.up.isDown){
    qubit.setVelocityY(-100);
  }else{
    qubit.setVelocityX(0);
    qubit.setVelocityY(0);
  }
}

