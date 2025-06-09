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
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  instructions:z.array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  servings: z.string().min(1, "Servings are required"),
  cookingTimeHours: z.string().min(1, "Cooking time is required"),
  cookingTimeMinutes: z.string().min(1, "Cooking time is required"),
  PrepTimeHours: z.string().min(1, "Prep time is required"),
  PrepTimeMinutes: z.string().min(1, "Prep time is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
 
   calories: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "Calories required")),
  protein: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "protein is required")),
  fats: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "fats are required")),
  carbohydrates: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "carbs are required")),
  fiber: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "fiber are required")),
  netCarbs: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "netCarbs are required")),
  sodium: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "sodium are required")),
  cholesterol: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "cholesterol are required")),
});
  
