const BASE_URL = 'http://localhost:5000'
export const login = async (email, password) => {
  const API_URL = BASE_URL + window.location.pathname;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
    sessionStorage.setItem('jwtToken', data.token); // Lưu token
    sessionStorage.setItem('userdata', JSON.stringify(data.userdata));
  }
  return data;
};