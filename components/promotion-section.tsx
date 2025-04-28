import Link from "next/link";
import { Button } from "../components/ui/button";

export default function PromotionSection() {
  return (
    <div className="bg-gradient-to-r from-nomnow-primary/10 to-nomnow-tertiary/20 dark:from-nomnow-primary/20 dark:to-nomnow-tertiary/10 rounded-xl p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-nomnow-primary">
          Enjoy a special offer on your first order—pick up your meal fresh and fast!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
          Enjoy the convenience of quick and easy pickup when you place your first order with us. Don't miss this limited-time offer to experience our exceptional service and delicious food!
          </p>
          <Button className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white" asChild>
            <Link href="/restaurants">
              Order Now
            </Link>
          </Button>
        </div>
        
        <div className="w-full md:w-auto">
          <img 
            src="https://images.pexels.com/photos/16586527/pexels-photo-16586527/free-photo-of-a-person-holding-a-slice-of-pizza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Promotion" 
            className="rounded-lg shadow-lg max-w-xs md:max-w-sm object-cover h-60"
          />
        </div>
      </div>
    </div>
  );
}