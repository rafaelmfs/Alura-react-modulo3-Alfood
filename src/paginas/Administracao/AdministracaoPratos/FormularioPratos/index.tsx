import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../../../../http";
import IPrato from "../../../../interfaces/IPrato";
import IRestaurante from "../../../../interfaces/IRestaurante";
import { ITag } from "../../../../interfaces/ITag";

export const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');

    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);

    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const [imagem, setImagem] = useState<File | null>()

    const navigate = useNavigate();
    const parametros = useParams();

    //Esse é o formulário para adicionar ou editar um prato, aqui é utilizado o parametro para saber se vai ser um novo prato ou se ele já existe pelo ID, se não existe é um novo e se existe então ele busca as informações daquele prato para editar.
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricaoPrato);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        //O usuário tem a opção de anexar uma imagem também mas é opcional
        if (imagem) {
            formData.append('imagem', imagem);
        }
        //Aqui valida se já existe o ID e se existe então o prato é atualizado, se não existe é um novo prato.
        if (parametros.id) {
            http.request({
                url: `pratos/${parametros.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(resposta => {
                    alert('prato atualizado com sucesso!');
                    navigate(-1);
                })
                .catch(erro => console.error(erro));

        } else {
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(resposta => {
                    alert('prato cadastrado com sucesso!');
                    setNomePrato('');
                    setDescricaoPrato('');
                    setRestaurante('');
                    setTag('');

                })
                .catch(erro => console.error(erro));
        }


    }

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }

    useEffect(() => {
        //Aqui é feito uma busca na API pelas TAGS e pelos restaurantes e então atualizado os dados nas variavéis de estado.
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags));
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data));
    }, [])

    useEffect(() => {
        //Validado se existe aquele prato e se existir já busca as informações dele na api e atualiza o estado.
        if (parametros.id) {
            http.get<IPrato>(`/pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome);
                    setTag(resposta.data.tag);
                    setDescricaoPrato(resposta.data.descricao);
                    setRestaurante(String(resposta.data.restaurante));
                })
        }
    }, [parametros.id]);


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    value={descricaoPrato}
                    onChange={evento => setDescricaoPrato(evento.target.value)}
                    label="Descrição do prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={evento => selecionarArquivo(evento)} />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}