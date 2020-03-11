import * as React from 'react';

// Components
import ListItemComponent from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem/ListItemComponent';

type Props = {
  buttonText?: string;
  children?: JSX.Element | JSX.Element[];
  formButtonText?: string;
  isToggledCollapsed?: boolean;
  item?: string;
  noBorder?: boolean;
  subtitle?: string;
  title: string;
  toggleId?: string;
};

type State = {
  isToggledCollapsed: boolean;
};

class ListItemContainer extends React.Component<Props, State> {
  state: State = { isToggledCollapsed: false };

  componentDidMount() {
    if (this.props.isToggledCollapsed) {
      this.setState({ isToggledCollapsed: this.props.isToggledCollapsed });
    }
  }

  handleToggleCollapse = e => {
    e.preventDefault();
    this.toggleCollapse();
  }

  handleSave = () => {
    this.toggleCollapse();
  }

  toggleCollapse = () => {
    this.setState(prevState => ({ isToggledCollapsed: !prevState.isToggledCollapsed }));
  }

  render() {
    const { buttonText, children, formButtonText, item, noBorder, subtitle, title, toggleId } = this.props;
    const { isToggledCollapsed } = this.state;
    return (
      <ListItemComponent
        buttonText={buttonText}
        formButtonText={formButtonText}
        handleToggleCollapse={this.handleToggleCollapse}
        handleSave={this.handleSave}
        isToggledCollapsed={isToggledCollapsed}
        item={item}
        noBorder={noBorder}
        subtitle={subtitle}
        title={title}
        toggleId={toggleId}
      >
        {children}
      </ListItemComponent>
    );
  }
}

export default ListItemContainer;
