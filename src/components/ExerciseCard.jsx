import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="relative h-64 group" >
      <Card className="h-full w-full">
        <CardHeader className="p-4 bg-gray-100">
          <CardTitle className="text-xl font-semibold">{exercise.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">{exercise.description}</p>
        </CardContent>
      </Card>
      <div className="absolute bottom-0 left-0 w-full bg-black text-white overflow-hidden transition-all duration-300 ease-in-out group-hover:h-1/2">
        <div className='p-4'>
          <h3 className='text-lg font-semibold mb-2'>A way to Accelerate!</h3>
          <ul className='list-disc pl-4'>
            {exercise.usedWith.map((item, index) => (
              <li key={index} className='text-sm'>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;