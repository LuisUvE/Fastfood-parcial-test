import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "../components/RecipeCard";
import "./Checkout.css";

const PAGE_SIZE = 8;

const allRecipes = [
  {
    image:
      "https://images.ctfassets.net/43ibah8kumsy/ea4c468f-30c4-4ad8-b56c-0b090d7ebf62/9d10ed4e561bef13baf0574a7114258a/5pastapennebarilla_upscaled.jpg?w=1600&h=1600&fm=webp&q=50",
    name: "Penne rigate con longaniza",
    weight: "420g",
    price: "7.150",
    calories: 865,
    fats: 59,
    carbs: 58,
    proteins: 26,
  },
  {
    image:
      "https://recetasdecocina.elmundo.es/wp-content/uploads/2021/03/IMG_20200321_150823.jpg",
    name: "Ensalada quinoa y aguacate",
    weight: "350g",
    price: "6.500",
    calories: 420,
    fats: 20,
    carbs: 45,
    proteins: 10,
  },
  {
    image:
      "https://recetasveganas.net/wp-content/uploads/2020/09/bowl-arroz-hummus-verdura-saludable-vegano-recetas.jpg",
    name: "Bowl vegano con hummus",
    weight: "400g",
    price: "8.000",
    calories: 520,
    fats: 22,
    carbs: 60,
    proteins: 12,
  },
  {
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    name: "Sushi vegetariano",
    weight: "300g",
    price: "9.200",
    calories: 410,
    fats: 18,
    carbs: 50,
    proteins: 14,
  },
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    name: "Pollo asado con hierbas",
    weight: "450g",
    price: "10.000",
    calories: 780,
    fats: 40,
    carbs: 15,
    proteins: 65,
  },
  {
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    name: "Pasta carbonara tradicional",
    weight: "400g",
    price: "8.750",
    calories: 890,
    fats: 55,
    carbs: 65,
    proteins: 30,
  },
  {
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c6d?auto=format&fit=crop&w=800&q=80",
    name: "Ceviche de camarón",
    weight: "350g",
    price: "12.500",
    calories: 350,
    fats: 10,
    carbs: 30,
    proteins: 40,
  },
  {
    image:
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80",
    name: "Hamburguesa vegana con aguacate",
    weight: "380g",
    price: "9.300",
    calories: 620,
    fats: 25,
    carbs: 70,
    proteins: 20,
  },
];

export default function Checkout() {
  const [items, setItems] = useState(allRecipes.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    const start = page * PAGE_SIZE;
    const end = nextPage * PAGE_SIZE;
    let nextItems = allRecipes.slice(start, end);

    setTimeout(() => {
      if (nextItems.length === 0) {
        // Repetir los primeros PAGE_SIZE productos si ya no hay más
        nextItems = allRecipes.slice(0, PAGE_SIZE);
      }
      setItems((prev) => [...prev, ...nextItems]);
      setPage(nextPage);
    }, 1000);
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "900",
          color: "#d35400",
          marginBottom: "24px",
          letterSpacing: "0.15em",
          fontFamily: "'Poppins', sans-serif",
          userSelect: "none",
        }}
      >
        RECETAS DE RESTAURANTE
      </h1>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true} // Siempre true para scroll infinito
        loader={
          <p style={{ textAlign: "center", color: "#d35400", fontWeight: "700" }}>
            Cargando productos...
          </p>
        }
      >
        <main className="app-container">
          {items.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </main>
      </InfiniteScroll>
    </>
  );
}
