import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, BookOpen, Users, Trophy, ArrowRight, CircleCheck as CheckCircle, Star, Zap, Target, Brain, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: "Interactive Code Examples",
    description: "Practice with real JavaScript code snippets and see live examples for every concept."
  },
  {
    icon: Brain,
    title: "Comprehensive Topics",
    description: "Cover all essential JavaScript topics from basics to advanced concepts like closures and async programming."
  },
  {
    icon: Target,
    title: "Interview-Focused",
    description: "Questions curated from real technical interviews at top tech companies."
  },
  {
    icon: Clock,
    title: "Progress Tracking",
    description: "Track your learning progress and identify areas that need more practice."
  },
  {
    icon: Award,
    title: "Difficulty Levels",
    description: "Questions organized by difficulty from beginner to expert level."
  },
  {
    icon: Zap,
    title: "Quick Practice",
    description: "Jump into practice sessions with randomized questions for efficient learning."
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer at Google",
    content: "This platform helped me ace my JavaScript interviews. The code examples are incredibly helpful!",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Full Stack Engineer at Meta",
    content: "The best resource I've found for JavaScript interview prep. Comprehensive and well-organized.",
    rating: 5
  },
  {
    name: "Emily Johnson",
    role: "Senior Developer at Netflix",
    content: "Love the interactive approach. Made complex concepts like closures finally click for me.",
    rating: 5
  }
];

const stats = [
  { number: "500+", label: "Interview Questions" },
  { number: "50+", label: "Code Examples" },
  { number: "10K+", label: "Developers Helped" },
  { number: "95%", label: "Success Rate" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JSInterviewPro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
              </Link>
              <Link href="/practice" className="text-gray-600 hover:text-gray-900 transition-colors">
                Practice
              </Link>
              <Button asChild>
                <Link href="/questions">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🚀 Trusted by 10,000+ developers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master JavaScript
              <span className="text-blue-600 block">Interview Questions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive preparation platform with interactive code examples, detailed explanations, 
              and real interview questions from top tech companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link href="/questions">
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link href="/practice">
                  Quick Practice
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Code className="h-16 w-16 text-blue-500 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Trophy className="h-20 w-20 text-yellow-500 animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to excel in JavaScript interviews.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Learn with Interactive Code Examples
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every concept comes with practical, runnable code examples. Understand not just the theory, 
                but see exactly how JavaScript works in practice.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Syntax highlighted code blocks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Step-by-step explanations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Real-world examples</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <pre className="text-green-400 text-sm leading-relaxed overflow-x-auto">
                <code>{`// Closure Example
function createCounter() {
  let count = 0;
  
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// The inner function has access to 
// the outer function's variables
// even after it returns!`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who landed their dream jobs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of developers who have successfully prepared for their JavaScript interviews with our platform.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
            <Link href="/questions">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">JSInterviewPro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The most comprehensive JavaScript interview preparation platform. 
                Master the concepts, practice with real questions, and land your dream job.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/questions" className="hover:text-white transition-colors">Questions</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Practice</Link></li>
                <li><Link href="/topics" className="hover:text-white transition-colors">Topics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JSInterviewPro. All rights reserved. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}