import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Video, Zap, Sparkles, ShoppingBag, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center gradient-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              Virtual Try-On Mirror
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of fashion with our AI-powered virtual fitting room. 
              Try on clothes instantly and see how they look before you buy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/try-on">
                <Button size="lg" className="gradient-primary hover:shadow-glow transition-all btn-glow text-lg px-8 py-6">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Try-On
                </Button>
              </Link>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 transition-all">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-primary bg-clip-text text-transparent">
            Revolutionary Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="gradient-card border-border hover-lift shadow-card">
              <CardHeader>
                <Camera className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Photo Try-On</CardTitle>
                <CardDescription>
                  Upload your photo and see how clothes look on you instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced AI technology analyzes your body shape and perfectly fits virtual clothing.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border hover-lift shadow-card">
              <CardHeader>
                <Video className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-foreground">Video Mode</CardTitle>
                <CardDescription>
                  Dynamic try-on experience with real-time video preview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See how outfits move and flow with your movements in real-time video mode.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border hover-lift shadow-card">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Instant Results</CardTitle>
                <CardDescription>
                  Lightning-fast processing for immediate fashion feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get results in seconds with our optimized AI algorithms and cloud processing.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border hover-lift shadow-card">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-foreground">Smart Fit Analysis</CardTitle>
                <CardDescription>
                  AI-powered fit analysis for perfect sizing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our smart analyzer identifies fit issues and suggests better sizes automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border hover-lift shadow-card">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Extensive Catalog</CardTitle>
                <CardDescription>
                  Thousands of items across Men, Women, and Kids collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse our curated collection of the latest fashion trends and classics.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border hover-lift shadow-card">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-foreground">Social Sharing</CardTitle>
                <CardDescription>
                  Share your looks with friends and get feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with the fashion community and share your virtual try-on experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the future of fashion
          </p>
          <Link to="/try-on">
            <Button size="lg" className="gradient-primary hover:shadow-glow transition-all btn-glow text-lg px-8 py-6">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;