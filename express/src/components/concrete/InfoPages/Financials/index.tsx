/* tslint:disable:max-line-length */
import * as React from 'react';

// Styles
import { pagestyles } from '@src/styles';

// Components
import Spacer from '@src/components/concrete/Info/Spacer';
import NavigationBar from '@src/components/concrete/Info/NavigationBar';
import Background from '@src/components/concrete/Info/Background';
import InfoBanner from '@src/components/concrete/Banners/InfoBanner';
import Section from '@src/components/concrete/Info/Section';
import FullSizeImage from '@src/components/concrete/Info/Images/FullSizeImage';
import Questions from '@src/components/concrete/Info/Questions';
import ColumnLayout from '@src/components/concrete/Info/Columns/ColumnLayout';
import Description from '@src/components/concrete/Info/Columns/Description';
import Icon from '@src/components/concrete/Info/Columns/Icon';
import ImageQuote from '@src/components/concrete/Info/Columns/ImageQuote';
import ImageText from '@src/components/concrete/Info/Columns/ImageText';
import Title from '@src/components/concrete/Info/Columns/Title';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import FinancialTable from '@src/components/concrete/Tables/FinancialTable';
import { Bottle, CalendarColor } from '@src/components/concrete/Icons/svgs';

// Data
import { tabs } from '@src/data/info/tabs';
import { questions } from '@src/data/info/questions';

const Financials = () => (
  <React.Fragment>
    <Section>
      <NavigationBar
        buttonHref="/" // TODO: correct link
        buttonText="info.get_started"
        pageId="financials"
        tabs={tabs.how_to}
      />
    </Section>
    <Section>
      <Background />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <TopTitle
        buttonHref="/" // TODO: correct link
        buttonText="info.get_started"
        name="info.financials_small_title"
        subtitle="info.financials_description"
        title="info.financials_title"
      />
    </Section>
    <Section>
      <FullSizeImage
        height="440px"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer />
    </Section>
    <Section>
      <LinedTitle
        subtitle="info.simple_payment_subtitle"
        title="info.simple_payment_title"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon circleText="1" />
                <Title title="info.list_free_title" />
                <Description text="info.list_free_advertise_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon circleText="2" />
                <Title title="info.receive_booking_title" />
                <Description text="info.receive_booking_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={2}>
                <Icon circleText="3" />
                <Title title="info.get_paid_month_title" />
                <Description text="info.get_paid_month_description" />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <FinancialTable />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <ImageQuote
        buttonText="info.learn_how_list"
        height="100%"
        href="/" // TODO: correct link
        imageFirst={true}
        quoteSubText="info.financials_quote_subtext"
        quoteText="info.financials_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.great_price_title" />
    </Section>
    <Section>
      <ImageText
        description="info.trusted_pricing_description"
        height="100%"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.trusted_pricing_title"
        width="100%"
      />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<Bottle stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />} />
                <Title title="info.extra_money_title" />
                <Description text="info.extra_money_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<CalendarColor stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />} />
                <Title title="info.custom_needs_title" />
                <Description text="info.custom_needs_description" />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.question_answered" />
    </Section>
    <Section>
      <Questions questions={questions.financials} />
    </Section>
    <InfoBanner
      buttonHref="/" // TODO: correct link
      buttonText="info.get_started"
      height="100%"
      src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg" // TODO: hardcoded image
      title="info.earn_title"
      width="100%"
    />
    <Section>
      <Spacer />
    </Section>
  </React.Fragment>
);

export default Financials;
