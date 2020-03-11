import * as React from 'react';

// Components
import Calendar from '@src/components/Listing/Icons/Calendar';
import DedicatedDesk from '@src/components/Listing/Icons/DedicatedDesk';
import Dining from '@src/components/Listing/Icons/Dining';
import HotDesk from '@src/components/Listing/Icons/HotDesk';
import Meeting from '@src/components/Listing/Icons/Meeting';
import Office from '@src/components/Listing/Icons/Office';
import Party from '@src/components/Listing/Icons/Party';
import PrivateOffice from '@src/components/Listing/Icons/PrivateOffice';
import Table from '@src/components/Listing/Icons/Table';
import Venue from '@src/components/Listing/Icons/Venue';
import Wedding from '@src/components/Listing/Icons/Wedding';

type Props = {
  icon: 'Meeting' | 'DedicatedDesk' | 'PrivateOffice' | 'HotDesk' | 'Table' | 'Venue' | 'Dining' | 'Office' | 'Party' | 'Wedding' | 'Calendar';
  stylesArray?: object[];
};

const Icon = ({ icon, stylesArray }: Props) => {
  switch (icon) {
    case 'Meeting':
      return (
        <Meeting stylesArray={stylesArray} />
      );
    case 'DedicatedDesk':
      return (
        <DedicatedDesk stylesArray={stylesArray} />
      );
    case 'PrivateOffice':
      return (
        <PrivateOffice stylesArray={stylesArray} />
      );
    case 'HotDesk':
      return (
        <HotDesk stylesArray={stylesArray} />
      );
    case 'Table':
      return (
        <Table stylesArray={stylesArray} />
      );
    case 'Venue':
      return (
        <Venue stylesArray={stylesArray} />
      );
    case 'Dining':
      return (
        <Dining stylesArray={stylesArray} />
      );
    case 'Office':
      return (
        <Office stylesArray={stylesArray} />
      );
    case 'Party':
      return (
        <Party stylesArray={stylesArray} />
      );
    case 'Wedding':
      return (
        <Wedding stylesArray={stylesArray} />
      );
    case 'Calendar':
      return (
        <Calendar stylesArray={stylesArray} />
      );
    default:
      return null;
  }
};

export default Icon;
