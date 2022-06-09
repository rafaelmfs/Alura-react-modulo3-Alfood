import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { http } from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante"

//Esse componente é onde renderiza uma lista de restaurantes e o usuário pode criar, editar e excluir.
export const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    //Para excluir foi utilizado o método HTTP DELETE e passado por parametro o id do restaurante a ser excluido e atualizado a lista de restaurantes.
    const excluir = (restauranteExcluido: IRestaurante) =>{
        http.delete(`restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                alert(`O restaurante ${restauranteExcluido.nome} foi excluido com sucesso.`)
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id);
                setRestaurantes([...listaRestaurante]);
            })

    }

    //Aqui é onde faz o GET da lista de restaurantes e atualiza o estado.
    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                    <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}