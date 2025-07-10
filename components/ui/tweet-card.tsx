"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2, Share, Verified } from "lucide-react";
import { useState } from "react";

export interface TweetCardProps {
  name: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes?: number;
  retweets?: number;
  replies?: number;
  verified?: boolean;
  className?: string;
  specialty?: string;
}

export default function TweetCard({
  name,
  username,
  avatar,
  content,
  timestamp,
  likes = 0,
  retweets = 0,
  replies = 0,
  verified = false,
  className,
  specialty,
  ...props
}: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-sm">{name}</h3>
              {verified && (
                <Verified className="h-4 w-4 text-blue-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{username}</p>
            {specialty && (
              <Badge variant="secondary" className="mt-1 text-xs">
                {specialty}
              </Badge>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {timestamp}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-sm leading-relaxed text-foreground">{content}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <button
          onClick={() => setIsRetweeted(!isRetweeted)}
          className={cn(
            "flex items-center space-x-1 text-xs transition-colors hover:text-green-500",
            isRetweeted ? "text-green-500" : "text-muted-foreground"
          )}
        >
          <Repeat2 className="h-4 w-4" />
          <span>{retweets}</span>
        </button>
        
        <button className="flex items-center space-x-1 text-xs text-muted-foreground transition-colors hover:text-blue-500">
          <MessageCircle className="h-4 w-4" />
          <span>{replies}</span>
        </button>
        
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "flex items-center space-x-1 text-xs transition-colors hover:text-red-500",
            isLiked ? "text-red-500" : "text-muted-foreground"
          )}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          <span>{likes}</span>
        </button>
        
        <button className="flex items-center space-x-1 text-xs text-muted-foreground transition-colors hover:text-blue-500">
          <Share className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 