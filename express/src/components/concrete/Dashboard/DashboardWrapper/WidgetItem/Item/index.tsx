import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Code from '@src/components/concrete/Dashboard/DashboardWrapper/WidgetItem/Item/Code';

type Props = {
  domain: string;
  isLink?: boolean;
  text: string;
  token: string;
};

const Item = ({ domain, isLink, text, token }: Props) => {
  const href = `https://www.zipcube.com/${domain}/widget/?token=${token}`;
  const buttonCode =
`<script src="https://www.zipcube.com/js/widget/dist.js"></script>
<div id="zc_widget"></div>
<script>
  customiseWidget({
  assetToken: '${token}',
  domain: '${domain}',
  widgetType: 'button',
  widgetText: '${text}',
  textCase: 'uppercase',
  backgroundColor: '#00c6ff',
  backgroundColorHover: '#00a2d1',
  textColor: '#fff',
  borderColor: '#00c6ff',
  textColorHover: '#fff',
  borderColorHover: '#00a2d1',
  borderBottomColor: '#00a2d1',
  subtextColor: 'black'
});
</script>`;
  const anchorCode = `<a href="${href}" target="_blank">${text}</a>`;
  return (
    <div className={css(padding.topbottom_3)}>
      <div className={css(styles.container)}>
        {!isLink ? (
          <React.Fragment>
            <div className={css(styles.textWrapper, pagestyles.tableCellMiddle)}>
              <div
                id="zc_widget"
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  maxWidth: '180px',
                }}
              >
                <a
                  href={href}
                  id="asset_link"
                  style={{
                    textDecoration: 'none',
                  }}
                  target="_blank"
                >
                  <button
                    id="zc_book_now"
                    style={{
                      color: '#ffffff',
                      borderColor: 'currentcolor currentcolor #00a2d1',
                      borderStyle: 'none none solid',
                      borderWidth: '0px 0px 1px',
                      background: '#00c6ff none repeat scroll 0% 0%',
                      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif !important',
                      fontWeight: 500,
                      fontSize: '12px',
                      padding: '12px 18px',
                      lineHeight: 1,
                      textAlign: 'center',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      outline: 'currentcolor none medium',
                      display: 'block',
                      margin: '0px auto',
                    }}
                  >
                    {text}
                  </button>
                </a>
                <Translatable content={{ transKey: 'dashboard.widget_powered_by' }}>
                  <span
                    style={{
                      color: 'black',
                      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif !important',
                      fontSize: '8px',
                      verticalAlign: 'middle',
                      marginRight: '3px',
                    }}
                  />
                </Translatable>
                <img
                  src="//www.zipcube.com/css/images/logo/tiny_logo_black_full.svg"
                  // TODO: stop using CI images (eventually...)
                  style={{
                    width: '60px',
                    verticalAlign: 'middle',
                  }}
                />
              </div>
            </div>
            <Code text={buttonCode} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={css(styles.textWrapper, pagestyles.tableCellMiddle)}>
              <a
                className={css(pagestyles.link)}
                href={href}
                rel="noopener"
                target="_blank"
              >
                {text}
              </a>
            </div>
            <Code text={anchorCode} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Item;
