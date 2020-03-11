import * as React from 'react';

// Styles
import { pagestyles } from '@src/styles';

// Components
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Copy, Envelope, Facebook, Messenger, ShareWithLink, Twitter } from '@src/components/concrete/Icons/svgs';
import Item from '@src/components/concrete/Product/Share/Item';

const Share = () => (
  <React.Fragment>
    <ModalTop
      subtext="this needs translation key"
      text="room.share"
    />
    <section>
      <ContentSeparator marginNum={3} />
      <Item
        icon={<Facebook stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlack]} />}
        text="Facebook"
      />
      <Item
        icon={<Twitter stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlack]} />}
        text="Twitter"
      />
      <Item
        icon={<Envelope stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlack]} />}
        text="users.email"
      />
      <Item
        icon={<Messenger stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlack]} />}
        text="Messenger"
      />
      <Item
        icon={<Copy stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlack]} />}
        text="room.copy_link"
      />
      <Item
        icon={<ShareWithLink stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlack]} />}
        text="room.embed"
      />
    </section>
  </React.Fragment>
);

export default Share;
