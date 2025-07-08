"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support",
  },
];

const trendingProducts = [
  {
    id: 1,
    name: "Summer Dress",
    price: "$89",
    originalPrice: "$120",
    image: "/placeholder.svg?height=200&width=150",
    badge: "30% OFF",
  },
  {
    id: 2,
    name: "Casual Blazer",
    price: "$156",
    originalPrice: "$195",
    image: "/placeholder.svg?height=200&width=150",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: "$78",
    originalPrice: "$98",
    image: "/placeholder.svg?height=200&width=150",
    badge: "SALE",
  },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#18181b,rgba(24,24,27,0.6))] -z-10" />

      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground dark:bg-primary/80 dark:text-primary-foreground"
              >
                ✨ New Collection 2024
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-primary to-pink-600 dark:from-primary dark:to-pink-400 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Explore our curated collection of premium fashion pieces
                designed for the modern lifestyle. Quality meets style in every
                thread.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-lg"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg bg-transparent border-border text-foreground"
              >
                Watch Lookbook
              </Button>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              variants={fadeInUp}
              className="bg-card/80 dark:bg-card/70 backdrop-blur-sm rounded-2xl p-6 border border-border"
            >
              <h3 className="font-semibold mb-3">
                Get 20% off your first order
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-background text-foreground"
                  type="email"
                />
                <Button className="bg-gradient-to-r from-primary to-pink-600 hover:from-primary/80 hover:to-pink-700 text-primary-foreground">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Join 50,000+ fashion lovers
              </p>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-semibold">4.9</span>
              </div>
              <div className="text-muted-foreground">
                <span className="font-semibold">25,000+</span> Happy Customers
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image & Products */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-pink-400/20 dark:from-primary/30 dark:to-pink-400/30 rounded-3xl" />
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Fashion Model"
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl"
                priority
              />

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border border-border"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-muted-foreground">OFF</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-lg border border-border"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1.5,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-pink-500 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Premium Quality</div>
                    <div className="text-xs text-muted-foreground">
                      Certified Materials
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trending Products */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground">
              Discover what's popular this season
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-card border border-border">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={150}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-destructive hover:bg-destructive/80 text-white">
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {product.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/10 to-pink-100 dark:from-primary/20 dark:to-pink-400/20 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
