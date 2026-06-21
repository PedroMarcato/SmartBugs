import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: 1, name: 'Admin SmartBugs', email: 'admin@smartbugs.com.br', password: 'admin123', role: 'admin' },
  {
    id: 2, name: 'João Silva', email: 'joao@email.com', password: '123456',
    role: 'customer', cpf: '123.456.789-00', birthDate: '1985-04-15',
    phone: '(41) 99999-0000',
    cep: '80010-000', street: 'Rua XV de Novembro', number: '500',
    complement: 'Apto 302', neighborhood: 'Centro', city: 'Curitiba', state: 'PR',
  },
  {
    id: 3, name: 'Pedro Otávio', email: 'pedrootaviomarcato122@gmail.com', password: 'otavio08',
    role: 'customer', cpf: '', birthDate: '',
    phone: '', cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: 'PR',
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(email, password) {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      return { ok: true }
    }
    return { ok: false, error: 'E-mail ou senha inválidos.' }
  }

  function loginAsAdmin() {
    setUser(MOCK_USERS[0])
  }

  function register(data) {
    const newUser = { id: Date.now(), ...data, role: 'customer' }
    setUser(newUser)
    return { ok: true }
  }

  function updateProfile(data) {
    setUser(prev => ({ ...prev, ...data }))
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginAsAdmin, register, updateProfile, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
