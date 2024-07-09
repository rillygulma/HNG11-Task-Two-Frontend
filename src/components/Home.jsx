import { useState } from "react";
//import Container from "./Container";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cartSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Product1 from '../assets/Product1.jpeg';
import Product2 from '../assets/Product2.jpg';
import Product3 from '../assets/Product3.png';
import Product4 from '../assets/Product4.png';
import Product6 from '../assets/Product6.jpg';
import Product7 from '../assets/Product7.png';
import Product8 from '../assets/Product8.jpeg';
import Product9 from '../assets/Product9.jpg';



const productsData = [
  { id: 1, image: Product1, title: "Product 1", price: 10000.0, rating: { rate: 4.5, count: 10 }, bestSeller: true },
  { id: 2, image: Product2, title: "Product 2", price: 5000.0, rating: { rate: 4.0, count: 20 }, bestSeller: false },
  { id: 3, image: Product3, title: "Product 3", price: 3000.0, rating: { rate: 3.5, count: 30 }, bestSeller: false },
  { id: 4, image: Product4, title: "Product 4", price: 4000.0, rating: { rate: 4.8, count: 15 }, bestSeller: true },
  { id: 5, image: Product6, title: "Product 6", price: 5000.0, rating: { rate: 4.3, count: 25 }, bestSeller: false },
  { id: 6, image: Product7, title: "Product 7", price: 6000.0, rating: { rate: 3.9, count: 8 }, bestSeller: false },
  { id: 7, image: Product8, title: "Product 8", price: 7000.0, rating: { rate: 4.1, count: 12 }, bestSeller: true },
  { id: 8, image: Product9, title: "Product 9", price: 80000.0, rating: { rate: 4.7, count: 22 }, bestSeller: true },
];

const Home = () => {
  const [products, setProducts] = useState(productsData);
  const [priceFilter, setPriceFilter] = useState("");
  const [bestSellerFilter, setBestSellerFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const dispatch = useDispatch();

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      quantity: 1,
    };
    dispatch(addProductToCart(newProduct));
  };

  const handleFilter = () => {
    let filteredProducts = productsData;

    if (priceFilter) {
      filteredProducts = filteredProducts.filter((product) => {
        if (priceFilter === "low") return product.price < 50;
        if (priceFilter === "high") return product.price >= 50;
        return true;
      });
    }

    if (bestSellerFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        bestSellerFilter === "yes" ? product.bestSeller : !product.bestSeller
      );
    }

    if (ratingFilter) {
      filteredProducts = filteredProducts.filter((product) => {
        if (ratingFilter === "4above") return product.rating.rate >= 4;
        if (ratingFilter === "3above") return product.rating.rate >= 3;
        return true;
      });
    }

    setProducts(filteredProducts);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill().map((_, index) => <FaStar key={index} className="text-yellow-500" />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars).fill().map((_, index) => <FaRegStar key={index} className="text-yellow-500" />)}
      </>
    );
  };

  return (
      <div className="home bg-pink-100">
        <div className="filters mb-5 flex flex-wrap justify-center space-x-5">
        <button onClick={handleFilter} className="border-2 text-lg mt-1 rounded-md px-3 py-2 hover:bg-black hover:text-white mb-2 md:mb-0">
             Filter by
          </button>
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="border px-4 mt-3 py-2 rounded-lg mb-2 md:mb-0">
            <option value="">Price</option>
            <option value="low">Below <span>&#8358;</span>5000</option>
            <option value="high"><span>&#8358;</span>5000 and Above</option>
          </select>

          <select value={bestSellerFilter} onChange={(e) => setBestSellerFilter(e.target.value)} className="border px-4 mt-3 py-2 rounded-lg mb-2 md:mb-0">
            <option value="">Best Seller</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="border px-4 py-2 mt-3 rounded-lg mb-2 md:mb-0">
            <option value="">Rating</option>
            <option value="4above">4 and above</option>
            <option value="3above">3 and above</option>
          </select>

        </div>

        <div className="products grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product border-4 border-white rounded-lg px-4 py-6 space-y-3" key={product.id}>
                <div className="w-full h-[150px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="block max-w-full h-full mx-auto object-contain"
                  />
                </div>
                <h2 className="text-sm font-semibold">{product.title}</h2>
                <h3 className="text-3xl text-red-950 font-bold"><span>&#8358;</span>{product.price}</h3>
                <div className="text-[12px] flex items-center">
                  Ratings: {renderStars(product.rating.rate)} ({product.rating.count})
                </div>
                <button
                  onClick={() => addProduct(product)}
                  className="border-2 bg-pink-400 rounded-md px-3 py-2 hover:bg-black hover:text-white"
                >
                  Add To Cart
                </button>
              </div>
            ))
          ) : (
            <h2 className="text-red-950 text-center">No Products Found</h2>
          )}
        </div>
      </div>
      
  );
};

export default Home;
