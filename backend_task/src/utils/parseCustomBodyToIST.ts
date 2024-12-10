import { convertToIST } from "./timeSlotGenerator";

export const parseCustomDateFormat = (dateTimeStr: string): Date => {
  // Expecting format: "DD/MM/YYYY, HH:mm:ss"
  const [datePart, timePart] = dateTimeStr.split(', ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes, seconds] = timePart.split(':');
  
  // Create date in IST
  const date = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );
  
  return convertToIST(date);
};