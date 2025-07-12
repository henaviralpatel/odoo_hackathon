const featuredItems = [
  {
    title: "Retro Denim Jacket",
    desc: "Size M • Vintage",
    image: "images/denim.jpg"
  },
  {
    title: "Floral Summer Dress",
    desc: "Size S • Bright & Flowery",
    image: "images/floral.jpg"
  },
  {
    title: "Unisex Hoodie",
    desc: "Size L • Soft and Cozy",
    image: "images/hoodie.jpg"
  },
  {
    title: "Children’s Outfit",
    desc: "Age 5-6 • Playful Set",
    image: "images/kids.jpg"
  },
  {
    title: "Elegant Formal Shirt",
    desc: "Size M • Light Blue",
    image: "images/shirt.jpg"
  }
];

const carousel = document.getElementById('carousel');
featuredItems.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('item-card');
  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
    <div class="item-info">
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
    </div>
  `;
  carousel.appendChild(card);
});
