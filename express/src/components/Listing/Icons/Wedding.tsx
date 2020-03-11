/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  stylesArray?: object[];
};

const Wedding = ({ stylesArray }: Props) => (
  <svg
    className={css(styles.svg, stylesArray)}
    enableBackground="new 0 0 512 512"
    viewBox="0 0 512 512"
    x="0px"
    y="0px"
  >
    <g>
      <path
        d="M321.473,42.621C312,33.14,299.401,27.918,285.996,27.919c-10.958,0-21.375,3.489-29.985,9.941
        c-8.619-6.453-19.042-9.941-30-9.941c-13.405,0-26.006,5.221-35.478,14.7c-19.559,19.557-19.56,51.387,0,70.958l59.995,59.977
        c1.515,1.514,3.5,2.272,5.485,2.272s3.971-0.758,5.485-2.273l59.974-59.979C341.028,94.005,341.027,62.175,321.473,42.621z
        M310.5,102.606l-54.487,54.492l-54.507-54.491c-13.512-13.519-13.513-35.507,0-49.018c6.543-6.549,15.246-10.155,24.505-10.155
        c9.26,0,17.967,3.607,24.518,10.157c1.455,1.455,3.427,2.272,5.485,2.272c0.001,0,0.002,0,0.003,0
        c2.058-0.001,4.032-0.819,5.486-2.276c6.537-6.548,15.236-10.153,24.493-10.153c9.258,0,17.96,3.606,24.504,10.157
        C324.009,67.099,324.008,89.088,310.5,102.606z"
      />
      <path
        d="M359.434,178.949c-38.782,0-75.242,14.313-103.496,40.467c-27.203-25.104-63.525-40.467-103.372-40.467
        C68.441,178.949,0,247.39,0,331.515s68.441,152.566,152.566,152.566c38.78,0,75.24-14.313,103.496-40.467
        c27.203,25.104,63.525,40.467,103.373,40.467c84.125,0,152.565-68.44,152.565-152.566S443.56,178.949,359.434,178.949z
        M152.565,468.562c-75.569,0.004-137.05-61.477-137.05-137.047s61.481-137.051,137.051-137.051s137.05,61.481,137.05,137.051
        c0,24.087-6.222,47.418-18.076,68.078c-2.371-3.053-4.582-6.213-6.615-9.488c4.267-8.164,7.636-16.781,10.023-25.675
        c2.876-10.685,4.324-21.763,4.324-32.913c0-17.108-3.352-33.699-9.961-49.317c-5.823-13.769-13.943-26.251-24.159-37.171
        c-0.043-0.046-0.084-0.093-0.129-0.138c-0.939-1.001-1.889-1.994-2.864-2.969c-11.636-11.636-25.186-20.77-40.277-27.152
        c-15.619-6.609-32.209-9.961-49.317-9.961c-10.478,0-20.883,1.283-30.948,3.806c-9.774,2.451-19.249,6.093-28.175,10.809
        c-8.771,4.623-17.005,10.302-24.473,16.871c-7.437,6.536-14.108,13.932-19.828,22c-1.2,1.696-1.665,3.744-1.314,5.792
        c0.341,2.038,1.469,3.827,3.155,5.027c1.324,0.931,2.865,1.427,4.478,1.427c2.514,0,4.882-1.22,6.341-3.269
        c10.085-14.211,23.531-26.023,38.881-34.133c7.83-4.137,16.146-7.323,24.721-9.474c8.833-2.224,17.967-3.341,27.162-3.341
        c15.019,0,29.582,2.937,43.277,8.73c12.557,5.31,23.892,12.827,33.761,22.314c-14.887,24.059-22.735,51.627-22.735,80.146
        c0,29.366,8.348,56.815,22.783,80.115c-3.935,3.786-8.143,7.29-12.574,10.453c-6.092,4.356-12.639,8.089-19.456,11.119
        c-14.202,6.3-29.365,9.506-45.056,9.506c-13.55,0-26.79-2.41-39.346-7.168c-10.395-3.93-20.139-9.402-28.941-16.271
        c-8.72-6.795-16.374-14.822-22.735-23.862c-13.199-18.774-20.17-40.868-20.17-63.892c0-13.312,2.327-26.334,6.92-38.695
        c1.489-4.013-0.569-8.482-4.582-9.971c-0.869-0.321-1.779-0.486-2.7-0.486c-3.217,0-6.144,2.027-7.272,5.058
        c-5.233,14.088-7.881,28.93-7.881,44.094c0.01,26.241,7.954,51.417,22.993,72.797c7.24,10.312,15.96,19.457,25.9,27.203
        c10.033,7.82,21.121,14.058,32.975,18.535c14.315,5.42,29.396,8.172,44.839,8.172l0.021-0.052v0.052
        c17.853,0,35.126-3.652,51.334-10.839c7.778-3.456,15.236-7.717,22.176-12.671c4.371-3.117,8.552-6.523,12.5-10.176
        c2.112,2.736,4.314,5.399,6.602,7.984C219.863,455.815,187.248,468.562,152.565,468.562z M263.758,331.517
        c0,9.806-1.273,19.528-3.786,28.889c-1.093,4.067-2.431,8.065-3.982,11.982c-5.141-12.99-7.747-26.727-7.747-40.871
        c-0.001-9.805,1.271-19.528,3.785-28.9c1.092-4.063,2.429-8.057,3.977-11.97C261.152,303.643,263.758,317.378,263.758,331.517z
        M359.434,468.566c-75.57,0-137.051-61.481-137.051-137.051c0-24.086,6.222-47.418,18.075-68.078
        c2.368,3.052,4.577,6.21,6.608,9.481c-4.263,8.168-7.63,16.787-10.016,25.676c-2.875,10.695-4.323,21.763-4.323,32.923
        c0,17.108,3.351,33.699,9.961,49.317c5.832,13.791,13.968,26.289,24.205,37.22c0.021,0.022,0.04,0.046,0.062,0.067
        c0.947,1.009,1.903,2.009,2.885,2.991c11.636,11.636,25.186,20.77,40.277,27.152c15.619,6.609,32.21,9.961,49.328,9.961
        c10.468,0,20.884-1.283,30.947-3.817c9.765-2.45,19.239-6.082,28.166-10.798c8.771-4.634,17.004-10.312,24.472-16.871
        c7.437-6.536,14.109-13.932,19.829-22c2.472-3.496,1.645-8.347-1.841-10.819c-1.324-0.931-2.876-1.427-4.489-1.427
        c-2.514,0-4.883,1.22-6.33,3.269c-10.085,14.211-23.531,26.013-38.892,34.133c-7.819,4.137-16.135,7.323-24.71,9.475
        c-8.833,2.213-17.967,3.34-27.162,3.34c-15.019,0-29.583-2.947-43.288-8.74c-12.545-5.311-23.88-12.827-33.749-22.312
        c14.886-24.058,22.733-51.624,22.733-80.142c0-29.368-8.35-56.819-22.787-80.12c3.936-3.786,8.148-7.292,12.578-10.456
        c6.092-4.344,12.639-8.088,19.456-11.119c14.212-6.299,29.366-9.495,45.057-9.495c13.549,0,26.789,2.41,39.346,7.158
        c0.051,0.021,0.103,0.041,0.144,0.051l0.021,0.011c10.374,3.951,20.097,9.432,28.879,16.291
        c8.699,6.795,16.332,14.832,22.673,23.862c13.178,18.753,20.138,40.826,20.128,63.819c0,13.312-2.327,26.334-6.92,38.695
        c-0.713,1.944-0.641,4.044,0.228,5.926c0.858,1.893,2.399,3.32,4.343,4.044c0.88,0.321,1.78,0.487,2.7,0.487
        c3.227,0,6.155-2.028,7.282-5.059c5.233-14.108,7.882-28.94,7.882-44.094c-0.01-26.242-7.955-51.417-22.994-72.807
        c-7.24-10.302-15.949-19.457-25.889-27.193c-10.033-7.82-21.132-14.057-32.986-18.547c-14.315-5.419-29.406-8.161-44.838-8.161
        h-0.01c-17.854,0-35.126,3.641-51.335,10.84c-7.778,3.443-15.246,7.705-22.186,12.671c-4.371,3.117-8.552,6.523-12.499,10.172
        c-2.112-2.736-4.314-5.399-6.603-7.984c25.333-23.297,57.949-36.045,92.633-36.045c75.57,0,137.051,61.481,137.051,137.051
        C496.485,407.085,435.004,468.566,359.434,468.566z"
      />
    </g>
  </svg>
);

export default Wedding;
