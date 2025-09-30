"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Code, BookOpen, CircleCheck as CheckCircle, Circle, ArrowLeft, Filter, RotateCcw, Bookmark, Clock } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeExample?: string;
  answer: string;
  codeAnswer?: string;
  tags: string[];
  estimatedTime: number;
  completed?: boolean;
  bookmarked?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Basics',
    difficulty: 'Easy',
    question: 'What is the difference between var, let, and const?',
    tags: ['variables', 'scope', 'hoisting'],
    estimatedTime: 5,
    codeExample: `// var - function scoped, can be redeclared
var x = 1;
if (true) {
  var x = 2; // Same variable
  console.log(x); // 2
}
console.log(x); // 2

// let - block scoped, can be reassigned
let y = 1;
if (true) {
  let y = 2; // Different variable
  console.log(y); // 2
}
console.log(y); // 1

// const - block scoped, cannot be reassigned
const z = 1;
// z = 2; // TypeError: Assignment to constant variable
const obj = { name: 'John' };
obj.name = 'Jane'; // This works - object is mutable`,
    answer: 'var is function-scoped and can be redeclared and reassigned. let is block-scoped, can be reassigned but not redeclared in the same scope. const is block-scoped and cannot be reassigned, but objects and arrays declared with const are still mutable.',
    completed: false,
    bookmarked: false
  },
  {
    id: 2,
    category: 'Functions',
    difficulty: 'Medium',
    question: 'Explain closures in JavaScript with practical examples.',
    tags: ['closures', 'scope', 'functions'],
    estimatedTime: 8,
    codeExample: `// Basic closure example
function outerFunction(x) {
  // Inner function has access to outer function's variables
  function innerFunction(y) {
    return x + y; // x is captured in closure
  }
  return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Practical example: Private variables
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Insufficient funds';
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
// balance is private - cannot be accessed directly`,
    answer: 'A closure is when an inner function has access to variables from its outer (enclosing) scope even after the outer function has returned. This creates a persistent scope that allows for data privacy, function factories, and maintaining state in functional programming patterns.',
    completed: false,
    bookmarked: false
  },
  {
    id: 3,
    category: 'Async',
    difficulty: 'Hard',
    question: 'What is the difference between Promise.all(), Promise.allSettled(), Promise.race(), and Promise.any()?',
    tags: ['promises', 'async', 'concurrency'],
    estimatedTime: 12,
    codeExample: `const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('Error!');
const promise3 = Promise.resolve(3);
const promise4 = new Promise(resolve => setTimeout(() => resolve(4), 1000));

// Promise.all() - fails fast, all must succeed
Promise.all([promise1, promise3, promise4])
  .then(results => console.log('All:', results)) // [1, 3, 4]
  .catch(error => console.log('All failed:', error));

// Promise.allSettled() - waits for all, regardless of outcome
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log('AllSettled:', results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'Error!' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });

// Promise.race() - first to settle (resolve or reject)
Promise.race([promise4, promise1])
  .then(result => console.log('Race winner:', result)); // 1

// Promise.any() - first to resolve (ignores rejections)
Promise.any([promise2, promise3, promise1])
  .then(result => console.log('Any winner:', result)); // 3`,
    answer: 'Promise.all() waits for all promises to resolve and fails if any reject. Promise.allSettled() waits for all to settle regardless of outcome. Promise.race() returns the first promise to settle (resolve or reject). Promise.any() returns the first promise to resolve, ignoring rejections unless all reject.',
    completed: false,
    bookmarked: false
  },
  {
    id: 4,
    category: 'Objects',
    difficulty: 'Medium',
    question: 'How does prototypal inheritance work in JavaScript?',
    tags: ['prototype', 'inheritance', 'objects'],
    estimatedTime: 10,
    codeExample: `// Constructor function approach
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.speak = function() {
  return \`\${this.name} barks\`;
};

// Add new method
Dog.prototype.wagTail = function() {
  return \`\${this.name} wags tail\`;
};

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // "Buddy barks"
console.log(myDog.wagTail()); // "Buddy wags tail"

// ES6 Class syntax (syntactic sugar)
class ModernAnimal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class ModernDog extends ModernAnimal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return \`\${this.name} barks\`;
  }
}`,
    answer: 'JavaScript uses prototypal inheritance where objects inherit directly from other objects through the prototype chain. When a property is not found on an object, JavaScript looks up the prototype chain. This can be implemented using constructor functions with prototype manipulation or ES6 classes.',
    completed: false,
    bookmarked: false
  },
  {
    id: 5,
    category: 'Arrays',
    difficulty: 'Easy',
    question: 'What are the different ways to iterate over arrays and when to use each?',
    tags: ['arrays', 'iteration', 'loops'],
    estimatedTime: 6,
    codeExample: `const numbers = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'orange'];

// 1. Traditional for loop - best for performance, early exit
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 3) break; // Can break early
  console.log(numbers[i]);
}

// 2. for...of - clean syntax for values
for (const number of numbers) {
  console.log(number); // 1, 2, 3, 4, 5
}

// 3. for...in - iterates over indices (avoid for arrays)
for (const index in numbers) {
  console.log(numbers[index]); // Works but not recommended
}

// 4. forEach - functional approach, no return value
numbers.forEach((num, index) => {
  console.log(\`Index \${index}: \${num}\`);
});

// 5. map - transforms array, returns new array
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// 6. filter - filters array, returns new array
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// 7. reduce - accumulates values
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15

// 8. find - returns first matching element
const found = numbers.find(num => num > 3); // 4

// 9. some/every - boolean checks
const hasEven = numbers.some(num => num % 2 === 0); // true
const allPositive = numbers.every(num => num > 0); // true`,
    answer: 'Use for loops for performance and early exit, for...of for clean iteration over values, forEach for side effects, map for transformations, filter for filtering, reduce for accumulation, find for searching, and some/every for boolean checks. Choose based on your specific use case and whether you need a return value.',
    completed: false,
    bookmarked: false
  },
  {
    id: 6,
    category: 'Async',
    difficulty: 'Medium',
    question: 'Explain async/await and how it compares to Promises and callbacks.',
    tags: ['async', 'await', 'promises', 'callbacks'],
    estimatedTime: 9,
    codeExample: `// 1. Callback Hell (avoid this)
function fetchUserCallback(userId, callback) {
  setTimeout(() => {
    fetchUserPosts(userId, (posts) => {
      fetchPostComments(posts[0].id, (comments) => {
        callback({ user: userId, posts, comments });
      });
    });
  }, 1000);
}

// 2. Promises - better but can get verbose
function fetchUserPromise(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(response => response.json())
    .then(user => {
      return fetch(\`/api/users/\${userId}/posts\`)
        .then(response => response.json())
        .then(posts => ({ user, posts }));
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// 3. Async/Await - clean and readable
async function fetchUserAsync(userId) {
  try {
    const userResponse = await fetch(\`/api/users/\${userId}\`);
    const user = await userResponse.json();
    
    const postsResponse = await fetch(\`/api/users/\${userId}/posts\`);
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// 4. Parallel execution with async/await
async function fetchMultipleUsers(userIds) {
  try {
    // Sequential (slower)
    const users = [];
    for (const id of userIds) {
      const user = await fetchUserAsync(id);
      users.push(user);
    }
    
    // Parallel (faster)
    const userPromises = userIds.map(id => fetchUserAsync(id));
    const usersParallel = await Promise.all(userPromises);
    
    return usersParallel;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}`,
    answer: 'Async/await is syntactic sugar over Promises that makes asynchronous code look synchronous. It eliminates callback hell, makes error handling easier with try/catch, and improves readability. However, be careful about sequential vs parallel execution - use Promise.all() for parallel operations.',
    completed: false,
    bookmarked: false
  }
];

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  const [showBookmarked, setShowBookmarked] = useState(false);

  const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
    const matchesBookmark = !showBookmarked || bookmarkedQuestions.has(question.id);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  const toggleCompleted = (questionId: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionId)) {
      newCompleted.delete(questionId);
    } else {
      newCompleted.add(questionId);
    }
    setCompletedQuestions(newCompleted);
  };

  const toggleBookmarked = (questionId: number) => {
    const newBookmarked = new Set(bookmarkedQuestions);
    if (newBookmarked.has(questionId)) {
      newBookmarked.delete(questionId);
    } else {
      newBookmarked.add(questionId);
    }
    setBookmarkedQuestions(newBookmarked);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setShowBookmarked(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const completionRate = Math.round((completedQuestions.size / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Code className="text-blue-600" />
                  Interview Questions
                </h1>
                <p className="text-gray-600 text-sm">Master JavaScript concepts step by step</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-xl font-bold text-blue-600">{completionRate}%</div>
              </div>
              <div className="w-12 h-12 relative">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    strokeDasharray={`${completionRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <Progress value={completionRate} className="mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search questions, answers, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant={showBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowBookmarked(!showBookmarked)}
                  className="flex items-center gap-2"
                >
                  <Bookmark className="h-4 w-4" />
                  Bookmarked ({bookmarkedQuestions.size})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <div className="flex gap-1">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="text-xs"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Difficulty:</span>
                  <div className="flex gap-1">
                    {difficulties.map(difficulty => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className="text-xs"
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="grid gap-6">
          {filteredQuestions.map(question => (
            <Card key={question.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs font-medium">
                        {question.category}
                      </Badge>
                      <Badge className={`text-xs border ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {question.estimatedTime} min
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900 leading-relaxed mb-3">
                      {question.question}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1">
                      {question.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmarked(question.id)}
                      className="hover:bg-blue-100 transition-colors"
                    >
                      <Bookmark 
                        className={`w-4 h-4 ${bookmarkedQuestions.has(question.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCompleted(question.id)}
                      className="hover:bg-green-100 transition-colors"
                    >
                      {completedQuestions.has(question.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <Tabs defaultValue="explanation" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="explanation" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Explanation
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Code Example
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="explanation" className="space-y-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed text-base">{question.answer}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code">
                    {question.codeExample ? (
                      <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                        <pre className="text-gray-100 text-sm leading-relaxed">
                          <code className="language-javascript">{question.codeExample}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No code example available</p>
                        <p>This question focuses on conceptual understanding.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-500 mb-4">No questions found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria.</p>
            <Button onClick={resetFilters} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}