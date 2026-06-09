import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { products } from '../../data/products'

const COLORS = ['Preto', 'Branco', 'Verde', 'Azul', 'Laranja', 'Amarelo']
const COLORMAP = {
  Preto: '#222', Branco: '#f0f0f0', Verde: '#3f533c',
  Azul: '#1d4ed8', Laranja: '#fb5421', Amarelo: '#fbbf24',
}

const initialStock = [
  { id: 'caixa-preto', product: 'Caixa SmartBugs BSF', color: 'Preto', qty: 12000, reserved: 2400 },
  { id: 'caixa-branco', product: 'Caixa SmartBugs BSF', color: 'Branco', qty: 8400, reserved: 0 },
  { id: 'caixa-verde', product: 'Caixa SmartBugs BSF', color: 'Verde', qty: 6000, reserved: 6000 },
  { id: 'caixa-azul', product: 'Caixa SmartBugs BSF', color: 'Azul', qty: 7200, reserved: 3600 },
  { id: 'caixa-laranja', product: 'Caixa SmartBugs BSF', color: 'Laranja', qty: 4800, reserved: 0 },
  { id: 'caixa-amarelo', product: 'Caixa SmartBugs BSF', color: 'Amarelo', qty: 2400, reserved: 0 },
  { id: 'gaiola-default', product: 'Gaiola de Acasalamento BSF', color: '—', qty: 8, reserved: 2 },
  { id: 'coletor-default', product: 'Coletor de Ovos BSF', color: '—', qty: 143, reserved: 15 },
]

export default function AdminEstoque() {
  const { t } = useLanguage()
  const [stock, setStock] = useState(initialStock)

  function handleQtyChange(id, val) {
    setStock(prev => prev.map(s => s.id === id ? { ...s, qty: parseInt(val) || 0 } : s))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-900">{t('admin_stock')}</h1>
        <button className="bg-[#fb5421] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
          + Entrada de Estoque
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-4 font-semibold text-gray-600">Produto</th>
              <th className="text-left px-5 py-4 font-semibold text-gray-600">Cor</th>
              <th className="text-right px-5 py-4 font-semibold text-gray-600">Estoque</th>
              <th className="text-right px-5 py-4 font-semibold text-gray-600">Reservado</th>
              <th className="text-right px-5 py-4 font-semibold text-gray-600">Disponível</th>
              <th className="text-center px-5 py-4 font-semibold text-gray-600">Status</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {stock.map(s => {
              const available = s.qty - s.reserved
              const statusColor = available <= 0 ? 'bg-red-100 text-red-700' : available < 2400 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              const statusText = available <= 0 ? 'Esgotado' : available < 2400 ? 'Baixo' : 'OK'
              return (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{s.product}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {s.color !== '—' && (
                        <span className="w-4 h-4 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: COLORMAP[s.color] || '#ccc' }} />
                      )}
                      <span className="text-gray-600">{s.color}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <input
                      type="number"
                      value={s.qty}
                      onChange={e => handleQtyChange(s.id, e.target.value)}
                      className="w-24 text-right border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                    />
                  </td>
                  <td className="px-5 py-3.5 text-right text-gray-600">{s.reserved.toLocaleString('pt-BR')}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-gray-800">{available.toLocaleString('pt-BR')}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>{statusText}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button className="text-xs text-[#3f533c] hover:underline font-medium">Editar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
