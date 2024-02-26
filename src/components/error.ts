import toast from "react-hot-toast";
import { ZodError } from "zod"

export const handleValidationError = <T>(error: ZodError<T>) => {
    const errorDetails: { [key: string]: string } = {};

    error.errors.forEach((err: any) => {
        const fieldName = err.path[0];
        const errorMessage = err.message;
        errorDetails[fieldName] = errorMessage;
    });

    Object.entries(errorDetails).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
    });
}