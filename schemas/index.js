import * as z from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const ResetSchema = z.object({
  email: z.string().email("Invalid email address"),
 
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
 
});


export const NewRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Invalid image URL"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  instructions: z.string().min(1, "Instructions are required"),
  servings: z.string().min(1, "Servings are required"),
  cookingTime: z.string().min(1, "Cooking time is required"),
  prepTime: z.string().min(1, "Prep time is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
  nutrition: z.object({
    calories: z.string().min(1, "Calories are required"),
    protein: z.string().min(1, "Protein is required"),
    fat: z.string().min(1, "Fat is required"),
    carbohydrates: z.string().min(1, "Carbohydrates are required"),
    fiber: z.string().min(1, "Fiber is required"),
    netCarbs: z.string().min(1, "Net carbs are required"),
    sodium: z.string().min(1, "Sodium is required"),
    cholesterol: z.string().min(1, "Cholesterol is required"),
  }),
  
})