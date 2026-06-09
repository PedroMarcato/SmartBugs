import { useLanguage } from '../../context/LanguageContext'
import { mockOrders } from '../../data/mockOrders'
import { mockBudgets, mockContacts } from '../../data/mockBudgets'
import { products } from '../../data/products'

const STATS = [
  { key: 'admin_orders_count', value: '3', color: 'bg-blue-50 text-blue-600', icon: 'fa-box' },
  { key: 'admin_revenue', value: 'R$ 470.129', color: 'bg-green-50 text-green-600', icon: 'fa-money-bill-wave' },
  { key: 'admin_quotes_count', value: '2', color: 'bg-orange-50 text-orange-600', icon: 'fa-clipboard-list' },
  { key: 'admin_messages', value: '2 novos', color: 'bg-purple-50 text-purple-600', icon: 'fa-comments' },
]

export default function AdminDashboard() {
  const { t } = useLanguage()

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-6">{t('admin_dashboard')}</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.key} className={`rounded-2xl p-5 ${s.color} border border-current/10`}>
            <i className={`fa-solid ${s.icon} text-2xl mb-2 block`}></i>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-sm font-medium opacity-80 mt-0.5">{t(s.key)}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Pedidos Recentes</h2>
          <div className="space-y-3">
            {mockOrders.slice(0, 4).map(o => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{o.id}</p>
                  <p className="text-xs text-gray-500">{o.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">
                    R$ {o.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    o.status === 'Pago' || o.status === 'Entregue' ? 'bg-green-100 text-green-700' :
                    o.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                    o.status === 'Em Separação' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products overview */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Produtos</h2>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name.pt}</p>
                  <p className="text-xs text-gray-500">R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                  p.inStock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {p.inStock ? 'Em Estoque' : 'Sob Consulta'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending quotes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Orçamentos Pendentes</h2>
          <div className="space-y-3">
            {mockBudgets.filter(b => b.status === 'Pendente').map(b => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{b.company}</p>
                  <p className="text-xs text-gray-500">{b.product} · {b.qty} un.</p>
                </div>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New messages */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Mensagens Recentes</h2>
          <div className="space-y-3">
            {mockContacts.filter(c => !c.read).map(c => (
              <div key={c.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 rounded-full bg-[#e8f0e7] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#3f533c]">
                  {c.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                  <span className={`text-xs flex items-center gap-1 ${c.type === 'internacional' ? 'text-blue-500' : 'text-green-500'}`}>
                    <i className={`fa-solid ${c.type === 'internacional' ? 'fa-globe' : 'fa-flag'}`}></i>
                    {c.type === 'internacional' ? 'Internacional' : 'Nacional'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
