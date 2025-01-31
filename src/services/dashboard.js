import { createClient } from '@supabase/supabase-js';

// Hier deine Supabase-URL und -Key einfügen
const supabase = createClient('https://xqxhsqjvnmpgzgjtdvmf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeGhzcWp2bm1wZ3pnanRkdm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MzUyNDMsImV4cCI6MjA1MzUxMTI0M30.FrYQeFUJ29fhPsVplxheNuAhfnS3shsN0eU57kuCWD0');

// Anzeige der Projekte
async function displayProjects() {
  const user = supabase.auth.user();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching projects:', error.message);
    return;
  }

  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = '';  // Vorherige Projekte löschen

  data.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.textContent = project.name;
    projectsList.appendChild(projectElement);
  });
}

// Neues Projekt erstellen
async function createProject() {
  const projectName = prompt('Enter project name');
  const projectDescription = prompt('Enter project description');

  if (projectName && projectDescription) {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('projects')
      .insert([
        { user_id: user.id, name: projectName, description: projectDescription }
      ]);

    if (error) {
      console.error('Error creating project:', error.message);
    } else {
      displayProjects();  // Projekte neu laden
    }
  }
}

// Logout-Funktion
function logout() {
  supabase.auth.signOut();
  window.location.href = 'login.html';  // Zur Login-Seite weiterleiten
}

// Event-Listener für Buttons
document.getElementById('logout-button').addEventListener('click', logout);
document.getElementById('create-project-button').addEventListener('click', createProject);

// Initiale Anzeige der Projekte
displayProjects();
