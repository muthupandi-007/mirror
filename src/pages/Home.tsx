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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
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
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
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

      {/* Virtual Mirror Demo Section */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Experience the Virtual Mirror
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mirror Interface */}
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-background to-muted border-2 border-primary/20 rounded-2xl shadow-card overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                    <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                        <p className="text-lg font-medium text-foreground mb-2">Virtual Mirror Active</p>
                        <p className="text-muted-foreground">Upload photo or start video to begin</p>
                      </div>
                    </div>
                    {/* Simulated Mirror Effects */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
                    <div className="absolute top-6 right-8 w-6 h-6 bg-accent/20 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-8 left-8 w-4 h-4 bg-primary/30 rounded-full animate-bounce delay-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/80 to-transparent flex items-center justify-center">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-200"></div>
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Photo Upload</h3>
                    <p className="text-muted-foreground">
                      Upload your photo and instantly see how different outfits look on you with our advanced AI fitting technology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Video className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Live Video Mode</h3>
                    <p className="text-muted-foreground">
                      Experience real-time virtual try-on with live video streaming for the most realistic fitting experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Smart Fitting</h3>
                    <p className="text-muted-foreground">
                      Our AI analyzes your body measurements and suggests the perfect fit for every garment.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/try-on">
                    <Button size="lg" className="gradient-primary hover:shadow-glow transition-all btn-glow">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Try It Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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
hi FS avenger 
welcome to Hackthon 
