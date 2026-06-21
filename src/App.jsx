import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminSidebar from './components/AdminSidebar'

import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Loja from './pages/Loja'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Orcamento from './pages/Orcamento'
import Contato from './pages/Contato'
import MinhaConta from './pages/MinhaConta'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProdutos from './pages/admin/AdminProdutos'
import AdminEstoque from './pages/admin/AdminEstoque'
import AdminPedidos from './pages/admin/AdminPedidos'
import AdminOrcamentos from './pages/admin/AdminOrcamentos'
import AdminContatos from './pages/admin/AdminContatos'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter basename="/SmartBugs">
            <ScrollToTop />
            <Routes>
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/produtos" element={<AdminLayout><AdminProdutos /></AdminLayout>} />
              <Route path="/admin/estoque" element={<AdminLayout><AdminEstoque /></AdminLayout>} />
              <Route path="/admin/pedidos" element={<AdminLayout><AdminPedidos /></AdminLayout>} />
              <Route path="/admin/orcamentos" element={<AdminLayout><AdminOrcamentos /></AdminLayout>} />
              <Route path="/admin/contatos" element={<AdminLayout><AdminContatos /></AdminLayout>} />

              {/* Public routes */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/produtos" element={<PublicLayout><Produtos /></PublicLayout>} />
              <Route path="/loja" element={<PublicLayout><Loja /></PublicLayout>} />
              <Route path="/loja/:slug" element={<PublicLayout><ProdutoDetalhe /></PublicLayout>} />
              <Route path="/carrinho" element={<PublicLayout><Carrinho /></PublicLayout>} />
              <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
              <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
              <Route path="/cadastro" element={<PublicLayout><Cadastro /></PublicLayout>} />
              <Route path="/orcamento" element={<PublicLayout><Orcamento /></PublicLayout>} />
              <Route path="/contato" element={<PublicLayout><Contato /></PublicLayout>} />
              <Route path="/minha-conta" element={<PublicLayout><MinhaConta /></PublicLayout>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </LanguageProvider>
  )
}

