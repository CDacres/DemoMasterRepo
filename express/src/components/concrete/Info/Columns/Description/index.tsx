import * as React from 'react';

// Components
import DescriptionInner from '@src/components/concrete/Info/Columns/Description/DescriptionInner';
import DescriptionOuter from '@src/components/concrete/Info/Columns/Description/DescriptionOuter';

type Props = {
  text: string;
};

const Description = ({ text }: Props) => (
  <DescriptionOuter>
    <DescriptionInner text={text} />
  </DescriptionOuter>
);

export default Description;
