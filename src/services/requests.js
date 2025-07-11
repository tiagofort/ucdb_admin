export const getAllSearch = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/dataResearch/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
  });

  if (response.status === 401) {
      return null; 
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}

export const generateExcel = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/dataResearch/export`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados_pesquisa.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Erro ao gerar Excel:', error);
  }
};

export const deleteSearch = async (id) => {
  try{
      await fetch(`${import.meta.env.VITE_API_URL}/dataResearch/${id}`, { method: 'DELETE' });
  }catch (error){
      console.error('Erro ao gerar Excel:', error);
  }
  
}

export const countAnswers = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/dataResearch/countAnswers`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
      return null; 
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();

}

export const getCities = async (state) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/socioDemographic/states/${state}/cities`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}

export const getStates = async (state) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/socioDemographic/states`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}

export const getUsers = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) return response.status;

  const data = await response.json();

  return data;
}

export const manipulateUserData = async (payload, editingId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/users${editingId ? `/${editingId}` : ''}`,
    {
      method: editingId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
        body: JSON.stringify(payload),
    }
  );

  if (response.status === 401) return response.status;

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data;
}

export const editUser = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) return response.status;

  const data = response.json();

  return data
}