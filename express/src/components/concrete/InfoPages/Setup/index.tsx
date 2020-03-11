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
import ColumnLink from '@src/components/concrete/Info/Columns/ColumnLink';
import Description from '@src/components/concrete/Info/Columns/Description';
import Icon from '@src/components/concrete/Info/Columns/Icon';
import ImageQuote from '@src/components/concrete/Info/Columns/ImageQuote';
import ImageText from '@src/components/concrete/Info/Columns/ImageText';
import Title from '@src/components/concrete/Info/Columns/Title';
import InlineTitle from '@src/components/concrete/Info/Titles/InlineTitle';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import { CalendarColor, Keys, PaymentsPayouts,  PropertyDamage } from '@src/components/concrete/Icons/svgs';

// Data
import { tabs } from '@src/data/info/tabs';
import { questions } from '@src/data/info/questions';

const Setup = () => (
  <React.Fragment>
    <Section>
      <NavigationBar
        buttonHref="/" // TODO: correct link
        buttonText="info.get_started"
        pageId="setup"
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
        name="info.setup_small_title"
        subtitle="info.setup_description"
        title="info.setup_title"
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
      <LinedTitle title="info.control_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<PropertyDamage stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.get_bookings_title" />
                <Description text="info.get_bookings_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.set_prices_title" />
                <Description text="info.set_prices_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.set_prices_link"
                />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<CalendarColor stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.coordinate_title" />
                <Description text="info.coordinate_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<Keys stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.rules_title" />
                <Description text="info.rules_description" />
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
      <ImageQuote
        buttonText="info.learn_how_list"
        height="100%"
        href="/" // TODO: correct link
        imageFirst={true}
        quoteSubText="info.setup_quote_subtext"
        quoteText="info.setup_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.advertise_title" />
    </Section>
    <Section>
      <FullSizeImage
        height="440px"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Title title="info.guidance_title" />
                <Description text="info.guidance_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Title title="info.tip_title" />
                <Description text="info.tip_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={2}>
                <Title title="info.global_title" />
                <Description text="info.global_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.global_link"
                />
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
      <LinedTitle title="info.listing_support_title" />
    </Section>
    <Section>
      <ImageText
        description="info.resources_description"
        height="100%"
        imageFirst={true}
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.resources_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.all_day_description"
        height="100%"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.all_day_title"
        width="100%"
      />
    </Section>
    <Section>
      <Spacer />
    </Section>
    <Section>
      <InlineTitle
        href="/" // TODO: correct link
        linkText="info.stat_setup_link"
        title="info.stat_setup_text"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.question_answered" />
    </Section>
    <Section>
      <Questions questions={questions.setup} />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <InfoBanner
      buttonHref="/" // TODO: correct link
      buttonText="info.get_started"
      height="100%"
      src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg" // TODO: hardcoded image
      title="info.earn_title"
      width="100%"
    />
  </React.Fragment>
);

export default Setup;
