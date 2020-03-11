export type Span = {
  end: number;
  start: number;
};

export type SpanAction =
  | { kind: 'SHIFT_LEFT'; delta: number }
  | { kind: 'STRETCH_LEFT'; delta: number }
  | { kind: 'SHIFT_RIGHT'; delta: number }
  | { kind: 'STRETCH_RIGHT'; delta: number };

export const applySpanAction = (interval: Span, action: SpanAction): Span => {
  switch (action.kind) {
    case 'SHIFT_LEFT':
      return { start: interval.start - action.delta, end: interval.end - action.delta };
    case 'STRETCH_LEFT':
      return { start: interval.start - action.delta, end: interval.end };
    case 'SHIFT_RIGHT':
      return { start: interval.start + action.delta, end: interval.end + action.delta };
    case 'STRETCH_RIGHT':
      return { start: interval.start, end: interval.end + action.delta };
    default:
      return interval;
  }
};
