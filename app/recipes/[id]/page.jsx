"use client";

import { getRecentRecipes, getRecipeByRecipeId, updateRating } from '@/actions/get-recipes';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import StarRating from '@/components/RatingReview';
import { useCurrentUser } from '@/hooks/use-current-user';
import { addComment, getRecipeComments } from '@/actions/recipes';
import CommentThread from '@/components/CommentThread';




const page = () => {
  const [recipe, setRecipe] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([])
  const params = useParams();
  const user = useCurrentUser();
 const [newComment, setNewComment] = useState("");
const [comments, setComments] = useState([]); // your existing comments array
  const [replyingTo, setReplyingTo] = useState({ commentId: null, replyId: null });
const [replyText, setReplyText] = useState("");
 const [rating, setRating] = useState(0);
 const [commentsCount, setCommentsCount] = useState(0);
  
const handleReplyClick = (commentId, replyId = null) => {
  setReplyingTo({ commentId, replyId });
  setReplyText("");
};

  const handleRate = (star) => {
    setRating(star);
    updateRating(params.id, star, user?.id )
    // Save to DB here if needed
  };

  const formattedDate = recipe?.createdAt
  ? new Date(recipe.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  : "";

  function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days}day${days > 1 ? "s" : ""} ago`;
}

 const showRating = recipe?.ratings?.length > 0 ? recipe?.ratings?.reduce((acc, curr) => acc + curr.value, 0) / recipe?.ratings?.length : 1;

  const handleReplySubmit = async (commentId, replyId = null) => {
  if (!replyText.trim()) return;
  const parentId = replyId || commentId;

   // Save reply to DB
  const newReply = await addComment(
    params.id,           // recipeId
    replyText,           // text
    user?.id,            // userId
    parentId             // parentId (for replies)
  );
 
   // Optionally, fetch latest comments from DB
  const updatedComments = await getRecipeComments(params.id);
  setComments(updatedComments);
  setReplyingTo({ commentId: null, replyId: null });
  setReplyText("");
};

  const handleNewComment = async (recipeId, text, userId, parentId) => {
  if (!text.trim()) return;
  await addComment(recipeId, text, userId, parentId);
  // Fetch latest comments after adding
  const updatedComments = await getRecipeComments(recipeId);
  setComments(updatedComments);
  setNewComment("");
};

  useEffect(() => {
    getRecipeByRecipeId(params.id)
      .then((data) => {
        console.log(data)
        setRecipe(data);
        setComments(data?.comments || []);
      });

      getRecentRecipes(params.id)
      .then((data) => {
        console.log("recent recipe", data)
        setRecentRecipes(data)
      })

      getRecipeComments(params.id)
      .then((data) => {
        console.log("comments", data)
        setComments(data);
        setCommentsCount(data?.length || 0);
      })

      


  }, [])

 
  return (
    <main className="flex flex-col lg:flex-row gap-8 px-14 max-w-7xl mx-auto mt-15">
        {/* Left/Main Section */}
        {recipe && (
          <>
        
        <section className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
            <span>👤 {recipe?.user?.name}</span>
            <span>📅 {formattedDate}</span>
            <span>💬 {commentsCount} comments</span>
            <span>🔖 9 Saves</span>
            <span>{showRating} ⭐ / 5 rating</span>
            {/* <button className="ml-auto bg-primary text-white px-4 py-2 rounded shadow">Edit</button> */}
            <button className="ml-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M..." />
              </svg>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <img src={recipe.image} alt="Quesadilla" className="rounded-lg w-full max-w-xl" />
            {/* Nutrition Facts */}
            <div className="bg-gray-50 rounded-lg p-6 min-w-[220px]">
              <h2 className="font-semibold mb-4">Nutrition Facts</h2>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex justify-between"><span>Calories</span><span>{recipe?.nutrition?.calories}</span></li>
                <li className="flex justify-between"><span>Carbs</span><span>{recipe?.nutrition?.carbohydrates}g</span></li>
                <li className="flex justify-between"><span>Fat</span><span>{recipe?.nutrition?.fats}g</span></li>
                <li className="flex justify-between"><span>Protein</span><span>{recipe?.nutrition?.protein}g</span></li>
                <li className="flex justify-between"><span>Fiber</span><span>{recipe?.nutrition?.fiber}g</span></li>
                <li className="flex justify-between"><span>Net carbs</span><span>{recipe?.nutrition?.netCarbs}g</span></li>
                <li className="flex justify-between"><span>Sodium</span><span>{recipe?.nutrition?.sodium}mg</span></li>
                <li className="flex justify-between"><span>Cholesterol</span><span>{recipe?.nutrition?.cholesterol}mg</span></li>
              </ul>
            </div>
          </div>
          {/* Recipe Info */}
          <div className="flex gap-8 mt-6 mb-2">
            <div>
              <div className="font-semibold">Prep time:</div>
              <div className='items-center'><span className={recipe?.PrepTimeHours > 0 ? "block":"hidden"}>{recipe?.PrepTimeHours > 0 ? recipe.PrepTimeHours: " "} hrs </span><span className={recipe?.PrepTimeMinutes > 0 ? "block":"hidden"}>{recipe?.PrepTimeMinutes > 0 ? recipe.PrepTimeMinutes: " "} mins</span></div>
            </div>
            <div>
              <div className="font-semibold">Cook time:</div>
              <div className='items-center'><span className={recipe?.cookingTimeHours > 0 ? "block":"hidden"}>{recipe?.cookingTimeHours > 0 ? recipe?.cookingTimeHours: " "} hrs </span><span className={recipe?.cookingTimeMinutes > 0 ? "block":"hidden"}>{recipe?.cookingTimeMinutes > 0 ? recipe.cookingTimeMinutes: " "} mins</span></div>
            </div>
            <div>
              <div className="font-semibold">Serving</div>
              <div>{recipe?.servings}  Serving</div>
            </div>
            <button className="ml-auto bg-white border border-primary text-primary px-4 py-2 rounded shadow">Print Recipe</button>
          </div>
          <p className="text-gray-700 mb-6">
            {recipe?.description}
          </p>
          {/* Ingredients */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold mr-2">Ingredients:</h2>
              <span className="text-gray-500">{recipe?.servings}{' '}serving</span>
              
            </div>
            <ul className="space-y-2">
              {recipe?.ingredients?.map((ingredient, index) => (
                   <li key={index} className="flex items-center"><input type="checkbox" checked readOnly className="mr-2 accent-primary" />{ingredient?.name}</li>
              ))}
            </ul>
          </div>
          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
            <ol className="styled-ol space-y-3">
              {recipe?.instructions?.map((instruction, index) => (
                  <li key={index} className="marker:bg-primary marker:text-white marker:px-2 marker:rounded">
               {instruction.step}
              </li>
              ))}
            </ol>
          </div>

          
      {/* Comments Section */}
<div className="bg-white min-h-screen px-2 py-4 sm:px-4 sm:py-6">
  <h2 className="text-xl font-medium mb-6">Comment</h2>
  <div className="max-w-2xl mx-auto">
    {comments.map((comment) => (
      <CommentThread
        key={comment.id}
        comment={comment}
        handleReplyClick={handleReplyClick}
        replyingTo={replyingTo}
        replyText={replyText}
        setReplyText={setReplyText}
        handleReplySubmit={handleReplySubmit}
        timeAgo={timeAgo}
      />
    ))}
    <button className="w-full border border-[#B55D51] text-[#B55D51] py-2 rounded-md mt-4 hover:bg-[#B55D51] hover:text-white transition mb-5">
      Load more comments
    </button>
  </div>
  {/* Rate and Comment */}
  <div className="mb-8">
    <div className="border-t border-primary mb-4"></div>
    <h3 className="font-semibold mb-2">Rate this recipe and share your opinion</h3>
    <div className="flex items-center mb-2">
      {/* Star rating placeholder */}
      <StarRating value={rating} onChange={handleRate} />
    </div>
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B55D51]"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
     <button
  className="bg-[#B55D51] text-white px-4 py-2 rounded hover:bg-[#a04d43] transition"
  onClick={() => handleNewComment(params.id, newComment, user?.id, null)}
>
  Post
</button>
    </div>
  </div>
</div>
            {/* You might like this */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">You might like this</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Example cards */}
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="bg-white rounded shadow p-2">
                    <img src={`/images/related${i}.jpg`} alt="" className="rounded mb-2" />
                    <div className="font-medium text-sm">Recipe Title</div>
                    <div className="text-xs text-gray-500">★★★★★</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        {/* Right Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          {/* Related Product */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="font-semibold mb-4">Related Product</h2>
            <div className="flex gap-4 mb-4">
              {/* Example product images */}
              {[1,2,3].map(i => (
                <img key={i} src={`/images/product${i}.jpg`} alt="" className="w-16 h-16 rounded-full" />
              ))}
            </div>
            <button className="bg-primary text-white w-full py-2 rounded">Buy Now</button>
          </div>
          {/* Recent Recipes */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="font-semibold mb-4">Recent Recipes</h2>
            {recentRecipes?.map((recipe, index) => (
              <div key={index} className="flex items-center gap-3 mb-3">
                <img src={recipe?.image} alt="" className="w-12 h-12 rounded" />
                <div>
                  <div className="font-medium text-sm">{recipe?.title}</div>
                  <div className="text-xs text-gray-500">★★★★☆ {recipe?.nutrition?.calories} cals</div>
                </div>
              </div>
            ))}
          </div>
          {/* Newsletter */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="font-semibold mb-2">Stay connected with our Recipes updates</h2>
            <p className="text-xs text-gray-500 mb-2">for the latest health tips and delicious recipes</p>
            <input type="email" placeholder="Enter Your Email" className="w-full border rounded p-2 mb-2" />
            <button className="bg-primary text-white w-full py-2 rounded">Sign up</button>
          </div>
          {/* Related Recipes */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="font-semibold mb-4">Related Recipes</h2>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <img src={`/images/related${i}.jpg`} alt="" className="w-12 h-12 rounded" />
                <div>
                  <div className="font-medium text-sm">Recipe Title</div>
                </div>
              </div>
            ))}
          </div>
          {/* Tags */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {["#Desert", "#CheesecakeRecipe", "#FoodBlog", "#DeliciousDesserts", "#Baking"].map(tag => (
                <span key={tag} className="border rounded px-2 py-1 text-xs text-gray-500">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
        </>
        )}
      </main>
  )
}

export default page