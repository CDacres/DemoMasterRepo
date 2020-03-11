/* tslint:disable:max-line-length */
import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';
import { css } from 'aphrodite/no-important';

// Core
import { AssetImageEdge } from '@src/core/domain';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

// Connectors
import { useAuth } from '@src/store/connectors';

// Components
import EagleVision from '@src/components/abstract/Permissions/EagleVision';
import Row from '@src/components/Listing/Layout/Row';
import Download from '@src/components/Listing/Icons/Download';
import Pen from '@src/components/Listing/Icons/Pen';
import RecycleBin from '@src/components/Listing/Icons/RecycleBin';
import Spell from '@src/components/Listing/Translate/Spell';

// Functions
import { downloadOriginal } from '@src/components/Listing/Photos/PhotoThumb/DownloadImage';

// Types
import { Store } from '@src/typings/types';

type Props = {
  allowDownload?: boolean;
  auth: Store.Auth;
  edge?: AssetImageEdge;
  isCover?: boolean;
  onEdit?: VoidFunction;
  onRemove?: (image: AssetImageEdge) => void;
  orderIndex?: number;
  src?: string;
  stylesArray?: object[];
} & InjectedOnClickOutProps;

type State = {
  confirmRemove: boolean;
};

class PhotoThumb extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { confirmRemove: false };
  }

  toggleRemove = (e: any): void => {
    e.stopPropagation();
    this.setState({ confirmRemove: true });
  }

  removeEdge = (edge: AssetImageEdge) => (e) => {
    e.stopPropagation();
    this.props.onRemove(edge);
    this.setState({ confirmRemove: false });
  }

  handleClickOutside = () => {
    this.setState({ confirmRemove: false });
  }

  downloadOriginal = (edge: AssetImageEdge) => (e) => {
    const { auth } = this.props;
    e.stopPropagation();
    if (edge.image.downloadLink !== null) {
      downloadOriginal(edge.image.downloadLink, edge.image.id, auth.tokens.dataApi);
    }
  }

  render() {
    const { allowDownload, edge, isCover, onEdit, onRemove, orderIndex, src, stylesArray } = this.props;
    const { confirmRemove } = this.state;
    return (
      <div {...(stylesArray ? { className: css(stylesArray) } : {})}>
        <div
          className={css(styles.container)}
          style={{ backgroundImage: `url("${edge ? edge.image.urls.thumbUrl : src}")` }}
        >
          {(allowDownload || onRemove) ? (
            <div className={css(styles.innerContainers, styles.bottomContainers, styles.rightContainers)}>
              <Row gap="8px">
                <EagleVision>
                  <div
                    className={css(styles.eventContainers, padding.top_0_5, padding.leftright_0_5)}
                    onClick={this.downloadOriginal(edge)}
                  >
                    <Download />
                  </div>
                </EagleVision>
                {onRemove ? (
                  <div
                    className={css(styles.eventContainers, padding.top_0_5, padding.leftright_0_5, confirmRemove ? [styles.confirm, padding.bottom_0_5] : null)}
                    onClick={!confirmRemove ? this.toggleRemove : this.removeEdge(edge)}
                  >
                    {!confirmRemove ? (
                      <RecycleBin />
                    ) : (
                      <span>
                        <Spell word="listing.confirm_image" />
                      </span>
                    )}
                  </div>
                ) : (
                  null
                )}
              </Row>
            </div>
          ) : (
            null
          )}
          {isCover ? (
            <div className={css(styles.innerContainers, styles.topContainers, styles.leftContainers, styles.order, styles.coverContainer, padding.all_0_5)}>
              <span className={css(styles.coverText)}>
                <Spell word="listing.cover_photo" />
              </span>
            </div>
          ) : (orderIndex &&
            <div className={css(styles.innerContainers, styles.topContainers, styles.leftContainers, styles.order, styles.indexContainer, padding.all_0_5)}>
              <span className={css(styles.coverText)}>
                {orderIndex}
              </span>
            </div>
          )}
          {onEdit ? (
            <div
              className={css(styles.innerContainers, styles.topContainers, styles.rightContainers, styles.eventContainers, padding.top_0_5, padding.leftright_0_5)}
              onClick={onEdit}
            >
              <Pen />
            </div>
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default useAuth(onClickOutside(PhotoThumb));
