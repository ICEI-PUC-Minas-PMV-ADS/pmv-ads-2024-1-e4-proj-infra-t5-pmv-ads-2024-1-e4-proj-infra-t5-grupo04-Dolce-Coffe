var slider = tns({
    container: '.my-slider',
    items: 3, // Quantidade de itens que são exibidos ao mesmo tempo
    slideBy: 'page',
    autoplay: false,
    mouseDrag: true, // Seta se o carousel pode ser rotacionado com o movimento de clicar e arrastar do mouse
    autoplayButtonOutput: false, // Seta visibilidade do botão de auto play
    controls: false, // seta visibilidade das setas de controle
    nav: false // Seta visibilidade da navegação (3 pontinhos)
  });