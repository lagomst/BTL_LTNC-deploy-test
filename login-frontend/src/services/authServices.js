const API_URL = 'http://localhost:5000/admin/login';

export const login = async (email, password) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
        sessionStorage.setItem('jwtToken', data.token); // Lưu token
  }
  return data;
};

export const register = async (name, email, password) => {
  const response = await fetch('http://localhost:5000/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return response.json();
};
