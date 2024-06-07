
export type Toast = {
  id: string;
  title?: string;
  message?: string;
  type: 'info' | 'success' | 'error' | 'warning' | null;
  duration?: number;
  closable: boolean;
};

