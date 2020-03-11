import * as React from 'react';
import pick from 'lodash/pick';
import values from 'lodash/values';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Selectors
import { countArrayLengths } from '@src/store/selectors';

// Components
import MobileFilterPanelComponent from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelComponent';
import MobileFilterPanelContent from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent';
import MobileFilterPanelFooter from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelFooter';
import MobileFilterPanelHeader from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelHeader';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Types
import { Store, ActionsTrigger } from '@src/typings/types';

type Props = {
  canClear: boolean;
  children: (childProps?: any) => JSX.Element;
  // filterStateSelector: FilterStateSelector;
  groupedDataPoints?: string[];
  lang: Store.Lang;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  search: { params: Store.Search.Params };
  setButtonText: (buttonText: string) => void;
  toggleCanClear?: (bool?: boolean) => void;
};

type State = {
  transform3d: number;
};

class MobileFilterPanelContainer extends React.PureComponent<Props, State> {
  state: State = { transform3d: 100 };

  protected childActionTriggers: ActionsTrigger[] = [];
  protected childClearTriggers: ActionsTrigger[] = [];
  protected translationHelper;

  constructor(props: Props) {
    super(props);
    const { lang } = props;
    this.translationHelper = new TranslationHelper({ messages: lang });
    // const count = checkCanClear
    // if (date) {
    //   this.generateButtonText();
    //   toggleCanClear(true);
    // }
  }

  // componentDidMount() {
  //   this.animateValue(100, 0, 50);
  // }

  // animateValue = (start, end, duration) => {
  //   return new Promise(resolve => {
  //     const range = end - start;
  //     const increment = end > start ? 1 : -1;
  //     const stepTime = Math.abs(Math.floor(duration / range));
  //     let current = start;
  //     const timer = setInterval(() => {
  //         current += increment;
  //         this.setState({ transform3d: current });
  //         if (current === end) {
  //             clearInterval(timer);
  //             resolve();
  //         }
  //     }, stepTime);
  //   });
  // }

  checkCanClear = (): number => {
    const { groupedDataPoints, search: { params } } = this.props;
    const data = pick(params, groupedDataPoints);
    const dataArrays = values(data);
    const count = countArrayLengths(...dataArrays);
    return count;
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    // TODO: Translation key
    const defaultButtonText = this.translationHelper.get('Filters');
    const count = this.checkCanClear();
    setButtonText((count > 0) ? `${defaultButtonText} · ${count}` : defaultButtonText);
  }

  handleApply = async (): Promise<any> => {
    if (this.childActionTriggers.length) {
      await Promise.all(this.childActionTriggers.map(async trigger => {
        await trigger();
      }));
    }
    this.generateButtonText();
    this.props.onApply();
  }

  handleClear = async (): Promise<any> => {
    await Promise.all(this.childClearTriggers.map(async trigger => {
      await trigger();
    }));
    this.generateButtonText();
    this.props.onClear();
  }

  handleClose = async (): Promise<any> => {
    // const { onClose } = this.props;
    // await this.animateValue(0, 100, 50);
    await this.handleApply();
    // onClose();
  }

  sendTriggersToParent = (fireActions: ActionsTrigger, clearAction: ActionsTrigger): void => {
    this.childActionTriggers.push(fireActions);
    this.childClearTriggers.push(clearAction);
  }

  // toggleCanClear = (bool: boolean): void => {
  //   const { toggleCanClear } = this.props;
  //   if (toggleCanClear) {
  //     toggleCanClear(bool);
  //   }
  // }

  render() {
    const { canClear, children, onClear } = this.props;
    // const { transform3d } = this.state;
    return (
      <MobileFilterPanelComponent
        // transform3d={transform3d}
      >
        <React.Fragment>
          <MobileFilterPanelHeader
            canClear={canClear}
            onClear={onClear}
            onClose={this.handleClose}
          />
          <MobileFilterPanelContent>
            {children({ sendTriggersToParent: this.sendTriggersToParent })}
          </MobileFilterPanelContent>
          <MobileFilterPanelFooter onApply={this.handleApply} />
        </React.Fragment>
      </MobileFilterPanelComponent>
    );
  }
}

export default useLang(useSearch(MobileFilterPanelContainer));
