import React, { useState } from "react";
import Nav from "./components/Nav";
import "./App.css";
import ItemPage from "./components/ItemPage";
import useApiFetcher from "./hooks/useApiFetcher";
import CartPage from "./components/CartPage";

const summarizeCart = (cart) => {
  const groupItems = cart.reduce((summary, item) => {
    summary[item.id] = summary[item.id] || {
      ...item,
      count: 0,
    };
    summary[item.id].count++;
    return summary;
  }, {});
  return Object.values(groupItems);
};

const App = () => {
  const fakeStoreUrl = "https://fakestoreapi.com/products";
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);
  const { data, error, loading } = useApiFetcher(fakeStoreUrl);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeItem = (item) => {
    let index = cart.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      setCart((cart) => {
        const copy = [...cart];
        copy.splice(index, 1);
        return copy;
      });
    }
  };

  const Content = ({ tab, onAddToCart, cart, onRemoveItem }) => {
    switch (tab) {
      case "items":
        return <ItemPage items={data} onAddToCart={onAddToCart} />;
      case "cart":
        return (
          <CartPage
            items={cart}
            onAddOne={onAddToCart}
            onRemoveOne={onRemoveItem}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="App-content">
        <Content
          tab={activeTab}
          onAddToCart={addToCart}
          cart={summarizeCart(cart)}
          onRemoveItem={removeItem}
        />
      </main>
    </div>
  );
};

export default App;
