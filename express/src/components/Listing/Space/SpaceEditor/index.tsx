/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { ListingsV1Space } from '@src/core/domain';

// Components
import Editor from '@src/components/Listing/Editor';
import Headings from '@src/components/Listing/Titles/Headings';
import Container from '@src/components/Listing/Layout/Container';
import Spell from '@src/components/Listing/Translate/Spell';
import SpaceEditorCapacity from '@src/components/Listing/Space/SpaceEditor/SpaceEditorCapacity';
import SpaceEditorCuisine from '@src/components/Listing/Space/SpaceEditor/SpaceEditorCuisine';
import SpaceEditorDescription from '@src/components/Listing/Space/SpaceEditor/SpaceEditorDescription';
import SpaceEditorKind from '@src/components/Listing/Space/SpaceEditor/SpaceEditorKind';
import SpaceEditorPrices from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices';
import SpaceEditorSize from '@src/components/Listing/Space/SpaceEditor/SpaceEditorSize';
import SpaceEditorStock from '@src/components/Listing/Space/SpaceEditor/SpaceEditorStock';
// import SpaceEditorStyle from '@src/components/Listing/Space/SpaceEditor/SpaceEditorStyle';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

type Props = {
  entry: ListingsV1Space;
};

@observer
class SpaceEditor extends Editor<Props, {}, SpaceModel> {

  render() {
    const { entry, model, model: { capacityBloc, category, cuisineBloc, kind, priceBloc, spaceCapacityError, spacePriceError, title } } = this.props;
    if (!model || !entry) {
      return null;
    }
    const showContent = !!category && !!kind;
    const noCapacityError = spaceCapacityError || [];
    const noPriceError = spacePriceError || [];
    return (
      <Container variant="page">
        <Headings tag="h1">
          <Spell word={title} />
        </Headings>
        <SpaceEditorKind
          entry={entry}
          model={model}
        />
        {showContent ? (
          <React.Fragment>
            <SpaceEditorDescription
              entry={entry}
              model={model}
            />
            <SpaceEditorCuisine model={cuisineBloc} />
            <SpaceEditorStock
              entry={entry}
              model={model}
            />
            <SpaceEditorSize model={model} />
            <SpaceEditorCapacity
              errors={noCapacityError}
              model={capacityBloc}
            />
            <SpaceEditorPrices
              errors={noPriceError}
              model={priceBloc}
            />
            {/*<SpaceEditorStyle model={styleBloc} />*/}
          </React.Fragment>
        ) : (
          null
        )}
      </Container>
    );
  }
}

export default SpaceEditor;
