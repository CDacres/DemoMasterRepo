import * as React from 'react';

// Components
import Section from '@src/components/concrete/Info/Section';
import NavigationBar from '@src/components/concrete/Info/NavigationBar';
import Background from '@src/components/concrete/Info/Background';
import Spacer from '@src/components/concrete/Info/Spacer';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import FullSizeImage from '@src/components/concrete/Info/Images/FullSizeImage';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import ImageText from '@src/components/concrete/Info/Columns/ImageText';
import ImageQuote from '@src/components/concrete/Info/Columns/ImageQuote';
import InfoBanner from '@src/components/concrete/Banners/InfoBanner';

// Data
import { tabs } from '@src/data/info/tabs';

const Benefits = () => (
  <React.Fragment>
    <Section>
      <NavigationBar
        buttonHref="/" // TODO: correct link
        buttonText="info.get_business"
        pageId="benefits"
        tabs={tabs.business}
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
        buttonText="info.get_business"
        name="info.benefits_small_title"
        subtitle="info.benefits_description"
        title="info.benefits_title"
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
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle
        subtitle="info.better_management_subtitle"
        title="info.better_management_title"
      />
    </Section>
    <Section>
      <ImageText
        description="info.save_money_description"
        height="100%"
        imageFirst={true}
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.save_money_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.save_time_description"
        height="100%"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.save_time_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.access_description"
        height="100%"
        imageFirst={true}
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.access_title"
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.benefits_testimonial_title" />
    </Section>
    <Section>
      <ImageQuote
        height="100%"
        imageFirst={true}
        quoteSubText="info.benefits_quote_subtext_one"
        quoteText="info.benefits_quote_one"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <ImageQuote
        height="100%"
        quoteSubText="info.benefits_quote_subtext_two"
        quoteText="info.benefits_quote_two"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <ImageQuote
        height="100%"
        imageFirst={true}
        quoteSubText="info.benefits_quote_subtext_three"
        quoteText="info.benefits_quote_three"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <InfoBanner
      buttonHref="/" // TODO: correct link
      buttonText="info.business_get_started"
      height="100%"
      src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg" // TODO: hardcoded image
      title="info.business_get_started_title"
      width="100%"
    />
  </React.Fragment>
);

export default Benefits;
