interface ExerciseData {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


const exerciseCalculator = (data: Array<number>, target: number): ExerciseData => {

    const targetHours = 20
    const periodLength: number = data.length
    const trainingDays: number = data.filter(x => x > 0).length
    const sum: number = data.reduce((a, b) => a + b, 0)
    const average: number = sum / periodLength
    const percentage: number = (sum / targetHours) > 100 ? 100 : sum/targetHours
    const rating: number = Math.floor(percentage * 3)

    const ratingDescription = () => {
        switch(rating) {
            case 1:
                return 'worst case scenario'
            case 2:
                return 'not too bad but could b better'
             case 3:
                return 'good job'
            default: 
                return 'incorrect values'
        }
            
    }

    const result: ExerciseData = {
        periodLength,
        trainingDays,
        success: target < rating,
        rating,
        ratingDescription: ratingDescription(),
        target,
        average,
    }
    return result
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))