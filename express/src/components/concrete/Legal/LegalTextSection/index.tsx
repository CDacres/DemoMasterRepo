import * as React from 'react';
import shortid from 'shortid';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import Body from '@src/components/concrete/Legal/LegalTextSection/Body';

type Props = {
  sectionBody: any[];
  sectionHeading: string;
};

const LegalTextSection = ({ sectionBody, sectionHeading }: Props) => (
  <div>
    <GenericHeader
      tag="h5"
      text={sectionHeading}
    />
    {sectionBody.map(item => (
      <Body
        item={item}
        key={shortid.generate()}
      />
    ))}
  </div>
);

export default LegalTextSection;
