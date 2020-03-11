import * as React from 'react';

// Components
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Buttons from '@src/components/concrete/Product/Report/Buttons';
import Section from '@src/components/concrete/Product/Report/Section';
import RadioButton from '@src/components/concrete/Inputs/RadioButton';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

// Data
import { report } from '@src/data/product/report';

type Props = {
  chosenOption?: string; // TODO: remove this fake prop with state to allow moving between options
};

const Report = ({ chosenOption }: Props) => {

  const renderDefault = () => {
    return (
      <React.Fragment>
        <ModalTop
          subtext="room.report_not_shared"
          text="room.report_why_title"
        />
        <section>
          <Section text="room.report_why_title">
            <RadioButton
              defaultOption="0"
              interiorPadding={{
                bottom: '3',
                top: '2',
              }}
              itemBorder={true}
              name="why"
              noBorder={true}
              radioPosition="right"
              options={report.main}
            />
          </Section>
          <Buttons />
        </section>
      </React.Fragment>
    );
  };

  const renderInaccurate = () => {
    return (
      <React.Fragment>
        <ModalTop text="room.report_describe" />
        <section>
          <div>
            <Translatable attributes={{ placeholder: { transKey: 'room.report_describe_placeholder' } }}>
              <StyledInput
                id="inaccurate"
                isBig={true}
                name="inaccurate"
              />
            </Translatable>
          </div>
          <Buttons hasBack={true} />
        </section>
      </React.Fragment>
    );
  };

  const renderScam = () => {
    return (
      <React.Fragment>
        <ModalTop text="room.report_scam_title" />
        <section>
          <Section text="room.report_scam_title">
            <RadioButton
              defaultOption="0"
              interiorPadding={{
                bottom: '3',
                top: '2',
              }}
              itemBorder={true}
              name="scam"
              noBorder={true}
              radioPosition="right"
              options={report.scam}
            />
          </Section>
          <Buttons hasBack={true} />
        </section>
      </React.Fragment>
    );
  };

  const renderOffensive = () => {
    return (
      <React.Fragment>
        <ModalTop text="room.report_offensive_title" />
        <section>
          <Section text="room.report_offensive_title">
            <RadioButton
              defaultOption="0"
              interiorPadding={{
                bottom: '3',
                top: '2',
              }}
              itemBorder={true}
              name="offensive"
              noBorder={true}
              radioPosition="right"
              options={report.offensive}
            />
          </Section>
          <Buttons hasBack={true} />
        </section>
      </React.Fragment>
    );
  };

  const renderOther = () => {
    return (
      <React.Fragment>
        <ModalTop text="room.report_why_title" />
        <section>
          <Section text="room.report_why_title">
            <RadioButton
              defaultOption="0"
              interiorPadding={{
                bottom: '3',
                top: '2',
              }}
              itemBorder={true}
              name="other"
              noBorder={true}
              radioPosition="right"
              options={report.other}
            />
          </Section>
          <Buttons hasBack={true} />
        </section>
      </React.Fragment>
    );
  };

  const renderOption = () => {
    switch (chosenOption) {
      case 'inaccurate': {
        return renderInaccurate();
      }
      case 'scam': {
        return renderScam();
      }
      case 'offensive': {
        return renderOffensive();
      }
      case 'other': {
        return renderOther();
      }
      default: {
        return renderDefault();
      }
    }
  };
  return renderOption();
};

export default Report;
