import Blog from "@/components/blog";
import Brands from "@/components/brands";
import ExploreRecipes from "@/components/explorerecipes";
import Hero from "@/components/hero";
import PopularCategories from "@/components/popularcategories";
import ShareRecipes from "@/components/shareyourrecipes";
import StayInTouch from "@/components/stayintouch";
import TrendingRecipes from "@/components/trendingrecipes";


export default function Home() {
  return (
    <div className="">
    
      <Hero/>
      <ShareRecipes/>
      <TrendingRecipes/>
      <Blog/>
      <ExploreRecipes/>
      <StayInTouch/>
      <PopularCategories/>
      <Brands/>
   
  </div>
  );
}
