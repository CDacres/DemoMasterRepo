import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import AddButton from '@src/components/Listing/Buttons/AddButton';
import Strip from '@src/components/Listing/Layout/Strip';
import Headings from '@src/components/Listing/Titles/Headings';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  addOnClick?: VoidFunction;
  addWord?: string;
  subtitle: string;
  title: string;
};

const TabHeader = ({ addOnClick, addWord, subtitle, title }: Props) => (
  <div className={css(styles.container)}>
    <Strip
      cols="1fr auto"
      itemsVert="flex-start"
    >
      <div>
        <Headings
          stylesArray={[styles.title]}
          tag="h1"
        >
          <Spell word={title} />
        </Headings>
        <Headings tag="h4">
          <Spell word={subtitle} />
        </Headings>
      </div>
      {(addOnClick && addWord) &&
        <Headings
          stylesArray={[styles.title]}
          tag="h1"
        >
          <AddButton onClick={addOnClick}>
            <Spell
              variant="inherit"
              word={addWord}
            />
          </AddButton>
        </Headings>
      }
    </Strip>
  </div>
);

export default TabHeader;
