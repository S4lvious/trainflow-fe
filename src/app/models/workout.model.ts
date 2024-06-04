export interface Exercise {
    id: number,
    name: string,
    date: string,
    userId: number,   
    reps: number,
    sets: number,
    kg: number,
    type: string,
    difficulty: string,
}

export interface ExerciseResponse {
    id: number,
    name: string,
}

export interface ExerciseForm {
    id: number,
    date: string,
    userId: number,
    reps: number,
    sets: number,
    kg: number,
}

export interface ReportResponse {
    [key: string]: {
        date: string,
        exercise_kg: number,
    }[]
}

export interface WorkoutProgramBody {
    userId: number,
    exercises: number[],
}

export interface WorkoutProgramForm {
    exerciseId: number,
    reps: number,
    sets: number   
}

export interface CreateTrainingCardBody {
    userId: number,
    trainingCardName: string,
    exercises: WorkoutProgramForm[]
}

export interface TrainingCardExercise {
    id: number;
    exercise_set: string;
    exercise_rep: string;
    training_card_id: number;
    exercise_id: number;
    name: string;
    type: string;
    difficulty: string;
}

