import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  phone: string;
  email?: string;
  plotId?: string;
  phase?: string;
  block?: string;
  plotType?: string;
  preferredDate?: Date;
  type: 'site_visit' | 'booking';
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    plotId: { type: String },
    phase: { type: String },
    block: { type: String },
    plotType: { type: String },
    preferredDate: { type: Date },
    type: {
      type: String,
      enum: ['site_visit', 'booking'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
