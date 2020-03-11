/* tslint:disable:max-line-length */
import * as React from 'react';

// Helpers
import { computeCropInfo, CropInfo, getCenter, getCropSize, getDistance, Offset, restrictPosition } from '@src/components/Listing/Photos/helpers';

// Components
import Container from '@src/components/Listing/Photos/PhotoCanvas/Container';
import CropArea from '@src/components/Listing/Photos/PhotoCanvas/CropArea';
import Img from '@src/components/Listing/Photos/PhotoCanvas/Img';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

type Props = {
  aspect: number;
  crop: Offset;
  cropShape: 'rect' | 'round';
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  image?: string;
  maxZoom: number;
  minZoom: number;
  onCropChange?: (crop: Offset) => void;
  onCropComplete?: (info: CropInfo) => void;
  onImgError?: React.ReactEventHandler<HTMLImageElement>;
  onZoomChange?: (zoom: number) => void;
  showGrid?: boolean;
  styles: {
    containerStyle?: React.CSSProperties;
    cropAreaStyle?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
  };
  zoom: number;
  zoomSpeed: number;
};

type State = {
  cropSize: {
    height: number;
    width: number;
  };
};

const PhotoCanvasDefaults = {
  aspect: 4 / 3,
  cropShape: 'rect',
  crossOrigin: undefined,
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
  showGrid: true,
  styles: {},
  zoom: 1,
  zoomSpeed: 1,
};

class PhotoCanvas extends React.Component<Props, State> {

  static defaultProps = PhotoCanvasDefaults;

  image = null;
  container = null;
  containerRect: any = {};
  imageSize = { width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 };
  dragStartPosition = { x: 0, y: 0 };
  dragStartCrop = { x: 0, y: 0 };
  lastPinchDistance = 0;
  rafDragTimeout = null;
  rafZoomTimeout = null;

  state: State = {
    cropSize: {
      height: null,
      width: null,
    },
  };

  static getMousePoint = (e: any) => ({ x: Number(e.clientX), y: Number(e.clientY) });

  static getTouchPoint = (touch: { clientX: any; clientY: any }) => ({
    x: Number(touch.clientX),
    y: Number(touch.clientY),
  })

  componentDidMount() {
    window.addEventListener('resize', this.computeSizes);
    this.container.addEventListener('gesturestart', this.preventZoomSafari);
    this.container.addEventListener('gesturechange', this.preventZoomSafari);
    this.container.addEventListener('wheel', this.onWheel, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeSizes);
    this.container.removeEventListener('gesturestart', this.preventZoomSafari);
    this.container.removeEventListener('gesturechange', this.preventZoomSafari);
    this.container.removeEventListener('wheel', this.onWheel);
    this.cleanEvents();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.aspect !== this.props.aspect) {
      this.computeSizes();
    } else if (prevProps.zoom !== this.props.zoom) {
      this.recomputeCropPosition();
    }
  }

  // this is to prevent Safari on iOS >= 10 to zoom the page
  preventZoomSafari = (e: any) => e.preventDefault();

  cleanEvents = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onDragStopped);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onDragStopped);
  }

  onImgLoad = () => {
    this.computeSizes();
    this.emitCropData();
  }

  computeSizes = () => {
    if (this.image) {
      this.imageSize = {
        width: this.image.width,
        height: this.image.height,
        naturalWidth: this.image.naturalWidth,
        naturalHeight: this.image.naturalHeight,
      };
      const cropSize = getCropSize(this.image.width, this.image.height, this.props.aspect);
      this.setState({ cropSize }, this.recomputeCropPosition);
    }
    if (this.container) {
      this.containerRect = this.container.getBoundingClientRect();
    }
  }

  onMouseDown = (e: any) => {
    e.preventDefault();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onDragStopped);
    this.onDragStart(PhotoCanvas.getMousePoint(e));
  }

  onMouseMove = (e: any) => this.onDrag(PhotoCanvas.getMousePoint(e));

  onTouchStart = (e: any) => {
    e.preventDefault();
    document.addEventListener('touchmove', this.onTouchMove, { passive: false }); // iOS 11 now defaults to passive: true
    document.addEventListener('touchend', this.onDragStopped);
    if (e.touches.length === 2) {
      this.onPinchStart(e);
    } else if (e.touches.length === 1) {
      this.onDragStart(PhotoCanvas.getTouchPoint(e.touches[0]));
    }
  }

  onTouchMove = (e: any) => {
    if (e.touches.length === 2) {
      this.onPinchMove(e);
    } else if (e.touches.length === 1) {
      this.onDrag(PhotoCanvas.getTouchPoint(e.touches[0]));
    }
  }

  onDragStart = ({ x, y }: Offset) => {
    this.dragStartPosition = { x, y };
    this.dragStartCrop = { x: this.props.crop.x, y: this.props.crop.y };
  }

  onDrag = ({ x, y }: Offset) => {
    if (this.rafDragTimeout) {
      window.cancelAnimationFrame(this.rafDragTimeout);
    }

    this.rafDragTimeout = window.requestAnimationFrame(() => {
      if (x === undefined || y === undefined) {
        return;
      }
      const offsetX = x - this.dragStartPosition.x;
      const offsetY = y - this.dragStartPosition.y;
      const requestedPosition = {
        x: this.dragStartCrop.x + offsetX,
        y: this.dragStartCrop.y + offsetY,
      };

      const newPosition = restrictPosition(
        requestedPosition,
        this.imageSize,
        this.state.cropSize,
        this.props.zoom
      );
      this.emitCropChange(newPosition);
    });
  }

  emitCropChange = (crop: Offset) => {
    if (this.props.onCropChange) {
      this.props.onCropChange(crop);
    }
  }

  emitCropComplete = (info: CropInfo) => {
    if (this.props.onCropComplete) {
      this.props.onCropComplete(info);
    }
  }

  emitZoomChange = (zoom: number) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(zoom);
    }
  }

  onDragStopped = () => {
    this.cleanEvents();
    this.emitCropData();
  }

  onPinchStart(e: any) {
    const pointA = PhotoCanvas.getTouchPoint(e.touches[0]);
    const pointB = PhotoCanvas.getTouchPoint(e.touches[1]);
    this.lastPinchDistance = getDistance(pointA, pointB);
    this.onDragStart(getCenter(pointA, pointB));
  }

  onPinchMove(e: any) {
    const t0 = PhotoCanvas.getTouchPoint(e.touches[0]);
    const t1 = PhotoCanvas.getTouchPoint(e.touches[1]);
    const center = getCenter(t0, t1);
    this.onDrag(center);

    if (this.rafZoomTimeout) {
      window.cancelAnimationFrame(this.rafZoomTimeout);
    }
    this.rafZoomTimeout = window.requestAnimationFrame(() => {
      const distance = getDistance(t0, t1);
      const newZoom = this.props.zoom * (distance / this.lastPinchDistance);
      this.setNewZoom(newZoom, center);
      this.lastPinchDistance = distance;
    });
  }

  onWheel = (e: any) => {
    e.preventDefault();
    const point = PhotoCanvas.getMousePoint(e);
    const newZoom = this.props.zoom - (e.deltaY * this.props.zoomSpeed) / 200;
    this.setNewZoom(newZoom, point);
  }

  getPointOnContainer = ({ x, y }) => {
    if (!this.containerRect) {
      throw new Error('ImageEditor not mounted!');
    }
    return {
      x: this.containerRect.width / 2 - (x - this.containerRect.left),
      y: this.containerRect.height / 2 - (y - this.containerRect.top),
    };
  }

  getPointOnImage = ({ x, y }) => {
    const { crop, zoom } = this.props;
    return {
      x: (x + crop.x) / zoom,
      y: (y + crop.y) / zoom,
    };
  }

  setNewZoom = (zoom: number, point: Offset) => {
    const zoomPoint = this.getPointOnContainer(point);
    const zoomTarget = this.getPointOnImage(zoomPoint);
    const newZoom = Math.min(this.props.maxZoom, Math.max(zoom, this.props.minZoom));
    const requestedPosition = {
      x: zoomTarget.x * newZoom - zoomPoint.x,
      y: zoomTarget.y * newZoom - zoomPoint.y,
    };
    const newPosition = restrictPosition(
      requestedPosition,
      this.imageSize,
      this.state.cropSize,
      newZoom
    );
    this.emitCropChange(newPosition);
    if (this.props.onZoomChange) {
      this.props.onZoomChange(newZoom);
    }
  }

  emitCropData = () => {
    if (!this.state.cropSize) {
      return;
    }

    const restrictedPosition = restrictPosition(
      this.props.crop,
      this.imageSize,
      this.state.cropSize,
      this.props.zoom
    );
    const info = computeCropInfo(
      restrictedPosition,
      this.imageSize,
      this.state.cropSize,
      this.props.zoom
    );
    this.emitCropComplete(info);
  }

  recomputeCropPosition = () => {
    const newPosition = restrictPosition(
      this.props.crop,
      this.imageSize,
      this.state.cropSize,
      this.props.zoom
    );
    this.emitCropChange(newPosition);
    this.emitCropData();
  }

  render() {
    const { crop: { x, y }, cropShape, crossOrigin, showGrid, styles: { containerStyle, imageStyle, cropAreaStyle }, zoom } = this.props;
    const { cropSize, cropSize: { height, width } } = this.state;
    return (
      <Container
        data-testid="container"
        innerRef={el => (this.container = el)}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        style={containerStyle}
      >
        <Img
          alt=""
          crossOrigin={crossOrigin}
          innerRef={el => (this.image = el)}
          onError={this.props.onImgError}
          onLoad={this.onImgLoad}
          src={this.props.image}
          style={{
            transform: `translate(${x}px, ${y}px) scale(${zoom})`,
            ...imageStyle,
          }}
        />
        {cropSize &&
          <CropArea
            cropShape={cropShape}
            data-testid="cropper"
            showGrid={showGrid}
            style={{
              ...cropAreaStyle,
              width: width,
              height: height,
            }}
          />
        }
      </Container>
    );
  }
}

export default PhotoCanvas;
