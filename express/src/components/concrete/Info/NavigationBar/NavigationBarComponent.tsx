import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import ListItem from '@src/components/concrete/Info/NavigationBar/ListItem';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  buttonHref: string;
  buttonText: string;
  pageId: string;
  sticky: boolean;
  tabs: Array<{
    href: string;
    id: string;
    text: string;
  }>;
};

const NavigationBarComponent = ({ buttonHref, buttonText, pageId, sticky, tabs }: Props) => (
  <div>
    <div className={css(styles.wrapper, padding.topbottom_0, sticky ? styles.sticky : null)}>
      <div className={css(styles.container)}>
        <div className={css(pagestyles.block)}>
          <div>
            <div className={css(styles.listContainer)}>
              <div className={css(pagestyles.tableCellMiddle, pagestyles.fullColumn)}>
                <ul className={css(styles.list, margin.all_0, padding.topbottom_0, padding.left_3, padding.right_0)}>
                  {tabs.map((item, index) => (
                    <ListItem
                      href={item.href}
                      isCurrent={item.id === pageId}
                      key={index}
                      text={item.text}
                    />
                  ))}
                </ul>
              </div>
              <div className={css(pagestyles.tableCellMiddle)}>
                <div className={css(styles.buttonWrapper, padding.right_3, padding.right_0_large)}>
                  <div className={css(styles.buttonContainer, padding.left_3, padding.right_2)}>
                    <div className={css(styles.inner, padding.top_0)}>
                      <Translatable content={{ transKey: buttonText }}>
                        <StyledButton
                          buttonColor="primary"
                          customSpanStyle={[styles.span]}
                          customStyle={[styles.button]}
                          href={buttonHref}
                        />
                      </Translatable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentSeparator marginNum={0} />
    </div>
  </div>
);

export default NavigationBarComponent;
