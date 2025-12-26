"use client";

import { useState, useEffect } from "react";
import { 
  ArrowRight,
  BookOpen,
  MessageSquare,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Quote,
  X
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

export default function DanielLannesPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const testimonials: Testimonial[] = [
    {
      name: "Maria Beatriz",
      text: "É tão difícil de falar sobre a qualidade de um profissional, principalmente quando ele é tão bom quanto o Daniel, pois passa-se a impressão que é algo forçado, mas sim, o Daniel de Longe é o melhor terapeuta que já tive, pois ele trás a realidade de forma leve, e faz raciocinar sobre as situações e suas consequências... Gosto do atendimento do Daniel, principalmente porque respeita nossos limites, e nos faz decidir por conta própria... evolui muito meu quadro com seus atendimentos, e pude ter novas percepções, tenho somente a agradecer ao Daniel por todo profissionalismo e ajuda que tive, e por me fazer crescer como pessoa!",
      image: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/5f135d54-926d-4991-9652-30b612b60b56.png"
    }
  ];

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Salvar dados no localStorage quando o formulário mudar
  useEffect(() => {
    if (formData.name || formData.email || formData.phone || formData.message) {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
    }
  }, [formData]);

  // Fechar menu mobile ao clicar em um link
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    localStorage.setItem("lastSubmission", JSON.stringify({ ...formData, date: new Date().toISOString() }));
    
    // Limpar formulário após 3 segundos
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      localStorage.removeItem("contactFormData");
      setIsSubmitted(false);
    }, 3000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#F8F8F6]/95 backdrop-blur-sm z-50 border-b border-[#E1E1E1]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Texto simples */}
            <div className="flex items-center">
              <span className="text-2xl font-serif text-[#2C2C2C]">Daniel Lannes</span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-inter">
              <a href="#home" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                Home
              </a>
              <a href="#psicanalise" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                O que é a psicanálise
              </a>
              <a href="#sobre" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                Sobre mim
              </a>
              <a href="#testemunhos" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                Testemunhos
              </a>
              <a href="#livro" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                Livro
              </a>
              <a href="#trabalho" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                Meu trabalho
              </a>
              <a href="#trabalho" className="text-[#2C2C2C] hover:text-[#D7A98C] transition-colors font-light">
                Contato
              </a>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#2C2C2C]" />
              ) : (
                <>
                  <div className="w-6 h-0.5 bg-[#2C2C2C] mb-1.5"></div>
                  <div className="w-6 h-0.5 bg-[#2C2C2C] mb-1.5"></div>
                  <div className="w-6 h-0.5 bg-[#2C2C2C]"></div>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Animado */}
        <div 
          className={`md:hidden fixed top-20 left-0 right-0 bg-[#F8F8F6] border-b border-[#E1E1E1]/50 shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col py-4">
            <a 
              href="#home" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base border-b border-[#E1E1E1]/30"
            >
              Home
            </a>
            <a 
              href="#psicanalise" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base border-b border-[#E1E1E1]/30"
            >
              O que é a psicanálise
            </a>
            <a 
              href="#sobre" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base border-b border-[#E1E1E1]/30"
            >
              Sobre mim
            </a>
            <a 
              href="#testemunhos" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base border-b border-[#E1E1E1]/30"
            >
              Testemunhos
            </a>
            <a 
              href="#livro" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base border-b border-[#E1E1E1]/30"
            >
              Livro
            </a>
            <a 
              href="#trabalho" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base border-b border-[#E1E1E1]/30"
            >
              Meu trabalho
            </a>
            <a 
              href="#trabalho" 
              onClick={handleMobileMenuClick}
              className="px-6 py-4 text-[#2C2C2C] hover:bg-[#D7A98C]/10 hover:text-[#D7A98C] transition-all duration-300 font-inter text-base"
            >
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Hero Section - MUDOU PARA bg-[#CAC5A7] */}
      <section id="home" className="py-16 sm:py-20 lg:py-28 bg-[#CAC5A7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Foto - Menor dimensão */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f5eb5bb2-7a50-4daa-9a78-4354962094a5.png" 
                  alt="Daniel Lannes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Texto ao lado direito */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2C2C2C] leading-tight">
                Bem-vindo(a)!
              </h1>
              <p className="text-xl sm:text-2xl text-[#2C2C2C] font-inter leading-relaxed">
                Eu sou o <span className="font-medium">Daniel Lannes</span>, psicanalista.
              </p>
              <p className="text-lg text-[#2C2C2C] leading-relaxed font-inter max-w-xl">
                Este é um espaço de escuta, reflexão e reencontro com o que há de mais verdadeiro em você.
              </p>
              <div className="pt-4">
                <a 
                  href="#psicanalise"
                  className="inline-flex items-center gap-2 bg-[#D7A98C] text-white px-8 py-3.5 rounded-full text-base font-inter hover:bg-[#C8997C] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Saiba mais sobre a psicanálise
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que é a Psicanálise */}
      <section id="psicanalise" className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Título */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2C2C2C] text-center mb-16">
            O QUE É A PSICANÁLISE
          </h2>

          {/* Conteúdo com espaçamento generoso */}
          <div className="space-y-8 text-lg sm:text-xl text-[#2C2C2C] leading-relaxed font-inter text-center">
            <p className="mb-8">
              A psicanálise é um espaço de escuta e liberdade.
            </p>
            <p className="mb-8">
              Diferente da psicologia tradicional, ela segue um caminho próprio: o de escutar o inconsciente.
            </p>
            <p className="mb-8">
              O psicanalista não dá conselhos — ajuda a pessoa a se escutar, a compreender o que sente, repete e evita sem perceber.
            </p>
            <p>
              É um processo de autoconhecimento profundo e, muitas vezes, transformador.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre Mim - MUDOU PARA bg-[#CAC5A7] */}
      <section id="sobre" className="py-20 sm:py-24 lg:py-32 bg-[#CAC5A7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2C2C2C] mb-16 text-center">
            SOBRE MIM
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Foto menor à esquerda */}
            <div className="flex-shrink-0">
              <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f5eb5bb2-7a50-4daa-9a78-4354962094a5.png" 
                  alt="Daniel Lannes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Texto à direita */}
            <div className="flex-1 space-y-6 text-lg text-[#2C2C2C] leading-relaxed font-inter">
              <p>
                Sou Daniel Lannes, psicanalista, formado em Comunicação e pós-graduado em Marketing.
              </p>
              <p>
                Trabalhei por mais de 10 anos no mercado financeiro — tempo suficiente pra perceber que trabalhar não precisa ser algo que suga a alma.
              </p>
              <p>
                Na psicanálise, encontrei um novo sentido: escutar.
              </p>
              <p>
                Escutar de verdade, o outro e a si mesmo.
              </p>
              <p>
                Também sou garçom, marido, amante das culturas orientais e tutor de dois Huskies e um vira-lata idoso.
              </p>
              <p>
                Trago comigo o olhar prático da vida real e a profundidade da escuta — é nesse encontro que meu trabalho acontece.
              </p>

              <div className="pt-6">
                <a 
                  href="https://wa.me/+5511967281536"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#7FA67E] px-8 py-3.5 rounded-full text-base font-inter hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Agende uma conversa comigo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meu Livro - MUDOU PARA bg-[#D7A98C] */}
      <section id="livro" className="py-20 sm:py-24 lg:py-32 bg-[#D7A98C]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* Ícone de livro no topo */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 p-4 rounded-full">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-12">
            MEU LIVRO
          </h2>

          {/* Espaço reservado para imagem do livro */}
          <div className="mb-8 flex justify-center">
            <div className="w-48 h-64 bg-white/10 rounded-lg border-2 border-white/30 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white/50" />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-6 text-lg text-white leading-relaxed font-inter mb-8">
            <p>
              Meu livro está a caminho — uma extensão do que acontece em análise, em forma de palavra escrita.
            </p>
            <p>
              Será um convite à escuta, à reflexão e ao silêncio que também fala.
            </p>
          </div>

          {/* Botão */}
          <a 
            href="https://wa.me/+5511967281536" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#D7A98C] px-6 py-3 rounded-full font-inter hover:bg-gray-50 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            Disponível em breve no marketplace
          </a>
        </div>
      </section>

      {/* Testemunhos */}
      <section id="testemunhos" className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Título */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2C2C2C] text-center mb-16">
            TESTEMUNHOS
          </h2>

          {/* Carrossel */}
          <div className="relative">
            {/* Card do Testemunho */}
            <div className="bg-[#F8F8F6] rounded-2xl shadow-lg p-8 sm:p-12 relative">
              {/* Ícone de aspas */}
              <div className="absolute top-6 left-6 opacity-10">
                <Quote className="w-16 h-16 text-[#D7A98C]" />
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Foto arredondada - CENTRALIZADA */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md border-4 border-[#D7A98C]/30">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Nome */}
                <h3 className="text-xl sm:text-2xl font-serif text-[#2C2C2C]">
                  {testimonials[currentTestimonial].name}
                </h3>

                {/* Depoimento */}
                <p className="text-base sm:text-lg text-[#2C2C2C] leading-relaxed font-inter max-w-3xl">
                  {testimonials[currentTestimonial].text}
                </p>
              </div>
            </div>

            {/* Navegação do Carrossel */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-[#D7A98C] hover:text-white transition-all duration-300 group"
                  aria-label="Testemunho anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-[#2C2C2C] group-hover:text-white" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-[#D7A98C] hover:text-white transition-all duration-300 group"
                  aria-label="Próximo testemunho"
                >
                  <ChevronRight className="w-6 h-6 text-[#2C2C2C] group-hover:text-white" />
                </button>
              </>
            )}

            {/* Indicadores */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-[#D7A98C] w-8' 
                        : 'bg-[#E1E1E1] hover:bg-[#D7A98C]/50'
                    }`}
                    aria-label={`Ir para testemunho ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meu Trabalho */}
      <section id="trabalho" className="py-20 sm:py-24 lg:py-32 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2C2C2C] mb-16 text-center">
            MEU TRABALHO
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Texto à esquerda */}
            <div className="space-y-6 text-lg text-[#2C2C2C] leading-relaxed font-inter">
              <p>
                A análise é um caminho que começa com um passo simples: falar.
              </p>
              <p>
                Cada sessão é um espaço pra se escutar, sem pressa e sem julgamentos.
              </p>
              <p>
                Se você sente que é hora de se entender melhor, talvez a psicanálise possa te ajudar a dar novo sentido à sua história.
              </p>
            </div>

            {/* Botões à direita */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/+5511967281536" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-[#E1E1E1] hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-[#25D366]/10 p-3 rounded-full group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#25D366]" />
                </div>
                <span className="text-lg text-[#2C2C2C] font-inter">
                  Fale comigo no WhatsApp
                </span>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/daniellannespsi?igsh=d2Jpd2w1NW9ydWZ4" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-[#E1E1E1] hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-[#E4405F]/10 p-3 rounded-full group-hover:bg-[#E4405F]/20 transition-colors">
                  <Instagram className="w-6 h-6 text-[#E4405F]" />
                </div>
                <span className="text-lg text-[#2C2C2C] font-inter">
                  Me acompanhe no Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-sm font-inter opacity-80">
            © 2025 Daniel Lannes | Psicanalista
          </p>
        </div>
      </footer>
    </div>
  );
}
