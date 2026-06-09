import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: 1, name: 'Admin SmartBugs', email: 'admin@smartbugs.com.br', password: 'admin123', role: 'admin' },
  { id: 2, name: 'João Silva', email: 'joao@email.com', password: '123456', role: 'customer', cpf: '123.456.789-00' },
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

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginAsAdmin, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
