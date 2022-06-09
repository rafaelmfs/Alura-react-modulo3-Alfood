import { Routes, Route } from 'react-router-dom';
import { AdministracaoPratos } from './paginas/Administracao/AdministracaoPratos';
import { FormularioPrato } from './paginas/Administracao/AdministracaoPratos/FormularioPratos';
import { AdministracaoRestaurantes } from './paginas/Administracao/AdministracaoRestaurantes';
import { FormularioRestaurante } from './paginas/Administracao/AdministracaoRestaurantes/FormularioRestaurante';
import { PaginaBaseAdmin } from './paginas/Administracao/PaginaBaseAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {
  
//Aqui estão as rotas que são utilizadas na aplicação sendo que no curso criamos a partir do /admin e todas as proximas que levam para a parte administrativa
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}> 
          <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
          <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
          <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

          <Route path="pratos" element={<AdministracaoPratos />} />
          <Route path="pratos/novo" element={<FormularioPrato />} />
          <Route path="pratos/:id" element={<FormularioPrato />} />


      </Route>
    </Routes>
  );
}

export default App;
