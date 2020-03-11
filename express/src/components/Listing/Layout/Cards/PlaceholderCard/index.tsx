import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  buttonText: string;
  errors?: string[];
  icon?: React.ReactNode;
  onClick: VoidFunction;
  text: string;
};

const PlaceholderCard = ({ buttonText, errors, icon, onClick, text }: Props) => {
  const hasError = errors && errors.length > 0;
  return (
    <div className={css(styles.container, margin.topbottom_3, hasError && styles.containerError)}>
      <div className={css(styles.inner)}>
        {icon &&
          icon
        }
        <p className={css(styles.text)}>
          <Spell word={text} />
        </p>
        <Button
          color="primary"
          hasWhiteText={true}
          noUpperCase={true}
          onClick={onClick}
          variant="contained"
        >
          <Spell
            variant="inherit"
            word={buttonText}
          />
        </Button>
        {hasError &&
          <FormFieldError errors={errors} />
        }
      </div>
    </div>
  );
};

export default PlaceholderCard;
