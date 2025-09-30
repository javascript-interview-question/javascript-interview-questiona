"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Code, Clock, CircleCheck as CheckCircle, ArrowRight, Zap, Brain, Database, Globe, Cpu, Layers } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  questionsCount: number;
  completedQuestions: number;
  concepts: string[];
  color: string;
}

const topics: Topic[] = [
  {
    id: 'basics',
    title: 'JavaScript Basics',
    description: 'Fundamental concepts including variables, data types, operators, and control structures.',
    icon: Code,
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    questionsCount: 25,
    completedQuestions: 18,
    concepts: ['Variables (var, let, const)', 'Data Types', 'Operators', 'Control Flow', 'Type Coercion'],
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'functions',
    title: 'Functions & Scope',
    description: 'Function declarations, expressions, arrow functions, closures, and scope management.',
    icon: Zap,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    questionsCount: 30,
    completedQuestions: 12,
    concepts: ['Function Types', 'Closures', 'Scope Chain', 'Hoisting', 'IIFE', 'Higher-Order Functions'],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'objects',
    title: 'Objects & Prototypes',
    description: 'Object creation, prototypal inheritance, classes, and object manipulation methods.',
    icon: Database,
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    questionsCount: 28,
    completedQuestions: 8,
    concepts: ['Object Creation', 'Prototypal Inheritance', 'ES6 Classes', 'Object Methods', 'Property Descriptors'],
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'arrays',
    title: 'Arrays & Iteration',
    description: 'Array methods, iteration techniques, and functional programming concepts.',
    icon: Layers,
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    questionsCount: 22,
    completedQuestions: 15,
    concepts: ['Array Methods', 'Iteration', 'Map/Filter/Reduce', 'Destructuring', 'Spread Operator'],
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 'async',
    title: 'Asynchronous JavaScript',
    description: 'Promises, async/await, event loop, and handling asynchronous operations.',
    icon: Clock,
    difficulty: 'Advanced',
    estimatedTime: '5-6 hours',
    questionsCount: 35,
    completedQuestions: 5,
    concepts: ['Promises', 'Async/Await', 'Event Loop', 'Callbacks', 'Fetch API', 'Error Handling'],
    color: 'from-red-400 to-red-600'
  },
  {
    id: 'dom',
    title: 'DOM Manipulation',
    description: 'Document Object Model, event handling, and browser APIs.',
    icon: Globe,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    questionsCount: 26,
    completedQuestions: 10,
    concepts: ['DOM Selection', 'Event Handling', 'Element Manipulation', 'Browser APIs', 'Local Storage'],
    color: 'from-teal-400 to-teal-600'
  },
  {
    id: 'advanced',
    title: 'Advanced Concepts',
    description: 'Design patterns, performance optimization, and advanced JavaScript techniques.',
    icon: Brain,
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    questionsCount: 32,
    completedQuestions: 3,
    concepts: ['Design Patterns', 'Memory Management', 'Performance', 'Modules', 'Generators', 'Proxies'],
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    id: 'es6plus',
    title: 'ES6+ Features',
    description: 'Modern JavaScript features including modules, destructuring, and new syntax.',
    icon: Cpu,
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    questionsCount: 29,
    completedQuestions: 7,
    concepts: ['Arrow Functions', 'Template Literals', 'Destructuring', 'Modules', 'Symbols', 'Iterators'],
    color: 'from-pink-400 to-pink-600'
  }
];

export default function TopicsPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questionsCount, 0);
  const totalCompleted = topics.reduce((sum, topic) => sum + topic.completedQuestions, 0);
  const overallProgress = Math.round((totalCompleted / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <BookOpen className="text-indigo-600" />
                  Learning Topics
                </h1>
                <p className="text-gray-600 mt-1">Master JavaScript concepts systematically</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Overall Progress</div>
                <div className="text-2xl font-bold text-indigo-600">{overallProgress}%</div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    strokeDasharray={`${overallProgress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Total Progress</span>
              <span>{totalCompleted} of {totalQuestions} questions completed</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{topics.length}</div>
              <div className="text-gray-600 font-medium">Topics Available</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{totalCompleted}</div>
              <div className="text-gray-600 font-medium">Questions Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalQuestions}</div>
              <div className="text-gray-600 font-medium">Total Questions</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {topics.filter(t => getCompletionPercentage(t.completedQuestions, t.questionsCount) === 100).length}
              </div>
              <div className="text-gray-600 font-medium">Topics Mastered</div>
            </CardContent>
          </Card>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map(topic => {
            const IconComponent = topic.icon;
            const completionPercentage = getCompletionPercentage(topic.completedQuestions, topic.questionsCount);
            const isCompleted = completionPercentage === 100;
            
            return (
              <Card key={topic.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <div className={`h-2 bg-gradient-to-r ${topic.color}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${topic.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-gray-900">{topic.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs border ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {topic.estimatedTime}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {topic.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {topic.completedQuestions}/{topic.questionsCount} ({completionPercentage}%)
                      </span>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Key Concepts:</h4>
                    <div className="flex flex-wrap gap-1">
                      {topic.concepts.slice(0, 3).map(concept => (
                        <Badge key={concept} variant="secondary" className="text-xs">
                          {concept}
                        </Badge>
                      ))}
                      {topic.concepts.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{topic.concepts.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1" size="sm">
                      <Link href={`/questions?category=${topic.title.split(' ')[0]}`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Study
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/practice">
                        <Zap className="h-4 w-4 mr-2" />
                        Practice
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Path Recommendation */}
        <Card className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center">
              <Brain className="h-16 w-16 mx-auto mb-4 text-indigo-200" />
              <h2 className="text-3xl font-bold mb-4">Recommended Learning Path</h2>
              <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
                Start with JavaScript Basics, then move to Functions & Scope, followed by Objects & Prototypes. 
                Master these fundamentals before tackling advanced topics.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/questions?category=Basics">
                    Start Learning Path
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-indigo-600">
                  <Link href="/practice">
                    Take Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}