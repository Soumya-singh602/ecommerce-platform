
import {
  createContext,
  useContext,
  useState
} from "react";

const CartContext = createContext();


export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);


  // ============================================================
  // ADD TO CART
  // ============================================================

  const addToCart = (product, quantity = 1) => {

    if (!product) {
      return;
    }

    const requestedQuantity = Math.max(
      1,
      Number(quantity) || 1
    );


    setCartItems((prev) => {

      const exist = prev.find(
        item => item.id === product.id
      );


      // ========================================================
      // PRODUCT ALREADY EXISTS
      // ========================================================

      if (exist) {

        const newQuantity =
          exist.quantity + requestedQuantity;


        // Stock check

        if (
          product.stock !== undefined &&
          newQuantity > Number(product.stock)
        ) {

          alert(
            `Only ${product.stock} items are available`
          );

          return prev;

        }


        return prev.map(item =>

          item.id === product.id

            ?

            {
              ...item,
              quantity: newQuantity
            }

            :

            item

        );

      }


      // ========================================================
      // NEW PRODUCT
      // ========================================================

      if (
        product.stock !== undefined &&
        requestedQuantity > Number(product.stock)
      ) {

        alert(
          `Only ${product.stock} items are available`
        );

        return prev;

      }


      return [

        ...prev,

        {
          ...product,
          quantity: requestedQuantity
        }

      ];

    });

  };


  // ============================================================
  // INCREASE QUANTITY
  // ============================================================

  const increaseQuantity = (id) => {

    setCartItems((prev) =>

      prev.map(item => {

        if (item.id !== id) {
          return item;
        }


        const newQuantity =
          item.quantity + 1;


        // Stock check

        if (
          item.stock !== undefined &&
          newQuantity > Number(item.stock)
        ) {

          alert(
            `Only ${item.stock} items are available`
          );

          return item;

        }


        return {

          ...item,

          quantity: newQuantity

        };

      })

    );

  };


  // ============================================================
  // DECREASE QUANTITY
  // ============================================================

  const decreaseQuantity = (id) => {

    setCartItems((prev) =>

      prev.map(item =>

        item.id === id && item.quantity > 1

          ?

          {
            ...item,
            quantity: item.quantity - 1
          }

          :

          item

      )

    );

  };


  // ============================================================
  // REMOVE FROM CART
  // ============================================================

  const removeFromCart = (id) => {

    setCartItems((prev) =>

      prev.filter(
        item => item.id !== id
      )

    );

  };


  // ============================================================
  // CLEAR CART
  // ============================================================

  const clearCart = () => {

    setCartItems([]);

  };


  return (

    <CartContext.Provider

      value={{

        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart

      }}

    >

      {children}

    </CartContext.Provider>

  );

}


export function useCart() {

  return useContext(CartContext);

}

