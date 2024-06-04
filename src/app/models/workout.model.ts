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

