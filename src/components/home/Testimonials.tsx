"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    review:
      "Absolutely love my new sneakers! The quality is outstanding and they're so comfortable. Fast shipping and excellent customer service. Will definitely order again!",
    product: "Air Max Sneakers",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    review:
      "The wireless headphones exceeded my expectations. Crystal clear sound quality and the battery life is amazing. Great value for money!",
    product: "Wireless Headphones Pro",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, TX",
    rating: 5,
    review:
      "This skincare set has transformed my routine completely. My skin feels so much smoother and healthier. The packaging is beautiful too!",
    product: "Premium Skincare Set",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Seattle, WA",
    rating: 4,
    review:
      "Great laptop bag with plenty of compartments. Very well made and professional looking. Perfect for daily commute to the office.",
    product: "Professional Laptop Bag",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 5,
    name: "Jessica Park",
    location: "Miami, FL",
    rating: 5,
    review:
      "The smartwatch is incredible! Tracks everything I need and the design is sleek. Battery lasts for days. Highly recommend!",
    product: "Smart Fitness Watch",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 6,
    name: "Robert Wilson",
    location: "Chicago, IL",
    rating: 5,
    review:
      "Best coffee maker I've ever owned. Makes perfect coffee every time and looks great on my counter. Worth every penny!",
    product: "Premium Coffee Maker",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-accent to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Customer Reviews
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to
            say about their experience with our products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border border-border"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review Text */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.review}"
                </blockquote>

                {/* Product */}
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.product}
                  </Badge>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-foreground">
                        {testimonial.name}
                      </p>
                      {testimonial.verified && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">4.9</div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <p className="text-muted-foreground">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
};
