import * as React from 'react';
import shortid from 'shortid';

// Connectors
import { useAdminSiteImages } from '@src/store/connectors';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

const ImagesList = (props) => {
  const { siteImages: { uploads } } = props;
  return (
    <div>
      <GenericHeader text="Images:" />
      <ul>
        {uploads.map(({ id, attributes: { largeUrl } }) => (
          <li key={shortid.generate()}>
            {`${id}: `}
            <Translatable attributes={{ title: { transKey: 'View image' } }}>
              <a
                href={largeUrl}
                rel="noopener"
                target="_blank"
              >
                View image
              </a>
            </Translatable>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default useAdminSiteImages(ImagesList);
