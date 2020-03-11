import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import CheckoutLeftSide from '@src/components/concrete/Checkout/CheckoutLeftSide';
import CommentSection from '@src/components/concrete/Checkout/CheckoutLeftSide/CommentSection';
import Date from '@src/components/concrete/Checkout/CheckoutLeftSide/Date';
import DropDown from '@src/components/concrete/Checkout/CheckoutLeftSide/DropDown';
import MobileBottomSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MobileBottomSection';
import MotivationSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MotivationSection';
import Title from '@src/components/concrete/Checkout/CheckoutLeftSide/Title';
import Toggle from '@src/components/concrete/Checkout/CheckoutLeftSide/Toggle';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import RadioButton from '@src/components/concrete/Inputs/RadioButton';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Data
import { dates, info, layoutItems, steps } from '@src/data/checkout/info';

type Props = {
  detailsClick: () => void;
  onClick: () => void;
};

const ReviewStep = ({ detailsClick, onClick }: Props) => (
  <CheckoutLeftSide>
    <Title text={steps.review.title} />
    <MotivationSection
      description={info.motivationDescription}
      text={info.motivationText}
    />
    <Date
      dayFrom={dates.from.day}
      dayTo={dates.to.day}
      monthFrom={dates.from.month}
      monthTo={dates.to.month}
      monthShortFrom={dates.from.monthShort}
      monthShortTo={dates.to.monthShort}
      textFrom={dates.from.text}
      textTo={dates.to.text}
      timeFrom={dates.from.time}
      timeTo={dates.to.time}
      title={dates.title}
    />
    <ContentSeparator marginNum={2} />
    <div className={css(margin.bottom_6)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, padding.leftright_1)}>
          <div>
            <div className={css(margin.topbottom_2)}>
              <section>
                <GenericHeader
                  stylesArray={[pagestyles.defaultTitle]}
                  tag="h2"
                >
                  <Translatable content={{ transKey: info.guestsTitle }}>
                    <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                  </Translatable>
                </GenericHeader>
              </section>
            </div>
          </div>
          <DropDown
            title={info.guestsTitle}
            transKey="common.people_count"
          />
        </div>
      </div>
    </div>
    <div className={css(margin.top_5)}>
      <div>
        <fieldset className={css(pagestyles.noBorder, margin.all_0, padding.all_0)}>
          <div>
            <div className={css(margin.topbottom_2)}>
              <section>
                <GenericHeader
                  stylesArray={[pagestyles.defaultTitle]}
                  tag="h2"
                >
                  <Translatable content={{ transKey: 'search.filters_layout' }}>
                    <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                  </Translatable>
                </GenericHeader>
              </section>
            </div>
          </div>
          <div className={css(margin.topbottom_2)}>
            <RadioButton
              boldText={true}
              defaultOption="1"
              isLarge={true}
              name="configuration"
              radioPosition="left"
              options={layoutItems}
            />
          </div>
        </fieldset>
      </div>
    </div>
    <Toggle
      id="accommodation"
      text={info.reviewToggleTitle}
    />
    <CommentSection
      description={info.commentDescription}
      label="input box"
      placeholder={info.commentPlaceholder}
      src={info.ownerImgSrc}
      title={info.commentTitle}
    />
    <ProductLargeScreen>
      {matches => {
        if (matches) {
          return (
            <div>
              <div>
                <div className={css(margin.topbottom_8)}>
                  <div>
                    <div>
                      <Translatable content={{ transKey: steps.review.buttonText }}>
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
            </div>
          );
        }
        return (
          <MobileBottomSection
            agreeOnClick={onClick}
            buttonText={steps.review.mobileButtonText}
            detailsOnClick={detailsClick}
            price={info.mobilePrice}
            text={info.mobileText}
          />
        );
      }}
    </ProductLargeScreen>
  </CheckoutLeftSide>
);

export default ReviewStep;
