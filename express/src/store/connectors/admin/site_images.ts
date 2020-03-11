import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getSiteImages } from '@src/store/selectors';

// Modules
import { uploadImageFile, uploadImageUrl } from '@src/store/modules/admin/site_images';

// Types
import { Store } from '@src/typings/types';

type StoreState = {
  siteImages: Store.Admin.SiteImages;
};

type DispatchProps = {
  uploadImageFile: () => void;
  uploadImageUrl: () => void;
};

const mapStateToProps = (state: StoreState) => {
  return {
    siteImages: getSiteImages(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  uploadImageFile,
  uploadImageUrl,
}, dispatch);

export default function use(Component: React.ComponentType) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
}
