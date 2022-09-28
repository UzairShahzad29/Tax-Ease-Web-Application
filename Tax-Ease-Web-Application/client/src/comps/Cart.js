import React from "react";
import { useGlobalContext } from "../AppContext";
import { RiCloseFill } from "react-icons/ri";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const { openCart, toggleCart, cart, setCart } = useGlobalContext();

  const handleremove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.map((item) => item.price);
  const grandTotal = total.reduce((tl, cur) => tl + cur, 0);

  return (
    <div
      className={`w-[300px] h-screen fixed top-0 right-0  transition-all duration-500 ease-in-out py-16 px-16 transform bg-white
    ${openCart ? "translate-x-[0%]" : "translate-x-[100%]"}
  `}
    >
      <div
        className="absolute top-11 text-[30px] right-11 text-primary cursor-pointer"
        onClick={toggleCart}
      >
        <RiCloseFill />
      </div>
      <div className="mt-[70px] flex w-full px-6 flex-col gap-7">
        <h1 className="text-lg text-center text-gray-500 font-main font-[900]">
          Your Cart
        </h1>
        <div className="flex flex-col items-center justify-center gap-5">
          {cart.length === 0 ? (
            <h2 className="text-xs tracking-widest text-center text-gray-500 capitalize font-main">
              Empty cart
            </h2>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  className="w-[250px] h-[140px] bg-white px-4 items-center justify-center drop-shadow-sm rounded-md flex flex-col gap-3"
                  key={item.id}
                >
                  <div
                    className="absolute top-3 right-3 text-red-500 text-[20px]"
                    onClick={() => handleremove(item.id)}
                  >
                    <RiCloseFill />
                  </div>
                  <h1 className="text-sm font-[800] tracking-wider text-gray-600 font-main capitalize">
                    {item.title}
                  </h1>
                  <h4 className="text-[18px] font-main font-[800] text-gray-500">
                    Charges {item.price}
                  </h4>
                </div>
              ))}
            </div>
          )}
          <h2 className="text-sm text-gray-500 font-main">
            Grand Total : Rs {grandTotal}
          </h2>
          {cart.length > 0 ? (
            <StripeCheckout
              className="checkout"
              stripeKey="pk_test_51LJH9YEcrrpUuR0veGScSYs5VDdaCsKDjYGJsQFo9DEFXvhX7EC0VoXwvEbMYe77BkiqmGcrnwreni30EbXQBuYD00tAIM3aLp"
              amount={grandTotal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
