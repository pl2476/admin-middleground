export const $$typeof: symbol;
export class ControlledComponent {
  constructor(...args: any[]);
  componentWillReceiveProps(nextProps: any): void;
  forceUpdate(callback: any): void;
  getContext(_ref2: any): any;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace ControlledComponent {
  namespace defaultProps {
    const allDayAccessor: string;
    const drilldownView: string;
    const elementProps: {};
    const endAccessor: string;
    function getNow(): any;
    const length: number;
    const longPressThreshold: number;
    const popup: boolean;
    const resourceAccessor: string;
    const resourceIdAccessor: string;
    const resourceTitleAccessor: string;
    const startAccessor: string;
    const step: number;
    const titleAccessor: string;
    const toolbar: boolean;
    const tooltipAccessor: string;
    const view: string;
    const views: string[];
  }
  namespace propTypes {
    function allDayAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace allDayAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function components(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace components {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function culture(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace culture {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function date(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace date {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function dayPropGetter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace dayPropGetter {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function defaultView(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace defaultView {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function drilldownView(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace drilldownView {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function elementProps(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace elementProps {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function endAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace endAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function eventPropGetter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace eventPropGetter {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function events(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace events {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function formats(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace formats {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function getDrilldownView(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace getDrilldownView {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function getNow(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace getNow {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function length(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace length {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function localizer(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    function longPressThreshold(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace longPressThreshold {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function max(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace max {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function messages(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace messages {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function min(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace min {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onDoubleClickEvent(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onDoubleClickEvent {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onDrillDown(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onDrillDown {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onNavigate(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onNavigate {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onRangeChange(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onRangeChange {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onSelectEvent(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onSelectEvent {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onSelectSlot(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onSelectSlot {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onSelecting(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onSelecting {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onShowMore(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onShowMore {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onView(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onView {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function popup(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace popup {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function popupOffset(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace popupOffset {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function resourceAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace resourceAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function resourceIdAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace resourceIdAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function resourceTitleAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace resourceTitleAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function resources(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace resources {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function rtl(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace rtl {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function scrollToTime(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace scrollToTime {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function selectable(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace selectable {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function selected(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace selected {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function showMultiDayTimes(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace showMultiDayTimes {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function slotPropGetter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace slotPropGetter {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function startAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace startAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function step(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace step {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function timeslots(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace timeslots {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function titleAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace titleAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function toolbar(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace toolbar {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function tooltipAccessor(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace tooltipAccessor {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function view(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace view {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function views(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace views {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export const Navigate: {
  DATE: string;
  NEXT: string;
  PREVIOUS: string;
  TODAY: string;
};
export const Views: {
  AGENDA: string;
  DAY: string;
  MONTH: string;
  WEEK: string;
  WORK_WEEK: string;
};
export namespace components {
  function dateCellWrapper(props: any): any;
  function dayWrapper(props: any): any;
  function eventWrapper(props: any): any;
}
export function deferControlTo(newComponent: any, additions: any, nextMethods: any): any;
export function globalizeLocalizer(globalize: any): any;
export function momentLocalizer(moment: any): any;
export function move(View: any, _ref: any): any;
export namespace propTypes {
  function date(props: any, propName: any): any;
  function defaultDate(): void;
  function defaultSelected(): void;
  function defaultView(): void;
  function innerRef(): void;
  function selected(props: any, propName: any): any;
  function view(props: any, propName: any): any;
}
export function render(props: any, ref: any): any;
