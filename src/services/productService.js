const categories = ['Electronics', 'Furniture', 'Apparel', 'Home Decor', 'Kitchenware', 'Automotive', 'Beauty'];
const brands = ['TechNova', 'LuxeHome', 'ModaFit', 'EcoLiving', 'SwiftAuto', 'GlowPro', 'ZenthHome'];
const suppliers = ['Global Distribution Inc.', 'Apex Logistics', 'Summit Wholesale', 'Horizon Trading', 'Prime Sourcing'];

export const productService = {
  getProducts: () => {
    const products = [];
    for (let i = 1; i <= 50; i++) {
      const price = Math.floor(Math.random() * 500) + 50;
      const cost = Math.floor(price * 0.6);
      const stock = Math.floor(Math.random() * 200);
      
      products.push({
        id: `PRD-${1000 + i}`,
        sku: `SKU-${Math.random().toString(36).substring(7).toUpperCase()}`,
        name: `Product ${i} Premium Edition`,
        category: categories[Math.floor(Math.random() * categories.length)],
        brand: brands[Math.floor(Math.random() * brands.length)],
        description: `High-quality industrial grade product designed for durability and performance in ${categories[Math.floor(Math.random() * categories.length)]} environments.`,
        price: price,
        cost: cost,
        margin: `${(((price - cost) / price) * 100).toFixed(1)}%`,
        stock: stock,
        reorderLevel: 20,
        supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
        warehouse: `WH-${Math.floor(Math.random() * 5) + 1}`,
        weight: (Math.random() * 10).toFixed(2),
        dimensions: `${Math.floor(Math.random() * 50) + 10}x${Math.floor(Math.random() * 30) + 5}x${Math.floor(Math.random() * 20) + 2}`,
        color: ['Black', 'White', 'Silver', 'Blue', 'Charcoal'][Math.floor(Math.random() * 5)],
        material: ['Aluminum', 'Plastic', 'Steel', 'Carbon Fiber', 'Wood'][Math.floor(Math.random() * 5)],
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 500),
        status: stock > 0 ? 'Active' : 'Out of Stock'
      });
    }
    return products;
  }
};
