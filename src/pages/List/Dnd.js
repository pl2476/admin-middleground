import React, { PureComponent } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';

class Dnd extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('componentDidMount', this.props, dispatch, this.state);
    // dispatch({
    //   type: 'customs/fetch',
    //   payload: {
    //     userCode: 1,
    //     pageNumber: 1,
    //     pageSize: 10,
    //   },
    // });
  }

  render() {
    console.log('render', this.props);
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
          <div style={{ float: 'left' }}>
            <SourceBox showCopyIcon />
            <SourceBox />
          </div>
          <div style={{ float: 'left' }}>
            <TargetBox />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default Dnd;
