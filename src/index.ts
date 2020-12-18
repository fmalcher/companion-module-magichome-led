import InstanceSkel = require('../../../instance_skel');
import { CompanionConfigField, CompanionSystem } from '../../../instance_skel_types';
import { GetActionsList } from './actions';
import { GetConfigFields, MHConfig } from './config';
import { GetPresetsList } from './presets';
import { MagicHomeControl } from './types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Control } = require('magic-home');

class MagichomeLedInstance extends InstanceSkel<MHConfig> {
  conn!: MagicHomeControl;

  constructor(system: CompanionSystem, id: string, config: MHConfig) {
    super(system, id, config);
  }

  /**
   * Main initialization function called once the module
   * is OK to start doing things.
   */
  public init(): void {
    this.status(this.STATUS_OK);
    this.createConnection();
  }

  /**
   * Create new connection object
   * and set things up
   */
  private createConnection(): void {
    if (this.config.controllerIP) {
      this.conn = new Control(this.config.controllerIP, { ack: 0 });
      this.updateCompanionBits();
    }
  }

  /**
   * set up all companion specific things for this module
   * such as actions, feedback and presets.
   */
  private updateCompanionBits(): void {
    this.setActions(GetActionsList(this, this.conn));
    this.setPresetDefinitions(GetPresetsList(this));
  }

  /**
   * Process an updated configuration
   */
  public updateConfig(config: MHConfig): void {
    // if IP has changed, create new control object
    if (this.config.controllerIP !== config.controllerIP) {
      this.createConnection();
    }

    this.config = config;
  }

  /**
   * Create the configuration fields for web config.
   */
  // eslint-disable-next-line @typescript-eslint/camelcase
  public config_fields(): CompanionConfigField[] {
    return GetConfigFields(this);
  }

  /**
   * Clean up the instance before it is destroyed.
   */
  public destroy(): void {
    // TODO
  }
}

export = MagichomeLedInstance;
