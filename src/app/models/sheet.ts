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

interface PartList {
  id: string;
  name: string;
  qtd: number;
  description: string;
}

interface Product{
  brand: string;
  model: string;
}

export interface Sheet {
  id: string;
  executedAtTheCustomer: boolean;
  customer: Customer;
  serviceType: 'Repair' | 'Assistance';
  costEstimation: CostEstimation;
  product: Product;
  isDone: boolean;
  description: string;
  partsListApplied?: PartList[];
  observations?: string;
  notes?: string;
  creationDate: Date;
  receivedDate: Date;
  initialDate: Date;
  finalizedDate: Date;
}
