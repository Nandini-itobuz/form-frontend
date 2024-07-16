export interface JobApplication {
    _id?: string ;
    firstName: string ;
    middleName?: string ;
    age: number ;
    lastName: string;
    email: string;
    phone: string;
    position: string ;
    institution: string ;
    degree: string ;
    fieldOfStudy?: string ;
    startDate?: string ;
    score: number ;
    yearsOfExperience: number ;
    status: boolean 
}