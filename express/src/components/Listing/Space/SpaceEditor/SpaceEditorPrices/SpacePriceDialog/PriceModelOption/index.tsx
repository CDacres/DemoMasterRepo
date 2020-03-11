import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { PriceModelMeta } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import OptionButton from '@src/components/Listing/Buttons/OptionButton';
import OptionButtonItem from '@src/components/Listing/Buttons/OptionButton/OptionButtonItem';
import Column from '@src/components/Listing/Layout/Column';
import Strip from '@src/components/Listing/Layout/Strip';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  meta: PriceModelMeta;
  onClick: VoidFunction;
};

const PriceModelOption = ({ meta, onClick }: Props) => {
  if (!meta || !meta.add) {
    return <div>'no meta...'</div>;
  }
  return (
    <div>
      <Strip
        cols="1fr auto"
        itemsVert="flex-start"
      >
        <Column gap="8px">
          <span>
            <span className={css(styles.text)}>
              <Spell word={meta.add.label} />
            </span>
          </span>
          {meta.add.tip &&
            <div>
              <span className={css(styles.tip)}>
                <Spell word={meta.add.tip} />
              </span>
            </div>
          }
        </Column>
        <OptionButton>
          <OptionButtonItem
            isLarge={true}
            onClick={onClick}
          >
            <Spell word="common.add" />
          </OptionButtonItem>
        </OptionButton>
      </Strip>
    </div>
  );
};

export default PriceModelOption;
