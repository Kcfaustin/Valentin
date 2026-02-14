
export enum Step {
  IDENTIFY = 'IDENTIFY',
  ASK = 'ASK',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS'
}

export interface ValentineState {
  name: string;
  step: Step;
  poem: string;
}
