import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { products as initialProducts } from '../../data/products'

export default function AdminProdutos() {
  const { lang, t } = useLanguage()
  const [items, setItems] = useState(initialProducts)
  const [editing, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleEdit(product) {
    setEditing({ ...product })
    setShowModal(true)
  }

  function handleSave() {
    setItems(prev => prev.map(p => p.id === editing.id ? editing : p))
    setShowModal(false)
    setEditing(null)
  }

  function handleDelete(id) {
    if (window.confirm('Confirmar exclusão deste produto?')) {
      setItems(prev => prev.filter(p => p.id !== id))
    }
  }

  function handleToggleStock(id) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-900">{t('admin_products')}</h1>
        <button className="bg-[#fb5421] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2">
          <span>+</span> Adicionar Produto
        </button>
      </div>

      <div className="space-y-4">
        {items.map(product => {
          const name = product.name[lang] || product.name.pt
          return (
            <div key={product.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-center">
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={product.image} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900">{name}</p>
                  {product.isPrototype && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Protótipo</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  {product.hasMinQty && ` · Mín. ${product.minQty.toLocaleString('pt-BR')} un.`}
                </p>
                {product.colors.length > 0 && (
                  <div className="flex gap-1 mt-1.5">
                    {product.colors.map(c => (
                      <span key={c} className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: product.colorMap[c] || '#ccc' }} title={c} />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => handleToggleStock(product.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    product.inStock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {product.inStock
                    ? <><i className="fa-solid fa-check mr-1"></i>Em Estoque</>
                    : <><i className="fa-solid fa-xmark mr-1"></i>Sem Estoque</>}
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="text-sm text-[#3f533c] hover:underline font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-sm text-red-400 hover:text-red-600 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      {showModal && editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="font-black text-gray-900 text-xl mb-5">Editar Produto</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nome (PT)</label>
                <input
                  type="text"
                  value={editing.name.pt}
                  onChange={e => setEditing(prev => ({ ...prev, name: { ...prev.name, pt: e.target.value } }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editing.price}
                  onChange={e => setEditing(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="inStockEdit"
                  checked={editing.inStock}
                  onChange={e => setEditing(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="accent-[#3f533c]"
                />
                <label htmlFor="inStockEdit" className="text-sm font-medium text-gray-700">Em estoque</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isProtoEdit"
                  checked={editing.isPrototype}
                  onChange={e => setEditing(prev => ({ ...prev, isPrototype: e.target.checked }))}
                  className="accent-[#3f533c]"
                />
                <label htmlFor="isProtoEdit" className="text-sm font-medium text-gray-700">É protótipo</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowModal(false); setEditing(null) }}
                className="flex-1 border-2 border-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave}
                className="flex-1 bg-[#3f533c] text-white py-2.5 rounded-xl font-semibold hover:bg-[#2d3d2b] transition-colors">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
