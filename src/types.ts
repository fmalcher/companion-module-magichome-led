/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MagicHomeControl {
  setPower(on: boolean, callback?: any): any;
  [key: string]: any;
}
