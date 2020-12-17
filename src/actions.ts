import { CompanionAction, CompanionActions } from '../../../instance_skel_types';
import InstanceSkel = require('../../../instance_skel');
import { MHConfig } from './config';
import { MagicHomeControl } from './types';

export enum ActionType {
  PowerOnOff = 'poweronoff'
}

type CompanionActionWithCallback = CompanionAction & Required<Pick<CompanionAction, 'callback'>>;

export function GetActionsList(_instance: InstanceSkel<MHConfig>, conn: MagicHomeControl): CompanionActions {
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
    }
  };

  return actions;
}
