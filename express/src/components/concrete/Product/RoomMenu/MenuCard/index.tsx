/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import MenuTable from '@src/components/concrete/Product/RoomMenu/MenuTable';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { RoomMenuNote, RoomMenuSpecial } from '@src/typings/types';

type Props = {
  currency: string;
  menu: Array<{ [propName: string]: any }>;
  notes?: RoomMenuNote[];
  specials?: RoomMenuSpecial[];
};

const MenuCard = ({ menu, notes, specials }: Props) => (
  <GenericCard boxShadow="none">
    <MenuTable
      asterisk="happy hour"
      specials={specials}
      tableData={menu}
    />
    {notes &&
      <div className={css(styles.footnote)}>
        {notes.map(note => (
          <React.Fragment key={note.id}>
            <Translatable content={{ transKey: note.trans_key }} />
            {note.value &&
              <React.Fragment>
                {' '}
                <Translatable content={{ transKey: 'room.hours_range', count: 1, replacements: { from: note.value.from, to: note.value.to } }} />
              </React.Fragment>
            }
          </React.Fragment>
        ))}
      </div>
    }
  </GenericCard>
);

export default MenuCard;
