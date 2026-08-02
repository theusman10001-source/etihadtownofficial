import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  message?: string;
  plotInterest?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    source: { type: String, required: true, index: true },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    message: { type: String, trim: true },
    plotInterest: { type: String },
  },
  { timestamps: true }
);

LeadSchema.index({ phone: 1, createdAt: -1 });
LeadSchema.index({ source: 1, createdAt: -1 });

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
