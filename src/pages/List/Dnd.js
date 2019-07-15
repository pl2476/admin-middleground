import React, { PureComponent } from 'react';
import style from './Dnd.less';

class Dnd extends PureComponent {
  state = {};

  componentDidMount() {
    // const { dispatch } = this.props;
    // console.log('componentDidMount', this.props, dispatch, this.state);
  }

  dragStart = (item, e) => {
    // e.dataTransfer.setData('text/plain', item.id);
    // e.dataTransfer.effectAllowed = "linkMove";
    console.log('dragstart', e);
  };

  PrefixInteger = (num, length) => (Array(length).join('0') + num).slice(-length);

  drop = (item, e) => {
    // e.dataTransfer.getData('text/plain');
    console.log('drop', item, e);
  };

  render() {
    const colList = ['a', 'b', 'c', 'd', 'e', 'f'];
    const rowList = [];
    let hour = 0;
    let min = '';
    for (let i = 0; i < 48; i += 1) {
      if (i % 2 !== 0) {
        min = '30';
        rowList.push(`${this.PrefixInteger(hour, 2)}:${min}`);
        hour += 1;
      } else {
        min = '00';
        rowList.push(`${this.PrefixInteger(hour, 2)}:${min}`);
      }
    }
    const items = [
      {
        id: 1,
        startTime: '03:30',
        duration: 60,
        top: '30px',
        left: '50px',
      },
      {
        id: 2,
        startTime: '03:30',
        duration: 30,
        top: '60px',
        left: '150px',
      },
      {
        id: 3,
        startTime: '03:30',
        duration: 90,
        top: '120px',
        left: '250px',
      },
    ];

    const rowItems = rowList.map(item => (
      <div key={item} className={style.rowItems}>
        {item}
      </div>
    ));
    const contentBoxItems = rowList.map(item => (
      <div key={item} className={style.rowItems} onDrop={this.drop.bind(this, item)} />
    ));
    const contentBox = colList.map(item => (
      <div key={item} className={style.colItems}>
        {contentBoxItems}
      </div>
    ));
    const contentItems = items.map((item, index) => (
      <div
        key={item.id}
        className={style.contentItem}
        style={{
          backgroundColor: index % 2 === 0 ? '#4d9a77' : '#b6d051',
          height: `${item.duration}px`,
          lineHeight: `${item.duration}px`,
          top: item.top,
          left: item.left,
        }}
        draggable
        onDragStart={this.dragStart.bind(this, item)}
      >
        {item.id}
      </div>
    ));
    return (
      <div className={style.dnd}>
        <div className={style.box}>
          <div className={style.firstCol}>{rowItems}</div>
          {contentBox}
        </div>
        {contentItems}
      </div>
    );
  }
}

export default Dnd;
