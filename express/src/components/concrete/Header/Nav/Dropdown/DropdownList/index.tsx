/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import LinkWrapper from '@src/components/concrete/LinkWrapper';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Nav } from '@src/typings/types';

type Props = {
  navDropdown: boolean;
  dropdownLinkGroups: Nav.DropdownLinkGroup[];
};

const DropdownList = ({ dropdownLinkGroups, navDropdown }: Props) => (
  <ul
    className={css(styles.list, padding.all_0)}
    role="tree"
  >
    {dropdownLinkGroups.map(dropdownLinkGroup => {
      const filteredLinks = dropdownLinkGroup.links.filter(link => link.shown);
      const item = filteredLinks.map((link, index) => {
        return (
          <li
            key={shortid.generate()}
            role="treeitem"
          >
            <LinkWrapper
              action={link.action}
              attributes={{ title: link.title }}
              className={css(styles.containerLink, padding.leftright_2)}
              href={link.url}
              tel={link.tel}
            >
              <div className={css(styles.contentContainer, padding.topbottom_2, (navDropdown && (index !== filteredLinks.length - 1)) && styles.contentBaselineLine)}>
                <div className={css(styles.contentContainer)}>
                  <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                    <Translatable content={link.title}>
                      <div className={css(styles.text, margin.all_0, padding.topbottom_0)} />
                    </Translatable>
                  </div>
                </div>
              </div>
            </LinkWrapper>
          </li>
        );
      });
      return item;
    })}
  </ul>
);

export default DropdownList;
