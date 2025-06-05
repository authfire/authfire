import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const getInputValue = (id: string) => {
  const inputElement = document.getElementById(id) as HTMLInputElement;
  return inputElement ? inputElement.value : '';
}

const clearInput = (id: string) => {
  const inputElement = document.getElementById(id) as HTMLInputElement;
  if (inputElement) {
    inputElement.value = '';
  }
}

export { cn, getInputValue, clearInput }
