import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  inputText?: (e?: any) => void;
};

const MessageInput = ({ inputText }: Props) => (
  <div className={css(styles.wrapper)}>
    <Translatable attributes={{ placeholder: { transKey: 'room.message_input' } }}>
      <textarea
        className={css(styles.area)}
        onInput={inputText}
      />
    </Translatable>
  </div>
);

export default MessageInput;
