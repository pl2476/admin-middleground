import React from 'react';
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
const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];

const propTypes = {};

const EventComponent = function EventComponent(e) {
  return <h1>{e.title}</h1>;
};
const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
];

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

class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events,
      draggedEvent: null,
      counters: outData,
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  moveEvent = ({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) => {
    const { events: eventsData } = this.state;

    const idx = eventsData.indexOf(event);
    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay };

    const nextEvents = [...eventsData];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });
  };

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events: eventsData } = this.state;

    const nextEvents = eventsData.map(existingEvent =>
      existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
    );

    this.setState({
      events: nextEvents,
    });
  };

  handleSelect = params => {
    const { start, end, resourceId } = params;
    const title = 'add';
    const { events: eventsData } = this.state;
    if (title)
      this.setState({
        events: [
          ...eventsData,
          {
            start,
            end,
            title,
            resourceId,
          },
        ],
      });
    console.log(this.state);
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
    const event = {
      title: formatName(draggedEvent, counters[draggedEvent].title),
      start,
      end,
      isAllDay: allDay,
      resourceId,
    };
    const updatedCounters = {
      ...counters,
      [draggedEvent]: counters[draggedEvent] + 1,
    };
    this.setState({ draggedEvent: null, counters: updatedCounters });
    this.newEvent(event);
  };

  newEvent(event) {
    const { events: eventsData } = this.state;
    const idList = eventsData.map(a => a.id);
    const newId = Math.max(...idList) + 1;
    const hour = {
      id: newId,
      title: event.title,
      allDay: event.isAllDay,
      start: event.start,
      end: event.end,
      resourceId: event.resourceId,
    };
    this.setState({
      events: eventsData.concat([hour]),
    });
  }

  render() {
    const { events: eventsData } = this.state;
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
              events={eventsData}
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
