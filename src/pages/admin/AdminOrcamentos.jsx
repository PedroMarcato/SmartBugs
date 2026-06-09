import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { mockBudgets } from '../../data/mockBudgets'

export default function AdminOrcamentos() {
  const { t } = useLanguage()
  const [budgets, setBudgets] = useState(mockBudgets)
  const [expanded, setExpanded] = useState(null)

  function updateStatus(id, status) {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-6">{t('admin_quotes')}</h1>

      <div className="space-y-3">
        {budgets.map(b => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div
              className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-mono font-bold text-[#3f533c] text-sm">{b.id}</p>
                  <p className="font-bold text-gray-900">{b.company}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    b.status === 'Pendente' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>{b.status}</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{b.product} · {b.qty} un. · Prazo: {b.deadline}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <p className="text-xs text-gray-400">{b.date}</p>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === b.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {expanded === b.id && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Empresa</p>
                    <p className="text-sm text-gray-800">{b.company}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">E-mail</p>
                    <a href={`mailto:${b.email}`} className="text-sm text-[#3f533c] hover:underline">{b.email}</a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Telefone</p>
                    <p className="text-sm text-gray-800">{b.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Produto</p>
                    <p className="text-sm text-gray-800">{b.product}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Mensagem</p>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{b.message}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <select
                    value={b.status}
                    onChange={e => updateStatus(b.id, e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                  >
                    <option>Pendente</option>
                    <option>Em Análise</option>
                    <option>Proposta Enviada</option>
                    <option>Fechado</option>
                    <option>Cancelado</option>
                  </select>
                  <a
                    href={`mailto:${b.email}?subject=Orçamento SmartBugs ${b.id}`}
                    className="bg-[#3f533c] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#2d3d2b] transition-colors"
                  >
                    Responder por E-mail
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
