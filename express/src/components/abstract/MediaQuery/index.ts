import { responsiveWrapper } from 'react-responsive-redux';

export const SmallSidebarOption = responsiveWrapper({ maxWidth: 270 });
export const ProductLargeScreen = responsiveWrapper({ minWidth: 744 });
export const FullScreenModal = responsiveWrapper({ maxWidth: 743 });
export const LargeScreen = responsiveWrapper({ minWidth: 768 });
export const SmallScreen = responsiveWrapper({ maxWidth: 767 });
export const MediumScreen = responsiveWrapper({ maxWidth: 939 });
export const RightSidebar = responsiveWrapper({ minWidth: 1128 });
export const BottomSidebar = responsiveWrapper({ maxWidth: 1127 });
