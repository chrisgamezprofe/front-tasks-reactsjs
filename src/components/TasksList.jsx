import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  Table,
} from "semantic-ui-react";
import TasksForm from "./TasksForm";
import Task from "./Task";
const TasksList = () => {

  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleDelete = async (taskId) => {
    try {
      // Realiza una solicitud DELETE a la API para eliminar la tarea
      const response = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Elimina la tarea del estado local
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        // Si la solicitud no fue exitosa, muestra un mensaje de error
        console.error('Error al eliminar la tarea:', response.statusText);
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud, muestra un mensaje de error
      console.error("Error al eliminar la tarea:", error);
    }
  };


  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/tasks");
      const data = await response.json();
      // Transforma el JSON recibido en el formato deseado
      const formatted = data.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        beginDate: item.beginDate,
        endDate: item.endDate,
        priority: item.priority.name,
        status: item.status.name,
      }));
      // Actualiza el estado con las prioridades formateadas
      setTasks(formatted);
    } catch (error) {
      console.error("Error al obtener las prioridades:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  },[]);

  return (
    <div>
      <Container textAlign="center">
        {edit && <TasksForm  />}
     
      <Card fluid textAlign="justified">
        <b>Lista de tareas</b>

        <Table celled padded>
          <TableHeader>
            <TableRow>
              <TableHeaderCell singleLine>ID</TableHeaderCell>
              <TableHeaderCell>Titulo</TableHeaderCell>
              <TableHeaderCell>Descripción</TableHeaderCell>
              <TableHeaderCell>Prioridad</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
          {tasks.map(task => (
            <Task key={task.id} task={task} onDelete={handleDelete} />
          ))}
            
          </TableBody>
        </Table>
        </Card>
        </Container>
    </div>
  );
};

export default TasksList;
