'use client'
// use 'client' to make API requests
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { set } from 'mongoose';

interface Product {
  name: string;
  image: string;
  amount: string;
  price: string;
  link: string;
  choice:boolean;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [filterOption, setFilterOption] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const fetchProducts = async (product: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/v1/scrapper/${product}`);
      const data = await response.json();
  
      // Use a Set to keep track of unique product identifiers (composite key)
      const uniqueProductSet = new Set();
  
      // Filter out repeated products
      const uniqueProducts = data.filter((product:Product) => {
        const productIdentifier = `${product.name}-${product.price}`;
        if (!uniqueProductSet.has(productIdentifier)) {
          uniqueProductSet.add(productIdentifier);
          return true;
        }
        return false;
      });
  
      setProducts(uniqueProducts);
      setAllProducts(uniqueProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      fetchProducts(searchTerm);
      setSearchTerm('');
    }
  };

  function handleFilterChange(option: string | null): void {
    setFilterOption(option);
  }
  useEffect(() => {
    setProducts([]);
    if (filterOption) {
      // Filter products based on the chosen option
      let filteredProducts;
      if (filterOption === 'choice') {
       filteredProducts = products.filter((product) => {
        if (filterOption === 'choice') {
          return product.choice;
        }
           else {
          return true; // Show all products when no filter is selected
        }
      });
      setProducts(filteredProducts);
    } else { 
      setProducts(allProducts);
    }
    }
  }, [filterOption]);

  const generateRandomKey = (baseKey:number) => {
    const randomSuffix = Math.floor(Math.random() * 1000000);
    return `${baseKey}_${randomSuffix}`;
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Product Scraper</h2>
      <div className="mb-4 flex items-center">
        <form action="submit" onSubmit={
          (e) => {
            e.preventDefault();
            handleSearch();
          }
        }>
        <input
          type="text"
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 mr-2"
        />
        <button
          className={`${!loading ? "bg-blue-500" : "bg-gray-400"} text-white px-4 py-2 rounded relative`}
        >
                {loading ? <span className='cursor-not-allowed'>loading...</span>: <span>Search</span>}
        </button>
        </form>
        <div className="ml-4">
          <label className="mr-2">Filter:</label>
          <select
            value={filterOption || ''}
            onChange={(e) => handleFilterChange(e.target.value || null)}
            className="p-2 border border-gray-300"
          >
            <option value="All">All</option>
            <option value="choice">Choice</option>
          </select>
        </div>
      </div>

      {/* Display Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={generateRandomKey(index)} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
