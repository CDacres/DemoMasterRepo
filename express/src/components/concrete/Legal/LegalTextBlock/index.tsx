import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import LegalTextSection from '@src/components/concrete/Legal/LegalTextSection';
import GenericHeader from '@src/components/concrete/GenericHeader';

type Section = {
  section_heading: string;
  section_body: any[];
};
type Block = {
  heading: string;
  id: string;
  subheading: string;
  sections: Section[];
};
type Props = {
  sections: Block[];
};

const LegalTextBlock = ({ sections }: Props) => (
  <div className={css(styles.textBlock, margin.all_0, padding.topbottom_0)}>
    {sections.map(block => (
      <div
        id={block.id}
        key={shortid.generate()}
      >
        <GenericHeader
          tag="h2"
          text={block.heading}
        />
        <div className={css(pagestyles.textBlockSmall)}>
          <Translatable content={{ transKey: block.subheading }}>
            <p />
          </Translatable>
        </div>
        <div className={css(pagestyles.textBlockSmall)}>
          {block.sections.map(dataSection => (
            <LegalTextSection
              key={shortid.generate()}
              sectionBody={dataSection.section_body}
              sectionHeading={dataSection.section_heading}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default LegalTextBlock;
