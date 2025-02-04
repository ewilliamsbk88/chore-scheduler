import React, { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw, ChevronLeft } from 'lucide-react';

const ChoreScheduler = () => {
    const [activeZone, setActiveZone] = useState('front');
    const [completedTasks, setCompletedTasks] = useState({});
    const [currentWeek, setCurrentWeek] = useState(1);
    const [assignee, setAssignee] = useState('Eric');
    const [weekStartDate, setWeekStartDate] = useState(new Date().toISOString().split('T')[0]);

    const zones = {
        front: {
            title: 'Front of House',
            areas: {
                kitchen: {
                    name: 'Kitchen',
                    tasks: {
                        weekly: [
                            'Wipe counters and stovetop',
                            'Sweep and Swiffer',
                            'Take out trash/recycling',
                            'Clean out fridge',
                            'Meal prep',
                            'Grocery shop'
                        ],
                        biweekly: [
                            'Mop floors'
                        ],
                        monthly: [
                            'Clean oven',
                            'Clean cabinet interiors',
                            'Deep clean dishwasher',
                            'Clean window treatments'
                        ]
                    }
                },
                livingRoom: {
                    name: 'Living Room',
                    tasks: {
                        weekly: [
                            'Dust surfaces',
                            'Declutter',
                            'Sweep and Swiffer'
                        ],
                        biweekly: [
                            'Mop'
                        ],
                        monthly: [
                            'Clean window treatments',
                            'Deep clean upholstery',
                            'Clean baseboards'
                        ]
                    }
                },
                office: {
                    name: 'Home Office',
                    tasks: {
                        weekly: [
                            'Dust surfaces',
                            'Sweep & Swiffer',
                            'Organize desk',
                            'Declutter'
                        ],
                        monthly: [
                            'Deep clean electronics',
                            'Clean window treatments',
                            'Wipe baseboards'
                        ]
                    }
                }
            }
        },
        back: {
            title: 'Back of House',
            areas: {
                bedroom: {
                    name: 'Bedroom',
                    tasks: {
                        weekly: [
                            'Change bedding',
                            'Sweep and Swiffer',
                            'Dust surfaces'
                        ],
                        monthly: [
                            'Clean window treatments',
                            'Deep clean under furniture'
                        ]
                    }
                },
                bathrooms: {
                    name: 'Bathrooms',
                    tasks: {
                        weekly: [
                            'Clean toilet',
                            'Clean shower/tub',
                            'Clean sink and counter',
                            'Sweep and Swiffer',
                            'Clean mirrors'
                        ],
                        biweekly: [
                            'Mop'
                        ],
                        monthly: [
                            'Deep clean grout',
                            'Clean exhaust fan',
                            'Wash shower curtain',
                            'Clean cabinet interiors',
                            'Organize under sink'
                        ]
                    }
                },
                laundry: {
                    name: 'Laundry',
                    tasks: {
                        weekly: [
                            'Personal laundry',
                            'Towels',
                            'Bedding',
                            'Put away clothes'
                        ],
                        monthly: [
                            'Clean washer/dryer',
                            'Deep clean lint trap',
                            'Wipe surfaces'
                        ]
                    }
                }
            }
        }
    };

    const toggleTask = (room, frequency, task) => {
        const taskKey = `${room}-${frequency}-${task}-week${currentWeek}`;
        setCompletedTasks(prev => ({
            ...prev,
            [taskKey]: !prev[taskKey]
        }));
    };

    const nextWeek = () => {
        setCurrentWeek(prev => prev + 1);
        const date = new Date(weekStartDate);
        date.setDate(date.getDate() + 7);
        setWeekStartDate(date.toISOString().split('T')[0]);
    };

    const previousWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek(prev => prev - 1);
            const date = new Date(weekStartDate);
            date.setDate(date.getDate() - 7);
            setWeekStartDate(date.toISOString().split('T')[0]);
        }
    };

    const switchZones = () => {
        setActiveZone(prev => prev === 'front' ? 'back' : 'front');
    };

    const renderTasks = (room, tasks, frequency) => {
        return tasks.map((task, index) => {
            const isCompleted = completedTasks[`${room}-${frequency}-${task}-week${currentWeek}`];
            return (
                <div
                    key={`${room}-${task}-${index}`}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => toggleTask(room, frequency, task)}
                >
                    {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={`${isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task}
                    </span>
                </div>
            );
        });
    };

    const currentZone = zones[activeZone];

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {currentZone.title} Chores - Week {currentWeek}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-gray-700">Assigned to:</label>
                            <select 
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="Eric">Eric</option>
                                <option value="Sam">Sam</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-gray-700">Week Starting:</label>
                            <input
                                type="date"
                                value={weekStartDate}
                                onChange={(e) => setWeekStartDate(e.target.value)}
                                className="border rounded px-2 py-1"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={switchZones}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Switch Zones
                    </button>
                    <button
                        onClick={previousWeek}
                        disabled={currentWeek === 1}
                        className={`px-4 py-2 text-white rounded flex items-center gap-2 ${
                            currentWeek === 1 ? 'bg-gray-300' : 'bg-gray-500 hover:bg-gray-600'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous Week
                    </button>
                    <button
                        onClick={nextWeek}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Next Week
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(currentZone.areas).map(([roomKey, room]) => (
                    <div key={roomKey} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">{room.name}</h2>
                        
                        {room.tasks.weekly && (
                            <div className="mb-4">
                                <h3 className="font-medium text-sm text-gray-500 mb-2">Weekly Tasks</h3>
                                {renderTasks(roomKey, room.tasks.weekly, 'weekly')}
                            </div>
                        )}

                        {room.tasks.biweekly && (
                            <div className="mb-4">
                                <h3 className="font-medium text-sm text-gray-500 mb-2">Biweekly Tasks</h3>
                                {renderTasks(roomKey, room.tasks.biweekly, 'biweekly')}
                            </div>
                        )}

                        {room.tasks.monthly && (
                            <div className="mb-4">
                                <h3 className="font-medium text-sm text-gray-500 mb-2">Monthly Tasks</h3>
                                {renderTasks(roomKey, room.tasks.monthly, 'monthly')}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChoreScheduler;