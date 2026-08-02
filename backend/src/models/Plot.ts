import mongoose, { Schema, Document } from 'mongoose';

export interface IPlot extends Document {
  plotId: string;
  phase: string;
  block: string;
  plotType: string;
  sizeMarla: number;
  sizeSqFt: number;
  status: 'available' | 'booked' | 'sold';
  price: number;
  pricePerMarla: number;
  category: 'residential' | 'commercial' | 'farmhouse';
  createdAt: Date;
  updatedAt: Date;
}

const PlotSchema = new Schema<IPlot>(
  {
    plotId: { type: String, required: true, unique: true, index: true },
    phase: { type: String, required: true, index: true },
    block: { type: String, required: true, index: true },
    plotType: { type: String, required: true },
    sizeMarla: { type: Number, required: true },
    sizeSqFt: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'booked', 'sold'],
      default: 'available',
      index: true,
    },
    price: { type: Number, required: true },
    pricePerMarla: { type: Number, required: true },
    category: {
      type: String,
      enum: ['residential', 'commercial', 'farmhouse'],
      required: true,
    },
  },
  { timestamps: true }
);

PlotSchema.index({ phase: 1, block: 1 });
PlotSchema.index({ phase: 1, status: 1 });
PlotSchema.index({ category: 1, status: 1 });

export const Plot = mongoose.model<IPlot>('Plot', PlotSchema);
