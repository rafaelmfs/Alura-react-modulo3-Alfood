import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [buscaRestaurante, setBuscaRestaurante] = useState('');

  const verMais = (urlPagina: string) => {
    axios.get<IPaginacao<IRestaurante>>(urlPagina)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => console.log(erro));
  }
  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>("http://0.0.0.0:8000/api/v1/restaurantes/")
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })

  }, [])

  useEffect(() => {
    if(buscaRestaurante){
      const listaRestaurantes: IRestaurante[] = restaurantes.filter((restaurante) => restaurante.nome.toLowerCase().includes(buscaRestaurante.toLowerCase()));
      setRestaurantesFiltrados([...listaRestaurantes]);
    }
  }, [buscaRestaurante, restaurantes])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <TextField
        value={buscaRestaurante}
        onChange={(event) => setBuscaRestaurante(event.target.value)}
        label="Buscar"
        variant="standard"
      />
      {buscaRestaurante !== "" ? restaurantesFiltrados.map(item => <Restaurante restaurante={item} key={item.id} />) 
      : 
      restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {paginaAnterior && <Button variant="outlined"onClick={() => verMais(paginaAnterior)}>{'<'}</Button>}
      {proximaPagina && <Button variant="outlined" onClick={() => verMais(proximaPagina)}>{'>'}</Button> }
    </section>
  )
}



export default ListaRestaurantes
