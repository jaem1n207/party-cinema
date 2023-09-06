'use client';
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd';
import * as React from 'react';

import { cn } from '@/lib/utils';

type Item = {
  id: string;
  title: string;
};

export default function DraggableList() {
  const data = [
    {
      id: 'section-1',
      title: 'Section 1',
    },
    {
      id: 'section-2',
      title: 'Section 2',
    },
    {
      id: 'section-3',
      title: 'Section 3',
    },
  ];

  const [items, setItems] = React.useState<Item[]>(data);

  function onDragStart() {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  }

  function reorder(list: any[], startIndex: number, endIndex: number) {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: DropResult) {
    if (result.combine) {
      const shallow = [...items];
      shallow.splice(result.source.index, 1);
      setItems(shallow);

      return;
    }

    // dropped outside the list
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const newItems = reorder(items, result.source.index, result.destination.index);

    setItems(newItems);
  }

  return (
    <div className="select-none cursor-grab">
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <ItemList listId="list" items={items} />
      </DragDropContext>
    </div>
  );
}

type ItemListProps = {
  listId?: string;
  items: Item[];
};

export function ItemList({ listId = 'LIST', items }: ItemListProps) {
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Item key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

type ItemProps = {
  item: Item;
  index: number;
};

function Item({ item, index }: ItemProps) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'flex items-center justify-center w-full h-48pxr rounded-16pxr bg-primary/10 text-primary',
            snapshot.draggingOver && 'bg-primary/20',
          )}
        >
          {item.title}
        </div>
      )}
    </Draggable>
  );
}
