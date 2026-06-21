import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useState } from 'react'

const DIFFERENTIALS = ['diff_1', 'diff_2', 'diff_3', 'diff_4']

export default function Home() {
  const { t } = useLanguage()
  const [cartFlash, setCartFlash] = useState(false)

  function handleAddToCart() {
    setCartFlash(true)
    setTimeout(() => setCartFlash(false), 2000)
  }

  return (
    <div className="overflow-x-hidden">
      {/* Flash notification */}
      {cartFlash && (
        <div className="fixed top-20 right-4 z-50 bg-[#3f533c] text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {t('added_to_cart')}
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative bg-[#3f533c] min-h-[90vh] flex items-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#fb5421] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#fb5421]/20 text-[#fb5421] border border-[#fb5421]/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              {t('hero_tag')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {t('hero_title')}
            </h1>
            <p className="text-lg text-green-200 mb-8 leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/loja"
                className="bg-[#fb5421] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/30"
              >
                {t('hero_cta_shop')}
              </Link>
              <Link
                to="/produtos"
                className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                {t('hero_cta_about')}
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-square max-w-md mx-auto">
              <img
                src="https://placehold.co/600x600/3f533c/ffffff?text=SmartBugs+BSF"
                alt="SmartBugs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3f533c]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#fb5421] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-bug text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Mosca-Soldado Negra (BSF)</p>
                    <p className="text-xs text-gray-500">Hermetia illucens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[#fb5421] py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            { value: '1.200+', label: 'Un. mín. por pedido (Caixa)' },
            { value: '3', label: 'Produtos especializados' },
            { value: '100%', label: 'Fabricado no Brasil' },
            { value: 'PR', label: 'Orgulho Paranaense' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-black">{s.value}</p>
              <p className="text-sm text-orange-100 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About / Missão ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl">
              <img src="https://placehold.co/700x400/3f533c/ffffff?text=Sobre+a+SmartBugs" alt="Sobre a SmartBugs" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[#fb5421] font-semibold text-sm uppercase tracking-widest">{t('about_tag')}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-6 leading-tight">
              {t('about_title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">{t('about_text')}</p>
            <div className="grid grid-cols-1 gap-4">
              {['mission', 'vision', 'values'].map(v => (
                <div key={v} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#e8f0e7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid text-[#3f533c] text-lg ${
                      v === 'mission' ? 'fa-bullseye' : v === 'vision' ? 'fa-eye' : 'fa-star'
                    }`}></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t(`about_${v}_title`)}</p>
                    <p className="text-sm text-gray-500">{t(`about_${v}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem → Solution ── */}
      <section className="py-24 bg-[#e8f0e7]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Problem */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-red-100">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {t('problem_tag')}
            </span>
            <h2 className="text-2xl font-black text-gray-900 mb-4">{t('problem_title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t('problem_text')}</p>
            <ul className="space-y-3">
              {['Caixas inadequadas e improvisadas', 'Perda de ovos por falta de estrutura', 'Baixa produtividade e escala limitada', 'Dificuldade de higienização'].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                  <i className="fa-solid fa-xmark text-red-500 mt-0.5 flex-shrink-0"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-[#3f533c] rounded-3xl p-8 shadow-sm">
            <span className="inline-block bg-[#fb5421]/20 text-[#fb5421] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-[#fb5421]/30">
              {t('solution_tag')}
            </span>
            <h2 className="text-2xl font-black text-white mb-4">{t('solution_title')}</h2>
            <p className="text-green-200 leading-relaxed mb-6">{t('solution_text')}</p>
            <ul className="space-y-3">
              {['Caixas desenvolvidas especificamente para BSF', 'Design modular com empilhamento otimizado', 'Fácil higienização e ventilação controlada', 'Escala do pequeno produtor à indústria'].map(item => (
                <li key={item} className="flex items-start gap-3 text-green-100 text-sm">
                  <i className="fa-solid fa-check text-[#fb5421] mt-0.5 flex-shrink-0"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#fb5421] font-semibold text-sm uppercase tracking-widest">{t('products_tag')}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-3">{t('products_title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('products_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/produtos" className="inline-flex items-center gap-2 bg-[#3f533c] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2d3d2b] transition-colors">
              {t('products_cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Differentials ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#fb5421] font-semibold text-sm uppercase tracking-widest">{t('diff_tag')}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{t('diff_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFFERENTIALS.map((k, i) => (
              <div key={k} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-[#e8f0e7] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className={`fa-solid text-[#3f533c] text-2xl ${
                    ['fa-wrench', 'fa-flag', 'fa-handshake', 'fa-chart-line'][i]
                  }`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(`${k}_title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`${k}_text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brazilian Pride ── */}
      <section className="py-16 bg-[#3f533c]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <i className="fa-solid fa-flag text-white text-6xl mb-4 block"></i>
          <h2 className="text-3xl font-black text-white mb-3">Feito no Paraná, para o Brasil e o Mundo</h2>
          <p className="text-green-200 text-lg">
            A SmartBugs carrega o orgulho paranaense em cada produto. Nossa tecnologia nasce aqui e vai transformar a produção de proteína sustentável em todo o mundo.
          </p>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t('cta_title')}</h2>
          <p className="text-gray-500 text-lg mb-8">{t('cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/loja" className="bg-[#fb5421] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
              {t('cta_btn_shop')}
            </Link>
            <Link to="/orcamento" className="border-2 border-[#3f533c] text-[#3f533c] px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors">
              {t('cta_btn_quote')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
