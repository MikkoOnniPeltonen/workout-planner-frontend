import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="exercise-card" >
      <Card className="card-content">
        <CardHeader className="p-4 bg-gray-100">
          <CardTitle className="text-xl font-semibold truncate">{exercise.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">{exercise.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseCard;