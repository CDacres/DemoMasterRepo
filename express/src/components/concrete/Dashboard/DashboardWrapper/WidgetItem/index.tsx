import * as React from 'react';

// Components
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import Item from '@src/components/concrete/Dashboard/DashboardWrapper/WidgetItem/Item';

type Props = {
  domain: string;
  text: string;
  token: string;
};

const WidgetItem = ({ domain, text, token }: Props) => (
  <React.Fragment>
    <ListItem
      isToggledCollapsed={true}
      subtitle="dashboard.booking_widget_text"
      title="dashboard.booking_widget_button_widget"
      toggleId="booking_widget_button"
    >
      <Item
        domain={domain}
        text={text}
        token={token}
      />
    </ListItem>
    <ListItem
      subtitle="dashboard.booking_widget_text"
      title="dashboard.booking_widget_custom_widget"
      toggleId="booking_widget_link"
    >
      <Item
        domain={domain}
        isLink={true}
        text={text}
        token={token}
      />
    </ListItem>
  </React.Fragment>
);

export default WidgetItem;
