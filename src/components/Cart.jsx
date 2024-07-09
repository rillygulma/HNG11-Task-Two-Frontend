import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaTruck, FaCreditCard, FaCcVisa, FaCcMastercard, FaApplePay, FaPaypal, FaLock,  FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import Container from "./Container";
import {
  decProduct,
  incProduct,
  removeProductFromCart,
} from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    state: "",
    city: "",
    postalCode: "",
    phoneNo: "",
    countryCode: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [termsAgreed, setTermsAgreed] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const btnStyle =
    "font-bold w-5 h-5 bg-pink-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-950";

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // Integrate payment gateway logic here (e.g., Stripe)
    console.log("Payment processed");
  };

  const stepIcons = [
    { icon: <FaShoppingCart size={30} />, label: "Cart" },
    { icon: <MdOutlineAccountCircle size={30} />, label: "Account" },
    { icon: <FaCreditCard size={30} />, label: "Payment" },
    { icon: <FaTruck size={30} />, label: "Shipping" },
  ];

  const states = ["Kebbi", "Kaduna", "Kano", "Sokoto"];
  const countryCodes = ["+1", "+234", "+44", "+91"];

  return (
    <Container>
      <div className="cart p-5">
        <div className="progress-bar flex flex-col items-center bg-customPink mb-5 w-full">
          <h1 className="font-bold text-2xl">Checkout</h1>
          <h3 className="text-lg mb-4">Fill your billing and shipping details</h3>
          <div className="relative w-full flex justify-center items-center">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full border-t border-"></div>
            <div className="flex justify-around items-center w-full relative z-10">
              {stepIcons.map((stepIcon, index) => (
                <div key={index} className={`step-item ${index + 1 <= step ? "active" : ""}`}>
                  {stepIcon.icon}
                  <p className="text-sm">{stepIcon.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {step === 1 && (
          <>
            <h1 className="font-bold text-center text-3xl mb-5">Your Cart</h1>
            <div className="cart-items space-y-5 mb-10">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div className="cart-item border border-gray-300 rounded-lg p-5 flex flex-col sm:flex-row items-center gap-5" key={item.id}>
                    <div className="w-10 h-10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 items-center flex-grow">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <h5 className="font-black"><span>&#8358;</span>{item.price}</h5>
                          <span>({item.quantity})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center ml-auto">
                      <button
                        className={btnStyle}
                        onClick={() => dispatch(incProduct(item.id))}
                      >
                        <FaPlus />
                      </button>
                      <button
                        className={btnStyle}
                        onClick={() => dispatch(decProduct(item.id))}
                      >
                        <FaMinus />
                      </button>
                      <button
                        className={`${btnStyle}`}
                        onClick={() => dispatch(removeProductFromCart(item.id))}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center">No Items In Cart</h2>
              )}
            </div>
            <div className="rounded-sm bg-customPink border-black p-5 inline-block w-full text-center">
              CHECKOUT (<span>&#8358;</span>{totalPrice.toFixed(2)})
            </div>
            <button className="mt-5 bg-pink-400 text-white p-2 rounded-lg hover:bg-gray-800" onClick={handleNextStep}>
              Proceed to Shipping
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="font-bold text-center text-3xl mb-5">Shipping Information</h1>
            <div className="shipping-form space-y-5 mb-10">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={shippingInfo.firstName}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full mb-1 rounded-lg"
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={shippingInfo.lastName}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full mb-1 rounded-lg"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={shippingInfo.email}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full mb-1 rounded-lg"
              />
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                placeholder="Street Address"
                value={shippingInfo.streetAddress}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full rounded-lg"
              />
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={shippingInfo.state}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full mb-1 rounded-lg"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                value={shippingInfo.city}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full mb-1 rounded-lg"
              >
                <option value="">Select City</option>
                {states.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="Postal Code"
                value={shippingInfo.postalCode}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                className="border p-2 w-full mb-1 rounded-lg"
              />
              <label htmlFor="phoneNo">Phone Number</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  id="countryCode"
                  value={shippingInfo.countryCode}
                  onChange={(e) => handleInputChange(e, setShippingInfo)}
                  className="border p-2 rounded-lg w-1/4 mb-1"
                >
                  <option value="">Code</option>
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNo"
                  id="phoneNo"
                  placeholder="Phone Number"
                  value={shippingInfo.phoneNo}
                  onChange={(e) => handleInputChange(e, setShippingInfo)}
                  className="border p-2 rounded-lg flex-grow mb-1"
                />
              </div>
            </div>
            <div className="terms space-y-5 mb-10">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={termsAgreed}
                  onChange={() => setTermsAgreed(!termsAgreed)}
                  className="mr-2"
                />
                <label htmlFor="terms">I agree to the terms and conditions</label>
              </div>
            </div>
            <button className="mr-2 bg-pink-400 text-white p-2 rounded-lg hover:bg-gray-800" onClick={handlePreviousStep}>
              Back to Cart
            </button>
            <button className="bg-pink-400 text-white p-2 rounded-lg hover:bg-gray-800" onClick={handleNextStep}>
              Proceed to Payment
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="font-bold text-center text-3xl mb-5">Payment</h1>
            <div className="billing-form space-y-5 mb-10">
              <h2 className="font-semibold text-xl mb-2">Billing Information</h2>
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                id="cardName"
                placeholder="Cardholder Name"
                value={billingInfo.cardName}
                onChange={(e) => handleInputChange(e, setBillingInfo)}
                className="border p-2 w-full rounded-lg"
              />
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="Card Number"
                value={billingInfo.cardNumber}
                onChange={(e) => handleInputChange(e, setBillingInfo)}
                className="border p-2 w-full rounded-lg"
              />
              <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={billingInfo.expiryDate}
                onChange={(e) => handleInputChange(e, setBillingInfo)}
                className="border p-2 w-full rounded-lg"
              />
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="CVV"
                value={billingInfo.cvv}
                onChange={(e) => handleInputChange(e, setBillingInfo)}
                className="border p-2 w-full rounded-lg"
              />
            </div>
            <div className="payment-options space-y-5 mb-10">
              <h2 className="font-semibold text-xl mb-2">Payment Options</h2>
              <div className="flex gap-4 items-center">
                <FaCcVisa size={40} />
                <FaCcMastercard size={40} />
                <FaApplePay size={40} />
                <FaPaypal size={40} />
                <div className="flex items-center gap-2">
                  <FaLock size={20} />
                  <p>We protect your payment</p>
                </div>
              </div>
            </div>
            <button className="mr-2 bg-pink-400 text-white p-2 rounded-lg hover:bg-gray-800" onClick={handlePreviousStep}>
              Back to Shipping
            </button>
            <button className="bg-pink-400 text-white p-2 rounded-lg hover:bg-gray-800" onClick={handlePayment}>
              Complete Payment
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default Cart;
