/* eslint-disable @typescript-eslint/camelcase */
import InstanceSkel = require('../../../instance_skel');
import { CompanionPreset } from '../../../instance_skel_types';
import { ActionType } from './actions';
import { MHConfig } from './config';

function generateColorPreset(color: number, label: string): CompanionPreset {
  return {
    label,
    category: 'Colors',
    bank: {
      style: 'text',
      text: '',
      size: '24',
      color: 16777215,
      bgcolor: color
    },
    actions: [
      {
        action: ActionType.SetColor,
        options: { color }
      }
    ],
    feedbacks: []
  };
}

export function GetPresetsList(instance: InstanceSkel<MHConfig>): CompanionPreset[] | any[] {
  return [
    /* POWER */
    {
      label: 'Power On',
      category: 'Power',
      bank: {
        style: 'text',
        text: 'ON',
        size: '24',
        color: instance.rgb(255, 255, 255),
        bgcolor: instance.rgb(0, 0, 0)
      },
      actions: [
        {
          action: ActionType.PowerOnOff,
          options: { value: 1 }
        }
      ],
      feedbacks: []
    },

    {
      label: 'Power Off',
      category: 'Power',
      bank: {
        style: 'text',
        text: 'OFF',
        size: '24',
        color: instance.rgb(255, 255, 255),
        bgcolor: instance.rgb(0, 0, 0)
      },
      actions: [
        {
          action: ActionType.PowerOnOff,
          options: { value: 0 }
        }
      ],
      feedbacks: []
    },

    {
      label: 'Power Toggle',
      category: 'Power',
      bank: {
        style: 'text',
        text: '⏻',
        size: '44',
        color: instance.rgb(255, 255, 255),
        bgcolor: instance.rgb(0, 0, 0),
        latch: true
      },
      actions: [
        {
          action: ActionType.PowerOnOff,
          options: { value: 1 }
        }
      ],
      release_actions: [
        {
          action: ActionType.PowerOnOff,
          options: { value: 0 }
        }
      ],
      feedbacks: []
    },

    /* COLORS */
    generateColorPreset(instance.rgb(255, 0, 0), 'Red'),
    generateColorPreset(instance.rgb(0, 255, 0), 'Green'),
    generateColorPreset(instance.rgb(0, 0, 255), 'Blue'),
    generateColorPreset(instance.rgb(255, 255, 0), 'Yellow'),
    generateColorPreset(instance.rgb(255, 0, 255), 'Magenta'),
    generateColorPreset(instance.rgb(0, 255, 255), 'Cyan'),
    generateColorPreset(instance.rgb(255, 255, 255), 'White')
  ];
}
