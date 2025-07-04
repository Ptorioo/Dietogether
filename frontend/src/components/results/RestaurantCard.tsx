import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Restaurant } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bike, CloudRain, Footprints, MapPin, Sun, TrainFront, Zap } from 'lucide-react';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isTopPick: boolean;
  isBadWeather: boolean;
}

const formatTravelTime = (seconds?: number) => {
  if (typeof seconds !== 'number' || isNaN(seconds)) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} 分 ${secs > 0 ? ` ${secs} 秒` : ''}`;
};

const RestaurantCard = ({ restaurant, isTopPick, isBadWeather }: RestaurantCardProps) => {
  let seatingAdvantage = "";
  if (!restaurant.eat_in && isBadWeather) {
      seatingAdvantage = "不能內用，雨天很不方便😢";
  }

  return (
    <Card className={cn(
      "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col",
      isTopPick ? "border-2 border-primary bg-primary/5" : "bg-card"
    )}>
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={
            Math.random() < 0.001 // 0.1% chance to show Rickroll
              ? "https://media1.tenor.com/m/x8v1oNUOmg4AAAAC/rickroll-roll.gif"
              : restaurant.image || 'https://content.jerrymk.uk/-ikX37xTjNo'
          }
          alt={restaurant.name}
          fill
          className="object-cover"
          unoptimized
        />
        {isTopPick && (
          <Badge variant="default" className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-md">
            <Zap className="w-4 h-4 mr-1" /> 最推
          </Badge>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center space-x-2 text-muted-foreground">
          {restaurant.eat_in ? 
            <Sun className="w-5 h-5 text-green-600" /> : 
            <CloudRain className="w-5 h-5 text-blue-500" />
          }
          <span>{restaurant.eat_in ? '提供內用' : '只能外帶'}</span>
        </div>
        {seatingAdvantage && <p className="text-xs text-primary">{seatingAdvantage}</p>}
        {restaurant.latitude !== undefined && restaurant.longitude !== undefined && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(restaurant.name)}/@${Number(restaurant.latitude).toFixed(6)},${Number(restaurant.longitude).toFixed(6)},17z`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              點我看 Google Maps 位置
            </a>
          </div>
        )}
        {restaurant.travel_time_walk !== undefined && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Footprints className="w-5 h-5" />
            <span className="font-semibold">{formatTravelTime(restaurant.travel_time_walk)}</span>
          </div>
        )}
        {restaurant.travel_time_bicycle !== undefined && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Bike className="w-5 h-5" />
            <span className="font-semibold">{formatTravelTime(restaurant.travel_time_bicycle)}</span>
          </div>
        )}
        {restaurant.travel_time_transit !== undefined && restaurant.travel_time_transit != 0 && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <TrainFront className="w-5 h-5" />
            <span className="font-semibold">{formatTravelTime(restaurant.travel_time_transit)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
