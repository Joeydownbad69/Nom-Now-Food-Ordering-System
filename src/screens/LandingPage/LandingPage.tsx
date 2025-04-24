import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { meals } from "./meals";

// Category data for the browse section
const categories = [
  { name: "Offers", icon: "/frame-31.svg" },
  { name: "New Spots", icon: "/group-1.png", hasBorder: true },
  { name: "Top Rated", icon: "/frame-33.svg" },
  { name: "Top Spots", icon: "/group-2.png", hasBorder: true },
  { name: "Cuisines", icon: "/plate.png", hasBorder: true },
  { name: "Pick-Ups", icon: "/vector-11.svg", hasBorder: true },
];

export const LandingPage = (): JSX.Element => {
  const MEALS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(meals.length / MEALS_PER_PAGE);
  const paginatedMeals = meals.slice(
    (page - 1) * MEALS_PER_PAGE,
    page * MEALS_PER_PAGE
  );
  return (
    <main className="bg-[#ebebeb] min-h-screen w-full min-w-full">
      {/* Header/Navigation */}
      <header className="bg-[#211a18] h-20 shadow-[0px_-10.67px_5.33px_18px_#00000040] flex items-center justify-between px-4 md:px-8 lg:px-16">
        <img
          className="h-7 md:h-9 w-auto"
          alt="Nomnow logo"
          src="/nomnow-logo.png"
        />

        <div className="flex items-center gap-2 md:gap-6">
          <div className="relative">
            <Input
              className="h-8 md:h-9 w-[200px] md:w-[263px] bg-[#d9d9d9] rounded-[666.67px] pr-10"
              placeholder=""
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 md:w-6 h-5 md:h-6 text-[#ff9d23]" />
          </div>

          <Button
            variant="link"
            className="font-semibold text-[#ff9d23] text-sm md:text-base p-0"
          >
            LOGIN
          </Button>

          <Button
            variant="link"
            className="font-semibold text-[#ff9d23] text-sm md:text-base p-0"
          >
            SIGNUP
          </Button>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Browse Categories Section */}
        <h2 className="font-semibold text-xl md:text-[23.3px] mt-8 md:mt-16 mb-6 md:mb-10 font-['Roboto',Helvetica]">
          Browse
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8 md:mb-16">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              {category.hasBorder ? (
                <div
                  className={`flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#ebebeb] rounded-[50px] border-[3.33px] border-solid border-[#ff9d23]`}
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="object-contain w-3/4 h-3/4"
                  />
                </div>
              ) : (
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
                />
              )}
              <span className="font-normal text-base md:text-xl text-black font-['Roboto',Helvetica] text-center">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Hero Banner */}
        <div className="relative bg-[#ff9d23] rounded-[30px] h-[200px] md:h-[287px] mb-8 md:mb-16 overflow-hidden">
          <h1 className="absolute top-[-10px] md:top-[20px] left-[20%] md:left-[264px] text-6xl md:text-[124px] text-[#f7f7f7] font-['Sigmar_One',Helvetica] [text-shadow:0px_2.67px_2.67px_#00000040]">
            NomNow!
          </h1> 
          <p className="absolute top-[80px] md:top-[126px] left-[25%] md:left-[339px] text-3  xl md:text-6xl text-[#d4bc93] font-['Roboto',sans-serif] font-bold italic [text-shadow:0px_2.67px_2.67px_#00000040] [-webkit-text-stroke:0.33px_#000000]">
            Super affordable delivery
          </p>
          <p className="absolute top-[150px] md:top-[200px] left-[30%] md:left-[412px] text-4xl md:text-[84.7px] text-[#ff7323] font-['Baloo-Regular',Helvetica] [text-shadow:0px_2.67px_2.67px_#00000040] [-webkit-text-stroke:0.33px_#000000]">
            Click-Order-Enjoy
          </p>
          <img
            className="absolute h-[200px] md:h-[310px] left-[-31px] top-0 md:top-[-23px] object-cover"
            alt="Delivery person"
            src="/model-1.png"
          />
        </div>

        {/* Featured Meals Banner */}
        <section className="w-full bg-gradient-to-r from-[#ff9d23] to-[#ff7323] rounded-2xl shadow-md px-6 py-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex flex-col items-start">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 font-['Sigmar_One',Helvetica]">Featured Meals</h2>
            <p className="text-lg md:text-2xl text-white mb-4 max-w-xl">
              Discover our top picks and bestsellers, handpicked just for you! Try these crowd favorites and enjoy exclusive discounts.
            </p>
            <a href="#meals" className="inline-block px-6 py-2 bg-white text-[#ff9d23] font-bold rounded-full shadow hover:bg-[#ffe5b8] transition">Order Now</a>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/featured-meals.png" alt="Featured Meals" className="w-[320px] md:w-[400px] rounded-xl shadow-lg object-cover" />
          </div>
        </section>

        {/* Browse Meals Section */}
        <div className="mb-8 md:mb-16">
          <div className="bg-[#211a18] h-[40px] md:h-[47px] flex items-center justify-center mb-6 md:mb-10">
            <h2 className="font-extrabold text-2xl md:text-[33.3px] text-[#f7f7f7] font-['Roboto',Helvetica]">
              Browse Meals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {paginatedMeals.map((meal) => (
              <Card
                key={meal.id}
                className="bg-[#d9d9d9] rounded-[9.33px] border-2 border-solid border-[#ff9d23] shadow-[0px_1.33px_4px_2.67px_#00000040] overflow-hidden relative"
              >
                <CardContent className="p-3.5 h-[156px]">
                  <div className="flex justify-between">
                    <div className="max-w-[60%]">
                      <h3 className="font-semibold text-sm text-black font-['Poppins',Helvetica] mb-2">
                        {meal.name}
                      </h3>
                      <p className="font-light text-[8.7px] text-black font-['Poppins',Helvetica]">
                        {meal.description}
                      </p>
                    </div>
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="max-w-[40%] object-contain"
                    />
                  </div>
                  <div className="absolute bottom-3.5 left-2 font-bold text-[15.3px] text-black font-['Poppins',Helvetica]">
                    Php {meal.price}
                  </div>
                </CardContent>
                <Button
                  className="
                    absolute bottom-0 right-0
                    w-[30px] h-[30px]
                    sm:w-[39px] sm:h-[39px]
                    md:w-[42px] md:h-[42px]
                    p-0 bg-[#ff9d23]
                    rounded-[16px_0px_8px_0px]
                    flex items-center justify-center
                  "
                >
                  <img
                    className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[23px] md:h-[23px]"
                    alt="Add to cart"
                    src="/vector.svg"
                  />
                </Button>
              </Card>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="secondary"
            >
              Previous
            </Button>
            <span className="self-center font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              variant="secondary"
            >
              Next
            </Button>
          </div>  
        </div>
      </div>
    </main>
  );
};