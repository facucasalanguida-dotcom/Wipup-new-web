export const WHOLESALE_FORM_URL =
  "https://h1vac30g.forms.app/formulario-para-distribuidores-de-productos";

export const WHATSAPP_URL = "https://wa.me/542273423311";
export const WHATSAPP_DISPLAY = "+54 2273-423311";
export const PHONE_URL = "tel:+542273154200042";
export const PHONE_DISPLAY = "+54 2273-15420042";
export const DISTRIBUTOR_EMAIL = "administracion@daniellerman.com.ar";
export const CONTACT_EMAIL = "valentino@wipup.com.ar";
export const INSTAGRAM_URL = "https://www.instagram.com/wipup.arg/";
export const INSTAGRAM_HANDLE = "@wipup.arg";
export const FACEBOOK_URL = "https://www.facebook.com/wipup.hogar/";

export const STATS = [
  { value: "15+", label: "Años de experiencia" },
  { value: "20+", label: "Productos premium" },
  { value: "10K+", label: "Clientes felices" },
];

export type ValueProp = {
  title: string;
  description: string;
};

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Calidad Premium",
    description:
      "Nuestros productos están elaborados bajo estrictos estándares de calidad, diseñados para garantizar el bienestar y la salud de las mascotas, enfocándonos en la durabilidad y la excelencia.",
  },
  {
    title: "Precios Competitivos",
    description: "Podrás ofrecerle a tu mascota la mejor calidad al mejor precio.",
  },
  {
    title: "Compromiso Sostenible",
    description:
      "Incorporamos materiales ecológicos y procesos de producción sostenibles, creando productos que cuidan el medio ambiente.",
  },
  {
    title: "Innovación Constante",
    description:
      "Nos destacamos por estar a la vanguardia del desarrollo de productos innovadores, siempre enfocados en mejorar la calidad de vida de las mascotas y sus dueños.",
  },
];

export type Product = {
  name: string;
  description: string;
  image: string;
  sizes?: string[];
};

export type ProductCategory = {
  id: string;
  title: string;
  shortTitle: string;
  categoryImage: string;
  description: string;
  products: Product[];
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "silica",
    shortTitle: "Silica Gel",
    title: "Cristales de Silica Gel Premium",
    categoryImage: "/images/category-silica-transparent-CJ7eAAGV.png",
    description:
      "Ultra absorbente y de fácil mantenimiento. No se adhiere a las patas del gato, libre de polvo, elimina olores y humedad.",
    products: [
      {
        name: "Silica Gel Marina",
        description:
          "Fragancia marina refrescante. 3,8 Lt / 1,6 kg. Rinde 30 días. Hipoalergénico, antibacterial, ecológico y biodegradable.",
        image: "/images/silica-marina-BaKkLVfN.jpg",
      },
      {
        name: "Silica Gel Cítrica",
        description:
          "Fragancia cítrica energizante. 3,8 Lt / 1,6 kg. Rinde 30 días. Hipoalergénico, antibacterial, ecológico y biodegradable.",
        image: "/images/silica-citrica-BG7vtSli.jpg",
      },
      {
        name: "Silica Gel Rosas",
        description:
          "Fragancia de rosas delicada. 3,8 Lt / 1,6 kg. Rinde 30 días. Hipoalergénico, antibacterial, ecológico y biodegradable.",
        image: "/images/silica-rosas-DMNb3vV6.jpg",
      },
      {
        name: "Silica Gel Natural",
        description:
          "Sin fragancia añadida. 3,8 Lt / 1,6 kg. Rinde 30 días. Hipoalergénico, antibacterial, ecológico y biodegradable.",
        image: "/images/silica-natural-D9RfX9f6.jpg",
      },
      {
        name: "Silica Gel Lavanda",
        description:
          "Fragancia de lavanda relajante. 3,8 Lt / 1,6 kg. Rinde 30 días. Hipoalergénico, antibacterial, ecológico y biodegradable.",
        image: "/images/silica-lavanda-CpoXzHGJ.jpg",
      },
    ],
  },
  {
    id: "bentonita",
    shortTitle: "Bentonita",
    title: "Microesferas Aglomerantes de Bentonita Sódica",
    categoryImage: "/images/category-bentonita-transparent-Dm1EyUiZ.png",
    description:
      "100% absorción, 100% neutralización de olores, 0% polvo. Formuladas para garantizar la máxima higiene.",
    products: [
      {
        name: "Bentonita Fragancia Manzana",
        description:
          "Fragancia de manzana fresca. Contenido neto: 5 kg. Alta capacidad de absorción y neutralización de olores.",
        image: "/images/bentonita-manzana-CkAcmtxT.jpg",
      },
      {
        name: "Bentonita Fragancia Lavanda",
        description:
          "Fragancia de lavanda calmante. Contenido neto: 5 kg. Alta capacidad de absorción y neutralización de olores.",
        image: "/images/bentonita-lavanda-BhfKHnxE.jpg",
      },
      {
        name: "Bentonita Natural",
        description:
          "Sin fragancia añadida. Contenido neto: 5 kg. Alta capacidad de absorción y neutralización de olores.",
        image: "/images/bentonita-natural-CpIaORf1.jpg",
      },
      {
        name: "Bentonita Fragancia Limón",
        description:
          "Fragancia de limón refrescante. Contenido neto: 5 kg. Alta capacidad de absorción y neutralización de olores.",
        image: "/images/bentonita-limon-i4zf0fZo.jpg",
      },
    ],
  },
  {
    id: "panos",
    shortTitle: "Paños Absorbentes",
    title: "Paños Absorbentes",
    categoryImage: "/images/category-panos-transparent-B_a7U_WZ.png",
    description:
      "Retienen todos los líquidos, son ultra resistentes e impermeables dejando seco y limpio tu hogar.",
    products: [
      {
        name: "Paños Absorbentes Small",
        description:
          "Tamaño ideal para espacios pequeños o cachorros. Ultra resistentes e impermeables.",
        image: "/images/panos-catalog-CcPdxtpl.jpg",
        sizes: ["33 x 45 cm"],
      },
      {
        name: "Paños Absorbentes Medium",
        description: "Tamaño versátil para uso diario. Ultra resistentes e impermeables.",
        image: "/images/panos-catalog-CcPdxtpl.jpg",
        sizes: ["45 x 60 cm"],
      },
      {
        name: "Paños Absorbentes Extra Large",
        description: "Máxima cobertura para razas grandes. Ultra resistentes e impermeables.",
        image: "/images/panos-catalog-CcPdxtpl.jpg",
        sizes: ["60 x 90 cm"],
      },
    ],
  },
  {
    id: "accesorios",
    shortTitle: "Accesorios",
    title: "Línea Accessori — Casetas y Rifugios",
    categoryImage: "/images/category-casetas-transparent-B9fqoakP.png",
    description: "Todo lo que tu mascota necesita para su comodidad. Diseños modernos y resistentes.",
    products: [
      {
        name: "Rifugio",
        description:
          "Casa para mascotas con diseño iglú. Ideal para interiores y exteriores. Fácil de limpiar y resistente.",
        image: "/images/rifugio-product-DlETNEZr.png",
        sizes: ["S: 57,3 x 39,4 x 41,8 cm", "M: 79 x 59,2 x 60,8 cm", "L: 97,8 x 77,8 x 74,3 cm"],
      },
      {
        name: "Viaggio",
        description: "Transportadora de mascotas segura y cómoda. Perfecta para viajes y visitas al veterinario.",
        image: "/images/viaggio-product-C3dOnqn5.png",
        sizes: ["S: 76 x 45 x 54 cm", "M: 88 x 52 x 62 cm", "L: 99 x 60 x 68 cm"],
      },
      {
        name: "Barile",
        description: "Contenedor para alimento de mascotas. Mantiene el alimento fresco y protegido. Diseño hermético.",
        image: "/images/barile-product-Cs_rS5V7.png",
        sizes: ["S: 23,7 x 24 x 30 cm", "L: 40 x 30,5 x 51 cm"],
      },
    ],
  },
];

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  review: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Lucía Sanchez",
    role: "Dueña de un Beagle",
    review:
      "Empecé a usar los paños absorbentes para mi cachorro. Absorben súper bien y mantienen todo limpio. Desde que los uso, entrenar a mi perrito se volvió mucho más fácil. ¡Los recomiendo sin dudar!",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Dueño de 2 gatos",
    review:
      "La arena sanitaria WipUp es increíble. No deja olores y dura mucho más que otras marcas que probé. Mi gato la aceptó de inmediato. Excelente relación calidad-precio.",
  },
  {
    id: 3,
    name: "Ana María Torres",
    role: "Dueña de un Golden Retriever",
    review:
      "Compré la caseta Rifugio y quedé encantada. Es muy espaciosa, fácil de limpiar y mi perro la adora. La calidad de los materiales es excelente. Muy recomendada.",
  },
  {
    id: 4,
    name: "Roberto García",
    role: "Dueño de una gatita persa",
    review:
      "Uso la arena de sílice con aroma lavanda y el olor se neutraliza completamente. Mi casa siempre huele fresca. Además, el arenero se mantiene limpio por más tiempo.",
  },
  {
    id: 5,
    name: "María Fernanda López",
    role: "Dueña de un Labrador",
    review:
      "Los paños absorbentes XL son perfectos para mi perro grande. Muy absorbentes y no se rompen. Los uso diario y estoy muy satisfecha con el producto.",
  },
];
