import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../../../../http";

export const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('');
    const parametros = useParams();
    const navigate = useNavigate();

    //Essa parte é onde cria e edita um restaurante seguindo a mesma lógica dos pratos, ele utiliza o parâmetro para verificar se existe o restaurante e se não existir cria um novo e se existir ele só edita.
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then(resposta => {
                alert('Restaurante atualizado com sucesso!');
                navigate("/admin/restaurantes");
            })

        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            }).then(resposta => {
                alert('Restaurante cadastrado...');
                navigate("/admin/restaurantes");
            })
        }


    }

    //Esse useEffect é para verificar se já existe o restaurante e se existir ele atualiza o estado com os dados do restaurante existente.
    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros.id])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    label="Nome do restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}