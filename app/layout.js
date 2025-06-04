
import "./globals.css";
import  Footer  from "@/components/footer";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { PreviousPathProvider } from "@/context/PreviousPathContext";




export const metadata = {
  title: "Perfect Recipe",
  description: "",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body
       
      >
      <PreviousPathProvider>
        <Header/>
        <div className="min-h-screen">
           {children}
        </div>
       
       
       <Footer/>
      </PreviousPathProvider>
      </body>
    </html>
    </SessionProvider>
  );
}
