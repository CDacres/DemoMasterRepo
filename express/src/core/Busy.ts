export class Busy {
  workers: number = 0;
}

export interface WithWorker {
  __loaded?: number;
  __total?: number;
  __workers?: number;
}
