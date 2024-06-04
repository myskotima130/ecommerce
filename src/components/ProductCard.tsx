import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} alt={name} fill />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>
      <CardHeader>
        <CardTitle>
          <div className="h-full w-full animate-pulse bg-gray-200" />
        </CardTitle>
        <CardDescription>
          <div className="h-full w-full animate-pulse bg-gray-200" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4 animate-pulse bg-gray-200" />
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <span className="animate-pulse bg-gray-200" />
        </Button>
      </CardFooter>
    </Card>
  );
}