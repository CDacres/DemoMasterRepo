import * as React from 'react';

// Components
import Select from '@src/components/concrete/Dropdown/Select';
import Label from '@src/components/concrete/Label';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Message from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/MessageContainer';

type Props = {
  back?: () => void;
  userMessage?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const ButtonContainer = ({ back, userMessage }: Props) => (
  <div>
    <Label>
      <Translatable content={{ transKey: 'room.view_info' }} />
    </Label>
    <Select action={back}>
      <Translatable content={{ transKey: 'room.req_info' }} />
    </Select>
    <Message messageText={userMessage} />
  </div>
);

export default ButtonContainer;
