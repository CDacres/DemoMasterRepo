
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import RCSlider from 'rc-slider';
import SliderHandle from './SliderHandle';

import styles from './styles.js';

const createSliderWithTooltip = RCSlider.createSliderWithTooltip;
const Range = createSliderWithTooltip(RCSlider.Range);

class Slider extends Component {
    constructor() {
        super();
        this.drawHistogram = this.drawHistogram.bind(this);
        this.formatTip = this.formatTip.bind(this);
    }

    componentWillMount() {
        // google.charts.load('current', { packages: ['corechart'] });
    }

    componentDidMount() {
        // const { drawHistogram } = this;
        // google.charts.setOnLoadCallback(drawHistogram);
    }

    drawHistogram() {
        const data = google.visualization.arrayToDataTable([
            ['Dinosaur', 'Length'],
            ['Acrocanthosaurus (top-spined lizard)', 12.2],
            ['Albertosaurus (Alberta lizard)', 9.1],
            ['Allosaurus (other lizard)', 12.2],
            ['Apatosaurus (deceptive lizard)', 22.9],
            ['Archaeopteryx (ancient wing)', 0.9],
            ['Argentinosaurus (Argentina lizard)', 36.6],
            ['Baryonyx (heavy claws)', 9.1],
            ['Brachiosaurus (arm lizard)', 30.5],
            ['Ceratosaurus (horned lizard)', 6.1],
            ['Coelophysis (hollow form)', 2.7],
            ['Compsognathus (elegant jaw)', 0.9],
            ['Deinonychus (terrible claw)', 2.7],
            ['Diplodocus (double beam)', 27.1],
            ['Dromicelomimus (emu mimic)', 3.4],
            ['Gallimimus (fowl mimic)', 5.5],
            ['Mamenchisaurus (Mamenchi lizard)', 21.0],
            ['Megalosaurus (big lizard)', 7.9],
            ['Microvenator (small hunter)', 1.2],
            ['Ornithomimus (bird mimic)', 4.6],
            ['Oviraptor (egg robber)', 1.5],
            ['Plateosaurus (flat lizard)', 7.9],
            ['Sauronithoides (narrow-clawed lizard)', 2.0],
            ['Seismosaurus (tremor lizard)', 45.7],
            ['Spinosaurus (spiny lizard)', 12.2],
            ['Supersaurus (super lizard)', 30.5],
            ['Tyrannosaurus (tyrant lizard)', 15.2],
            ['Ultrasaurus (ultra lizard)', 30.5],
            ['Velociraptor (swift robber)', 1.8]
        ]);

        const options = {
            colors: ['#767676'],
            hAxis: {
                baselineColor: 'transparent',
                gridlines: {
                    color: 'transparent'
                }
            },
            legend: {
                position: 'none'
            },
            tooltip: {
                trigger: 'none'
            },
            vAxis: {
                baselineColor: 'transparent',
                gridlines: {
                    color: 'transparent'
                }
            }
        };

        const chart = new google.visualization.Histogram(document.getElementById('historgram'));

        chart.draw(data, options);
    }

    formatTip(value) {
        return `${value}%`;
    }

    render() {
        const { formatTip } = this;
        const { filter } = this.props;
        return (
            <div>
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ marginBottom: '8px' }}>
                        <div className={css(styles.textRegular)}>
                            <span>£10</span> - <span>£1000+</span>
                        </div>
                    </div>
                    <div className={css(styles.textSmall)}>
                        <span>The average price is £89.</span>
                    </div>
                </div>
                <div id="historgram" />
                <Range
                    handle={SliderHandle}
                    min={filter.data.min}
                    max={filter.data.max}
                    defaultValue={[filter.data.min, filter.data.max]}
                    tipFormatter={formatTip}
                />
            </div>
        );
    }
}

Slider.propTypes = {
    filter: PropTypes.object.isRequired
};

export default Slider;
