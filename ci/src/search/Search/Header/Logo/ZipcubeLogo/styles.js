
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    zipcubeLogoSvg: {
        height: '3em',
        width: '6em',
        display: 'none',
        '@media (min-width: 744px)': {
            display: 'block'
        }
    },
    zipcubeLogoSmallSvg: {
        height: '3em',
        width: '2em',
        display: 'none',
        '@media (max-width: 744px)': {
            display: 'block'
        }
    }
});

export default styles;
