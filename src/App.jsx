import { BrowserRouter, Routes, Route } from "react-router-dom"
import ListaPokemon from "./components/ListaPokemon";
import FormPokemon from "./components/FormPokemon";

export default function App(){
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListaPokemon/>} />
                <Route path="/incluir" element={<FormPokemon/>} />
                <Route path="/editar/:id" element={<FormPokemon/>} />
            </Routes>
        </BrowserRouter>
    );

}