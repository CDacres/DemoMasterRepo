import * as React from 'react';

// Constants
import { SITE_IMAGES } from '@src/constants/imageTypes';

// Connectors
import { useAdminSiteImages } from '@src/store/connectors';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { ChildProps, FileInput, UrlInput, UrlProps } from '@src/components/abstract/FileInput';
import ImagesList from '@src/components/concrete/Admin/SiteImagesUpload/ImagesList';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Types
import { Store } from '@src/typings/types';

type Props = {
  siteImages: Store.Admin.SiteImages;
  uploadImageFile: (contentType: string, base64: string, imageTypeId: string) => void;
  uploadImageUrl: (contentType: string, url: string) => void;
};

class SiteImagesUpload extends React.PureComponent<Props> {
  handlePostFile = (contentType: string, base64: string): void => {
    this.props.uploadImageFile(contentType, base64, SITE_IMAGES);
  }

  handlePostUrl = (contentType: string, url: string): void => {
    this.props.uploadImageUrl(contentType, url);
  }

  renderFileInput = ({ bindInputElement, handleFileUpload }: ChildProps): JSX.Element => (
    <input
      onChange={handleFileUpload}
      ref={bindInputElement}
      type="file"
    />
  )

  renderUrlInput = ({ bindInputElement, handleFileUpload }: UrlProps): JSX.Element => (
    <React.Fragment>
      <input
        ref={bindInputElement}
        type="text"
      />
      <button onClick={handleFileUpload}>
        Upload Url
      </button>
    </React.Fragment>
  )

  render() {
    const { siteImages: { isLoading } } = this.props;
    return (
      <React.Fragment>
        <GenericHeader
          tag="h1"
          text="Site images"
        />
        <EnclosingLabel>
          Upload image:
        </EnclosingLabel>
        <br />
        <FileInput
          isLoading={isLoading}
          onPostFile={this.handlePostFile}
        >
          {this.renderFileInput}
        </FileInput>
        <br />
        <UrlInput
          isLoading={isLoading}
          onPostFile={this.handlePostUrl}
        >
          {this.renderUrlInput}
        </UrlInput>
        <br />
        <ImagesList />
      </React.Fragment>
    );
  }
}

export default useAdminSiteImages(SiteImagesUpload);
