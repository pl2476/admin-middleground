import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Calendar } from 'antd';
// import { throttle } from 'underscore';
import style from './Dnd.less';

@connect(({ dnd }) => ({
  dnd,
}))
class Dnd extends PureComponent {
  constructor(props) {
    const colList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const waitingItemsList = [
      {
        description: 'waiting item1',
        duration: 60,
        id: Math.floor(Math.random() * 88) + 8,
        status: 'waiting',
      },
      {
        description: 'waiting item2',
        duration: 30,
        id: Math.floor(Math.random() * 288) + 88,
        status: 'waiting',
      },
    ];
    super(props);
    this.boxRef = React.createRef();
    this.colTitleRef = React.createRef();
    this.timeLineRef = React.createRef();
    this.state = {
      colList,
      waitingItemsList,
    };
    // this.dragEnterThrottle = throttle(this.dragEnter, 1000);
    // this.dragOverThrottle = throttle(this.dragOver, 1000);
    // this.dragLeaveThrottle = throttle(this.dragOver, 1000);
    this.timeLineTopPosition = 0;
    this.interval = null;
  }

  componentDidMount() {
    const that = this;
    that.interval = null;
    that.timeLineTopPosition = that.calcTopPosition() + 29;
    that.interval = setInterval(() => {
      that.timeLineTopPosition = that.calcTopPosition() + 29;
      if (that.timeLineRef && that.timeLineRef.current) {
        that.timeLineRef.current.style.top = `${that.timeLineTopPosition}px`;
      }
    }, 30000);
    const { dispatch } = this.props;
    dispatch({
      type: 'dnd/times',
      payload: {},
    });
    dispatch({
      type: 'dnd/items',
      payload: {},
    });
  }

  hideBoxItem = e => {
    if (e.target && e.target.children[0] && e.target.children[0].hasAttribute('class')) {
      e.target.children[0].removeAttribute('class');
    }
  };

  showBoxItem = e => {
    if (e.target && e.target.children[0] && !e.target.children[0].hasAttribute('class')) {
      e.target.children[0].setAttribute('class', style.rowItem);
    }
  };

  dragStart = (item, e) => {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        id: item.id,
      })
    );
    e.dataTransfer.effectAllowed = 'linkMove';
  };

  onDrop = (row, col, e) => {
    // e.stopPropagation();
    // e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { dispatch } = this.props;
    if (data.status === 'waiting') {
      dispatch({
        type: 'dnd/postItem',
        payload: {
          method: 'post',
          id: data.id,
          name: col,
          startTime: row.time,
          duration: data.duration || 0,
          description: data.description || '',
        },
        callback: res => {
          if (res.code === 200) {
            const { waitingItemsList } = this.state;
            const filteredData = waitingItemsList.filter(i => data.id !== i.id);
            this.setState({
              waitingItemsList: filteredData,
            });
          }
        },
      });
    } else {
      dispatch({
        type: 'dnd/postItem',
        payload: {
          method: 'update',
          id: data.id,
          name: col,
          startTime: row.time,
        },
      });
    }
  };

  dragEnter = (item, e) => {
    e.preventDefault();
    // e.persist();
    // this.hideBoxItem(e);
  };

  dragOver = (item, e) => {
    e.preventDefault();
    // e.persist();
  };

  // dragLeave = (item, e) => {
  // e.preventDefault();
  // e.persist();
  // this.showBoxItem(e);
  // };

  boxScroll = () => {
    this.colTitleRef.current.scrollLeft = this.boxRef.current.scrollLeft;
  };

  calcTopPosition = () =>
    Math.round((new Date().getTime() - new Date(new Date().setHours(0, 0, 0, 0))) / 60000);

  boxOnClick = (row, col) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dnd/postItem',
      payload: {
        method: 'post',
        name: col,
        startTime: row.time,
        duration: 90,
        description:
          'Hold fast to dreams For when dreams go Life is a barren field Frozen with snow.',
      },
    });
  };

  containerRightClick = e => {
    e.preventDefault();
  };

  waitingItemDragStart = (item, e) => {
    e.dataTransfer.effectAllowed = 'linkMove';
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  render() {
    const { colList, waitingItemsList } = this.state;
    const { dnd } = this.props;
    const colTitleList = ['', ...colList];
    const colTitle = colTitleList.map(item => (
      <div key={item} className={style.colTitleItems}>
        {item}
      </div>
    ));
    let rowList = [];
    let items = [];
    if (dnd.times && dnd.times.list && dnd.times.list.length > 0) {
      rowList = dnd.times.list;
    }
    if (dnd.items && dnd.items.list && dnd.items.list.length > 0) {
      items = dnd.items.list;
    }
    items.map(item => {
      item.left = colList.findIndex(i => i === item.name) * 150 + 70;
      item.top = (rowList.findIndex(i => i.time === item.startTime) - 1) * 30 + 30;
      return item;
    });
    const rowItems = rowList.map(item => (
      <div key={item.id} className={style.rowItems}>
        {item.time}
      </div>
    ));
    const contentBox = colList.map((colItem, index) => (
      <div
        key={colItem}
        className={`${style.colItems} ${index === colList.length - 1 ? style.last : ''}`}
      >
        {rowList.map(rowItem => (
          <Dropdown
            key={rowItem.id}
            overlay={
              <Menu>
                <Menu.Item key="1">Add</Menu.Item>
                <Menu.Item key="2">Add multiple</Menu.Item>
                <Menu.Item key="3">Others</Menu.Item>
              </Menu>
            }
            // getPopupContainer={() => document.getElementsByClassName(style.box)[0]}
            getPopupContainer={trigger => trigger.parentNode}
            trigger={['contextMenu', 'click']}
          >
            <div
              key={rowItem.id}
              className={style.rowItems}
              onDrop={this.onDrop.bind(this, rowItem, colItem)}
              onDragEnter={this.dragEnter.bind(this, rowItem)}
              onDragOver={this.dragOver.bind(this, rowItem)}
              // onDragLeave={this.dragLeave.bind(this, rowItem)}
              // onClick={this.boxOnClick.bind(this, rowItem, colItem)}
            >
              <div className={style.rowItem}>{`${rowItem.time} / ${colItem}`}</div>
            </div>
          </Dropdown>
        ))}
      </div>
    ));
    // to do: hide context-menu when not hovering
    const contentItems = items.map((item, index) => (
      <Dropdown
        key={item.id}
        overlay={
          <Menu>
            <Menu.Item key="1">Edit</Menu.Item>
            <Menu.Item key="2">Cancel</Menu.Item>
          </Menu>
        }
        getPopupContainer={trigger => trigger.parentNode}
        trigger={['contextMenu', 'click']}
        onVisibleChange={this.boxRightClick}
      >
        <div
          key={item.id}
          className={`${style.contentItem}  ${index === items.length - 1 ? style.last : ''}`}
          style={{
            // eslint-disable-next-line no-bitwise
            backgroundColor: `#${((Math.random() * 0xffffff) << 0).toString(16)}`,
            opacity: 0.8,
            height: `${item.duration - 1}px`,
            // lineHeight: `${item.duration}px`,
            top: item.top,
            left: item.left,
          }}
          draggable
          onDragStart={this.dragStart.bind(this, item)}
        >
          {item.description}
        </div>
      </Dropdown>
    ));
    const timeline = (
      <div
        ref={this.timeLineRef}
        className={style.timeLine}
        style={{
          width: colList.length * 150,
          top: `${this.timeLineTopPosition}px`,
        }}
      />
    );
    const waitingItems = waitingItemsList.map(item => (
      <div
        key={item.description}
        className={style.waitingItem}
        style={{
          height: `${item.duration - 1}px`,
          lineHeight: `${item.duration - 1}px`,
        }}
        draggable
        onDragStart={this.waitingItemDragStart.bind(this, item)}
      >
        {item.description}
      </div>
    ));

    return (
      <div className={style.container} onContextMenu={this.containerRightClick}>
        <div className={style.left}>
          <div className={style.colTitle} ref={this.colTitleRef}>
            {colTitle}
          </div>
          <div className={style.dnd}>
            <div
              ref={this.boxRef}
              className={style.box}
              onScrollCapture={this.boxScroll.bind(this)}
            >
              <div className={style.firstCol}>{rowItems}</div>
              {contentBox}
              {contentItems}
              {timeline}
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.calendar}>
            <Calendar fullscreen={false} />
          </div>
          <div className={style.waiting}>
            <h5>Waiting Items</h5>
            <div className={style.box}>{waitingItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dnd;
