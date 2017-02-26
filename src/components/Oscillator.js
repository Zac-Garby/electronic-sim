import React from 'react';

import Component from './Component';
import { Direction } from '../helpers';

export default class Source extends Component {
  constructor(x, y) {
    super(x, y, {
      char: '~',
      name: 'oscillator',
      conductDirections: Direction.ALL,
      receiveDirections: Direction.NONE,
      initialPower: true,
      hasSettings: true,
      properties: {
        pulseDuration: 2,
        pulseDelay: 1
      }
    });
  }

  shouldPower(app) {
    const
      time = this.properties.pulseDuration,
      delay = this.properties.pulseDelay + time,
      step = app.state.stepCount;
    return step % delay < time;
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  renderInspectorSettings(app) {
    return (
      <div>
        Pulse Duration [{this.properties.pulseDuration}]
      </div>
    );
  }
}