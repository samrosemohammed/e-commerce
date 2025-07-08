import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="mb-24 w-full">
      <div className="container mx-auto px-4 text-center bg-accent/60 py-20 rounded-lg">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of happy customers and get 20% off your first
              order.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent"
            >
              Browse Products
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Free shipping on orders over $50 • 30-day returns
          </p>
        </div>
      </div>
    </section>
  );
};
