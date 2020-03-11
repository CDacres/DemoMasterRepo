import * as React from 'react';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  children?: JSX.Element;
} & ActionLink;

const InteractionButton = ({ action, children }: Props) => (
  <Button
    action={action}
    stylesArray={[styles.button, pagestyles.link, pagestyles.linkUnderlined, padding.all_0]}
  >
    {children}
  </Button>
);

export default InteractionButton;
