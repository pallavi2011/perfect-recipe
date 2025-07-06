"use client";
import React from "react";

const team = [
  {
    name: "Mary Richard",
    role: "Food Blogger",
    img: "/images/team1.png",
  },
  {
    name: "John David",
    role: "Chef",
    img: "/images/team2.jpg",
  },
  {
    name: "James Robert",
    role: "Food Blogger",
    img: "/images/team3.png",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 md:px-20 pt-10">
       
        <h1 className="text-3xl font-medium mb-8 text-black">About Us</h1>
        {/* Section 1 */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">
            Explore Our Delicious Recipes
          </h2>
          <p className="text-gray-700 max-w-3xl">
            At NutriRecipe, we believe in the power of food to bring people together, to create cherished memories, and to nourish the soul. Our passion for cooking and sharing delectable recipes is at the core of everything we do. It’s a passion that has simmered for generations and, with every recipe we share, continues to evolve and flourish.
          </p>
        </div>
        {/* Section 2 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 items-center">
          <img
            src="/images/pancakes.png"
            alt="Pancakes"
            className="w-full md:w-1/2 rounded-lg object-cover max-h-72"
          />
          <div className="w-full md:w-1/2">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">
              Explore Our Delicious Recipes
            </h2>
            <p className="text-gray-700">
              At NutriTrack, we believe in the power of food to bring people together, to create cherished memories, and to nourish the soul. Our passion for cooking and sharing delectable recipes is at the core of everything we do. It's a passion that has simmered for generations and, with every recipe we share, continues to evolve and flourish.
            </p>
          </div>
        </div>
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-10 text-black">Our Great Team</h2>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4"
                />
                <span className="font-medium text-lg text-black">{member.name}</span>
                <span className="text-gray-400 text-sm mt-1">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Be One Of Us Section */}
        <div className="mb-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">Be One Of US</h2>
          <p className="text-gray-700 mb-6 max-w-3xl">
            But this story isn't complete without you. Your feedback, your passion, and your shared moments in the kitchen are what give life to our recipes. Together, let's make every meal a masterpiece, every gathering a feast, and every bite a memory worth savoring.
          </p>
          <button className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary/90 transition">
            Contact with us
          </button>
        </div>
      </div>
     
     
    </div>
  );
}