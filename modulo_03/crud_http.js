const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

// Usar um array para armazenar as informações
const projects = [];

// Usando um método GET para listar todos os projetos
app.get('/projects', (request, response) => {
  const { title } = request.query;

  const result = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(result);

});


// Usando um método POST para adicionar um projeto e mostra-lo
app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});


// Usando um método PUT para identificar/obter um recurso e modifica-lo
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id );

  if(projectIndex < 0){
    return response.status(400).json({ error: 'Project not found'});
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return response.json(project);

});

app.delete('/project/:id', (request, response) => {
  const { id } = request.params; 

  const projectIndex = projects.findIndex(project => project.id === id );

  if(projectIndex < 0){
    return response.status(400).json({ error: 'Project not found'});
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();

});

app.listen(3333, () => {
  console.log('Back-end started!');
});


