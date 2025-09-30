"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, RotateCcw, CircleCheck as CheckCircle, Circle as XCircle, Clock, Target, Zap, Trophy } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  codeExample?: string;
}

const practiceQuestions: Question[] = [
  {
    id: 1,
    category: 'Basics',
    difficulty: 'Easy',
    question: 'What will be the output of the following code?',
    codeExample: `console.log(typeof null);`,
    options: [
      'null',
      'undefined', 
      'object',
      'boolean'
    ],
    correctAnswer: 2,
    explanation: 'In JavaScript, typeof null returns "object". This is a well-known quirk in the language and is considered a bug that cannot be fixed due to backward compatibility.'
  },
  {
    id: 2,
    category: 'Functions',
    difficulty: 'Medium',
    question: 'What will be logged to the console?',
    codeExample: `function test() {
  console.log(a);
  console.log(foo());
  
  var a = 1;
  function foo() {
    return 2;
  }
}

test();`,
    options: [
      'undefined, 2',
      '1, 2',
      'ReferenceError, 2',
      'undefined, ReferenceError'
    ],
    correctAnswer: 0,
    explanation: 'Due to hoisting, var declarations are moved to the top but not initialized (undefined), while function declarations are fully hoisted and can be called before their declaration.'
  },
  {
    id: 3,
    category: 'Async',
    difficulty: 'Hard',
    question: 'What is the output of this code?',
    codeExample: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
    options: [
      '1, 2, 3, 4',
      '1, 4, 2, 3',
      '1, 4, 3, 2',
      '1, 3, 4, 2'
    ],
    correctAnswer: 2,
    explanation: 'Synchronous code runs first (1, 4), then microtasks like Promise.then (3), then macrotasks like setTimeout (2). This demonstrates the event loop priority.'
  },
  {
    id: 4,
    category: 'Objects',
    difficulty: 'Medium',
    question: 'What will this code output?',
    codeExample: `const obj = {
  a: 1,
  b: function() {
    console.log(this.a);
  }
};

const { b } = obj;
b();`,
    options: [
      '1',
      'undefined',
      'ReferenceError',
      'TypeError'
    ],
    correctAnswer: 1,
    explanation: 'When the method is destructured and called as a standalone function, it loses its context. "this" becomes undefined (in strict mode) or the global object, so this.a is undefined.'
  },
  {
    id: 5,
    category: 'Arrays',
    difficulty: 'Easy',
    question: 'What does this code return?',
    codeExample: `[1, 2, 3].map(parseInt)`,
    options: [
      '[1, 2, 3]',
      '[1, NaN, NaN]',
      '[1, 2, NaN]',
      'Error'
    ],
    correctAnswer: 1,
    explanation: 'map passes (element, index) to parseInt. parseInt(1,0) = 1, parseInt(2,1) = NaN (base 1 invalid), parseInt(3,2) = NaN (3 invalid in base 2).'
  }
];

export default function PracticePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(practiceQuestions.length).fill(false)
  );

  const currentQuestion = practiceQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / practiceQuestions.length) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResult]);

  const handleTimeUp = () => {
    setShowResult(true);
    setIsActive(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setIsActive(false);
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsActive(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsActive(true);
    }
  };

  const resetPractice = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setIsActive(true);
    setAnsweredQuestions(new Array(practiceQuestions.length).fill(false));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return 'text-green-600';
    if (timeLeft > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isLastQuestion = currentQuestionIndex === practiceQuestions.length - 1;
  const answeredCount = answeredQuestions.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
                  <Zap className="text-purple-600" />
                  Quick Practice
                </h1>
                <p className="text-gray-600 text-sm">Test your JavaScript knowledge</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Score</div>
                <div className="text-xl font-bold text-purple-600">{score}/{practiceQuestions.length}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Time</div>
                <div className={`text-xl font-bold ${getTimeColor()}`}>
                  {timeLeft}s
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {practiceQuestions.length}</span>
              <span>{answeredCount} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Card */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs font-medium">
                  {currentQuestion.category}
                </Badge>
                <Badge className={`text-xs border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {answeredQuestions[currentQuestionIndex] ? 'Answered' : 'Not answered'}
                </span>
              </div>
            </div>
            <CardTitle className="text-xl text-gray-900 leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {currentQuestion.codeExample && (
              <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-gray-100 text-sm leading-relaxed">
                  <code className="language-javascript">{currentQuestion.codeExample}</code>
                </pre>
              </div>
            )}
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-purple-500 bg-purple-50'
                      : showResult && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                    {showResult && (
                      <div>
                        {index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-5 w-5 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-3">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="flex items-center gap-2"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <>
                    {!isLastQuestion ? (
                      <Button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2"
                      >
                        Next Question
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={resetPractice}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Start Over
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Score */}
        {isLastQuestion && showResult && (
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-2">Practice Complete!</h2>
              <p className="text-xl mb-4">
                Your Score: {score} out of {practiceQuestions.length}
              </p>
              <p className="text-lg opacity-90 mb-6">
                {score === practiceQuestions.length
                  ? "Perfect! You're ready for any JavaScript interview! 🎉"
                  : score >= practiceQuestions.length * 0.8
                  ? "Great job! You have a solid understanding of JavaScript! 👏"
                  : score >= practiceQuestions.length * 0.6
                  ? "Good work! Keep practicing to improve your skills! 💪"
                  : "Keep learning! Practice makes perfect! 📚"}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetPractice}
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Try Again
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/questions">
                    Study More Questions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Navigation */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Quick Navigation:</span>
              <div className="flex gap-2">
                {practiceQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setSelectedAnswer(null);
                      setShowResult(false);
                      setTimeLeft(30);
                      setIsActive(true);
                    }}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                      index === currentQuestionIndex
                        ? 'bg-purple-600 text-white'
                        : answeredQuestions[index]
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}