import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const products = [
  { id: 1, name: "Smartphone X", price: 799, image: "/api/placeholder/400/300" },
  { id: 2, name: "Laptop Pro", price: 1299, image: "/api/placeholder/400/300" },
  { id: 3, name: "Wireless Earbuds", price: 149, image: "/api/placeholder/400/300" },
  { id: 4, name: "Smartwatch", price: 249, image: "/api/placeholder/400/300" },
];

const categories = [
  { name: "Phones", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "Accessories", icon: "🎧" },
  { name: "Wearables", icon: "⌚" },
];

const HomePage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">TechMart</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            </ul>
          </nav>
          <Button variant="outline" size="icon">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to TechMart</h2>
          <p className="text-xl mb-8">Discover the latest in tech innovation</p>
          <Button>
            Shop Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-gray-600">${product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Button key={index} variant="outline" className="h-32 text-lg flex flex-col items-center justify-center">
                <span className="text-3xl mb-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for the latest deals and tech news</p>
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow mr-2"
              required
            />
            <Button type="submit">
              Subscribe
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TechMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;