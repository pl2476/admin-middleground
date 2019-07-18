import React, { PureComponent } from 'react';
import style from './Dnd.less';

class Dnd extends PureComponent {
  state = {};

  constructor(props) {
    super(props);
    this.boxRef = React.createRef();
    this.colTitleRef = React.createRef();
  }

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

  onDrop = (item, e) => {
    // e.stopPropagation();
    // e.preventDefault();
    // e.dataTransfer.getData('text/plain');
    console.log('onDrop', item, e);
  };

  dragEnter = (item, e) => {
    e.preventDefault();
    // console.log('dragEnter', item, e);
  };

  dragOver = (item, e) => {
    e.preventDefault();
    // console.log('dragOver', item, e);
  };

  boxScroll = () => {
    this.colTitleRef.current.scrollLeft = this.boxRef.current.scrollLeft;
  };

  render() {
    const colList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const rowList = [''];
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
        startTime: '00:30',
        duration: 60,
        top: '30px',
        left: '70px',
      },
      {
        id: 2,
        startTime: '01:00',
        duration: 30,
        top: '60px',
        left: '220px',
      },
      {
        id: 3,
        startTime: '02:00',
        duration: 90,
        top: '120px',
        left: '370px',
      },
    ];
    const colTitleList = ['', ...colList];
    const colTitle = colTitleList.map(item => (
      <div key={item} className={style.colTitleItems}>
        {item}
      </div>
    ));
    const rowItems = rowList.map(item => (
      <div
        key={item}
        className={style.rowItems}
        // style={{
        //   borderBottom: index === 0 ? '1px solid #aaa' : '1px dotted #aaa',
        // }}
      >
        {item}
      </div>
    ));
    // const contentBoxItems = rowList.map( (item, index) => (
    //   <div
    //     key={item}
    //     className={style.rowItems}
    //     onDrop={this.onDrop.bind(this, item)}
    //     onDragEnter={this.dragEnter.bind(this, item)}
    //     onDragOver={this.dragOver.bind(this, item)}
    //   >
    //     {index === 0 ? item : ''}
    //   </div>
    // ));
    const contentBox = colList.map(item => (
      <div key={item} className={style.colItems}>
        {rowList.map((i, index) => (
          <div
            key={i}
            className={style.rowItems}
            onDrop={this.onDrop.bind(this, i)}
            onDragEnter={this.dragEnter.bind(this, i)}
            onDragOver={this.dragOver.bind(this, i)}
          >
            {index === 0 ? item : ''}
          </div>
        ))}
      </div>
    ));
    const contentItems = items.map((item, index) => (
      <div
        key={item.id}
        className={style.contentItem}
        style={{
          backgroundColor: index % 2 === 0 ? '#4d9a77' : '#b6d051',
          opacity: 0.8,
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
      <div className={style.container}>
        <div className={style.colTitle} ref={this.colTitleRef}>
          {colTitle}
        </div>
        <div className={style.dnd}>
          <div ref={this.boxRef} className={style.box} onScrollCapture={this.boxScroll.bind(this)}>
            <div className={style.firstCol}>{rowItems}</div>
            {contentBox}
            {contentItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Dnd;
