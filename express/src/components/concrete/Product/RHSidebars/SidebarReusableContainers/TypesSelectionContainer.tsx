import * as React from 'react';

// Components
import Label from '@src/components/concrete/Label';
import OptionGroup from '@src/components/concrete/Dropdown/OptionGroup';
import Select from '@src/components/concrete/Dropdown/Select';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  select?: (prop: any, e: any) => void;
  stepBack?: () => void;
  title?: string;
  type?: any;
  types?: any;
};

const TypesSelectionContainer = ({ select, stepBack, title, type, types }: Props) => {
  const chooseType = (e) => {
    select('type', e);
  };
  return (
    <div>
      <Label>
        <Translatable content={{ transKey: 'common.type' }} />
      </Label>
      {type ? (
        <Select action={stepBack}>
          {title}
        </Select>
      ) : (
        <OptionGroup
          chosen={chooseType}
          options={types}
        />
      )}
    </div>
  );
};

export default TypesSelectionContainer;
