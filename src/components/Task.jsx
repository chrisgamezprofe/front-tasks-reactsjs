import React from 'react'
import { Link } from 'react-router-dom';
import { TableRow,Header,TableCell,Rating } from 'semantic-ui-react';

const Task = ({ task, onDelete }) => {
  return (
    <TableRow>
    <TableCell>
      <Header as="h2" textAlign="center">
      { task.id } 
      </Header>
    </TableCell>
      <TableCell singleLine>{ task.name }</TableCell>
      <TableCell singleLine>{ task.description }</TableCell>
    <TableCell>
      <Rating icon="star" defaultRating={task.priority=='Bajo'?1:task.priority=='Medio'?2:3} maxRating={3} />

    </TableCell>
    <TableCell>
    <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </TableCell>
    <TableCell>
    <Link type='button' to={`/find/${task.id}`}>Editar</Link>
    </TableCell>
  </TableRow>

    );
  };
  
  export default Task;