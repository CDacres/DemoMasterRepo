import * as React from 'react';

type Props = {
  children: React.ReactNode;
  errors?: string[];
};

class ValidationWrapper extends React.Component<Props> {

  protected elementRef;

  constructor(props: Props) {
    super(props);
    this.elementRef = React.createRef();
  }

  render() {
    const { children, errors } = this.props;
    if (errors && errors.length > 0 && this.elementRef !== null && this.elementRef.current !== null) {
      this.elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return (
      <div ref={this.elementRef}>
        {children}
      </div>
    );
  }
}

export default ValidationWrapper;
