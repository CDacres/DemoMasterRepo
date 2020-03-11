import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { exampleHtml } from './data';

import Container from './container';

// import Editor from '@src/components/abstract/Editor';
import HtmlTextBlock from '@src/components/concrete/HtmlTextBlock';
// import TextBlockWithEditor from '@src/components/concrete/TextBlockWithEditor';

storiesOf('HTML Text Block', module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('editor', () => {
    // const data = {
    //   htmlTextBlock: {
    //     html: exampleHtml
    //   }
    // };
    return (
      <div>This needs fixing</div>
      // {/* <Editor html={data.htmlTextBlock.html} /> */}
    );
  })
  .add('text block', () => {
    const data = {
      htmlTextBlock: {
        html: exampleHtml
      }
    };
    return (
      <HtmlTextBlock html={data.htmlTextBlock.html} />
    );
  })
  .add('text block with editor', () => {
    // const data = {
    //   htmlTextBlock: {
    //     html: exampleHtml
    //   }
    // };
    // const onSave = html => {
    //   data.htmlTextBlock.html = html;
    // };
    return (
      <div>This needs fixing</div>
      // {/* <TextBlockWithEditor
      //   html={data.htmlTextBlock.html}
      //   onSave={onSave}
      // /> */}
    );
  });
