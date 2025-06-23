export interface Customer {
  id: number;
  name?: string;
  phone?: string;
  address?: string;
  gender?: boolean;
  created_at?: string;
  updated_at?: string;
  email?: string;
  notes?: string;
  avatar?: string;
}

export interface FilterState {
  name: string;
  phone: string;
  email: string;
  gender: string;
}
