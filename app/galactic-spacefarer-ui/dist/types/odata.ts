export type ODataCollection<T> = {
  value: T[];
};

export type ODataErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
};