import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, Video, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { postTryOn, dataURLToFile } from "@/lib/api";
import { useLocation, useNavigate } from "react-router-dom";

const TryOn = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tabValue, setTabValue] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [overlayScale, setOverlayScale] = useState(1);
  const [overlayRotation, setOverlayRotation] = useState(0);
  const [overlayX, setOverlayX] = useState(0);
  const [overlayY, setOverlayY] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0.8);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const garmentFileInputRef = useRef<HTMLInputElement>(null);
  const [garmentFile, setGarmentFile] = useState<File | null>(null);
  const [garmentUrlInput, setGarmentUrlInput] = useState<string>("");
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as any;

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

  const handleGarmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGarmentFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setGarmentPreview(e.target?.result as string);
        toast("Garment uploaded.");
      };
      reader.readAsDataURL(file);
      // Clear any URL if file chosen
      setGarmentUrlInput("");
      // Clear selected sample outfit so custom garment takes precedence
      setSelectedOutfit(null);
    }
  };

  const handleTryOn = async () => {
    const hasGarment = !!garmentFile || !!garmentUrlInput || !!selectedOutfit;
    if (!hasGarment || (tabValue === 'upload' && !selectedImage)) {
      toast("Provide a photo and select/upload a garment (or paste URL).");
      return;
    }

    try {
      setIsProcessing(true);
      setResultImage(null);

      // Only upload mode is implemented for backend try-on in this snippet
      if (tabValue !== 'upload' || !selectedImage) {
        toast("Video mode processing not implemented in this build.");
        setIsProcessing(false);
        return;
      }

      const userFile = dataURLToFile(selectedImage, "user.png");

      const outfitUrl = selectedOutfit ? sampleOutfits.find(o => o.id.toString() === selectedOutfit)?.image : undefined;
      let garmentToSendFile: File | undefined = undefined;
      let garmentToSendUrl: string | undefined = undefined;

      if (garmentFile) {
        garmentToSendFile = garmentFile;
      } else if (garmentUrlInput) {
        garmentToSendUrl = garmentUrlInput;
      } else if (outfitUrl) {
        // Fallback to sample outfit; prefer sending URL to avoid CORS file fetch issues
        garmentToSendUrl = outfitUrl;
      }

      const apiBaseUrl = import.meta.env.VITE_TRYON_API_URL as string;
      if (!apiBaseUrl) {
        throw new Error("VITE_TRYON_API_URL is not set");
      }

      const result = await postTryOn({
        apiBaseUrl,
        userImageFile: userFile,
        garmentImageFile: garmentToSendFile,
        garmentUrl: garmentToSendUrl,
        extras: { fit_strength: 0.8 },
      });

      const finalImage = result.image_url ?? result.image_base64 ?? null;
      if (!finalImage) {
        throw new Error("Backend returned no image");
      }
      setResultImage(finalImage);
      toast("Try-on generated!");
    } catch (err: any) {
      console.error(err);
      toast(err.message || "Failed to process try-on");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedOutfit(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startVideo = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast("Camera not supported on this device");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      toast("Unable to access camera. Please allow permission.");
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (tabValue === "video") {
      startVideo();
    } else {
      stopVideo();
    }
    return () => {
      stopVideo();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  // Accept garment from navigation state
  useEffect(() => {
    const garmentUrlFromState: string | undefined = location?.state?.garmentUrl;
    if (garmentUrlFromState) {
      setGarmentUrlInput(garmentUrlFromState);
      setGarmentPreview(garmentUrlFromState);
      setGarmentFile(null);
      setSelectedOutfit(null);
      // clear state so back/forward doesn't reapply unexpectedly
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Virtual Try-On Mirror
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload your photo and see how different outfits look on you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
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
                          <div className="relative mx-auto max-w-full rounded-lg overflow-hidden shadow-card">
                            <img 
                              src={selectedImage} 
                              alt="Uploaded" 
                              className="mx-auto max-h-64"
                            />
                            {selectedOutfit && (
                              <img
                                src={sampleOutfits.find(o => o.id.toString() === selectedOutfit)?.image}
                                alt="Selected outfit overlay"
                                className="absolute top-1/2 left-1/2 pointer-events-none"
                                style={{
                                  transform: `translate(-50%, -50%) translate(${overlayX}px, ${overlayY}px) scale(${overlayScale}) rotate(${overlayRotation}deg)`,
                                  opacity: overlayOpacity,
                                  maxWidth: '70%',
                                  maxHeight: '70%'
                                }}
                              />
                            )}
                          </div>
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
                    {selectedImage && selectedOutfit && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Scale</label>
                          <input type="range" min="0.5" max="2" step="0.01" value={overlayScale} onChange={(e) => setOverlayScale(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Rotation</label>
                          <input type="range" min="-45" max="45" step="1" value={overlayRotation} onChange={(e) => setOverlayRotation(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Horizontal Offset</label>
                          <input type="range" min="-200" max="200" step="1" value={overlayX} onChange={(e) => setOverlayX(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Vertical Offset</label>
                          <input type="range" min="-200" max="200" step="1" value={overlayY} onChange={(e) => setOverlayY(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm text-muted-foreground">Opacity</label>
                          <input type="range" min="0.3" max="1" step="0.01" value={overlayOpacity} onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))} className="w-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="space-y-4">
                    <div className="relative border-2 border-dashed border-border rounded-lg overflow-hidden">
                      <div className="bg-black/70 text-white text-sm px-3 py-2 absolute top-2 left-2 rounded-md z-20">
                        {selectedOutfit ? "Live preview with selected outfit" : "Select an outfit to preview"}
                      </div>
                      <div className="aspect-[3/4] w-full relative">
                        <video
                          ref={videoRef}
                          className="absolute inset-0 h-full w-full object-cover"
                          muted
                          playsInline
                          autoPlay
                        />
                        {selectedOutfit && (
                          <img
                            src={sampleOutfits.find(o => o.id.toString() === selectedOutfit)?.image}
                            alt="Selected outfit overlay"
                            className="absolute top-1/2 left-1/2 pointer-events-none"
                            style={{
                              transform: `translate(-50%, -50%) translate(${overlayX}px, ${overlayY}px) scale(${overlayScale}) rotate(${overlayRotation}deg)`,
                              opacity: overlayOpacity,
                              maxWidth: '70%',
                              maxHeight: '70%'
                            }}
                          />
                        )}
                      </div>
                    </div>
                    {selectedOutfit && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Scale</label>
                          <input type="range" min="0.5" max="2" step="0.01" value={overlayScale} onChange={(e) => setOverlayScale(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Rotation</label>
                          <input type="range" min="-45" max="45" step="1" value={overlayRotation} onChange={(e) => setOverlayRotation(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Horizontal Offset</label>
                          <input type="range" min="-200" max="200" step="1" value={overlayX} onChange={(e) => setOverlayX(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Vertical Offset</label>
                          <input type="range" min="-200" max="200" step="1" value={overlayY} onChange={(e) => setOverlayY(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm text-muted-foreground">Opacity</label>
                          <input type="range" min="0.3" max="1" step="0.01" value={overlayOpacity} onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))} className="w-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Garment Section */}
          <Card className="gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Upload className="h-5 w-5 text-primary" />
                Garment
              </CardTitle>
              <CardDescription>
                Upload a garment image or paste a URL. This overrides sample selection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => garmentFileInputRef.current?.click()}
                >
                  {garmentPreview ? (
                    <div className="space-y-2">
                      <img src={garmentPreview} alt="Garment preview" className="mx-auto max-h-40 rounded" />
                      <p className="text-sm text-muted-foreground">Click to change garment</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="text-foreground font-medium">Click to upload garment</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={garmentFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleGarmentUpload}
                  className="hidden"
                />

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Or paste garment image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/garment.png"
                    value={garmentUrlInput}
                    onChange={(e) => {
                      setGarmentUrlInput(e.target.value);
                      if (e.target.value) {
                        setGarmentPreview(e.target.value);
                        setGarmentFile(null);
                        setSelectedOutfit(null);
                      }
                    }}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
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
                      const id = outfit.id.toString();
                      setSelectedOutfit((prev) => (prev === id ? null : id));
                      // Clear custom garment inputs when selecting a sample outfit
                      setGarmentFile(null);
                      setGarmentUrlInput("");
                      setGarmentPreview(null);
                    }}
                  >
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="128"
                      sizes="(min-width:1024px) 50vw, 100vw"
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
            disabled={(!garmentFile && !garmentUrlInput && !selectedOutfit) || (tabValue === 'upload' && !selectedImage) || isProcessing}
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

        {resultImage && !isProcessing && (
          <Card className="mt-8 gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-center text-foreground">Your Try-On Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-center">
                <img src={resultImage} alt="Try-on result" className="max-h-[28rem] rounded-lg shadow-card" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TryOn;
