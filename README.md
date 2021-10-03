# Quaze

## Introduction

Welcome to **Quaze**, the quantum maze! This is a puzzle game inspired by _quantum computing_, following rules like those used for transformation of _qubits_, the basic units of information for a quantum computer. 

This project was developed for the _Quantum Games Hackathon 2021_ organised by the _Quantum AI Foundation_.

## Goal 

The objective of the game is 
1.	Reach the exit of the maze.
2.	Have the qubit in the qubit target state, as indicated at the end of the maze.

## Start up game locally

Open up index.html with a server of your choice.
(e.g. you can install the vscode extension "live server" and open index.html with this). Make sure JS is enabled in your browser.

You can also view the game hosted with github pages at https://qorsairs.github.io/Quaze/

## How to play

Use the arrow keys ↑, ↓, ← & → to move the qubit around the maze. 
When the qubit moves into a quantum gate (a coloured tile within the maze), it changes its states. 
Different colours represent different quantum gates: red is the X gate, blue is the Z gate & green is the H (Hadamard) gate. 
Each gate transforms the qubit in a different way:
* X flips the qubit vertically. 
* Z flips the qubit horizontally.
* H rotates the qubit back and forth between horizontal and vertical.

Note: A rotation of a state around a symmetrical axis will leave the state the same.

If you reach the end of the maze and the state is not the target, keep going. You can move backwards and try a different route.

We hope this game can help you learn or visualize better quantum computing. Have fun!
