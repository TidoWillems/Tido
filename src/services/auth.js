// Importiere den Supabase-Client
import { createClient } from '@supabase/supabase-js';

// Hier deine Supabase-URL und -Key einfügen
const supabase = createClient('https://xqxhsqjvnmpgzgjtdvmf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeGhzcWp2bm1wZ3pnanRkdm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MzUyNDMsImV4cCI6MjA1MzUxMTI0M30.FrYQeFUJ29fhPsVplxheNuAhfnS3shsN0eU57kuCWD0');

// Login-Funktion
async function loginUser(email, password) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) {
    console.error('Login Error:', error.message);
  } else {
    console.log('Logged in as:', user.email);
    window.location.href = 'dashboard.html';  // Weiterleitung nach Login
  }
}

// Registrierung
async function registerUser(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error('Registration Error:', error.message);
  } else {
    console.log('User registered:', user.email);
    window.location.href = 'dashboard.html';  // Weiterleitung nach der Registrierung
  }
}

// Event-Listener für das Login-Formular
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginUser(email, password);
});

