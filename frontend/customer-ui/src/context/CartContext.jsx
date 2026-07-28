import { createContext, useContext, useState } from "react";


const CartContext = createContext();



export function CartProvider({ children }) {


    const [cartItems, setCartItems] = useState([]);



    const addToCart = (product) => {


        setCartItems((prev) => {


            const exist = prev.find(
                item => item.id === product.id
            );


            if (exist) {


                return prev.map(item =>

                    item.id === product.id

                    ?

                    {
                        ...item,
                        quantity: item.quantity + 1
                    }

                    :

                    item

                );


            }



            return [

                ...prev,

                {
                    ...product,
                    quantity: 1
                }

            ];


        });


    };





    const increaseQuantity = (id) => {


        setCartItems((prev)=>

            prev.map(item =>

                item.id === id

                ?

                {
                    ...item,
                    quantity:item.quantity + 1
                }

                :

                item

            )

        );


    };






    const decreaseQuantity = (id) => {


        setCartItems((prev)=>

            prev.map(item =>

                item.id === id && item.quantity > 1

                ?

                {
                    ...item,
                    quantity:item.quantity - 1
                }

                :

                item

            )

        );


    };






    const removeFromCart = (id) => {


        setCartItems((prev)=>

            prev.filter(
                item => item.id !== id
            )

        );


    };






    return (

        <CartContext.Provider

            value={{

                cartItems,

                addToCart,

                increaseQuantity,

                decreaseQuantity,

                removeFromCart

            }}

        >

            {children}

        </CartContext.Provider>

    );

}





export function useCart(){

    return useContext(CartContext);

}