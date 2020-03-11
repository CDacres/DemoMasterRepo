/* tslint:disable:no-console */
import StackTrace from 'stacktrace-js';

const log = stack => {
  console.log(stack.map(frame => frame.toString()).join('\n'));
  console.groupEnd();
};

export default {
  error(error: string, extra: any) {
    if (console.group) {
      console.group('💀');
      console.log(error);
      console.log(extra);
      StackTrace.fromError(error).then(log);
    } else {
      console.log('💀', ' - ', error);
      console.log(extra);
    }
  },
  info(message: string, extra: any) {
    if (console.group) {
      console.group('ℹ️');
      console.log(message);
      console.log(extra);
      console.groupEnd();
    } else {
      console.log('ℹ️', ' - ', message);
      console.log(extra);
    }
  },
};
