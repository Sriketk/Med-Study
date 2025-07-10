import Link from "next/link";
import { Brain, MessageSquare, Microscope, Scale, Target, BookOpen, Users, Clock, Trophy, ArrowRight, CheckCircle, Sparkles, Star, TrendingUp, Shield, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { Badge } from "@/components/ui/badge";

// Enhanced Magic UI Components for beautiful gradients
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/dot-pattern";
import GradientText from "@/components/ui/gradient-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import MagicCard from "@/components/ui/magic-card";
import NeonGradientCard from "@/components/ui/neon-gradient-card";
import ShineBorder from "@/components/ui/shine-border";
import TweetCard from "@/components/ui/tweet-card";
import AnimatedBeam from "@/components/ui/animated-beam";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        <DotPattern 
          className="[mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_70%)] opacity-20" 
          width={20} 
          height={20} 
          cr={1} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">MedStudy</h1>
                  <p className="text-xs text-muted-foreground -mt-1">USMLE Excellence</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" asChild>
                  <Link href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <BlurFade delay={0.1}>
              <Badge variant="outline" className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Trusted by 10,000+ Medical Students
              </Badge>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master the{" "}
                <GradientText 
                  colors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
                  animate={true}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                >
                  USMLE
                </GradientText>
                <br />
                with Confidence
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your medical education with our comprehensive platform. Practice with real-world scenarios, 
                track your progress, and achieve your dream score.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <ShineBorder
                  className="p-1"
                  color={["#3b82f6", "#8b5cf6", "#06b6d4"]}
                  borderRadius={8}
                >
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </ShineBorder>
                <Button size="lg" variant="outline" className="border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20">
                  View Demo
                </Button>
              </div>
            </BlurFade>
          </div>

          {/* Stats Section */}
          <BlurFade delay={0.6}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { label: "Practice Questions", value: 10000, icon: Target },
                { label: "Success Rate", value: 95, suffix: "%", icon: Trophy },
                { label: "Study Hours Saved", value: 500, suffix: "+", icon: Clock },
              ].map((stat, index) => (
                <NeonGradientCard key={index} className="text-center p-6">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-white-0 to-purple-600 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    <NumberTicker value={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </NeonGradientCard>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <BlurFade delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to{" "}
                <GradientText colors={["#3b82f6", "#8b5cf6"]} className="text-3xl md:text-4xl font-bold">
                  Succeed
                </GradientText>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform provides all the tools and resources you need to excel in your medical studies.
              </p>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Adaptive algorithms that personalize your study experience based on your performance and learning style.",
                color: "#3b82f6"
              },
              {
                icon: MessageSquare,
                title: "Interactive Q&A",
                description: "Thousands of high-quality practice questions with detailed explanations and instant feedback.",
                color: "#8b5cf6"
              },
              {
                icon: Microscope,
                title: "Case Studies",
                description: "Real-world medical scenarios to develop your clinical reasoning and diagnostic skills.",
                color: "#06b6d4"
              },
              {
                icon: Scale,
                title: "Progress Analytics",
                description: "Comprehensive tracking of your performance with detailed insights and improvement recommendations.",
                color: "#10b981"
              },
              {
                icon: Users,
                title: "Study Groups",
                description: "Connect with peers, share knowledge, and learn together in our collaborative environment.",
                color: "#f59e0b"
              },
              {
                icon: Shield,
                title: "Exam Simulation",
                description: "Practice with realistic exam conditions and timing to build confidence for the real test.",
                color: "#ef4444"
              },
            ].map((feature, index) => (
              <BlurFade key={index} delay={0.2 + index * 0.1}>
                <MagicCard
                  className="h-full"
                  gradientColor={feature.color}
                  gradientOpacity={0.1}
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories from{" "}
                <AnimatedGradientText className="text-3xl md:text-4xl font-bold">
                  Future Doctors
                </AnimatedGradientText>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of medical students who have transformed their study experience and achieved their goals.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "MD Resident",
                score: "Step 1: 245",
                quote: "MedStudy's adaptive learning helped me identify my weak areas and focus my preparation effectively.",
                avatar: "SJ"
              },
              {
                name: "Michael Chen",
                role: "Medical Student",
                score: "Step 2: 260",
                quote: "The case studies and interactive Q&A sessions were game-changers for my clinical reasoning skills.",
                avatar: "MC"
              },
              {
                name: "Emily Rodriguez",
                role: "MD Graduate",
                score: "Step 3: 235",
                quote: "I couldn't have achieved my dream residency without the comprehensive preparation platform.",
                avatar: "ER"
              },
            ].map((testimonial, index) => (
              <BlurFade key={index} delay={0.3 + index * 0.1}>
                <ShineBorder
                  className="h-full"
                  color={["#3b82f6", "#8b5cf6", "#06b6d4"]}
                  borderRadius={16}
                >
                  <Card className="h-full border-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-900/20">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">"{testimonial.quote}"</p>
                      <Badge variant="secondary" className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-700 dark:text-green-300">
                        {testimonial.score}
                      </Badge>
                    </CardContent>
                  </Card>
                </ShineBorder>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Medical References Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Medical Community{" "}
                <GradientText colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} className="text-3xl md:text-4xl font-bold">
                  References
                </GradientText>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what medical professionals and students are saying about our platform across social media.
              </p>
            </div>
          </BlurFade>

          <div className="relative">
            {/* Animated Beams Container */}
            <div className="absolute inset-0 pointer-events-none">
              <AnimatedBeam
                className="opacity-30"
                duration={3}
                delay={0.5}
                gradientStartColor="#3b82f6"
                gradientStopColor="#8b5cf6"
                pathColor="#e5e7eb"
                pathWidth={2}
              />
              <AnimatedBeam
                className="opacity-20"
                duration={4}
                delay={1}
                reverse={true}
                gradientStartColor="#06b6d4"
                gradientStopColor="#10b981"
                pathColor="#e5e7eb"
                pathWidth={1}
              />
            </div>

            {/* Twitter Cards Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Mitchell",
                  username: "drsarahmd",
                  avatar: "/api/placeholder/100/100",
                  content: "Just passed Step 1 with a 250! The case studies on @MedStudyApp were incredibly helpful for clinical reasoning. The AI-powered questions really identified my weak spots. Highly recommend! #USMLE #MedStudy",
                  timestamp: "2h",
                  likes: 234,
                  retweets: 45,
                  replies: 18,
                  verified: true,
                  specialty: "Internal Medicine"
                },
                {
                  name: "Medical Student Mike",
                  username: "medstudentmike",
                  avatar: "/api/placeholder/100/100",
                  content: "Three months into using MedStudy and my practice scores have improved dramatically. The personalized study plan is a game-changer. Finally feeling confident about Step 2! 📚✨",
                  timestamp: "4h",
                  likes: 189,
                  retweets: 32,
                  replies: 24,
                  verified: false,
                  specialty: "MS3"
                },
                {
                  name: "Dr. James Patterson",
                  username: "drjamespatterson",
                  avatar: "/api/placeholder/100/100",
                  content: "As a residency program director, I'm impressed by the clinical knowledge of students who use MedStudy. Their problem-solving approach is noticeably stronger. Great platform! #MedEd",
                  timestamp: "6h",
                  likes: 412,
                  retweets: 78,
                  replies: 31,
                  verified: true,
                  specialty: "Program Director"
                },
                {
                  name: "Priya Patel",
                  username: "priyamedstudent",
                  avatar: "/api/placeholder/100/100",
                  content: "The study groups feature on MedStudy helped me connect with amazing study partners. We've been crushing our practice exams together! Community learning at its finest 🎯",
                  timestamp: "8h",
                  likes: 156,
                  retweets: 28,
                  replies: 15,
                  verified: false,
                  specialty: "MS2"
                },
                {
                  name: "Dr. Amanda Chen",
                  username: "dramandachen",
                  avatar: "/api/placeholder/100/100",
                  content: "MedStudy's analytics dashboard is incredibly detailed. Love seeing my progress tracked across different medical specialties. Data-driven studying for the win! 📊 #MedTech",
                  timestamp: "12h",
                  likes: 298,
                  retweets: 52,
                  replies: 19,
                  verified: true,
                  specialty: "Emergency Medicine"
                },
                {
                  name: "Carlos Rodriguez",
                  username: "carlosmedjourney",
                  avatar: "/api/placeholder/100/100",
                  content: "From 210 to 245 on Step 1! The explanations for each question are incredibly thorough. MedStudy doesn't just test you - it teaches you. Worth every penny! 💯",
                  timestamp: "1d",
                  likes: 523,
                  retweets: 94,
                  replies: 42,
                  verified: false,
                  specialty: "Recent Graduate"
                }
              ].map((tweet, index) => (
                <BlurFade key={index} delay={0.3 + index * 0.1}>
                  <TweetCard
                    name={tweet.name}
                    username={tweet.username}
                    avatar={tweet.avatar}
                    content={tweet.content}
                    timestamp={tweet.timestamp}
                    likes={tweet.likes}
                    retweets={tweet.retweets}
                    replies={tweet.replies}
                    verified={tweet.verified}
                    specialty={tweet.specialty}
                    className="h-full hover:scale-[1.02] transition-transform duration-300"
                  />
                </BlurFade>
              ))}
            </div>
          </div>

          {/* Reference Stats */}
          <BlurFade delay={0.8}>
            <div className="mt-12 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <NumberTicker value={2500} />+
                  </div>
                  <p className="text-sm text-muted-foreground">Social Media Mentions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <NumberTicker value={98} />%
                  </div>
                  <p className="text-sm text-muted-foreground">Positive Reviews</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <NumberTicker value={150} />+
                  </div>
                  <p className="text-sm text-muted-foreground">Medical Schools</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MedStudy</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering the next generation of medical professionals through innovative learning technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MedStudy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 