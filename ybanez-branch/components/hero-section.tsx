import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/29173097/pexels-photo-29173097/free-photo-of-delicious-cheeseburger-with-fries-and-sauce.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.7)"
        }}
      />
      
      <div className="relative z-10 container-custom py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md animate-fade-in">
          Craving Something Delicious?
        </h1>
        
        <p className="text-xl text-white mb-10 max-w-2xl drop-shadow-md animate-slide-up">
        Order tasty meals anytime from the fast food spots you love and pick them up fresh and ready to go!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Button className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white px-8 py-6 text-lg rounded-full" asChild>
            <Link href="/restaurants">
              Order Now
            </Link>
          </Button>
          
          <Button variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white px-8 py-6 text-lg rounded-full" asChild>
            <Link href="/restaurants">
              Browse Restaurants
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}