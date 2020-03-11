/* tslint:disable:max-line-length */
import * as React from 'react';

// Styles
import { pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import TitleInner from '@src/components/concrete/Info/Titles/BaseTitle/TitleInner';
import TitleOuter from '@src/components/concrete/Info/Titles/BaseTitle/TitleOuter';

type Props = {
  hasSetLetterSpacing?: boolean;
  hasSetWidth?: boolean;
  hasTitleOuter?: boolean;
  stylesArray?: object[];
  title: string;
};

const BaseTitle: React.FunctionComponent<Props> = ({ hasSetLetterSpacing, hasSetWidth, hasTitleOuter, stylesArray, title }) => (
  <section>
    <GenericHeader
      stylesArray={[pagestyles.defaultTitle]}
      tag="h2"
    >
      {hasTitleOuter ? (
        <TitleOuter>
          <TitleInner
            hasSetLetterSpacing={hasSetLetterSpacing}
            hasSetWidth={hasSetWidth}
            stylesArray={stylesArray}
            title={title}
          />
        </TitleOuter>
      ) : (
        <TitleInner
          hasSetLetterSpacing={hasSetLetterSpacing}
          hasSetWidth={hasSetWidth}
          stylesArray={stylesArray}
          title={title}
        />
      )}
    </GenericHeader>
  </section>
);

BaseTitle.defaultProps = {
  hasSetLetterSpacing: true,
  hasTitleOuter: true,
};

export default BaseTitle;
