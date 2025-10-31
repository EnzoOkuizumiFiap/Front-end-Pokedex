import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaEdit, FaTrash } from "react-icons/fa"

const DivLista = styled.div`
    width: 70%; margin: auto; font-family: Arial;
    a{text-decoration: none; padding: 10px 15px; margin-bottom: 20px;
        background-color: yellowgreen; color: white; display: inline-block;
    }
    table{width: 100%; margin: auto; text-align: center;}
    thead tr{background-color: darkblue; color: white;}
    thead tr th{padding: 10px; }
    tbody tr:nth-child(2n+2){background-color: #ccc;}
    tbody tr td a{background-color: none; margin-bottom: 5px; color: blue;}
    tbody tr td button{color: red; background-color: none; border: none; cursor: pointer; padding: 13px 17px;}
    tfoot tr td{text-align: center; background-color: #333; color: white;}
`
const API_URL = 'https://pokedex-api-w5n4.onrender.com/pokedex/';

export default function ListaPokemon(){

    const [pokedex, setPokedex] = useState([])
    useEffect(()=>{
        fetch(`${API_URL}`).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            setPokedex(resp)
            console.log(resp)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const handleDelete = (id)=>{
        fetch(`${API_URL}${id}`,{
            method:"delete"
        }).then(()=>{
            window.location = "/"
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <DivLista>
            <h1>Lista de Pokemon</h1>
            <Link to="incluir">Inserir Pokemon</Link>
            <table className="text-center">
                <thead>
                    <tr>
                        <th>Nome</th><th>Altura</th><th>Peso</th><th>Categoria</th><th>Data da Captura</th><th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {pokedex.map((pokemon)=>(
                        <tr key={pokemon.codigo}>
                            <td>{pokemon.nome}</td>
                            <td>{pokemon.altura}</td>
                            <td>{pokemon.peso}</td>
                            <td>{pokemon.categoria}</td>
                            <td>{pokemon.dataDaCaptura}</td>
                            <td>
                                <Link to={`/editar/${pokemon.codigo}`}><FaEdit /></Link>&nbsp;
                                <button onClick={handleDelete.bind(this, pokemon.codigo)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot><tr><td colSpan="6">Pokémons do Banco de Dados</td></tr></tfoot>
            </table>
        </DivLista>
    )
}