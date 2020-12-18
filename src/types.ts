// This is an INCOMPLETE typing of the "Control" class from the magic-home lib

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MagicHomeControl {
  setPower(on: boolean, callback?: Function): Promise<boolean>;
  setColor(red: number, green: number, blue: number, callback?: Function): Promise<boolean>;
  setPattern(pattern: string, speed: number, callback?: Function): Promise<boolean>;
  [key: string]: any;
}
