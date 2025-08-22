import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, MessageCircle, HeadphonesIcon } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: ""
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@virtualtryonmirror.com",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      color: "text-accent"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our headquarters",
      contact: "123 Fashion St, Tech City, TC 12345",
      color: "text-primary"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the virtual try-on?",
      answer: "Our AI technology provides 95% accuracy in fit prediction using advanced body analysis."
    },
    {
      question: "What devices are supported?",
      answer: "Our platform works on all modern browsers, smartphones, tablets, and desktop computers."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and never store your personal photos permanently."
    },
    {
      question: "Do you offer business solutions?",
      answer: "Yes, we provide API access and custom solutions for fashion retailers and brands."
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about Virtual Try-On Mirror? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-secondary/50 border-border"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="bg-secondary/50 border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                      >
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="business">Business Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="press">Press Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject line"
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="bg-secondary/50 border-border"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover:shadow-glow transition-all btn-glow"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <HeadphonesIcon className="h-5 w-5 text-accent" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <info.icon className={`h-5 w-5 mt-1 ${info.color}`} />
                    <div>
                      <h3 className="font-medium text-foreground">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {info.description}
                      </p>
                      <p className="text-sm text-foreground">{info.contact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Answers</CardTitle>
                <CardDescription>
                  Frequently asked questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium text-sm text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {faq.answer}
                    </p>
                    {index < faqs.length - 1 && (
                      <div className="border-b border-border/50 pt-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-foreground">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
