import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import CheckoutLeftSide from '@src/components/concrete/Checkout/CheckoutLeftSide';
import AmenitiesList from '@src/components/concrete/Checkout/CheckoutLeftSide/AmenitiesList';
import MobileBottomSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MobileBottomSection';
import MotivationSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MotivationSection';
import Title from '@src/components/concrete/Checkout/CheckoutLeftSide/Title';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import RadioButton from '@src/components/concrete/Inputs/RadioButton';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Data
import { amenities, cancellationItems, info, steps } from '@src/data/checkout/info';

type Props = {
  detailsClick: () => void;
  onClick: () => void;
};

const AddOnsStep = ({ detailsClick, onClick }: Props) => (
  <CheckoutLeftSide>
    <Title text={steps.addons.title} />
    <MotivationSection
      description={info.motivationDescription}
      text={info.motivationText}
    />
    <div>
      <div className={css(margin.topbottom_2)}>
        <section>
          <GenericHeader
            stylesArray={[pagestyles.defaultTitle]}
            tag="h2"
          >
            <Translatable content={{ transKey: 'common.amenities' }}>
              <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
            </Translatable>
          </GenericHeader>
        </section>
      </div>
    </div>
    <AmenitiesList amenities={amenities} />
    <div className={css(margin.top_5)}>
      <div>
        <div>
          <div className={css(margin.topbottom_2)}>
            <section>
              <GenericHeader
                stylesArray={[pagestyles.defaultTitle]}
                tag="h2"
              >
                <Translatable content={{ transKey: 'checkout.payments_index_form_flexible_heading' }}>
                  <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                </Translatable>
              </GenericHeader>
            </section>
          </div>
        </div>
        <div>
          <RadioButton
            boldText={true}
            defaultOption="1"
            isLarge={true}
            name="cancellation"
            radioPosition="left"
            options={cancellationItems}
          />
        </div>
      </div>
    </div>
    <ProductLargeScreen>
      {matches => {
        if (matches) {
          return (
            <div>
              <div>
                <div className={css(margin.topbottom_8)}>
                  <div>
                    <div>
                      <Translatable content={{ transKey: steps.addons.buttonText }}>
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
            buttonText={steps.addons.mobileButtonText}
            detailsOnClick={detailsClick}
            price={info.mobilePrice}
            text={info.mobileText}
          />
        );
      }}
    </ProductLargeScreen>
  </CheckoutLeftSide>
);

export default AddOnsStep;
