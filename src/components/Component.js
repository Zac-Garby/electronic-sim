import React from 'react';
import { Direction } from '../helpers';

export default class Component {
  constructor(x, y, options={}) {
    Object.assign(this, Object.assign({
      char: ' ',
      name: 'none',
      category: null,
      conductDirections: Direction.NONE,
      receiveDirections: Direction.NONE,
      initialPower: false,
      onClass: 'green',
      offClass: 'grey',
      properties: {},
      board: null,
      hasSettings: false,
      id: null
    }, options));

    this.x = x;
    this.y = y;
    this.on = false;

    if (this.id === null) {
      this.id = this.name;
    }
  }

  makeTableCell(key, selected, onClick) {
    const className = (selected ? 'selected ' : '') +
      (this.on ? this.onClass : this.offClass) +
      ' ' + this.name;
    return (
      <td key={key} className={className}
          onMouseDown={onClick}>
        {this.char}
      </td>
    );
  }

  shouldPower(app) {
    return this.initialPower;
  }

  get conductableCoords() {
    return this.conductDirections.map((direction) => {
      return {
        x: direction.x + this.x,
        y: direction.y + this.y
      };
    });
  }

  get receiveableCoords() {
    return this.receiveDirections.map((direction) => {
      return {
        x: direction.x + this.x,
        y: direction.y + this.y
      };
    });
  }

  canReceiveFrom(x, y) {
    for (var i = 0; i < this.receiveableCoords.length; i++) {
      const coord = this.receiveableCoords[i];
      if (coord.x === x && coord.y === y) {
        return true;
      }
    }
    return false;
  }

  simulate(from, board) {
    const pos = {
      x: this.x,
      y: this.y
    };

    this.on = true;

    this.conductableCoords.map((coord) => {
      if (board.contains(coord.x, coord.y)) {
        const comp = board.get(coord.x, coord.y);

        if (comp.name && !comp.on && comp.canReceiveFrom(pos.x, pos.y) &&
            (from.x !== comp.x || from.y !== comp.y)) {
          comp.simulate(pos, board);
        }
      }

      return null; // Useless value to silence warning
    });
  }

  renderInspectorSettings() {
    return <span>No settings.</span>;
  }

  serialize() {
    const blacklist = ['board'];

    return JSON.stringify(this, (key, value) => {
      if (blacklist.indexOf(key) !== -1) {
        return undefined;
      }

      return value;
    });
  }
}
