import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import Avatar from '@src/components/concrete/Avatar';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

type Props = {
  description: string;
  label: string;
  placeholder: string;
  src: string;
  title: string;
};

const CommentSection = ({ description, label, placeholder, src, title }: Props) => (
  <div className={css(margin.bottom_6)}>
    <div>
      <div className={css(margin.bottom_4)}>
        <div>
          <div className={css(styles.headerContainer)}>
            <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
              <div>
                <div className={css(margin.bottom_1)}>
                  <div className={css(pagestyles.subtitle, pagestyles.fontMedium, margin.all_0)}>
                    <Translatable content={{ transKey: title }}>
                      <GenericHeader
                        stylesArray={[pagestyles.defaultTitle]}
                        tag="h1"
                      />
                    </Translatable>
                  </div>
                </div>
                <Translatable content={{ transKey: description }}>
                  <div className={css(pagestyles.text, margin.all_0)} />
                </Translatable>
              </div>
            </div>
            <Avatar
              customStyle={[styles.img]}
              height="48px"
              needsMargin={false}
              src={src}
              width="48px"
            />
          </div>
        </div>
      </div>
      <StyledInput
        id="message_to_host"
        isBig={true}
        label={label}
        name="message_to_host"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default CommentSection;
