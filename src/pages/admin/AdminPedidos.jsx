import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { mockOrders } from '../../data/mockOrders'

const STATUS_COLORS = {
  'Pago': 'bg-green-100 text-green-700',
  'Aguardando Pagamento': 'bg-yellow-100 text-yellow-700',
  'Em Separação': 'bg-blue-100 text-blue-700',
  'Enviado': 'bg-purple-100 text-purple-700',
  'Entregue': 'bg-gray-100 text-gray-600',
}

const STATUS_OPTIONS = Object.keys(STATUS_COLORS)

export default function AdminPedidos() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState(mockOrders)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  function updateStatus(id, status) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-black text-gray-900">{t('admin_orders')}</h1>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'all' ? 'bg-[#3f533c] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Todos ({orders.length})
          </button>
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === s ? 'bg-[#3f533c] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Pedido', 'Cliente', 'Produto', 'Qtd', 'Total', 'Pgto', 'Data', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-4 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3.5 font-mono font-semibold text-[#3f533c]">{o.id}</td>
                <td className="px-4 py-3.5 text-gray-800 font-medium">{o.customer}</td>
                <td className="px-4 py-3.5 text-gray-600">{o.product}</td>
                <td className="px-4 py-3.5 text-gray-600">{o.qty.toLocaleString('pt-BR')}</td>
                <td className="px-4 py-3.5 font-bold text-gray-800">
                  R$ {o.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3.5 text-gray-600">{o.payment}</td>
                <td className="px-4 py-3.5 text-gray-500">{o.date}</td>
                <td className="px-4 py-3.5">
                  <select
                    value={o.status}
                    onChange={e => updateStatus(o.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full font-medium border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3.5">
                  <button className="text-xs text-[#3f533c] hover:underline font-medium whitespace-nowrap">Ver detalhes</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="text-center py-10 text-gray-400">Nenhum pedido encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
