interface Customer {
  name: string;
  address?: string;
  salesman?: string;
  sellingCompany?: string;
  imageUrl?: string;
}
interface CostEstimation {
  isRequired: boolean;
  date?: Date;
  value?: number;
}

export interface Sheet {
  id: string;
  customer: Customer;
  serviceType: 'Repair' | 'Assistance';
  costEstimation: CostEstimation;
  product: string;
  isDone: boolean;
  description: string;
  observations?: string;
  notes?: string;
  creationDate?: Date;
  initialDate: Date;
  finalizedDate: Date;
}
