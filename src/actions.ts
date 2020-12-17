import { CompanionAction, CompanionActions } from '../../../instance_skel_types';
import InstanceSkel = require('../../../instance_skel');
import { MHConfig } from './config';
import { MagicHomeControl } from './types';
import { RGBValueToColors } from './utils/utils';

export enum ActionType {
  PowerOnOff = 'poweronoff',
  SetColor = 'setcolor'
}

type CompanionActionWithCallback = CompanionAction & Required<Pick<CompanionAction, 'callback'>>;

export function GetActionsList(instance: InstanceSkel<MHConfig>, conn: MagicHomeControl): CompanionActions {
  const actions: { [id in ActionType]: CompanionActionWithCallback } = {
    [ActionType.PowerOnOff]: {
      label: 'Power On/Off',
      options: [
        {
          type: 'dropdown',
          label: 'Value',
          id: 'value',
          choices: [
            { id: 1, label: 'On' },
            { id: 0, label: 'Off' }
          ],
          default: 1
        }
      ],
      callback: action => {
        const value = !!Number(action.options.value);
        return conn.setPower(value);
      }
    },

    [ActionType.SetColor]: {
      label: 'Set Color RGB',
      options: [
        {
          type: 'colorpicker',
          label: 'RGB color',
          id: 'color',
          default: instance.rgb(255, 255, 255)
        }
      ],
      callback: action => {
        const colors = RGBValueToColors(action.options.color);
        return conn.setColor(colors.red, colors.green, colors.blue);
      }
    }
  };

  return actions;
}
