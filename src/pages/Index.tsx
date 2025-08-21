import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page on app entry
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading Virtual Try-On Mirror...</p>
      </div>
    </div>
  );
};

export default Index;
