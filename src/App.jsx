import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import PrivacidadPage from './pages/PrivacidadPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegistroPage from './pages/RegistroPage.jsx'
import PublicPropuestaPage from './pages/PublicPropuestaPage.jsx'
import { PanelDataProvider } from './context/PanelDataProvider.jsx'
import PanelLayout from './layouts/PanelLayout.jsx'
import PanelDashboard from './pages/panel/PanelDashboard.jsx'
import PanelClientes from './pages/panel/PanelClientes.jsx'
import PanelProductos from './pages/panel/PanelProductos.jsx'
import PanelPropuestas from './pages/panel/PanelPropuestas.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <PanelDataProvider>
        <Routes>
          <Route path="/propuesta/:id" element={<PublicPropuestaPage />} />
          <Route path="/panel" element={<PanelLayout />}>
            <Route index element={<PanelDashboard />} />
            <Route path="clientes" element={<PanelClientes />} />
            <Route path="productos" element={<PanelProductos />} />
            <Route path="propuestas" element={<PanelPropuestas />} />
          </Route>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/privacidad"
            element={
              <Layout>
                <PrivacidadPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/registro"
            element={
              <Layout>
                <RegistroPage />
              </Layout>
            }
          />
        </Routes>
      </PanelDataProvider>
    </BrowserRouter>
  )
}
