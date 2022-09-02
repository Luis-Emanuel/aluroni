import Item from './item';
import styles from './Itens.module.scss';
import cardapio from 'data/cardapio.json';
import { useEffect, useState } from 'react';
import { Cardapio } from 'types/Prato';

interface Props{
    filtro: number | null
    busca: string
    ordenador: string
} 


export default function Itens(props: Props){
  const [lista, setLista] = useState(cardapio);
  const{filtro, busca, ordenador} = props;

  const ordenarPropriedadeCrescente = (
    lista: Cardapio,
    propriedade: 'size' | 'serving' | 'price')=>
  {
    return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  };
   
  function testaBusca(title: string){
    const regex = new RegExp(busca, 'i');
    return regex.test(title);
  }
  function testaFiltro(id: number){
    if(filtro !== null) return filtro === id;
    return true;
  }
  function ordenar(novaLista: Cardapio){
    switch(ordenador){
    case 'porcao':
      return ordenarPropriedadeCrescente(novaLista, 'size'); 
    case 'qtd_pessoas':
      return ordenarPropriedadeCrescente(novaLista, 'serving');
    case 'preco':
      return ordenarPropriedadeCrescente(novaLista, 'price');
    default:
      return novaLista;
    }
  }

  useEffect(() => {
    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id));
    setLista(ordenar(novaLista));
  },[filtro, busca, ordenador]);

  return(
    <div className={styles.itens}>
      {lista.map(item => (
        <Item 
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
} 