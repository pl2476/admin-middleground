import React, { PureComponent } from 'react';
import style from './index.less';

class SimilarTable extends PureComponent {
  render() {
    const tableHeadList = [1, 2, 3, 4, 5, 6, 7];
    const tableBodyList = [];
    for (let i = 0; i < 30; i += 1) {
      tableBodyList.push(i);
    }
    const colTitle = ['', ...tableHeadList].map((item, index) => (
      <div key={item} className={style.cell}>
        {index > 0 ? item : ''}
      </div>
    ));
    const body = tableBodyList.map((rowItem, i) => (
      <div key={rowItem} className={style.row}>
        {['', ...tableHeadList].map((colItem, j) => (
          <div key={colItem} className={style.cell}>
            {j === 0 ? i + 1 : ''}
          </div>
        ))}
      </div>
    ));
    return (
      <div className={style.grid}>
        <div className={style.left}>
          <div className={style.top}>top</div>
          <div className={style.middle}>
            <div className={style.head}>
              <div className={style.row}>{colTitle}</div>
            </div>
            <div className={style.body}>{body}</div>
          </div>
          <div className={style.bottom}>bottom</div>
        </div>
        <div className={style.right}>
          <div className={style.top}>top</div>
          <div className={style.bottom}>bottom</div>
        </div>
      </div>
    );
  }
}

export default SimilarTable;
