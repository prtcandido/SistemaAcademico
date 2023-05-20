import { useQuery } from 'react-query';
import axios from 'axios';

const buscarPorTodos = async () => {
  const response = await axios.get('http://localhost:4000/calendario');
  return response.data;
};

const useBuscarPorTodos = () => {
  return useQuery('calendario', buscarPorTodos);
};

export default useBuscarPorTodos;
