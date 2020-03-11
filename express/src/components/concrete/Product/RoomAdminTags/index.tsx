/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Connectors
import { useSearch } from '@src/store/connectors';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import AdminInfo from '@src/components/concrete/Product/RoomAdminCard/AdminInfo';
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';
import GenericCard from '@src/components/concrete/GenericCard';
import InteractionLink from '@src/components/concrete/InteractionLink';
import Modal from '@src/components/concrete/Modal';

// Types
import { Store } from '@src/typings/types';

export type RoomAdminTagsProps = {
  assetTags: Array<{
    name: string;
    tags: Array<{
      id: number;
      name: string;
    }>;
  }>;
  search: { tags: Store.Search.Tags };
  verticalId: number;
};

type State = {
  chosenAsset: {
    name: string;
    tags: Array<{
      id: number;
      name: string;
    }>;
  };
  tagOpen: boolean;
};

class RoomAdminTags extends React.PureComponent<RoomAdminTagsProps, State> {
  constructor(props: RoomAdminTagsProps) {
    super(props);
    this.state = {
      chosenAsset: null,
      tagOpen: false,
    };
  }

  toggleAssetTags = () => {
    this.setState({
      ...this.state,
      tagOpen: !this.state.tagOpen,
    });
  }

  chooseAsset = (item) => {
    this.toggleAssetTags();
    this.setState({
      chosenAsset: item,
    });
  }

  somethingHappened = () => {
    // console.log(e);
  }

  render() {
    const { assetTags, search: { tags: { tags } }, verticalId } = this.props;
    const { chosenAsset, tagOpen } = this.state;
    return (
      <React.Fragment>
        {(assetTags && assetTags.length > 0) &&
          <section id="tags">
            <div className={css(margin.bottom_3)}>
              <GenericCard boxShadow="none">
                <AccentUpperText text="room.tags" />
                <React.Fragment>
                  {assetTags.map(space => (
                    <div
                      className={css(margin.top_1_5)}
                      key={shortid.generate()}
                    >
                      <AdminInfo transKey={space.name}>
                        <span className={css(margin.left_0_5)}>
                          {space.tags.map(item => item.name).join(', ')}
                        </span>
                        <span className={css(margin.left_0_5)}>
                          <InteractionLink
                            action={() => this.chooseAsset(space)}
                            className={css(pagestyles.link)}
                          >
                            <Translatable content={{ transKey: 'common.edit' }} />
                          </InteractionLink>
                        </span>
                      </AdminInfo>
                    </div>
                  ))}
                </React.Fragment>
              </GenericCard>
            </div>
            {tagOpen &&
              <Modal action={this.toggleAssetTags}>
                <React.Fragment>
                  <header>
                    <div>
                      <GenericHeader text={chosenAsset.name} />
                    </div>
                  </header>
                  <section>
                    <ContentSeparator marginNum={3} />
                    {tags.filter(vertical => vertical.tag.parent_id === verticalId || vertical.tag.id === verticalId).filter(include => include.preferred === 1).map(el => (
                      <React.Fragment key={shortid.generate()}>
                        <div className={css(pagestyles.table)}>
                          <div className={css(pagestyles.tableCellMiddle)}>
                            <div className={css(margin.right_1)}>
                              <input
                                checked={chosenAsset.tags.find(x => x.id === el.tag_id) ? true : false}
                                id={el.tag_id}
                                name={el.name}
                                onChange={this.somethingHappened}
                                type="checkbox"
                                value={el.name}
                              />
                            </div>
                          </div>
                          <div className={css(pagestyles.tableCellMiddle)}>
                            {el.name}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </section>
                </React.Fragment>
              </Modal>
            }
          </section>
        }
      </React.Fragment>
    );
  }
}

export default useSearch(RoomAdminTags);
