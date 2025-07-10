import Link from "next/link";
import { Brain, MessageSquare, Microscope, Scale, Target, BookOpen, Users, Clock, Trophy, ArrowRight, CheckCircle, Sparkles, Star, TrendingUp, Shield, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { Badge } from "@/components/ui/badge";

// Selective Magic UI Components for subtle enhancement
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] opacity-20",
          )}
        />
      </div>

      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <BlurFade delay={0.1} inView>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                  <Brain size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">MedPrep AI</h1>
                  <p className="text-xs text-muted-foreground">USMLE Excellence</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <DarkModeToggle />
              </div>
            </div>
          </BlurFade>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <BlurFade delay={0.2} inView>
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                Trusted by 10,000+ Medical Students
              </Badge>
            </BlurFade>
            
            <BlurFade delay={0.3} inView>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                Master Your
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  {" "}USMLE{" "}
                </span>
                Preparation
              </h1>
            </BlurFade>
            
            <BlurFade delay={0.4} inView>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Accelerate your medical exam success with AI-powered practice questions, 
                interactive clinical cases, and comprehensive study tools designed for excellence.
              </p>
            </BlurFade>
            
            <BlurFade delay={0.5} inView>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <NumberTicker value={10000} />+
                  </div>
                  <p className="text-sm text-muted-foreground">Practice Questions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <NumberTicker value={500} />+
                  </div>
                  <p className="text-sm text-muted-foreground">Clinical Cases</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <NumberTicker value={95} />%
                  </div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Excel
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive study tools designed specifically for medical students preparing for USMLE exams.
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlurFade delay={0.2} inView>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">Popular</Badge>
                  </div>
                  <CardTitle>Interactive Clinical Cases</CardTitle>
                  <CardDescription>
                    Practice with real-world clinical scenarios using our AI-powered interface
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Chat-based information gathering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Realistic patient scenarios</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Instant feedback and explanations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Microscope className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">Core</Badge>
                  </div>
                  <CardTitle>Unlimited Practice Questions</CardTitle>
                  <CardDescription>
                    Access thousands of USMLE-style questions across all medical categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">5+ major categories covered</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Detailed explanations for each answer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Immediate performance feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle>AI-Powered Assessment</CardTitle>
                  <CardDescription>
                    Get personalized study recommendations based on your performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Comprehensive knowledge assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Identify knowledge gaps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Tailored study plans</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle>Question Comparison</CardTitle>
                  <CardDescription>
                    Help improve question quality by comparing and rating question pairs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Side-by-side question comparison</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Community-driven quality improvement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Earn points for participation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    Monitor your improvement with detailed analytics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Performance analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Study session tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Goal setting and milestones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.7} inView>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle>Community Learning</CardTitle>
                  <CardDescription>
                    Join thousands of medical students in collaborative learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Study groups and discussions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Peer question validation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Knowledge sharing platform</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Medical Students Worldwide
              </h2>
              <p className="text-lg text-muted-foreground">
                Join the community of successful USMLE candidates
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlurFade delay={0.2} inView>
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  All questions reviewed by medical professionals and verified for accuracy
                </p>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.3} inView>
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fast Results</h3>
                <p className="text-sm text-muted-foreground">
                  Students see improvement in their scores within the first week of use
                </p>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.4} inView>
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <Award className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Proven Success</h3>
                <p className="text-sm text-muted-foreground">
                  95% of our users pass their USMLE exams on the first attempt
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Medical Studies?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of medical students who are already using MedPrep AI to excel in their USMLE exams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/signup">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                  <Link href="/login">
                    Sign In to Continue
                  </Link>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12 px-4">
        <div className="container mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Brain size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <span className="font-semibold">MedPrep AI</span>
                  <p className="text-xs text-muted-foreground">USMLE Excellence</p>
                </div>
              </div>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2} inView>
            <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 MedPrep AI. All rights reserved. Empowering medical students worldwide.</p>
            </div>
          </BlurFade>
        </div>
      </footer>
    </div>
  );
} 