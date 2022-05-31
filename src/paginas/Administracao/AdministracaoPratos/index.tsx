import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { http } from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    const excluir = (pratoExcluido: IPrato) =>{
        http.delete(`pratos/${pratoExcluido.id}/`)
            .then(() => {
                alert(`O prato ${pratoExcluido.nome} foi excluido com sucesso.`)
                const listaPratos = pratos.filter( prato => prato.id !== pratoExcluido.id);
                setPratos([...listaPratos]);
            })

    }

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(resposta => setPratos(resposta.data))
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
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato => (
                    <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            <a href={prato.imagem} target="__black" rel="noreferrer">Ver imagem</a>
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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