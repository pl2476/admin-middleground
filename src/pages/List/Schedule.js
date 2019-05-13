import React from 'react';
import { connect } from 'dva';
import BigCalendar from '@/tempLib/dist/react-big-calendar';
import moment from 'moment';
import withDragAndDrop from '@/tempLib/lib/addons/dragAndDrop';
import { Row, Col, Calendar, Card } from 'antd';
import { formatMessage } from 'umi/locale';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import style from './Schedule.less';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
console.log(formatMessage);

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
    };

    this.moveEvent = this.moveEvent.bind(this);
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

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  handleDragStart = (name, count) => {
    console.log(name, count);
    this.setState({ draggedEvent: name });
  };

  customOnDragOver = event => {
    const { draggedEvent } = this.state;
    if (draggedEvent !== 'undroppable') {
      console.log('preventDefault');
      event.preventDefault();
    }
  };

  onDropFromOutside = params => {
    const { start, end, allDay, resourceId } = params;
    const { draggedEvent, counters } = this.state;
    const { dispatch, schedule } = this.props;
    const event = {
      title: formatName(draggedEvent, counters[draggedEvent].title),
      start,
      end,
      isAllDay: allDay,
      resourceId,
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
    const styles = {
      overflow: 'auto',
      backgroundColor: '#fff',
      height: '100vh',
      padding: '15px',
    };
    return (
      <div style={styles}>
        <Row gutter={15}>
          <Col span={18}>
            <DragAndDropCalendar
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
              defaultDate={new Date(2018, 0, 29)}
              popup
              step={30}
              timeslots={1}
              components={{
                event: EventComponent,
              }}
              onSelectEvent={event => console.log(event.title)}
              onSelectSlot={this.handleSelect}
              onD
              onDropFromOutside={this.onDropFromOutside}
              onDragOver={this.customOnDragOver}
            />
          </Col>
          <Col span={6}>
            <Row>
              <Calendar
                className={style.calendar}
                fullscreen={false}
                mode="month"
                onPanelChange={this.onPanelChange}
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
