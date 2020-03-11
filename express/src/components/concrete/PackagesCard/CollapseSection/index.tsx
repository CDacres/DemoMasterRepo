import * as React from 'react';
import Collapse from 'react-collapse';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import packageCardStyles from '../styles';
import { margin, padding } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Thumbnails from '@src/components/concrete/Thumbnails';
import Configurations from '@src/components/concrete/Product/Configurations';

// Utils
import { ucfirst } from '@src/utils';

// Types
import { Package } from '@src/typings/types';

type Props = {
  isCollapsed: boolean;
  item: Package;
};

const CollapseSection = ({ isCollapsed, item }: Props) => (
  <Collapse isOpened={isCollapsed}>
    <div className={css(padding.topbottom_2)}>
      <div className={css(isCollapsed && packageCardStyles.collapse)}>
        {item.extras.pictures &&
          <Thumbnails
            // action={} // TODO: add action to open the tour this venue + scroll to right picture/section
            images={item.extras.pictures}
          />
        }
        {item.extras.description &&
          <React.Fragment>
            <Translatable content={{ transKey: 'common.description' }}>
              <div className={css(packageCardStyles.collapseTitle, margin.top_1_25)} />
            </Translatable>
            <div>
              {item.extras.description}
            </div>
          </React.Fragment>
        }
        {item.extras.listOptions &&
          <React.Fragment>
            {item.extras.optionTitle &&
              <div className={css(packageCardStyles.collapseTitle, margin.top_1_25)}>
                {item.extras.optionTitle}
              </div>
            }
            <ul className={css(margin.all_0, padding.left_2)}>
              {item.extras.listOptions.map(option => (
                <li key={shortid.generate()}>
                  {ucfirst(option)}
                </li>
              ))}
            </ul>
          </React.Fragment>
        }
        {item.extras.condensedOptions &&
          <React.Fragment>
            {item.extras.optionTitle &&
              <div className={css(packageCardStyles.collapseTitle, margin.top_1_25)}>
                {item.extras.optionTitle}
              </div>
            }
            {item.extras.condensedOptions.map(option => (
              <div
                className={css(packageCardStyles.condensedRow, margin.top_1, margin.bottom_1_5)}
                key={shortid.generate()}
              >
                <div>
                  {ucfirst(option.title)}
                </div>
                <div className={css(packageCardStyles.condensedDots, margin.leftright_1)} />
                <div>
                  {ucfirst(option.price)}
                </div>
              </div>
            ))}
          </React.Fragment>
        }
        {item.extras.configurations &&
          <Configurations
            configurations={item.extras.configurations}
            stylesArray={[margin.top_1]}
          />
        }
        {(item.times && item.times.length > 1) &&
          <React.Fragment>
            <Translatable content={{ transKey: 'common.times' }}>
              <div className={css(packageCardStyles.collapseTitle, margin.top_1_25)} />
            </Translatable>
            {item.times.map(time => (
              <div key={shortid.generate()}>
                {time}
              </div>
            ))}
          </React.Fragment>
        }
        {item.extras.other &&
          <div className={css(margin.top_1_25)}>
            {item.extras.other}
          </div>
        }
      </div>
    </div>
  </Collapse>
);

export default CollapseSection;
