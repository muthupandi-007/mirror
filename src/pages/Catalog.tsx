import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingBag, Filter, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";

const Catalog = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || "women");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const products = {
    women: [
      { id: 1, name: "Elegant Summer Dress", price: 89, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Blue", "Pink", "White"] },
      { id: 2, name: "Business Blazer", price: 129, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Navy", "Gray"] },
      { id: 3, name: "Casual Jeans", price: 79, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop", sizes: ["26", "28", "30", "32", "34"], colors: ["Blue", "Black", "Light Blue"] },
      { id: 4, name: "Evening Gown", price: 199, image: "https://images.unsplash.com/photo-1566479179817-c0ae8f8b4f87?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L"], colors: ["Black", "Red", "Gold"] },
      { id: 13, name: "Floral Midi Dress", price: 95, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Floral", "Pink", "Blue"] },
      { id: 14, name: "Cocktail Dress", price: 159, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L"], colors: ["Black", "Navy", "Burgundy"] },
      { id: 15, name: "Bohemian Maxi Dress", price: 119, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop", sizes: ["S", "M", "L", "XL"], colors: ["White", "Cream", "Sage"] },
      { id: 16, name: "Little Black Dress", price: 139, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Black"] },
      { id: 17, name: "Wrap Dress", price: 85, image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Red", "Blue", "Green"] },
      { id: 18, name: "A-Line Dress", price: 75, image: "https://images.unsplash.com/photo-1566479179817-c0ae8f8b4f87?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Pink", "Yellow", "Purple"] },
      { id: 19, name: "Vintage Style Dress", price: 109, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop", sizes: ["S", "M", "L", "XL"], colors: ["Navy", "Burgundy", "Forest"] },
      { id: 20, name: "Off-Shoulder Dress", price: 99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop", sizes: ["XS", "S", "M", "L"], colors: ["White", "Blush", "Mint"] },
    ],
    men: [
      { id: 5, name: "Classic Suit", price: 299, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black", "Navy", "Charcoal"] },
      { id: 6, name: "Casual Shirt", price: 49, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop", sizes: ["S", "M", "L", "XL"], colors: ["White", "Blue", "Light Blue"] },
      { id: 7, name: "Denim Jacket", price: 89, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop", sizes: ["S", "M", "L", "XL"], colors: ["Blue", "Black", "Light Blue"] },
      { id: 8, name: "Sport Sneakers", price: 159, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop", sizes: ["7", "8", "9", "10", "11"], colors: ["White", "Black", "Blue"] },
    ],
    kids: [
      { id: 9, name: "Colorful T-Shirt", price: 29, image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop", sizes: ["4T", "5T", "6", "7", "8"], colors: ["Red", "Blue", "Yellow"] },
      { id: 10, name: "School Uniform", price: 59, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a4?w=400&h=500&fit=crop", sizes: ["4", "5", "6", "7", "8"], colors: ["Navy", "Gray", "White"] },
      { id: 11, name: "Play Dress", price: 39, image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop", sizes: ["2T", "3T", "4T", "5T", "6"], colors: ["Pink", "Purple", "Green"] },
      { id: 12, name: "Winter Coat", price: 89, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop", sizes: ["4", "5", "6", "7", "8"], colors: ["Red", "Blue", "Black"] },
    ],
  };

  const currentProducts = products[selectedCategory as keyof typeof products] || products.women;

  const handleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast("Removed from favorites");
    } else {
      newFavorites.add(productId);
      toast("Added to favorites");
    }
    setFavorites(newFavorites);
  };

  const handleTryOn = (product: any) => {
    // Navigate to try-on and pass garment image URL via router state
    navigate('/try-on', { state: { garmentUrl: product.image } });
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Fashion Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover our curated collection of the latest fashion trends
          </p>
        </div>

        {/* Category Tabs and Filters */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-3">
                <TabsTrigger value="women">Women</TabsTrigger>
                <TabsTrigger value="men">Men</TabsTrigger>
                <TabsTrigger value="kids">Kids</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <Card key={product.id} className="gradient-card border-border hover-lift shadow-card group">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="256"
                          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="bg-black/50 hover:bg-black/70 text-white"
                            onClick={() => handleFavorite(product.id)}
                          >
                            <Heart 
                              className={`h-4 w-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                            />
                          </Button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button 
                            className="gradient-primary hover:shadow-glow btn-glow"
                            onClick={() => handleTryOn(product)}
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Try On
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2 text-foreground">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="mb-3">
                        ${product.price}
                      </CardDescription>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Sizes:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.map((size) => (
                              <Badge key={size} variant="outline" className="text-xs">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Colors:</p>
                          <div className="flex gap-2">
                            {product.colors.map((color) => (
                              <div
                                key={color}
                                className="w-4 h-4 rounded-full border border-border cursor-pointer hover:scale-110 transition-transform"
                                style={{
                                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                    color.toLowerCase() === 'black' ? '#000000' :
                                    color.toLowerCase() === 'navy' ? '#001f3f' :
                                    color.toLowerCase() === 'gray' || color.toLowerCase() === 'grey' ? '#808080' :
                                    color.toLowerCase()
                                }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
