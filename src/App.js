import React, { Component } from "react";
import TrelloList from "./components/TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./components/TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "./actions";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log("hi from func", type);
    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h2>Trello</h2>
        <hr />
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <TrelloActionButton list />
            </ListContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
