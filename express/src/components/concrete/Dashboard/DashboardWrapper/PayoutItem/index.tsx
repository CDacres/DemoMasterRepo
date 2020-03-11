import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Link from '@src/components/concrete/Dashboard/DashboardWrapper/PayoutItem/Link';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  firstParagraph: string;
  onClick: () => void;
  secondParagraph: string;
  subtitle: string;
  title: string;
};

const PayoutItem = ({ firstParagraph, onClick, secondParagraph, subtitle, title }: Props) => (
  <div className={css(margin.top_4)}>
    <div>
      <div className={css(margin.bottom_2)} />
      <div className={css(margin.bottom_7)}>
        <Translatable content={{ transKey: title }}>
          <div className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
        </Translatable>
        <div className={css(margin.bottom_2)}>
          <Link
            description={firstParagraph}
            href="/" // TODO: correct link
            text="dashboard.go_to_FAQ"
          />
        </div>
        <div className={css(margin.bottom_3)}>
          <div>
            <div>
              <Translatable content={{ transKey: subtitle }}>
                <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
              </Translatable>
              <Link
                description={secondParagraph}
                href="/" // TODO: correct link
                text="common.learn_more"
              />
            </div>
          </div>
        </div>
        <div className={css(margin.topbottom_3)}>
          <Translatable content={{ transKey: 'dashboard.add_payout_method' }}>
            <StyledButton
              action={onClick}
              buttonColor="primary"
              buttonStyle="updated"
            />
          </Translatable>
        </div>
      </div>
    </div>
  </div>
);

export default PayoutItem;
