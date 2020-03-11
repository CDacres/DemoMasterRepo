/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import sidebarStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import LearnMoreTooltip from '@src/components/concrete/Product/LearnMoreTooltip';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Utils
import { ucfirst } from '@src/utils';

type Props = {
  currency: string;
  deposit?: number;
  ddr: any;
  people: number;
  price?: number;
  time?: any;
  total: number;
  type: string;
};

const SummaryCosts = ({ currency, deposit, ddr, people, price, time, total, type }: Props) => {
  const summary = () => {
    if (type === 'hour') {
      return (
        <span>
          {currency}{price} x {time.timeDuration}
        </span>
      );
    }
    if (type === '1/2 day') {
      return (
        <span>
          {currency}{price} x{' '}
          <Translatable content={{ transKey: 'room.half_a_day_num' }} />
        </span>
      );
    }
    if (type === 'Daily') {
      return (
        <span>
          {currency}{price} x {`${1} `}
          <Translatable content={{ transKey: 'common.day', count: 1, replacements: { number: 1 } }} />
          {/* TODO: allow multiple days to be selected */}
        </span>
      );
    }
    if (type === 'Book Table') {
      return (
        <span>
          <Translatable content={{ transKey: 'room.deposit' }} />{' '}
          {currency}{deposit}{' '}
          <Translatable content={{ transKey: 'room.per_person' }} />
        </span>
      );
    }
    if (type.includes('Private hire entire venue')) {
      return <Translatable content={{ transKey: 'room.private_hire' }} />;
    }
    if (type.includes('Private hire')) {
      return <Translatable content={{ transKey: 'room.private_hire_min_spend' }} />;
    }
    if (ddr) {
      return (
        <span>
          {currency}{ddr.price_person} x{' '}
          <Translatable content={{ transKey: 'common.people_count', count: people, replacements: { number: people } }} />
        </span>
      );
    }
  };

  const summaryCost = () => (
    <span>
      {currency}{total}
    </span>
  );

  return (
    <div className={css(sidebarStyles.summary)}>
      <div className={css(sidebarStyles.itemContainer)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          <span>
            {summary()}
          </span>
          <LearnMoreTooltip
            customStyle={sidebarStyles.tooltip}
            tip="some tip here" // TODO: translation key
          />
        </div>
        <div className={css(pagestyles.tableCellMiddle)}>
          {summaryCost()}
        </div>
      </div>
      <ContentSeparator marginNum={2} />
      <div>
        {ddr &&
          <div>
            <div>
              <div className={css(sidebarStyles.header, margin.bottom_1_25)}>
                {ddr.type}:
              </div>
              <div className={css(sidebarStyles.itemContainer)}>
                <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                  <Translatable content={{ transKey: 'room.room_hire' }} />
                </div>
                <div className={css(pagestyles.tableCellMiddle)}>
                  <Translatable content={{ transKey: 'common.included' }} />
                </div>
              </div>
              {ddr.options.map(el => (
                <div
                  className={css(sidebarStyles.itemContainer)}
                  key={shortid.generate()}
                >
                  <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                    {ucfirst(el)} x
                    <Translatable content={{ transKey: 'common.people_count', count: people, replacements: { number: people } }}>
                      <span className={css(margin.left_0_5)} />
                    </Translatable>
                    <LearnMoreTooltip
                      customStyle={sidebarStyles.tooltip}
                      tip="some tip should be here" // TODO: translation key
                    />
                  </div>
                  <div className={css(pagestyles.tableCellMiddle)}>
                    <Translatable content={{ transKey: 'common.included' }} />
                  </div>
                </div>
              ))}
            </div>
            <ContentSeparator marginNum={2} />
          </div>
        }
      </div>
      <div className={css(sidebarStyles.itemContainer, pagestyles.fontMedium)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          <Translatable content={{ transKey: 'common.total' }} />
        </div>
        <div className={css(pagestyles.tableCellMiddle)}>
          {summaryCost()}
        </div>
      </div>
    </div>
  );
};

export default SummaryCosts;
