import * as React from 'react';

// Components
import MessageInput from '@src/components/concrete/Inputs/MessageInput';
import Label from '@src/components/concrete/Label';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  messageText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const MessageContainer = ({ messageText }: Props) => (
  <div>
    <Label>
      <Translatable content={{ transKey: 'room.messages' }} />
    </Label>
    <MessageInput inputText={messageText} />
  </div>
);

export default MessageContainer;
