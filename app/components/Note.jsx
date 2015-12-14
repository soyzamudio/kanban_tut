import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    console.log('Begin dragging note', props);
    return {};
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    console.log('dragging note', sourceProps, targetProps);
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect) => ({
  connectDragSource: connect.dragSource()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, id, onMove, ...props} = this.props;
    return connectDragSource(connectDropTarget(
      <li {...this.props}>{this.props.children}</li>
    ));
  }
  renderEdit = () => {
    return <input type="text"
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  }
  renderNote = () => {
    const onDelete = this.props.onDelete
    return (
      <div onClick={this.edit}>
        <span className="task">{this.props.task}</span>
        { onDelete ? this.renderDelete() : null }
      </div>
    );
  }
  renderDelete = () => {
    return <button
      className='delete'
      onClick={this.props.onDelete}>x</button>
  }
  edit = () => {
    this.setState({
      editing: true
    });
  }
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  finishEdit = (e) => {
    this.props.onEdit(e.target.value);
    this.setState({
      editing: false
    });
  }
}
