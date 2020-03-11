import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // tslint:disable-line
import hoistNonReactStatics from 'hoist-non-react-statics';

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function connect<T>(Child: React.ComponentType<T>): React.ComponentType<T> {
  class Wrapper extends React.Component<T> {
    static displayName: string;
    render = () => {
      return (
        <React.Fragment>
          <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            position={toast.POSITION.TOP_CENTER}
          />
          <Child {...this.props} />
        </React.Fragment>
      );
    }
  }
  Wrapper.displayName = `WithToast(${getDisplayName(Child)})`;
  hoistNonReactStatics(Wrapper, Child);
  return Wrapper;
}

export default connect;
