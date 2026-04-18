export interface IFormData {
  message: string
}

export interface IFormState {
  message: string
  status: 'idle' | 'saving' | 'success'
  error?: string
  savedAt?: Date
}

export interface ITodo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export interface ITodoListState {
  todos: ITodo[]
  status: 'idle' | 'loading'
  error?: string
}

export interface IFormDataWithReducer {
  name: string
  email: string
  description: string
}

export interface IFormStateWithReducer {
  values: IFormDataWithReducer
  dirty: boolean
  submitting: boolean
  success: boolean
  errors: Partial<Record<keyof IFormDataWithReducer, string>>
}

export type TFormAction =
  | { type: 'SET_FIELD'; payload: { field: keyof IFormDataWithReducer; value: string } }
  | { type: 'SET_DIRTY'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Partial<Record<keyof IFormDataWithReducer, string>> }
  | { type: 'RESET' }
