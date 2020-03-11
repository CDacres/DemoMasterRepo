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
import NumberTitle from '@src/components/concrete/Info/Columns/NumberTitle';
import Title from '@src/components/concrete/Info/Columns/Title';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import { Step } from '@src/components/concrete/Icons/svgs';

// Data
import { tabs } from '@src/data/info/tabs';
import { questions } from '@src/data/info/questions';

const Overview = () => (
  <React.Fragment>
    <Section>
      <NavigationBar
        buttonHref="/" // TODO: correct link
        buttonText="info.get_started"
        pageId="overview"
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
        name="info.overview_small_title"
        subtitle="info.overview_description"
        title="info.overview_title"
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
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Title title="info.why_list_title" />
                <Description text="info.why_list_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Title title="info.we_have_your_back_title" />
                <Description text="info.we_have_your_back_description" />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
    <Section>
      <Spacer />
    </Section>
    <Section>
      <LinedTitle title="info.step_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<Step stylesArray={[pagestyles.icon, pagestyles.icon48]} />} />
                <Title title="info.list_free_title" />
                <Description text="info.list_free_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<Step stylesArray={[pagestyles.icon, pagestyles.icon48]} />} />
                <Title title="info.how_list_title" />
                <Description text="info.how_list_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={2}>
                <Icon icon={<Step stylesArray={[pagestyles.icon, pagestyles.icon48]} />} />
                <Title title="info.welcome_title" />
                <Description text="info.welcome_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.learn_listing"
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
      <LinedTitle title="info.question_title" />
    </Section>
    <Section>
      <ImageQuote
        buttonText="info.learn_how_list"
        height="100%"
        href="/" // TODO: correct link
        quoteSubText="info.overview_quote_subtext"
        quoteText="info.overview_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.payments_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Title title="info.charge_title" />
                <Description text="info.charge_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Title title="info.pay_title" />
                <Description text="info.pay_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={2}>
                <Title title="info.get_paid_title" />
                <Description text="info.get_paid_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.learn_listing"
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
      <ImageQuote
        buttonText="info.learn_how_list"
        height="100%"
        href="/" // TODO: correct link
        imageFirst={true}
        quoteSubText="info.overview_how_quote_subtext"
        quoteText="info.overview_how_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer />
    </Section>
    <Section>
      <LinedTitle title="info.similar_venues_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <NumberTitle
                key={0}
                subtitle="info.stat_venue_num"
                title="2.9M" // TODO: hardcoded number
              />
            ),
            (
              <NumberTitle
                key={1}
                subtitle="info.stat_approved_venues"
                title="800K" // TODO: hardcoded number
              />
            ),
            (
              <NumberTitle
                key={2}
                subtitle="info.stat_new_venues"
                title="14K" // TODO: hardcoded number
              />
            ),
          ]
        }
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.about_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Title title="info.what_title" />
                <Description text="info.what_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Title title="info.why_title" />
                <Description text="info.why_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.why_link"
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
      <LinedTitle title="info.question_answered" />
    </Section>
    <Section>
      <Questions questions={questions.overview} />
    </Section>
    <Section>
      <Spacer />
    </Section>
    {/* TODO: add some kind of carousel */}
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

export default Overview;
