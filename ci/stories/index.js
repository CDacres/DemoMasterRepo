import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';

import StarRating from '../src/common/components/star_rating';
import { DealLabel } from '../src/common/components/deal_label';
import { DealLabelFramed } from '../src/common/components/deal_label_framed';
import LoadingAnimation from '../src/common/components/loading_animation';
import Button from '../src/common/components/buttons';
import {
    TextInput,
    // TelephoneInput,
    SubmitButton,
    RadioBlock,
    Select,
} from '../src/common/components/forms';

storiesOf('Deal Labels', module)
.addDecorator(centered)
.add('High Demand', () => (
    <DealLabel text="High Demand" className="high-demand" />
))
.add('Highly Rated', () => (
    <DealLabel text="Highly Rated" className="highly-rated" />
))
.add('Best Seller', () => (
    <DealLabel text="Best Seller" className="regularly-booked" />
))
.add('Excellent Deal', () => (
    <DealLabel text="Excellent Deal" className="excellent-deal" />
));

storiesOf('Framed Deal Labels', module)
.addDecorator(centered)
.add('Highly Rated', () => (
    <DealLabelFramed text="Highly Rated" className="highly-rated" glyphicon="star" />
))
.add('Best Seller', () => (
    <DealLabelFramed text="Best Seller" className="regularly-booked" glyphicon="certificate" />
))
.add('Excellent Deal', () => (
    <DealLabelFramed text="Excellent Deal" className="excellent-deal" glyphicon="fire" />
));

storiesOf('Buttons', module)
.addDecorator(centered)
.add('Default', () => (
    <Button
        text="Default"
        theme="default"
    />
))
.add('Primary', () => (
    <Button
        text="Primary"
        theme="primary"
    />
))
.add('Success', () => (
    <Button
        text="Success"
        theme="success"
    />
))
.add('Warning', () => (
    <Button
        text="Warning"
        theme="warning"
    />
))
.add('Danger', () => (
    <Button
        text="Danger"
        theme="danger"
    />
));

storiesOf('Forms', module)
.addDecorator(centered)
.add('Text Input', () => (
    <div>
        <TextInput
            labelText="First name"
            name="first_name"
            required={true}
        />
        <TextInput
            labelText="First name"
            name="first_name"
            required={false}
        />
    </div>
))
.add('Submit Button', () => (
    <SubmitButton
        value="Submit"
    />
))
.add('Radio Block', () => (
    <RadioBlock
        items={[
            {
                content: {
                    text: 'Item 1',
                },
                id: "1",
                value: "1",
                name: "test",
            },
            {
                content: {
                    text: 'Item 2',
                },
                id: "2",
                value: "2",
                name: "test",
            },
            {
                content: {
                    text: 'Item 3',
                },
                id: "3",
                value: "3",
                name: "test",
            }
        ]}
    />
))
.add('Select', () => (
    <Select
        id="select"
        name="select"
        className=""
        defaultOption={{
            value: -1,
            text: 'Default Option',
            disabled: true,
        }}
        options={[
            {
                value: 1,
                text: 'Option 1',
            },
            {
                value: 2,
                text: 'Option 2',
            },
            {
                value: 3,
                text: 'Option 3',
            },
            {
                value: 4,
                text: 'Option 4',
            }
        ]}
    />
));

storiesOf('Reviews', module)
.addDecorator(centered)
.add('Stars', () => (
    <StarRating rating="3.75" />
));

storiesOf('Loading Animations', module)
.addDecorator(centered)
.add('Dots', () => (
    <LoadingAnimation isLoading />
));
