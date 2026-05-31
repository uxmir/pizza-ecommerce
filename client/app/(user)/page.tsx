"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Truck, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import PizzaCard from "@/components/PizzaCard";
// import { pizzas } from "@/data/pizzas";
import heroPizza from "../../public/hero-pizza.jpg";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* HERO */}
      <section className="relative overflow-hidden w-full px-5 lg:px-0">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div className="space-y-7 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Flame className="w-4 h-4" /> Wood-fired since 2015
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-balance">
              Hot, fresh,
              <span className="block font-serif text-primary italic">
                handcrafted pizza.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Made with 00 flour, San Marzano tomatoes, and real Italian
              mozzarella. Delivered to your door in 30 minutes — or its on us.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full gap-2 shadow-(--shadow-warm)"
              >
                <Link href="/menu">
                  Order now <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border(--border)"
              >
                <Link href="/menu">View menu</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Free delivery $25+
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> 30-min promise
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Award-winning
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-(--gradient-hero) rounded-full blur-3xl opacity-30 animate-float" />

            <Image
              src={heroPizza}
              alt="Hot wood-fired pepperoni pizza with steam and fresh basil"
              width={1920}
              height={1080}
              priority
              className="relative w-full max-w-[500px] aspect-square object-cover rounded-full shadow(--shadow-warm) animate-spin-slow"
            />

            <div className="absolute -bottom-2 left-4 bg-background rounded-2xl shadow-md p-4 flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Now baking</div>
                <div className="font-bold">485°C oven</div>
              </div>
            </div>
            <div className="absolute -top-2 right-2 bg-background rounded-2xl shadow-md p-4 border border-border">
              <div className="text-xs text-muted-foreground">Rated</div>
              <div className="font-bold text-lg text-secondary">★ 4.9 / 5</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto py-16 px-5 lg:px-0">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Bestsellers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mt-1">
              Crowd favorites
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="gap-1 hidden sm:inline-flex"
          >
            <Link href="/menu">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16 px-5 lg:px-0">
        <div
          className="relative overflow-hidden rounded-3xl  p-10 md:p-16 shadow-lg"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="relative z-10 max-w-xl text-white">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Hungry? Lets fix that.
            </h2>
            <p className="mt-3 text-lg opacity-90">
              Browse the full menu, filter by category, and get a hot pizza on
              your way in minutes.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full mt-6 gap-2 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/menu">
                Explore the menu <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-amber-400/40 blur-3xl" />
          <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full bg-orange-500/30 blur-2xl" />
        </div>
      </section>
    </div>
  );
};

export default Page;
