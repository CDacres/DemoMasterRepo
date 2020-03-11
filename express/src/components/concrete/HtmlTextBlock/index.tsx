import * as React from 'react';

// Styles
// tslint:disable-next-line
import './styles.css';

type Props = {
  hasLineBottom?: boolean;
  hasLineTop?: boolean;
  html: string;
};

class HtmlTextBlock extends React.PureComponent<Props> {
  getTrustedHtml = () => ({
    __html: this.props.html,
  })

  render() {
    const { hasLineBottom, hasLineTop } = this.props;
    return (
      <div className="add_text">
        {hasLineTop &&
          <hr />
        }
        <div
          className="text_container"
          dangerouslySetInnerHTML={this.getTrustedHtml()}
        />
        {hasLineBottom &&
          <hr />
        }
      </div>
    );
  }
}

export default HtmlTextBlock;
