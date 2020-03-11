/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { Ref } from '@src/core';
import { SpaceKindMeta } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Icon from '@src/components/Listing/Icons/Icon';
import Strip from '@src/components/Listing/Layout/Strip';
import ListCard from '@src/components/Listing/Layout/Cards/ListCard';
import PhotoThumb from '@src/components/Listing/Photos/PhotoThumb';

type Props = {
  itemsSource: SpaceKindMeta[];
  onChange: (value: string) => void;
  value?: Ref;
};

class SpaceTypeInput extends React.Component<Props> {
  handleChange = (value) => () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { itemsSource, value } = this.props;
    return (
      <Strip
        margin="8px 0px 0px"
        rowGap="16px"
      >
        <div className={css(styles.wrapper)}>
          {itemsSource.map((i, k) => (
            <ListCard
              cardPaddingType="right"
              hasSelectedIndicator={true}
              isDisabled={i.disabled}
              isSelected={value === i.id}
              key={k}
              name="type"
              onClick={this.handleChange(i.id)}
              stylesArray={{
                area: [styles.area],
                container: [styles.container],
              }}
              text={i.description}
            >
              {!!i.icon ? (
                <Icon
                  icon={i.icon}
                  stylesArray={[styles.icon, i.disabled ? styles.iconDisabled : null]}
                />
              ) : (
                <PhotoThumb
                  src={i.iconUrl}
                  stylesArray={[styles.image, i.disabled ? styles.iconDisabled : null]}
                />
              )}
            </ListCard>
          ))}
        </div>
      </Strip>
    );
  }
}

export default SpaceTypeInput;
