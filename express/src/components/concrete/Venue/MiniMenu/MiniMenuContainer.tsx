/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import MiniMenuComponent from '@src/components/concrete/Venue/MiniMenu/MiniMenuComponent';

type Props = {
  amenitiesRef?: React.RefObject<HTMLDivElement>;
  data: string[];
  diningRef?: React.RefObject<HTMLDivElement>;
  locationRef: React.RefObject<HTMLDivElement>;
  meetingRef?: React.RefObject<HTMLDivElement>;
  menuRef?: React.RefObject<HTMLDivElement>;
  officeRef?: React.RefObject<HTMLDivElement>;
  overviewRef: React.RefObject<HTMLDivElement>;
  partyRef?: React.RefObject<HTMLDivElement>;
  photosRef: React.RefObject<HTMLDivElement>;
  reviewsRef?: React.RefObject<HTMLDivElement>;
  weddingRef?: React.RefObject<HTMLDivElement>;
};

type State = {
  amenitiesOn: boolean;
  diningOn: boolean;
  displayMiniMenu: boolean;
  locationOn: boolean;
  meetingOn: boolean;
  menuOn: boolean;
  officeOn: boolean;
  partyOn: boolean;
  photosOn: boolean;
  reviewsOn: boolean;
  weddingOn: boolean;
};

class MiniMenuContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      amenitiesOn: false,
      diningOn: false,
      displayMiniMenu: false,
      locationOn: false,
      meetingOn: false,
      menuOn: false,
      officeOn: false,
      partyOn: false,
      photosOn: false,
      reviewsOn: false,
      weddingOn: false,
    };
  }

  isBottom = (ref)  => {
    if (typeof ref !== 'undefined' && ref.current !== null) {
      return ref.current.getBoundingClientRect().bottom > 0;
    }
    return null;
  }

  isOnScroll = (ref)  => {
    if (typeof ref !== 'undefined' && ref.current !== null) {
      return ref.current.getBoundingClientRect().top > - 200 && ref.current.getBoundingClientRect().top < window.innerHeight - 500;
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    if (this.isBottom(this.props.overviewRef)) {
      this.setState({ displayMiniMenu: false });
    } else {
      this.setState({ displayMiniMenu: true });
      if (this.isOnScroll(this.props.officeRef)) {
        this.setState({ officeOn: true });
      } else if (this.isOnScroll(this.props.meetingRef)) {
        this.setState({ meetingOn: true });
      } else if (this.isOnScroll(this.props.partyRef)) {
        this.setState({ partyOn: true });
      } else if (this.isOnScroll(this.props.menuRef)) {
        this.setState({ menuOn: true });
      } else if (this.isOnScroll(this.props.reviewsRef)) {
        this.setState({ reviewsOn: true });
      } else if (this.isOnScroll(this.props.photosRef)) {
        this.setState({ photosOn: true });
      } else if (this.isOnScroll(this.props.amenitiesRef)) {
        this.setState({ amenitiesOn: true });
      } else if (this.isOnScroll(this.props.locationRef)) {
        this.setState({ locationOn: true });
      } else if (this.isOnScroll(this.props.diningRef)) {
        this.setState({ diningOn: true });
      } else if (this.isOnScroll(this.props.weddingRef)) {
        this.setState({ weddingOn: true });
      } else {
        this.setState({
          amenitiesOn: false,
          diningOn: false,
          locationOn: false,
          meetingOn: false,
          menuOn: false,
          officeOn: false,
          partyOn: false,
          photosOn: false,
          reviewsOn: false,
          weddingOn: false,
        });
      }
    }
  }

  render() {
    const { amenitiesRef, data, diningRef, locationRef, meetingRef, menuRef, officeRef, overviewRef, partyRef, photosRef, reviewsRef, weddingRef } = this.props;
    const menuItems = [
      {
        isFirst: true,
        onScroll: false,
        ref: overviewRef,
        text: data[0], // TODO: hardcoded data
      },
    ];
    if (officeRef && officeRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.officeOn,
        ref: officeRef,
        text: data[1], // TODO: hardcoded data
      });
    }
    if (meetingRef && meetingRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.meetingOn,
        ref: meetingRef,
        text: data[2], // TODO: hardcoded data
      });
    }
    if (partyRef && partyRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.partyOn,
        ref: partyRef,
        text: data[3], // TODO: hardcoded data
      });
    }
    if (diningRef && diningRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.diningOn,
        ref: diningRef,
        text: data[4], // TODO: hardcoded data
      });
    }
    if (weddingRef && weddingRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.weddingOn,
        ref: weddingRef,
        text: data[5], // TODO: hardcoded data
      });
    }
    if (menuRef && menuRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.menuOn,
        ref: menuRef,
        text: data[6], // TODO: hardcoded data
      });
    }
    if (reviewsRef && reviewsRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.reviewsOn,
        ref: reviewsRef,
        text: data[7], // TODO: hardcoded data
      });
    }
    menuItems.push({
      isFirst: false,
      onScroll: this.state.photosOn,
      ref: photosRef,
      text: data[8], // TODO: hardcoded data
    });
    if (amenitiesRef && amenitiesRef.current != null) {
      menuItems.push({
        isFirst: false,
        onScroll: this.state.amenitiesOn,
        ref: amenitiesRef,
        text: data[9], // TODO: hardcoded data
      });
    }
    menuItems.push({
      isFirst: false,
      onScroll: this.state.locationOn,
      ref: locationRef,
      text: data[10], // TODO: hardcoded data
    });
    return (
      <MiniMenuComponent
        isDisplayed={this.state.displayMiniMenu}
        menuItems={menuItems}
      />
    );
  }
}

export default MiniMenuContainer;
