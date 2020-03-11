import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ItemElement from '@src/components/concrete/Venue/VenuePopUp/InfoList/ListItem/ItemElement';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';

type Props = {
  header: string;
  items: Array<{
    people?: string;
    price: string;
    title: string;
  }>;
};

const ListItem = ({ header, items }: Props) => (
  <section>
    <div className={css(styles.titleWrapper, padding.top_3, padding.bottom_2)}>
      <GenericHeader
        stylesArray={[pagestyles.defaultTitle]}
        tag="h1"
      >
        <Translatable content={{ transKey: header }}>
          <div className={css(styles.titleInner, pagestyles.smallText, pagestyles.fontMedium, margin.all_0)} />
        </Translatable>
      </GenericHeader>
    </div>
    <ContentSeparator marginNum={0} />
    {items.map(({ people, price, title }) => (
      <ItemElement
        key={shortid.generate()}
        people={people}
        price={price}
        title={title}
      />
    ))}
  </section>
);

export default ListItem;
