import * as React from 'react';
import { node, string } from 'prop-types';

import '@src/styles/font.css';

const Container = ({ children, width }) => (
  <div
    style={{
      margin: '0px auto',
      position: 'relative',
      paddingLeft: '24px',
      paddingRight: '24px',
      maxWidth: '1080px',
      width: width || '100%'
    }}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: node.isRequired,
  width: string
};

export default Container;
