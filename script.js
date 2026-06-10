document.addEventListener('DOMContentLoaded', () => {
  

  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85; 

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  checkReveal();
  window.addEventListener('scroll', checkReveal);


  const carouselData = [
    {
      img: './img/Galeria1.png',
      title: 'Cais Leste e Silos Verticais',
      desc: 'Estrutura automatizada de esteiras e navios graneleiros operando simultaneamente no Corredor de Exportação.'
    },
    {
      img: './img/Galeria2.png',
      title: 'Pátio de Triagem Inteligente',
      desc: 'Gerenciamento de fluxo intermodal com agendamento digital para caminhões, eliminando gargalos históricos.'
    },
    {
      img: './img/Galeria3.png',
      title: 'Terminais de Contêineres (TCP)',
      desc: 'Guindastes STS (Ship-to-Shore) de última geração movimentando cargas refrigeradas e industriais.'
    }
  ];

  let currentSlide = 0;
  const slideContainer = document.getElementById('carousel-slide');
  const titleEl = document.getElementById('carousel-title');
  const descEl = document.getElementById('carousel-description');
  const dotsContainer = document.getElementById('carousel-dots');
  
  
  carouselData.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const updateCarousel = () => {
    const slide = carouselData[currentSlide];
    

    slideContainer.innerHTML = `<img src="${slide.img}" alt="${slide.title}" />`;
    titleEl.textContent = slide.title;
    descEl.textContent = slide.desc;

    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  };

  const goToSlide = (index) => {
    currentSlide = index;
    updateCarousel();
  };

  // Escuta os botões de avançar e voltar
  document.querySelectorAll('[data-carousel-direction]').forEach(btn => {
    btn.addEventListener('click', () => {
      const direction = parseInt(btn.getAttribute('data-carousel-direction'));
      currentSlide += direction;

      // Loop do carrossel
      if (currentSlide >= carouselData.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = carouselData.length - 1;

      updateCarousel();
    });
  });

  
  if (slideContainer) updateCarousel();


  
  const facts = [
    "O Porto de Paranaguá quebra recordes sucessivos de movimentação anual, sendo o principal canal de escoamento da safra de grãos do corredor Leste do Brasil.",
    "É considerado o maior porto graneleiro da América Latina e o primeiro do país em eficiência na exportação de óleo vegetal e farelo de soja.",
    "A infraestrutura ferroviária local conecta diretamente o porto ao interior do estado e estados vizinhos, absorvendo milhares de toneladas de carga por dia.",
    "Os terminais de fertilizantes de Paranaguá recebem e nacionalizam a maior parte dos insumos minerais que abastecem as lavouras do Centro-Sul brasileiro."
  ];

  let currentFactIndex = 0;
  const factTextEl = document.getElementById('fact-text');
  const factBtn = document.getElementById('fact-btn');

  if (factBtn && factTextEl) {
    factBtn.addEventListener('click', () => {
      currentFactIndex = (currentFactIndex + 1) % facts.length;
      
      // Efeito simples de transição de texto
      factTextEl.style.opacity = '0';
      setTimeout(() => {
        factTextEl.textContent = facts[currentFactIndex];
        factTextEl.style.opacity = '1';
      }, 200);
    });
    factTextEl.style.transition = 'opacity 0.2s ease';
  }


  
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');

  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const totalQuestions = 5;
      let correctCount = 0;
      const formData = new FormData(quizForm);

      
      const questionsDivs = quizForm.querySelectorAll('.quiz-question');
      questionsDivs.forEach(div => {
        div.classList.remove('correct-answer', 'wrong-answer');
        

        const labels = div.querySelectorAll('label');
        labels.forEach(label => {
          const input = label.querySelector('input');
          label.setAttribute('data-status', input.value);
        });
      });

      
      for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `q${i}`;
        const answer = formData.get(questionName);
        const questionBlock = quizForm.querySelector(`input[name="${questionName}"]`).closest('.quiz-question');

        if (answer === 'certo') {
          correctCount++;
          questionBlock.classList.add('correct-answer');
        } else {
          questionBlock.classList.add('wrong-answer');
        }
      }

      
      quizResult.style.display = 'block';
      quizResult.textContent = `Você acertou ${correctCount} de ${totalQuestions} questões!`;
      
      if (correctCount === totalQuestions) {
        quizResult.style.borderColor = 'var(--color-accent)';
        quizResult.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      } else {
        quizResult.style.borderColor = 'var(--color-brand)';
        quizResult.style.backgroundColor = 'rgba(14, 165, 233, 0.1)';
      }

      
      quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }


  
  const toggles = document.querySelectorAll('.card-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.expandable-card');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      
      document.querySelectorAll('.expandable-card').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('is-expanded');
          otherCard.querySelector('.card-toggle').setAttribute('aria-expanded', 'false');
        }
      });

      // Alterna o estado do card clicado
      card.classList.toggle('is-expanded', !isExpanded);
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });

});