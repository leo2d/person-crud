const getStatusLabel = code => {
  const options = {
    1: 'Ativo',
    2: 'Inativo',
  };

  return options[code] || 'Excluido';
};

export { getStatusLabel };
