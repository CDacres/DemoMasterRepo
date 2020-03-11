import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Exports
export { default as useAdminSiteImages } from './admin/site_images';
export { default as useAuth } from './auth';
export { default as useAuthUser } from './authUser';
export { default as useBrowse } from './pages/landing_pages/browse';
export { default as useBooking } from './order/booking';
export { default as useConfig } from './config';
export { default as useFooter } from './footer';
export { default as useHeader } from './header';
export { default as useLanding } from './pages/landing_pages/location';
export { default as useLang } from './lang';
export { default as useMsg } from './order/orderMsg';
export { default as useNavigation } from './navigation';
export { default as useResponsive } from './responsive';
export { default as useRoom } from './room';
export { default as useSearch } from './search';
export { default as useSearchFilter } from './search/filter';
export { useSearchMap, useSearchResult, useSearchResults } from './pages/search';
export { default as useViewing } from './order/viewing';
export { default as useWidget } from './pages/widget';

type ConnectProps = {
  [propName: string]: {
    mapDispatchToProps: (state: object, ownProps: object) => any;
    mapStateToProps: (state: object, ownProps: object) => any;
  };
};

export default function combine(mapConnectsToProps: ConnectProps) {
  const connectsKeys = Object.keys(mapConnectsToProps);

  const combinedMapStateToProps = (state, ownProps) => {
    const stateProps = {};

    connectsKeys.forEach((connectKey) => {
      const mapStateToProps = mapConnectsToProps[connectKey].mapStateToProps;

      if (mapStateToProps) {
        stateProps[connectKey] = mapStateToProps(state, ownProps);
      }
    });

    return stateProps;
  };

  const combinedMapDispatchToProps = (dispatch, ownProps) => {
    const dispatchProps = {};

    connectsKeys.forEach((connectKey) => {
      const mapDispatchToProps = mapConnectsToProps[connectKey].mapDispatchToProps;

      if (mapDispatchToProps) {
        dispatchProps[connectKey] = typeof mapDispatchToProps === 'object' ?
          bindActionCreators(mapDispatchToProps, dispatch) :
          mapDispatchToProps(dispatch, ownProps);
      }
    });

    return dispatchProps;
  };

  const combinedMergeProps = (stateProps, dispatchProps, ownProps) => {
    const mergedProps = {};

    connectsKeys.forEach((connectKey) => {
      const statePropsForKey = stateProps[connectKey];
      const dispatchPropsForKey = dispatchProps[connectKey];

      mergedProps[connectKey] = { ...statePropsForKey, ...dispatchPropsForKey };
    });

    return { ...ownProps, ...mergedProps };
  };

  return (Component: React.ComponentType) => {
    return connect(
      combinedMapStateToProps,
      combinedMapDispatchToProps,
      combinedMergeProps
    )(Component);
  };
}
