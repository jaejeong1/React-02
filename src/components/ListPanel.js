import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

const ListPanel = React.memo(({ todoData, setTodoData, handleClick }) => {
    const handleEnd = (result) => {
        if (!result.destination) return;

        const newTodoData = todoData;

        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData);
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="todo">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) =>(
                                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <List 
                                            handleClick={handleClick}
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            isEdit={data.isEdit}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
})

export default ListPanel