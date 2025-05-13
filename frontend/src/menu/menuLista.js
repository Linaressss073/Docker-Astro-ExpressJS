// Import your menu item images 
import dish1 from '../../src/menu/dish1.jpg'; 
import dish2 from '../../src/menu/dish2.jpg'; 
import dish3 from '../../src/menu/dish3.jpg';

export const menuLista = [
  {
    id: 1,
    name: "Entradas",
    items: [
      {
        id: 1,
        name: "Carpaccio de Res",
        description: "Finas láminas de res, rúcula, parmesano y vinagreta de mostaza",
        price: 18.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: true
      },
      {
        id: 2,
        name: "Ensalada César",
        description: "Lechuga romana, crutones, parmesano y aderezo César casero",
        price: 14.00,
        image: dish2,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 10,
        name: "Bruschetta Clásica",
        description: "Pan tostado con tomate fresco, ajo, albahaca y aceite de oliva",
        price: 12.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 11,
        name: "Empanadas Criollas (3 u.)",
        description: "Rellenas de carne cortada a cuchillo, horneadas o fritas",
        price: 15.00,
        image: dish1,
        isSpicy: true,
        isVegetarian: false,
        isNew: true
      },
      {
        id: 15,
        name: "Provoleta a la Parrilla",
        description: "Queso provolone fundido con orégano y un toque de aceite de oliva, servido con pan tostado.",
        price: 16.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 16,
        name: "Sopa Crema de Zapallo",
        description: "Suave crema de zapallo asado con crutones al ajo y semillas de zapallo tostadas.",
        price: 13.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 17,
        name: "Langostinos al Ajillo",
        description: "Langostinos salteados en aceite de oliva con ajo laminado y un toque de pimentón.",
        price: 22.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: true
      },
      {
        id: 18,
        name: "Tartar de Salmón Fresco",
        description: "Salmón fresco picado, aguacate, cebolla morada y aderezo cítrico.",
        price: 19.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: false
      },
      {
        id: 19,
        name: "Rollitos Primavera Vegetarianos (4 u.)",
        description: "Crujientes rollitos rellenos de vegetales frescos, servidos con salsa agridulce.",
        price: 14.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      }
    ]
  },
  {
    id: 2,
    name: "Platos Principales",
    items: [
      {
        id: 3,
        name: "Salmón a la Parrilla",
        description: "Salmón fresco con vegetales de temporada y salsa de limón",
        price: 28.00,
        image: dish3,
        isSpicy: false,
        isVegetarian: false,
        isNew: false
      },
      {
        id: 4,
        name: "Lomo Saltado",
        description: "Trozos de lomo fino salteados con cebolla, tomate, ají amarillo, servido con papas fritas y arroz",
        price: 32.00,
        image: dish1,
        isSpicy: true,
        isVegetarian: false,
        isNew: true
      },
      {
        id: 5,
        name: "Risotto de Hongos",
        description: "Arroz arbóreo cremoso con variedad de hongos silvestres y parmesano",
        price: 26.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 12,
        name: "Pollo al Curry Rojo Tailandés",
        description: "Pechuga de pollo en salsa de curry rojo, leche de coco, bambú y vegetales, acompañado de arroz jazmín",
        price: 29.50,
        image: dish1,
        isSpicy: true,
        isVegetarian: false,
        isNew: false
      },
      {
        id: 20,
        name: "Bife de Chorizo Argentino",
        description: "Corte clásico argentino a la parrilla (350g), acompañado de chimichurri y guarnición a elección.",
        price: 35.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: true
      },
      {
        id: 21,
        name: "Milanesa de Ternera Napolitana",
        description: "Clásica milanesa cubierta con salsa de tomate, jamón y mozzarella gratinada, con papas fritas.",
        price: 27.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: false
      },
      {
        id: 22,
        name: "Paella de Mariscos (Individual)",
        description: "Arroz bomba con variedad de mariscos frescos, azafrán y un toque de pimentón ahumado.",
        price: 33.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: false
      },
      {
        id: 23,
        name: "Canelones de Espinaca y Ricota",
        description: "Pasta fresca rellena de espinaca y ricota, bañada en salsa bechamel y pomodoro.",
        price: 25.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 24,
        name: "Hamburguesa Gourmet de la Casa",
        description: "200g de carne premium, queso cheddar, panceta crocante, cebolla caramelizada, lechuga, tomate y salsa especial en pan brioche. Con papas fritas.",
        price: 24.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: true
      },
      {
        id: 25,
        name: "Pesca del Día a la Plancha",
        description: "Filete de pescado fresco del día, cocido a la plancha con hierbas finas y limón. Acompañado de puré de papas.",
        price: 30.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: false,
        isNew: false
      },
      {
        id: 26,
        name: "Curry de Lentejas Vegano",
        description: "Sabroso curry de lentejas rojas con leche de coco, espinacas y especias indias. Servido con arroz basmati.",
        price: 23.00,
        image: dish1,
        isSpicy: true,
        isVegetarian: true,
        isNew: false
      }
    ]
  },
  {
    id: 3,
    name: "Postres",
    items: [
      {
        id: 6,
        name: "Tiramisú Casero",
        description: "Clásico postre italiano con bizcochos de soletilla, café, mascarpone y cacao",
        price: 10.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 7,
        name: "Cheesecake de Frutos Rojos",
        description: "Suave tarta de queso con base de galleta y coulis de frutos rojos frescos",
        price: 11.00,
        image: dish2,
        isSpicy: false,
        isVegetarian: true,
        isNew: true
      },
      {
        id: 27,
        name: "Flan Casero con Dulce de Leche",
        description: "Tradicional flan de huevos con abundante dulce de leche y crema batida.",
        price: 9.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 28,
        name: "Mousse de Maracuyá",
        description: "Ligera y refrescante mousse de fruta de la pasión con un toque de chocolate blanco.",
        price: 10.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 29,
        name: "Brownie Tibio con Helado",
        description: "Intenso brownie de chocolate con nueces, servido tibio con una bocha de helado de vainilla.",
        price: 12.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      }
    ]
  },
  {
    id: 4,
    name: "Bebidas",
    items: [
      {
        id: 8,
        name: "Agua Mineral (500ml)",
        description: "Con o sin gas",
        price: 3.50,
        image: dish3,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 9,
        name: "Gaseosa (Lata)",
        description: "Variedad de sabores",
        price: 4.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 13,
        name: "Jugo Natural de Naranja",
        description: "Recién exprimido",
        price: 6.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 14,
        name: "Copa de Vino Tinto (Malbec)",
        description: "Selección de la casa",
        price: 9.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 30,
        name: "Cerveza Artesanal (Pinta)",
        description: "Consulta nuestras variedades disponibles (IPA, Porter, Lager).",
        price: 7.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 31,
        name: "Limonada con Menta y Jengibre",
        description: "Refrescante limonada casera.",
        price: 6.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: true
      },
      {
        id: 32,
        name: "Café Espresso",
        description: "Intenso y aromático.",
        price: 3.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 33,
        name: "Té Variedades",
        description: "Selección de tés e infusiones.",
        price: 3.50,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      },
      {
        id: 34,
        name: "Botella de Vino Malbec Reserva",
        description: "Ideal para acompañar carnes rojas.",
        price: 45.00,
        image: dish1,
        isSpicy: false,
        isVegetarian: true,
        isNew: false
      }
    ]
  }
];

export default menuLista;