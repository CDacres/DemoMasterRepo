import * as React from 'react';

// Components
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

// Types
import { ChildProps } from './ChildProps';

type Props = {
  children?: (childProps: ChildProps) => JSX.Element;
  inputComponentClass?: string;
  inputId?: string;
  inputName?: string;
  isLoading?: boolean;
  onPostFile: (contentType: string, base64: string) => void;
};

class FileInput extends React.PureComponent<Props> {
  static defaultProps = {
    inputId: 'file',
    inputName: 'file',
    isLoading: false,
  };

  protected fileInput: HTMLInputElement;

  bindInputElement = (input: HTMLInputElement): void => {
    this.fileInput = input;
  }

  handleFileInputTrigger = (): void => {
    this.fileInput.click();
  }

  handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;
    const fileList = Array.from(fileInput.files);
    fileList.forEach((f: File) => {
      const reader = new FileReader();
      reader.onload = this.readFile;
      reader.readAsDataURL(f);
    });
  }

  postFile = (contentType: string, base64: string): void => {
    this.props.onPostFile(contentType, base64);
  }

  readFile = (e): void => {
    const dataUrl = e.target.result;
    const contentType = dataUrl
      .split(':')
      .pop()
      .split(';')
      .shift();
    const base64 = dataUrl.split(',').pop();
    this.postFile(contentType, base64);
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
            handleFileInputTrigger: this.handleFileInputTrigger,
            handleFileUpload: this.handleFileUpload,
          })
        )}
      </React.Fragment>
    );
  }
}

export default FileInput;
