import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { ListingsV1Space } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import IconCloseButton from '@src/components/Listing/Buttons/IconCloseButton';
import SpaceEditor from '@src/components/Listing/Space/SpaceEditor';
import Container from '@src/components/Listing/Layout/Container';
import Row from '@src/components/Listing/Layout/Row';
import Strip from '@src/components/Listing/Layout/Strip';
import Dialog from '@src/components/Listing/Dialog';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

type Props = {
  entry: ListingsV1Space;
  model: SpaceModel;
  onClose: VoidFunction;
};

type State = {
  buttonLoading: boolean;
};

@observer
class SpaceDialog extends React.Component<Props, State> {
  state: State = { buttonLoading: false };

  handleSaveSpace = () => {
    const { model } = this.props;
    this.setState({ buttonLoading: !this.state.buttonLoading });
    model.submit().then(() => {
      this.setState({ buttonLoading: !this.state.buttonLoading });
    });
  }

  render() {
    const { entry, model, onClose } = this.props;
    const { buttonLoading } = this.state;
    return (
      <Dialog
        fullScreen={true}
        onClose={onClose}
        open={true}
        scroll="paper"
      >
        <DialogContentSection>
          <IconCloseButton
            isLarge={true}
            onClick={onClose}
          />
          <Strip
            col="1 / span 2"
            row="1 / span 2"
          >
            <SpaceEditor
              entry={entry}
              model={model}
            />
            <div className={css(styles.spacer)} />
          </Strip>
        </DialogContentSection>
        <div className={css(styles.container)}>
          <Container variant="page">
            <Row
              gap="40px"
              mainAlignment="flex-end"
              style={{ justifyContent: 'flex-end' }}
            >
              <Button
                className={css(styles.button)}
                hasLargePadding={true}
                onClick={onClose}
                size="large"
              >
                <Spell
                  variant="inherit"
                  word="common.cancel"
                />
              </Button>
              <Button
                className={css(styles.button)}
                color="primary"
                hasBoldText={true}
                hasLargePadding={true}
                hasWhiteText={true}
                size="large"
                variant="contained"
                {...(!buttonLoading ? { onClick: this.handleSaveSpace } : {})}
              >
                {!buttonLoading ? (
                  <Spell
                    variant="inherit"
                    word="common.save"
                  />
                ) : (
                  <LoadingAnimation
                    smallDot={true}
                    spacing="dotsWrapperButton"
                    whiteDot={true}
                  />
                )}
              </Button>
            </Row>
          </Container>
        </div>
      </Dialog>
    );
  }
}

export default SpaceDialog;
