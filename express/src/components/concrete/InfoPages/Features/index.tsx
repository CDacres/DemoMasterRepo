import * as React from 'react';

// Components
import Section from '@src/components/concrete/Info/Section';
import NavigationBar from '@src/components/concrete/Info/NavigationBar';
import Background from '@src/components/concrete/Info/Background';
import Spacer from '@src/components/concrete/Info/Spacer';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import FullSizeImage from '@src/components/concrete/Info/Images/FullSizeImage';
import ImageText from '@src/components/concrete/Info/Columns/ImageText';
import ImageQuote from '@src/components/concrete/Info/Columns/ImageQuote';
import InfoBanner from '@src/components/concrete/Banners/InfoBanner';

// Data
import { tabs } from '@src/data/info/tabs';

const Features = () => (
  <React.Fragment>
    <Section>
      <NavigationBar
        buttonHref="/" // TODO: correct link
        buttonText="info.get_business"
        pageId="features"
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
        name="info.features_small_title"
        subtitle="info.features_description"
        title="info.features_title"
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
      <LinedTitle title="info.manage_title" />
    </Section>
    <Section>
      <ImageText
        description="info.book_venues_description"
        height="100%"
        imageFirst={true}
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.book_venues_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.billing_description"
        height="100%"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.billing_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.reporting_description"
        height="100%"
        imageFirst={true}
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.reporting_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.payment_description"
        height="100%"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.payment_title"
        width="100%"
      />
    </Section>
    <Section>
      <ImageText
        description="info.personal_description"
        height="100%"
        imageFirst={true}
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        title="info.personal_title"
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <Section>
      <LinedTitle title="info.features_testimonial_title" />
    </Section>
    <Section>
      <ImageQuote
        height="100%"
        imageFirst={true}
        quoteSubText="info.features_quote_subtext"
        quoteText="info.features_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
        width="100%"
      />
    </Section>
    <Section>
      <Spacer isLarge={true} />
    </Section>
    <InfoBanner
      buttonHref="/" // TODO: correct link
      buttonText="info.get_business"
      height="100%"
      src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg" // TODO: hardcoded image
      title="info.easy_title"
      width="100%"
    />
  </React.Fragment>
);

export default Features;
