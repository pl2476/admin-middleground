import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

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
    // resourceId: 2,
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

class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events,
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

  handleSelect = ({ start, end, resourceId }) => {
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

  render() {
    const { events: eventsData } = this.state;
    const style = {
      overflow: 'auto',
      backgroundColor: '#fff',
      height: '100vh',
      padding: '15px',
    };
    return (
      <div style={style}>
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
        />
      </div>
    );
  }
}

Schedule.propTypes = propTypes;

export default Schedule;
