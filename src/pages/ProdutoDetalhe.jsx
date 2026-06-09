import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import FreightCalculator from '../components/FreightCalculator'

export default function ProdutoDetalhe() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const { addItem } = useCart()
  const navigate = useNavigate()

  const product = products.find(p => p.slug === slug)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null)
  const [qty, setQty] = useState(product?.minQty || 1)
  const [activeImg, setActiveImg] = useState(0)
  const [flash, setFlash] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Produto não encontrado.</p>
          <Link to="/loja" className="text-[#3f533c] font-semibold hover:underline">Voltar para a loja</Link>
        </div>
      </div>
    )
  }

  const name = product.name[lang] || product.name.pt
  const description = product.description[lang] || product.description.pt
  const specs = product.specs[lang] || product.specs.pt

  function handleAdd() {
    addItem(product, qty, selectedColor)
    setFlash(true)
    setTimeout(() => setFlash(false), 2000)
  }

  function handleBuyNow() {
    addItem(product, qty, selectedColor)
    navigate('/carrinho')
  }

  return (
    <div className="min-h-screen bg-white">
      {flash && (
        <div className="fixed top-20 right-4 z-50 bg-[#3f533c] text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {t('added_to_cart')}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-[#3f533c] transition-colors">Início</Link>
          <span>/</span>
          <Link to="/loja" className="hover:text-[#3f533c] transition-colors">Loja</Link>
          <span>/</span>
          <span className="text-gray-700">{name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video mb-4">
              <img
                src={product.images[activeImg]}
                alt={name}
                className="w-full h-full object-cover transition-all"
              />
              {product.isPrototype && (
                <span className="absolute top-4 left-4 bg-[#fb5421] text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase">
                  {t('prototype_badge')}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-[#3f533c]' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">{name}</h1>
            <p className="text-[#fb5421] font-semibold mb-4">{product.tagline[lang] || product.tagline.pt}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="font-semibold text-gray-700 mb-2">{t('select_color')}: <span className="text-[#3f533c]">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-9 h-9 rounded-full border-4 transition-all ${
                        selectedColor === c ? 'border-[#3f533c] scale-110' : 'border-white shadow-md hover:scale-105'
                      }`}
                      style={{ backgroundColor: product.colorMap[c] || '#ccc' }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mb-4">
              <p className="font-semibold text-gray-700 mb-2">{t('select_qty')}:</p>
              {product.hasMinQty && (
                <p className="text-xs text-[#fb5421] mb-2">
                  {t('min_qty')}: {product.minQty.toLocaleString('pt-BR')} {t('unit')}
                </p>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(q => Math.max(product.hasMinQty ? product.minQty : 1, q - (product.hasMinQty ? product.minQty : 1)))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#3f533c] transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-bold text-gray-900 w-20 text-center">{qty.toLocaleString('pt-BR')}</span>
                <button
                  onClick={() => setQty(q => q + (product.hasMinQty ? product.minQty : 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#3f533c] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#e8f0e7] rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Total estimado</p>
              <p className="text-3xl font-black text-[#3f533c]">
                R$ {(product.price * qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / unidade</p>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className="flex-1 border-2 border-[#3f533c] text-[#3f533c] py-3 rounded-xl font-bold hover:bg-green-50 transition-colors"
              >
                {t('add_to_cart')}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#fb5421] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                Comprar Agora
              </button>
            </div>

            {/* Freight calculator */}
            <FreightCalculator />

            {/* Download PDF */}
            <a
              href={product.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <i className="fa-solid fa-file-arrow-down text-[#fb5421]"></i>
              {t('download_pdf')}
            </a>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">{t('specs_title')}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {specs.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100">
                <i className="fa-solid fa-check text-[#3f533c] flex-shrink-0 mt-0.5"></i>
                <span className="text-sm text-gray-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
