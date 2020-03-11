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
import Checklist from '@src/components/concrete/Info/Columns/Checklist';
import ColumnLayout from '@src/components/concrete/Info/Columns/ColumnLayout';
import ColumnLink from '@src/components/concrete/Info/Columns/ColumnLink';
import Description from '@src/components/concrete/Info/Columns/Description';
import Icon from '@src/components/concrete/Info/Columns/Icon';
import IconPoint from '@src/components/concrete/Info/Columns/IconPoint';
import ImageQuote from '@src/components/concrete/Info/Columns/ImageQuote';
import Title from '@src/components/concrete/Info/Columns/Title';
import InlineTitle from '@src/components/concrete/Info/Titles/InlineTitle';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import SafetyTable from '@src/components/concrete/Tables/SafetyTable';
import { AccidentInsurance, AccountSettings, PersonalInfo, PropertyDamage, Speech, TwoWayReviews } from '@src/components/concrete/Icons/svgs';

// Data
import { tabs } from '@src/data/info/tabs';
import { safetyList } from '@src/data/info/page';
import { questions } from '@src/data/info/questions';

const Safety = () => (
  <React.Fragment>
    <Section>
      <NavigationBar
        buttonHref="/" // TODO: correct link
        buttonText="info.get_started"
        pageId="safety"
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
        name="info.safety_small_title"
        subtitle="info.safety_description"
        title="info.safety_title"
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
      <LinedTitle title="info.host_guests_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<TwoWayReviews stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />} />
                <Title title="info.fair_reviews_title" />
                <Description text="info.fair_reviews_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<Speech stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />} />
                <Title title="info.client_communication_title" />
                <Description text="info.client_communication_description" />
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
                <Icon icon={<PersonalInfo stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />} />
                <Title title="info.book_requirements_title" />
                <Description text="info.book_requirements_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<AccountSettings stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconBlue]} />} />
                <Title title="info.your_space_title" />
                <Description text="info.your_space_description" />
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
      <SafetyTable />
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
        quoteSubText="info.safety_quote_subtext"
        quoteText="info.safety_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.confidence_title" />
    </Section>
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<PropertyDamage stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconRed]} />} />
                <Title title="info.damage_protection_title" />
                <Description text="info.damage_protection_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.damage_protection_link"
                />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<AccidentInsurance stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.insurance_title" />
                <Description text="info.insurance_description" />
                <ColumnLink
                  href="/" // TODO: correct link
                  text="info.insurance_link"
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
              <IconPoint
                key={0}
                text="info.point_coverage"
              />
            ),
            (
              <IconPoint
                key={1}
                text="info.point_applies"
              />
            ),
            (
              <IconPoint
                key={2}
                text="info.point_claims"
              />
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
    <Section>
      <LinedTitle title="info.all_day_title" />
    </Section>
    <Section>
      <FullSizeImage
        height="580px"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Checklist
        points={safetyList}
        text="info.team_description"
        title="info.team_title"
      />
    </Section>
    <Section>
      <Spacer />
    </Section>
    <Section>
      <InlineTitle title="info.stat_safety_text" />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.question_answered" />
    </Section>
    <Section>
      <Questions questions={questions.safety} />
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

export default Safety;
