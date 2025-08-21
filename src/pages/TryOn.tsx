import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, Video, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";

const TryOn = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sampleOutfits = [
    { id: 1, name: "Summer Dress", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop", category: "women" },
    { id: 2, name: "Business Suit", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop", category: "men" },
    { id: 3, name: "Casual Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop", category: "unisex" },
    { id: 4, name: "Evening Gown", image: "https://images.unsplash.com/photo-1566479179817-c0ae8f8b4f87?w=300&h=400&fit=crop", category: "women" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        toast("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = () => {
    if (!selectedImage || !selectedOutfit) {
      toast("Please upload a photo and select an outfit first!");
      return;
    }

    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("Try-on complete! See your virtual fitting result.");
    }, 3000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedOutfit(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Virtual Try-On Mirror
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload your photo and see how different outfits look on you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Camera className="h-5 w-5 text-primary" />
                Upload Your Photo
              </CardTitle>
              <CardDescription>
                Choose a clear, well-lit photo of yourself for the best results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Photo Upload</TabsTrigger>
                  <TabsTrigger value="video">Video Mode</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload">
                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {selectedImage ? (
                        <div className="space-y-4">
                          <img 
                            src={selectedImage} 
                            alt="Uploaded" 
                            className="mx-auto max-h-64 rounded-lg shadow-card"
                          />
                          <p className="text-sm text-muted-foreground">Click to change photo</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div>
                            <p className="text-foreground font-medium">Click to upload photo</p>
                            <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-foreground font-medium mb-2">Video Mode Coming Soon</p>
                      <p className="text-sm text-muted-foreground">
                        Real-time video try-on will be available in the next update
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Outfit Selection */}
          <Card className="gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Sparkles className="h-5 w-5 text-accent" />
                Choose Outfit
              </CardTitle>
              <CardDescription>
                Select from our collection to see how it looks on you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {sampleOutfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover-scale ${
                      selectedOutfit === outfit.id.toString()
                        ? "border-primary shadow-glow"
                        : "border-transparent hover:border-border"
                    }`}
                    onClick={() => {
                      setSelectedOutfit(outfit.id.toString());
                      toast(`Selected: ${outfit.name}`);
                    }}
                  >
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                      <p className="text-sm font-medium">{outfit.name}</p>
                    </div>
                    {selectedOutfit === outfit.id.toString() && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                          <Sparkles className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handleTryOn}
            disabled={!selectedImage || !selectedOutfit || isProcessing}
            size="lg"
            className="gradient-primary hover:shadow-glow transition-all btn-glow px-8"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Try On Outfit
              </>
            )}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary px-8"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Results Section */}
        {isProcessing && (
          <Card className="mt-8 gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-center text-foreground">Processing Your Try-On</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="animate-pulse">
                  <div className="h-64 bg-secondary/50 rounded-lg" />
                </div>
                <p className="text-muted-foreground">
                  Our AI is analyzing your photo and applying the selected outfit...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TryOn;