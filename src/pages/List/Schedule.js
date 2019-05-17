import React from 'react';
import { connect } from 'dva';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Row, Col, Calendar, Card } from 'antd';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import style from './Schedule.less';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const propTypes = {};

const EventComponent = function EventComponent(e) {
  return <h1>{e.title}</h1>;
};

const outData = [
  {
    id: '',
    title: 'outData1',
    start: null,
    end: null,
    resourceId: '',
  },
  {
    id: '',
    title: 'outData2',
    start: null,
    end: null,
    resourceId: '',
    style: {
      backgroundColor: 'green',
      borderColor: 'green',
    },
  },
];

const formatName = (name, count) => `${name} ID ${count}`;

@connect(({ schedule }) => ({
  schedule,
}))
class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      draggedEvent: null,
      counters: outData,
      min: moment()
        .startOf('day')
        .add(8, 'hours'),
      max: moment()
        .startOf('day')
        .add(18, 'hours'),
      currentTime: new Date(),
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.dateOnSelect = this.dateOnSelect.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'schedule/resource',
      payload: {},
    });
    dispatch({
      type: 'schedule/events',
      payload: {},
    });
  }

  moveEvent = ({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) => {
    const { schedule, dispatch } = this.props;

    const idx = schedule.events.indexOf(event);
    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay };

    const nextEvents = [...schedule.events];
    nextEvents.splice(idx, 1, updatedEvent);

    dispatch({
      type: 'schedule/refresh',
      payload: {
        events: nextEvents,
      },
    });
  };

  resizeEvent = (resizeType, { event, start, end }) => {
    const { schedule, dispatch } = this.props;

    const nextEvents = schedule.events.map(existingEvent =>
      existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
    );

    dispatch({
      type: 'schedule/refresh',
      payload: {
        events: nextEvents,
      },
    });
  };

  handleSelect = params => {
    const { start, end, resourceId } = params;
    const title = 'add';
    const { dispatch, schedule } = this.props;
    if (title)
      dispatch({
        type: 'schedule/refresh',
        payload: {
          events: [
            ...schedule.events,
            {
              start,
              end,
              title,
              resourceId,
            },
          ],
        },
      });
  };

  dateOnSelect = value => {
    this.setState({ currentTime: new Date(value.format('YYYY-MM-DD')) });
  };

  onNavigate = value => {
    this.setState({ currentTime: new Date(value) });
  };

  handleDragStart = (name, count) => {
    console.log(name, count);
    this.setState({ draggedEvent: name });
  };

  customOnDragOver = event => {
    const { draggedEvent } = this.state;
    if (draggedEvent !== 'undroppable') {
      event.preventDefault();
    }
  };

  onDropFromOutside = params => {
    // cusStyle is temporarily unavailable
    const { start, end, allDay, resource, style: cusStyle } = params;
    const { draggedEvent, counters } = this.state;
    const { dispatch, schedule } = this.props;
    const event = {
      title: formatName(draggedEvent, counters[draggedEvent].title),
      start,
      end,
      isAllDay: allDay,
      resourceId: resource,
      style: cusStyle,
    };
    counters.splice(draggedEvent + 0, 1);
    this.setState({ draggedEvent: null, counters });
    const { events } = schedule;
    events.push(event);
    // dispatch({
    //   type: 'schedule/refresh',
    //   payload: {
    //     event: events
    //   },
    // });
    dispatch({
      type: 'schedule/add',
      payload: {
        event,
      },
    });
  };

  eventPropGetter = event => {
    if (event.style) {
      return {
        style: event.style,
      };
    }
    return {};
  };

  newEvent(event) {
    const { schedule, dispatch } = this.props;
    const idList = schedule.events.map(a => a.id);
    const newId = Math.max(...idList) + 1;
    const hour = {
      id: newId,
      title: event.title,
      allDay: event.isAllDay,
      start: event.start,
      end: event.end,
      resourceId: event.resourceId,
    };
    dispatch({
      type: 'schedule/add',
      payload: {
        event: hour,
      },
    });
  }

  render() {
    const { schedule } = this.props;
    const { resourceMap, events } = schedule;
    const { min, max, currentTime } = this.state;
    const styles = {
      overflow: 'auto',
      backgroundColor: '#fff',
      height: '100vh',
      padding: '15px',
    };
    const formats = {
      // dateFormat: 'dd',

      // dayFormat: (date, culture, local) =>
      // local.format(date, 'DD', culture),

      dayHeaderFormat: (date, culture, local) => local.format(date, 'dddd MMM Do', culture),

      dayRangeHeaderFormat: ({ start, end }, culture, local) =>
        `${local.format(start, { date: 'short' }, culture)} — ${local.format(
          end,
          { date: 'short' },
          culture
        )}`,
    };
    return (
      <div style={styles}>
        <Row gutter={15}>
          <Col span={18}>
            <DragAndDropCalendar
              formats={formats}
              className={style.dragCalendar}
              selectable
              localizer={localizer}
              events={events}
              onEventDrop={this.moveEvent}
              resizable
              resources={resourceMap}
              resourceIdAccessor="resourceId"
              resourceTitleAccessor="resourceTitle"
              onEventResize={this.resizeEvent}
              defaultView="day"
              views={['day']}
              defaultDate={new Date()}
              date={currentTime}
              onNavigate={this.onNavigate}
              popup
              toolbar
              step={30}
              timeslots={1}
              components={{
                event: EventComponent,
              }}
              onSelectEvent={event => console.log(event.title)}
              onSelectSlot={this.handleSelect}
              onDropFromOutside={this.onDropFromOutside}
              onDragOver={this.customOnDragOver}
              min={min.toDate()}
              max={max.toDate()}
              eventPropGetter={this.eventPropGetter}
            />
          </Col>
          <Col span={6}>
            <Row>
              <Calendar
                className={style.calendar}
                fullscreen={false}
                mode="month"
                onSelect={this.dateOnSelect}
              />
            </Row>
            <Row>
              <Card>
                {Object.entries(outData).map(([index, item]) => (
                  <div
                    style={{
                      border: '2px solid gray',
                      borderRadius: '4px',
                      width: '100px',
                      margin: '10px',
                    }}
                    draggable="true"
                    key={index}
                    onDragStart={() => this.handleDragStart(index, item)}
                  >
                    {item.title}
                  </div>
                ))}
                {/* <div
                  style={{
                    border: '2px solid gray',
                    borderRadius: '4px',
                    width: '100px',
                    margin: '10px',
                  }}
                  draggable="true"
                  key="undroppable"
                  onDragStart={() => this.handleDragStart('undroppable')}
                >
                  Draggable but not for calendar.
                </div> */}
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Schedule.propTypes = propTypes;

export default Schedule;
