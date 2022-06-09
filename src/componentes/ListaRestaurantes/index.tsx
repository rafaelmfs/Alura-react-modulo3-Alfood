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

  //Foi criado a opção de ver mais, no caso do curso foi implmentado um botão que ao clicar ele concatena os proximos restaurantes na lista já existente mas no caso desse ele só muda para a próxima página sobrescrevendo mesmo.
  const verMais = (urlPagina: string) => {
    axios.get<IPaginacao<IRestaurante>>(urlPagina)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => console.log(erro));
  }

  //Esse useEffect já vai ser executado logo que esse componente for renderizado e é aqui onde é feita a requisição que busca a lista de restaurantes.
  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>("http://0.0.0.0:8000/api/v1/restaurantes/")
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })

  }, [])

  //Esse useEffect é para a busca, no input de busca ele é executado cada vez que os estados "buscaRestaurante" e "restaurantes" atualizarem para renderizar uma lista de restaurante que contém os caracteres da busca no nome.
  //A busca está sendo atualizada no change do input, cada vez que o usuário interagir será atualizado com o conteúdo do input, isso é feito na linha  52 onde tem a função que atualiza o estado buscaRestaurante.
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
