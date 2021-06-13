import { Course } from "./course.model";

export interface Student {
    name: string;
    rollNumber: string;
    course: Course;
    date?: Date; 
}