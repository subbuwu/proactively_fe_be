export const formatToCustomString = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export const generateAvailableTimeSlots = (selectedDate: Date): string[] => {
  const slots: string[] = [];
  const startDate = new Date(selectedDate);
  startDate.setHours(9, 0, 0, 0); // 9 AM IST
  
  const endDate = new Date(selectedDate);
  endDate.setHours(16, 0, 0, 0); // 4 PM IST
  
  const currentSlot = new Date(startDate);
  
  while (currentSlot < endDate) {
    // Format the slot in the desired format
    slots.push(formatToCustomString(currentSlot));
    currentSlot.setMinutes(currentSlot.getMinutes() + 60);
  }
  
  return slots;
};


export const convertToIST = (date: Date): Date => {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
};


