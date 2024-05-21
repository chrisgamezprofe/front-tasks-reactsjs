import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormTextArea,
  FormSelect,
   FormInput,
  FormGroup,
  FormCheckbox,
  FormButton,
  Form,
  Message,
  Button,
  Container,
  Card,
} from "semantic-ui-react";
import { useParams,useNavigate } from "react-router-dom";

const TasksForm = () => {
  const { idTask } = useParams();

  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState();
  const [selectedItem, setSelectedItem] = useState("");
  const [priorities, setPriorities] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState();
  const [id, setId] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(0);
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
  const [message, setMessage] = useState();

  // Solicitud a la API y obtiene la lista de prioridades
  const fetchPriorities = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/priorities");
      const data = await response.json();
      // Transforma el JSON recibido en el formato deseado
      const formatted = data.map((item) => ({
        key: item.id.toString(),
        text: item.name,
        value: item.id,
      }));
      // Actualiza el estado con las prioridades formateadas
      setPriorities(formatted);
    } catch (error) {
      console.error("Error al obtener las prioridades:", error);
    }
  };

  const saveTask = async (event) => {
    event.preventDefault();
    setLoading(true);

    const task = {
      name,
      description,
      beginDate,
      endDate,
      priority: { id: priority },
      status: { id: status },
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const result = await response.json();
        navigate("/")
      } else {
        setMessage("Error creating task:");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Error creating task:");
      setLoading(false);
    }
  };

  const updateTask = async (event) => {
    event.preventDefault();
    setLoading(true);

    const task = {
      id,
      name,
      description,
      beginDate,
      endDate,
      priority: { id: priority },
      status: { id: status },
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const result = await response.json();
        navigate("/")
      } else {
        setMessage("Error creating task:");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Error creating task:");
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/status");
      const data = await response.json();
      // Transforma el JSON recibido en el formato deseado
      const formatted = data.map((item) => ({
        key: item.id.toString(),
        text: item.name,
        value: item.id,
      }));
      // Actualiza el estado con las prioridades formateadas
      setStates(formatted);
    } catch (error) {
      console.error("Error al obtener las prioridades:", error);
    }
  };

  
  const fetchInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/tasks/${idTask}`);
      const data = await response.json();
      console.log(data);
      // Transforma el JSON recibido en el formato deseado
        setName(data.name);
        setId(data.id);
        setBeginDate(data.beginDate);
        setEndDate(data.endDate);
        setDescription(data.description);
        setPriority(data.priority.id);
        setStatus(data.status.id);
        setLoading(false);
      
    } catch (error) {
      console.error("Error al obtener las prioridades:", error);
    }
  };

  const handleChange = (event) => {};

  useEffect(() => {
    fetchPriorities();
    fetchStates();
    fetchInfo();
    
  }, []);

  return (
    <Container textAlign="center">
        
     
      <Card fluid textAlign="justified"></Card>
    <Form>
      <FormGroup widths="equal">
          <FormInput
          value={name}
          fluid
          label="Tarea"
          placeholder="Nombre de la tarea"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

          <FormSelect
          value={priority}
          fluid
          label="Prioridad"
          options={priorities}
          placeholder="Prioridad"
          onChange={(e, { value }) => setPriority(value)}
        />

          <FormSelect
          value={status}
          fluid
          label="Estado"
          options={states}
          placeholder="Estado"
          onChange={(e, { value }) => setStatus(value)}
        />
      </FormGroup>
      <FormGroup widths="equal">
          <FormInput
            value={beginDate}
          type="date"
          fluid
          label="Fecha inicio"
          placeholder="Cuando inicia"
          onChange={(e) => {
            setBeginDate(e.target.value);
          }}
        />

          <FormInput
            value={endDate}
            min={beginDate}
          type="date"
          fluid
          label="Fecha fin"
          placeholder="Cuando inicia"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
      </FormGroup>
        <FormTextArea
          value={description}
        label="Descripción"
        placeholder="Escribe el detalle de la tarea..."
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
        {loading && (
          <Button loading primary>
            Loading
          </Button>
        )} 
        {!idTask ? (<FormButton
          onClick={saveTask}
          disabled={
            !beginDate ||
            !endDate ||
            !name ||
            priority == 0 ||
            status == 0 ||
            !description
          }
        >
          Guardar
        </FormButton>) :
          (<FormButton
            onClick={updateTask}
            
          >
            Actualizar
          </FormButton>)
      }

      {message && <p>{message}</p>}
      </Form>
      </Container>
  );
};

export default TasksForm;
