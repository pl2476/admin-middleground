import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Dropdown } from 'antd';
// import { throttle } from 'underscore';
import style from './Dnd.less';

@connect(({ dnd }) => ({
  dnd,
}))
class Dnd extends PureComponent {
  constructor(props) {
    const colList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    super(props);
    this.boxRef = React.createRef();
    this.colTitleRef = React.createRef();
    this.timeLineRef = React.createRef();
    this.state = {
      colList,
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
    console.log('hideBoxItem');
  };

  showBoxItem = e => {
    if (e.target && e.target.children[0] && !e.target.children[0].hasAttribute('class')) {
      e.target.children[0].setAttribute('class', style.rowItem);
    }
    console.log('showBoxItem');
  };

  dragStart = (item, e) => {
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'linkMove';
    console.log('dragstart', e);
  };

  onDrop = (row, col, e) => {
    // e.stopPropagation();
    // e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const id = e.dataTransfer.getData('text/plain');
    const { dispatch } = this.props;
    dispatch({
      type: 'dnd/postItem',
      payload: {
        method: 'update',
        id,
        name: col,
        startTime: row.time,
      },
    });
  };

  dragEnter = (item, e) => {
    e.preventDefault();
    // e.persist();
    // this.hideBoxItem(e);
    console.log('dragEnter', item, e);
  };

  dragOver = (item, e) => {
    e.preventDefault();
    // e.persist();
  };

  dragLeave = (item, e) => {
    // e.preventDefault();
    // e.persist();
    // this.showBoxItem(e);
    console.log('dragLeave', item, e);
  };

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

  render() {
    const { colList } = this.state;
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
    const contentBox = colList.map(colItem => (
      <div key={colItem} className={style.colItems}>
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
              onDragLeave={this.dragLeave.bind(this, rowItem)}
              // onClick={this.boxOnClick.bind(this, rowItem, colItem)}
            >
              <div className={style.rowItem}>{`${rowItem.time} / ${colItem}`}</div>
            </div>
          </Dropdown>
        ))}
      </div>
    ));
    // const contentMenu = (

    // );
    const contentItems = items.map(item => (
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
          className={style.contentItem}
          style={{
            // eslint-disable-next-line no-bitwise
            backgroundColor: `#${((Math.random() * 0xffffff) << 0).toString(16)}`,
            opacity: 0.8,
            height: `${item.duration}px`,
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

    return (
      <div className={style.container} onContextMenu={this.containerRightClick}>
        <div className={style.colTitle} ref={this.colTitleRef}>
          {colTitle}
        </div>
        <div className={style.dnd}>
          <div ref={this.boxRef} className={style.box} onScrollCapture={this.boxScroll.bind(this)}>
            <div className={style.firstCol}>{rowItems}</div>
            {contentBox}
            {contentItems}
            {timeline}
          </div>
        </div>
      </div>
    );
  }
}

export default Dnd;
