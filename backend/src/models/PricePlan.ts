import mongoose, { Schema, Document } from 'mongoose';

export interface IPricePlan extends Document {
  phase: string;
  block: string;
  plotType: string;
  sizeMarla: number;
  totalPrice: number;
  downPayment: number;
  downPaymentPercent: number;
  installments: number;
  installmentAmount: number;
  possession: string;
  createdAt: Date;
  updatedAt: Date;
}

const PricePlanSchema = new Schema<IPricePlan>(
  {
    phase: { type: String, required: true, index: true },
    block: { type: String, required: true },
    plotType: { type: String, required: true },
    sizeMarla: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    downPayment: { type: Number, required: true },
    downPaymentPercent: { type: Number, required: true },
    installments: { type: Number, required: true },
    installmentAmount: { type: Number, required: true },
    possession: { type: String, required: true },
  },
  { timestamps: true }
);

PricePlanSchema.index({ phase: 1, block: 1, sizeMarla: 1 });

export const PricePlan = mongoose.model<IPricePlan>('PricePlan', PricePlanSchema);
