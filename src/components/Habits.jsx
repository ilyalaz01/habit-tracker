import React, { useState } from 'react';
import Habit from './Habit';

const Habits = () => {
  const fakeDatabase = [
    { name: 'Exercise', color: 'bg-yellow-500', Active_days: [1, 3, 5], completedDays: [] },
    { name: 'Journal', color: 'bg-purple-500', Active_days: [0, 1, 2, 3, 4, 5, 6], completedDays: [] },
    { name: 'Alcohol', color: 'bg-pink-500', Active_days: [0, 1, 2, 3, 4, 5, 6], completedDays: [] },
    { name: 'Cold Shower', color: 'bg-blue-500', Active_days: [2, 4], completedDays: [] },
    { name: 'Floss', color: 'bg-gray-500', Active_days: [0, 2, 4, 6], completedDays: [] },
    { name: 'Meditate', color: 'bg-orange-500', Active_days: [1, 3, 5], completedDays: [] },
    { name: 'eBook', color: 'bg-teal-500', Active_days: [1, 2, 3, 4, 5], completedDays: [] },
    { name: 'Run', color: 'bg-red-500', Active_days: [0, 2, 4], completedDays: [] },
    { name: 'Read', color: 'bg-green-500', Active_days: [0, 3, 6], completedDays: [] },
    { name: 'Cook', color: 'bg-indigo-500', Active_days: [1, 2, 3], completedDays: [] }
  ];

  const [habits, setHabits] = useState(fakeDatabase);

  const handleMarkComplete = (index) => {
    const updatedHabits = habits.map((habit, i) => {
      if (i === index) {
        return { 
          ...habit, 
          completedDays: [...habit.completedDays, new Date().getDay()] 
        };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const handleUndo = (index) => {
    const updatedHabits = habits.map((habit, i) => {
      if (i === index) {
        const currentDay = new Date().getDay();
        return { 
          ...habit, 
          completedDays: habit.completedDays.filter(day => day !== currentDay)
        };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const getCurrentDay = () => {
    const date = new Date();
    const options = { weekday: 'short', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };
  const currentDay = getCurrentDay();

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{currentDay}</h2>
      {habits.map((habit, index) => {
        const today = new Date().getDay();
        const isActiveToday = habit.Active_days.includes(today);
        const isCompletedToday = habit.completedDays.includes(today);
        let status = isActiveToday ? (isCompletedToday ? 'Completed' : 'Pending') : `Inactive on ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`;

        return (
          <Habit
            key={index}
            name={habit.name}
            status={status}
            color={habit.color}
            onMarkComplete={isActiveToday && !isCompletedToday ? () => handleMarkComplete(index) : null}
            onUndo={isCompletedToday ? () => handleUndo(index) : null}
          />
        );
      })}
    </div>
  );
};

export default Habits;
