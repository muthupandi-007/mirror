import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Target, Award, Sparkles, Globe } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Technology",
      description: "Advanced machine learning algorithms for accurate virtual fitting and real-time clothing simulation."
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Intuitive interface designed for seamless user experience across all devices and skill levels."
    },
    {
      icon: Target,
      title: "Precision Fitting",
      description: "Highly accurate body analysis and fit prediction to reduce returns and improve satisfaction."
    },
    {
      icon: Award,
      title: "Industry Leading",
      description: "Recognized as the most innovative virtual try-on solution in fashion technology."
    }
  ];

  const stats = [
    { label: "Active Users", value: "100K+", color: "text-primary" },
    { label: "Fashion Brands", value: "500+", color: "text-accent" },
    { label: "Try-On Sessions", value: "2M+", color: "text-primary" },
    { label: "Countries", value: "50+", color: "text-accent" }
  ];

  const team = [
    { name: "Dhaniska Sri", role: "Team Leader", expertise: "Fashion Tech Innovation" },
    { name: "Ram Prasath", role: "Team Member", expertise: "AI & Machine Learning" },
    { name: "Bushra", role: "Team Member", expertise: "UX/UI & Fashion Design" },
    { name: "Akash", role: "Team Member", expertise: "Computer Vision & AR" }
  ];

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            About Virtual Try-On Mirror
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the fashion industry by bridging the gap between online shopping 
            and in-store experiences through cutting-edge virtual try-on technology.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize fashion by making it accessible, sustainable, and personalized for everyone. 
                  We believe that everyone should be able to see how clothes look on them before making a purchase, 
                  reducing waste and increasing confidence in online shopping.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="h-6 w-6 text-accent" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a future where virtual and physical fashion experiences seamlessly blend, 
                  empowering consumers to make informed decisions and enabling brands to offer 
                  personalized, sustainable fashion solutions at scale.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="gradient-card border-border shadow-card text-center hover-lift">
                <CardContent className="pt-6">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card border-border shadow-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <feature.icon className="h-8 w-8 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="gradient-card border-border shadow-card hover-lift text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-xs">
                    {member.expertise}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <Card className="gradient-card border-border shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground mb-4">
                Cutting-Edge Technology
              </CardTitle>
              <CardDescription className="text-lg">
                Our proprietary AI technology stack
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold text-primary mb-2">Computer Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced body detection and measurement algorithms for accurate fitting analysis
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-accent mb-2">3D Modeling</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time 3D cloth simulation and physics-based fabric rendering
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-primary mb-2">Machine Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalized fit recommendations based on user preferences and body type
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center gradient-hero rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join millions of users who are already transforming their shopping experience with our 
            revolutionary virtual try-on technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              #FashionTech
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              #SustainableFashion
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              #AIInnovation
            </Badge>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
