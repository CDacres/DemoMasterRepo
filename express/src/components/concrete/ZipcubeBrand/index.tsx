import * as React from 'react';

// Styles
import styles from './styles';

// Components
import { ZipcubeLogo, ZipcubeName } from '@src/components/concrete/Icons/svgs';

type Props = {
  fill?: string;
  hideSmallScreen?: boolean;
  showName?: boolean;
};

const ZipcubeBrand: React.FunctionComponent<Props> = ({ fill, hideSmallScreen, showName }) => (
  <React.Fragment>
    <ZipcubeLogo
      fill={fill}
      stylesArray={[styles.zipcubeIcon]}
      viewBox="5 10 15 23"
    />
    {showName &&
      <React.Fragment>
        {hideSmallScreen ? (
          <ZipcubeName
            fill={fill}
            stylesArray={[styles.zipcubeLogoSvgHiddenSmall]}
          />
        ) : (
          <ZipcubeName
            fill={fill}
            stylesArray={[styles.zipcubeLogoSvg]}
          />
        )}
      </React.Fragment>
    }
  </React.Fragment>
);

ZipcubeBrand.defaultProps = {
  hideSmallScreen: true,
  showName: true,
};

export default ZipcubeBrand;
