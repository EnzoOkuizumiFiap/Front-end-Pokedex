import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { FaLocationArrow, FaRegTimesCircle } from "react-icons/fa"

const DivForm = styled.div`
    width: 70%; margin: auto; font-family: Arial, Helvetica, sans-serif;
    h1{text-align: center;}
    form{width: 80%; margin: auto;}
    form input{width: 100%; padding: 5px; margin-bottom: 5px;}
    a{background-color: red; margin-botton: 5px; color: white; text-decoration: none; padding: 5px;}
    button{color: white; background-color: green; border: none; display: inline-block; padding: 6px; margin-right: 10px;}
`

const API_URL = 'https://pokedex-api-w5n4.onrender.com/pokedex/';

export default function FormPokemon(){
    
    let {id} = useParams()

    const [novo, setNovo] = useState({
        codigo:id,
        nome:"",
        altura:"",
        peso:"",
        categoria:"",
        dataDaCaptura:""
    })

    let metodo = "post"

    if(id){
        metodo = "put"
    }

    const handleChange = e =>{
        setNovo({...novo, [e.target.name]:e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()

        fetch(`${API_URL}${id ? id : ""}`, {
            method: metodo,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(novo)
        }).then(()=>{
            window.location = "/"
        })
    }

    useEffect(()=>{
        if(id){
            fetch(`${API_URL}${id}`)
            .then((resp)=>{
                return(resp.json())
            }).then(data=>{
                setNovo(data)
            })
        }
    }, [id])

    return(
        <DivForm>
             <h1>Formulário de Pokemons</h1>            
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Pokémon: </label><input type="text" name="nome" value={novo.nome} placeholder="Nome do Pokemon" onChange={handleChange} />
                <label htmlFor="altura">Altura: </label><input type="number" name="altura" value={novo.altura} placeholder="Altura" onChange={handleChange} step="0.01" />
                <label htmlFor="peso">Peso: </label><input type="number" name="peso" value={novo.peso} placeholder="Peso" onChange={handleChange} step="0.01" />
                <label htmlFor="categoria">Categoria do pokémon: </label><input type="text" name="categoria" value={novo.categoria} placeholder="Categoria do Pokemon" onChange={handleChange} />
                <label htmlFor="dataDaCaptura">Data da Captura: </label><input type="date" name="dataDaCaptura" value={novo.dataDaCaptura} onChange={handleChange} />
                <button><FaLocationArrow /></button>
                <Link to="/"><FaRegTimesCircle /></Link>
            </form>
        </DivForm>
    )

}