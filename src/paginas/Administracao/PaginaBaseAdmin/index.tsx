import { AppBar, Container, Toolbar, Typography, Box, Button, Paper, Link } from "@mui/material"
import { Link as RouterLink, Outlet } from "react-router-dom"

//Esse componente é onde fica as partes que são comum entre todas as páginas administrativas e nas rotas é renderizado somente a página em si que é alterada que aqui seria onde está o componente Outlet
export const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Prato
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/" sx={{ml: 'auto'}}>
                                <Button sx={{ my: 2, color: 'white', background: '#0361b9'}}>
                                    Voltar ao site
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/* Conteúdo da página */}
                        <Outlet />
                    </Paper>
                </Container>
            </Box>


        </>
    )
}