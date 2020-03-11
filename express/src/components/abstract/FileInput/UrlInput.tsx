
import * as React from 'react';

// Components
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

// Types
import { UrlProps } from './UrlProps';

type Props = {
  children?: (childProps: UrlProps) => JSX.Element;
  inputComponentClass?: string;
  inputId?: string;
  inputName?: string;
  isLoading?: boolean;
  onPostFile: (contentType: string, base64: string) => void;
};

class UrlInput extends React.PureComponent<Props> {
  static defaultProps = {
    inputId: 'file',
    inputName: 'file',
    isLoading: false,
  };

  protected fileInput: HTMLInputElement;

  bindInputElement = (input: HTMLInputElement): void => {
    this.fileInput = input;
  }

  handleFileUpload = (): void => {
    this.props.onPostFile('application/json', this.fileInput.value);
  }

  render() {
    const { children, isLoading } = this.props;
    return (
      <React.Fragment>
        {isLoading ? (
          <LoadingAnimation spacing="dotsWrapperSmall" />
        ) : (
          children({
            bindInputElement: this.bindInputElement,
            handleFileUpload: this.handleFileUpload,
          })
        )}
      </React.Fragment>
    );
  }
}

export default UrlInput;
