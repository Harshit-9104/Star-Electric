// import axios from "axios";
// import { useEffect, useState } from "react";
// import { createContext } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cart, setCart] = useState({});
//   const url = "http://localhost:4000";
//   const [token, setToken] = useState("");
//   // const [pump_list, setpumpList] = useState([]);
//   const [productLists, setProductLists] = useState({
//   Pump: [],
//   Cable: [],
//   Panel: []
// });

//   // Add item to cart

//   const addToCart = async (itemId) => {
//     if (!cart[itemId]) {
//       setCart((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       await axios.post(
//         url + "/api/cart/add",
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   useEffect(() => {
//     console.log(cart);
//   }, [cart]);

//   // Remove item from cart

//   const removeFromCart = (itemId) => {
//     setCart((prev) => {
//       const updated = { ...prev };
//       if (updated[itemId] > 1) {
//         updated[itemId] -= 1;
//       } else {
//         delete updated[itemId];
//       }
//       return updated;
//     });

//     if (token) {
//       axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//     }
//   };

//   // get total price

//   const getTotalPrice = () => {
//     if (!cart || typeof cart !== "object") return 0;

//     return Object.entries(cart).reduce((total, [itemId, quantity]) => {
//       const item = productLists.find((p) => p._id === itemId);
//       if (!item) return total;
//       return total + item.price * quantity;
//     }, 0);
//   };

//   // const fetchPumpList = async () => {
//   //   const response = await axios.get(url + "/api/product/list");
//   //   setProductLists(response.data);
//   // };

//   const fetchAllProductLists = async () => {
//   const categories = ["Pump", "Cable", "Panel"];
//   const newLists = {};
//   for (let cat of categories) {
//     const res = await axios.get(`${url}/api/product/list?category=${cat}`);
//     newLists[cat] = res.data;
//   }
//   setProductLists(newLists);
// };

//   const loadCart = async (token) => {
//     const response = await axios.post(
//       url + "/api/cart/get",
//       {},
//       { headers: { token } }
//     );
//     setCart(response.data.cartData);
//   };

//   // useEffect(() => {
//   //   async function loadData() {
//   //     await fetchAllProductLists();
//   //     if (localStorage.getItem("token")) {
//   //       setToken(localStorage.getItem("token"));
//   //       await loadCart(localStorage.getItem("token"));
//   //     }
//   //   }
//   //   loadData();
//   // }, []);

//   useEffect(() => {
//   async function loadData() {
//     await fetchAllProductLists();
//     if (localStorage.getItem("token")) {
//       setToken(localStorage.getItem("token"));
//       await loadCart(localStorage.getItem("token"));
//     }
//   }
//   loadData();
// }, []);

//   const contextValue = {
//     cart,
//     addToCart,
//     removeFromCart,
//     getTotalPrice,
//     url,
//     token,
//     setToken,
//     // pump_list,
//     productLists
//   };
//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cart, setCart] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const [productLists, setProductLists] = useState({
    Pump: [],
    Cable: [],
    Panel: []
  });

  // Add item to cart
  const addToCart = async (itemId) => {
    if (!cart[itemId]) {
      setCart((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  // Get total price
  const getTotalPrice = () => {
    if (!cart || typeof cart !== "object") return 0;

    // Merge all category arrays into a single array
    const allProducts = [
      ...productLists.Pump,
      ...productLists.Cable,
      ...productLists.Panel
    ];

    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = allProducts.find((p) => p._id === itemId);
      if (!item) return total;
      return total + item.price * quantity;
    }, 0);
  };

  // Fetch all categorized product lists
  const fetchAllProductLists = async () => {
    const categories = ["Pump", "Cable", "Panel"];
    const newLists = {};
    for (let cat of categories) {
      const res = await axios.get(`${url}/api/product/list?category=${cat}`);
      newLists[cat] = res.data;
    }
    setProductLists(newLists);
  };

  // Load user's cart
  const loadCart = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCart(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchAllProductLists();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCart(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    url,
    token,
    setToken,
    productLists
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
