import InstanceSkel = require('../../../instance_skel');
import { SomeCompanionConfigField } from '../../../instance_skel_types';

export interface MHConfig {
  controllerIP: string;
}

export function GetConfigFields(self: InstanceSkel<MHConfig>): SomeCompanionConfigField[] {
  return [
    {
      type: 'textinput',
      id: 'controllerIP',
      label: 'Controller IP',
      width: 12,
      regex: self.REGEX_IP
    }
  ];
}
