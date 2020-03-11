import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import FormFieldLabel from '@src/components/Listing/Form/FormFieldLabel';
import FormFieldSublabel from '@src/components/Listing/Form/FormFieldSublabel';
import FormTip from '@src/components/Listing/Form/FormTip';

// Types
import { FormTipProps } from '@src/components/Listing/Form';

type Props = {
  children: React.ReactNode;
  error?: string[];
  hidden?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  sublabel?: React.ReactNode;
} & FormTipProps;

const FormField = ({ children, error, hidden, label, required, sublabel, tip, tipPopup }: Props) => (
  <div {...(hidden ? { className: css(pagestyles.none) } : {})}>
    <label>
      {label &&
        <FormFieldLabel required={required}>
          {label}
        </FormFieldLabel>
      }
      {sublabel &&
        <FormFieldSublabel>
          {sublabel}
        </FormFieldSublabel>
      }
      {(label || sublabel) ? (
        <div className={css(margin.bottom_1)} />
      ) : (
        null
      )}
      {children}
      <FormFieldError errors={error} />
      <FormTip
        tip={tip}
        tipPopup={tipPopup}
      />
    </label>
  </div>
);

export default FormField;
