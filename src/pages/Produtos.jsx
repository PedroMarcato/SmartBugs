import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { products } from '../data/products'

export default function Produtos() {
  const { lang, t } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#3f533c] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{t('products_page_title')}</h1>
        <p className="text-green-200 text-lg max-w-2xl mx-auto">{t('products_page_subtitle')}</p>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {products.map((product, idx) => {
          const name = product.name[lang] || product.name.pt
          const tagline = product.tagline[lang] || product.tagline.pt
          const description = product.description[lang] || product.description.pt
          const specs = product.specs[lang] || product.specs.pt
          const isEven = idx % 2 === 0

          return (
            <div key={product.id} className={`grid md:grid-cols-2 gap-12 items-start ${!isEven ? 'md:flex-row-reverse' : ''}`}>
              {/* Media side */}
              <div className={isEven ? 'order-1' : 'order-1 md:order-2'}>
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video mb-4">
                  <img src={product.image} alt={name} className="w-full h-full object-cover" />
                  {product.isPrototype && (
                    <span className="absolute top-4 left-4 bg-[#fb5421] text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {t('prototype_badge')}
                    </span>
                  )}
                </div>

                {/* Thumbnail row */}
                <div className="flex gap-2 mb-4">
                  {product.images.map((img, i) => (
                    <div key={i} className="w-20 h-16 rounded-xl overflow-hidden border-2 border-gray-100 flex-shrink-0">
                      <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Video */}
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <i className="fa-solid fa-circle-play text-[#fb5421]"></i>
                    {t('video_title')}
                  </div>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${product.videoId}`}
                      title={name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Info side */}
              <div className={isEven ? 'order-2' : 'order-2 md:order-1'}>
                <h2 className="text-3xl font-black text-gray-900 mb-2">{name}</h2>
                <p className="text-[#fb5421] font-semibold text-lg mb-4">{tagline}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

                {/* Specs */}
                <div className="bg-[#e8f0e7] rounded-2xl p-5 mb-6">
                  <h3 className="font-bold text-[#3f533c] mb-3">{t('specs_title')}</h3>
                  <ul className="space-y-2">
                    {specs.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <i className="fa-solid fa-check text-[#3f533c] mt-0.5 flex-shrink-0"></i>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colors (box only) */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-600 mb-2">{t('color_label')}:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(c => (
                        <div key={c} className="flex items-center gap-1.5">
                          <span
                            className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: product.colorMap[c] || '#ccc' }}
                          />
                          <span className="text-xs text-gray-600">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-black text-[#3f533c]">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-gray-400 text-sm">/ unidade</span>
                </div>

                {product.hasMinQty && (
                  <p className="text-sm text-[#fb5421] font-medium mb-4">
                    {t('min_qty')}: {product.minQty.toLocaleString('pt-BR')} {t('unit')}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/loja/${product.slug}`}
                    className="bg-[#fb5421] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                  >
                    {t('buy_btn')}
                  </Link>
                  <a
                    href={product.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border-2 border-[#3f533c] text-[#3f533c] px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                  >
                      <i className="fa-solid fa-file-arrow-down"></i>
                    {t('download_pdf')}
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
