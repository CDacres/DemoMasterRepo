import * as React from 'react';

// MaterialUI
import { Slider as SliderUI } from '@material-ui/lab';

type Props = {
  max: number;
  min: number;
  onChange: (event: React.ChangeEvent<{}>, value: number) => void;
  value: number;
};

const Slider = ({ max, min, onChange, value }: Props) => (
  <SliderUI
    max={max}
    min={min}
    onChange={onChange}
    value={value}
  />
);

export default Slider;
